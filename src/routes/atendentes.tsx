import { createFileRoute } from "@tanstack/react-router";
import { attendants } from "@/data/mock";
import { MessageSquare, Clock, Star, TrendingUp, Circle, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/atendentes")({
  component: AtendentesPage,
});

const statusConfig = {
  online: { label: "Online", dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  busy: { label: "Ocupado", dot: "bg-amber-500", badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  offline: { label: "Offline", dot: "bg-muted-foreground", badge: "bg-muted text-muted-foreground" },
};

function AtendentesPage() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Atendentes</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{attendants.length} atendentes cadastrados</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
            <UserPlus className="h-4 w-4" />
            Novo Atendente
          </button>
        </div>

        {/* Summary */}
        <div className="flex items-center gap-4 mt-4">
          {Object.entries(statusConfig).map(([status, cfg]) => (
            <div key={status} className="flex items-center gap-2">
              <span className={cn("h-2.5 w-2.5 rounded-full", cfg.dot)} />
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {attendants.filter((a) => a.status === status).length}
                </span>{" "}
                {cfg.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {attendants.map((a) => {
            const cfg = statusConfig[a.status];
            return (
              <div
                key={a.id}
                className="group rounded-2xl border border-border bg-card p-5 hover:shadow-md hover:shadow-primary/5 hover:border-primary/20 transition-all duration-200"
              >
                {/* Top */}
                <div className="flex items-start gap-4">
                  <div className="relative flex-none">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-md"
                      style={{ backgroundColor: a.color }}
                    >
                      {a.initials}
                    </div>
                    <span className={cn(
                      "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full ring-2 ring-card",
                      cfg.dot,
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-bold text-foreground leading-tight">{a.name}</h3>
                    <p className="text-[12px] text-muted-foreground">{a.department}</p>
                    <span className={cn("mt-1.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold", cfg.badge)}>
                      {cfg.label}
                    </span>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <div className="rounded-xl bg-background border border-border p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <MessageSquare className="h-3 w-3 text-primary" />
                      <span className="text-[10px] text-muted-foreground">Ativos</span>
                    </div>
                    <p className="text-xl font-bold text-foreground">{a.activeCount}</p>
                  </div>
                  <div className="rounded-xl bg-background border border-border p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                      <span className="text-[10px] text-muted-foreground">Hoje</span>
                    </div>
                    <p className="text-xl font-bold text-foreground">{a.totalToday}</p>
                  </div>
                  <div className="rounded-xl bg-background border border-border p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Clock className="h-3 w-3 text-amber-500" />
                      <span className="text-[10px] text-muted-foreground">T. Médio</span>
                    </div>
                    <p className="text-xl font-bold text-foreground">{a.avgResponseTime}m</p>
                  </div>
                  <div className="rounded-xl bg-background border border-border p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Star className="h-3 w-3 text-amber-500" />
                      <span className="text-[10px] text-muted-foreground">Avaliação</span>
                    </div>
                    <p className="text-xl font-bold text-foreground">{a.rating}</p>
                  </div>
                </div>

                {/* Month total bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-muted-foreground">Total no mês</span>
                    <span className="text-[12px] font-bold text-foreground">{a.totalMonth}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${Math.min((a.totalMonth / 250) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Contact info */}
                <div className="mt-3 pt-3 border-t border-border space-y-1">
                  <p className="text-[11px] text-muted-foreground truncate">{a.email}</p>
                  <p className="text-[11px] text-muted-foreground">{a.phone}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
