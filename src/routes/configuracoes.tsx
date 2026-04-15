import { createFileRoute } from "@tanstack/react-router";
import { Settings, Bell, Shield, Palette, Bot, Building2, Save } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/configuracoes")({
  component: ConfiguracoesPage,
});

function ConfiguracoesPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40">
        <h1 className="text-xl font-bold text-foreground">Configurações</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Gerencie as preferências do sistema
        </p>
      </div>

      <div className="flex-1 overflow-auto px-6 py-5 max-w-3xl space-y-6">
        {/* Empresa */}
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
                  defaultValue="Estrutural Vidros"
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
            </div>
          </div>
        </section>

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

        {/* IA */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Bot className="h-4 w-4 text-primary" />
            <h2 className="text-[14px] font-bold text-foreground">Automação IA</h2>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            {[
              {
                title: "Triagem automática de leads",
                desc: "A IA pergunta ao cliente qual atendente deseja ser atendido na primeira mensagem.",
                enabled: true,
              },
              {
                title: "Resumo automático ao finalizar",
                desc: "Ao encerrar um atendimento, a IA gera um resumo completo do histórico de conversa.",
                enabled: true,
              },
              {
                title: "Sugestão de resposta",
                desc: "A IA sugere respostas com base no contexto da conversa.",
                enabled: false,
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[13px] font-medium text-foreground">{item.title}</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <label className="relative flex-none inline-flex h-5 w-9 cursor-pointer items-center">
                  <input type="checkbox" defaultChecked={item.enabled} className="peer sr-only" />
                  <span className="absolute inset-0 rounded-full bg-muted transition-colors peer-checked:bg-primary" />
                  <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
                </label>
              </div>
            ))}
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
            ].map((item) => (
              <div key={item.title} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[13px] font-medium text-foreground">{item.title}</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <label className="relative flex-none inline-flex h-5 w-9 cursor-pointer items-center">
                  <input type="checkbox" defaultChecked={item.enabled} className="peer sr-only" />
                  <span className="absolute inset-0 rounded-full bg-muted transition-colors peer-checked:bg-primary" />
                  <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Permissões */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-4 w-4 text-primary" />
            <h2 className="text-[14px] font-bold text-foreground">Acesso e Permissões</h2>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
              <p className="text-[13px] font-medium text-primary">Conta Gestor Ativa</p>
              <p className="text-[12px] text-muted-foreground mt-1">
                Você tem acesso completo ao sistema. O login de atendente com acesso restrito
                será habilitado em breve.
              </p>
            </div>
          </div>
        </section>

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
