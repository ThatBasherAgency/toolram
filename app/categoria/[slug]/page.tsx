import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { CATEGORIES, TOOLS, type ToolCategory } from "@/lib/tools-registry";
import { ToolCard } from "@/components/tools/tool-card";

export function generateStaticParams() {
  return Object.values(CATEGORIES).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = Object.entries(CATEGORIES).find(([, c]) => c.slug === slug);
  if (!cat) return {};
  const [, info] = cat;
  return {
    title: `Herramientas de ${info.name}`,
    description: info.description,
    alternates: { canonical: `/categoria/${info.slug}` }
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = Object.entries(CATEGORIES).find(([, c]) => c.slug === slug);
  if (!entry) notFound();
  const [key, info] = entry as [ToolCategory, typeof CATEGORIES[ToolCategory]];
  const tools = TOOLS.filter((t) => t.category === key).sort((a, b) => b.popularity - a.popularity);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-1.5 text-xs text-[color:var(--color-fg-soft)] mb-4">
        <Link href="/" className="hover:text-[color:var(--color-brand)] inline-flex items-center gap-1"><Home className="w-3 h-3" /> Inicio</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[color:var(--color-fg)]">{info.name}</span>
      </nav>
      <header className="mb-8">
        <div className="text-4xl mb-2">{info.emoji}</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Herramientas de {info.name}</h1>
        <p className="text-lg text-[color:var(--color-fg-soft)]">{info.description}</p>
      </header>
      {tools.length === 0 ? (
        <div className="card text-center !py-12 text-[color:var(--color-fg-soft)]">Próximamente más herramientas en esta categoría.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tools.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      )}
    </div>
  );
}
