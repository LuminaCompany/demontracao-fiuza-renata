import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { tags, leads } from "@/data/mock";
import { Tag as TagIcon, Plus, Pencil, Trash2, ChevronDown, Eye, EyeOff } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tags")({
  component: TagsPage,
});

const tagColorMap: Record<string, { bg: string; text: string; dot: string; hex: string }> = {
  blue:   { bg: "bg-blue-100 dark:bg-blue-900/40",   text: "text-blue-700 dark:text-blue-300",   dot: "bg-blue-500",   hex: "#3b82f6" },
  cyan:   { bg: "bg-cyan-100 dark:bg-cyan-900/40",   text: "text-cyan-700 dark:text-cyan-300",   dot: "bg-cyan-500",   hex: "#06b6d4" },
  red:    { bg: "bg-red-100 dark:bg-red-900/40",     text: "text-red-700 dark:text-red-300",     dot: "bg-red-500",    hex: "#ef4444" },
  amber:  { bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-700 dark:text-amber-300", dot: "bg-amber-500",  hex: "#f59e0b" },
  green:  { bg: "bg-green-100 dark:bg-green-900/40", text: "text-green-700 dark:text-green-300", dot: "bg-green-500",  hex: "#22c55e" },
  orange: { bg: "bg-orange-100 dark:bg-orange-900/40", text: "text-orange-700 dark:text-orange-300", dot: "bg-orange-500", hex: "#f97316" },
  violet: { bg: "bg-violet-100 dark:bg-violet-900/40", text: "text-violet-700 dark:text-violet-300", dot: "bg-violet-500", hex: "#8b5cf6" },
  pink:   { bg: "bg-pink-100 dark:bg-pink-900/40",   text: "text-pink-700 dark:text-pink-300",   dot: "bg-pink-500",   hex: "#ec4899" },
  teal:   { bg: "bg-teal-100 dark:bg-teal-900/40",   text: "text-teal-700 dark:text-teal-300",   dot: "bg-teal-500",   hex: "#14b8a6" },
  yellow: { bg: "bg-yellow-100 dark:bg-yellow-900/40", text: "text-yellow-700 dark:text-yellow-300", dot: "bg-yellow-500", hex: "#eab308" },
};

function TagsPage() {
  const navigate = useNavigate();
  const [expandedTags, setExpandedTags] = useState<Set<string>>(new Set());
  const [showOverview, setShowOverview] = useState(false);

  const tagStats = tags.map((tag) => {
    const tagLeads = leads.filter((l) => l.tagIds.includes(tag.id));
    return { tag, count: tagLeads.length, leads: tagLeads };
  });

  const pieData = tagStats
    .filter((s) => s.count > 0)
    .map((s) => ({
      name: s.tag.name,
      value: s.count,
      color: tagColorMap[s.tag.color]?.hex ?? "#888",
    }));

  function toggleTag(id: string) {
    setExpandedTags((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (showOverview) {
      setShowOverview(false);
      setExpandedTags(new Set());
    } else {
      setShowOverview(true);
      setExpandedTags(new Set(tags.map((t) => t.id)));
    }
  }

  const isAllExpanded = showOverview && expandedTags.size === tags.length;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Tags</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Gerencie as etiquetas para organizar seus leads
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAll}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors border",
                isAllExpanded
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-background text-muted-foreground border-border hover:bg-accent hover:text-foreground",
              )}
            >
              {isAllExpanded ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {isAllExpanded ? "Recolher Tudo" : "Expandir Tudo"}
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
              <Plus className="h-4 w-4" />
              Nova Tag
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-5 space-y-5">
        {/* Visão geral com gráfico de pizza */}
        {showOverview && (
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-[14px] font-bold text-foreground mb-0.5">Visão Geral — Distribuição de Tags</h3>
            <p className="text-[11px] text-muted-foreground mb-4">Uso de cada tag entre os leads</p>
            <div className="flex items-center gap-6">
              <div className="flex-none">
                <ResponsiveContainer width={180} height={180}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "0.5rem",
                        fontSize: "12px",
                        color: "var(--color-foreground)",
                      }}
                      formatter={(v: number, name: string) => [`${v} lead${v !== 1 ? "s" : ""}`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-2.5">
                {pieData.map((d) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full flex-none" style={{ backgroundColor: d.color }} />
                    <span className="text-[12px] text-foreground truncate flex-1">{d.name}</span>
                    <span className="text-[11px] font-bold text-muted-foreground">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          {tagStats.map(({ tag, count, leads: tagLeads }) => {
            const cfg = tagColorMap[tag.color];
            const isExpanded = expandedTags.has(tag.id);
            return (
              <div
                key={tag.id}
                className="group rounded-2xl border border-border bg-card hover:shadow-md hover:border-primary/20 transition-all duration-200 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", cfg.bg)}>
                      <TagIcon className={cn("h-5 w-5", cfg.text)} />
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                        <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => toggleTag(tag.id)}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                        title={isExpanded ? "Recolher" : "Ver leads"}
                      >
                        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", isExpanded && "rotate-180")} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h3 className="text-[14px] font-bold text-foreground">{tag.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={cn("h-2 w-2 rounded-full", cfg.dot)} />
                      <span className="text-[12px] text-muted-foreground">
                        {count} lead{count !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="h-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all", cfg.dot)}
                        style={{ width: `${leads.length > 0 ? Math.min((count / leads.length) * 100, 100) : 0}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {leads.length > 0 ? ((count / leads.length) * 100).toFixed(0) : 0}% dos leads
                    </p>
                  </div>
                </div>

                {/* Lista de leads da tag */}
                {isExpanded && (
                  <div className="border-t border-border bg-muted/20 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
                      Leads com esta tag
                    </p>
                    {tagLeads.length === 0 ? (
                      <p className="text-[11px] text-muted-foreground">Nenhum lead</p>
                    ) : (
                      <div className="space-y-2">
                        {tagLeads.map((lead) => (
                          <button
                            key={lead.id}
                            onClick={() => navigate({ to: "/atendimentos", search: { leadId: lead.id } })}
                            className="flex w-full items-center gap-2 rounded-lg hover:bg-accent/60 transition-colors -mx-1 px-1 py-0.5"
                          >
                            <div className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/40 text-[9px] font-bold text-primary">
                              {lead.name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                              <p className="text-[11px] font-medium text-foreground truncate hover:text-primary">{lead.name}</p>
                              <p className="text-[10px] text-muted-foreground capitalize">{lead.status}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
