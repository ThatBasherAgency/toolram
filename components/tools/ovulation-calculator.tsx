"use client";
import { useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.65 0.22 350)";

function addDays(date: Date, days: number): Date { const d = new Date(date); d.setDate(d.getDate() + days); return d; }

export function OvulationCalculator() {
  const [lastPeriod, setLastPeriod] = useState(new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
  const [cycleLength, setCycleLength] = useState(28);

  const result = useMemo(() => {
    const d = new Date(lastPeriod);
    if (isNaN(d.getTime())) return null;
    const ovulationDay = addDays(d, cycleLength - 14);
    const fertileStart = addDays(ovulationDay, -5);
    const fertileEnd = addDays(ovulationDay, 1);
    const nextPeriod = addDays(d, cycleLength);
    return { ovulationDay, fertileStart, fertileEnd, nextPeriod };
  }, [lastPeriod, cycleLength]);

  const fmt = (d: Date) => d.toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora de Ovulación</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Días fértiles, día de ovulación y próxima menstruación · Ciclos de 21 a 45 días.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 space-y-4">
        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Primer día de tu última regla</span>
          <input type="date" className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-mono" value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Duración de tu ciclo: {cycleLength} días</span>
          <input type="range" min="21" max="45" value={cycleLength} onChange={(e) => setCycleLength(+e.target.value)} className="w-full mt-2" />
          <div className="flex justify-between text-[10px] text-[color:var(--color-fg-soft)]"><span>21</span><span>28 (promedio)</span><span>45</span></div>
        </label>
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Heart className="w-3 h-3" /> Día de ovulación</div>
            <div className="text-3xl md:text-4xl font-black mb-2 capitalize">{fmt(result.ovulationDay)}</div>
            <div className="text-sm opacity-90">Tu día más fértil</div>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-6">
            <div className="rounded-2xl bg-[color:var(--color-success)]/15 border-2 border-[color:var(--color-success)]/40 p-4 text-center">
              <div className="text-xs font-bold uppercase text-[color:var(--color-success)] mb-1">Inicio fértil</div>
              <div className="text-base font-bold capitalize">{fmt(result.fertileStart)}</div>
            </div>
            <div className="rounded-2xl text-white p-4 text-center" style={{ background: ACCENT }}>
              <div className="text-xs font-bold uppercase opacity-90 mb-1">Ovulación</div>
              <div className="text-base font-bold capitalize">{fmt(result.ovulationDay)}</div>
            </div>
            <div className="rounded-2xl bg-[color:var(--color-success)]/15 border-2 border-[color:var(--color-success)]/40 p-4 text-center">
              <div className="text-xs font-bold uppercase text-[color:var(--color-success)] mb-1">Fin fértil</div>
              <div className="text-base font-bold capitalize">{fmt(result.fertileEnd)}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 mb-6">
            <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-1">Próxima regla esperada</div>
            <div className="text-xl font-bold capitalize">{fmt(result.nextPeriod)}</div>
          </div>

          <AdSlot slot="ovu_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">💡 Sobre la ovulación</strong>
        <ul className="space-y-1">
          <li>• La <strong className="text-[color:var(--color-fg)]">ventana fértil</strong> es de 6 días: 5 antes + día de ovulación.</li>
          <li>• Los espermatozoides sobreviven hasta 5 días en el cuerpo; el óvulo solo 12-24h.</li>
          <li>• Para <strong className="text-[color:var(--color-fg)]">buscar embarazo:</strong> relaciones cada 1-2 días en la ventana fértil.</li>
          <li>• Para <strong className="text-[color:var(--color-fg)]">evitar embarazo:</strong> NO uses solo el método del calendario — falla 24% al año.</li>
          <li>• Calculadora orientativa basada en ciclos regulares. Ciclos irregulares requieren tracking más preciso (test de LH, BBT).</li>
        </ul>
      </div>
    </div>
  );
}
