import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useDemoCrm } from "@/lib/demo-crm";
import {
  BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  CalendarDays, Clock, Users, Activity,
  Stethoscope, Scissors, FileSearch,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/agenda")({
  component: AgendaPage,
});

// ── Data ──────────────────────────────────────────────────────────
const weeklySchedule = [
  { day: "Seg", consultas: 8, cirurgias: 1, exames: 4 },
  { day: "Ter", consultas: 11, cirurgias: 2, exames: 6 },
  { day: "Qua", consultas: 9, cirurgias: 0, exames: 5 },
  { day: "Qui", consultas: 14, cirurgias: 3, exames: 7 },
  { day: "Sex", consultas: 7, cirurgias: 1, exames: 3 },
];

const appointmentTypeData = [
  { name: "Consultas", value: 49, color: "#0891b2" },
  { name: "Exames", value: 25, color: "#38bdf8" },
  { name: "Cirurgias", value: 7, color: "#6366f1" },
  { name: "Retornos", value: 14, color: "#f59e0b" },
];

const doctorScheduleData = [
  { name: "Dra. Renata", consultas: 22, cirurgias: 5, exames: 0, retornos: 8 },
  { name: "Dr. Carlos", consultas: 15, cirurgias: 2, exames: 0, retornos: 5 },
  { name: "Dra. Patricia", consultas: 0, cirurgias: 0, exames: 18, retornos: 3 },
  { name: "Dr. Roberto", consultas: 12, cirurgias: 0, exames: 0, retornos: 4 },
];

type AppointmentType = "consulta" | "retorno" | "cirurgia" | "exame";

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  time: string;
  day: string;
  type: AppointmentType;
  insurance: string;
  status: "confirmado" | "pendente" | "realizado";
}

const appointments: Appointment[] = [
  { id: "a1", patient: "Beatriz Lima Ferreira", doctor: "Dra. Renata Fiuza", time: "10:00", day: "Hoje", type: "consulta", insurance: "Bradesco Saúde", status: "realizado" },
  { id: "a2", patient: "Isabela Martins Campos", doctor: "Dra. Renata Fiuza", time: "09:00", day: "Segunda", type: "consulta", insurance: "Bradesco Saúde", status: "confirmado" },
  { id: "a3", patient: "Gabriela Torres Alves", doctor: "Dra. Renata Fiuza", time: "09:00", day: "Segunda", type: "consulta", insurance: "Unimed", status: "confirmado" },
  { id: "a4", patient: "Camila Rodrigues Oliveira", doctor: "Dr. Carlos Mendes", time: "10:00", day: "Terça", type: "consulta", insurance: "Amil", status: "confirmado" },
  { id: "a5", patient: "Larissa Menezes Costa", doctor: "Dr. Carlos Mendes", time: "14:00", day: "Terça", type: "consulta", insurance: "Amil", status: "confirmado" },
  { id: "a6", patient: "Rafaela Souza Lima", doctor: "Dra. Patricia Lima", time: "11:00", day: "Quarta", type: "exame", insurance: "Particular", status: "pendente" },
  { id: "a7", patient: "Patricia Moreira Dias", doctor: "Dra. Patricia Lima", time: "15:30", day: "Quinta", type: "exame", insurance: "Porto Seguro", status: "confirmado" },
  { id: "a8", patient: "Monique Pereira Neves", doctor: "Dra. Renata Fiuza", time: "10:00", day: "Quinta", type: "consulta", insurance: "Bradesco Saúde", status: "confirmado" },
  { id: "a9", patient: "Juliana Costa Rodrigues", doctor: "Dra. Renata Fiuza", time: "14:00", day: "Sexta", type: "consulta", insurance: "Unimed", status: "confirmado" },
  { id: "a10", patient: "Thaís Oliveira Rocha", doctor: "Dr. Roberto Alves", time: "09:00", day: "Sexta", type: "consulta", insurance: "SulAmérica", status: "pendente" },
  { id: "a11", patient: "Sandra Pereira Gomes", doctor: "Dra. Renata Fiuza", time: "09:00", day: "Dia 28", type: "retorno", insurance: "SulAmérica", status: "confirmado" },
  { id: "a12", patient: "Fernanda Oliveira Costa", doctor: "Dra. Renata Fiuza", time: "07:00", day: "Dia 15", type: "cirurgia", insurance: "Unimed", status: "confirmado" },
  { id: "a13", patient: "Ana Paula Mendes", doctor: "Dra. Renata Fiuza", time: "08:00", day: "Dia 20", type: "cirurgia", insurance: "Amil", status: "confirmado" },
];

const typeConfig: Record<AppointmentType, { label: string; icon: typeof Stethoscope; color: string; bg: string }> = {
  consulta: { label: "Consulta", icon: Stethoscope, color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-100 dark:bg-cyan-900/30" },
  retorno: { label: "Retorno", icon: Activity, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" },
  cirurgia: { label: "Cirurgia", icon: Scissors, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-900/30" },
  exame: { label: "Exame", icon: FileSearch, color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-100 dark:bg-teal-900/30" },
};

const statusBadge: Record<string, string> = {
  confirmado: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  pendente: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  realizado: "bg-muted text-muted-foreground",
};

const typeChartData = appointmentTypeData.map((d) => ({ ...d, fill: d.color }));
const typeChartConfig = {
  value: { label: "Atendimentos" },
  Consultas: { label: "Consultas", color: "#0891b2" },
  Exames: { label: "Exames", color: "#38bdf8" },
  Cirurgias: { label: "Cirurgias", color: "#6366f1" },
  Retornos: { label: "Retornos", color: "#f59e0b" },
} satisfies ChartConfig;

const doctorChartConfig = {
  consultas: { label: "Consultas", color: "#0891b2" },
  exames: { label: "Exames", color: "#38bdf8" },
  retornos: { label: "Retornos", color: "#f59e0b" },
  cirurgias: { label: "Cirurgias", color: "#6366f1" },
} satisfies ChartConfig;

const WEEK_COLS = [
  { label: "Seg", days: ["Hoje", "Segunda"] },
  { label: "Ter", days: ["Terça"] },
  { label: "Qua", days: ["Quarta"] },
  { label: "Qui", days: ["Quinta"] },
  { label: "Sex", days: ["Sexta"] },
];

const doctorFilters = [
  { label: "Todos", value: null as string | null },
  { label: "Dra. Renata", value: "Dra. Renata Fiuza" },
  { label: "Dr. Carlos", value: "Dr. Carlos Mendes" },
  { label: "Dra. Patricia", value: "Dra. Patricia Lima" },
  { label: "Dr. Roberto", value: "Dr. Roberto Alves" },
];

function AgendaPage() {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const { waLeads } = useDemoCrm();

  const waAppointments: Appointment[] = waLeads.map((lead) => ({
    id: lead.id,
    patient: lead.name,
    doctor: lead.doctor || "A confirmar",
    time: "A confirmar",
    day: lead.appointmentDate || "A confirmar",
    type: "consulta" as AppointmentType,
    insurance: lead.healthInsurance || "Particular",
    status: "pendente" as const,
  }));

  const allAppointments = [...appointments, ...waAppointments];

  const totalWeek = weeklySchedule.reduce((s, d) => s + d.consultas + d.cirurgias + d.exames, 0);
  const totalTypeSum = appointmentTypeData.reduce((s, d) => s + d.value, 0);

  const waIds = new Set(waAppointments.map((w) => w.id));
  const displayedAppointments = selectedDoctor
    ? allAppointments.filter((a) => a.doctor === selectedDoctor)
    : allAppointments.filter((a) => ["Hoje", "Segunda", "Terça", "Quarta"].includes(a.day) || waIds.has(a.id));

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40 flex-none">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">Agenda</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Gestão de agendamentos da semana</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground font-medium">Semana atual</span>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-5 space-y-5">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Consultas Hoje", value: "7", sub: "3 confirmadas", icon: Stethoscope, color: "text-cyan-500", bg: "bg-cyan-500/10" },
            { label: "Total na Semana", value: String(totalWeek), sub: "consultas + exames + cirurgias", icon: CalendarDays, color: "text-primary", bg: "bg-primary/10" },
            { label: "Médicos Disponíveis", value: "4", sub: "em atendimento", icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { label: "Taxa de Ocupação", value: "78%", sub: "da capacidade semanal", icon: Activity, color: "text-violet-500", bg: "bg-violet-500/10" },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl border border-border bg-card p-4">
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl mb-3", card.bg)}>
                <card.icon className={cn("h-4.5 w-4.5", card.color)} />
              </div>
              <p className="text-2xl font-bold text-foreground leading-none">{card.value}</p>
              <p className="mt-1 text-[11px] font-medium text-foreground/80">{card.label}</p>
              <p className="text-[10px] text-muted-foreground">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Weekly calendar card */}
          <div className="col-span-2 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-[14px] font-bold text-foreground">Agendamentos da Semana</h3>
                <p className="text-[11px] text-muted-foreground">Visão semanal por médico</p>
              </div>
              <CalendarDays className="h-4 w-4 text-primary" />
            </div>

            {/* Doctor filter */}
            <div className="flex gap-1.5 mb-4 flex-wrap">
              {doctorFilters.map((f) => (
                <button
                  key={f.label}
                  onClick={() => setSelectedDoctor(f.value)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors",
                    selectedDoctor === f.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Weekly grid */}
            <TooltipProvider delayDuration={150}>
              <div className="grid grid-cols-5 gap-2">
                {WEEK_COLS.map((col) => {
                  const dayApts = allAppointments.filter(
                    (a) =>
                      col.days.includes(a.day) &&
                      (!selectedDoctor || a.doctor === selectedDoctor),
                  );
                  return (
                    <div key={col.label} className="flex flex-col min-h-[140px]">
                      <div className="text-center text-[11px] font-bold text-foreground/70 mb-2 pb-1.5 border-b border-border">
                        {col.label}
                      </div>
                      <div className="flex flex-col gap-1.5 flex-1">
                        {dayApts.length === 0 ? (
                          <div className="flex-1 rounded-xl border border-dashed border-border/40 flex items-center justify-center min-h-[40px]">
                            <span className="text-[9px] text-muted-foreground/40">—</span>
                          </div>
                        ) : (
                          dayApts.map((apt) => {
                            const tc = typeConfig[apt.type];
                            const TypeIcon = tc.icon;
                            const firstName = apt.patient.split(" ")[0];
                            return (
                              <Tooltip key={apt.id}>
                                <TooltipTrigger asChild>
                                  <div
                                    className={cn(
                                      "rounded-lg px-2 py-1.5 cursor-default border border-transparent transition-all hover:scale-[1.03] hover:shadow-md",
                                      tc.bg,
                                    )}
                                  >
                                    <p className={cn("text-[10px] font-bold leading-tight truncate", tc.color)}>
                                      {firstName}
                                    </p>
                                    <p className="text-[9px] text-muted-foreground mt-0.5 font-medium">
                                      {apt.time}
                                    </p>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="top"
                                  align="center"
                                  className="p-0 overflow-hidden shadow-xl"
                                >
                                  <div className={cn("px-3 pt-2.5 pb-2 border-b border-border/50", tc.bg)}>
                                    <p className={cn("font-bold text-[12px] leading-tight", tc.color)}>
                                      {apt.patient}
                                    </p>
                                    <div className={cn("flex items-center gap-1 mt-0.5 text-[10px] font-semibold", tc.color)}>
                                      <TypeIcon className="h-2.5 w-2.5 flex-none" />
                                      <span>{tc.label}</span>
                                    </div>
                                  </div>
                                  <div className="px-3 py-2.5 bg-card min-w-[190px] space-y-1.5">
                                    <div className="flex items-center gap-1.5 text-[11px] text-foreground">
                                      <Clock className="h-3 w-3 flex-none text-muted-foreground" />
                                      <span>{apt.time} · {col.label}-feira</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[11px] text-foreground">
                                      <Stethoscope className="h-3 w-3 flex-none text-muted-foreground" />
                                      <span>{apt.doctor}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[11px] text-foreground">
                                      <Users className="h-3 w-3 flex-none text-muted-foreground" />
                                      <span>{apt.insurance}</span>
                                    </div>
                                    <span
                                      className={cn(
                                        "inline-flex mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                                        statusBadge[apt.status],
                                      )}
                                    >
                                      {apt.status}
                                    </span>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TooltipProvider>
          </div>

          {/* Type distribution */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-[14px] font-bold text-foreground mb-1">Tipos de Atendimento</h3>
            <p className="text-[11px] text-muted-foreground mb-3">Distribuição semanal</p>
            <ChartContainer config={typeChartConfig} className="mx-auto aspect-square max-h-[140px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={typeChartData} dataKey="value" nameKey="name" innerRadius={38} />
              </PieChart>
            </ChartContainer>
            <div className="space-y-2 mt-1">
              {appointmentTypeData.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full flex-none" style={{ backgroundColor: d.color }} />
                    <span className="text-[11px] text-foreground">{d.name}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-foreground">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Doctor schedule */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[14px] font-bold text-foreground">Agenda por Médico</h3>
              <p className="text-[11px] text-muted-foreground">Distribuição de atendimentos na semana</p>
            </div>
          </div>
          <ChartContainer config={doctorChartConfig} className="h-[220px] w-full">
            <BarChart
              accessibilityLayer
              data={doctorScheduleData}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              barGap={2}
              barCategoryGap="35%"
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: string) => v.split(" ").slice(0, 2).join(" ")}
                tick={{ fontSize: 11 }}
              />
              <YAxis hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="consultas" fill="var(--color-consultas)" radius={[4, 4, 0, 0]} barSize={14} />
              <Bar dataKey="exames" fill="var(--color-exames)" radius={[4, 4, 0, 0]} barSize={14} />
              <Bar dataKey="retornos" fill="var(--color-retornos)" radius={[4, 4, 0, 0]} barSize={14} />
              <Bar dataKey="cirurgias" fill="var(--color-cirurgias)" radius={[4, 4, 0, 0]} barSize={14} />
            </BarChart>
          </ChartContainer>
          <div className="flex items-center gap-5 mt-3 flex-wrap">
            {[
              { label: "Consultas", color: "#0891b2" },
              { label: "Exames", color: "#38bdf8" },
              { label: "Retornos", color: "#f59e0b" },
              { label: "Cirurgias", color: "#6366f1" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm flex-none" style={{ backgroundColor: item.color }} />
                <span className="text-[11px] text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming appointments list */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[14px] font-bold text-foreground">
                {selectedDoctor
                  ? `Agendamentos — ${selectedDoctor.split(" ").slice(0, 2).join(" ")}`
                  : "Próximos Agendamentos"}
              </h3>
              <p className="text-[11px] text-muted-foreground">
                {selectedDoctor ? "Filtrado por médico selecionado" : "Hoje, segunda e terça-feira"}
              </p>
            </div>
            {selectedDoctor && (
              <button
                onClick={() => setSelectedDoctor(null)}
                className="text-[11px] text-primary hover:underline"
              >
                Ver todos
              </button>
            )}
          </div>
          <div className="space-y-2">
            {displayedAppointments.map((apt) => {
              const tc = typeConfig[apt.type];
              const TypeIcon = tc.icon;
              return (
                <div
                  key={apt.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3 hover:bg-accent/30 transition-colors"
                >
                  <div className={cn("flex h-8 w-8 flex-none items-center justify-center rounded-lg", tc.bg)}>
                    <TypeIcon className={cn("h-3.5 w-3.5", tc.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-foreground truncate">{apt.patient}</span>
                      <span className={cn("flex-none rounded-full px-2 py-0.5 text-[10px] font-medium", statusBadge[apt.status])}>
                        {apt.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{apt.doctor} · {apt.insurance}</p>
                  </div>
                  <div className="flex-none text-right">
                    <div className="flex items-center gap-1 text-[12px] font-bold text-foreground">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {apt.time}
                    </div>
                    <p className="text-[10px] text-muted-foreground">{apt.day}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="h-2" />
      </div>
    </div>
  );
}
