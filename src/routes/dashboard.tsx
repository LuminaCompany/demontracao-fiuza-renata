import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  MessageSquare, Users, Clock, TrendingUp,
  CheckCircle, AlertCircle, UserCheck, Activity,
  Star, ArrowUpRight, CalendarDays, RefreshCw, Heart,
} from "lucide-react";
import {
  attendants, peakHoursData, weeklyLeadsData, monthlyRevenueData,
} from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

const kpiCards = [
  { label: "Atendentes Online", value: "3", sub: "de 5 atendentes", icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-500/10 dark:bg-emerald-500/15", trend: "+1 hoje", trendUp: true },
  { label: "Novos Leads", value: "12", sub: "hoje", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10 dark:bg-blue-500/15", trend: "+33% vs ontem", trendUp: true },
  { label: "Mensagens", value: "547", sub: "hoje", icon: MessageSquare, color: "text-violet-500", bg: "bg-violet-500/10 dark:bg-violet-500/15", trend: "+18% vs ontem", trendUp: true },
  { label: "Atendimentos Ativos", value: "47", sub: "em andamento", icon: Activity, color: "text-primary", bg: "bg-primary/10 dark:bg-primary/15", trend: "53 finalizados hoje", trendUp: true },
  { label: "Pendentes", value: "4", sub: "aguardando resposta", icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-500/10 dark:bg-amber-500/15", trend: "-2 vs ontem", trendUp: false },
  { label: "Tempo Médio", value: "4,2min", sub: "de resposta", icon: Clock, color: "text-teal-500", bg: "bg-teal-500/10 dark:bg-teal-500/15", trend: "-0,8min vs ontem", trendUp: true },
];

const followUpData = [
  { name: "Realizados", value: 38, color: "#22c55e" },
  { name: "Pendentes",  value: 7,  color: "#f59e0b" },
  { name: "Não feitos", value: 5,  color: "#ef4444" },
];

const fidelizacaoData = [
  { name: "Recompras",   value: 43, color: "#3b82f6" },
  { name: "Indicações",  value: 18, color: "#8b5cf6" },
  { name: "Sem retorno", value: 6,  color: "#6b7280" },
];

const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: "0.5rem",
  fontSize: "12px",
  color: "var(--color-foreground)",
};

type Period = "dia" | "semanal" | "mensal";

function PeriodLabel({ period, date, month, week }: { period: Period; date: string; month: string; week: string }) {
  if (period === "dia") {
    const d = new Date(date + "T00:00:00");
    return <>{d.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</>;
  }
  if (period === "mensal") {
    const [y, m] = month.split("-");
    const d = new Date(Number(y), Number(m) - 1, 1);
    return <>{d.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}</>;
  }
  return <>Semana {week.replace("W", "— sem. ")}</>;
}

function DashboardPage() {
  const [period, setPeriod] = useState<Period>("dia");
  const [date, setDate]   = useState("2024-04-16");
  const [month, setMonth] = useState("2024-04");
  const [week, setWeek]   = useState("2024-W16");

  const salesAttendants = attendants.filter((a) => a.department.includes("Vendas"));
  const sortedAttendants = [...salesAttendants].sort((a, b) => b.totalToday - a.totalToday);

  const followUpTotal = followUpData.reduce((s, d) => s + d.value, 0);
  const fidelizacaoTotal = fidelizacaoData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* Header com seletor de período */}
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5 capitalize">
              <PeriodLabel period={period} date={date} month={month} week={week} />
            </p>
          </div>

          {/* Seletor de período */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex rounded-xl border border-border bg-background overflow-hidden">
              {(["dia", "semanal", "mensal"] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium capitalize transition-colors",
                    period === p
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {p === "dia" ? "Dia" : p === "semanal" ? "Semanal" : "Mensal"}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground flex-none" />
              {period === "dia" && (
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                />
              )}
              {period === "semanal" && (
                <input
                  type="week"
                  value={week}
                  onChange={(e) => setWeek(e.target.value)}
                  className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                />
              )}
              {period === "mensal" && (
                <input
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-5 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-3 xl:grid-cols-6 gap-3">
          {kpiCards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-border bg-card p-4 backdrop-blur-sm transition-shadow hover:shadow-md hover:shadow-primary/5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", card.bg)}>
                  <card.icon className={cn("h-4.5 w-4.5", card.color)} />
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <ArrowUpRight className={cn("h-3 w-3", card.trendUp ? "text-emerald-500" : "text-amber-500 rotate-90")} />
                  <span className={card.trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}>
                    {card.trend}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground leading-none">{card.value}</p>
              <p className="mt-1 text-[11px] font-medium text-foreground/80">{card.label}</p>
              <p className="text-[10px] text-muted-foreground">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[14px] font-bold text-foreground">Pico de Mensagens</h3>
                <p className="text-[11px] text-muted-foreground">Mensagens por hora hoje</p>
              </div>
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={peakHoursData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.510 0.220 262)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.510 0.220 262)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0.01 248 / 15%)" />
                <XAxis dataKey="hour" tick={{ fontSize: 9, fill: "oklch(0.5 0.04 248)" }} tickLine={false} interval={3} />
                <YAxis tick={{ fontSize: 9, fill: "oklch(0.5 0.04 248)" }} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="messages" name="Mensagens" stroke="oklch(0.510 0.220 262)" strokeWidth={2} fill="url(#colorMessages)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[14px] font-bold text-foreground">Leads da Semana</h3>
                <p className="text-[11px] text-muted-foreground">Novos vs Finalizados</p>
              </div>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyLeadsData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0.01 248 / 15%)" />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "oklch(0.5 0.04 248)" }} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "oklch(0.5 0.04 248)" }} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "11px" }} iconType="circle" iconSize={8} />
                <Bar dataKey="novos" name="Novos" fill="oklch(0.510 0.220 262)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="finalizados" name="Finalizados" fill="oklch(0.600 0.160 192)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom row: receita + ranking */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[14px] font-bold text-foreground">Receita Mensal</h3>
                <p className="text-[11px] text-muted-foreground">Últimos 12 meses</p>
              </div>
              <div className="rounded-lg bg-emerald-500/10 px-2.5 py-1">
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">+24% ano anterior</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={monthlyRevenueData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0.01 248 / 15%)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "oklch(0.5 0.04 248)" }} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "oklch(0.5 0.04 248)" }} tickLine={false} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, "Receita"]} />
                <Line type="monotone" dataKey="value" name="Receita" stroke="oklch(0.510 0.220 262)" strokeWidth={2.5} dot={{ fill: "oklch(0.510 0.220 262)", r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Ranking — apenas Vendas */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[14px] font-bold text-foreground">Ranking Vendas</h3>
                <p className="text-[11px] text-muted-foreground">Atendentes hoje</p>
              </div>
              <Star className="h-4 w-4 text-amber-500" />
            </div>
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {sortedAttendants.map((a, i) => (
                <div key={a.id} className="flex items-center gap-3">
                  <span className={cn(
                    "flex h-6 w-6 flex-none items-center justify-center rounded-full text-[11px] font-bold",
                    i === 0 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                      : i === 1 ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      : i === 2 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                      : "bg-muted text-muted-foreground",
                  )}>
                    {i + 1}
                  </span>
                  <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ring-white/20" style={{ backgroundColor: a.color }}>
                    {a.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-foreground truncate leading-tight">{a.name.split(" ")[0]}</p>
                    <p className="text-[10px] text-muted-foreground">{a.department}</p>
                  </div>
                  <div className="text-right flex-none">
                    <p className="text-[13px] font-bold text-foreground">{a.totalToday}</p>
                    <p className="text-[9px] text-muted-foreground">atend.</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-border space-y-1.5">
              {[
                { label: "Online",  count: attendants.filter((a) => a.status === "online").length,  dot: "bg-emerald-500" },
                { label: "Ocupado", count: attendants.filter((a) => a.status === "busy").length,    dot: "bg-amber-500" },
                { label: "Offline", count: attendants.filter((a) => a.status === "offline").length, dot: "bg-muted-foreground" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("h-2 w-2 rounded-full", s.dot)} />
                    <span className="text-[11px] text-muted-foreground">{s.label}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-foreground">{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Follow-Up & Fidelização */}
        <div className="grid grid-cols-2 gap-4">
          {/* Follow-Up */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-blue-500" />
                  Follow-Up
                </h3>
                <p className="text-[11px] text-muted-foreground">{followUpTotal} programados no período</p>
              </div>
              <div className="rounded-lg bg-blue-500/10 px-2.5 py-1">
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                  {Math.round((followUpData[0].value / followUpTotal) * 100)}% taxa de realização
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-none">
                <ResponsiveContainer width={140} height={140}>
                  <PieChart>
                    <Pie data={followUpData} cx="50%" cy="50%" innerRadius={38} outerRadius={65} paddingAngle={2} dataKey="value">
                      {followUpData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} formatter={(v: number, name: string) => [v, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2.5">
                {followUpData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full flex-none" style={{ backgroundColor: d.color }} />
                      <span className="text-[12px] text-foreground">{d.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[13px] font-bold text-foreground">{d.value}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">
                        ({Math.round((d.value / followUpTotal) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">Sucesso (convertidos)</span>
                    <span className="text-[13px] font-bold text-emerald-500">24</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fidelização */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-500" />
                  Fidelização
                </h3>
                <p className="text-[11px] text-muted-foreground">{fidelizacaoTotal} clientes fidelizados</p>
              </div>
              <div className="rounded-lg bg-pink-500/10 px-2.5 py-1">
                <span className="text-[11px] font-semibold text-pink-600 dark:text-pink-400">
                  {Math.round(((fidelizacaoData[0].value + fidelizacaoData[1].value) / fidelizacaoTotal) * 100)}% retorno
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-none">
                <ResponsiveContainer width={140} height={140}>
                  <PieChart>
                    <Pie data={fidelizacaoData} cx="50%" cy="50%" innerRadius={38} outerRadius={65} paddingAngle={2} dataKey="value">
                      {fidelizacaoData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} formatter={(v: number, name: string) => [v, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2.5">
                {fidelizacaoData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full flex-none" style={{ backgroundColor: d.color }} />
                      <span className="text-[12px] text-foreground">{d.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[13px] font-bold text-foreground">{d.value}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">
                        ({Math.round((d.value / fidelizacaoTotal) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">NPS médio</span>
                    <span className="text-[13px] font-bold text-blue-500">8,4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 pb-2">
          {[
            { label: "Taxa de Conversão", value: "68%",      icon: CheckCircle, color: "text-emerald-500" },
            { label: "Leads do Mês",      value: "284",      icon: Users,       color: "text-blue-500" },
            { label: "Ticket Médio",      value: "R$ 3.840", icon: TrendingUp,  color: "text-primary" },
            { label: "Tempo Médio Geral", value: "4,8min",   icon: Star,        color: "text-amber-500" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
              <s.icon className={cn("h-8 w-8 flex-none", s.color)} />
              <div>
                <p className="text-[18px] font-bold text-foreground leading-none">{s.value}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
