"use client";
import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 35)";

export function CountdownTimer() {
  const [target, setTarget] = useState("2026-12-31T23:59");
  const [now, setNow] = useState(new Date());
  const [title, setTitle] = useState("Año Nuevo 2027");

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = new Date(target).getTime() - now.getTime();
  const past = diff < 0;
  const ms = Math.abs(diff);
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Cuenta Regresiva Personalizable</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Cuenta regresiva visual hacia cualquier fecha · Eventos, lanzamientos, deadlines, vacaciones.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6 grid md:grid-cols-2 gap-3">
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Título del evento</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-bold" value={title} onChange={(e) => setTitle(e.target.value)} /></label>
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Fecha objetivo</span>
          <input type="datetime-local" className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-mono" value={target} onChange={(e) => setTarget(e.target.value)} /></label>
      </div>

      <div className="rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
        <div className="text-xs uppercase opacity-80 tracking-widest inline-flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {past ? "Pasaron" : "Faltan"} para "{title}"</div>
        <div className="grid grid-cols-4 gap-3 mt-6">
          {[
            { l: "Días", v: days },
            { l: "Horas", v: hours },
            { l: "Min", v: minutes },
            { l: "Seg", v: seconds }
          ].map((m) => (
            <div key={m.l} className="bg-white/15 backdrop-blur rounded-2xl p-4">
              <div className="text-5xl md:text-7xl font-black tabular-nums">{String(m.v).padStart(2, "0")}</div>
              <div className="text-xs uppercase opacity-80 mt-1">{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      <AdSlot slot="countdown_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2"><Clock className="w-4 h-4 inline mr-1" /> Ideas de eventos</strong>
        <ul className="space-y-1">
          <li>• Cumpleaños · Aniversario · Boda</li>
          <li>• Lanzamiento de producto · Hackathon · Conferencia</li>
          <li>• Vacaciones · Mudanza · Graduación</li>
          <li>• Deadline de proyecto · Vencimiento · Sorteo</li>
        </ul>
      </div>
    </div>
  );
}
