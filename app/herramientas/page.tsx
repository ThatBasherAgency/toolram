import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, TOOLS } from "@/lib/tools-registry";
import { ToolCard } from "@/components/tools/tool-card";

export const metadata: Metadata = {
  title: "Todas las herramientas",
  description: "Listado completo de todas las herramientas online gratis en Toolram. PDF, SEO, IA, símbolos, conversores y más.",
  alternates: { canonical: "/herramientas" }
};

export default function AllToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Todas las herramientas</h1>
      <p className="text-lg text-[color:var(--color-fg-soft)] mb-8">{TOOLS.length} herramientas listas para usar.</p>
      {Object.entries(CATEGORIES).map(([key, cat]) => {
        const tools = TOOLS.filter((t) => t.category === key);
        if (tools.length === 0) return null;
        return (
          <section key={key} className="mb-10">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-xl font-bold">{cat.emoji} {cat.name}</h2>
              <Link href={`/categoria/${cat.slug}`} className="text-sm text-[color:var(--color-brand)] hover:underline">Ver todas →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {tools.map((t) => <ToolCard key={t.slug} tool={t} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}
