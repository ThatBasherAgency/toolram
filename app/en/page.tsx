import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { TOOLS } from "@/lib/tools-registry";
import { TOOL_EN } from "@/lib/i18n";

const POPULAR_EN = [
  "unir-pdf", "generador-qr", "contador-palabras", "cps-test", "json-formatter",
  "generador-passwords", "cronometro", "tiempo-reaccion", "base64-encode", "generador-uuid",
  "hash-md5-sha", "ruleta-decision"
];

export default function HomeEn() {
  const popular = POPULAR_EN.map((s) => TOOLS.find((t) => t.slug === s)).filter(Boolean) as typeof TOOLS;

  return (
    <>
      <section className="px-4 pt-12 pb-10 md:pt-20 md:pb-14 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5" /> 100+ free tools
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Online tools that actually <span className="text-[color:var(--color-brand)]">work</span>.
        </h1>
        <p className="text-lg md:text-xl text-[color:var(--color-fg-soft)] max-w-2xl mx-auto mb-6">
          PDF, SEO, AI, symbols, counters, converters. All free, no registration, processed in your browser when possible.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold">Most popular</h2>
          <Link href="/en/all-tools" className="text-sm text-[color:var(--color-brand)] inline-flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {popular.map((t) => {
            const en = TOOL_EN[t.slug];
            if (!en) return null;
            return (
              <Link key={t.slug} href={`/en/${t.slug}`} className="card group flex flex-col">
                <h3 className="font-semibold mb-1 group-hover:text-[color:var(--color-brand)]">{en.name}</h3>
                <p className="text-sm text-[color:var(--color-fg-soft)] flex-1">{en.shortDesc}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
        <div className="card">
          <Shield className="w-6 h-6 text-[color:var(--color-brand)] mb-3" />
          <h3 className="font-semibold mb-1">100% private</h3>
          <p className="text-sm text-[color:var(--color-fg-soft)]">Most tools process your data in your browser. Your files never leave your computer.</p>
        </div>
        <div className="card">
          <Zap className="w-6 h-6 text-[color:var(--color-brand)] mb-3" />
          <h3 className="font-semibold mb-1">Lightning fast</h3>
          <p className="text-sm text-[color:var(--color-fg-soft)]">No upload waiting. Instant results. Many tools work offline.</p>
        </div>
        <div className="card">
          <Sparkles className="w-6 h-6 text-[color:var(--color-brand)] mb-3" />
          <h3 className="font-semibold mb-1">No registration, no intrusive ads</h3>
          <p className="text-sm text-[color:var(--color-fg-soft)]">Start using any tool instantly. No email, no popups.</p>
        </div>
      </section>
    </>
  );
}
