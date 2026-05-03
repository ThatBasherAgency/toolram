"use client";
import { useMemo, useState } from "react";
import { Percent } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.65 0.2 50)";

type Mode = "of" | "is" | "change" | "tip";

export function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("of");
  const [a, setA] = useState("20");
  const [b, setB] = useState("150");

  const result = useMemo(() => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (isNaN(x) || isNaN(y)) return null;
    if (mode === "of") {
      return { value: (x / 100) * y, formula: `${x}% × ${y} = ${((x / 100) * y).toFixed(2)}`, explain: `${x}% de ${y} es ${((x / 100) * y).toFixed(2)}` };
    }
    if (mode === "is") {
      if (y === 0) return { value: 0, formula: "÷ 0", explain: "No se puede dividir entre 0" };
      return { value: (x / y) * 100, formula: `(${x} ÷ ${y}) × 100`, explain: `${x} es el ${((x / y) * 100).toFixed(2)}% de ${y}` };
    }
    if (mode === "change") {
      if (x === 0) return { value: 0, formula: "÷ 0", explain: "No se puede dividir entre 0" };
      const change = ((y - x) / x) * 100;
      return { value: change, formula: `((${y} - ${x}) ÷ ${x}) × 100`, explain: change >= 0 ? `Aumento del ${change.toFixed(2)}%` : `Disminución del ${Math.abs(change).toFixed(2)}%` };
    }
    return { value: x + (x * y) / 100, formula: `${x} + ${y}% = ${(x + (x * y) / 100).toFixed(2)}`, explain: `Total con propina: ${(x + (x * y) / 100).toFixed(2)}` };
  }, [mode, a, b]);

  const labels = {
    of: { a: "Porcentaje (%)", b: "Cantidad", title: "¿Cuánto es X% de Y?" },
    is: { a: "Cantidad", b: "Total", title: "¿Qué % representa X de Y?" },
    change: { a: "Valor inicial", b: "Valor final", title: "Variación porcentual" },
    tip: { a: "Cuenta", b: "Propina (%)", title: "Calcular propina" }
  };
  const l = labels[mode];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora de Porcentaje</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">4 modos: porcentaje de un número, qué porcentaje, variación porcentual y propina.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
          {(["of", "is", "change", "tip"] as Mode[]).map((m) => (
            <button key={m} onClick={() => setMode(m)} className="px-3 py-2.5 rounded-lg text-sm font-bold transition" style={mode === m ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>
              {m === "of" ? "X% de Y" : m === "is" ? "X es ?% de Y" : m === "change" ? "Variación %" : "Propina"}
            </button>
          ))}
        </div>

        <div className="text-center mb-4 text-lg font-bold">{l.title}</div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{l.a}</span>
            <input type="number" className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono tabular-nums focus:outline-none focus:border-[color:var(--color-brand)]" value={a} onChange={(e) => setA(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{l.b}</span>
            <input type="number" className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono tabular-nums focus:outline-none focus:border-[color:var(--color-brand)]" value={b} onChange={(e) => setB(e.target.value)} />
          </label>
        </div>
      </div>

      {result && (
        <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
          <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Percent className="w-3 h-3" /> Resultado</div>
          <div className="text-6xl md:text-7xl font-black tracking-tight tabular-nums">{result.value.toFixed(2)}{mode === "is" || mode === "change" ? "%" : ""}</div>
          <div className="mt-3 text-sm opacity-90 font-mono">{result.formula}</div>
          <div className="mt-2 text-base opacity-95">{result.explain}</div>
        </div>
      )}

      <AdSlot slot="pct_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📐 Fórmulas base</strong>
        <ul className="space-y-1 font-mono text-xs">
          <li>• <strong className="text-[color:var(--color-fg)] not-italic font-sans">X% de Y:</strong> (X/100) × Y</li>
          <li>• <strong className="text-[color:var(--color-fg)] not-italic font-sans">X es ?% de Y:</strong> (X/Y) × 100</li>
          <li>• <strong className="text-[color:var(--color-fg)] not-italic font-sans">Variación %:</strong> ((Final − Inicial) / Inicial) × 100</li>
          <li>• <strong className="text-[color:var(--color-fg)] not-italic font-sans">Propina:</strong> Total + (Total × Propina%/100)</li>
        </ul>
      </div>
    </div>
  );
}
