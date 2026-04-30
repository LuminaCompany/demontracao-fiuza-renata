import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Send, RotateCcw, CheckCheck, Stethoscope, ExternalLink } from "lucide-react";
import { useDemoCrm } from "@/lib/demo-crm";
import type { Lead, Message } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/whatsapp")({
  component: WhatsappPage,
});

// ── Types ─────────────────────────────────────────────────────────
type ChatState =
  | "greeting"
  | "waiting_intent"
  | "waiting_name"
  | "waiting_doctor"
  | "waiting_insurance"
  | "waiting_insurance_name"
  | "waiting_date"
  | "waiting_confirm"
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

const DOCTORS = [
  "👩‍⚕️ Dra. Renata Fiuza — Obstetrícia & Pré-natal",
  "👨‍⚕️ Dr. Carlos Mendes — Ginecologia",
  "👩‍⚕️ Dra. Patricia Lima — Ultrassonografia",
  "👨‍⚕️ Dr. Roberto Alves — Clínica Geral",
];

const DOCTOR_SHORT = [
  "Dra. Renata Fiuza",
  "Dr. Carlos Mendes",
  "Dra. Patricia Lima",
  "Dr. Roberto Alves",
];

const INSURANCES = ["🏥 Unimed", "🏥 Amil", "🏥 Bradesco Saúde", "🏥 SulAmérica", "🏥 Outro plano"];
const INSURANCE_SHORT = ["Unimed", "Amil", "Bradesco Saúde", "SulAmérica", "Outro plano"];

const DAYS = [
  "📆 Segunda-feira — 08h às 17h",
  "📆 Terça-feira — 08h às 17h",
  "📆 Quarta-feira — 08h às 17h",
  "📆 Quinta-feira — 08h às 17h",
  "📆 Sexta-feira — 08h às 12h",
];

const DAY_SHORT = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];

function now() {
  return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function makeId() {
  return Math.random().toString(36).slice(2);
}

const GREETING_MSG: ChatMessage = {
  id: "ai-0",
  content:
    "Olá! 👋 Bem-vindo(a) à *Clínica Renata Fiuza* 🌸\n\nSou a Mari, assistente virtual da clínica. Como posso te ajudar hoje?",
  sender: "ai",
  time: now(),
};

// ── Quick Reply Button ────────────────────────────────────────────
function QuickReply({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-emerald-600 px-4 py-1.5 text-[12px] font-medium text-emerald-700 dark:text-emerald-400 dark:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors whitespace-nowrap"
    >
      {label}
    </button>
  );
}

// ── Typing Indicator ─────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
        M
      </div>
      <div className="rounded-2xl rounded-bl-sm bg-white dark:bg-zinc-800 px-4 py-2.5 shadow-sm">
        <div className="flex gap-1 items-center h-4">
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
    <div className={cn("flex items-end gap-2 mb-2", isClient && "flex-row-reverse")}>
      {!isClient && (
        <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
          M
        </div>
      )}
      <div
        className={cn(
          "max-w-[72%] rounded-2xl px-3.5 py-2 shadow-sm",
          isClient
            ? "rounded-br-sm bg-emerald-500 text-white"
            : "rounded-bl-sm bg-white dark:bg-zinc-800 text-foreground",
        )}
      >
        <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
        <div
          className={cn(
            "flex items-center gap-1 mt-0.5",
            isClient ? "justify-end" : "justify-start",
          )}
        >
          <span
            className={cn(
              "text-[10px]",
              isClient ? "text-emerald-100" : "text-muted-foreground",
            )}
          >
            {msg.time}
          </span>
          {isClient && <CheckCheck className="h-3 w-3 text-emerald-100" />}
        </div>
      </div>
    </div>
  );
}

// ── CRM Preview Panel ─────────────────────────────────────────────
function CrmPreview({
  booking,
  state,
}: {
  booking: Partial<BookingData>;
  state: ChatState;
}) {
  const confirmed = state === "confirmed";
  const fields = [
    { icon: "👤", label: "Paciente", value: booking.name },
    { icon: "👩‍⚕️", label: "Médico(a)", value: booking.doctor },
    {
      icon: "🏥",
      label: "Plano de Saúde",
      value:
        booking.hasInsurance === false
          ? "Particular"
          : booking.hasInsurance
            ? booking.insuranceName || "Identificando..."
            : undefined,
    },
    { icon: "📅", label: "Dia preferido", value: booking.preferredDay },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Stethoscope className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="text-[14px] font-bold text-foreground">CRM ao Vivo</h2>
            <p className="text-[11px] text-muted-foreground">Dados capturados pela IA</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-5 py-5 space-y-4">
        {/* Status badge */}
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl px-4 py-3 text-[12px] font-medium",
            confirmed
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
          )}
        >
          <span className={cn("h-2 w-2 rounded-full", confirmed ? "bg-emerald-500" : "bg-amber-400 animate-pulse")} />
          {confirmed ? "✅ Paciente adicionado ao CRM!" : "⏳ Atendimento em andamento..."}
        </div>

        {/* Fields */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {fields.map((f, i) => (
            <div
              key={f.label}
              className={cn(
                "flex items-center gap-3 px-4 py-3",
                i < fields.length - 1 && "border-b border-border/60",
              )}
            >
              <span className="text-base flex-none">{f.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {f.label}
                </p>
                {f.value ? (
                  <p className="text-[13px] font-medium text-foreground truncate">{f.value}</p>
                ) : (
                  <p className="text-[13px] text-muted-foreground/40 italic">Aguardando...</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stage */}
        <div className="rounded-xl border border-border bg-card px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Etapa no CRM
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["Novo Contato", "Consulta Agendada", "Confirmada"].map((s, i) => {
              const active =
                (i === 0 && !booking.name) ||
                (i === 1 && booking.name && !confirmed) ||
                (i === 2 && confirmed);
              return (
                <span
                  key={s}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-medium",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {s}
                </span>
              );
            })}
          </div>
        </div>

        {confirmed && (
          <Link
            to="/atendimentos"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-[13px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Ver no CRM — Atendimentos
          </Link>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
function WhatsappPage() {
  const { addWaLead } = useDemoCrm();

  const [messages, setMessages] = useState<ChatMessage[]>([GREETING_MSG]);
  const [state, setState] = useState<ChatState>("greeting");
  const [booking, setBooking] = useState<Partial<BookingData>>({});
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<string[]>([
    "📅 Agendar Consulta",
    "💬 Tirar uma Dúvida",
    "📋 Outros Assuntos",
  ]);

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

  function handleQuickReply(label: string) {
    setQuickReplies([]);
    pushClient(label.replace(/^[^\w\s]*\s*/, "").split("—")[0].trim());
    processInput(label, true);
  }

  function handleSend() {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    setQuickReplies([]);
    pushClient(text);
    processInput(text, false);
  }

  function processInput(raw: string, isQuick: boolean) {
    const text = raw.toLowerCase();

    if (state === "greeting" || state === "waiting_intent") {
      if (
        text.includes("agendar") ||
        text.includes("consulta") ||
        text.includes("marcar") ||
        text.includes("appointment")
      ) {
        setState("waiting_name");
        aiReply(
          "Ótimo! 😊 Vou te ajudar a agendar sua consulta.\n\nPrimeiro, qual é o seu *nome completo*?",
        );
      } else {
        setState("other");
        aiReply(
          "Entendido! 💙 Nossa equipe entrará em contato em breve para te ajudar.\n\nSe quiser agendar uma consulta, é só me dizer! 😊",
          900,
        );
        setQuickReplies(["📅 Quero agendar uma consulta"]);
      }
      return;
    }

    if (state === "other") {
      setState("waiting_name");
      aiReply("Ótimo! Qual é o seu *nome completo*?");
      return;
    }

    if (state === "waiting_name") {
      const name = raw.replace(/^[^\w\s]*\s*/, "").split("—")[0].trim();
      setBooking((b) => ({ ...b, name }));
      setState("waiting_doctor");
      setQuickReplies(DOCTORS);
      aiReply(
        `Prazer, *${name}*! 🌸\n\nCom qual médico(a) você deseja consultar?\n\n${DOCTORS.join("\n")}`,
        1000,
      );
      return;
    }

    if (state === "waiting_doctor") {
      const idx = DOCTORS.findIndex((d) => raw.includes(d) || raw.toLowerCase().includes(DOCTOR_SHORT[DOCTORS.indexOf(d)]?.toLowerCase() ?? ""));
      const doctorIdx = isQuick
        ? DOCTORS.findIndex((d) => d === raw || d.startsWith(raw))
        : DOCTOR_SHORT.findIndex((d) => text.includes(d.toLowerCase()));

      const doctor = doctorIdx >= 0 ? DOCTOR_SHORT[doctorIdx] : raw.trim();
      setBooking((b) => ({ ...b, doctor }));
      setState("waiting_insurance");
      setQuickReplies(["✅ Tenho plano de saúde", "💳 Vou pagar particular"]);
      aiReply(
        `Perfeito! *${doctor}* 💙\n\nVocê possui plano de saúde?\n\n✅ Tenho plano de saúde\n💳 Vou pagar particular`,
        1100,
      );
      return;
    }

    if (state === "waiting_insurance") {
      const hasInsurance = !text.includes("particular") && !text.includes("pagar particular");
      setBooking((b) => ({ ...b, hasInsurance }));
      if (hasInsurance) {
        setState("waiting_insurance_name");
        setQuickReplies(INSURANCES);
        aiReply(
          `Ótimo! Qual é o seu plano de saúde?\n\n${INSURANCES.join("\n")}`,
          900,
        );
      } else {
        setBooking((b) => ({ ...b, insuranceName: "Particular" }));
        setState("waiting_date");
        setQuickReplies(DAYS);
        aiReply(
          `Tudo certo! Atendemos particular com pagamento facilitado 💳\n\nQual o melhor dia da semana para você?\n\n${DAYS.join("\n")}`,
          1000,
        );
      }
      return;
    }

    if (state === "waiting_insurance_name") {
      const insIdx = isQuick
        ? INSURANCES.findIndex((i) => i === raw || i.startsWith(raw))
        : INSURANCE_SHORT.findIndex((i) => text.includes(i.toLowerCase()));
      const insuranceName = insIdx >= 0 ? INSURANCE_SHORT[insIdx] : raw.trim();
      setBooking((b) => ({ ...b, insuranceName }));
      setState("waiting_date");
      setQuickReplies(DAYS);
      aiReply(
        `Trabalhamos com *${insuranceName}* ✅\n\nQual o melhor dia da semana para você?\n\n${DAYS.join("\n")}`,
        1000,
      );
      return;
    }

    if (state === "waiting_date") {
      const dayIdx = isQuick
        ? DAYS.findIndex((d) => d === raw || d.startsWith(raw))
        : DAY_SHORT.findIndex((d) => text.includes(d.toLowerCase()));
      const preferredDay = dayIdx >= 0 ? DAY_SHORT[dayIdx] : raw.trim();
      const finalBooking = { ...booking, preferredDay };
      setBooking(finalBooking);
      setState("waiting_confirm");
      setQuickReplies(["✅ Sim, confirmar agendamento", "↩️ Alterar informações"]);

      const ins = finalBooking.hasInsurance === false ? "Particular" : finalBooking.insuranceName;
      aiReply(
        `Perfeito! ✨ Veja o resumo do seu agendamento:\n\n👤 *Paciente:* ${finalBooking.name}\n👩‍⚕️ *Médico(a):* ${finalBooking.doctor}\n🏥 *Plano:* ${ins}\n📅 *Dia:* ${preferredDay}\n⏰ *Horário:* Nossa equipe confirmará em breve\n\nConfirmo o agendamento?`,
        1400,
      );
      return;
    }

    if (state === "waiting_confirm") {
      if (text.includes("sim") || text.includes("confirmar") || text.includes("confirma")) {
        setState("confirmed");
        setQuickReplies([]);
        aiReply(
          `🎉 *Agendamento solicitado com sucesso!*\n\nEm breve nossa equipe entrará em contato para confirmar o horário exato.\n\n📱 Fique atento ao seu WhatsApp!\n❤️ Clínica Renata Fiuza agradece a sua confiança!\n\n_Nos vemos em breve, ${booking.name}_ 🌸`,
          1200,
        );

        // Add patient to CRM
        const newLead: Lead = {
          id: `wa-${Date.now()}`,
          name: booking.name!,
          phone: "—",
          status: "ativo",
          stage: "em_orcamento",
          pendingItems: [
            "Confirmar horário exato com a paciente",
            `Verificar disponibilidade — ${booking.doctor}`,
          ],
          tagIds: ["t1", "t7"],
          lastMessage: "Agendamento solicitado via WhatsApp ✅",
          lastMessageTime: now(),
          unreadCount: 1,
          totalPurchases: 0,
          totalSpent: 0,
          createdAt: new Date().toISOString().split("T")[0],
          notes: `Paciente agendada via WhatsApp IA. Dia preferido: ${booking.preferredDay}`,
          doctor: booking.doctor,
          healthInsurance:
            booking.hasInsurance === false ? "Particular" : booking.insuranceName,
          appointmentDate: booking.preferredDay,
          appointmentType: "consulta",
          messages: [
            {
              id: "wa-m1",
              content: "Agendamento solicitado via WhatsApp IA",
              sender: "system",
              time: now(),
            },
            {
              id: "wa-m2",
              content: `Paciente solicitou consulta com ${booking.doctor} na ${booking.preferredDay}. Plano: ${booking.hasInsurance === false ? "Particular" : booking.insuranceName}.`,
              sender: "attendant",
              senderName: "IA — Mari",
              time: now(),
              status: "sent",
            },
          ],
        };
        addWaLead(newLead);
      } else {
        setState("waiting_name");
        setBooking({});
        setQuickReplies([]);
        aiReply(
          "Tudo bem! 😊 Vamos recomeçar. Qual é o seu *nome completo*?",
          800,
        );
      }
      return;
    }
  }

  function handleReset() {
    setMessages([GREETING_MSG]);
    setState("greeting");
    setBooking({});
    setInput("");
    setTyping(false);
    setQuickReplies([
      "📅 Agendar Consulta",
      "💬 Tirar uma Dúvida",
      "📋 Outros Assuntos",
    ]);
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Page Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40 flex-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
              <span className="text-lg">💬</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Demo WhatsApp IA</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Demonstração ao vivo — você é o paciente
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-[12px] font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reiniciar demo
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Panel */}
        <div className="flex flex-col flex-1 min-w-0 border-r border-border">
          {/* WhatsApp-style header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-emerald-700 dark:bg-emerald-900 flex-none">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white font-bold text-sm flex-none">
              RF
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-white truncate">
                Clínica Renata Fiuza
              </p>
              <p className="text-[11px] text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 inline-block mr-1" />
                Mari — Assistente Virtual
              </p>
            </div>
            <div className="text-[11px] text-emerald-200 flex-none">🟢 Online</div>
          </div>

          {/* Messages area */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4"
            style={{
              backgroundImage: "radial-gradient(circle, oklch(0.92 0.01 150) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          >
            {messages.map((m) => (
              <Bubble key={m.id} msg={m} />
            ))}
            {typing && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {quickReplies.length > 0 && !typing && (
            <div className="flex-none border-t border-border/50 bg-background px-4 py-2.5 flex flex-wrap gap-2">
              {quickReplies.map((qr) => (
                <QuickReply key={qr} label={qr} onClick={() => handleQuickReply(qr)} />
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex-none border-t border-border bg-background px-4 py-3 flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={
                state === "confirmed"
                  ? "Agendamento concluído ✅"
                  : "Digite sua mensagem..."
              }
              disabled={state === "confirmed"}
              className="flex-1 rounded-full border border-border bg-muted px-4 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || state === "confirmed"}
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* CRM Preview Panel */}
        <div className="w-[320px] flex-none bg-card hidden lg:flex flex-col">
          <CrmPreview booking={booking} state={state} />
        </div>
      </div>
    </div>
  );
}
