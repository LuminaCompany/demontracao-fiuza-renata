import { createFileRoute } from "@tanstack/react-router";
import { quickMessages } from "@/data/mock";
import { Zap, Plus, Copy, Pencil, Trash2, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/mensagens-rapidas")({
  component: MensagensRapidasPage,
});

const categories = ["Todas", "Abertura", "Orçamento", "Instalação", "Suporte", "Financeiro", "Encerramento"];

const categoryColor: Record<string, string> = {
  Abertura: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Orçamento: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  Instalação: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Suporte: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Financeiro: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  Encerramento: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
};

function MensagensRapidasPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered =
    selectedCategory === "Todas"
      ? quickMessages
      : quickMessages.filter((m) => m.category === selectedCategory);

  function handleCopy(id: string, content: string) {
    navigator.clipboard.writeText(content).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Mensagens Rápidas</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Templates prontos para agilizar atendimentos
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
            <Plus className="h-4 w-4" />
            Nova Mensagem
          </button>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-none rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((msg) => (
            <div
              key={msg.id}
              className="group rounded-2xl border border-border bg-card p-5 hover:shadow-md hover:border-primary/20 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-foreground">{msg.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryColor[msg.category] ?? "bg-muted text-muted-foreground"}`}>
                      {msg.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <p className="mt-3 text-[13px] text-foreground leading-relaxed line-clamp-3">
                {msg.content}
              </p>

              <button
                onClick={() => handleCopy(msg.id, msg.content)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2 text-[12px] font-medium text-muted-foreground hover:bg-accent hover:text-foreground hover:border-primary/30 transition-all"
              >
                {copiedId === msg.id ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copiar mensagem
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
