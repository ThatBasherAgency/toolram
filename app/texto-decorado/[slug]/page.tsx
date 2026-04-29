import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { FANCY_BY_SLUG, FANCY_STYLES } from "@/lib/fancy-text";
import { FancyTextGenerator } from "@/components/tools/fancy-text";

export function generateStaticParams() {
  return FANCY_STYLES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = FANCY_BY_SLUG[slug];
  if (!s) return {};
  return {
    title: `Generador de texto ${s.name.toLowerCase()}`,
    description: s.description,
    alternates: { canonical: `/texto-decorado/${s.slug}` }
  };
}

export default async function FancyStylePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = FANCY_BY_SLUG[slug];
  if (!s) notFound();
  return (
    <article className="max-w-5xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-1.5 text-xs text-[color:var(--color-fg-soft)] mb-4">
        <Link href="/" className="hover:text-[color:var(--color-brand)] inline-flex items-center gap-1"><Home className="w-3 h-3" /> Inicio</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/texto-decorado" className="hover:text-[color:var(--color-brand)]">Texto decorado</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[color:var(--color-fg)]">{s.name}</span>
      </nav>
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Generador {s.name}</h1>
        <p className="text-lg text-[color:var(--color-fg-soft)]">{s.description}</p>
        <div className="text-3xl mt-3 select-all break-words">{s.preview}</div>
      </header>
      <div className="card !p-4 md:!p-6">
        <FancyTextGenerator initialStyle={s.slug} />
      </div>
    </article>
  );
}
