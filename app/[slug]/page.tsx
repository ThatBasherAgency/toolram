import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { CATEGORIES, TOOLS, TOOLS_BY_SLUG, relatedTools } from "@/lib/tools-registry";
import { CALCULATORS, CALCS_BY_SLUG } from "@/lib/calculators";
import { ToolRenderer } from "@/components/tools/tool-renderer";
import { CalculatorRunner } from "@/components/tools/calculator-runner";
import { ToolCard } from "@/components/tools/tool-card";
import { SITE } from "@/lib/site";
import { ToolJsonLd } from "@/components/seo/tool-json-ld";

export function generateStaticParams() {
  return [
    ...TOOLS.map((t) => ({ slug: t.slug })),
    ...CALCULATORS.map((c) => ({ slug: c.slug }))
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS_BY_SLUG[slug];
  const calc = CALCS_BY_SLUG[slug];
  const subject = tool || calc;
  if (!subject) return {};
  const title = `${subject.name} online gratis`;
  const desc = subject.shortDesc;
  return {
    title,
    description: desc,
    alternates: { canonical: `/${subject.slug}` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description: desc,
      type: "article",
      url: `${SITE.url}/${subject.slug}`
    }
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = TOOLS_BY_SLUG[slug];
  const calc = CALCS_BY_SLUG[slug];

  if (calc && !tool) {
    return (
      <article className="max-w-4xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-1.5 text-xs text-[color:var(--color-fg-soft)] mb-4">
          <Link href="/" className="hover:text-[color:var(--color-brand)] inline-flex items-center gap-1"><Home className="w-3 h-3" /> Inicio</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/calculadoras" className="hover:text-[color:var(--color-brand)]">Calculadoras</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[color:var(--color-fg)]">{calc.name}</span>
        </nav>
        <header className="mb-6">
          <span className="text-xs px-2 py-0.5 rounded-full bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] inline-block mb-2">🧮 Calculadora</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{calc.name}</h1>
          <p className="text-lg text-[color:var(--color-fg-soft)]">{calc.shortDesc}</p>
        </header>
        <div className="card !p-4 md:!p-6 mb-8">
          <CalculatorRunner slug={calc.slug} />
        </div>
        <section className="prose prose-sm max-w-none mb-8">
          <h2 className="text-xl font-bold mb-2">Sobre {calc.name}</h2>
          <p className="text-[color:var(--color-fg-soft)] leading-relaxed">{calc.longDesc}</p>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-3">Otras calculadoras</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CALCULATORS.filter((c) => c.slug !== slug).slice(0, 6).map((c) => (
              <Link key={c.slug} href={`/${c.slug}`} className="card group">
                <div className="font-medium group-hover:text-[color:var(--color-brand)]">{c.name}</div>
                <div className="text-xs text-[color:var(--color-fg-soft)]">{c.shortDesc}</div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    );
  }

  if (!tool) notFound();
  const cat = CATEGORIES[tool.category];
  const related = relatedTools(tool.slug, 4);

  return (
    <>
      <ToolJsonLd tool={tool} />
      <article className="max-w-5xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-1.5 text-xs text-[color:var(--color-fg-soft)] mb-4">
          <Link href="/" className="hover:text-[color:var(--color-brand)] inline-flex items-center gap-1"><Home className="w-3 h-3" /> Inicio</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/categoria/${cat.slug}`} className="hover:text-[color:var(--color-brand)]">{cat.name}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[color:var(--color-fg)]">{tool.name}</span>
        </nav>

        <header className="mb-6">
          <span className="text-xs px-2 py-0.5 rounded-full bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] inline-block mb-2">
            {cat.emoji} {cat.name}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{tool.name}</h1>
          <p className="text-lg text-[color:var(--color-fg-soft)]">{tool.shortDesc}</p>
        </header>

        <div className="card !p-4 md:!p-6 mb-8">
          <ToolRenderer slug={tool.slug} />
        </div>

        <section className="prose prose-sm max-w-none mb-8">
          <h2 className="text-xl font-bold mb-2">Sobre {tool.name}</h2>
          <p className="text-[color:var(--color-fg-soft)] leading-relaxed">{tool.longDesc}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Por qué usar Toolram</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            <li className="card !p-3"><strong>🔒 100% privado</strong><div className="text-[color:var(--color-fg-soft)]">Tus datos nunca salen de tu navegador.</div></li>
            <li className="card !p-3"><strong>⚡ Sin esperas</strong><div className="text-[color:var(--color-fg-soft)]">Resultados instantáneos, sin uploads.</div></li>
            <li className="card !p-3"><strong>📱 Funciona en móvil</strong><div className="text-[color:var(--color-fg-soft)]">Diseño responsive optimizado.</div></li>
            <li className="card !p-3"><strong>🎁 Gratis para siempre</strong><div className="text-[color:var(--color-fg-soft)]">Sin registro, sin marca de agua.</div></li>
          </ul>
        </section>

        {tool.faqs && tool.faqs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3">Preguntas frecuentes</h2>
            <div className="space-y-2">
              {tool.faqs.map((f, i) => (
                <details key={i} className="card !p-3">
                  <summary className="font-medium cursor-pointer">{f.q}</summary>
                  <p className="text-sm text-[color:var(--color-fg-soft)] mt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xl font-bold mb-3">Herramientas relacionadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
