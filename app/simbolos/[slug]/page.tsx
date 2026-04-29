import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { SYMBOL_CATEGORIES, SYMBOLS_BY_CATEGORY } from "@/data/symbols";
import { SymbolsGrid } from "@/components/tools/symbols-grid";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return SYMBOL_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = SYMBOLS_BY_CATEGORY[slug];
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
    alternates: { canonical: `/simbolos/${cat.slug}` }
  };
}

export default async function SymbolCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = SYMBOLS_BY_CATEGORY[slug];
  if (!cat) notFound();
  const others = SYMBOL_CATEGORIES.filter((c) => c.slug !== slug).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cat.name,
    description: cat.description,
    url: `${SITE.url}/simbolos/${cat.slug}`,
    inLanguage: "es"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-7xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-1.5 text-xs text-[color:var(--color-fg-soft)] mb-4">
          <Link href="/" className="hover:text-[color:var(--color-brand)] inline-flex items-center gap-1"><Home className="w-3 h-3" /> Inicio</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/simbolos" className="hover:text-[color:var(--color-brand)]">Símbolos</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[color:var(--color-fg)]">{cat.name}</span>
        </nav>
        <header className="mb-6">
          <div className="text-5xl mb-2">{cat.emoji}</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{cat.name}</h1>
          <p className="text-lg text-[color:var(--color-fg-soft)]">{cat.description}</p>
        </header>

        <SymbolsGrid symbols={cat.symbols} />

        <section className="mt-10 prose prose-sm max-w-none">
          <h2 className="text-xl font-bold mb-2">Cómo usar estos símbolos</h2>
          <ol className="text-sm text-[color:var(--color-fg-soft)] space-y-1">
            <li>Toca o haz click sobre el símbolo que quieras.</li>
            <li>Se copia automáticamente al portapapeles.</li>
            <li>Pega en Instagram, WhatsApp, Twitter/X, Discord, Word o cualquier app.</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold mb-3">Otras categorías de símbolos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/simbolos/${o.slug}`} className="card group">
                <div className="text-3xl mb-1">{o.emoji}</div>
                <div className="font-medium group-hover:text-[color:var(--color-brand)]">{o.name}</div>
                <div className="text-xs text-[color:var(--color-fg-soft)]">{o.symbols.length} símbolos</div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
