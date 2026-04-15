import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth";
import { Check, ShieldCheck, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccountSwitcherDialog({ open, onOpenChange }: Props) {
  const { currentAccount, setCurrentAccount, allAccounts } = useAuth();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base">Trocar de Conta</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Selecione uma conta para continuar. (Demo — sem senha)
          </p>
        </DialogHeader>

        <div className="space-y-2 pt-1">
          {allAccounts.map((account) => {
            const isActive = account.id === currentAccount.id;
            return (
              <button
                key={account.id}
                onClick={() => {
                  setCurrentAccount(account);
                  onOpenChange(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3.5 rounded-xl border px-4 py-3 text-left transition-all duration-150 hover:border-primary/40 hover:bg-accent",
                  isActive ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20" : "border-border",
                )}
              >
                <div
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-full text-sm font-bold text-white ring-2 ring-white/30 shadow"
                  style={{ backgroundColor: account.color }}
                >
                  {account.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{account.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {account.role === "gestor" ? (
                      <ShieldCheck className="h-3 w-3 text-primary" />
                    ) : (
                      <Headphones className="h-3 w-3 text-muted-foreground" />
                    )}
                    <span className="text-xs text-muted-foreground capitalize">{account.role}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground truncate">{account.email}</span>
                  </div>
                </div>
                {isActive && <Check className="h-4 w-4 flex-none text-primary" />}
              </button>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-muted-foreground pt-1">
          Estrutural Vidros CRM — Demonstração
        </p>
      </DialogContent>
    </Dialog>
  );
}
