import type { Metadata } from "next";
import Link from "next/link";
import { ALTERNATIVES } from "@/data/alternatives";

export const metadata: Metadata = {
  title: "Alternativas a las herramientas online más populares",
  description: "Comparativas honestas: alternativas a iLovePDF, SmallPDF, SmallSEOTools, PiliApp y Canva PDF. Pros, contras, precios y recomendaciones.",
  alternates: { canonical: "/alternativas" }
};

export default function AlternativesIndex() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Alternativas a las herramientas más populares</h1>
      <p className="text-lg text-[color:var(--color-fg-soft)] mb-8">
        Comparativas honestas y actualizadas — incluyendo cuándo el competidor sigue siendo mejor opción que Toolram.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {ALTERNATIVES.map((a) => (
          <Link key={a.slug} href={`/${a.slug}`} className="card group">
            <h3 className="font-semibold mb-1 group-hover:text-[color:var(--color-brand)]">Alternativas a {a.competitor}</h3>
            <p className="text-sm text-[color:var(--color-fg-soft)]">{a.shortDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
