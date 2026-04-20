import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bot,
  MessageSquare,
  Clock,
  Heart,
  Users,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Repeat2,
  Star,
  Sparkles,
  PlusCircle,
  GripVertical,
  Trash2,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { attendants } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/automacao-ia")({
  component: AutomacaoIAPage,
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

function SectionHeader({ icon: Icon, title, description, color = "text-primary" }: {
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
    <div className={cn("rounded-2xl border border-border bg-card p-5", className)}>
      {children}
    </div>
  );
}

// ── Follow Up Config ──────────────────────────────────────────────
function FollowUpSection() {
  const [enabled, setEnabled] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [followUps, setFollowUps] = useState([
    {
      id: "fu1",
      label: "Sem resposta — rápido",
      delay: "1",
      delayUnit: "hora",
      message: "Oi, [Nome]! Vi que você ficou com alguma dúvida. Posso te ajudar? 😊 Estou aqui!",
      enabled: true,
    },
    {
      id: "fu2",
      label: "Sem resposta — médio",
      delay: "24",
      delayUnit: "horas",
      message: "Oi, [Nome]! Tudo bem? Vi que não chegamos a finalizar seu atendimento. Ainda posso te ajudar com o [Produto]? 😊",
      enabled: true,
    },
    {
      id: "fu3",
      label: "Sem resposta — longo",
      delay: "3",
      delayUnit: "dias",
      message: "Olá [Nome]! Passando para saber se posso ajudar com algo. Temos novidades e condições especiais essa semana! 🎉",
      enabled: false,
    },
  ]);

  const timeOptions = [
    { value: "30 minutos", label: "30 minutos" },
    { value: "1 hora", label: "1 hora" },
    { value: "2 horas", label: "2 horas" },
    { value: "4 horas", label: "4 horas" },
    { value: "8 horas", label: "8 horas" },
    { value: "12 horas", label: "12 horas" },
    { value: "24 horas", label: "24 horas" },
    { value: "48 horas", label: "48 horas" },
    { value: "3 dias", label: "3 dias" },
    { value: "7 dias", label: "7 dias" },
  ];

  return (
    <section>
      <SectionHeader
        icon={Clock}
        title="Follow Up Automático"
        description="Envie mensagens automáticas para leads que ficaram sem resposta"
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
                      onChange={(v) => setFollowUps(prev => prev.map((f, i) => i === idx ? { ...f, enabled: v } : f))}
                    />
                    <button className="p-1 text-muted-foreground hover:text-destructive transition-colors rounded">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-muted-foreground">Tempo sem resposta para ativar</label>
                    <select
                      defaultValue={`${fu.delay} ${fu.delayUnit}`}
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    >
                      {timeOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-muted-foreground">Enviar apenas</label>
                    <select
                      defaultValue="uma_vez"
                      className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    >
                      <option value="uma_vez">Uma vez por atendimento</option>
                      <option value="cada_vez">Cada vez que ativar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-muted-foreground">
                    Mensagem de follow up
                    <span className="ml-1 text-muted-foreground/60">(use [Nome] para o nome do cliente)</span>
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

// ── Fidelização ───────────────────────────────────────────────────
function FidelizacaoSection() {
  const [expanded, setExpanded] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: "f1",
      icon: Star,
      label: "Pós-venda",
      desc: "Mensagem enviada após a conclusão de um atendimento",
      delay: "3",
      delayUnit: "dias",
      message: "Olá, [Nome]! 🌟 Esperamos que esteja satisfeito(a) com o serviço da Fiuza! Qualquer dúvida, estamos à disposição. Nos avalie! ⭐",
      enabled: true,
    },
    {
      id: "f2",
      icon: Repeat2,
      label: "Reativação de clientes inativos",
      desc: "Para clientes que não entram em contato há algum tempo",
      delay: "30",
      delayUnit: "dias",
      message: "Oi, [Nome]! Sentimos sua falta! 😊 Temos novidades incríveis e condições especiais esperando por você. Que tal um orçamento atualizado?",
      enabled: true,
    },
    {
      id: "f3",
      icon: Heart,
      label: "Aniversário do cliente",
      desc: "Parabenize seus clientes no aniversário",
      delay: "0",
      delayUnit: "dias",
      message: "Feliz aniversário, [Nome]! 🎉🎂 A equipe Fiuza deseja um dia especial para você! Como presente, temos uma condição exclusiva disponível hoje.",
      enabled: false,
    },
    {
      id: "f4",
      icon: Sparkles,
      label: "Cliente VIP",
      desc: "Para clientes com alto valor de compra acima de R$ 5.000",
      delay: "60",
      delayUnit: "dias",
      message: "Olá, [Nome]! Como cliente VIP, você tem acesso antecipado às nossas novas coleções e descontos exclusivos. Confira as novidades! ✨",
      enabled: false,
    },
  ]);

  const timeOptions = [
    { value: "1 dia", label: "1 dia após" },
    { value: "3 dias", label: "3 dias após" },
    { value: "7 dias", label: "7 dias após" },
    { value: "15 dias", label: "15 dias após" },
    { value: "30 dias", label: "30 dias após" },
    { value: "60 dias", label: "60 dias após" },
    { value: "90 dias", label: "90 dias após" },
    { value: "0 dias", label: "No dia" },
  ];

  return (
    <section>
      <SectionHeader
        icon={Heart}
        title="Mensagens de Fidelização"
        description="Mantenha relacionamento com seus clientes de forma automática"
        color="text-rose-500"
      />
      <Card>
        <div className="flex items-center justify-between mb-4">
          <p className="text-[12px] text-muted-foreground">
            Configure mensagens automáticas para diferentes momentos do relacionamento com o cliente.
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
                      <div className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-lg",
                        msg.enabled ? "bg-primary/10" : "bg-muted",
                      )}>
                        <Icon className={cn("h-3.5 w-3.5", msg.enabled ? "text-primary" : "text-muted-foreground")} />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-foreground">{msg.label}</p>
                        <p className="text-[11px] text-muted-foreground">{msg.desc}</p>
                      </div>
                    </div>
                    <Toggle
                      checked={msg.enabled}
                      onChange={(v) => setMessages(prev => prev.map((m, i) => i === idx ? { ...m, enabled: v } : m))}
                    />
                  </div>

                  {msg.enabled && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-medium text-muted-foreground">Quando enviar</label>
                          <select
                            defaultValue={`${msg.delay} ${msg.delayUnit}`}
                            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                          >
                            {timeOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] font-medium text-muted-foreground">Horário preferencial</label>
                          <input
                            type="time"
                            defaultValue="09:00"
                            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-muted-foreground">
                          Mensagem <span className="text-muted-foreground/60">(use [Nome] e [Produto])</span>
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

// ── Triagem de Leads ──────────────────────────────────────────────
function TriagemSection() {
  const [enabled, setEnabled] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [greetingMsg, setGreetingMsg] = useState(
    "Olá! Bem-vindo à **Fiuza** 🏗️\n\nSou a assistente virtual. Com qual atendente você deseja falar?"
  );
  const [attendantList, setAttendantList] = useState(
    attendants
      .filter(a => !["a11", "a12", "a14"].includes(a.id))
      .map(a => ({
        ...a,
        inList: ["a1", "a2", "a3", "a4", "a5", "a6"].includes(a.id),
        onVacation: false,
      }))
  );

  return (
    <section>
      <SectionHeader
        icon={MessageSquare}
        title="Triagem de Leads"
        description="IA apresenta atendentes disponíveis para o cliente na primeira mensagem"
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
          <div className="space-y-5">
            {/* Greeting message */}
            <div>
              <label className="text-[12px] font-semibold text-foreground">Mensagem de saudação</label>
              <p className="text-[11px] text-muted-foreground mb-1.5">Esta mensagem é enviada automaticamente quando o cliente enviar a primeira mensagem.</p>
              <textarea
                value={greetingMsg}
                onChange={e => setGreetingMsg(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
            </div>

            {/* Attendant list config */}
            <div>
              <label className="text-[12px] font-semibold text-foreground">Lista de atendentes na triagem</label>
              <p className="text-[11px] text-muted-foreground mb-3">
                Gerencie quais atendentes aparecem na lista de seleção. Atendentes de férias não aparecem temporariamente.
              </p>
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="grid grid-cols-[1fr_auto_auto_auto] gap-0 text-[11px] font-semibold text-muted-foreground bg-muted/40 px-4 py-2 border-b border-border">
                  <span>Atendente</span>
                  <span className="text-center px-4">Na lista</span>
                  <span className="text-center px-4">Férias</span>
                  <span className="text-center px-3">Status</span>
                </div>
                {attendantList.map((att, idx) => (
                  <div key={att.id} className={cn(
                    "grid grid-cols-[1fr_auto_auto_auto] items-center px-4 py-2.5 gap-0",
                    idx !== attendantList.length - 1 && "border-b border-border/50",
                    att.onVacation && "opacity-60",
                  )}>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex h-6 w-6 flex-none items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ backgroundColor: att.color }}
                      >
                        {att.initials}
                      </div>
                      <div>
                        <p className="text-[12px] font-medium text-foreground">{att.name}</p>
                        <p className="text-[10px] text-muted-foreground">{att.department}</p>
                      </div>
                    </div>
                    <div className="flex justify-center px-4">
                      <Toggle
                        checked={att.inList && !att.onVacation}
                        onChange={(v) => setAttendantList(prev => prev.map((a, i) => i === idx ? { ...a, inList: v } : a))}
                      />
                    </div>
                    <div className="flex justify-center px-4">
                      <Toggle
                        checked={att.onVacation}
                        onChange={(v) => setAttendantList(prev => prev.map((a, i) => i === idx ? { ...a, onVacation: v } : a))}
                      />
                    </div>
                    <div className="flex justify-center px-3">
                      <span className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                        att.status === "online" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                        att.status === "busy" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                        att.status === "offline" && "bg-muted text-muted-foreground",
                      )}>
                        <span className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          att.status === "online" && "bg-emerald-500",
                          att.status === "busy" && "bg-amber-500",
                          att.status === "offline" && "bg-muted-foreground",
                        )} />
                        {att.status === "online" ? "Online" : att.status === "busy" ? "Ocupado" : "Offline"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                <AlertCircle className="inline h-3 w-3 mr-1" />
                Atendentes marcados como "Férias" são automaticamente removidos da lista até serem reativados.
              </p>
            </div>

            {/* Distribution mode */}
            <div>
              <label className="text-[12px] font-semibold text-foreground">Modo de distribuição</label>
              <p className="text-[11px] text-muted-foreground mb-2">Como os leads são distribuídos quando o cliente não escolher um atendente específico.</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "escolha", label: "Escolha do cliente", desc: "Cliente seleciona" },
                  { value: "automatico", label: "Automático", desc: "(revezamento)" },
                ].map(opt => (
                  <label key={opt.value} className="cursor-pointer">
                    <input type="radio" name="dist_mode" defaultChecked={opt.value === "escolha"} className="peer sr-only" />
                    <div className="rounded-xl border-2 border-border p-3 text-center peer-checked:border-primary peer-checked:bg-primary/5 transition-colors hover:border-primary/50">
                      <p className="text-[12px] font-semibold text-foreground">{opt.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>
    </section>
  );
}

// ── Outras Automações ────────────────────────────────────────────
function OutrasAutomacoesSection() {
  const [items, setItems] = useState([
    {
      id: "oa1",
      title: "Resumo automático ao finalizar",
      desc: "Ao encerrar um atendimento, a IA gera um resumo completo do histórico de conversa.",
      enabled: true,
    },
    {
      id: "oa4",
      title: "Classificação automática de leads",
      desc: "A IA classifica leads como potencial, ativo ou finalizado com base nas mensagens.",
      enabled: true,
    },
  ]);

  return (
    <section>
      <SectionHeader
        icon={Sparkles}
        title="Outras Automações"
        description="Recursos adicionais de inteligência artificial"
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
                onChange={(v) => setItems(prev => prev.map((it, i) => i === idx ? { ...it, enabled: v } : it))}
              />
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────
function AutomacaoIAPage() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Automação IA</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Configure o comportamento inteligente do CRM
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-5 max-w-3xl space-y-8">
        <TriagemSection />
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
