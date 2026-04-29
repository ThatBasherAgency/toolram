import type { Metadata } from "next";
import Link from "next/link";
import { SYMBOL_CATEGORIES } from "@/data/symbols";

export const metadata: Metadata = {
  title: "Símbolos para copiar y pegar",
  description: "Copia y pega corazones ❤, estrellas ★, flechas →, símbolos matemáticos, monedas, música y más. 200+ símbolos Unicode listos para usar.",
  alternates: { canonical: "/simbolos" }
};

export default function SymbolsIndex() {
  const total = SYMBOL_CATEGORIES.reduce((acc, c) => acc + c.symbols.length, 0);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Símbolos para copiar y pegar</h1>
      <p className="text-lg text-[color:var(--color-fg-soft)] mb-8">{total}+ símbolos Unicode organizados por categoría. Toca cualquier símbolo para copiarlo.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {SYMBOL_CATEGORIES.map((cat) => (
          <Link key={cat.slug} href={`/simbolos/${cat.slug}`} className="card group">
            <div className="text-4xl mb-2">{cat.emoji}</div>
            <div className="font-semibold mb-1 group-hover:text-[color:var(--color-brand)]">{cat.name}</div>
            <div className="text-xs text-[color:var(--color-fg-soft)] mb-2">{cat.symbols.length} símbolos</div>
            <div className="flex gap-1 flex-wrap text-xl">
              {cat.symbols.slice(0, 6).map((s, i) => <span key={i}>{s.char}</span>)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
