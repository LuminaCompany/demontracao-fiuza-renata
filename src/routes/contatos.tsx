import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, Phone, Mail, Star,
  Filter, UserPlus, ChevronUp, ChevronDown, AlertCircle,
} from "lucide-react";
import {
  leads, tags, attendants,
  type AtendimentoStage, STAGE_LABELS, STAGE_ORDER,
} from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contatos")({
  component: ContatosPage,
});

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

const statusBadge: Record<string, string> = {
  ativo:      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  pendente:   "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  potencial:  "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  finalizado: "bg-muted text-muted-foreground",
};

const statusLabel: Record<string, string> = {
  ativo: "Ativo", pendente: "Pendente", potencial: "Potencial", finalizado: "Finalizado",
};

const stageBadge: Record<AtendimentoStage, { bg: string; color: string }> = {
  novo_contato:          { bg: "bg-sky-100 dark:bg-sky-900/30",       color: "text-sky-700 dark:text-sky-300" },
  em_orcamento:          { bg: "bg-amber-100 dark:bg-amber-900/30",   color: "text-amber-700 dark:text-amber-300" },
  proposta_enviada:      { bg: "bg-violet-100 dark:bg-violet-900/30", color: "text-violet-700 dark:text-violet-300" },
  aguardando_aprovacao:  { bg: "bg-orange-100 dark:bg-orange-900/30", color: "text-orange-700 dark:text-orange-300" },
  pagamento_pendente:    { bg: "bg-amber-100 dark:bg-amber-900/30",   color: "text-amber-700 dark:text-amber-300" },
  em_producao:           { bg: "bg-primary/10",                       color: "text-primary" },
  instalacao_agendada:   { bg: "bg-teal-100 dark:bg-teal-900/30",    color: "text-teal-700 dark:text-teal-300" },
  pos_venda:             { bg: "bg-emerald-100 dark:bg-emerald-900/30", color: "text-emerald-700 dark:text-emerald-300" },
};

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

function ContatosPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterStage, setFilterStage] = useState("todos");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "totalSpent" | "stage">("stage");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = leads
    .filter((l) => {
      if (filterStatus !== "todos" && l.status !== filterStatus) return false;
      if (filterStage !== "todos" && l.stage !== filterStage) return false;
      if (!search) return true;
      return (
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.phone.includes(search) ||
        (l.email && l.email.toLowerCase().includes(search.toLowerCase()))
      );
    })
    .sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortBy === "name") return mul * a.name.localeCompare(b.name);
      if (sortBy === "stage") {
        const ai = a.stage ? STAGE_ORDER.indexOf(a.stage) : -1;
        const bi = b.stage ? STAGE_ORDER.indexOf(b.stage) : -1;
        return mul * (ai - bi);
      }
      return mul * (a[sortBy] - b[sortBy]);
    });

  function handleSort(col: typeof sortBy) {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(col); setSortDir("asc"); }
  }

  function SortIcon({ col }: { col: typeof sortBy }) {
    if (sortBy !== col) return <ChevronUp className="h-3 w-3 text-muted-foreground/40" />;
    return sortDir === "asc"
      ? <ChevronUp className="h-3 w-3 text-primary" />
      : <ChevronDown className="h-3 w-3 text-primary" />;
  }

  function openLead(leadId: string) {
    navigate({ to: "/atendimentos", search: { leadId } });
  }

  const pendingCount = filtered.filter((l) => l.pendingItems && l.pendingItems.length > 0).length;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Contatos</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {filtered.length} contato{filtered.length !== 1 ? "s" : ""}
              {pendingCount > 0 && (
                <span className="ml-2 inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                  <AlertCircle className="h-3 w-3" />
                  {pendingCount} com pendências
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors",
                showFilters
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Filter className="h-4 w-4" />
              Filtros
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
              <UserPlus className="h-4 w-4" />
              Novo Contato
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, telefone ou e-mail..."
              className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
            />
          </div>

          {showFilters && (
            <>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="todos">Todos os status</option>
                <option value="ativo">Ativo</option>
                <option value="pendente">Pendente</option>
                <option value="potencial">Potencial</option>
                <option value="finalizado">Finalizado</option>
              </select>

              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="todos">Todas as etapas</option>
                {STAGE_ORDER.map((s) => (
                  <option key={s} value={s}>{STAGE_LABELS[s]}</option>
                ))}
              </select>
            </>
          )}
        </div>

        {/* Stage summary chips */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {STAGE_ORDER.map((stage) => {
            const count = leads.filter((l) => l.stage === stage).length;
            if (count === 0) return null;
            const cfg = stageBadge[stage];
            return (
              <button
                key={stage}
                onClick={() => setFilterStage(filterStage === stage ? "todos" : stage)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-medium transition-all border",
                  filterStage === stage
                    ? cn(cfg.bg, cfg.color, "border-current shadow-sm")
                    : "border-border bg-background text-muted-foreground hover:border-primary/30",
                )}
              >
                {STAGE_LABELS[stage]} <span className="font-bold ml-0.5">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th
                  className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-1">Contato <SortIcon col="name" /></div>
                </th>
                <th
                  className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort("stage")}
                >
                  <div className="flex items-center gap-1">Etapa <SortIcon col="stage" /></div>
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Telefone</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Tags</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Pendências</th>
                <th
                  className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => handleSort("totalSpent")}
                >
                  <div className="flex items-center gap-1">Total <SortIcon col="totalSpent" /></div>
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Atendente</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((lead) => {
                const attendant = attendants.find((a) => a.id === lead.attendantId);
                const stageCfg = lead.stage ? stageBadge[lead.stage] : null;
                const hasPending = lead.pendingItems && lead.pendingItems.length > 0;
                return (
                  <tr
                    key={lead.id}
                    onClick={() => openLead(lead.id)}
                    className="hover:bg-accent/40 transition-colors cursor-pointer group"
                    title="Ver atendimento"
                  >
                    {/* Contato */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/40 text-xs font-bold text-primary">
                          {getInitials(lead.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-[13px] leading-tight group-hover:text-primary transition-colors">
                            {lead.name}
                          </p>
                          {lead.email ? (
                            <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Mail className="h-2.5 w-2.5" />
                              {lead.email}
                            </p>
                          ) : (
                            <p className="text-[11px] text-muted-foreground/40 mt-0.5">sem e-mail</p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Etapa */}
                    <td className="px-4 py-3.5">
                      {stageCfg && lead.stage ? (
                        <span className={cn("rounded-lg px-2.5 py-1.5 text-[11px] font-semibold whitespace-nowrap", stageCfg.bg, stageCfg.color)}>
                          {STAGE_LABELS[lead.stage]}
                        </span>
                      ) : (
                        <span className="text-[12px] text-muted-foreground/50">—</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", statusBadge[lead.status])}>
                        {statusLabel[lead.status]}
                      </span>
                    </td>

                    {/* Telefone */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 text-[13px] text-foreground">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {lead.phone}
                      </div>
                    </td>

                    {/* Tags */}
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {lead.tagIds.slice(0, 2).map((tid) => {
                          const tag = tags.find((t) => t.id === tid);
                          if (!tag) return null;
                          return (
                            <span key={tid} className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", tagColorMap[tag.color])}>
                              {tag.name}
                            </span>
                          );
                        })}
                        {lead.tagIds.length > 2 && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                            +{lead.tagIds.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Pendências */}
                    <td className="px-4 py-3.5">
                      {hasPending ? (
                        <div className="flex items-start gap-1.5 max-w-[180px]">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-500 flex-none mt-0.5" />
                          <div>
                            <p className="text-[11px] text-foreground leading-snug line-clamp-2">
                              {lead.pendingItems![0]}
                            </p>
                            {lead.pendingItems!.length > 1 && (
                              <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">
                                +{lead.pendingItems!.length - 1} mais
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">✓ Sem pendências</span>
                      )}
                    </td>

                    {/* Total */}
                    <td className="px-4 py-3.5">
                      {lead.totalSpent > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-500" />
                          <span className="text-[13px] font-semibold text-foreground">R$ {lead.totalSpent.toLocaleString("pt-BR")}</span>
                        </div>
                      ) : (
                        <span className="text-[12px] text-muted-foreground/50">—</span>
                      )}
                    </td>

                    {/* Atendente */}
                    <td className="px-4 py-3.5">
                      {attendant ? (
                        <div className="flex items-center gap-2">
                          <div
                            className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold text-white ring-1 ring-white/20"
                            style={{ backgroundColor: attendant.color }}
                          >
                            {attendant.initials}
                          </div>
                          <span className="text-[12px] text-foreground">{attendant.name.split(" ")[0]}</span>
                        </div>
                      ) : (
                        <span className="text-[12px] text-muted-foreground/50">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search className="h-8 w-8 text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">Nenhum contato encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
