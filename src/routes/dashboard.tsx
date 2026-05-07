import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart as RechartLineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  MessageSquare,
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  UserCheck,
  Activity,
  ArrowUpRight,
  CalendarDays,
  RefreshCw,
  Heart,
  BarChart2,
  LayoutGrid,
  LineChart as LineChartIcon,
} from "lucide-react";
import { peakHoursData, serviceDistributionData } from "@/data/mock";

const weeklySchedule = [
  { day: "Seg", consultas: 8, cirurgias: 1, exames: 4 },
  { day: "Ter", consultas: 11, cirurgias: 2, exames: 6 },
  { day: "Qua", consultas: 9, cirurgias: 0, exames: 5 },
  { day: "Qui", consultas: 14, cirurgias: 3, exames: 7 },
  { day: "Sex", consultas: 7, cirurgias: 1, exames: 3 },
];
const weeklyPatientsData = [
  { day: "Seg", novos: 2, recorrentes: 1, agendados: 5, followup: 1 },
  { day: "Ter", novos: 3, recorrentes: 2, agendados: 6, followup: 2 },
  { day: "Qua", novos: 2, recorrentes: 2, agendados: 4, followup: 1 },
  { day: "Qui", novos: 3, recorrentes: 2, agendados: 6, followup: 2 },
  { day: "Sex", novos: 2, recorrentes: 1, agendados: 3, followup: 1 },
];

const weeklyPatientsChartConfig = {
  novos: { label: "Novos", color: "oklch(0.510 0.220 193)" },
  recorrentes: { label: "Recorrentes", color: "#6366f1" },
  agendados: { label: "Agendados", color: "#3b82f6" },
  followup: { label: "Follow UP", color: "#f59e0b" },
} satisfies ChartConfig;

import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

const kpiCards = [
  {
    label: "Equipe Online",
    value: "3",
    sub: "de 5 recepcionistas",
    icon: UserCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    trend: "+1 hoje",
    trendUp: true,
  },
  {
    label: "Novos Pacientes",
    value: "12",
    sub: "hoje",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10 dark:bg-blue-500/15",
    trend: "+33% vs ontem",
    trendUp: true,
  },
  {
    label: "Mensagens",
    value: "547",
    sub: "hoje",
    icon: MessageSquare,
    color: "text-violet-500",
    bg: "bg-violet-500/10 dark:bg-violet-500/15",
    trend: "+18% vs ontem",
    trendUp: true,
  },
  {
    label: "Consultas Agendadas",
    value: "47",
    sub: "para hoje e amanhã",
    icon: Activity,
    color: "text-primary",
    bg: "bg-primary/10 dark:bg-primary/15",
    trend: "8 cirurgias na semana",
    trendUp: true,
  },
  {
    label: "Confirmações Pendentes",
    value: "4",
    sub: "aguardando resposta",
    icon: AlertCircle,
    color: "text-amber-500",
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
    trend: "-2 vs ontem",
    trendUp: false,
  },
  {
    label: "Tempo Médio",
    value: "4,2min",
    sub: "de resposta",
    icon: Clock,
    color: "text-teal-500",
    bg: "bg-teal-500/10 dark:bg-teal-500/15",
    trend: "-0,8min vs ontem",
    trendUp: true,
  },
];

const followUpData = [
  { name: "Enviados", value: 38, color: "#3b82f6" },
  { name: "Convertidos", value: 24, color: "#10b981" },
  { name: "Perdidos (5 dias)", value: 5, color: "#ef4444" },
];

const fidelizacaoData = [
  { name: "Retornos", value: 43, color: "#3b82f6" },
  { name: "Indicações", value: 18, color: "#8b5cf6" },
  { name: "Sem retorno", value: 6, color: "#6b7280" },
];

const followUpChartData = followUpData.map((d) => ({ ...d, fill: d.color }));
const followUpChartConfig = {
  value: { label: "Follow-Up" },
  Enviados: { label: "Enviados", color: "#3b82f6" },
  Convertidos: { label: "Convertidos", color: "#10b981" },
  "Perdidos (5 dias)": { label: "Perdidos (5 dias)", color: "#ef4444" },
} satisfies ChartConfig;

const fidelizacaoChartData = fidelizacaoData.map((d) => ({ ...d, fill: d.color }));
const fidelizacaoChartConfig = {
  value: { label: "Fidelização" },
  Retornos: { label: "Retornos", color: "#3b82f6" },
  Indicações: { label: "Indicações", color: "#8b5cf6" },
  "Sem retorno": { label: "Sem retorno", color: "#6b7280" },
} satisfies ChartConfig;

const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: "0.5rem",
  fontSize: "12px",
  color: "var(--color-foreground)",
};

const weeklyScheduleChartConfig = {
  consultas: { label: "Consultas", color: "#0891b2" },
  cirurgias: { label: "Cirurgias", color: "#6366f1" },
  exames: { label: "Exames", color: "#38bdf8" },
} satisfies ChartConfig;

const serviceChartData = serviceDistributionData.map((d) => ({ ...d, fill: d.color }));
const serviceChartConfig = {
  value: { label: "%" },
  "Pré-natal": { label: "Pré-natal", color: "#0891b2" },
  Ginecologia: { label: "Ginecologia", color: "#1d4ed8" },
  Ultrassonografia: { label: "Ultrassonografia", color: "#6366f1" },
  Cirurgias: { label: "Cirurgias", color: "#38bdf8" },
  "Clínica Geral": { label: "Clínica Geral", color: "#60a5fa" },
} satisfies ChartConfig;

type Period = "dia" | "semanal" | "mensal";

function PeriodLabel({
  period,
  date,
  month,
  week,
}: {
  period: Period;
  date: string;
  month: string;
  week: string;
}) {
  if (period === "dia") {
    const d = new Date(date + "T00:00:00");
    return (
      <>
        {d.toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </>
    );
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
  const [date, setDate] = useState("2024-04-16");
  const [month, setMonth] = useState("2024-04");
  const [week, setWeek] = useState("2024-W16");
  const [patientView, setPatientView] = useState<"stats" | "chart">("stats");
  const [scheduleView, setScheduleView] = useState<"bar" | "line">("bar");

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
                  <ArrowUpRight
                    className={cn(
                      "h-3 w-3",
                      card.trendUp ? "text-emerald-500" : "text-amber-500 rotate-90",
                    )}
                  />
                  <span
                    className={
                      card.trendUp
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-amber-600 dark:text-amber-400"
                    }
                  >
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
                <XAxis
                  dataKey="hour"
                  tick={{ fontSize: 9, fill: "oklch(0.5 0.04 248)" }}
                  tickLine={false}
                  interval={3}
                />
                <YAxis tick={{ fontSize: 9, fill: "oklch(0.5 0.04 248)" }} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="messages"
                  name="Mensagens"
                  stroke="oklch(0.510 0.220 262)"
                  strokeWidth={2}
                  fill="url(#colorMessages)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[14px] font-bold text-foreground">Pacientes da Semana</h3>
                <p className="text-[11px] text-muted-foreground">Movimentação de pacientes</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPatientView(patientView === "stats" ? "chart" : "stats")}
                  className="p-1.5 rounded-lg border border-border hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                  title={patientView === "stats" ? "Ver por dia da semana" : "Ver resumo"}
                >
                  {patientView === "stats" ? <BarChart2 className="h-3.5 w-3.5" /> : <LayoutGrid className="h-3.5 w-3.5" />}
                </button>
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
            </div>
            {patientView === "stats" ? (
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Novos", value: 12, sub: "primeiro contato", color: "text-primary", dot: "bg-primary" },
                  { label: "Recorrentes", value: 8, sub: "retornaram à clínica", color: "text-indigo-600 dark:text-indigo-400", dot: "bg-indigo-500" },
                  { label: "Agendados", value: 24, sub: "consultas marcadas", color: "text-blue-600 dark:text-blue-400", dot: "bg-blue-500" },
                  { label: "Follow UP", value: 7, sub: "em acompanhamento", color: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border bg-background/60 p-3">
                    <span className={cn("inline-block h-2 w-2 rounded-full mb-2", s.dot)} />
                    <p className={cn("text-2xl font-bold leading-none", s.color)}>{s.value}</p>
                    <p className="text-[12px] font-semibold text-foreground mt-1">{s.label}</p>
                    <p className="text-[10px] text-muted-foreground">{s.sub}</p>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <ChartContainer config={weeklyPatientsChartConfig} className="h-[150px] w-full">
                  <BarChart accessibilityLayer data={weeklyPatientsData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                    <Bar dataKey="novos" fill="var(--color-novos)" radius={4} />
                    <Bar dataKey="recorrentes" fill="var(--color-recorrentes)" radius={4} />
                    <Bar dataKey="agendados" fill="var(--color-agendados)" radius={4} />
                    <Bar dataKey="followup" fill="var(--color-followup)" radius={4} />
                  </BarChart>
                </ChartContainer>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                  {[
                    { key: "novos", label: "Novos", color: "oklch(0.510 0.220 193)" },
                    { key: "recorrentes", label: "Recorrentes", color: "#6366f1" },
                    { key: "agendados", label: "Agendados", color: "#3b82f6" },
                    { key: "followup", label: "Follow UP", color: "#f59e0b" },
                  ].map((l) => (
                    <div key={l.key} className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full flex-none" style={{ backgroundColor: l.color }} />
                      <span className="text-[10px] text-muted-foreground">{l.label}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom row: agenda semanal maior + distribuição de serviços */}
        <div className="grid grid-cols-3 items-stretch gap-4">
          {/* Agendamentos da Semana — larger */}
          <div className="col-span-2 rounded-2xl border border-border bg-card px-5 py-2">
            <div className="mb-1.5 flex items-center justify-between">
              <div>
                <h3 className="text-[14px] font-bold text-foreground">Agendamentos da Semana</h3>
                <p className="text-[11px] text-muted-foreground">Consultas, cirurgias e exames por dia</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setScheduleView(scheduleView === "bar" ? "line" : "bar")}
                  className="p-1.5 rounded-lg border border-border hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                  title={scheduleView === "bar" ? "Ver como linhas" : "Ver como barras"}
                >
                  {scheduleView === "bar" ? (
                    <LineChartIcon className="h-3.5 w-3.5" />
                  ) : (
                    <BarChart2 className="h-3.5 w-3.5" />
                  )}
                </button>
                <CalendarDays className="h-4 w-4 text-primary" />
              </div>
            </div>
            <ChartContainer config={weeklyScheduleChartConfig} className="h-[180px] w-full">
              {scheduleView === "bar" ? (
                <BarChart accessibilityLayer data={weeklySchedule}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tick={(props) => {
                      const { x, y, payload } = props;
                      const dayLabel = String(payload.value);
                      const found = weeklySchedule.find((item) => item.day === dayLabel);
                      const total = found ? found.consultas + found.cirurgias + found.exames : "";
                      return (
                        <text x={x} y={y + 12} textAnchor="middle" fill="currentColor" className="text-[12px]">
                          <tspan>{dayLabel} </tspan>
                          <tspan fontWeight="bold">{total}</tspan>
                        </text>
                      );
                    }}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                  <Bar dataKey="consultas" fill="var(--color-consultas)" radius={4} />
                  <Bar dataKey="cirurgias" fill="var(--color-cirurgias)" radius={4} />
                  <Bar dataKey="exames" fill="var(--color-exames)" radius={4} />
                </BarChart>
              ) : (
                <RechartLineChart data={weeklySchedule}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tick={(props) => {
                      const { x, y, payload } = props;
                      const dayLabel = String(payload.value);
                      const found = weeklySchedule.find((item) => item.day === dayLabel);
                      const total = found ? found.consultas + found.cirurgias + found.exames : "";
                      return (
                        <text x={x} y={y + 12} textAnchor="middle" fill="currentColor" className="text-[12px]">
                          <tspan>{dayLabel} </tspan>
                          <tspan fontWeight="bold">{total}</tspan>
                        </text>
                      );
                    }}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Line type="monotone" dataKey="consultas" stroke="var(--color-consultas)" strokeWidth={2} dot={{ r: 3, fill: "var(--color-consultas)" }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="cirurgias" stroke="var(--color-cirurgias)" strokeWidth={2} dot={{ r: 3, fill: "var(--color-cirurgias)" }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="exames" stroke="var(--color-exames)" strokeWidth={2} dot={{ r: 3, fill: "var(--color-exames)" }} activeDot={{ r: 5 }} />
                </RechartLineChart>
              )}
            </ChartContainer>
          </div>

          {/* Distribuição de Serviços */}
          <div className="rounded-2xl border border-border bg-card px-5 py-2">
            <div className="mb-1.5 flex items-center justify-between">
              <div>
                <h3 className="text-[14px] font-bold text-foreground">Distribuição de Serviços</h3>
                <p className="text-[11px] text-muted-foreground">Interesse dos pacientes</p>
              </div>
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <ChartContainer config={serviceChartConfig} className="mx-auto aspect-square max-h-[160px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={serviceChartData} dataKey="value" nameKey="name" innerRadius={42} />
              </PieChart>
            </ChartContainer>
            <div className="mt-0.5 space-y-0.5">
              {serviceChartData.map((d) => (
                <div key={d.name} className="grid grid-cols-[1fr_auto] items-center gap-x-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full flex-none" style={{ backgroundColor: d.color }} />
                    <span className="text-[11px] text-foreground whitespace-nowrap">{d.name}</span>
                  </div>
                  <span className="w-8 text-right text-[11px] font-semibold text-foreground whitespace-nowrap">
                    {d.value}%
                  </span>
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
                <p className="text-[11px] text-muted-foreground">
                  {followUpTotal} programados no período
                </p>
              </div>
              <div className="rounded-lg bg-emerald-500/10 px-2.5 py-1">
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {Math.round((followUpData[1].value / followUpData[0].value) * 100)}% conversão
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-none">
                <ChartContainer config={followUpChartConfig} className="h-[140px] w-[140px]">
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={followUpChartData} dataKey="value" nameKey="name" innerRadius={38} />
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="flex-1 space-y-2.5">
                {followUpData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full flex-none"
                        style={{ backgroundColor: d.color }}
                      />
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
                <p className="text-[11px] text-muted-foreground">
                  {fidelizacaoTotal} clientes fidelizados
                </p>
              </div>
              <div className="rounded-lg bg-pink-500/10 px-2.5 py-1">
                <span className="text-[11px] font-semibold text-pink-600 dark:text-pink-400">
                  {Math.round(
                    ((fidelizacaoData[0].value + fidelizacaoData[1].value) / fidelizacaoTotal) *
                      100,
                  )}
                  % retorno
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-none">
                <ChartContainer config={fidelizacaoChartConfig} className="h-[140px] w-[140px]">
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={fidelizacaoChartData} dataKey="value" nameKey="name" innerRadius={38} />
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="flex-1 space-y-2.5">
                {fidelizacaoData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full flex-none"
                        style={{ backgroundColor: d.color }}
                      />
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
            {
              label: "Taxa de Confirmação",
              value: "81%",
              icon: CheckCircle,
              color: "text-emerald-500",
            },
            { label: "Pacientes do Mês", value: "284", icon: Users, color: "text-blue-500" },
            { label: "Ticket Médio", value: "R$ 380", icon: TrendingUp, color: "text-primary" },
            { label: "Tempo Médio Geral", value: "4,8min", icon: Clock, color: "text-amber-500" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3"
            >
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
