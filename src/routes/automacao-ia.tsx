import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bot,
  MessageSquare,
  Clock,
  Heart,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Repeat2,
  Star,
  Sparkles,
  PlusCircle,
  GripVertical,
  Trash2,
  Check,
  CalendarCheck,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/automacao-ia")({
  component: AutomacaoPage,
});

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 flex-none cursor-pointer items-center rounded-full transition-colors",
        checked ? "bg-primary" : "bg-muted",
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-[18px]" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
  color = "text-primary",
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
        <Icon className={cn("h-4.5 w-4.5", color)} />
      </div>
      <div>
        <h2 className="text-[14px] font-bold text-foreground">{title}</h2>
        <p className="text-[12px] text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5", className)}>{children}</div>
  );
}

// ── Confirmação de Consultas ──────────────────────────────────────
function ConfirmacaoConsultasSection() {
  const [enabled, setEnabled] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [reminders, setReminders] = useState([
    {
      id: "r1",
      label: "Lembrete — 48h antes",
      delay: "48 horas",
      message:
        "Olá, [Nome]! 🌸 Lembramos que você tem consulta com [Médico] em *2 dias*, [Data] às [Horário]. Traga carteirinha do plano e documento com foto. Confirme sua presença respondendo *SIM*. 😊",
      enabled: true,
    },
    {
      id: "r2",
      label: "Lembrete — 24h antes",
      delay: "24 horas",
      message:
        "Olá, [Nome]! 💙 Sua consulta com [Médico] é *amanhã* às [Horário]. Clique para confirmar presença: *SIM* para confirmar ou *NÃO* para remarcar. 📅",
      enabled: true,
    },
    {
      id: "r3",
      label: "Lembrete — 2h antes",
      delay: "2 horas",
      message:
        "Lembrete: sua consulta é *hoje* às [Horário] com [Médico] na Clínica Renata Fiuza! 🏥 Chegue 10 minutinhos antes. Até já! 🌸",
      enabled: true,
    },
    {
      id: "r4",
      label: "Confirmação de cirurgia — 72h antes",
      delay: "72 horas",
      message:
        "Olá, [Nome]! 🎉 Sua cirurgia com [Médico] está confirmada para [Data] às [Horário]. Inicie o jejum às 22h do dia anterior e chegue às 05h30. Dúvidas? Estamos aqui! 💙",
      enabled: false,
    },
  ]);

  const timeOptions = [
    { value: "1 hora", label: "1 hora antes" },
    { value: "2 horas", label: "2 horas antes" },
    { value: "4 horas", label: "4 horas antes" },
    { value: "12 horas", label: "12 horas antes" },
    { value: "24 horas", label: "24 horas antes" },
    { value: "48 horas", label: "48 horas antes" },
    { value: "72 horas", label: "72 horas antes" },
    { value: "7 dias", label: "7 dias antes" },
  ];

  return (
    <section>
      <SectionHeader
        icon={CalendarCheck}
        title="Confirmação de Consultas"
        description="Lembretes automáticos enviados antes de consultas e cirurgias"
        color="text-primary"
      />
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Toggle checked={enabled} onChange={setEnabled} />
            <span className={cn("text-[13px] font-medium", enabled ? "text-foreground" : "text-muted-foreground")}>
              {enabled ? "Ativado" : "Desativado"}
            </span>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            {expanded ? "Recolher" : "Configurar"}
          </button>
        </div>

        {expanded && (
          <div className="space-y-4">
            {reminders.map((r, idx) => (
              <div
                key={r.id}
                className={cn(
                  "rounded-xl border p-4 space-y-3 transition-opacity",
                  r.enabled ? "border-border" : "border-border/50 opacity-60",
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-3.5 w-3.5 text-muted-foreground cursor-grab" />
                    <span className="text-[12px] font-semibold text-foreground">{r.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Toggle
                      checked={r.enabled}
                      onChange={(v) =>
                        setReminders((prev) => prev.map((x, i) => (i === idx ? { ...x, enabled: v } : x)))
                      }
                    />
                    <button className="p-1 text-muted-foreground hover:text-destructive transition-colors rounded">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-muted-foreground">
                      Enviar com antecedência de
                    </label>
                    <select
                      defaultValue={r.delay}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    >
                      {timeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-muted-foreground">
                      Horário de envio
                    </label>
                    <input
                      type="time"
                      defaultValue="08:00"
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-muted-foreground">
                    Mensagem{" "}
                    <span className="text-muted-foreground/60">
                      (use [Nome], [Médico], [Data], [Horário])
                    </span>
                  </label>
                  <textarea
                    defaultValue={r.message}
                    rows={2}
                    className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>
              </div>
            ))}

            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-2.5 text-[12px] text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors">
              <PlusCircle className="h-3.5 w-3.5" />
              Adicionar novo lembrete
            </button>
          </div>
        )}
      </Card>
    </section>
  );
}

// ── Follow Up Pós-Consulta ────────────────────────────────────────
function FollowUpSection() {
  const [enabled, setEnabled] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [followUps, setFollowUps] = useState([
    {
      id: "fu1",
      label: "Pós-consulta — feedback",
      delay: "24",
      delayUnit: "horas",
      message:
        "Olá, [Nome]! 😊 Como foi sua consulta ontem com [Médico]? Sua opinião é muito importante para nós. Dê uma nota de 1 a 5 ⭐",
      enabled: true,
    },
    {
      id: "fu2",
      label: "Sem resposta — reengajamento",
      delay: "48",
      delayUnit: "horas",
      message:
        "Oi, [Nome]! Vimos que você entrou em contato e não chegamos a finalizar o agendamento. Posso te ajudar a marcar uma consulta? 💙",
      enabled: true,
    },
    {
      id: "fu3",
      label: "Lembrete de retorno",
      delay: "30",
      delayUnit: "dias",
      message:
        "Olá, [Nome]! 🌸 Passou um mês desde sua última consulta com [Médico]. Que tal agendar seu retorno? Temos horários disponíveis esta semana!",
      enabled: false,
    },
  ]);

  const timeOptions = [
    { value: "12 horas", label: "12 horas após" },
    { value: "24 horas", label: "24 horas após" },
    { value: "48 horas", label: "48 horas após" },
    { value: "72 horas", label: "72 horas após" },
    { value: "7 dias", label: "7 dias após" },
    { value: "15 dias", label: "15 dias após" },
    { value: "30 dias", label: "30 dias após" },
  ];

  return (
    <section>
      <SectionHeader
        icon={Clock}
        title="Follow Up Automático"
        description="Mensagens automáticas para pacientes que ficaram sem retorno"
      />
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Toggle checked={enabled} onChange={setEnabled} />
            <span className={cn("text-[13px] font-medium", enabled ? "text-foreground" : "text-muted-foreground")}>
              {enabled ? "Ativado" : "Desativado"}
            </span>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            {expanded ? "Recolher" : "Configurar"}
          </button>
        </div>

        {expanded && (
          <div className="space-y-4">
            {followUps.map((fu, idx) => (
              <div
                key={fu.id}
                className={cn(
                  "rounded-xl border p-4 space-y-3 transition-opacity",
                  fu.enabled ? "border-border" : "border-border/50 opacity-60",
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-3.5 w-3.5 text-muted-foreground cursor-grab" />
                    <span className="text-[12px] font-semibold text-foreground">{fu.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Toggle
                      checked={fu.enabled}
                      onChange={(v) =>
                        setFollowUps((prev) => prev.map((f, i) => (i === idx ? { ...f, enabled: v } : f)))
                      }
                    />
                    <button className="p-1 text-muted-foreground hover:text-destructive transition-colors rounded">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-muted-foreground">
                      Enviar após
                    </label>
                    <select
                      defaultValue={`${fu.delay} ${fu.delayUnit}`}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    >
                      {timeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-muted-foreground">
                      Enviar apenas
                    </label>
                    <select
                      defaultValue="uma_vez"
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    >
                      <option value="uma_vez">Uma vez por paciente</option>
                      <option value="cada_vez">Cada vez que ativar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-muted-foreground">
                    Mensagem{" "}
                    <span className="text-muted-foreground/60">(use [Nome] e [Médico])</span>
                  </label>
                  <textarea
                    defaultValue={fu.message}
                    rows={2}
                    className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                </div>
              </div>
            ))}

            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-2.5 text-[12px] text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors">
              <PlusCircle className="h-3.5 w-3.5" />
              Adicionar novo follow up
            </button>
          </div>
        )}
      </Card>
    </section>
  );
}

// ── Fidelização de Pacientes ──────────────────────────────────────
function FidelizacaoSection() {
  const [expanded, setExpanded] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: "f1",
      icon: Star,
      label: "Pós-consulta — avaliação",
      desc: "Solicitação de avaliação enviada após encerramento do atendimento",
      delay: "1 dia",
      message:
        "Olá, [Nome]! 🌟 Esperamos que sua consulta tenha sido ótima! Avalie nosso atendimento de 1 a 5 ⭐ — sua opinião é muito importante para nós. Clínica Renata Fiuza 💙",
      enabled: true,
    },
    {
      id: "f2",
      icon: Repeat2,
      label: "Reativação de pacientes inativos",
      desc: "Para pacientes que não retornaram após 3 meses",
      delay: "90 dias",
      message:
        "Oi, [Nome]! Sentimos sua falta! 😊 Está na hora do seu acompanhamento ginecológico? Temos horários disponíveis com [Médico] esta semana. Agende já!",
      enabled: true,
    },
    {
      id: "f3",
      icon: Heart,
      label: "Aniversário da paciente",
      desc: "Parabenize suas pacientes no dia do aniversário",
      delay: "0 dias",
      message:
        "Feliz aniversário, [Nome]! 🎉🎂 Toda a equipe da Clínica Renata Fiuza deseja um dia maravilhoso! Com carinho, Dra. Renata ❤️",
      enabled: false,
    },
    {
      id: "f4",
      icon: Bell,
      label: "Preventivo anual",
      desc: "Lembrete de exame preventivo para pacientes ativas há 1 ano",
      delay: "365 dias",
      message:
        "Olá, [Nome]! 💙 Passou 1 ano desde sua última consulta. O exame preventivo anual é essencial para sua saúde! Agende agora com a Dra. Renata Fiuza. 🌸",
      enabled: true,
    },
  ]);

  const timeOptions = [
    { value: "1 dia", label: "1 dia após" },
    { value: "3 dias", label: "3 dias após" },
    { value: "7 dias", label: "7 dias após" },
    { value: "30 dias", label: "30 dias após" },
    { value: "60 dias", label: "60 dias após" },
    { value: "90 dias", label: "90 dias após" },
    { value: "180 dias", label: "180 dias após" },
    { value: "365 dias", label: "365 dias após" },
    { value: "0 dias", label: "No dia" },
  ];

  return (
    <section>
      <SectionHeader
        icon={Heart}
        title="Fidelização de Pacientes"
        description="Mantenha relacionamento contínuo com suas pacientes de forma automática"
        color="text-rose-500"
      />
      <Card>
        <div className="flex items-center justify-between mb-4">
          <p className="text-[12px] text-muted-foreground">
            Configure mensagens automáticas para diferentes momentos do relacionamento com a paciente.
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors ml-4 flex-none"
          >
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            {expanded ? "Recolher" : "Expandir"}
          </button>
        </div>

        {expanded && (
          <div className="space-y-4">
            {messages.map((msg, idx) => {
              const Icon = msg.icon;
              return (
                <div
                  key={msg.id}
                  className={cn(
                    "rounded-xl border p-4 space-y-3 transition-opacity",
                    msg.enabled ? "border-border" : "border-border/50 opacity-60",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-lg",
                          msg.enabled ? "bg-primary/10" : "bg-muted",
                        )}
                      >
                        <Icon
                          className={cn("h-3.5 w-3.5", msg.enabled ? "text-primary" : "text-muted-foreground")}
                        />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-foreground">{msg.label}</p>
                        <p className="text-[11px] text-muted-foreground">{msg.desc}</p>
                      </div>
                    </div>
                    <Toggle
                      checked={msg.enabled}
                      onChange={(v) =>
                        setMessages((prev) => prev.map((m, i) => (i === idx ? { ...m, enabled: v } : m)))
                      }
                    />
                  </div>

                  {msg.enabled && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-medium text-muted-foreground">
                            Quando enviar
                          </label>
                          <select
                            defaultValue={msg.delay}
                            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                          >
                            {timeOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-medium text-muted-foreground">
                            Horário preferencial
                          </label>
                          <input
                            type="time"
                            defaultValue="09:00"
                            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-muted-foreground">
                          Mensagem{" "}
                          <span className="text-muted-foreground/60">(use [Nome] e [Médico])</span>
                        </label>
                        <textarea
                          defaultValue={msg.message}
                          rows={2}
                          className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </section>
  );
}

// ── Outras Automações ─────────────────────────────────────────────
function OutrasAutomacoesSection() {
  const [items, setItems] = useState([
    {
      id: "oa1",
      title: "Resumo automático do atendimento",
      desc: "Ao encerrar um atendimento, a IA gera um resumo completo do histórico da paciente.",
      enabled: true,
    },
    {
      id: "oa2",
      title: "Classificação automática de pacientes",
      desc: "A IA classifica pacientes como potencial, ativo ou finalizado com base nas mensagens.",
      enabled: true,
    },
    {
      id: "oa3",
      title: "Confirmação de presença via IA",
      desc: "A IA coleta automaticamente a confirmação de presença da paciente e atualiza o CRM.",
      enabled: true,
    },
    {
      id: "oa4",
      title: "Triagem inicial de urgência",
      desc: "A IA identifica mensagens com palavras de urgência e prioriza o atendimento.",
      enabled: false,
    },
  ]);

  return (
    <section>
      <SectionHeader
        icon={Sparkles}
        title="Outras Automações"
        description="Recursos adicionais de inteligência artificial para a clínica"
        color="text-violet-500"
      />
      <Card>
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={item.id} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] font-medium text-foreground">{item.title}</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
              <Toggle
                checked={item.enabled}
                onChange={(v) =>
                  setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, enabled: v } : it)))
                }
              />
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────
function AutomacaoPage() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Automação</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Configure confirmações de consultas, follow ups e fidelização de pacientes
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-5 max-w-3xl space-y-8">
        <ConfirmacaoConsultasSection />
        <FollowUpSection />
        <FidelizacaoSection />
        <OutrasAutomacoesSection />

        <div className="flex justify-end pb-4">
          <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
            <Check className="h-4 w-4" />
            Salvar configurações
          </button>
        </div>
      </div>
    </div>
  );
}
