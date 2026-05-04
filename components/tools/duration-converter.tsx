"use client";
import { useMemo, useState } from "react";
import { Clock } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 240)";

const UNITS = {
  ms: 0.001, s: 1, min: 60, h: 3600, d: 86400, semana: 604800, mes: 2629746, año: 31556952
};

export function DurationConverter() {
  const [val, setVal] = useState("90");
  const [unit, setUnit] = useState<keyof typeof UNITS>("min");

  const result = useMemo(() => {
    const v = parseFloat(val);
    if (!v) return null;
    const seconds = v * UNITS[unit];
    return {
      ms: seconds * 1000, s: seconds, min: seconds / 60, h: seconds / 3600,
      d: seconds / 86400, semana: seconds / 604800, mes: seconds / 2629746, año: seconds / 31556952,
      readable: humanReadable(seconds)
    };
  }, [val, unit]);

  function humanReadable(seconds: number): string {
    if (seconds < 60) return `${Math.round(seconds)} segundos`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
    if (seconds < 86400) {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      return `${h}h ${m}m`;
    }
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    return `${d} días${h > 0 ? ` ${h}h` : ""}`;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Conversor de Duración</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Convertí entre milisegundos, segundos, minutos, horas, días, semanas, meses y años.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6 grid grid-cols-2 gap-3">
        <input type="number" className="px-3 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono tabular-nums" value={val} onChange={(e) => setVal(e.target.value)} />
        <select value={unit} onChange={(e) => setUnit(e.target.value as keyof typeof UNITS)} className="px-3 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-bold">
          {Object.keys(UNITS).map((u) => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 inline-flex items-center gap-1.5"><Clock className="w-3 h-3" /> Equivale a</div>
            <div className="text-5xl md:text-6xl font-black mt-2">{result.readable}</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {[
              { l: "ms", v: result.ms.toLocaleString() },
              { l: "segundos", v: result.s.toLocaleString() },
              { l: "minutos", v: result.min.toFixed(2) },
              { l: "horas", v: result.h.toFixed(2) },
              { l: "días", v: result.d.toFixed(3) },
              { l: "semanas", v: result.semana.toFixed(3) },
              { l: "meses", v: result.mes.toFixed(4) },
              { l: "años", v: result.año.toFixed(5) }
            ].map((m) => (
              <div key={m.l} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-3">
                <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{m.l}</div>
                <div className="font-mono text-lg font-bold tabular-nums break-all">{m.v}</div>
              </div>
            ))}
          </div>

          <AdSlot slot="duration_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}
    </div>
  );
}
