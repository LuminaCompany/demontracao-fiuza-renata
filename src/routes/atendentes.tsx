import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { attendants } from "@/data/mock";
import {
  MessageSquare, Clock, Star, TrendingUp, UserPlus,
  ChevronDown, KeyRound, User, Trophy, Eye, EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/atendentes")({
  component: AtendentesPage,
});

const statusConfig = {
  online:  { label: "Online",  dot: "bg-emerald-500",      badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  busy:    { label: "Ocupado", dot: "bg-amber-500",        badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  offline: { label: "Offline", dot: "bg-muted-foreground", badge: "bg-muted text-muted-foreground" },
};

function AtendentesPage() {
  const [expandedAttendants, setExpandedAttendants] = useState<Set<string>>(new Set());
  const [showPasswords, setShowPasswords] = useState<Set<string>>(new Set());

  const attendantOfMonth = [...attendants].sort((a, b) => b.totalMonth - a.totalMonth)[0];

  function toggleAttendant(id: string) {
    setExpandedAttendants((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function togglePassword(id: string) {
    setShowPasswords((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

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

      <div className="flex-1 overflow-auto px-6 py-5 space-y-5">
        {/* Atendente do Mês */}
        <div className="rounded-2xl border border-amber-200 dark:border-amber-800/40 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-5 w-5 text-amber-500" />
            <h3 className="text-[14px] font-bold text-foreground">Atendente do Mês</h3>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl text-base font-bold text-white shadow-lg ring-4 ring-amber-300/40"
              style={{ backgroundColor: attendantOfMonth.color }}
            >
              {attendantOfMonth.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[16px] font-bold text-foreground leading-tight">{attendantOfMonth.name}</p>
              <p className="text-[12px] text-muted-foreground">{attendantOfMonth.department}</p>
              <div className="flex items-center gap-4 mt-1.5">
                <span className="text-[12px] font-semibold text-amber-600 dark:text-amber-400">
                  {attendantOfMonth.totalMonth} atendimentos no mês
                </span>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <Star className="h-3 w-3 text-amber-500" />
                  {attendantOfMonth.rating}
                </span>
              </div>
            </div>
            <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 px-3 py-1.5 flex-none">
              <span className="text-[13px] font-bold text-amber-700 dark:text-amber-300">🏆 #1</span>
            </div>
          </div>
        </div>

        {/* Grid de atendentes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {attendants.map((a) => {
            const cfg = statusConfig[a.status];
            const isExpanded = expandedAttendants.has(a.id);
            const showPwd = showPasswords.has(a.id);
            return (
              <div
                key={a.id}
                className="group rounded-2xl border border-border bg-card hover:shadow-md hover:shadow-primary/5 hover:border-primary/20 transition-all duration-200 overflow-hidden"
              >
                <div className="p-5">
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
                    <button
                      onClick={() => toggleAttendant(a.id)}
                      className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors flex-none"
                      title="Gerenciar acesso"
                    >
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isExpanded && "rotate-180")} />
                    </button>
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

                {/* Gerenciar acesso (expandido) */}
                {isExpanded && (
                  <div className="border-t border-border bg-muted/20 px-4 py-4 space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <KeyRound className="h-3.5 w-3.5 text-primary" />
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                        Gerenciar Acesso
                      </p>
                    </div>
                    <div>
                      <label className="mb-1 flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
                        <User className="h-3 w-3" /> Usuário
                      </label>
                      <input
                        defaultValue={a.email.split("@")[0]}
                        className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                      />
                    </div>
                    <div>
                      <label className="mb-1 flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
                        <KeyRound className="h-3 w-3" /> Senha
                      </label>
                      <div className="relative">
                        <input
                          type={showPwd ? "text" : "password"}
                          defaultValue="senha@123"
                          className="w-full rounded-lg border border-border bg-background px-3 py-1.5 pr-9 text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                        />
                        <button
                          onClick={() => togglePassword(a.id)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPwd ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                    <button className="w-full rounded-xl bg-primary px-3 py-2 text-[12px] font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                      Salvar Alterações
                    </button>
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
