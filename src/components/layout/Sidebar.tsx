import { Link, useLocation } from "@tanstack/react-router";
import {
  MessageSquare,
  LayoutDashboard,
  Users,
  UserCheck,
  Tag,
  Zap,
  Settings,
  Sun,
  Moon,
  ChevronRight,
  Building2,
} from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { AccountSwitcherDialog } from "./AccountSwitcherDialog";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/atendimentos", icon: MessageSquare, label: "Atendimentos", badge: 4 },
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/contatos", icon: Users, label: "Contatos" },
  { to: "/atendentes", icon: UserCheck, label: "Atendentes" },
  { to: "/tags", icon: Tag, label: "Tags" },
  { to: "/mensagens-rapidas", icon: Zap, label: "Msgs Rápidas" },
  { to: "/configuracoes", icon: Settings, label: "Configurações" },
];

export function Sidebar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { currentAccount } = useAuth();
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <>
      <aside className="flex h-screen w-[220px] flex-none flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-sidebar-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-primary/40">
            <Building2 className="h-4.5 w-4.5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-white leading-tight">Estrutural</p>
            <p className="truncate text-[10px] text-sidebar-foreground/50 leading-tight">
              Vidros • CRM
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/35">
            Menu
          </p>
          {navItems.map(({ to, icon: Icon, label, badge }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-sidebar-primary/20 text-white ring-1 ring-sidebar-primary/30"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 flex-none transition-colors",
                    isActive ? "text-sidebar-primary" : "text-sidebar-foreground/50 group-hover:text-white",
                  )}
                />
                <span className="flex-1 truncate">{label}</span>
                {badge ? (
                  <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-white">
                    {badge}
                  </span>
                ) : isActive ? (
                  <ChevronRight className="h-3 w-3 text-sidebar-primary/70" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: theme toggle + account */}
        <div className="border-t border-sidebar-border px-3 py-3 space-y-1">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white transition-all duration-150"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-sidebar-foreground/50" />
            ) : (
              <Moon className="h-4 w-4 text-sidebar-foreground/50" />
            )}
            <span>{theme === "dark" ? "Tema Claro" : "Tema Escuro"}</span>
          </button>

          {/* Account switcher */}
          <button
            onClick={() => setAccountOpen(true)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-150 hover:bg-sidebar-accent group"
          >
            <div
              className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-[11px] font-bold text-white ring-2 ring-white/20"
              style={{ backgroundColor: currentAccount.color }}
            >
              {currentAccount.initials}
            </div>
            <div className="min-w-0 text-left flex-1">
              <p className="truncate text-[12px] font-semibold text-white leading-tight">
                {currentAccount.name}
              </p>
              <p className="truncate text-[10px] text-sidebar-foreground/50 leading-tight capitalize">
                {currentAccount.role}
              </p>
            </div>
            <ChevronRight className="h-3 w-3 text-sidebar-foreground/30 group-hover:text-white transition-colors" />
          </button>
        </div>
      </aside>

      <AccountSwitcherDialog open={accountOpen} onOpenChange={setAccountOpen} />
    </>
  );
}
