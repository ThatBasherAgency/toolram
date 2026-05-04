"use client";
import { useMemo, useState } from "react";
import { Calendar } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 25)";

export function DateDifference() {
  const [start, setStart] = useState(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
  const [end, setEnd] = useState(new Date().toISOString().slice(0, 10));
  const [excludeWeekends, setExcludeWeekends] = useState(false);

  const result = useMemo(() => {
    const a = new Date(start);
    const b = new Date(end);
    if (isNaN(a.getTime()) || isNaN(b.getTime())) return null;
    const ms = b.getTime() - a.getTime();
    const days = Math.round(ms / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(Math.abs(days) / 7);
    const months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
    const years = b.getFullYear() - a.getFullYear();

    let workdays = 0;
    if (excludeWeekends) {
      const cur = new Date(a);
      while (cur <= b) {
        const day = cur.getDay();
        if (day !== 0 && day !== 6) workdays++;
        cur.setDate(cur.getDate() + 1);
      }
    }
    return { days, weeks, months, years, workdays, hours: days * 24, minutes: days * 24 * 60, seconds: days * 24 * 60 * 60 };
  }, [start, end, excludeWeekends]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Días Entre Dos Fechas</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Calcula días, semanas, meses, años entre 2 fechas · Opción "días laborables" (sin fin de semana).</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 grid md:grid-cols-2 gap-4">
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Fecha inicio</span>
          <input type="date" className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono" value={start} onChange={(e) => setStart(e.target.value)} /></label>
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Fecha fin</span>
          <input type="date" className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono" value={end} onChange={(e) => setEnd(e.target.value)} /></label>
        <label className="md:col-span-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-bg-soft)] cursor-pointer text-sm">
          <input type="checkbox" checked={excludeWeekends} onChange={(e) => setExcludeWeekends(e.target.checked)} /> Calcular solo días laborables (excluir sábado y domingo)
        </label>
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Diferencia</div>
            <div className="text-7xl md:text-8xl font-black tabular-nums">{Math.abs(result.days)}</div>
            <div className="text-2xl font-bold mt-2">días{excludeWeekends ? ` (${result.workdays} laborables)` : ""}</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { l: "Semanas", v: result.weeks },
              { l: "Meses", v: result.months },
              { l: "Años", v: result.years },
              { l: "Horas", v: result.hours.toLocaleString() },
              { l: "Minutos", v: result.minutes.toLocaleString() },
              { l: "Segundos", v: result.seconds.toLocaleString() },
              ...(excludeWeekends ? [{ l: "Días lab.", v: result.workdays }] : []),
              { l: "Total días", v: result.days }
            ].map((m, i) => (
              <div key={i} className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 text-center">
                <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{m.l}</div>
                <div className="text-xl font-extrabold tabular-nums mt-1">{m.v}</div>
              </div>
            ))}
          </div>

          <AdSlot slot="datediff_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📅 Casos de uso</strong>
        <ul className="space-y-1">
          <li>• Días desde tu cumpleaños o hasta una fecha importante</li>
          <li>• Cálculo de antigüedad laboral</li>
          <li>• Días laborables para deadlines (sin contar fines de semana)</li>
          <li>• Dosis/medicamentos: cuántos días faltan o pasaron</li>
          <li>• Embarazo, viajes, vencimientos</li>
        </ul>
      </div>
    </div>
  );
}
