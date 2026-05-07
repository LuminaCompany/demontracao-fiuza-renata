import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Send, RotateCcw, CheckCheck, ExternalLink } from "lucide-react";
import { useDemoCrm } from "@/lib/demo-crm";
import type { Lead } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/whatsapp")({
  component: WhatsappPage,
});

// ── Types ─────────────────────────────────────────────────────────
type ChatState =
  | "idle"
  | "waiting_intent"
  | "waiting_name"
  | "waiting_doctor"
  | "waiting_insurance"
  | "waiting_insurance_name"
  | "waiting_date"
  | "confirmed"
  | "other";

interface BookingData {
  name: string;
  doctor: string;
  hasInsurance: boolean;
  insuranceName: string;
  preferredDay: string;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: "client" | "ai";
  time: string;
}

const DOCTOR_SHORT = [
  "Dra. Renata Fiuza",
  "Dr. Carlos Mendes",
  "Dra. Patricia Lima",
  "Dr. Roberto Alves",
];

const DOCTOR_KEYWORDS = [
  ["renata", "fiuza", "obstetrícia", "obstetrica", "pré-natal", "pre-natal", "prenatal"],
  ["carlos", "mendes", "ginecologia", "ginecologista"],
  ["patricia", "patrícia", "ultrassom", "ultrasonografia", "ultrassonografia"],
  ["roberto", "alves", "clínica geral", "clinica geral", "clinico geral", "clínico"],
];

const DAY_SHORT = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];

const DAY_KEYWORDS = [
  ["segunda", "seg-feira"],
  ["terça", "terca", "ter-feira"],
  ["quarta", "qua-feira"],
  ["quinta", "qui-feira"],
  ["sexta", "sex-feira"],
];

function now() {
  return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function makeId() {
  return Math.random().toString(36).slice(2);
}

function extractName(raw: string): string {
  const patterns = [
    /^me chamo\s+(.+)$/i,
    /^meu nome [ée]\s+(.+)$/i,
    /^sou\s+(?:a\s+|o\s+)?(.+)$/i,
    /^pode me chamar de\s+(.+)$/i,
    /^[ée]\s+(.+)$/i,
    /^me chama\s+(.+)$/i,
  ];
  for (const p of patterns) {
    const m = raw.trim().match(p);
    if (m) return m[m.length - 1].trim();
  }
  return raw.trim();
}

function findDoctor(text: string): number {
  const lower = text.toLowerCase();
  const byFull = DOCTOR_SHORT.findIndex((d) => lower.includes(d.toLowerCase()));
  if (byFull >= 0) return byFull;
  return DOCTOR_KEYWORDS.findIndex((kws) => kws.some((kw) => lower.includes(kw)));
}

function findDay(text: string): number {
  const lower = text.toLowerCase();
  const byFull = DAY_SHORT.findIndex((d) => lower.includes(d.toLowerCase()));
  if (byFull >= 0) return byFull;
  return DAY_KEYWORDS.findIndex((kws) => kws.some((kw) => lower.includes(kw)));
}

function findInsurance(text: string): string | null {
  const lower = text.toLowerCase();
  if (lower.includes("unimed")) return "Unimed";
  if (lower.includes("amil")) return "Amil";
  if (lower.includes("bradesco")) return "Bradesco Saúde";
  if (lower.includes("sulamerica") || lower.includes("sulamérica") || lower.includes("sul america")) return "SulAmérica";
  return null;
}

const DOCTORS_LIST =
  "• Dra. Renata Fiuza — Obstetrícia & Pré-natal\n• Dr. Carlos Mendes — Ginecologia\n• Dra. Patricia Lima — Ultrassonografia\n• Dr. Roberto Alves — Clínica Geral";

const DAYS_LIST =
  "• Segunda-feira — 08h às 17h\n• Terça-feira — 08h às 17h\n• Quarta-feira — 08h às 17h\n• Quinta-feira — 08h às 17h\n• Sexta-feira — 08h às 12h";

// ── Typing Indicator ─────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-1.5 mb-2">
      <div className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: "#075e54" }}>
        M
      </div>
      <div className="rounded-2xl rounded-bl-sm bg-white dark:bg-zinc-800 px-3 py-2 shadow-sm">
        <div className="flex gap-1 items-center h-3">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

// ── Message Bubble ────────────────────────────────────────────────
function Bubble({ msg }: { msg: ChatMessage }) {
  const isClient = msg.sender === "client";
  return (
    <div className={cn("flex items-end gap-1.5 mb-1.5", isClient && "flex-row-reverse")}>
      {!isClient && (
        <div className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: "#075e54" }}>
          M
        </div>
      )}
      <div
        className={cn(
          "max-w-[78%] rounded-2xl px-3 py-2 shadow-sm",
          isClient
            ? "rounded-br-sm text-white"
            : "rounded-bl-sm bg-white dark:bg-zinc-800 text-foreground",
        )}
        style={isClient ? { background: "#25d366" } : undefined}
      >
        <p className="text-[12px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
        <div
          className={cn(
            "flex items-center gap-1 mt-0.5",
            isClient ? "justify-end" : "justify-start",
          )}
        >
          <span className={cn("text-[9px]", isClient ? "text-green-100" : "text-muted-foreground")}>
            {msg.time}
          </span>
          {isClient && <CheckCheck className="h-2.5 w-2.5 text-green-100" />}
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
function WhatsappPage() {
  const { addWaLead } = useDemoCrm();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [state, setState] = useState<ChatState>("idle");
  const [booking, setBooking] = useState<Partial<BookingData>>({});
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function aiReply(content: string, delay = 1200) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: makeId(), content, sender: "ai", time: now() },
      ]);
    }, delay);
  }

  function pushClient(content: string) {
    const msg: ChatMessage = { id: makeId(), content, sender: "client", time: now() };
    setMessages((prev) => [...prev, msg]);
    return msg;
  }

  function handleSend() {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    pushClient(text);
    processInput(text);
  }

  function processInput(raw: string) {
    const text = raw.toLowerCase();

    if (state === "idle") {
      setState("waiting_intent");
      aiReply(
        "Olá! 👋 Bem-vindo(a) à *Clínica Bem Estar* ✨\n\nSou a Mari, assistente virtual da clínica. Como posso te ajudar hoje?",
        1000,
      );
      return;
    }

    if (state === "waiting_intent" || state === "other") {
      if (
        text.includes("agendar") ||
        text.includes("consulta") ||
        text.includes("marcar") ||
        text.includes("appointment") ||
        text.includes("gostaria") ||
        text.includes("médico") ||
        text.includes("medico") ||
        text.includes("quero marcar")
      ) {
        setState("waiting_name");
        aiReply(
          "Ótimo! 😊 Vou te ajudar a agendar sua consulta.\n\nQual é o seu *nome completo*?",
        );
      } else {
        setState("other");
        aiReply(
          "Entendido! 💙 Nossa equipe entrará em contato em breve para te ajudar.\n\nSe quiser agendar uma consulta, é só me dizer!",
          900,
        );
      }
      return;
    }

    if (state === "waiting_name") {
      const name = extractName(raw);
      setBooking((b) => ({ ...b, name }));
      setState("waiting_doctor");
      aiReply(
        `Prazer, *${name}*! 🌸\n\nCom qual médico(a) você deseja consultar?\n\n${DOCTORS_LIST}`,
        1000,
      );
      return;
    }

    if (state === "waiting_doctor") {
      const doctorIdx = findDoctor(text);
      if (doctorIdx < 0) {
        aiReply(
          `Não consegui identificar o médico. 😊\n\nPor favor, escolha um dos nossos especialistas:\n\n${DOCTORS_LIST}`,
          900,
        );
        return;
      }
      const doctor = DOCTOR_SHORT[doctorIdx];
      setBooking((b) => ({ ...b, doctor }));
      setState("waiting_insurance");
      aiReply(
        `Perfeito! *${doctor}* 💙\n\nVocê possui plano de saúde? Se sim, qual?`,
        1100,
      );
      return;
    }

    if (state === "waiting_insurance") {
      const isParticular =
        text.includes("particular") ||
        text.includes("não tenho") ||
        text.includes("nao tenho") ||
        text.includes("sem plano") ||
        text.includes("nenhum");

      if (isParticular) {
        setBooking((b) => ({ ...b, hasInsurance: false, insuranceName: "Particular" }));
        setState("waiting_date");
        aiReply(
          `Tudo certo! Atendemos particular com pagamento facilitado 💳\n\nQual o melhor dia da semana para você?\n\n${DAYS_LIST}`,
          1000,
        );
        return;
      }

      const insuranceName = findInsurance(text);
      if (insuranceName) {
        setBooking((b) => ({ ...b, hasInsurance: true, insuranceName }));
        setState("waiting_date");
        aiReply(
          `Trabalhamos com *${insuranceName}* ✅\n\nQual o melhor dia da semana para você?\n\n${DAYS_LIST}`,
          1000,
        );
      } else {
        setBooking((b) => ({ ...b, hasInsurance: true }));
        setState("waiting_insurance_name");
        aiReply(`Ótimo! Qual é o nome do seu plano de saúde?`, 900);
      }
      return;
    }

    if (state === "waiting_insurance_name") {
      const insuranceName = findInsurance(text) ?? raw.trim();
      setBooking((b) => ({ ...b, insuranceName }));
      setState("waiting_date");
      aiReply(
        `Trabalhamos com *${insuranceName}* ✅\n\nQual o melhor dia da semana para você?\n\n${DAYS_LIST}`,
        1000,
      );
      return;
    }

    if (state === "waiting_date") {
      const dayIdx = findDay(text);
      if (dayIdx < 0) {
        aiReply(
          `Não entendi o dia. 😊 Qual seria o melhor para você?\n\n${DAYS_LIST}`,
          900,
        );
        return;
      }
      const preferredDay = DAY_SHORT[dayIdx];
      const finalBooking = { ...booking, preferredDay };
      setBooking(finalBooking);
      setState("confirmed");
      setConfirmed(true);
      const ins = finalBooking.hasInsurance === false ? "Particular" : finalBooking.insuranceName;
      aiReply(
        `🎉 *Consulta agendada com sucesso!*\n\n👤 *Paciente:* ${finalBooking.name}\n👩‍⚕️ *Médico(a):* ${finalBooking.doctor}\n🏥 *Plano:* ${ins}\n📅 *Dia:* ${preferredDay}\n⏰ *Horário:* Nossa equipe confirmará em breve!\n\n📱 Fique atento ao seu WhatsApp!\n❤️ Clínica Bem Estar agradece a sua confiança!\n\n_Nos vemos em breve, ${finalBooking.name}_ 🌸`,
        1400,
      );
      const newLead: Lead = {
        id: `wa-${Date.now()}`,
        name: finalBooking.name!,
        phone: "—",
        status: "potencial",
        stage: "novo_contato",
        tagIds: ["t1", "t7"],
        lastMessage: "Consulta agendada via WhatsApp ✅",
        lastMessageTime: now(),
        unreadCount: 0,
        totalPurchases: 0,
        totalSpent: 0,
        createdAt: new Date().toISOString().split("T")[0],
        notes: `Paciente agendada via WhatsApp IA. Dia preferido: ${finalBooking.preferredDay}`,
        doctor: finalBooking.doctor,
        healthInsurance: finalBooking.hasInsurance === false ? "Particular" : finalBooking.insuranceName,
        appointmentDate: finalBooking.preferredDay,
        appointmentType: "consulta",
        attendedBy: "ia",
        messages: [
          { id: "wa-m1", content: "Agendamento via WhatsApp IA", sender: "system", time: now() },
          {
            id: "wa-m2",
            content: `Paciente solicitou consulta com ${finalBooking.doctor} na ${finalBooking.preferredDay}. Plano: ${finalBooking.hasInsurance === false ? "Particular" : finalBooking.insuranceName}.`,
            sender: "attendant",
            senderName: "IA — Mari",
            time: now(),
            status: "sent",
          },
        ],
      };
      addWaLead(newLead);
      return;
    }
  }

  function handleReset() {
    setMessages([]);
    setState("idle");
    setBooking({});
    setInput("");
    setTyping(false);
    setConfirmed(false);
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-muted/30">
      {/* Thin top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/60 flex-none">
        <div>
          <h1 className="text-[15px] font-bold text-foreground">Demo WhatsApp IA</h1>
          <p className="text-[11px] text-muted-foreground">Você é o paciente — experimente o atendimento</p>
        </div>
        <div className="flex items-center gap-3">
          {confirmed && (
            <Link
              to="/atendimentos"
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Ver no CRM
            </Link>
          )}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reiniciar
          </button>
        </div>
      </div>

      {/* Centered phone frame */}
      <div className="flex flex-1 items-center justify-center overflow-hidden py-4">
        <div
          className="relative flex flex-col overflow-hidden"
          style={{
            width: "375px",
            height: "min(720px, calc(100vh - 140px))",
            background: "#1a1a1a",
            borderRadius: "44px",
            boxShadow: "0 0 0 2px #333, 0 40px 80px rgba(0,0,0,0.5), inset 0 0 0 1px #444",
            padding: "12px",
          }}
        >
          {/* Notch */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
            style={{
              width: "120px",
              height: "28px",
              background: "#1a1a1a",
              borderBottomLeftRadius: "16px",
              borderBottomRightRadius: "16px",
            }}
          />

          {/* Screen */}
          <div
            className="flex flex-col overflow-hidden bg-[#ece5dd] dark:bg-[#0d1117]"
            style={{ borderRadius: "34px", flex: 1 }}
          >
            {/* Status bar */}
            <div className="flex items-center justify-between px-6 pb-1 flex-none" style={{ paddingTop: "32px" }}>
              <span className="text-[11px] font-semibold text-foreground/70">9:41</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-foreground/70">●●●</span>
              </div>
            </div>

            {/* WhatsApp header */}
            <div className="flex items-center gap-2.5 px-3 py-2.5 flex-none" style={{ background: "#075e54" }}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white font-bold text-xs flex-none">
                CB
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-white truncate leading-tight">
                  Clínica Bem Estar
                </p>
                <p className="text-[10px] text-green-200 leading-tight">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-300 mr-1" />
                  Mari — Assistente Virtual
                </p>
              </div>
              <span className="text-[10px] text-green-200 flex-none">🟢</span>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-3 py-3 space-y-0"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23ece5dd'/%3E%3C/svg%3E\")",
              }}
            >
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-[11px] text-muted-foreground/60 text-center px-4">
                    Envie uma mensagem para iniciar o atendimento
                  </p>
                </div>
              )}
              {messages.map((m) => (
                <Bubble key={m.id} msg={m} />
              ))}
              {typing && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div
              className="flex-none flex items-center gap-2 px-3 py-2"
              style={{ background: "#f0f0f0" }}
            >
              <div className="flex-1 flex items-center rounded-full px-3 py-1.5" style={{ background: "#fff" }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={confirmed ? "Agendamento concluído ✅" : "Mensagem..."}
                  disabled={confirmed}
                  className="flex-1 bg-transparent text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || confirmed}
                className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                style={{ background: "#075e54" }}
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Home bar */}
            <div className="flex-none flex justify-center py-2">
              <div className="h-1 w-24 rounded-full bg-foreground/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
