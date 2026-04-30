import { createContext, useContext, useState, type ReactNode } from "react";
import type { Lead } from "@/data/mock";

interface DemoCrmCtxType {
  waLeads: Lead[];
  addWaLead: (lead: Lead) => void;
}

const DemoCrmCtx = createContext<DemoCrmCtxType>({ waLeads: [], addWaLead: () => {} });

export function DemoCrmProvider({ children }: { children: ReactNode }) {
  const [waLeads, setWaLeads] = useState<Lead[]>([]);
  return (
    <DemoCrmCtx.Provider
      value={{ waLeads, addWaLead: (l) => setWaLeads((prev) => [l, ...prev]) }}
    >
      {children}
    </DemoCrmCtx.Provider>
  );
}

export const useDemoCrm = () => useContext(DemoCrmCtx);
