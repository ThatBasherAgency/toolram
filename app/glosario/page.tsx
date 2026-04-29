import type { Metadata } from "next";
import Link from "next/link";
import { GLOSSARY } from "@/data/glossary";

export const metadata: Metadata = {
  title: "Glosario técnico — Toolram",
  description: "Glosario claro y conciso de términos técnicos: Base64, MD5, UUID, JWT, IMC, TDEE, IVA, Regex, HTTPS, CORS, Schema markup y más.",
  alternates: { canonical: "/glosario" }
};

export default function GlossaryIndex() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Glosario técnico</h1>
      <p className="text-lg text-[color:var(--color-fg-soft)] mb-8">
        Definiciones claras, ejemplos reales y casos de uso de los términos técnicos más buscados. Sin jerga innecesaria.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {GLOSSARY.map((g) => (
          <Link key={g.slug} href={`/${g.slug}`} className="card group">
            <h3 className="font-semibold mb-1 group-hover:text-[color:var(--color-brand)]">{g.term}</h3>
            <p className="text-sm text-[color:var(--color-fg-soft)]">{g.shortDef}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
