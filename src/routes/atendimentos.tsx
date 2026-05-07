import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Search,
  Filter,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Tag as TagIcon,
  ChevronDown,
  ChevronDownIcon,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  CheckCheck,
  Check,
  Star,
  ShoppingBag,
  StickyNote,
  UserCircle,
  Circle,
  Users2,
  Bell,
  Clock,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";
import {
  leads,
  tags,
  attendants,
  accounts,
  type Lead,
  type LeadStatus,
  type Account,
  type Message,
} from "@/data/mock";
import { useAuth } from "@/lib/auth";
import { useDemoCrm } from "@/lib/demo-crm";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/atendimentos")({
  validateSearch: (search: Record<string, unknown>) => ({
    leadId: typeof search.leadId === "string" ? search.leadId : undefined,
  }),
  component: AtendimentosPage,
});

// ── Status config ─────────────────────────────────────────────────
const statusConfig: Record<LeadStatus, { label: string; color: string; dot: string }> = {
  ativo: { label: "Em Atendimento", color: "text-emerald-500", dot: "bg-emerald-500" },
  pendente: { label: "Follow UP", color: "text-amber-500", dot: "bg-amber-500" },
  potencial: { label: "Agendado", color: "text-blue-500", dot: "bg-blue-500" },
  finalizado: { label: "Finalizado", color: "text-muted-foreground", dot: "bg-muted-foreground" },
};

const tagColorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  cyan: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  red: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  green: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  violet: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  pink: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  teal: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
};

// ── Helpers ───────────────────────────────────────────────────────
function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// ── Types ─────────────────────────────────────────────────────────
type TabFilter = "todos" | "ia" | "humano" | "followup";

// ── Mock internal chat data ───────────────────────────────────────
const initialInternalChats: Record<string, Message[]> = {
  acc1: [
    {
      id: "ic1",
      content: "Boa tarde! Como está o fluxo de pacientes hoje?",
      sender: "client",
      time: "13:15",
    },
    {
      id: "ic2",
      content: "Boa tarde! Tranquilo, 3 consultas confirmadas para amanhã.",
      sender: "attendant",
      senderName: "Você",
      time: "13:16",
      status: "read",
    },
    {
      id: "ic3",
      content: "Ótimo! Acompanhe a Beatriz — ela está em consulta agora 🙏",
      sender: "client",
      time: "13:17",
    },
  ],
  acc3: [
    {
      id: "ic4",
      content: "Você pode confirmar o horário da Juliana para sexta?",
      sender: "client",
      time: "10:05",
    },
    {
      id: "ic5",
      content: "Claro! Já confirmei com ela para sexta às 14h.",
      sender: "attendant",
      senderName: "Você",
      time: "10:06",
      status: "read",
    },
  ],
};

// ── Message bubble ────────────────────────────────────────────────
const MessageBubble = memo(function MessageBubble({
  msg,
  currentAttendant,
}: {
  msg: Message;
  currentAttendant: (typeof attendants)[0] | null | undefined;
}) {
  if (msg.sender === "system") {
    return (
      <div className="flex justify-center">
        <span className="rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground">
          {msg.content}
        </span>
      </div>
    );
  }
  if (msg.sender === "client") {
    return (
      <div className="flex justify-start">
        <div className="max-w-[68%]">
          <div className="rounded-2xl rounded-tl-sm bg-card border border-border px-4 py-2.5 shadow-xs">
            <p className="text-[13px] text-foreground whitespace-pre-wrap leading-relaxed">
              {msg.content}
            </p>
          </div>
          <div className="flex mt-1 pl-1">
            <span className="text-[10px] text-muted-foreground">{msg.time}</span>
          </div>
        </div>
      </div>
    );
  }
  // attendant
  const senderLabel = msg.senderName ?? currentAttendant?.name ?? "Atendente";
  return (
    <div className="flex justify-end">
      <div className="max-w-[68%]">
        <div className="flex items-center justify-end mb-1 pr-1">
          <span className="text-[10px] font-semibold text-muted-foreground">{senderLabel}</span>
        </div>
        <div className="rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 shadow-sm">
          <p className="text-[13px] text-primary-foreground whitespace-pre-wrap leading-relaxed">
            {msg.content}
          </p>
        </div>
        <div className="flex items-center justify-end gap-1 mt-1 pr-1">
          <span className="text-[10px] text-muted-foreground">{msg.time}</span>
          {msg.status === "read" ? (
            <CheckCheck className="h-3 w-3 text-primary" />
          ) : msg.status === "delivered" ? (
            <CheckCheck className="h-3 w-3 text-muted-foreground" />
          ) : (
            <Check className="h-3 w-3 text-muted-foreground" />
          )}
        </div>
      </div>
    </div>
  );
});

// ── Lembretes ─────────────────────────────────────────────────────
interface Lembrete {
  id: string;
  date: Date;
  time: string;
  message: string;
}

function LembretesPanel() {
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("10:00");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  function addLembrete() {
    if (!date || !message.trim()) return;
    setLembretes((prev) => [
      ...prev,
      { id: Date.now().toString(), date, time, message: message.trim() },
    ]);
    setDate(undefined);
    setMessage("");
    setTime("10:00");
  }

  function removeLembrete(id: string) {
    setLembretes((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <div className="px-4 py-3 border-b border-border">
      <div className="flex items-center gap-1.5 mb-3">
        <Bell className="h-3 w-3 text-amber-500" />
        <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
          Lembretes
        </p>
      </div>

      {/* Existing reminders */}
      {lembretes.length > 0 && (
        <div className="space-y-2 mb-3">
          {lembretes.map((l) => (
            <div
              key={l.id}
              className="flex items-start gap-2 rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/20 px-3 py-2"
            >
              <Bell className="h-3 w-3 text-amber-500 flex-none mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                  {format(l.date, "dd/MM/yyyy", { locale: ptBR })} às {l.time}
                </p>
                <p className="text-[11px] text-foreground leading-snug mt-0.5">{l.message}</p>
              </div>
              <button
                onClick={() => removeLembrete(l.id)}
                className="text-muted-foreground hover:text-destructive transition-colors flex-none"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* New reminder form */}
      <div className="rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50/60 dark:bg-amber-950/10 p-3 space-y-2">
        <div className="flex gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-8 flex-1 justify-between font-normal text-[11px] border-amber-200 dark:border-amber-800/40 bg-white dark:bg-card"
              >
                {date ? format(date, "dd/MM/yy", { locale: ptBR }) : "Data"}
                <ChevronDownIcon className="h-3 w-3 opacity-60" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                defaultMonth={date}
                onSelect={(d) => {
                  setDate(d);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="h-8 w-24 rounded-lg border border-amber-200 dark:border-amber-800/40 bg-white dark:bg-card px-2 text-[11px] text-foreground focus:outline-none focus:ring-2 focus:ring-amber-300/50"
          />
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mensagem do lembrete..."
          rows={2}
          className="w-full resize-none rounded-lg border border-amber-200 dark:border-amber-800/40 bg-white dark:bg-card px-3 py-2 text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-300/50 transition"
        />
        <button
          onClick={addLembrete}
          disabled={!date || !message.trim()}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus className="h-3 w-3" />
          Adicionar lembrete
        </button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────
function AtendimentosPage() {
  const { currentAccount } = useAuth();
  const { leadId } = Route.useSearch();
  const { waLeads } = useDemoCrm();

  const currentAttendantId = useMemo(
    () =>
      currentAccount.role === "atendente"
        ? attendants.find((a) => a.email === currentAccount.email)?.id
        : undefined,
    [currentAccount],
  );

  const [selectedLead, setSelectedLead] = useState<Lead | null>(() =>
    leadId ? (leads.find((l) => l.id === leadId) ?? null) : null,
  );
  const [tab, setTab] = useState<TabFilter>("todos");
  const [search, setSearch] = useState("");
  const [filterAttendant, setFilterAttendant] = useState("todos");
  const [filterTag, setFilterTag] = useState("todos");
  const [showFilters, setShowFilters] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [allLeads, setAllLeads] = useState<Lead[]>(leads);

  // Merge WhatsApp-generated patients into CRM list
  useEffect(() => {
    setAllLeads((prev) => {
      const existingIds = new Set(prev.map((l) => l.id));
      const newOnes = waLeads.filter((l) => !existingIds.has(l.id));
      if (newOnes.length === 0) return prev;
      return [...newOnes, ...prev];
    });
  }, [waLeads]);

  // Chat interno
  const [internalChatMode, setInternalChatMode] = useState(false);
  const [selectedInternalUser, setSelectedInternalUser] = useState<Account | null>(null);
  const [internalChats, setInternalChats] =
    useState<Record<string, Message[]>>(initialInternalChats);
  const [internalMsg, setInternalMsg] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedLead?.messages, selectedInternalUser]);

  useEffect(() => {
    if (leadId) {
      const found = allLeads.find((l) => l.id === leadId);
      if (found) {
        setSelectedLead(found);
        setInternalChatMode(false);
      }
    }
  }, [leadId]);

  const visibleLeads = useMemo(
    () =>
      currentAttendantId ? allLeads.filter((l) => l.attendantId === currentAttendantId) : allLeads,
    [allLeads, currentAttendantId],
  );

  const filteredLeads = useMemo(
    () =>
      visibleLeads.filter((lead) => {
        if (tab === "ia" && lead.attendedBy !== "ia") return false;
        if (tab === "humano" && lead.attendedBy !== "humano") return false;
        if (tab === "followup" && lead.status !== "pendente") return false;
        if (
          search &&
          !lead.name.toLowerCase().includes(search.toLowerCase()) &&
          !lead.phone.includes(search)
        )
          return false;
        if (filterAttendant !== "todos" && lead.attendantId !== filterAttendant) return false;
        if (filterTag !== "todos" && !lead.tagIds.includes(filterTag)) return false;
        return true;
      }),
    [visibleLeads, tab, search, filterAttendant, filterTag],
  );

  const tabCounts = useMemo(
    () => ({
      todos: visibleLeads.length,
      ia: visibleLeads.filter((l) => l.attendedBy === "ia").length,
      humano: visibleLeads.filter((l) => l.attendedBy === "humano").length,
      followup: visibleLeads.filter((l) => l.status === "pendente").length,
    }),
    [visibleLeads],
  );

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !selectedLead) return;
    const senderName =
      currentAccount.role === "atendente"
        ? currentAccount.name
        : (attendants.find((a) => a.id === selectedLead.attendantId)?.name ?? "Atendente");
    const msg: Message = {
      id: `m${Date.now()}`,
      content: newMessage.trim(),
      sender: "attendant",
      senderName,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };
    setAllLeads((prev) =>
      prev.map((l) =>
        l.id === selectedLead.id
          ? { ...l, messages: [...l.messages, msg], lastMessage: newMessage.trim(), unreadCount: 0 }
          : l,
      ),
    );
    setSelectedLead((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, msg],
            lastMessage: newMessage.trim(),
            unreadCount: 0,
          }
        : null,
    );
    setNewMessage("");
  }, [newMessage, selectedLead, currentAccount]);

  const handleSendInternal = useCallback(() => {
    if (!internalMsg.trim() || !selectedInternalUser) return;
    const msg: Message = {
      id: `ic${Date.now()}`,
      content: internalMsg.trim(),
      sender: "attendant",
      senderName: currentAccount.name,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };
    setInternalChats((prev) => ({
      ...prev,
      [selectedInternalUser.id]: [...(prev[selectedInternalUser.id] ?? []), msg],
    }));
    setInternalMsg("");
  }, [internalMsg, selectedInternalUser, currentAccount]);

  const currentAttendant = useMemo(
    () => (selectedLead ? attendants.find((a) => a.id === selectedLead.attendantId) : null),
    [selectedLead],
  );

  const internalPeers = useMemo(
    () => accounts.filter((a) => a.id !== currentAccount.id),
    [currentAccount.id],
  );

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── ESQUERDA: Lista ── */}
      <div className="flex w-[290px] flex-none flex-col border-r border-border bg-card/50 overflow-hidden">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-border space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-[15px] font-bold text-foreground truncate">
              {internalChatMode ? "Chat Interno" : "Atendimentos"}
            </h1>
            <div className="flex items-center gap-1 flex-none">
              <button
                onClick={() => {
                  setInternalChatMode(!internalChatMode);
                  setSelectedInternalUser(null);
                }}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors",
                  internalChatMode
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
                title="Chat interno da equipe"
              >
                <Users2 className="h-3.5 w-3.5" />
              </button>
              {!internalChatMode && (
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors",
                    showFilters
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  <Filter className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {!internalChatMode && (
            <>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar lead..."
                  className="w-full rounded-lg border border-border bg-background pl-8 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                />
              </div>
              {showFilters && (
                <div className="space-y-2 pt-1">
                  {currentAccount.role === "gestor" && (
                    <select
                      value={filterAttendant}
                      onChange={(e) => setFilterAttendant(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="todos">Todos os atendentes</option>
                      {attendants.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  )}
                  <select
                    value={filterTag}
                    onChange={(e) => setFilterTag(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="todos">Todas as tags</option>
                    {tags.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}
        </div>

        {/* Status tabs */}
        {!internalChatMode && (
          <div className="flex gap-0.5 px-3 py-2 overflow-x-auto scrollbar-none border-b border-border">
            {(["todos", "ia", "humano", "followup"] as TabFilter[]).map((t) => {
              const label = { todos: "Todos", ia: "IA", humano: "Humano", followup: "Follow UP" }[t];
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "flex-none rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors whitespace-nowrap",
                    tab === t
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      "ml-1 inline-flex items-center justify-center rounded-full w-4 h-4 text-[9px]",
                      tab === t ? "bg-white/20 text-white" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {tabCounts[t]}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {internalChatMode ? (
            internalPeers.map((account) => {
              const msgs = internalChats[account.id] ?? [];
              const lastMsg = msgs[msgs.length - 1];
              const isSelected = selectedInternalUser?.id === account.id;
              return (
                <button
                  key={account.id}
                  onClick={() => setSelectedInternalUser(account)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-accent/60",
                    isSelected && "bg-primary/8 border-l-2 border-l-primary",
                  )}
                >
                  <div
                    className="flex h-9 w-9 flex-none items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: account.color }}
                  >
                    {account.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-foreground truncate">
                        {account.name}
                      </span>
                      {lastMsg && (
                        <span className="text-[10px] text-muted-foreground flex-none">
                          {lastMsg.time}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground capitalize">{account.role}</p>
                    {lastMsg && (
                      <p className="text-[11px] text-muted-foreground truncate">
                        {lastMsg.content}
                      </p>
                    )}
                  </div>
                </button>
              );
            })
          ) : filteredLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <MessageSquare className="h-8 w-8 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">Nenhum lead encontrado</p>
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const status = statusConfig[lead.status];
              const attendant = attendants.find((a) => a.id === lead.attendantId);
              const isSelected = selectedLead?.id === lead.id;
              return (
                <button
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-accent/60",
                    isSelected && "bg-primary/8 border-l-2 border-l-primary",
                  )}
                >
                  <div className="relative flex-none mt-0.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/40 text-xs font-bold text-primary">
                      {getInitials(lead.name)}
                    </div>
                    <span
                      className={cn(
                        "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-card",
                        status.dot,
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="truncate text-[13px] font-semibold text-foreground">
                        {lead.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex-none">
                        {lead.lastMessageTime}
                      </span>
                    </div>
                    <p className="truncate text-[12px] text-muted-foreground mt-0.5">
                      {lead.lastMessage}
                    </p>
                    {/* Tags row */}
                    <div className="flex items-center justify-between mt-1.5 gap-1">
                      <div className="flex items-center gap-1 min-w-0">
                        {lead.tagIds.slice(0, 1).map((tid) => {
                          const tag = tags.find((t) => t.id === tid);
                          return tag ? (
                            <span
                              key={tid}
                              className={cn(
                                "rounded px-1.5 py-0.5 text-[9px] font-medium",
                                tagColorMap[tag.color],
                              )}
                            >
                              {tag.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                      <div className="flex items-center gap-1.5 flex-none">
                        {attendant && (
                          <span
                            className="flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold text-white ring-1 ring-white/30"
                            style={{ backgroundColor: attendant.color }}
                            title={attendant.name}
                          >
                            {attendant.initials[0]}
                          </span>
                        )}
                        {lead.unreadCount > 0 && (
                          <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                            {lead.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ── CENTRO: Chat ── */}
      {internalChatMode ? (
        selectedInternalUser ? (
          <div className="flex flex-1 flex-col overflow-hidden bg-background">
            <div className="flex items-center gap-3 border-b border-border bg-card/60 backdrop-blur-sm px-5 py-3.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                style={{ backgroundColor: selectedInternalUser.color }}
              >
                {selectedInternalUser.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-[14px] font-bold text-foreground">
                  {selectedInternalUser.name}
                </h2>
                <p className="text-[11px] text-muted-foreground capitalize">
                  {selectedInternalUser.role} · Chat Interno
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-primary bg-primary/10 rounded-lg px-2.5 py-1">
                <Users2 className="h-3.5 w-3.5" />
                Equipe
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {(internalChats[selectedInternalUser.id] ?? []).map((msg) => (
                <MessageBubble key={msg.id} msg={msg} currentAttendant={null} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t border-border bg-card/60 px-4 py-3">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <textarea
                    value={internalMsg}
                    onChange={(e) => setInternalMsg(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendInternal();
                      }
                    }}
                    placeholder="Mensagem interna..."
                    rows={1}
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition max-h-32"
                  />
                </div>
                <button
                  onClick={handleSendInternal}
                  disabled={!internalMsg.trim()}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center bg-background">
            <div className="text-center space-y-3">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Users2 className="h-8 w-8 text-primary/50" />
              </div>
              <p className="text-base font-semibold text-foreground">Chat Interno da Equipe</p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Selecione um membro da equipe para iniciar uma conversa interna
              </p>
            </div>
          </div>
        )
      ) : selectedLead ? (
        <div className="flex flex-1 flex-col overflow-hidden bg-background">
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-border bg-card/60 backdrop-blur-sm px-5 py-3.5">
            <div className="relative flex-none">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/40 text-xs font-bold text-primary">
                {getInitials(selectedLead.name)}
              </div>
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-card",
                  statusConfig[selectedLead.status].dot,
                )}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[14px] font-bold text-foreground leading-tight truncate">
                {selectedLead.name}
              </h2>
              <p className="text-[11px] text-muted-foreground">
                {selectedLead.phone}
                {currentAttendant && (
                  <span className="ml-2">
                    · Atendido por{" "}
                    <span className="font-medium" style={{ color: currentAttendant.color }}>
                      {currentAttendant.name}
                    </span>
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                <Phone className="h-4 w-4" />
              </button>
              <button className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {selectedLead.messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} currentAttendant={currentAttendant} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {selectedLead.status !== "finalizado" ? (
            <div className="border-t border-border bg-card/60 backdrop-blur-sm px-4 py-3">
              <div className="flex items-end gap-2">
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent">
                  <Paperclip className="h-4 w-4" />
                </button>
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Digite uma mensagem..."
                    rows={1}
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition max-h-32"
                  />
                </div>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent">
                  <Smile className="h-4 w-4" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="border-t border-border bg-card/60 px-5 py-3 flex items-center justify-center gap-2">
              <Circle className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Atendimento finalizado</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center bg-background">
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <MessageSquare className="h-8 w-8 text-primary/50" />
            </div>
            <p className="text-base font-semibold text-foreground">Selecione um atendimento</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Clique em um lead na lista ao lado para ver a conversa
            </p>
          </div>
        </div>
      )}

      {/* ── DIREITA: Info do lead ── */}
      {!internalChatMode && selectedLead && (
        <div className="flex w-[275px] flex-none flex-col border-l border-border bg-card/50 overflow-y-auto">
          {/* Contact card */}
          <div className="px-4 pt-4 pb-4 border-b border-border text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/50 text-sm font-bold text-primary ring-4 ring-primary/10">
              {getInitials(selectedLead.name)}
            </div>
            <h3 className="mt-2.5 text-[14px] font-bold text-foreground leading-tight">
              {selectedLead.name}
            </h3>
            {selectedLead.company && (
              <p className="text-xs text-muted-foreground mt-0.5">{selectedLead.company}</p>
            )}
            <span
              className={cn(
                "mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium",
                selectedLead.status === "ativo" &&
                  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                selectedLead.status === "pendente" &&
                  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                selectedLead.status === "potencial" &&
                  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                selectedLead.status === "finalizado" && "bg-muted text-muted-foreground",
              )}
            >
              <span
                className={cn("h-1.5 w-1.5 rounded-full", statusConfig[selectedLead.status].dot)}
              />
              {statusConfig[selectedLead.status].label}
            </span>
          </div>

          {/* Contact details */}
          <div className="px-4 py-3 border-b border-border space-y-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Contato
            </p>
            <div className="flex items-center gap-2.5">
              <Phone className="h-3.5 w-3.5 flex-none text-muted-foreground" />
              <span className="text-[13px] text-foreground">{selectedLead.phone}</span>
            </div>
            {selectedLead.email && (
              <div className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 flex-none text-muted-foreground" />
                <span className="text-[13px] text-foreground truncate">{selectedLead.email}</span>
              </div>
            )}
            {selectedLead.region && (
              <div className="flex items-center gap-2.5">
                <MapPin className="h-3.5 w-3.5 flex-none text-muted-foreground" />
                <span className="text-[13px] text-foreground">
                  {{
                    centro: "Centro",
                    batel: "Batel",
                    santana: "Santana",
                    trianon: "Trianon",
                    santacruz: "Santa Cruz",
                  }[selectedLead.region] ?? selectedLead.region}
                  <span className="text-[11px] text-muted-foreground ml-1">— Guarapuava, PR</span>
                </span>
              </div>
            )}
            {currentAttendant && (
              <div className="flex items-center gap-2.5">
                <UserCircle className="h-3.5 w-3.5 flex-none text-muted-foreground" />
                <span className="text-[13px]" style={{ color: currentAttendant.color }}>
                  {currentAttendant.name}
                </span>
              </div>
            )}
            {selectedLead.doctor && (
              <div className="flex items-center gap-2.5">
                <FileText className="h-3.5 w-3.5 flex-none text-muted-foreground" />
                <span className="text-[13px] text-foreground truncate">{selectedLead.doctor}</span>
              </div>
            )}
            {selectedLead.healthInsurance && (
              <div className="flex items-center gap-2.5">
                <Bell className="h-3.5 w-3.5 flex-none text-muted-foreground" />
                <span className="text-[13px] text-foreground">{selectedLead.healthInsurance}</span>
              </div>
            )}
            {selectedLead.appointmentDate && (
              <div className="flex items-center gap-2.5">
                <Clock className="h-3.5 w-3.5 flex-none text-muted-foreground" />
                <span className="text-[13px] text-foreground">{selectedLead.appointmentDate}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {selectedLead.tagIds.length > 0 && (
            <div className="px-4 py-3 border-b border-border">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Tags
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selectedLead.tagIds.map((tid) => {
                  const tag = tags.find((t) => t.id === tid);
                  return tag ? (
                    <span
                      key={tid}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-medium flex items-center gap-1",
                        tagColorMap[tag.color],
                      )}
                    >
                      <TagIcon className="h-2.5 w-2.5" />
                      {tag.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Histórico
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-background border border-border p-3 text-center">
                <ShoppingBag className="h-3.5 w-3.5 text-muted-foreground mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground leading-none">
                  {selectedLead.totalPurchases}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Consultas</p>
              </div>
              <div className="rounded-xl bg-background border border-border p-3 text-center">
                <Star className="h-3.5 w-3.5 text-amber-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground leading-none">
                  {selectedLead.totalSpent > 0
                    ? `R$${(selectedLead.totalSpent / 1000).toFixed(1)}k`
                    : "R$0"}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Total pago</p>
              </div>
            </div>
            {selectedLead.lastPurchase && (
              <div className="mt-2 rounded-xl bg-background border border-border p-3">
                <p className="text-[10px] text-muted-foreground">Último procedimento</p>
                <p className="text-[12px] font-medium text-foreground mt-0.5 leading-tight">
                  {selectedLead.lastPurchase}
                </p>
                {selectedLead.lastPurchaseValue && (
                  <p className="text-[11px] text-primary font-semibold mt-0.5">
                    R$ {selectedLead.lastPurchaseValue.toLocaleString("pt-BR")}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Notes */}
          {selectedLead.notes && (
            <div className="px-4 py-3 border-b border-border">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                Notas
              </p>
              <div className="flex gap-2">
                <StickyNote className="h-3.5 w-3.5 flex-none text-muted-foreground mt-0.5" />
                <p className="text-[12px] text-foreground leading-relaxed">{selectedLead.notes}</p>
              </div>
            </div>
          )}

          {/* Lembretes */}
          <LembretesPanel />

          <div className="h-4" />
        </div>
      )}
    </div>
  );
}
