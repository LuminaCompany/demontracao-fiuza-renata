import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, Phone, Mail, Tag as TagIcon, ShoppingBag, Star,
  Filter, UserPlus, ChevronUp, ChevronDown,
} from "lucide-react";
import { leads, tags, attendants } from "@/data/mock";
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

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

function ContatosPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "totalSpent" | "totalPurchases">("totalSpent");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = leads
    .filter((l) => {
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

  function handleSort(col: typeof sortBy) {
    if (sortBy === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(col); setSortDir("desc"); }
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

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Contatos</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {filtered.length} contato{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
            <UserPlus className="h-4 w-4" />
            Novo Contato
          </button>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, telefone ou e-mail..."
              className="w-full rounded-xl border border-border bg-background pl-9 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
            />
          </div>
          <button className="flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
            <Filter className="h-4 w-4" />
            Filtros
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Contato</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Telefone</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Tags</th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Última Compra</th>
                <th
                  className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("totalSpent")}
                >
                  <div className="flex items-center gap-1">Total Gasto <SortIcon col="totalSpent" /></div>
                </th>
                <th
                  className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("totalPurchases")}
                >
                  <div className="flex items-center gap-1">Compras <SortIcon col="totalPurchases" /></div>
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Atendente</th>
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

                    {/* Última compra */}
                    <td className="px-4 py-3.5">
                      {lead.lastPurchase ? (
                        <div>
                          <p className="text-[12px] text-foreground leading-tight max-w-[160px] truncate">{lead.lastPurchase}</p>
                          {lead.lastPurchaseValue && (
                            <p className="text-[11px] text-primary font-medium">R$ {lead.lastPurchaseValue.toLocaleString("pt-BR")}</p>
                          )}
                        </div>
                      ) : (
                        <span className="text-[12px] text-muted-foreground/50">—</span>
                      )}
                    </td>

                    {/* Total gasto */}
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

                    {/* Compras */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <ShoppingBag className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[13px] text-foreground">{lead.totalPurchases}</span>
                      </div>
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
