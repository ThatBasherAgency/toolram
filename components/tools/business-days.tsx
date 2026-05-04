"use client";
import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 145)";

export function BusinessDays() {
  const [start, setStart] = useState(new Date().toISOString().slice(0, 10));
  const [days, setDays] = useState("10");
  const [excludeSat, setExcludeSat] = useState(true);

  const result = useMemo(() => {
    const s = new Date(start);
    const target = parseInt(days);
    if (isNaN(s.getTime()) || isNaN(target) || target === 0) return null;
    let d = new Date(s);
    let count = 0;
    const dir = target > 0 ? 1 : -1;
    while (count < Math.abs(target)) {
      d.setDate(d.getDate() + dir);
      const day = d.getDay();
      if (day !== 0 && (!excludeSat || day !== 6)) count++;
    }
    return { resultDate: d, totalDaysCalendar: Math.abs(Math.floor((d.getTime() - s.getTime()) / 86400000)) };
  }, [start, days, excludeSat]);

  const fmt = (d: Date) => d.toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora de Días Laborables</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Suma o resta días hábiles a una fecha · Excluye fines de semana · Para deadlines y plazos.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6 space-y-3">
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Fecha inicio</span>
          <input type="date" className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono" value={start} onChange={(e) => setStart(e.target.value)} /></label>
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Días laborables (negativo = restar)</span>
          <input type="number" className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono tabular-nums text-center font-bold" value={days} onChange={(e) => setDays(e.target.value)} /></label>
        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-bg-soft)] cursor-pointer text-sm">
          <input type="checkbox" checked={excludeSat} onChange={(e) => setExcludeSat(e.target.checked)} /> Excluir sábados (lunes a viernes únicamente)
        </label>
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 inline-flex items-center gap-1.5"><CalendarDays className="w-3 h-3" /> Fecha resultante</div>
            <div className="text-3xl md:text-4xl font-black mt-2 capitalize">{fmt(result.resultDate)}</div>
            <div className="text-base opacity-90 mt-2">{result.totalDaysCalendar} días calendario en total</div>
          </div>
          <AdSlot slot="bizdays_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📅 Limitación</strong>
        Esta calculadora considera solo fines de semana. NO incluye feriados nacionales ni regionales. Para deadlines legales, sumá días extra de buffer si hay feriados en el rango.
      </div>
    </div>
  );
}
