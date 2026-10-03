import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { TOOLS, TOOLS_BY_SLUG } from "@/lib/tools-registry";
import { ToolRenderer } from "@/components/tools/tool-renderer";
import { SITE } from "@/lib/site";
import { TOOL_EN, GLOSSARY_EN, EN_INDEXABLE } from "@/lib/i18n";
import { clampTitle } from "@/lib/seo-meta";
import { metaDesc } from "@/lib/meta-desc";
import { GLOSSARY, GLOSSARY_BY_SLUG } from "@/data/glossary";

const EN_TOOL_SLUGS = Object.keys(TOOL_EN);
const EN_GLOSS_SLUGS = Object.keys(GLOSSARY_EN);


/** Corta un texto por palabra entera y lo cierra. Un fragmento partido a media
 *  palabra («…los pequeños explo») parece una página rota en los resultados. */
function recortarLimpio(t: string, max: number): string {
  const s = (t || "").trim();
  if (s.length <= max) return s;
  const corte = s.slice(0, max);
  const punto = Math.max(corte.lastIndexOf(". "), corte.lastIndexOf("! "), corte.lastIndexOf("? "));
  if (punto > max * 0.5) return corte.slice(0, punto + 1);
  const esp = corte.lastIndexOf(" ");
  return (esp > max * 0.5 ? corte.slice(0, esp) : corte).replace(/[ ,;:—-]+$/, "") + "…";
}

export function generateStaticParams() {
  return [
    ...EN_TOOL_SLUGS.map((slug) => ({ slug })),
    ...EN_GLOSS_SLUGS.map((slug) => ({ slug }))
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const en = TOOL_EN[slug];
  const enGloss = GLOSSARY_EN[slug];
  if (en) {
    return {
      title: clampTitle(`${en.name} — Free online`),
      description: metaDesc(`en/${slug}`, en.shortDesc),
      alternates: {
        canonical: `/en/${slug}`,
        ...(EN_INDEXABLE.has(slug) && {
          languages: {
            en: `/en/${slug}`,
            es: `/${slug}`,
            "x-default": `/en/${slug}`
          }
        })
      },
      ...(!EN_INDEXABLE.has(slug) && { robots: { index: false, follow: true } })
    };
  }
  if (enGloss) {
    return {
      title: clampTitle(`What is ${enGloss.term}? Definition & examples`),
      /* 16-ago-2026 · La description salía de la PRIMERA FAQ, y en /en/que-es-cps-test
         esa primera pregunta era «What is a CPS test in Spanish?». Resultado: el
         fragmento que Bing enseñaba a un lector inglés hablaba de cómo se dice el
         término en español. 256 impresiones y CERO clics — es la página con más
         impresiones sin un solo clic del sitio, y Bing es quien de verdad sirve a
         toolram (655 consultas con datos, frente a 1 en Google).
         Ahora manda `shortDef`, que es la definición. Y se corta por palabra entera:
         un fragmento cortado a media palabra parece una página rota. */
      description: metaDesc(`en/${slug}`, recortarLimpio(enGloss.shortDef || enGloss.faqs?.[0]?.a || "", 155)),
      alternates: {
        canonical: `/en/${slug}`,
        ...(EN_INDEXABLE.has(slug) && {
          languages: {
            en: `/en/${slug}`,
            es: `/${slug}`,
            "x-default": `/en/${slug}`
          }
        })
      },
      ...(!EN_INDEXABLE.has(slug) && { robots: { index: false, follow: true } })
    };
  }
  return {};
}

export default async function ToolPageEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const en = TOOL_EN[slug];
  const tool = TOOLS_BY_SLUG[slug];
  const enGloss = GLOSSARY_EN[slug];
  const gloss = GLOSSARY_BY_SLUG[slug];

  if (enGloss && gloss) {
    const jsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: enGloss.term,
        description: enGloss.shortDef,
        inDefinedTermSet: `${SITE.url}/en/glossary`,
        url: `${SITE.url}/en/${slug}`
      }
    ];
    if (enGloss.faqs && enGloss.faqs.length > 0) {
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: enGloss.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a }
        }))
      } as unknown as (typeof jsonLd)[number]);
    }
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <article className="max-w-3xl mx-auto px-4 py-8">
          <nav className="flex items-center gap-1.5 text-xs text-[color:var(--color-fg-soft)] mb-4">
            <Link href="/en" className="hover:text-[color:var(--color-brand)] inline-flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[color:var(--color-fg)]">{enGloss.term}</span>
          </nav>
          <header className="mb-6">
            <span className="text-xs px-2 py-0.5 rounded-full bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] inline-block mb-2">📖 Glossary</span>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">What is {enGloss.term}?</h1>
            <p className="text-xl text-[color:var(--color-fg-soft)]"><strong className="text-[color:var(--color-fg)]">Short answer:</strong> {enGloss.shortDef}</p>
          </header>
          <section className="prose prose-sm max-w-none mb-8">
            <h2 className="text-xl font-bold mb-2">Detailed explanation</h2>
            <p className="text-[color:var(--color-fg-soft)] leading-relaxed">{enGloss.longDef}</p>
            {enGloss.example && (
              <>
                <h3 className="text-lg font-bold mt-6 mb-2">Example</h3>
                <pre className="card !p-3 text-sm font-mono whitespace-pre-wrap">{enGloss.example}</pre>
              </>
            )}
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3">Common use cases</h2>
            <ul className="space-y-1.5 text-sm">
              {enGloss.useCases.map((u, i) => (
                <li key={i} className="flex gap-2"><span className="text-[color:var(--color-brand)]">▸</span><span>{u}</span></li>
              ))}
            </ul>
          </section>
          {enGloss.faqs && enGloss.faqs.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-3">Frequently asked questions</h2>
              <div className="space-y-4">
                {enGloss.faqs.map((f, i) => (
                  <div key={i}>
                    <h3 className="font-semibold mb-1">{f.q}</h3>
                    <p className="text-sm text-[color:var(--color-fg-soft)] leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          <p className="text-sm text-[color:var(--color-fg-soft)]">
            🇲🇽 También disponible en <Link href={`/${slug}`} className="text-[color:var(--color-brand)] hover:underline">español</Link>
          </p>
        </article>
      </>
    );
  }

  if (!en || !tool) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: en.name,
      description: metaDesc(`en/${slug}`, en.shortDesc),
      url: `${SITE.url}/en/${slug}`,
      applicationCategory: "WebApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      inLanguage: "en"
    }
  ];

  // 16-ago-2026 · Las fichas de glosario ya emitían FAQPage y las de herramienta no,
  // aunque pintan las mismas preguntas en pantalla. Ahora que las 45 traducciones
  // tienen FAQ de verdad (antes iban con `faqs: []`), merece la pena declararlas.
  if (en.faqs && en.faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: en.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a }
      }))
    } as unknown as (typeof jsonLd)[number]);
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-5xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-1.5 text-xs text-[color:var(--color-fg-soft)] mb-4">
          <Link href="/en" className="hover:text-[color:var(--color-brand)] inline-flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[color:var(--color-fg)]">{en.name}</span>
        </nav>
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{en.name}</h1>
          <p className="text-lg text-[color:var(--color-fg-soft)]">{en.shortDesc}</p>
        </header>
        <div className="card !p-4 md:!p-6 mb-8">
          <ToolRenderer slug={tool.slug} />
        </div>
        <section className="prose prose-sm max-w-none mb-8">
          <h2 className="text-xl font-bold mb-2">About {en.name}</h2>
          <p className="text-[color:var(--color-fg-soft)] leading-relaxed">{en.longDesc}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Why use Toolram</h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            <li className="card !p-3"><strong>🔒 100% private</strong><div className="text-[color:var(--color-fg-soft)]">Your data never leaves your browser.</div></li>
            <li className="card !p-3"><strong>⚡ No waiting</strong><div className="text-[color:var(--color-fg-soft)]">Instant results, no uploads.</div></li>
            <li className="card !p-3"><strong>📱 Works on mobile</strong><div className="text-[color:var(--color-fg-soft)]">Optimized responsive design.</div></li>
            <li className="card !p-3"><strong>🎁 Forever free</strong><div className="text-[color:var(--color-fg-soft)]">No signup, no watermark.</div></li>
          </ul>
        </section>
        {en.faqs && en.faqs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3">Frequently asked questions</h2>
            <div className="space-y-2">
              {en.faqs.map((f, i) => (
                <details key={i} className="card !p-3">
                  <summary className="font-medium cursor-pointer">{f.q}</summary>
                  <p className="text-sm text-[color:var(--color-fg-soft)] mt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}
        <p className="text-sm text-[color:var(--color-fg-soft)]">
          🇲🇽 También disponible en <Link href={`/${slug}`} className="text-[color:var(--color-brand)] hover:underline">español</Link>
        </p>
      </article>
    </>
  );
}
