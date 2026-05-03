import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { CATEGORIES, TOOLS, TOOLS_BY_SLUG, relatedTools } from "@/lib/tools-registry";
import { CALCULATORS, CALCS_BY_SLUG } from "@/lib/calculators";
import { GLOSSARY, GLOSSARY_BY_SLUG } from "@/data/glossary";
import { ALTERNATIVES, ALTERNATIVES_BY_SLUG } from "@/data/alternatives";
import { ToolRenderer } from "@/components/tools/tool-renderer";
import { CalculatorRunner } from "@/components/tools/calculator-runner";
import { ToolCard } from "@/components/tools/tool-card";
import { SITE } from "@/lib/site";
import { ToolJsonLd } from "@/components/seo/tool-json-ld";

export function generateStaticParams() {
  return [
    ...TOOLS.map((t) => ({ slug: t.slug })),
    ...CALCULATORS.map((c) => ({ slug: c.slug })),
    ...GLOSSARY.map((g) => ({ slug: g.slug })),
    ...ALTERNATIVES.map((a) => ({ slug: a.slug }))
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS_BY_SLUG[slug];
  const calc = CALCS_BY_SLUG[slug];
  const gloss = GLOSSARY_BY_SLUG[slug];
  const alt = ALTERNATIVES_BY_SLUG[slug];
  if (alt) {
    return {
      title: `Alternativas a ${alt.competitor} en 2026 (gratis y privacy-first)`,
      description: alt.shortDescription.slice(0, 155),
      alternates: { canonical: `/${alt.slug}` }
    };
  }
  if (gloss) {
    return {
      title: `¿Qué es ${gloss.term}? Definición y ejemplos`,
      description: gloss.shortDef.slice(0, 155),
      alternates: { canonical: `/${gloss.slug}` }
    };
  }
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
  const gloss = GLOSSARY_BY_SLUG[slug];
  const alt = ALTERNATIVES_BY_SLUG[slug];

  if (alt && !tool && !calc && !gloss) {
    const jsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `Alternativas a ${alt.competitor}`,
        description: alt.shortDescription,
        author: { "@type": "Person", name: "José Gaspard", url: "https://josegaspard.dev" },
        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
        datePublished: "2026-04-29",
        dateModified: "2026-04-29",
        url: `${SITE.url}/${alt.slug}`
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: alt.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a }
        }))
      }
    ];
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <article className="max-w-4xl mx-auto px-4 py-8">
          <nav className="flex items-center gap-1.5 text-xs text-[color:var(--color-fg-soft)] mb-4">
            <Link href="/" className="hover:text-[color:var(--color-brand)] inline-flex items-center gap-1"><Home className="w-3 h-3" /> Inicio</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/alternativas" className="hover:text-[color:var(--color-brand)]">Alternativas</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[color:var(--color-fg)]">{alt.competitor}</span>
          </nav>
          <header className="mb-6">
            <span className="text-xs px-2 py-0.5 rounded-full bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] inline-block mb-2">⚖️ Comparativa</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Alternativas a {alt.competitor}</h1>
            <p className="text-lg text-[color:var(--color-fg-soft)]">{alt.shortDescription}</p>
          </header>
          <section className="prose prose-sm max-w-none mb-8">
            <p className="text-[color:var(--color-fg-soft)] leading-relaxed">{alt.intro}</p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3">Por qué buscar alternativas a {alt.competitor}</h2>
            <ul className="space-y-1.5 text-sm">
              {alt.whyLookForAlternatives.map((u, i) => (
                <li key={i} className="flex gap-2"><span className="text-[color:var(--color-warning)]">▸</span><span>{u}</span></li>
              ))}
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3">Toolram: la opción privacy-first</h2>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm mb-3">
              {alt.toolramAdvantages.map((u, i) => (
                <li key={i} className="card !p-3"><strong className="text-[color:var(--color-success)]">✓</strong> {u}</li>
              ))}
            </ul>
            <h3 className="text-lg font-bold mt-6 mb-2">Pero {alt.competitor} sigue siendo mejor en:</h3>
            <ul className="space-y-1.5 text-sm">
              {alt.competitorAdvantages.map((u, i) => (
                <li key={i} className="flex gap-2 text-[color:var(--color-fg-soft)]"><span>▹</span><span>{u}</span></li>
              ))}
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3">Tabla comparativa: {alt.competitor} vs Toolram</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Feature</th>
                    <th className="py-2 text-[color:var(--color-brand)]">Toolram</th>
                    <th className="py-2">{alt.competitor}</th>
                  </tr>
                </thead>
                <tbody>
                  {alt.comparisonRows.map((r, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2.5">{r.feature}</td>
                      <td className="text-center py-2.5">{typeof r.toolram === "boolean" ? (r.toolram ? <span className="text-[color:var(--color-success)] font-bold">✓</span> : <span className="text-[color:var(--color-danger)]">✗</span>) : r.toolram}</td>
                      <td className="text-center py-2.5">{typeof r.competitor === "boolean" ? (r.competitor ? <span className="text-[color:var(--color-success)] font-bold">✓</span> : <span className="text-[color:var(--color-danger)]">✗</span>) : r.competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3">Otras alternativas a considerar</h2>
            <div className="space-y-2">
              {alt.otherAlternatives.map((o, i) => (
                <div key={i} className="card !p-3">
                  <div className="font-semibold">{o.url ? <a href={o.url} className="hover:text-[color:var(--color-brand)]" target="_blank" rel="noopener nofollow">{o.name}</a> : o.name}</div>
                  <div className="text-sm text-[color:var(--color-fg-soft)]">{o.description}</div>
                </div>
              ))}
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3">Preguntas frecuentes</h2>
            <div className="space-y-2">
              {alt.faqs.map((f, i) => (
                <details key={i} className="card !p-3">
                  <summary className="font-medium cursor-pointer">{f.q}</summary>
                  <p className="text-sm text-[color:var(--color-fg-soft)] mt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </article>
      </>
    );
  }

  if (gloss && !tool && !calc) {
    const jsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: gloss.term,
        description: gloss.shortDef,
        inDefinedTermSet: `${SITE.url}/glosario`,
        url: `${SITE.url}/${gloss.slug}`
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: gloss.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a }
        }))
      }
    ];
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <article className="max-w-3xl mx-auto px-4 py-8">
          <nav className="flex items-center gap-1.5 text-xs text-[color:var(--color-fg-soft)] mb-4">
            <Link href="/" className="hover:text-[color:var(--color-brand)] inline-flex items-center gap-1"><Home className="w-3 h-3" /> Inicio</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/glosario" className="hover:text-[color:var(--color-brand)]">Glosario</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[color:var(--color-fg)]">{gloss.term}</span>
          </nav>
          <header className="mb-6">
            <span className="text-xs px-2 py-0.5 rounded-full bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] inline-block mb-2">📖 Glosario técnico</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">¿Qué es {gloss.term}?</h1>
            <p className="text-xl text-[color:var(--color-fg-soft)]"><strong className="text-[color:var(--color-fg)]">Respuesta corta:</strong> {gloss.shortDef}</p>
          </header>
          <section className="prose prose-sm max-w-none mb-8">
            <h2 className="text-xl font-bold mb-2">Explicación detallada</h2>
            <p className="text-[color:var(--color-fg-soft)] leading-relaxed">{gloss.longDef}</p>
            {gloss.example && (
              <>
                <h3 className="text-lg font-bold mt-6 mb-2">Ejemplo</h3>
                <pre className="card !p-3 text-sm font-mono whitespace-pre-wrap">{gloss.example}</pre>
              </>
            )}
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3">Casos de uso comunes</h2>
            <ul className="space-y-1.5 text-sm">
              {gloss.useCases.map((u, i) => (
                <li key={i} className="flex gap-2"><span className="text-[color:var(--color-brand)]">▸</span><span>{u}</span></li>
              ))}
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3">Preguntas frecuentes</h2>
            <div className="space-y-2">
              {gloss.faqs.map((f, i) => (
                <details key={i} className="card !p-3">
                  <summary className="font-medium cursor-pointer">{f.q}</summary>
                  <p className="text-sm text-[color:var(--color-fg-soft)] mt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
          {gloss.related.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-3">Artículos y herramientas relacionadas</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {gloss.related.map((r) => (
                  <Link key={r} href={`/${r}`} className="card group">
                    <div className="font-medium group-hover:text-[color:var(--color-brand)]">
                      {GLOSSARY_BY_SLUG[r]?.term || TOOLS_BY_SLUG[r]?.name || CALCS_BY_SLUG[r]?.name || r}
                    </div>
                    <div className="text-xs text-[color:var(--color-fg-soft)]">
                      {GLOSSARY_BY_SLUG[r]?.shortDef.slice(0, 100) || TOOLS_BY_SLUG[r]?.shortDesc || CALCS_BY_SLUG[r]?.shortDesc}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </>
    );
  }

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
  const POWER_TOOLS: Record<string, string> = {
    "pdf-a-jpg": "oklch(0.65 0.2 50)",
    "comprimir-pdf": "oklch(0.6 0.2 145)",
    "quitar-fondo-imagen": "oklch(0.6 0.22 320)",
    "recortar-imagen": "oklch(0.65 0.2 130)",
    "marca-agua-imagen": "oklch(0.6 0.18 200)",
    "analizador-meta": "oklch(0.5 0.2 220)",
    "comparador-textos": "oklch(0.6 0.22 30)",
    "whois-domain": "oklch(0.55 0.2 220)",
    "dns-lookup": "oklch(0.55 0.2 200)",
    "headers-checker": "oklch(0.55 0.2 165)",
    "seo-quick-audit": "oklch(0.55 0.2 145)"
  };
  const FULLSCREEN_TOOLS = new Set(["firmar-pdf", "editar-pdf", "reordenar-pdf"]);
  const SELF_HERO_TOOLS = new Set(["whois-domain", "dns-lookup", "headers-checker", "seo-quick-audit", "mi-ip", "generador-utm", "conversor-divisas", "numero-a-letras", "calculadora-edad", "htaccess-generator", "generador-hashtags", "password-strength", "calculadora-imc", "calculadora-porcentaje", "calculadora-prestamo", "calculadora-iva", "calculadora-propina", "calculadora-descuento", "box-shadow-generator", "gradient-generator", "paleta-colores", "numeros-romanos", "binario-decimal", "pomodoro", "calculadora-cientifica", "markdown-html", "favicon-generator"]);
  if (SELF_HERO_TOOLS.has(tool.slug)) {
    return (
      <>
        <ToolJsonLd tool={tool} />
        <ToolRenderer slug={tool.slug} />
        <div className="border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)]/40 py-12 md:py-16 mt-8">
          <div className="max-w-3xl mx-auto px-4 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-3">Sobre {tool.name}</h2>
              <p className="text-base text-[color:var(--color-fg-soft)] leading-relaxed">{tool.longDesc}</p>
            </section>
            {tool.faqs && tool.faqs.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Preguntas frecuentes</h2>
                <div className="space-y-2">
                  {tool.faqs.map((f, i) => (
                    <details key={i} className="rounded-xl bg-[color:var(--color-bg)] border border-[color:var(--color-border)] p-4 group">
                      <summary className="font-semibold cursor-pointer flex items-center justify-between">{f.q}<span className="text-xl group-open:rotate-45 transition">+</span></summary>
                      <p className="text-sm text-[color:var(--color-fg-soft)] mt-3 leading-relaxed">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
            <section>
              <h2 className="text-2xl font-bold mb-4">Herramientas relacionadas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {related.map((t) => <ToolCard key={t.slug} tool={t} />)}
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }
  if (FULLSCREEN_TOOLS.has(tool.slug)) {
    return (
      <>
        <ToolJsonLd tool={tool} />
        <ToolRenderer slug={tool.slug} />
      </>
    );
  }
  const accent = POWER_TOOLS[tool.slug];

  if (accent) {
    return (
      <>
        <ToolJsonLd tool={tool} />
        <div className="min-h-screen">
          <div className="max-w-5xl mx-auto px-4 pt-6">
            <nav className="flex items-center gap-1.5 text-xs text-[color:var(--color-fg-soft)] mb-8">
              <Link href="/" className="hover:opacity-80 inline-flex items-center gap-1" style={{ color: accent }}><Home className="w-3 h-3" /> Inicio</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/categoria/${cat.slug}`} className="hover:opacity-80" style={{ color: accent }}>{cat.name}</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[color:var(--color-fg)] font-semibold">{tool.name}</span>
            </nav>

            <div className="text-center mb-10 md:mb-14">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
                <span style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in oklch, ${accent} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {tool.name}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">{tool.shortDesc}</p>
            </div>

            <div className="mb-16">
              <ToolRenderer slug={tool.slug} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 max-w-3xl mx-auto">
              {[
                { i: "🔒", t: "100% privado" },
                { i: "⚡", t: "Sin esperas" },
                { i: "📱", t: "Funciona en móvil" },
                { i: "🎁", t: "Gratis siempre" }
              ].map((b) => (
                <div key={b.t} className="text-center py-3 px-2 rounded-xl bg-[color:var(--color-bg-soft)]">
                  <div className="text-2xl mb-1">{b.i}</div>
                  <div className="text-xs font-semibold text-[color:var(--color-fg-soft)]">{b.t}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)]/40 py-12 md:py-16">
            <div className="max-w-3xl mx-auto px-4 space-y-10">
              <section>
                <h2 className="text-2xl font-bold mb-3">Sobre {tool.name}</h2>
                <p className="text-base text-[color:var(--color-fg-soft)] leading-relaxed">{tool.longDesc}</p>
              </section>

              {tool.faqs && tool.faqs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">Preguntas frecuentes</h2>
                  <div className="space-y-2">
                    {tool.faqs.map((f, i) => (
                      <details key={i} className="rounded-xl bg-[color:var(--color-bg)] border border-[color:var(--color-border)] p-4 group">
                        <summary className="font-semibold cursor-pointer flex items-center justify-between">{f.q}<span className="text-xl group-open:rotate-45 transition">+</span></summary>
                        <p className="text-sm text-[color:var(--color-fg-soft)] mt-3 leading-relaxed">{f.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <h2 className="text-2xl font-bold mb-4">Herramientas relacionadas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {related.map((t) => <ToolCard key={t.slug} tool={t} />)}
                </div>
              </section>
            </div>
          </div>
        </div>
      </>
    );
  }

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
