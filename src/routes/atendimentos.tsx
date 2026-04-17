import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  Search, Filter, MessageSquare, Phone, Mail,
  Tag as TagIcon, ChevronDown, Send, Paperclip, Smile,
  MoreVertical, Bot, CheckCheck, Check,
  Star, ShoppingBag, StickyNote, X, Sparkles, UserCircle, Circle,
} from "lucide-react";
import { leads, tags, attendants, type Lead, type LeadStatus } from "@/data/mock";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/atendimentos")({
  validateSearch: (search: Record<string, unknown>) => ({
    leadId: typeof search.leadId === "string" ? search.leadId : undefined,
  }),
  component: AtendimentosPage,
});

const statusConfig: Record<LeadStatus, { label: string; color: string; dot: string }> = {
  ativo:      { label: "Ativo",      color: "text-emerald-500",    dot: "bg-emerald-500" },
  pendente:   { label: "Pendente",   color: "text-amber-500",      dot: "bg-amber-500" },
  potencial:  { label: "Potencial",  color: "text-blue-500",       dot: "bg-blue-500" },
  finalizado: { label: "Finalizado", color: "text-muted-foreground", dot: "bg-muted-foreground" },
};

const tagColorMap: Record<string, string> = {
  blue:   "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  cyan:   "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  red:    "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  amber:  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  green:  "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  orange: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  violet: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  pink:   "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  teal:   "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
};

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

function getAttendant(id?: string) {
  return attendants.find((a) => a.id === id);
}

function getTag(id: string) {
  return tags.find((t) => t.id === id);
}

type TabFilter = "todos" | "ativo" | "pendente" | "potencial" | "finalizado";

function AtendimentosPage() {
  const { currentAccount } = useAuth();
  const { leadId } = Route.useSearch();

  // Se for atendente, encontra o attendantId correspondente pelo email
  const currentAttendantId =
    currentAccount.role === "atendente"
      ? attendants.find((a) => a.email === currentAccount.email)?.id
      : undefined;

  const [selectedLead, setSelectedLead] = useState<Lead | null>(() => {
    if (leadId) return leads.find((l) => l.id === leadId) ?? null;
    return null;
  });
  const [tab, setTab] = useState<TabFilter>("todos");
  const [search, setSearch] = useState("");
  const [filterAttendant, setFilterAttendant] = useState<string>("todos");
  const [filterTag, setFilterTag] = useState<string>("todos");
  const [showFilters, setShowFilters] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [allLeads, setAllLeads] = useState<Lead[]>(leads);
  const [showSummary, setShowSummary] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedLead?.messages]);

  // Quando chegar um leadId via URL, seleciona o lead correspondente
  useEffect(() => {
    if (leadId) {
      const found = allLeads.find((l) => l.id === leadId);
      if (found) setSelectedLead(found);
    }
  }, [leadId]);

  // Leads visíveis para o usuário atual
  const visibleLeads = currentAttendantId
    ? allLeads.filter((l) => l.attendantId === currentAttendantId)
    : allLeads;

  const filteredLeads = visibleLeads.filter((lead) => {
    if (tab !== "todos" && lead.status !== tab) return false;
    if (search && !lead.name.toLowerCase().includes(search.toLowerCase()) && !lead.phone.includes(search)) return false;
    if (filterAttendant !== "todos" && lead.attendantId !== filterAttendant) return false;
    if (filterTag !== "todos" && !lead.tagIds.includes(filterTag)) return false;
    return true;
  });

  const tabCounts: Record<TabFilter, number> = {
    todos:      visibleLeads.length,
    ativo:      visibleLeads.filter((l) => l.status === "ativo").length,
    pendente:   visibleLeads.filter((l) => l.status === "pendente").length,
    potencial:  visibleLeads.filter((l) => l.status === "potencial").length,
    finalizado: visibleLeads.filter((l) => l.status === "finalizado").length,
  };

  function handleSendMessage() {
    if (!newMessage.trim() || !selectedLead) return;
    const senderName =
      currentAccount.role === "atendente"
        ? currentAccount.name
        : getAttendant(selectedLead.attendantId)?.name ?? "Atendente";
    const updatedLeads = allLeads.map((l) => {
      if (l.id !== selectedLead.id) return l;
      const msg = {
        id: `m${Date.now()}`,
        content: newMessage.trim(),
        sender: "attendant" as const,
        senderName,
        time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        status: "sent" as const,
      };
      return { ...l, messages: [...l.messages, msg], lastMessage: newMessage.trim(), unreadCount: 0 };
    });
    setAllLeads(updatedLeads);
    setSelectedLead(updatedLeads.find((l) => l.id === selectedLead.id) ?? null);
    setNewMessage("");
  }

  const currentAttendant = selectedLead ? getAttendant(selectedLead.attendantId) : null;

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── ESQUERDA: Lista de leads ── */}
      <div className="flex w-[290px] flex-none flex-col border-r border-border bg-card/50 overflow-hidden">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-border space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-[15px] font-bold text-foreground">Atendimentos</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                showFilters
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Filter className="h-3.5 w-3.5" />
              Filtros
            </button>
          </div>

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
              {/* Filtro por atendente só para gestores */}
              {currentAccount.role === "gestor" && (
                <select
                  value={filterAttendant}
                  onChange={(e) => setFilterAttendant(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="todos">Todos os atendentes</option>
                  {attendants.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
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
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Status tabs */}
        <div className="flex gap-0.5 px-3 py-2 overflow-x-auto scrollbar-none border-b border-border">
          {(["todos", "ativo", "pendente", "potencial", "finalizado"] as TabFilter[]).map((t) => (
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
              {t === "todos" ? "Todos" : statusConfig[t as LeadStatus].label}
              <span className={cn(
                "ml-1 inline-flex items-center justify-center rounded-full w-4 h-4 text-[9px]",
                tab === t ? "bg-white/20 text-white" : "bg-muted text-muted-foreground",
              )}>
                {tabCounts[t]}
              </span>
            </button>
          ))}
        </div>

        {/* Lead list */}
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {filteredLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <MessageSquare className="h-8 w-8 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">Nenhum lead encontrado</p>
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const status = statusConfig[lead.status];
              const attendant = getAttendant(lead.attendantId);
              const isSelected = selectedLead?.id === lead.id;
              return (
                <button
                  key={lead.id}
                  onClick={() => { setSelectedLead(lead); setShowSummary(false); }}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-accent/60",
                    isSelected && "bg-primary/8 border-l-2 border-l-primary",
                  )}
                >
                  <div className="relative flex-none mt-0.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/40 text-xs font-bold text-primary">
                      {getInitials(lead.name)}
                    </div>
                    <span className={cn("absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-card", status.dot)} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="truncate text-[13px] font-semibold text-foreground">{lead.name}</span>
                      <span className="flex-none text-[10px] text-muted-foreground">{lead.lastMessageTime}</span>
                    </div>
                    <p className="truncate text-[12px] text-muted-foreground mt-0.5">{lead.lastMessage}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center gap-1">
                        {lead.tagIds.slice(0, 2).map((tid) => {
                          const tag = getTag(tid);
                          if (!tag) return null;
                          return (
                            <span key={tid} className={cn("rounded px-1.5 py-0.5 text-[9px] font-medium", tagColorMap[tag.color])}>
                              {tag.name}
                            </span>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-1.5">
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
      {selectedLead ? (
        <div className="flex flex-1 flex-col overflow-hidden bg-background">
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-border bg-card/60 backdrop-blur-sm px-5 py-3.5">
            <div className="relative flex-none">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/40 text-xs font-bold text-primary">
                {getInitials(selectedLead.name)}
              </div>
              <span className={cn(
                "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-card",
                statusConfig[selectedLead.status].dot,
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[14px] font-bold text-foreground leading-tight truncate">{selectedLead.name}</h2>
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
            {selectedLead.messages.map((msg) => {
              if (msg.sender === "system") {
                return (
                  <div key={msg.id} className="flex justify-center">
                    <span className="rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground">
                      {msg.content}
                    </span>
                  </div>
                );
              }
              if (msg.sender === "ai") {
                return (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[68%]">
                      <div className="flex items-center justify-end gap-1.5 mb-1 pr-1">
                        <Bot className="h-3 w-3 text-violet-500" />
                        <span className="text-[10px] font-semibold text-violet-600 dark:text-violet-400">
                          {msg.senderName ?? "IA Estrutural"}
                        </span>
                      </div>
                      <div className="rounded-2xl rounded-tr-sm border border-violet-200/80 bg-violet-50/80 dark:border-violet-800/40 dark:bg-violet-950/30 px-4 py-2.5 shadow-sm">
                        <p className="text-[13px] text-foreground whitespace-pre-wrap leading-relaxed">
                          {msg.content.replace(/\*\*/g, "")}
                        </p>
                      </div>
                      <div className="flex items-center justify-end gap-1 mt-1 pr-1">
                        <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                      </div>
                    </div>
                  </div>
                );
              }
              if (msg.sender === "client") {
                return (
                  <div key={msg.id} className="flex justify-start">
                    <div className="max-w-[68%]">
                      <div className="rounded-2xl rounded-tl-sm bg-card border border-border px-4 py-2.5 shadow-xs">
                        <p className="text-[13px] text-foreground whitespace-pre-wrap leading-relaxed">
                          {msg.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mt-1 pl-1">
                        <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                      </div>
                    </div>
                  </div>
                );
              }
              // attendant
              const senderLabel = msg.senderName ?? currentAttendant?.name ?? "Atendente";
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[68%]">
                    <div className="flex items-center justify-end gap-1.5 mb-1 pr-1">
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
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {selectedLead.status !== "finalizado" ? (
            <div className="border-t border-border bg-card/60 backdrop-blur-sm px-4 py-3">
              <div className="flex items-end gap-2">
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent">
                  <Paperclip className="h-4 w-4" />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }
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
      {selectedLead && (
        <div className="flex w-[270px] flex-none flex-col border-l border-border bg-card/50 overflow-y-auto">
          {/* Contact card */}
          <div className="px-4 pt-5 pb-4 border-b border-border text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/50 text-base font-bold text-primary ring-4 ring-primary/10">
              {getInitials(selectedLead.name)}
            </div>
            <h3 className="mt-3 text-[14px] font-bold text-foreground leading-tight">{selectedLead.name}</h3>
            {selectedLead.company && (
              <p className="text-xs text-muted-foreground mt-0.5">{selectedLead.company}</p>
            )}
            <span className={cn(
              "mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium",
              selectedLead.status === "ativo"      && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
              selectedLead.status === "pendente"   && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
              selectedLead.status === "potencial"  && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
              selectedLead.status === "finalizado" && "bg-muted text-muted-foreground",
            )}>
              <span className={cn("h-1.5 w-1.5 rounded-full", statusConfig[selectedLead.status].dot)} />
              {statusConfig[selectedLead.status].label}
            </span>
          </div>

          {/* Contact details */}
          <div className="px-4 py-3 border-b border-border space-y-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Contato</p>
            <div className="flex items-center gap-2.5 text-sm text-foreground">
              <Phone className="h-3.5 w-3.5 flex-none text-muted-foreground" />
              <span className="text-[13px]">{selectedLead.phone}</span>
            </div>
            {selectedLead.email && (
              <div className="flex items-center gap-2.5 text-sm">
                <Mail className="h-3.5 w-3.5 flex-none text-muted-foreground" />
                <span className="text-[13px] text-foreground truncate">{selectedLead.email}</span>
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
          </div>

          {/* Tags */}
          {selectedLead.tagIds.length > 0 && (
            <div className="px-4 py-3 border-b border-border">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedLead.tagIds.map((tid) => {
                  const tag = getTag(tid);
                  if (!tag) return null;
                  return (
                    <span key={tid} className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium flex items-center gap-1", tagColorMap[tag.color])}>
                      <TagIcon className="h-2.5 w-2.5" />
                      {tag.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Histórico</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-background border border-border p-3 text-center">
                <ShoppingBag className="h-3.5 w-3.5 text-muted-foreground mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground leading-none">{selectedLead.totalPurchases}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Compras</p>
              </div>
              <div className="rounded-xl bg-background border border-border p-3 text-center">
                <Star className="h-3.5 w-3.5 text-amber-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground leading-none">
                  {selectedLead.totalSpent > 0
                    ? `R$${(selectedLead.totalSpent / 1000).toFixed(1)}k`
                    : "R$0"}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Total gasto</p>
              </div>
            </div>
            {selectedLead.lastPurchase && (
              <div className="mt-2 rounded-xl bg-background border border-border p-3">
                <p className="text-[10px] text-muted-foreground">Última compra</p>
                <p className="text-[12px] font-medium text-foreground mt-0.5 leading-tight">{selectedLead.lastPurchase}</p>
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
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Notas</p>
              <div className="flex gap-2">
                <StickyNote className="h-3.5 w-3.5 flex-none text-muted-foreground mt-0.5" />
                <p className="text-[12px] text-foreground leading-relaxed">{selectedLead.notes}</p>
              </div>
            </div>
          )}

          {/* AI Summary */}
          {selectedLead.aiSummary && (
            <div className="px-4 py-3">
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="flex w-full items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Resumo IA</p>
                </div>
                <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", showSummary && "rotate-180")} />
              </button>
              {showSummary && (
                <div className="mt-3 rounded-xl border border-violet-200/80 bg-violet-50/50 dark:border-violet-800/30 dark:bg-violet-950/20 px-3 py-3">
                  <p className="text-[12px] text-foreground leading-relaxed whitespace-pre-wrap">
                    {selectedLead.aiSummary.replace(/\*\*/g, "")}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="h-4" />
        </div>
      )}
    </div>
  );
}
