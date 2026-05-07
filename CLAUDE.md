# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.
**Always update this file** when project structure, objectives, brand, or data changes.

---

## Project Overview

**Demo CRM — Clínica Bem Estar**
A sales demo built by Lumina to showcase an AI-powered WhatsApp CRM for medical clinics.
The target client is a clinic owner evaluating the product. The demo must look polished, realistic, and branded to their clinic.

**Current brand:** Clínica Bem Estar (ciano / azul gelo palette)
**Previous brand:** Clínica Renata Fiuza (deprecated — never use this name)

### Purpose
- Show a clinic owner what their day-to-day CRM would look like
- Demonstrate AI WhatsApp automation (the "Mari" assistant)
- All data is fictional/vitrine — never real patient data

---

## Commands

```bash
bun run dev         # Start dev server (Vite + TanStack Start SSR)
bun run build       # Production build
bun run build:dev   # Development build
bun run lint        # ESLint
bun run format      # Prettier (auto-fix)
```

No tests configured.

---

## Architecture

**Vite SPA** (React client-side) deployed to **Vercel** via `vercel.json`.

### Routing

File-based via `@tanstack/react-router`. Routes in `src/routes/`.
**Never edit `src/routeTree.gen.ts`** — auto-generated on every save.

Current routes:
| Route | File | Description |
|-------|------|-------------|
| `/` | `index.tsx` | Redirects → `/atendimentos` |
| `/atendimentos` | `atendimentos.tsx` | Main CRM chat view (3-column) |
| `/dashboard` | `dashboard.tsx` | KPIs, charts, weekly schedule |
| `/agenda` | `agenda.tsx` | Appointment scheduling view |
| `/contatos` | `contatos.tsx` | Patient list ("Pacientes" tab) |
| `/atendentes` | `atendentes.tsx` | Team management |
| `/automacao-ia` | `automacao-ia.tsx` | AI automation settings |
| `/tags` | `tags.tsx` | Tag management |
| `/mensagens-rapidas` | `mensagens-rapidas.tsx` | Quick messages library |
| `/horarios` | `horarios.tsx` | Business hours |
| `/configuracoes` | `configuracoes.tsx` | Settings |
| `/whatsapp` | `whatsapp.tsx` | Interactive WhatsApp IA demo |

### Styling

**TailwindCSS v4** — tokens in `src/styles.css` as CSS custom properties (oklch format).
Dark mode via `.dark` class (`@custom-variant dark (&:is(.dark *))`).

**Theme: Clínica Bem Estar — Ciano / Azul Gelo**
- `--primary`: `oklch(0.50 0.22 193)` (ciano)
- Sidebar: always dark regardless of theme
- Never use purple gradients or generic AI aesthetics

### UI Components

**shadcn/ui** (New York style) in `src/components/ui/`. Use `cn()` from `@/lib/utils`.
Icons: **lucide-react**.

### Path Aliases

`@/*` → `src/*`

### Vite Config

Standard Vite with plugins: `@tanstack/router-plugin/vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `vite-tsconfig-paths`. Entry: `index.html` → `src/main.tsx`.

---

## Key Files

| File | Purpose |
|------|---------|
| `src/data/mock.ts` | All mock data: leads, attendants, accounts, tags, charts |
| `src/lib/auth.tsx` | Account switcher context (gestor/atendente roles) |
| `src/lib/demo-crm.tsx` | Context for WhatsApp-generated leads (runtime state) |
| `src/lib/theme.tsx` | Dark/light theme toggle |
| `src/components/layout/Sidebar.tsx` | Left nav — add new routes here |
| `src/components/layout/AppLayout.tsx` | Root layout wrapper |

---

## Data Model (`src/data/mock.ts`)

### Accounts (login switcher) — 3 total
| ID | Name | Role |
|----|------|------|
| acc1 | Dra. Renata Fiuza | gestor |
| acc3 | Ana Lima | atendente |
| acc5 | Marcos Costa | atendente |

### Lead statuses → UI labels
| `status` field | Label in UI | Color |
|----------------|-------------|-------|
| `ativo` | Em Atendimento | emerald |
| `pendente` | Follow UP | amber |
| `potencial` | Agendado | blue |
| `finalizado` | Finalizado | muted |

This mapping is used in BOTH `atendimentos.tsx` (statusConfig) and `contatos.tsx` (statusLabel/statusBadge). Keep them in sync.

### Leads rules
- All leads must have a response (last message never from "client" unanswered)
- Majority `attendedBy: "ia"` — human attendants are rare (VIP/complex cases only)
- Vitrine leads (l13–l17) all have `status: "potencial"` and AI responses
- `attendantId` references: a1 (Ana Lima), a3 (Marcos Costa), a5 (Dra. Renata)

### Exported data
- `leads` — patient records (l1–l17)
- `attendants` — full team (for display only, not all have login accounts)
- `accounts` — login accounts (3 total)
- `tags` — tag definitions
- `quickMessages` — quick reply templates
- `peakHoursData` — hourly message volume
- `weeklyLeadsData` — new vs finalized per day
- `monthlyRevenueData` — monthly revenue chart
- `serviceDistributionData` — service type distribution (pie chart)

---

## WhatsApp Demo (`/whatsapp`)

Interactive simulation of the "Mari" AI assistant.

### Flow
1. Chat starts **empty** — client must send first message
2. Any first message → AI greets: "Olá! Bem-vindo(a) à *Clínica Bem Estar*..."
3. If scheduling intent → ask name → ask doctor (buttons) → ask insurance (text) → ask day (buttons) → **immediately confirm** (no extra confirm step)
4. After day selection → booking created, lead added to CRM with `status: "potencial"`

### Rules
- Quick reply buttons only for: **doctor selection** and **day selection**
- No buttons for: initial intent, insurance, confirmation
- All colors are **WhatsApp green** (`#075e54` header/send, `#25d366` client bubble)
- AI avatar: `#075e54`, initials "M"
- Header: "Clínica Bem Estar", initials "CB"

---

## Dashboard (`/dashboard`)

Bottom row: "Agendamentos da Semana" (col-span-2 bar chart) + "Distribuição de Serviços" (pie chart).
Receita Mensal was removed — replaced by agenda charts.

## Agenda (`/agenda`)

Standalone appointment management view with:
- 4 KPI cards (consultas hoje, total semana, médicos, ocupação)
- Bar chart by day (with day selector filter)
- Appointment type donut chart
- Doctor schedule horizontal bar chart
- Upcoming appointments list (filterable by selected day)

---

## Brand Rules

- Clinic name: **Clínica Bem Estar** everywhere (never "Renata Fiuza")
- Emails: `@clinicabemestar.com.br`
- AI assistant name: **Mari**
- Colors: ciano primary, azul gelo backgrounds

---

## Sidebar Nav Order (gestor)
1. Atendimentos
2. Dashboard
3. Agenda ← new
4. Pacientes
5. Equipe
6. Automação
7. Tags
8. Msgs Rápidas
9. Horários
10. Configurações
11. WhatsApp IA (bottom, highlighted green)
