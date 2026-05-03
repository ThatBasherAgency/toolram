"use client";
import { useMemo, useState } from "react";
import { Receipt } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 35)";

const PRESETS = [
  { label: "México 16%", v: 16 },
  { label: "España 21%", v: 21 },
  { label: "Argentina 21%", v: 21 },
  { label: "Chile 19%", v: 19 },
  { label: "Perú 18%", v: 18 },
  { label: "Colombia 19%", v: 19 },
  { label: "Uruguay 22%", v: 22 },
  { label: "Ecuador 15%", v: 15 }
];

export function IvaCalculator() {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState(16);
  const [includes, setIncludes] = useState<"add" | "extract">("add");
  const [currency, setCurrency] = useState("$");

  const result = useMemo(() => {
    const a = parseFloat(amount);
    if (!a || a <= 0) return null;
    if (includes === "add") {
      const tax = (a * rate) / 100;
      return { base: a, tax, total: a + tax };
    } else {
      const base = a / (1 + rate / 100);
      const tax = a - base;
      return { base, tax, total: a };
    }
  }, [amount, rate, includes]);

  const fmt = (n: number) => `${currency}${n.toLocaleString("es", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora de IVA</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Sumar IVA o extraerlo del precio final · Tasas preconfiguradas para 8 países.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <div className="inline-flex rounded-xl bg-[color:var(--color-bg-soft)] p-1 mb-5">
          {(["add", "extract"] as const).map((m) => (
            <button key={m} onClick={() => setIncludes(m)} className="px-4 py-2 rounded-lg text-sm font-bold transition" style={includes === m ? { background: ACCENT, color: "white" } : {}}>
              {m === "add" ? "Sumar IVA" : "Extraer IVA"}
            </button>
          ))}
        </div>

        <label className="block mb-4">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{includes === "add" ? "Subtotal (sin IVA)" : "Total (con IVA)"}</span>
          <div className="flex gap-2 mt-1.5">
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="px-3 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] font-bold">
              <option value="$">$</option><option value="€">€</option><option value="MX$">MX$</option><option value="AR$">AR$</option><option value="CLP$">CLP$</option><option value="S/">S/</option><option value="COL$">COL$</option>
            </select>
            <input type="number" className="flex-1 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono tabular-nums focus:outline-none focus:border-[color:var(--color-brand)]" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
        </label>

        <div className="mb-3">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Tasa IVA: {rate}%</span>
          <input type="range" min="0" max="30" step="0.5" value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full mt-2" />
        </div>

        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => setRate(p.v)} className="px-3 py-1 rounded-md text-xs font-medium transition" style={rate === p.v ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{p.label}</button>
          ))}
        </div>
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Receipt className="w-3 h-3" /> Total con IVA {rate}%</div>
            <div className="text-6xl md:text-7xl font-black tracking-tight">{fmt(result.total)}</div>
            <div className="mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div>
                <div className="text-xs opacity-80 uppercase">Subtotal</div>
                <div className="text-xl font-extrabold">{fmt(result.base)}</div>
              </div>
              <div>
                <div className="text-xs opacity-80 uppercase">IVA ({rate}%)</div>
                <div className="text-xl font-extrabold">{fmt(result.tax)}</div>
              </div>
            </div>
          </div>

          <AdSlot slot="iva_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">💡 IVA en hispanoamérica</strong>
        El IVA (Impuesto al Valor Agregado) varía por país: México 16%, España 21% (4% reducido y 10% intermedio), Argentina 21%, Chile 19%, Perú 18% (IGV), Colombia 19%, Uruguay 22%. Algunas categorías (alimentos, libros, medicinas) tienen tasas reducidas o están exentas.
      </div>
    </div>
  );
}
