import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { CATEGORIES, TOOLS, type ToolCategory } from "@/lib/tools-registry";
import { ToolCard } from "@/components/tools/tool-card";
import { CATEGORY_CONTENT } from "@/lib/category-content";
import { SITE } from "@/lib/site";

const YEAR = new Date().getFullYear();

export function generateStaticParams() {
  return Object.values(CATEGORIES).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = Object.entries(CATEGORIES).find(([, c]) => c.slug === slug);
  if (!cat) return {};
  const [, info] = cat;
  const title = `Herramientas de ${info.name} gratis ${YEAR} — Sin registro · Privacy-first`;
  const desc = `${info.description} Todas gratis, sin registro y procesadas en tu navegador. Más de ${TOOLS.filter((t) => CATEGORIES[t.category].slug === slug).length} herramientas profesionales en español.`;
  return {
    title,
    description: desc.length > 158 ? desc.slice(0, 155) + "..." : desc,
    alternates: { canonical: `/categoria/${info.slug}` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description: desc,
      type: "website",
      url: `${SITE.url}/categoria/${info.slug}`,
      siteName: SITE.name
    },
    twitter: { card: "summary_large_image", title, description: desc.slice(0, 200) }
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = Object.entries(CATEGORIES).find(([, c]) => c.slug === slug);
  if (!entry) notFound();
  const [key, info] = entry as [ToolCategory, typeof CATEGORIES[ToolCategory]];
  const tools = TOOLS.filter((t) => t.category === key).sort((a, b) => b.popularity - a.popularity);
  const content = CATEGORY_CONTENT[key];
  const url = `${SITE.url}/categoria/${info.slug}`;

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#collection`,
      url,
      name: `Herramientas de ${info.name}`,
      description: info.description,
      isPartOf: { "@id": `${SITE.url}#website` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      inLanguage: "es",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: tools.length,
        itemListElement: tools.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE.url}/${t.slug}`,
          name: t.name
        }))
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
        { "@type": "ListItem", position: 2, name: info.name, item: url }
      ]
    }
  ];
  if (content && content.faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: content.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a }
      }))
    });
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
            {tools.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
        )}

        {content && (
          <div className="border-t border-[color:var(--color-border)] pt-10 max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-3">¿Para qué sirven las herramientas de {info.name}?</h2>
              <p className="text-base text-[color:var(--color-fg-soft)] leading-relaxed">{content.longDescription}</p>
            </section>

            {content.faqs.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Preguntas frecuentes sobre {info.name}</h2>
                <div className="space-y-2">
                  {content.faqs.map((f, i) => (
                    <details key={i} className="rounded-xl bg-[color:var(--color-bg)] border border-[color:var(--color-border)] p-4 group">
                      <summary className="font-semibold cursor-pointer flex items-center justify-between">{f.q}<span className="text-xl group-open:rotate-45 transition">+</span></summary>
                      <p className="text-sm text-[color:var(--color-fg-soft)] mt-3 leading-relaxed">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold mb-4">Otras categorías</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {Object.values(CATEGORIES).filter((c) => c.slug !== info.slug).map((c) => (
                  <Link key={c.slug} href={`/categoria/${c.slug}`} className="card !p-3 group hover:border-[color:var(--color-brand)] transition">
                    <div className="text-2xl mb-1">{c.emoji}</div>
                    <div className="font-semibold text-sm group-hover:text-[color:var(--color-brand)]">{c.name}</div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  );
}
