"use client";
import { useEffect, useState } from "react";
import { Globe, Clock, Plus, Trash2 } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 240)";

const ZONES = [
  { tz: "America/Mexico_City", name: "🇲🇽 CDMX" },
  { tz: "America/Argentina/Buenos_Aires", name: "🇦🇷 Buenos Aires" },
  { tz: "America/Santiago", name: "🇨🇱 Santiago" },
  { tz: "America/Lima", name: "🇵🇪 Lima" },
  { tz: "America/Bogota", name: "🇨🇴 Bogotá" },
  { tz: "America/Caracas", name: "🇻🇪 Caracas" },
  { tz: "America/Sao_Paulo", name: "🇧🇷 São Paulo" },
  { tz: "Europe/Madrid", name: "🇪🇸 Madrid" },
  { tz: "Europe/London", name: "🇬🇧 Londres" },
  { tz: "Europe/Paris", name: "🇫🇷 París" },
  { tz: "Europe/Berlin", name: "🇩🇪 Berlín" },
  { tz: "America/New_York", name: "🇺🇸 Nueva York" },
  { tz: "America/Los_Angeles", name: "🇺🇸 Los Ángeles" },
  { tz: "America/Chicago", name: "🇺🇸 Chicago" },
  { tz: "Asia/Tokyo", name: "🇯🇵 Tokio" },
  { tz: "Asia/Shanghai", name: "🇨🇳 Shanghái" },
  { tz: "Asia/Dubai", name: "🇦🇪 Dubái" },
  { tz: "Australia/Sydney", name: "🇦🇺 Sídney" },
  { tz: "UTC", name: "🌍 UTC" }
];

export function TimezoneConverter() {
  const [now, setNow] = useState(new Date());
  const [selected, setSelected] = useState<string[]>(["America/Mexico_City", "America/Argentina/Buenos_Aires", "Europe/Madrid", "America/New_York"]);
  const [customTime, setCustomTime] = useState("");

  useEffect(() => {
    if (customTime) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [customTime]);

  const target = customTime ? new Date(customTime) : now;
  const fmt = (tz: string) => target.toLocaleString("es", { timeZone: tz, weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  function toggle(tz: string) {
    setSelected((s) => s.includes(tz) ? s.filter((x) => x !== tz) : [...s, tz]);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Conversor de Zonas Horarias</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Hora exacta en LATAM, España, USA y Asia · Comparación lado a lado · Reuniones internacionales.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6">
        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Convertir hora específica (opcional)</span>
          <input type="datetime-local" className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-mono" value={customTime} onChange={(e) => setCustomTime(e.target.value)} />
          {customTime && <button onClick={() => setCustomTime("")} className="mt-2 text-xs font-bold text-[color:var(--color-brand)]">← volver a hora actual</button>}
        </label>
      </div>

      <div className="space-y-2 mb-6">
        {selected.map((tz) => {
          const z = ZONES.find((x) => x.tz === tz);
          return (
            <div key={tz} className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{z?.name || tz}</div>
                <div className="text-2xl md:text-3xl font-black tabular-nums">{fmt(tz)}</div>
              </div>
              <button onClick={() => toggle(tz)} className="text-[color:var(--color-danger)]"><Trash2 className="w-4 h-4" /></button>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-6">
        <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2 inline-flex items-center gap-1"><Plus className="w-3 h-3" /> Agregar zona</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {ZONES.filter((z) => !selected.includes(z.tz)).map((z) => (
            <button key={z.tz} onClick={() => toggle(z.tz)} className="px-2 py-1.5 rounded-md text-xs font-bold bg-[color:var(--color-bg-soft)] hover:bg-[color:var(--color-fg)]/10 text-left">{z.name}</button>
          ))}
        </div>
      </div>

      <AdSlot slot="tz_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2"><Globe className="w-4 h-4 inline mr-1" /> Diferencias horarias clave</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">CDMX vs NYC:</strong> generalmente 1h menos en CDMX (mismo huso pero NYC tiene DST).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Madrid vs CDMX:</strong> 6-7h más Madrid (verano/invierno).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Buenos Aires vs Madrid:</strong> 4-5h menos Buenos Aires.</li>
          <li>• Argentina y Caracas NO usan DST, México sí desde 2023 derogó.</li>
        </ul>
      </div>
    </div>
  );
}
