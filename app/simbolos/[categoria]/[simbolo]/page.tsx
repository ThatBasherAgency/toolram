import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home, Copy } from "lucide-react";
import { SYMBOLS_BY_CATEGORY, SYMBOL_CATEGORIES } from "@/data/symbols";
import { ALL_SYMBOL_PAGES, findSymbol, relatedSymbols, slugifySymbol } from "@/lib/symbol-slug";
import { CopySymbolButton } from "@/components/tools/copy-symbol-button";
import { SITE } from "@/lib/site";

export const revalidate = 86400;

export function generateStaticParams() {
  return ALL_SYMBOL_PAGES.map((p) => ({ categoria: p.categorySlug, simbolo: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ categoria: string; simbolo: string }> }): Promise<Metadata> {
  const { categoria, simbolo } = await params;
  const s = findSymbol(categoria, simbolo);
  if (!s) return {};
  const cat = SYMBOLS_BY_CATEGORY[categoria];
  const title = `${s.name} ${s.char} — Símbolo ${s.unicode} para copiar y pegar`;
  const desc = `Copia el símbolo "${s.char}" (${s.name}, ${s.unicode}) y pégalo en WhatsApp, Instagram, Twitter, Word o cualquier app. Código HTML, CSS y métodos de inserción.`;
  return {
    title,
    description: desc.length > 158 ? desc.slice(0, 155) + "..." : desc,
    alternates: { canonical: `/simbolos/${categoria}/${simbolo}` },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description: desc,
      type: "article",
      url: `${SITE.url}/simbolos/${categoria}/${simbolo}`,
      siteName: SITE.name
    },
    twitter: { card: "summary", title, description: desc }
  };
}

function htmlEntity(unicode: string): string | null {
  const m = /^U\+([0-9A-Fa-f]+)$/.exec(unicode);
  if (!m) return null;
  return `&#x${m[1].toUpperCase()};`;
}

function cssEscape(unicode: string): string | null {
  const m = /^U\+([0-9A-Fa-f]+)$/.exec(unicode);
  if (!m) return null;
  return `\\${m[1].toUpperCase()}`;
}

function decimalCode(unicode: string): string | null {
  const m = /^U\+([0-9A-Fa-f]+)$/.exec(unicode);
  if (!m) return null;
  return `&#${parseInt(m[1], 16)};`;
}

export default async function SymbolPage({ params }: { params: Promise<{ categoria: string; simbolo: string }> }) {
  const { categoria, simbolo } = await params;
  const s = findSymbol(categoria, simbolo);
  if (!s) notFound();
  const cat = SYMBOLS_BY_CATEGORY[categoria];
  const related = relatedSymbols(categoria, simbolo, 12);

  const html = htmlEntity(s.unicode);
  const dec = decimalCode(s.unicode);
  const css = cssEscape(s.unicode);
  const isKaomoji = s.unicode === "Kaomoji";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${s.name} ${s.char}`,
    description: `Símbolo ${s.char} (${s.name}, ${s.unicode}) para copiar y pegar.`,
    url: `${SITE.url}/simbolos/${categoria}/${simbolo}`,
    inLanguage: "es",
    author: { "@type": "Person", "@id": "https://josegaspard.dev/#person", name: "José Gaspard" },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Símbolos", item: `${SITE.url}/simbolos` },
      { "@type": "ListItem", position: 3, name: cat.name, item: `${SITE.url}/simbolos/${cat.slug}` },
      { "@type": "ListItem", position: 4, name: s.name, item: `${SITE.url}/simbolos/${cat.slug}/${simbolo}` }
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `¿Cómo se llama el símbolo ${s.char}?`,
        acceptedAnswer: { "@type": "Answer", text: `El símbolo ${s.char} se llama "${s.name}" y su código Unicode es ${s.unicode}.` }
      },
      {
        "@type": "Question",
        name: `¿Cómo copiar el símbolo ${s.char}?`,
        acceptedAnswer: { "@type": "Answer", text: `Haz click en el botón "Copiar" arriba o selecciona el símbolo ${s.char} y presiona Ctrl+C (Windows/Linux) o Cmd+C (Mac). Luego pégalo en WhatsApp, Instagram, Word o cualquier app.` }
      },
      {
        "@type": "Question",
        name: `¿Funciona el símbolo ${s.name} en todas las apps?`,
        acceptedAnswer: { "@type": "Answer", text: `Sí, en todas las apps modernas que soporten Unicode (WhatsApp, Instagram, Twitter/X, Discord, Word, Google Docs, email). Si aparece como cuadrado, la fuente del dispositivo no incluye ese carácter — probá con otro dispositivo o instalá una fuente Unicode completa.` }
      },
      ...(html
        ? [{
            "@type": "Question",
            name: `¿Cuál es el código HTML del símbolo ${s.char}?`,
            acceptedAnswer: { "@type": "Answer", text: `El código HTML es ${html} (hexadecimal) o ${dec} (decimal). El código CSS para usar en pseudo-elementos es content: "${css}";` }
          }]
        : [])
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-1.5 text-xs text-[color:var(--color-fg-soft)] mb-4">
          <Link href="/" className="hover:text-[color:var(--color-brand)] inline-flex items-center gap-1"><Home className="w-3 h-3" /> Inicio</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/simbolos" className="hover:text-[color:var(--color-brand)]">Símbolos</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/simbolos/${cat.slug}`} className="hover:text-[color:var(--color-brand)]">{cat.name}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[color:var(--color-fg)]">{s.name}</span>
        </nav>

        <header className="text-center mb-8 pb-8 border-b border-[color:var(--color-border)]">
          <div className="text-8xl md:text-9xl mb-4 leading-none select-all">{s.char}</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{s.name}</h1>
          <p className="text-sm text-[color:var(--color-fg-soft)] mb-4">{s.unicode} · Categoría: <Link href={`/simbolos/${cat.slug}`} className="text-[color:var(--color-brand)] hover:underline">{cat.name}</Link></p>
          <CopySymbolButton symbol={s.char} label={`Copiar ${s.char}`} />
        </header>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Información del símbolo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-[color:var(--color-border)] p-3">
              <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-1">Carácter</div>
              <div className="text-2xl font-bold">{s.char}</div>
            </div>
            <div className="rounded-xl border border-[color:var(--color-border)] p-3">
              <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-1">Unicode</div>
              <div className="font-mono">{s.unicode}</div>
            </div>
            {html && (
              <div className="rounded-xl border border-[color:var(--color-border)] p-3">
                <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-1">HTML hex</div>
                <code className="font-mono text-xs">{html}</code>
              </div>
            )}
            {dec && (
              <div className="rounded-xl border border-[color:var(--color-border)] p-3">
                <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-1">HTML decimal</div>
                <code className="font-mono text-xs">{dec}</code>
              </div>
            )}
            {css && (
              <div className="rounded-xl border border-[color:var(--color-border)] p-3 sm:col-span-2">
                <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-1">CSS content</div>
                <code className="font-mono text-xs">content: &quot;{css}&quot;;</code>
              </div>
            )}
          </div>
        </section>

        <section className="mb-8 prose prose-sm max-w-none">
          <h2 className="text-xl font-bold mb-2">Cómo usar el símbolo {s.char}</h2>
          <ol className="text-sm space-y-2">
            <li><strong>Copiar y pegar:</strong> Haz click en el botón &quot;Copiar&quot; arriba. El símbolo {s.char} se copia a tu portapapeles. Pégalo con Ctrl+V (Cmd+V en Mac) en cualquier app: WhatsApp, Instagram, Twitter/X, Discord, Word, Google Docs, email.</li>
            {html && <li><strong>En HTML:</strong> Usa <code>{html}</code> (hexadecimal) o <code>{dec}</code> (decimal) directamente en tu código HTML.</li>}
            {css && <li><strong>En CSS:</strong> Para pseudo-elementos <code>::before</code> o <code>::after</code>, usa <code>content: &quot;{css}&quot;;</code> con el escape Unicode.</li>}
            {!isKaomoji && <li><strong>Teclado (Windows):</strong> Mantén <kbd>Alt</kbd> y escribe el código decimal en el teclado numérico, luego suelta. Algunos símbolos requieren activar Unicode hex input.</li>}
            {!isKaomoji && <li><strong>Teclado (Mac):</strong> Activa &quot;Unicode Hex Input&quot; en preferencias de teclado, luego mantén <kbd>Option</kbd> y escribe los 4 dígitos hex.</li>}
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">¿Funciona en WhatsApp e Instagram?</h2>
          <p className="text-sm text-[color:var(--color-fg-soft)]">El símbolo {s.char} es un carácter Unicode estándar y funciona en cualquier app moderna que soporte Unicode: WhatsApp, Instagram, Twitter/X, Discord, Telegram, Messenger, TikTok bio, Word, Google Docs, email y SMS. Si aparece como cuadrado vacío, significa que la fuente del dispositivo no incluye ese carácter — probá con otro dispositivo o instalá una fuente Unicode completa (Noto, Symbola).</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Preguntas frecuentes</h2>
          <details className="rounded-xl border border-[color:var(--color-border)] p-3 mb-2">
            <summary className="font-bold cursor-pointer text-sm">¿Cómo se llama el símbolo {s.char}?</summary>
            <p className="text-sm text-[color:var(--color-fg-soft)] mt-2">El símbolo {s.char} se llama &quot;{s.name}&quot; y su código Unicode oficial es {s.unicode}.</p>
          </details>
          <details className="rounded-xl border border-[color:var(--color-border)] p-3 mb-2">
            <summary className="font-bold cursor-pointer text-sm">¿Cómo copiar el símbolo {s.char}?</summary>
            <p className="text-sm text-[color:var(--color-fg-soft)] mt-2">Haz click en el botón &quot;Copiar {s.char}&quot; al inicio de esta página. El símbolo se copia automáticamente al portapapeles. Luego pégalo con Ctrl+V (Cmd+V en Mac) en cualquier app.</p>
          </details>
          <details className="rounded-xl border border-[color:var(--color-border)] p-3 mb-2">
            <summary className="font-bold cursor-pointer text-sm">¿Funciona en todas las apps?</summary>
            <p className="text-sm text-[color:var(--color-fg-soft)] mt-2">Sí, en todas las apps modernas con soporte Unicode. Si aparece como cuadrado, la fuente del dispositivo no incluye ese carácter — probá actualizar la app o el sistema operativo.</p>
          </details>
          {html && (
            <details className="rounded-xl border border-[color:var(--color-border)] p-3 mb-2">
              <summary className="font-bold cursor-pointer text-sm">¿Cuál es el código HTML del símbolo {s.char}?</summary>
              <p className="text-sm text-[color:var(--color-fg-soft)] mt-2">El código HTML es <code>{html}</code> (hexadecimal) o <code>{dec}</code> (decimal). Para CSS usar <code>content: &quot;{css}&quot;;</code></p>
            </details>
          )}
        </section>

        {related.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3">Símbolos relacionados de {cat.name.toLowerCase()}</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/simbolos/${cat.slug}/${r.slug}`} className="rounded-lg border border-[color:var(--color-border)] hover:border-[color:var(--color-brand)] hover:bg-[color:var(--color-brand-soft)] transition p-3 text-center">
                  <div className="text-2xl mb-1">{r.char}</div>
                  <div className="text-[10px] text-[color:var(--color-fg-soft)] line-clamp-1">{r.name}</div>
                </Link>
              ))}
            </div>
            <Link href={`/simbolos/${cat.slug}`} className="inline-block mt-4 text-sm text-[color:var(--color-brand)] hover:underline font-bold">
              Ver todos los símbolos de {cat.name.toLowerCase()} →
            </Link>
          </section>
        )}
      </article>
    </>
  );
}
