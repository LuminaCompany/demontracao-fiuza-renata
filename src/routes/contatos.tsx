import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Phone,
  Mail,
  Star,
  Filter,
  UserPlus,
  ChevronUp,
  ChevronDown,
  CalendarDays,
  Clock,
  RefreshCw,
  LayoutGrid,
  List,
  Users,
  Activity,
} from "lucide-react";
import { leads, tags, attendants } from "@/data/mock";
import { useDemoCrm } from "@/lib/demo-crm";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contatos")({
  component: ContatosPage,
});

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

const statusLabel: Record<string, string> = {
  ativo: "Em Atendimento",
  pendente: "Follow UP",
  potencial: "Agendado",
  finalizado: "Finalizado",
};

const statusBadge: Record<string, string> = {
  ativo: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  pendente: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  potencial: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  finalizado: "bg-muted text-muted-foreground",
};

const kanbanCols = [
  { key: "ativo", label: "Em Atendimento", headerCls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", borderCls: "border-emerald-200 dark:border-emerald-800/50" },
  { key: "potencial", label: "Agendado", headerCls: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", borderCls: "border-blue-200 dark:border-blue-800/50" },
  { key: "pendente", label: "Follow UP", headerCls: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400", borderCls: "border-orange-200 dark:border-orange-800/50" },
  { key: "finalizado", label: "Finalizado / Fidelização", headerCls: "bg-muted text-muted-foreground", borderCls: "border-border" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function ContatosPage() {
  const navigate = useNavigate();
  const { waLeads } = useDemoCrm();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "totalSpent">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");

  const allLeads = [...leads, ...waLeads];

  const filtered = allLeads
    .filter((l) => {
      if (filterStatus !== "todos" && l.status !== filterStatus) return false;
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
      return mul * (a[sortBy] - b[sortBy]);
    });

  const kanbanLeads = allLeads.filter((l) => {
    if (!search) return true;
    return (
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      (l.email && l.email.toLowerCase().includes(search.toLowerCase()))
    );
  });

  function handleSort(col: typeof sortBy) {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(col);
      setSortDir("asc");
    }
  }

  function SortIcon({ col }: { col: typeof sortBy }) {
    if (sortBy !== col) return <ChevronUp className="h-3 w-3 text-muted-foreground/40" />;
    return sortDir === "asc" ? (
      <ChevronUp className="h-3 w-3 text-primary" />
    ) : (
      <ChevronDown className="h-3 w-3 text-primary" />
    );
  }

  function openLead(leadId: string) {
    navigate({ to: "/atendimentos", search: { leadId } });
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Pacientes</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {allLeads.length} paciente{allLeads.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === "list" ? "kanban" : "list")}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors",
                viewMode === "kanban"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {viewMode === "kanban" ? <List className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
              {viewMode === "kanban" ? "Ver em Lista" : "Ver em Kanban"}
            </button>
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
              Novo Paciente
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

          {showFilters && viewMode === "list" && (
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="todos">Todos os status</option>
              <option value="ativo">Em Atendimento</option>
              <option value="potencial">Agendado</option>
              <option value="pendente">Follow UP</option>
              <option value="finalizado">Finalizado</option>
            </select>
          )}
        </div>

        {/* Status summary chips — list mode only */}
        {viewMode === "list" && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {[
              { key: "ativo", label: "Em Atendimento", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
              { key: "potencial", label: "Agendado", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
              { key: "pendente", label: "Follow UP", cls: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
              { key: "finalizado", label: "Finalizado", cls: "bg-muted text-muted-foreground" },
            ].map(({ key, label, cls }) => {
              const count = allLeads.filter((l) => l.status === key).length;
              if (count === 0) return null;
              return (
                <button
                  key={key}
                  onClick={() => setFilterStatus(filterStatus === key ? "todos" : key)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-medium transition-all border",
                    filterStatus === key
                      ? cn(cls, "border-current shadow-sm")
                      : "border-border bg-background text-muted-foreground hover:border-primary/30",
                  )}
                >
                  {label} <span className="font-bold ml-0.5">{count}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Kanban view */}
      {viewMode === "kanban" ? (
        <div className="flex-1 overflow-auto px-6 py-4">
          <div className="grid grid-cols-4 gap-4 h-full min-h-0">
            {kanbanCols.map((col) => {
              const colLeads = kanbanLeads.filter((l) => l.status === col.key);
              return (
                <div key={col.key} className="flex flex-col gap-2 min-h-0">
                  <div className="flex items-center justify-between flex-none">
                    <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", col.headerCls)}>
                      {col.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-medium">{colLeads.length}</span>
                  </div>
                  <div
                    className={cn(
                      "flex-1 overflow-y-auto rounded-2xl border p-2 space-y-2 min-h-[120px]",
                      col.borderCls,
                      "bg-muted/20",
                    )}
                  >
                    {colLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => openLead(lead.id)}
                        className="rounded-xl border border-border bg-card px-3 py-2.5 cursor-pointer hover:shadow-sm hover:border-primary/30 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/40 text-[10px] font-bold text-primary">
                            {getInitials(lead.name)}
                          </div>
                          <p className="text-[12px] font-semibold text-foreground truncate leading-tight">{lead.name}</p>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground mb-1.5">
                          <Phone className="h-2.5 w-2.5 flex-none" />
                          <span className="truncate">{lead.phone}</span>
                        </div>
                        {lead.tagIds.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {lead.tagIds.slice(0, 3).map((tid) => {
                              const tag = tags.find((t) => t.id === tid);
                              if (!tag) return null;
                              return (
                                <span
                                  key={tid}
                                  className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-medium", tagColorMap[tag.color])}
                                >
                                  {tag.name}
                                </span>
                              );
                            })}
                            {lead.tagIds.length > 3 && (
                              <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">
                                +{lead.tagIds.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                    {colLeads.length === 0 && (
                      <div className="flex items-center justify-center py-8">
                        <p className="text-[11px] text-muted-foreground/50">Nenhum paciente</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Table view */
        <div className="flex-1 overflow-auto px-6 py-4">
          {/* Stats bar */}
          <div className="flex gap-3 mb-4 flex-wrap">
            <div className="flex-1 min-w-[280px] rounded-2xl border border-border bg-card px-5 py-3.5 flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-muted-foreground flex-none">
                <Activity className="h-4 w-4" />
                <span className="text-[12px] font-semibold">Status Atual</span>
              </div>
              <div className="h-4 w-px bg-border flex-none" />
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { key: "ativo", label: "Em Atendimento", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
                  { key: "potencial", label: "Agendados", cls: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
                  { key: "pendente", label: "Follow UP", cls: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
                  { key: "finalizado", label: "Finalizados", cls: "bg-muted text-muted-foreground" },
                ].map(({ key, label, cls }) => {
                  const count = allLeads.filter((l) => l.status === key).length;
                  return (
                    <span key={key} className={cn("rounded-full px-3 py-1 text-[11px] font-semibold", cls)}>
                      {count} {label}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card px-5 py-3.5 flex items-center gap-3 flex-none">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[18px] font-bold text-foreground leading-none">{allLeads.length}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Total de Pacientes</p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card px-5 py-3.5 flex items-center gap-3 flex-none">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10">
                <Star className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <p className="text-[18px] font-bold text-foreground leading-none">
                  R$ {allLeads.reduce((s, l) => s + l.totalSpent, 0).toLocaleString("pt-BR")}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Receita Total</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th
                    className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-1">
                      Contato <SortIcon col="name" />
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Telefone
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Tags
                  </th>
                  <th
                    className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={() => handleSort("totalSpent")}
                  >
                    <div className="flex items-center gap-1">
                      Total <SortIcon col="totalSpent" />
                    </div>
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Atendente
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((lead) => {
                  const attendant = attendants.find((a) => a.id === lead.attendantId);
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

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <div className="relative group/status inline-block">
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[11px] font-semibold cursor-default",
                              statusBadge[lead.status],
                            )}
                          >
                            {statusLabel[lead.status]}
                          </span>
                          {lead.status === "potencial" && lead.appointmentDate && (
                            <div className="absolute bottom-full left-0 mb-1.5 z-10 hidden group-hover/status:block">
                              <div className="rounded-lg bg-popover border border-border shadow-lg px-3 py-2 min-w-[160px]">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <CalendarDays className="h-3 w-3 text-blue-500" />
                                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                                    Consulta agendada
                                  </p>
                                </div>
                                <p className="text-[12px] font-medium text-foreground">{lead.appointmentDate}</p>
                                {lead.doctor && (
                                  <p className="text-[11px] text-muted-foreground mt-0.5">{lead.doctor}</p>
                                )}
                              </div>
                            </div>
                          )}
                          {lead.status === "pendente" && (lead.followUpActivatesIn || lead.followUpName) && (
                            <div className="absolute bottom-full left-0 mb-1.5 z-10 hidden group-hover/status:block">
                              <div className="rounded-lg bg-popover border border-border shadow-lg px-3 py-2 min-w-[180px]">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <RefreshCw className="h-3 w-3 text-orange-500" />
                                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                                    Follow UP
                                  </p>
                                </div>
                                {lead.followUpName && (
                                  <p className="text-[12px] font-medium text-foreground">{lead.followUpName}</p>
                                )}
                                {lead.followUpActivatesIn && (
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <Clock className="h-3 w-3 text-orange-400" />
                                    <p className="text-[11px] text-orange-600 dark:text-orange-400 font-medium">
                                      Ativa: {lead.followUpActivatesIn}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
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
                              <span
                                key={tid}
                                className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", tagColorMap[tag.color])}
                              >
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

                      {/* Total */}
                      <td className="px-4 py-3.5">
                        {lead.totalSpent > 0 ? (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-amber-500" />
                            <span className="text-[13px] font-semibold text-foreground">
                              R$ {lead.totalSpent.toLocaleString("pt-BR")}
                            </span>
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
      )}
    </div>
  );
}
