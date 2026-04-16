import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Save, AlertCircle, Info } from "lucide-react";
import { attendants } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/horarios")({
  component: HorariosPage,
});

const DAYS = [
  { key: "seg", label: "Seg", full: "Segunda-feira" },
  { key: "ter", label: "Ter", full: "Terça-feira" },
  { key: "qua", label: "Qua", full: "Quarta-feira" },
  { key: "qui", label: "Qui", full: "Quinta-feira" },
  { key: "sex", label: "Sex", full: "Sexta-feira" },
  { key: "sab", label: "Sáb", full: "Sábado" },
  { key: "dom", label: "Dom", full: "Domingo" },
];

type DaySchedule = {
  enabled: boolean;
  start: string;
  end: string;
};

type AttendantSchedule = {
  attendantId: string;
  days: Record<string, DaySchedule>;
};

function defaultSchedule(): Record<string, DaySchedule> {
  return {
    seg: { enabled: true, start: "08:00", end: "18:00" },
    ter: { enabled: true, start: "08:00", end: "18:00" },
    qua: { enabled: true, start: "08:00", end: "18:00" },
    qui: { enabled: true, start: "08:00", end: "18:00" },
    sex: { enabled: true, start: "08:00", end: "17:00" },
    sab: { enabled: false, start: "09:00", end: "13:00" },
    dom: { enabled: false, start: "09:00", end: "13:00" },
  };
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-4.5 w-8 flex-none cursor-pointer items-center rounded-full transition-colors",
        checked ? "bg-primary" : "bg-muted",
      )}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-4" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

function AttendantRow({ att, schedule, onChange }: {
  att: typeof attendants[0];
  schedule: AttendantSchedule;
  onChange: (s: AttendantSchedule) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  function updateDay(dayKey: string, update: Partial<DaySchedule>) {
    onChange({
      ...schedule,
      days: {
        ...schedule.days,
        [dayKey]: { ...schedule.days[dayKey], ...update },
      },
    });
  }

  const enabledDays = DAYS.filter(d => schedule.days[d.key].enabled);
  const disabledDays = DAYS.filter(d => !schedule.days[d.key].enabled);

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 px-4 py-3.5 hover:bg-accent/30 transition-colors"
      >
        <div
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-[11px] font-bold text-white"
          style={{ backgroundColor: att.color }}
        >
          {att.initials}
        </div>
        <div className="flex-1 text-left">
          <p className="text-[13px] font-semibold text-foreground">{att.name}</p>
          <p className="text-[11px] text-muted-foreground">{att.department}</p>
        </div>
        <div className="flex items-center gap-2">
          {enabledDays.map(d => (
            <span
              key={d.key}
              className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary"
            >
              {d.label}
            </span>
          ))}
          {disabledDays.length > 0 && (
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              +{disabledDays.length} inativos
            </span>
          )}
          <span className={cn(
            "rounded-full px-2.5 py-0.5 text-[10px] font-medium ml-1",
            att.status === "online" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
            att.status === "busy" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
            att.status === "offline" && "bg-muted text-muted-foreground",
          )}>
            {att.status === "online" ? "Online" : att.status === "busy" ? "Ocupado" : "Offline"}
          </span>
          <svg
            className={cn("h-4 w-4 text-muted-foreground transition-transform", expanded && "rotate-180")}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Schedule grid */}
      {expanded && (
        <div className="border-t border-border px-4 py-4">
          <div className="grid grid-cols-7 gap-2">
            {DAYS.map(day => {
              const daySchedule = schedule.days[day.key];
              return (
                <div key={day.key} className="flex flex-col gap-1.5">
                  <div className="flex flex-col items-center gap-1">
                    <span className={cn(
                      "text-[11px] font-semibold",
                      daySchedule.enabled ? "text-foreground" : "text-muted-foreground",
                    )}>
                      {day.label}
                    </span>
                    <Toggle
                      checked={daySchedule.enabled}
                      onChange={(v) => updateDay(day.key, { enabled: v })}
                    />
                  </div>
                  <div className={cn(
                    "flex flex-col gap-1 transition-opacity",
                    !daySchedule.enabled && "opacity-40 pointer-events-none",
                  )}>
                    <div>
                      <label className="text-[9px] font-medium text-muted-foreground">Entrada</label>
                      <input
                        type="time"
                        value={daySchedule.start}
                        onChange={e => updateDay(day.key, { start: e.target.value })}
                        className="mt-0.5 w-full rounded-lg border border-border bg-background px-1.5 py-1.5 text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 transition"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-medium text-muted-foreground">Saída</label>
                      <input
                        type="time"
                        value={daySchedule.end}
                        onChange={e => updateDay(day.key, { end: e.target.value })}
                        className="mt-0.5 w-full rounded-lg border border-border bg-background px-1.5 py-1.5 text-[11px] text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 transition"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick actions */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-muted-foreground">Aplicar modelo:</span>
            {[
              { label: "Seg–Sex 8h–18h", action: () => {
                DAYS.forEach(d => {
                  const isWeekend = d.key === "sab" || d.key === "dom";
                  updateDay(d.key, {
                    enabled: !isWeekend,
                    start: "08:00",
                    end: "18:00",
                  });
                });
              }},
              { label: "Seg–Sáb 8h–17h", action: () => {
                DAYS.forEach(d => {
                  const isSunday = d.key === "dom";
                  updateDay(d.key, {
                    enabled: !isSunday,
                    start: "08:00",
                    end: isSunday ? "13:00" : d.key === "sab" ? "13:00" : "17:00",
                  });
                });
              }},
              { label: "Todos os dias", action: () => {
                DAYS.forEach(d => updateDay(d.key, { enabled: true, start: "09:00", end: "18:00" }));
              }},
            ].map(preset => (
              <button
                key={preset.label}
                onClick={preset.action}
                className="rounded-lg border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function HorariosPage() {
  const [schedules, setSchedules] = useState<AttendantSchedule[]>(
    attendants.map(att => ({
      attendantId: att.id,
      days: defaultSchedule(),
    }))
  );

  const [companyHours] = useState({
    start: "08:00",
    end: "18:30",
    enabledDays: ["seg", "ter", "qua", "qui", "sex"],
  });

  function updateSchedule(idx: number, schedule: AttendantSchedule) {
    setSchedules(prev => prev.map((s, i) => i === idx ? schedule : s));
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Horários</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Defina dias e horários de acesso de cada atendente ao CRM
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-5 space-y-5 max-w-4xl">

        {/* Info banner */}
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200/60 bg-amber-50/80 dark:border-amber-800/40 dark:bg-amber-950/20 px-4 py-3.5">
          <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-none mt-0.5" />
          <p className="text-[12px] text-amber-700 dark:text-amber-300">
            Os atendentes só poderão acessar o CRM nos dias e horários definidos aqui. Fora do horário,
            o acesso será bloqueado e novos leads serão redirecionados para os atendentes disponíveis.
          </p>
        </div>

        {/* Company hours */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-primary" />
            <h2 className="text-[14px] font-bold text-foreground">Horário de Funcionamento da Empresa</h2>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div className="flex flex-wrap gap-2">
              {DAYS.map(d => {
                const active = companyHours.enabledDays.includes(d.key);
                return (
                  <button
                    key={d.key}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/70",
                    )}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-4">
              <div>
                <label className="text-[12px] font-medium text-muted-foreground">Abertura</label>
                <input
                  type="time"
                  defaultValue="08:00"
                  className="mt-1 block rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                />
              </div>
              <div className="text-muted-foreground mt-5">→</div>
              <div>
                <label className="text-[12px] font-medium text-muted-foreground">Fechamento</label>
                <input
                  type="time"
                  defaultValue="18:30"
                  className="mt-1 block rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                />
              </div>
              <div className="flex-1" />
              <div>
                <label className="text-[12px] font-medium text-muted-foreground">Mensagem fora do horário</label>
                <input
                  defaultValue="Olá! Nosso atendimento é de seg–sex, 8h às 18h30. Retornaremos em breve! 😊"
                  className="mt-1 block w-80 rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Attendant schedules */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-[14px] font-bold text-foreground">Horários por Atendente</h2>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                {attendants.length} atendentes
              </span>
            </div>
            <button className="text-[12px] text-primary hover:underline transition-colors">
              Aplicar horário padrão a todos
            </button>
          </div>

          <div className="space-y-2">
            {attendants.map((att, idx) => (
              <AttendantRow
                key={att.id}
                att={att}
                schedule={schedules[idx]}
                onChange={(s) => updateSchedule(idx, s)}
              />
            ))}
          </div>
        </section>

        {/* Save */}
        <div className="flex justify-end pb-4">
          <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
            <Save className="h-4 w-4" />
            Salvar horários
          </button>
        </div>
      </div>
    </div>
  );
}
