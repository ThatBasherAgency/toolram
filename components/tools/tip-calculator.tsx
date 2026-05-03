"use client";
import { useMemo, useState } from "react";
import { Utensils, Users } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.7 0.18 75)";

export function TipCalculator() {
  const [bill, setBill] = useState("500");
  const [tip, setTip] = useState(15);
  const [people, setPeople] = useState(2);
  const [currency, setCurrency] = useState("$");

  const result = useMemo(() => {
    const b = parseFloat(bill);
    if (!b || b <= 0) return null;
    const tipAmount = (b * tip) / 100;
    const total = b + tipAmount;
    const perPerson = total / people;
    const tipPerPerson = tipAmount / people;
    return { tipAmount, total, perPerson, tipPerPerson };
  }, [bill, tip, people]);

  const fmt = (n: number) => `${currency}${n.toLocaleString("es", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora de Propina</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Divide la cuenta entre amigos · Propina justa según el servicio.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 space-y-5">
        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Cuenta total</span>
          <div className="flex gap-2 mt-1.5">
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="px-3 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] font-bold">
              <option value="$">$</option><option value="€">€</option><option value="MX$">MX$</option><option value="AR$">AR$</option><option value="S/">S/</option><option value="COL$">COL$</option>
            </select>
            <input type="number" className="flex-1 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono tabular-nums focus:outline-none focus:border-[color:var(--color-brand)]" value={bill} onChange={(e) => setBill(e.target.value)} />
          </div>
        </label>

        <div>
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Propina: {tip}%</span>
          <input type="range" min="0" max="30" value={tip} onChange={(e) => setTip(+e.target.value)} className="w-full mt-2" />
          <div className="flex flex-wrap gap-2 mt-2">
            {[10, 12, 15, 18, 20, 25].map((v) => (
              <button key={v} onClick={() => setTip(v)} className="px-3 py-1 rounded-md text-xs font-medium transition" style={tip === v ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{v}%</button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] inline-flex items-center gap-1"><Users className="w-3 h-3" /> Personas: {people}</span>
          <div className="flex items-center gap-3 mt-2">
            <button onClick={() => setPeople(Math.max(1, people - 1))} className="w-10 h-10 rounded-lg bg-[color:var(--color-bg-soft)] font-bold text-xl">−</button>
            <input type="number" min="1" className="flex-1 px-4 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-center text-xl font-bold tabular-nums" value={people} onChange={(e) => setPeople(Math.max(1, +e.target.value))} />
            <button onClick={() => setPeople(people + 1)} className="w-10 h-10 rounded-lg bg-[color:var(--color-bg-soft)] font-bold text-xl">+</button>
          </div>
        </div>
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Utensils className="w-3 h-3" /> Cada persona paga</div>
            <div className="text-6xl md:text-7xl font-black tracking-tight">{fmt(result.perPerson)}</div>
            <div className="mt-6 grid grid-cols-3 gap-3 max-w-lg mx-auto text-sm">
              <div>
                <div className="text-xs opacity-80 uppercase">Total</div>
                <div className="text-lg font-extrabold">{fmt(result.total)}</div>
              </div>
              <div>
                <div className="text-xs opacity-80 uppercase">Propina</div>
                <div className="text-lg font-extrabold">{fmt(result.tipAmount)}</div>
              </div>
              <div>
                <div className="text-xs opacity-80 uppercase">Propina c/u</div>
                <div className="text-lg font-extrabold">{fmt(result.tipPerPerson)}</div>
              </div>
            </div>
          </div>

          <AdSlot slot="tip_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">🍽️ Propina recomendada por servicio</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">10-12%:</strong> Servicio aceptable, comida rápida</li>
          <li>• <strong className="text-[color:var(--color-fg)]">15%:</strong> Servicio estándar (referencia común en LATAM)</li>
          <li>• <strong className="text-[color:var(--color-fg)]">18-20%:</strong> Servicio muy bueno, restaurantes finos</li>
          <li>• <strong className="text-[color:var(--color-fg)]">25%+:</strong> Servicio excepcional o grupos grandes</li>
        </ul>
      </div>
    </div>
  );
}
