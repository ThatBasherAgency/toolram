"use client";
import { useMemo, useState } from "react";
import { Tag, ShoppingBag } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 320)";

export function DiscountCalculator() {
  const [original, setOriginal] = useState("1000");
  const [discount, setDiscount] = useState(20);
  const [extra, setExtra] = useState(0);
  const [tax, setTax] = useState(0);
  const [currency, setCurrency] = useState("$");

  const result = useMemo(() => {
    const o = parseFloat(original);
    if (!o || o <= 0) return null;
    const firstPrice = o * (1 - discount / 100);
    const finalAfterExtra = firstPrice * (1 - extra / 100);
    const totalDiscountPct = ((o - finalAfterExtra) / o) * 100;
    const taxAmount = (finalAfterExtra * tax) / 100;
    const final = finalAfterExtra + taxAmount;
    const savings = o - finalAfterExtra;
    return { firstPrice, finalAfterExtra, totalDiscountPct, taxAmount, final, savings };
  }, [original, discount, extra, tax]);

  const fmt = (n: number) => `${currency}${n.toLocaleString("es", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora de Descuento</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Precio final con descuento + descuento extra + impuestos · Cuánto ahorras realmente.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 space-y-5">
        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Precio original</span>
          <div className="flex gap-2 mt-1.5">
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="px-3 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] font-bold">
              <option value="$">$</option><option value="€">€</option><option value="MX$">MX$</option><option value="AR$">AR$</option><option value="S/">S/</option>
            </select>
            <input type="number" className="flex-1 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono tabular-nums focus:outline-none focus:border-[color:var(--color-brand)]" value={original} onChange={(e) => setOriginal(e.target.value)} />
          </div>
        </label>

        <div>
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Descuento principal: {discount}%</span>
          <input type="range" min="0" max="90" value={discount} onChange={(e) => setDiscount(+e.target.value)} className="w-full mt-2" />
          <div className="flex flex-wrap gap-2 mt-2">
            {[10, 20, 30, 40, 50, 70].map((v) => (
              <button key={v} onClick={() => setDiscount(v)} className="px-3 py-1 rounded-md text-xs font-medium transition" style={discount === v ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{v}% OFF</button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Descuento extra (cupón): {extra}%</span>
          <input type="range" min="0" max="50" value={extra} onChange={(e) => setExtra(+e.target.value)} className="w-full mt-2" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Impuesto/IVA aplicado: {tax}%</span>
          <input type="range" min="0" max="30" value={tax} onChange={(e) => setTax(+e.target.value)} className="w-full mt-2" />
        </div>
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Tag className="w-3 h-3" /> Pagas en total</div>
            <div className="text-6xl md:text-7xl font-black tracking-tight line-through opacity-50 text-2xl md:text-3xl">{fmt(parseFloat(original))}</div>
            <div className="text-6xl md:text-7xl font-black tracking-tight">{fmt(result.final)}</div>
            <div className="mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div>
                <div className="text-xs opacity-80 uppercase">Ahorro total</div>
                <div className="text-xl font-extrabold">{fmt(result.savings)}</div>
              </div>
              <div>
                <div className="text-xs opacity-80 uppercase">Descuento real</div>
                <div className="text-xl font-extrabold">{result.totalDiscountPct.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <AdSlot slot="discount_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">💡 OJO con los descuentos compuestos</strong>
        Un 50% + 20% extra NO es 70% de descuento. Es 60%: el segundo descuento se aplica sobre el precio ya rebajado. Ejemplo: $100 con 50% = $50, luego 20% sobre $50 = $40. Total ahorrado: 60%, no 70%.
      </div>
    </div>
  );
}
