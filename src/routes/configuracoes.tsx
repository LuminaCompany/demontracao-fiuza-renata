import { createFileRoute } from "@tanstack/react-router";
import { Settings, Bell, Shield, Palette, Building2, Save, User, Lock } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/configuracoes")({
  component: ConfiguracoesPage,
});

function Toggle({ defaultChecked }: { defaultChecked: boolean }) {
  return (
    <label className="relative flex-none inline-flex h-5 w-9 cursor-pointer items-center">
      <input type="checkbox" defaultChecked={defaultChecked} className="peer sr-only" />
      <span className="absolute inset-0 rounded-full bg-muted transition-colors peer-checked:bg-primary" />
      <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
    </label>
  );
}

function ConfiguracoesPage() {
  const { theme, toggleTheme } = useTheme();
  const { currentAccount } = useAuth();
  const isGestor = currentAccount.role === "gestor";

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40">
        <h1 className="text-xl font-bold text-foreground">Configurações</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {isGestor ? "Gerencie as preferências do sistema e da empresa" : "Gerencie suas preferências de conta"}
        </p>
      </div>

      <div className="flex-1 overflow-auto px-6 py-5 max-w-3xl space-y-6">

        {/* Empresa — gestores only */}
        {isGestor && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-4 w-4 text-primary" />
              <h2 className="text-[14px] font-bold text-foreground">Empresa</h2>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-medium text-muted-foreground">Nome da empresa</label>
                  <input
                    defaultValue="Fiuza"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium text-muted-foreground">Telefone</label>
                  <input
                    defaultValue="(61) 3344-5566"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[12px] font-medium text-muted-foreground">E-mail</label>
                  <input
                    defaultValue="contato@estruturalvidros.com.br"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[12px] font-medium text-muted-foreground">Endereço</label>
                  <input
                    defaultValue="Setor Industrial, Brasília - DF"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Minha Conta — atendentes */}
        {!isGestor && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <User className="h-4 w-4 text-primary" />
              <h2 className="text-[14px] font-bold text-foreground">Minha Conta</h2>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-medium text-muted-foreground">Nome</label>
                  <input
                    defaultValue={currentAccount.name}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium text-muted-foreground">E-mail</label>
                  <input
                    defaultValue={currentAccount.email}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium text-muted-foreground">Telefone</label>
                  <input
                    placeholder="(61) 9 0000-0000"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Aparência */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Palette className="h-4 w-4 text-primary" />
            <h2 className="text-[14px] font-bold text-foreground">Aparência</h2>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-foreground">Tema</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  Alterne entre tema claro e escuro
                </p>
              </div>
              <div className="flex rounded-xl border border-border overflow-hidden">
                {(["light", "dark"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => { if (theme !== t) toggleTheme(); }}
                    className={cn(
                      "px-4 py-2 text-[12px] font-medium transition-colors",
                      theme === t
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {t === "light" ? "☀️ Claro" : "🌙 Escuro"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Notificações */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Bell className="h-4 w-4 text-primary" />
            <h2 className="text-[14px] font-bold text-foreground">Notificações</h2>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            {[
              { title: "Novo lead", desc: "Notificar quando um novo cliente entrar em contato.", enabled: true },
              { title: "Mensagem não respondida", desc: "Alertar após 30 minutos sem resposta.", enabled: true },
              { title: "Atendimento transferido", desc: "Notificar quando um atendimento for transferido para você.", enabled: false },
              ...(isGestor ? [
                { title: "Atendente offline", desc: "Alertar quando um atendente ficar indisponível durante o horário de trabalho.", enabled: false },
              ] : []),
            ].map((item) => (
              <div key={item.title} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[13px] font-medium text-foreground">{item.title}</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <Toggle defaultChecked={item.enabled} />
              </div>
            ))}
          </div>
        </section>

        {/* Segurança da conta */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Lock className="h-4 w-4 text-primary" />
            <h2 className="text-[14px] font-bold text-foreground">Segurança</h2>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div>
              <label className="text-[12px] font-medium text-muted-foreground">Senha atual</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[12px] font-medium text-muted-foreground">Nova senha</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                />
              </div>
              <div>
                <label className="text-[12px] font-medium text-muted-foreground">Confirmar senha</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="mt-1.5 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Permissões — gestores only */}
        {isGestor && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-primary" />
              <h2 className="text-[14px] font-bold text-foreground">Acesso e Permissões</h2>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
                <p className="text-[13px] font-medium text-primary">Conta Gestor Ativa</p>
                <p className="text-[12px] text-muted-foreground mt-1">
                  Você tem acesso completo ao sistema, incluindo Automação IA, Horários, Atendentes e configurações da empresa.
                </p>
              </div>
              <div className="space-y-3 pt-1">
                {[
                  { title: "Atendentes podem ver Dashboard", desc: "Permite que atendentes visualizem métricas gerais.", enabled: false },
                  { title: "Atendentes podem exportar contatos", desc: "Permite exportar a lista de contatos para CSV.", enabled: false },
                  { title: "Atendentes podem transferir atendimentos", desc: "Permite que atendentes transfiram leads entre si.", enabled: true },
                ].map((item) => (
                  <div key={item.title} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[13px] font-medium text-foreground">{item.title}</p>
                      <p className="text-[12px] text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle defaultChecked={item.enabled} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Save button */}
        <div className="flex justify-end pb-4">
          <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
            <Save className="h-4 w-4" />
            Salvar configurações
          </button>
        </div>
      </div>
    </div>
  );
}
