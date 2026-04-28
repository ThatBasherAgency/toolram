import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { CATEGORIES, popularTools, TOOLS } from "@/lib/tools-registry";
import { ToolCard } from "@/components/tools/tool-card";
import { SearchBox } from "@/components/tools/search-box";

export default function HomePage() {
  const popular = popularTools(12);
  return (
    <>
      <section className="px-4 pt-12 pb-10 md:pt-20 md:pb-14 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5" /> {TOOLS.length}+ herramientas gratis
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Herramientas online que realmente <span className="text-[color:var(--color-brand)]">funcionan</span>.
        </h1>
        <p className="text-lg md:text-xl text-[color:var(--color-fg-soft)] max-w-2xl mx-auto mb-6">
          PDF, SEO, IA, símbolos, contadores, conversores. Todo gratis, sin registro y procesado en tu navegador cuando es posible.
        </p>
        <SearchBox />
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {Object.entries(CATEGORIES)
            .slice(0, 8)
            .map(([k, c]) => (
              <Link key={k} href={`/categoria/${c.slug}`} className="px-3 py-1.5 rounded-full text-sm border hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-brand)] transition">
                {c.emoji} {c.name}
              </Link>
            ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold">Más populares</h2>
          <Link href="/herramientas" className="text-sm text-[color:var(--color-brand)] inline-flex items-center gap-1 hover:underline">
            Ver todas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {popular.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
        <div className="card">
          <Shield className="w-6 h-6 text-[color:var(--color-brand)] mb-3" />
          <h3 className="font-semibold mb-1">100% privado</h3>
          <p className="text-sm text-[color:var(--color-fg-soft)]">La mayoría de tools procesa tus datos en tu navegador. Tus archivos nunca se suben a nuestros servidores.</p>
        </div>
        <div className="card">
          <Zap className="w-6 h-6 text-[color:var(--color-brand)] mb-3" />
          <h3 className="font-semibold mb-1">Súper rápido</h3>
          <p className="text-sm text-[color:var(--color-fg-soft)]">Sin esperar uploads. Resultados instantáneos. Funciona offline en muchas herramientas.</p>
        </div>
        <div className="card">
          <Sparkles className="w-6 h-6 text-[color:var(--color-brand)] mb-3" />
          <h3 className="font-semibold mb-1">Sin registro, sin ads invasivos</h3>
          <p className="text-sm text-[color:var(--color-fg-soft)]">Empezá a usar cualquier tool al instante. No te pedimos email ni te llenamos de pop-ups.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Todas las categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(CATEGORIES).map(([k, c]) => (
            <Link key={k} href={`/categoria/${c.slug}`} className="card group">
              <div className="text-3xl mb-2">{c.emoji}</div>
              <div className="font-semibold mb-1 group-hover:text-[color:var(--color-brand)]">{c.name}</div>
              <div className="text-xs text-[color:var(--color-fg-soft)]">{c.description}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
