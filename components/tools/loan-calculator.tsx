"use client";
import { useMemo, useState } from "react";
import { DollarSign, TrendingDown } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 165)";

export function LoanCalculator() {
  const [amount, setAmount] = useState("100000");
  const [years, setYears] = useState("20");
  const [rate, setRate] = useState("8.5");
  const [currency, setCurrency] = useState("$");

  const result = useMemo(() => {
    const P = parseFloat(amount);
    const n = parseFloat(years) * 12;
    const r = parseFloat(rate) / 100 / 12;
    if (!P || !n || P <= 0 || n <= 0 || isNaN(r)) return null;
    let monthly: number;
    if (r === 0) {
      monthly = P / n;
    } else {
      monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    const total = monthly * n;
    const interest = total - P;
    const breakdown: { month: number; payment: number; principal: number; interestPaid: number; balance: number }[] = [];
    let balance = P;
    for (let i = 1; i <= Math.min(n, 360); i++) {
      const interestPaid = balance * r;
      const principal = monthly - interestPaid;
      balance -= principal;
      if (i <= 12 || i % 12 === 0 || i === n) {
        breakdown.push({ month: i, payment: monthly, principal, interestPaid, balance: Math.max(0, balance) });
      }
    }
    return { monthly, total, interest, breakdown };
  }, [amount, years, rate]);

  const fmt = (n: number) => `${currency}${n.toLocaleString("es", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora de Préstamo</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Cuota mensual, intereses totales y tabla de amortización · Fórmula francesa.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <label className="block md:col-span-2">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Monto del préstamo</span>
            <div className="flex gap-2 mt-1.5">
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="px-3 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] font-bold">
                <option value="$">$</option><option value="€">€</option><option value="£">£</option><option value="MX$">MX$</option><option value="AR$">AR$</option><option value="CLP$">CLP$</option><option value="S/">S/</option><option value="COL$">COL$</option>
              </select>
              <input type="number" className="flex-1 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono tabular-nums focus:outline-none focus:border-[color:var(--color-brand)]" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Plazo (años)</span>
            <input type="number" className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono tabular-nums focus:outline-none focus:border-[color:var(--color-brand)]" value={years} onChange={(e) => setYears(e.target.value)} />
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Tasa de interés anual (%): {rate}%</span>
          <input type="range" min="0" max="30" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full mt-2" />
          <div className="flex justify-between text-[10px] text-[color:var(--color-fg-soft)]">
            <span>0%</span><span>10%</span><span>20%</span><span>30%</span>
          </div>
        </label>
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><DollarSign className="w-3 h-3" /> Cuota mensual</div>
            <div className="text-6xl md:text-7xl font-black tracking-tight">{fmt(result.monthly)}</div>
            <div className="mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div>
                <div className="text-xs opacity-80 uppercase">Total a pagar</div>
                <div className="text-xl font-extrabold">{fmt(result.total)}</div>
              </div>
              <div>
                <div className="text-xs opacity-80 uppercase">Intereses totales</div>
                <div className="text-xl font-extrabold">{fmt(result.interest)}</div>
              </div>
            </div>
          </div>

          <AdSlot slot="loan_inline" format="auto" minHeight={180} className="mb-6" />

          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-6">
            <div className="font-bold mb-3 inline-flex items-center gap-2"><TrendingDown className="w-4 h-4" /> Tabla de amortización (resumen)</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs font-bold text-[color:var(--color-fg-soft)] uppercase border-b border-[color:var(--color-border)]">
                  <tr><th className="text-left py-2">Mes</th><th className="text-right py-2">Cuota</th><th className="text-right py-2">Capital</th><th className="text-right py-2">Interés</th><th className="text-right py-2">Saldo</th></tr>
                </thead>
                <tbody className="font-mono tabular-nums text-xs">
                  {result.breakdown.map((r) => (
                    <tr key={r.month} className="border-b border-[color:var(--color-border)]/40">
                      <td className="py-1.5">{r.month}</td>
                      <td className="text-right">{fmt(r.payment)}</td>
                      <td className="text-right text-[color:var(--color-success)]">{fmt(r.principal)}</td>
                      <td className="text-right text-[color:var(--color-danger)]">{fmt(r.interestPaid)}</td>
                      <td className="text-right">{fmt(r.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">💡 Fórmula del sistema francés</strong>
        <code className="block bg-[color:var(--color-bg)] px-3 py-2 rounded mb-2 text-[color:var(--color-fg)]">cuota = P × (r × (1+r)ⁿ) / ((1+r)ⁿ − 1)</code>
        Donde P = capital, r = tasa mensual (anual ÷ 12), n = número de cuotas. La cuota es fija pero la composición capital/interés varía: al inicio se paga más interés, al final más capital.
      </div>
    </div>
  );
}
