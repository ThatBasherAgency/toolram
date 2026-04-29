import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { POSTS } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog — Toolram",
  description: "Guías técnicas y comparativas honestas: PDF, SEO, calculadoras, gaming, productividad. Sin clickbait, todo verificable.",
  alternates: { canonical: "/blog" }
};

export default function BlogIndex() {
  const sorted = [...POSTS].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog Toolram</h1>
        <p className="text-lg text-[color:var(--color-fg-soft)]">
          Guías técnicas, comparativas honestas y análisis sobre las herramientas que usás a diario. Sin clickbait, sin contenido AI sin editar, sin "in today's digital world".
        </p>
      </header>
      <div className="space-y-5">
        {sorted.map((p) => (
          <Link key={p.slug} href={`/${p.slug}`} className="card group block">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)]">{p.category}</span>
              <span className="text-xs text-[color:var(--color-fg-soft)] inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {p.estimatedReadMinutes} min</span>
              <span className="text-xs text-[color:var(--color-fg-soft)]">{new Date(p.publishedAt).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-[color:var(--color-brand)] leading-tight">{p.title}</h2>
            <p className="text-sm text-[color:var(--color-fg-soft)]">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
