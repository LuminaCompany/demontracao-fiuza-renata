import { useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { leads, type Lead, STAGE_LABELS } from "@/data/mock";
import { X, MapPin, ArrowRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Region definitions (5 interactive bairros) ─────────────────────
interface MapRegion {
  id: string;
  name: string;
  points: string;
  color: string;
  labelX: number;
  labelY: number;
}

// Shared border sequences (adjacent regions use same points, reversed)
// B|C  border: (205,0)→(192,55)→(218,108)→(202,162)→(222,215)→(208,265)→(225,308)
// C|S  border: (387,0)→(403,52)→(381,106)→(396,160)→(377,214)→(392,268)→(370,308)
// S|T  border: (580,300)→(530,306)→(495,298)→(450,310)→(410,298)→(370,308)
// SC|T border: (370,308)→(358,355)→(374,398)→(362,440)
// Batel bottom = SantaCruz top-left: (225,308)→(175,308)→(130,318)→(85,308)→(42,322)→(0,310)
// Centro bottom = SantaCruz top-ctr: (370,308)→(340,316)→(315,306)→(270,318)→(225,308)
const MAP_REGIONS: MapRegion[] = [
  {
    id: "batel",
    name: "Batel",
    points:
      "0,0 205,0 192,55 218,108 202,162 222,215 208,265 225,308 175,308 130,318 85,308 42,322 0,310",
    color: "#00ff88",
    labelX: 100,
    labelY: 165,
  },
  {
    id: "centro",
    name: "Centro",
    points:
      "205,0 387,0 403,52 381,106 396,160 377,214 392,268 370,308 340,316 315,306 270,318 225,308 208,265 222,215 202,162 218,108 192,55",
    color: "#00e5ff",
    labelX: 292,
    labelY: 158,
  },
  {
    id: "santana",
    name: "Santana",
    points:
      "387,0 580,0 580,300 530,306 495,298 450,310 410,298 370,308 392,268 377,214 396,160 381,106 403,52",
    color: "#d400ff",
    labelX: 483,
    labelY: 148,
  },
  {
    id: "santacruz",
    name: "Santa Cruz",
    points:
      "0,310 42,322 85,308 130,318 175,308 225,308 270,318 315,306 340,316 370,308 358,355 374,398 362,440 0,440",
    color: "#ff1a88",
    labelX: 182,
    labelY: 375,
  },
  {
    id: "trianon",
    name: "Trianon",
    points: "370,308 410,298 450,310 495,298 530,306 580,300 580,440 362,440 374,398 358,355",
    color: "#ff8800",
    labelX: 472,
    labelY: 375,
  },
];

const REGION_LABELS: Record<string, string> = {
  centro: "Centro",
  santana: "Santana",
  batel: "Batel",
  trianon: "Trianon",
  santacruz: "Santa Cruz",
};

const STATUS_META: Record<string, { label: string; dot: string }> = {
  ativo: { label: "Ativo", dot: "bg-emerald-400" },
  pendente: { label: "Pendente", dot: "bg-amber-400" },
  potencial: { label: "Potencial", dot: "bg-sky-400" },
  finalizado: { label: "Finalizado", dot: "bg-slate-400" },
};

export function GuarapuavaMap() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const totalLeads = leads.length;

  const regionLeadsMap = useMemo(() => {
    const map = new Map<string, Lead[]>();
    for (const lead of leads) {
      const arr = map.get(lead.region) ?? [];
      arr.push(lead);
      map.set(lead.region, arr);
    }
    return map;
  }, []);

  const regionLeads = useCallback((id: string) => regionLeadsMap.get(id) ?? [], [regionLeadsMap]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    const x = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * -5;
    const y = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 5;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHoveredRegion(null);
  }, []);

  const selectedLeads = selectedRegion ? regionLeads(selectedRegion) : [];
  const selectedMeta = MAP_REGIONS.find((r) => r.id === selectedRegion);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[14px] font-bold text-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4 text-cyan-400" />
            Distribuição Geográfica — Guarapuava, PR
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Clique em um bairro para ver os leads da região
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-cyan-500/10 px-2.5 py-1">
          <Users className="h-3 w-3 text-cyan-400" />
          <span className="text-[11px] font-semibold text-cyan-400">{totalLeads} leads total</span>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* ── 3D map ─────────────────────────────────────────────── */}
        <div
          ref={containerRef}
          className="flex-none select-none"
          style={{ perspective: "900px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition:
                tilt.x === 0 && tilt.y === 0
                  ? "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)"
                  : "transform 0.07s linear",
              transformStyle: "preserve-3d",
            }}
          >
            <svg
              viewBox="0 0 580 440"
              width={520}
              height={394}
              style={{
                background:
                  "radial-gradient(ellipse at 60% 45%, #07112a 0%, #020917 60%, #010610 100%)",
                borderRadius: 14,
                boxShadow:
                  "0 0 50px rgba(0,180,255,0.12), 0 0 120px rgba(0,100,255,0.06), inset 0 0 80px rgba(0,0,0,0.5)",
              }}
            >
              <defs>
                {MAP_REGIONS.map((r) => (
                  <filter
                    key={r.id}
                    id={`gmap-glow-${r.id}`}
                    x="-30%"
                    y="-30%"
                    width="160%"
                    height="160%"
                  >
                    <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor={r.color} floodOpacity="1" />
                    <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor={r.color} floodOpacity="0.55" />
                  </filter>
                ))}
                <filter id="gmap-text-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#fff" floodOpacity="0.9" />
                </filter>
              </defs>

              {/* ── Interactive neighborhood polygons ─────────────── */}
              {MAP_REGIONS.map((region) => {
                const rLeads = regionLeads(region.id);
                const pct = totalLeads > 0 ? Math.round((rLeads.length / totalLeads) * 100) : 0;
                const isHovered = hoveredRegion === region.id;
                const isSelected = selectedRegion === region.id;
                const isActive = isHovered || isSelected;

                return (
                  <g key={region.id}>
                    <polygon
                      points={region.points}
                      fill={
                        isSelected
                          ? `${region.color}50`
                          : isHovered
                            ? `${region.color}30`
                            : `${region.color}16`
                      }
                      stroke={region.color}
                      strokeWidth={isActive ? 2 : 1}
                      filter={isActive ? `url(#gmap-glow-${region.id})` : undefined}
                      style={{
                        cursor: "pointer",
                        transition: "fill 0.18s, stroke-width 0.12s",
                      }}
                      onMouseEnter={() => setHoveredRegion(region.id)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      onClick={() =>
                        setSelectedRegion((prev) => (prev === region.id ? null : region.id))
                      }
                    />

                    {/* Region name */}
                    <text
                      x={region.labelX}
                      y={region.labelY - 10}
                      textAnchor="middle"
                      fill={region.color}
                      fontSize="8.5"
                      fontWeight="800"
                      fontFamily="monospace"
                      letterSpacing="1"
                      filter={isActive ? "url(#gmap-text-glow)" : undefined}
                      style={{ pointerEvents: "none" }}
                    >
                      {region.name.toUpperCase()}
                    </text>

                    {/* Percentage */}
                    <text
                      x={region.labelX}
                      y={region.labelY + 6}
                      textAnchor="middle"
                      fill={isActive ? "#fff" : region.color}
                      fontSize="15"
                      fontWeight="900"
                      fontFamily="monospace"
                      filter={isActive ? "url(#gmap-text-glow)" : undefined}
                      style={{ pointerEvents: "none" }}
                    >
                      {pct}%
                    </text>

                    {/* Lead count */}
                    <text
                      x={region.labelX}
                      y={region.labelY + 19}
                      textAnchor="middle"
                      fill={`${region.color}bb`}
                      fontSize="8"
                      fontFamily="monospace"
                      style={{ pointerEvents: "none" }}
                    >
                      {rLeads.length} lead{rLeads.length !== 1 ? "s" : ""}
                    </text>
                  </g>
                );
              })}

            </svg>
          </div>
        </div>

        {/* ── Leads panel ────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 min-h-[380px]">
          {selectedRegion && selectedMeta ? (
            <div className="flex flex-col h-full">
              {/* Panel header */}
              <div
                className="flex items-center justify-between mb-3 pb-3 border-b"
                style={{ borderColor: `${selectedMeta.color}40` }}
              >
                <div>
                  <p
                    className="text-[14px] font-bold"
                    style={{
                      color: selectedMeta.color,
                      textShadow: `0 0 12px ${selectedMeta.color}80`,
                    }}
                  >
                    {selectedMeta.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {selectedLeads.length} lead{selectedLeads.length !== 1 ? "s" : ""} ·{" "}
                    {Math.round((selectedLeads.length / totalLeads) * 100)}% do total
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRegion(null)}
                  className="rounded-full p-1.5 hover:bg-muted transition-colors"
                >
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </div>

              {selectedLeads.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 text-center gap-2 py-10">
                  <MapPin className="h-10 w-10 text-muted-foreground/30" />
                  <p className="text-[12px] text-muted-foreground">Nenhum lead nesta região</p>
                </div>
              ) : (
                <div className="space-y-2 overflow-y-auto max-h-[320px] pr-0.5">
                  {selectedLeads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      regionColor={selectedMeta.color}
                      onClick={() => navigate({ to: "/atendimentos", search: { leadId: lead.id } })}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Legend when nothing is selected
            <div className="flex flex-col gap-2 pt-1">
              <p className="text-[11px] text-muted-foreground mb-1">Bairros monitorados</p>
              {MAP_REGIONS.map((r) => {
                const count = regionLeads(r.id).length;
                const pct = Math.round((count / totalLeads) * 100);
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRegion(r.id)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted group"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full flex-none"
                      style={{
                        backgroundColor: r.color,
                        boxShadow: `0 0 6px ${r.color}`,
                      }}
                    />
                    <span className="text-[12px] text-foreground flex-1">{r.name}</span>
                    <span className="text-[12px] font-bold" style={{ color: r.color }}>
                      {pct}%
                    </span>
                    <span className="text-[10px] text-muted-foreground w-12 text-right">
                      {count} lead{count !== 1 ? "s" : ""}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
                  </button>
                );
              })}
              <p className="text-[10px] text-muted-foreground mt-2 text-center">
                Clique em um bairro no mapa ou na lista
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LeadCard({
  lead,
  regionColor,
  onClick,
}: {
  lead: Lead;
  regionColor: string;
  onClick: () => void;
}) {
  const status = STATUS_META[lead.status] ?? { label: lead.status, dot: "bg-slate-400" };
  const initials = lead.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl border p-3 flex items-start gap-3 group transition-all"
      style={{
        borderColor: `${regionColor}28`,
        background: `linear-gradient(135deg, ${regionColor}08 0%, transparent 100%)`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.borderColor = `${regionColor}65`;
        el.style.boxShadow = `0 0 14px ${regionColor}1a`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLButtonElement;
        el.style.borderColor = `${regionColor}28`;
        el.style.boxShadow = "";
      }}
    >
      <div
        className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-[11px] font-bold text-white"
        style={{
          backgroundColor: `${regionColor}cc`,
          boxShadow: `0 0 8px ${regionColor}70`,
        }}
      >
        {initials}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[12px] font-semibold text-foreground truncate">{lead.name}</p>
          <div className="flex items-center gap-1 flex-none">
            <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
            <span className="text-[10px] text-muted-foreground">{status.label}</span>
          </div>
        </div>
        {lead.stage && (
          <p className="text-[10px] text-muted-foreground truncate leading-snug">
            {STAGE_LABELS[lead.stage]}
          </p>
        )}
        <p className="text-[10px] text-muted-foreground/70 truncate mt-0.5 italic">
          &ldquo;{lead.lastMessage}&rdquo;
        </p>
      </div>

      <ArrowRight className="h-3.5 w-3.5 flex-none text-muted-foreground/35 group-hover:text-foreground/60 transition-colors mt-1" />
    </button>
  );
}

export { REGION_LABELS };
