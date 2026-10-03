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
      {/* 27-sep-2026 - JEV-010: esta pagina pasaba del h1 al h3 de las tarjetas sin h2 por
          medio (1 de las 3 paginas con salto de nivel en la auditoria). El h2 de seccion
          cierra el hueco y repite el patron que ya usan /herramientas y la portada. */}
      <h2 className="text-2xl font-bold mb-4">Todas las calculadoras</h2>
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
