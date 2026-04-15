import { createFileRoute } from "@tanstack/react-router";
import { tags, leads } from "@/data/mock";
import { Tag as TagIcon, Plus, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tags")({
  component: TagsPage,
});

const tagColorMap: Record<string, { bg: string; text: string; dot: string }> = {
  blue: { bg: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-700 dark:text-blue-300", dot: "bg-blue-500" },
  cyan: { bg: "bg-cyan-100 dark:bg-cyan-900/40", text: "text-cyan-700 dark:text-cyan-300", dot: "bg-cyan-500" },
  red: { bg: "bg-red-100 dark:bg-red-900/40", text: "text-red-700 dark:text-red-300", dot: "bg-red-500" },
  amber: { bg: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
  green: { bg: "bg-green-100 dark:bg-green-900/40", text: "text-green-700 dark:text-green-300", dot: "bg-green-500" },
  orange: { bg: "bg-orange-100 dark:bg-orange-900/40", text: "text-orange-700 dark:text-orange-300", dot: "bg-orange-500" },
  violet: { bg: "bg-violet-100 dark:bg-violet-900/40", text: "text-violet-700 dark:text-violet-300", dot: "bg-violet-500" },
  pink: { bg: "bg-pink-100 dark:bg-pink-900/40", text: "text-pink-700 dark:text-pink-300", dot: "bg-pink-500" },
  teal: { bg: "bg-teal-100 dark:bg-teal-900/40", text: "text-teal-700 dark:text-teal-300", dot: "bg-teal-500" },
  yellow: { bg: "bg-yellow-100 dark:bg-yellow-900/40", text: "text-yellow-700 dark:text-yellow-300", dot: "bg-yellow-500" },
};

function TagsPage() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border bg-card/40">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Tags</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Gerencie as etiquetas para organizar seus leads
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
            <Plus className="h-4 w-4" />
            Nova Tag
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-6 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          {tags.map((tag) => {
            const cfg = tagColorMap[tag.color];
            const count = leads.filter((l) => l.tagIds.includes(tag.id)).length;
            return (
              <div
                key={tag.id}
                className="group rounded-2xl border border-border bg-card p-5 hover:shadow-md hover:border-primary/20 transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", cfg.bg)}>
                    <TagIcon className={cn("h-5 w-5", cfg.text)} />
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

                <div className="mt-3">
                  <h3 className="text-[14px] font-bold text-foreground">{tag.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={cn("h-2 w-2 rounded-full", cfg.dot)} />
                    <span className="text-[12px] text-muted-foreground">
                      {count} lead{count !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                {/* Mini usage bar */}
                <div className="mt-3">
                  <div className="h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", cfg.dot)}
                      style={{ width: `${Math.min((count / leads.length) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {((count / leads.length) * 100).toFixed(0)}% dos leads
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
