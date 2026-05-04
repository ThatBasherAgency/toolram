"use client";
import { useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 145)";

export function CompoundInterest() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("8");
  const [years, setYears] = useState("10");
  const [contribution, setContribution] = useState("500");
  const [frequency, setFrequency] = useState(12);
  const [currency, setCurrency] = useState("$");

  const result = useMemo(() => {
    const P = parseFloat(principal) || 0;
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const PMT = parseFloat(contribution) || 0;
    if (!P || !t) return null;
    const n = frequency;
    const yearly: { year: number; balance: number; contributed: number; interest: number }[] = [];
    let balance = P;
    let contributed = P;
    for (let year = 1; year <= t; year++) {
      for (let i = 0; i < n; i++) {
        balance = balance * (1 + r / n) + PMT;
        contributed += PMT;
      }
      yearly.push({ year, balance, contributed, interest: balance - contributed });
    }
    return { final: balance, contributed, interest: balance - contributed, yearly };
  }, [principal, rate, years, contribution, frequency]);

  const fmt = (n: number) => `${currency}${n.toLocaleString("es", { maximumFractionDigits: 0 })}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora de Interés Compuesto</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">El poder del interés compuesto · Aportes mensuales + capitalización · Crecimiento exponencial.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 grid md:grid-cols-2 gap-4">
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Capital inicial</span>
          <div className="flex gap-1 mt-1"><select value={currency} onChange={(e) => setCurrency(e.target.value)} className="px-2 py-2 rounded-md border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] font-bold"><option>$</option><option>€</option><option>MX$</option><option>AR$</option></select><input type="number" className="flex-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono tabular-nums" value={principal} onChange={(e) => setPrincipal(e.target.value)} /></div></label>
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Aporte mensual</span>
          <input type="number" className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono tabular-nums" value={contribution} onChange={(e) => setContribution(e.target.value)} /></label>
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Tasa anual: {rate}%</span>
          <input type="range" min="0" max="30" step="0.5" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full mt-2" /></label>
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Años: {years}</span>
          <input type="range" min="1" max="50" value={years} onChange={(e) => setYears(e.target.value)} className="w-full mt-2" /></label>
        <div className="md:col-span-2"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-1">Capitalización</span>
          <div className="grid grid-cols-4 gap-1">
            {[{n:1,l:"Anual"},{n:2,l:"Semestral"},{n:4,l:"Trimestral"},{n:12,l:"Mensual"}].map(o=><button key={o.n} onClick={()=>setFrequency(o.n)} className="px-2 py-1.5 rounded-md text-xs font-bold transition" style={frequency===o.n?{background:ACCENT,color:"white"}:{background:"var(--color-bg-soft)"}}>{o.l}</button>)}
          </div>
        </div>
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><TrendingUp className="w-3 h-3" /> Capital final en {years} años</div>
            <div className="text-6xl md:text-7xl font-black tabular-nums">{fmt(result.final)}</div>
            <div className="mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div><div className="text-xs opacity-80 uppercase">Aportado</div><div className="text-xl font-extrabold">{fmt(result.contributed)}</div></div>
              <div><div className="text-xs opacity-80 uppercase">Generado por interés</div><div className="text-xl font-extrabold">+{fmt(result.interest)}</div></div>
            </div>
          </div>

          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-6 overflow-x-auto">
            <div className="font-bold mb-3">📈 Crecimiento año por año</div>
            <table className="w-full text-sm">
              <thead className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] border-b border-[color:var(--color-border)]"><tr><th className="text-left py-2">Año</th><th className="text-right">Aportado</th><th className="text-right">Interés</th><th className="text-right">Saldo</th></tr></thead>
              <tbody className="font-mono tabular-nums text-xs">{result.yearly.map(y=><tr key={y.year} className="border-b border-[color:var(--color-border)]/40"><td className="py-1.5">{y.year}</td><td className="text-right">{fmt(y.contributed)}</td><td className="text-right text-[color:var(--color-success)]">+{fmt(y.interest)}</td><td className="text-right font-bold">{fmt(y.balance)}</td></tr>)}</tbody>
            </table>
          </div>

          <AdSlot slot="ci_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">💰 La regla del 72</strong>
        Tu dinero se duplica en aproximadamente 72/tasa años. Ejemplo: a 8% anual, se duplica en 9 años. A 12%, en 6 años. Empezá joven — el tiempo es el factor más importante en interés compuesto.
      </div>
    </div>
  );
}
