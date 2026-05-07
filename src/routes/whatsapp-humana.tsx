import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Send, RotateCcw, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/whatsapp-humana")({
  component: WhatsappHumanaPage,
});

// ── Types ─────────────────────────────────────────────────────────
type ChatStateH =
  | "idle"
  | "waiting_intent"
  | "waiting_specialty"
  | "waiting_doctor"
  | "waiting_insurance"
  | "waiting_cpf"
  | "waiting_dob"
  | "waiting_confirm"
  | "waiting_time"
  | "waiting_farewell_q"
  | "done"
  | "other";

interface BookingDataH {
  specialty: string;
  doctor: string;
  insurance: string;
  cpf: string;
  dob: string;
  time: string;
  patientName: string;
}

interface ChatMessageH {
  id: string;
  content: string;
  sender: "client" | "ai";
  time: string;
}

const SIMULATED_PATIENT = "Paola Ferreira";
const APPOINTMENT_DATE = "20 de maio de 2026";
const DOCTOR_OPTIONS = ["Sérgio", "Ciro", "Dr. Neto"];
const TIME_OPTIONS = ["13:00", "15:00", "17:00", "19:00"];

function nowH() {
  return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}
function makeIdH() {
  return Math.random().toString(36).slice(2);
}

function extractCpf(text: string): string | null {
  const m = text.match(/\d{3}\.?\d{3}\.?\d{3}-?\d{2}/);
  return m ? m[0] : null;
}

function matchDoctor(text: string): string | null {
  const t = text.toLowerCase();
  if (t.includes("sergio") || t.includes("sérgio")) return "Sérgio";
  if (t.includes("ciro")) return "Ciro";
  if (t.includes("neto")) return "Dr. Neto";
  return null;
}

// ── Typing Indicator ─────────────────────────────────────────────
function TypingH() {
  return (
    <div className="flex items-end gap-1.5 mb-2">
      <div
        className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[9px] font-bold text-white"
        style={{ background: "#075e54" }}
      >
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
function BubbleH({ msg }: { msg: ChatMessageH }) {
  const isClient = msg.sender === "client";
  return (
    <div className={cn("flex items-end gap-1.5 mb-1.5", isClient && "flex-row-reverse")}>
      {!isClient && (
        <div
          className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[9px] font-bold text-white"
          style={{ background: "#075e54" }}
        >
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
          className={cn("flex items-center gap-1 mt-0.5", isClient ? "justify-end" : "justify-start")}
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
function WhatsappHumanaPage() {
  const [messages, setMessages] = useState<ChatMessageH[]>([]);
  const [state, setState] = useState<ChatStateH>("idle");
  const [booking, setBooking] = useState<Partial<BookingDataH>>({});
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function aiReply(content: string, delay = 1200) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: makeIdH(), content, sender: "ai", time: nowH() }]);
    }, delay);
  }

  function pushClient(content: string) {
    setMessages((prev) => [...prev, { id: makeIdH(), content, sender: "client", time: nowH() }]);
  }

  function handleSend() {
    const raw = input.trim();
    if (!raw || done) return;
    setInput("");
    pushClient(raw);
    processInput(raw);
  }

  function processInput(raw: string) {
    const t = raw.toLowerCase();

    // ── idle: qualquer mensagem → saudação ──────────────────────
    if (state === "idle") {
      setState("waiting_intent");
      aiReply("Olá! Tudo bem? 😊\nBem-vindo(a) à *Clínica Bem Estar*! 🌸\n\nComo posso te ajudar hoje?", 1000);
      return;
    }

    // ── intenção: detectar desejo de agendar ────────────────────
    if (state === "waiting_intent" || state === "other") {
      const wantsBooking =
        t.includes("agendar") ||
        t.includes("marcar") ||
        t.includes("consulta") ||
        t.includes("gostaria") ||
        t.includes("quero") ||
        t.includes("preciso");
      if (wantsBooking) {
        setState("waiting_specialty");
        aiReply("Ótimo, vamos marcar! 😊\n\nQual seria a *especialidade*?", 1100);
      } else {
        setState("other");
        aiReply("Entendido! 💙 Nossa equipe pode te ajudar com isso.\n\nSe quiser agendar uma consulta, é só me dizer!", 900);
      }
      return;
    }

    // ── especialidade → oferecer médicos ────────────────────────
    if (state === "waiting_specialty") {
      setBooking((b) => ({ ...b, specialty: raw.trim() }));
      setState("waiting_doctor");
      aiReply("Você tem preferência por algum médico? 😊\n\nTemos disponíveis:\n• Sérgio\n• Ciro\n• Dr. Neto", 1100);
      return;
    }

    // ── médico ──────────────────────────────────────────────────
    if (state === "waiting_doctor") {
      const doctor = matchDoctor(t);
      if (!doctor) {
        aiReply("Não consegui identificar o médico. 😊\n\nPor favor, escolha um:\n• Sérgio\n• Ciro\n• Dr. Neto", 900);
        return;
      }
      setBooking((b) => ({ ...b, doctor }));
      setState("waiting_insurance");
      aiReply(`Ótimo! 💙\n\nNo momento atendemos pelos convênios *Amil* e *Bradesco Saúde*.\n\nO atendimento seria com algum desses convênios ou seria *particular*?`, 1200);
      return;
    }

    // ── convênio ────────────────────────────────────────────────
    if (state === "waiting_insurance") {
      let insurance = "Particular";
      if (t.includes("amil")) insurance = "Amil";
      else if (t.includes("bradesco")) insurance = "Bradesco Saúde";
      setBooking((b) => ({ ...b, insurance }));
      setState("waiting_cpf");
      aiReply(`Ótimo! 💙\n\nPara confirmar seu convênio, poderia me informar o seu *CPF*?`, 1100);
      return;
    }

    // ── CPF → verificar convênio ────────────────────────────────
    if (state === "waiting_cpf") {
      const cpf = extractCpf(raw) ?? raw.trim();
      setBooking((b) => ({ ...b, cpf }));
      setState("waiting_dob");
      aiReply("Verificamos que o seu convênio está OK. ✅\n\nPoderia me informar a sua *data de nascimento*?", 1400);
      return;
    }

    // ── data de nascimento → confirmação de dados ───────────────
    if (state === "waiting_dob") {
      const dob = raw.trim();
      const cpf = booking.cpf ?? "—";
      setBooking((b) => ({ ...b, dob, patientName: SIMULATED_PATIENT }));
      setState("waiting_confirm");
      aiReply(`Obrigado! 😊\n\nPara seguirmos, confirme se seus dados estão corretos:\n\n*Nome:* ${SIMULATED_PATIENT}\n*CPF:* ${cpf}\n*Data de nascimento:* ${dob}\n\nEstá correto?`, 1300);
      return;
    }

    // ── confirmação de dados → horários disponíveis ─────────────
    if (state === "waiting_confirm") {
      const confirmed =
        t.includes("sim") || t.includes("correto") || t.includes("certo") || t.includes("ok");
      if (!confirmed) {
        aiReply("Tudo bem! 😊 Por favor, me informe os dados corretos que farei a atualização.", 900);
        return;
      }
      setState("waiting_time");
      aiReply(`Ótimo, obrigado! 😊\n\nNossa próxima agenda vaga seria em *${APPOINTMENT_DATE}*.\n\nHorários disponíveis:\n• 13:00\n• 15:00\n• 17:00\n• 19:00`, 1200);
      return;
    }

    // ── horário → confirmar agendamento ────────────────────────
    if (state === "waiting_time") {
      const time = TIME_OPTIONS.find((t2) => raw.includes(t2)) ?? raw.trim();
      const doctor = booking.doctor ?? "—";
      const insurance = booking.insurance ?? "—";
      setBooking((b) => ({ ...b, time }));
      setState("waiting_farewell_q");
      aiReply(`Ótimo! Agendado então para *${APPOINTMENT_DATE}* às *${time}* ✅\n\n*Médico:* ${doctor}\n*Convênio:* ${insurance}\n*Paciente:* ${SIMULATED_PATIENT}\n\nAs recomendações para essa consulta são:\n• Trazer carteirinha do plano de saúde\n• Documento com foto\n• Chegar 10 minutos antes da consulta\n\nGostaria de tirar mais alguma dúvida?`, 1500);
      return;
    }

    // ── despedida ───────────────────────────────────────────────
    if (state === "waiting_farewell_q") {
      setState("done");
      setDone(true);
      aiReply("Estamos lhe aguardando e qualquer dúvida estamos à disposição! 💙\n\nTenha um ótimo dia! 🌸\n\n_Clínica Bem Estar_", 1100);
      return;
    }
  }

  function handleReset() {
    setMessages([]);
    setState("idle");
    setBooking({});
    setInput("");
    setTyping(false);
    setDone(false);
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-muted/30">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/60 flex-none">
        <div>
          <h1 className="text-[15px] font-bold text-foreground">Demo WhatsApp IA Humana</h1>
          <p className="text-[11px] text-muted-foreground">
            Fluxo completo: especialidade → médico → convênio → CPF → confirmação → agendamento
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reiniciar
        </button>
      </div>

      {/* Phone frame */}
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
            <div
              className="flex items-center justify-between px-6 pb-1 flex-none"
              style={{ paddingTop: "32px" }}
            >
              <span className="text-[11px] font-semibold text-foreground/70">9:41</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-foreground/70">●●●</span>
              </div>
            </div>

            {/* WhatsApp header */}
            <div
              className="flex items-center gap-2.5 px-3 py-2.5 flex-none"
              style={{ background: "#075e54" }}
            >
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
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-[11px] text-muted-foreground/60 text-center px-4">
                    Envie uma mensagem para iniciar o atendimento
                  </p>
                </div>
              )}
              {messages.map((m) => (
                <BubbleH key={m.id} msg={m} />
              ))}
              {typing && <TypingH />}
              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div
              className="flex-none flex items-center gap-2 px-3 py-2"
              style={{ background: "#f0f0f0" }}
            >
              <div
                className="flex-1 flex items-center rounded-full px-3 py-1.5"
                style={{ background: "#fff" }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={done ? "Atendimento concluído ✅" : "Mensagem..."}
                  disabled={done}
                  className="flex-1 bg-transparent text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
                />
              </div>
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || done}
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
