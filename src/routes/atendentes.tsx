import { createFileRoute } from "@tanstack/react-router";
import {
  MessageSquare,
  Clock,
  Stethoscope,
  Shield,
  UserCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/atendentes")({
  component: AtendentesPage,
});

const statusConfig = {
  online: {
    label: "Online",
    dot: "bg-cyan-500",
    badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  },
  busy: {
    label: "Ocupado",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  offline: {
    label: "Offline",
    dot: "bg-muted-foreground",
    badge: "bg-muted text-muted-foreground",
  },
};

const recepcionistas = [
  {
    id: "r1",
    name: "Ana Lima",
    initials: "AL",
    role: "Recepcionista",
    status: "online" as const,
    email: "ana@clinicabemestar.com.br",
    phone: "44 9 8801-2233",
    activeCount: 14,
    avgResponseTime: 3.2,
    color: "#0891b2",
    hasLogin: true,
  },
  {
    id: "r2",
    name: "Marcos Costa",
    initials: "MC",
    role: "Recepcionista",
    status: "online" as const,
    email: "marcos@clinicabemestar.com.br",
    phone: "44 9 9745-6677",
    activeCount: 8,
    avgResponseTime: 4.8,
    color: "#1d4ed8",
    hasLogin: true,
  },
];

const medicos = [
  {
    id: "m1",
    name: "Dra. Renata Fiuza",
    initials: "RF",
    specialty: "Obstetrícia & Pré-natal",
    status: "online" as const,
    color: "#0891b2",
  },
  {
    id: "m2",
    name: "Dr. Carlos Mendes",
    initials: "CM",
    specialty: "Ginecologia",
    status: "online" as const,
    color: "#1d4ed8",
  },
  {
    id: "m3",
    name: "Dra. Patricia Lima",
    initials: "PL",
    specialty: "Ultrassonografia",
    status: "busy" as const,
    color: "#6366f1",
  },
  {
    id: "m4",
    name: "Dr. Roberto Alves",
    initials: "RA",
    specialty: "Clínica Geral",
    status: "offline" as const,
    color: "#38bdf8",
  },
];

const gestores = [
  {
    id: "g1",
    name: "Dra. Renata Fiuza",
    initials: "RF",
    role: "Diretora Clínica",
    status: "online" as const,
    email: "renata@clinicabemestar.com.br",
    phone: "44 9 9900-0001",
    color: "#0891b2",
    hasLogin: true,
  },
];

function StatusDot({ status }: { status: "online" | "busy" | "offline" }) {
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full flex-none",
        statusConfig[status].dot,
      )}
    />
  );
}

function AtendentesPage() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Equipe</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {recepcionistas.length} recepcionistas · {medicos.length} médicos · {gestores.length} gestor
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-5 space-y-6">

        {/* Gestores */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-3.5 w-3.5 text-primary" />
            </div>
            <h2 className="text-[13px] font-bold text-foreground">Gestor</h2>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
              {gestores.length}
            </span>
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {gestores.map((g, i) => (
              <div
                key={g.id}
                className={cn(
                  "flex items-center gap-4 px-5 py-4",
                  i > 0 && "border-t border-border",
                )}
              >
                <div
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm"
                  style={{ backgroundColor: g.color }}
                >
                  {g.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-semibold text-foreground">{g.name}</p>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      Gestor
                    </span>
                  </div>
                  <p className="text-[12px] text-muted-foreground">{g.role}</p>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1">
                  <p className="text-[11px] text-muted-foreground">{g.email}</p>
                  <p className="text-[11px] text-muted-foreground">{g.phone}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <StatusDot status={g.status} />
                  <span className="text-[11px] text-muted-foreground">{statusConfig[g.status].label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Médicos */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10">
              <Stethoscope className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-[13px] font-bold text-foreground">Médicos</h2>
            <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              {medicos.length}
            </span>
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {medicos.map((m, i) => (
              <div
                key={m.id}
                className={cn(
                  "flex items-center gap-4 px-5 py-4",
                  i > 0 && "border-t border-border",
                )}
              >
                <div
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm"
                  style={{ backgroundColor: m.color }}
                >
                  {m.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-foreground">{m.name}</p>
                  <p className="text-[12px] text-muted-foreground">{m.specialty}</p>
                </div>
                <span className="hidden sm:inline-flex rounded-full bg-muted px-2.5 py-0.5 text-[11px] text-muted-foreground">
                  Sem acesso ao sistema
                </span>
                <div className="flex items-center gap-1.5">
                  <StatusDot status={m.status} />
                  <span className="text-[11px] text-muted-foreground">{statusConfig[m.status].label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recepcionistas */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10">
              <UserCircle2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-[13px] font-bold text-foreground">Recepcionistas</h2>
            <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
              {recepcionistas.length}
            </span>
          </div>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {recepcionistas.map((r, i) => (
              <div
                key={r.id}
                className={cn(
                  "flex items-center gap-4 px-5 py-4",
                  i > 0 && "border-t border-border",
                )}
              >
                <div
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm"
                  style={{ backgroundColor: r.color }}
                >
                  {r.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-semibold text-foreground">{r.name}</p>
                  </div>
                  <p className="text-[12px] text-muted-foreground">{r.role}</p>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <MessageSquare className="h-3 w-3" />
                    {r.activeCount} ativos
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {r.avgResponseTime}min médio
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <StatusDot status={r.status} />
                  <span className="text-[11px] text-muted-foreground">{statusConfig[r.status].label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-2" />
      </div>
    </div>
  );
}
