import type { Metadata } from "next";
import Link from "next/link";
import { CALCULATORS } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Calculadoras online gratis",
  description: "Calculadoras de IMC, edad, préstamos, descuentos, propinas, interés compuesto, IVA, ovulación, TDEE y más. Todas gratis y sin registro.",
  alternates: { canonical: "/calculadoras" }
};

export default function CalcsIndex() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Calculadoras online</h1>
      <p className="text-lg text-[color:var(--color-fg-soft)] mb-8">{CALCULATORS.length} calculadoras gratis para resolver problemas comunes.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CALCULATORS.map((c) => (
          <Link key={c.slug} href={`/${c.slug}`} className="card group">
            <h3 className="font-semibold mb-1 group-hover:text-[color:var(--color-brand)]">{c.name}</h3>
            <p className="text-sm text-[color:var(--color-fg-soft)]">{c.shortDesc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
