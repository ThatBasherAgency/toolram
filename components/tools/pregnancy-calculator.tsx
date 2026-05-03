"use client";
import { useMemo, useState } from "react";
import { Baby, Calendar } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.7 0.18 350)";

function addDays(date: Date, days: number): Date { const d = new Date(date); d.setDate(d.getDate() + days); return d; }
function diffDays(a: Date, b: Date): number { return Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)); }

export function PregnancyCalculator() {
  const [mode, setMode] = useState<"lmp" | "conception" | "due">("lmp");
  const [date, setDate] = useState(new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));

  const result = useMemo(() => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    let lmp: Date;
    if (mode === "lmp") lmp = d;
    else if (mode === "conception") lmp = addDays(d, -14);
    else lmp = addDays(d, -280);

    const dueDate = addDays(lmp, 280);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = diffDays(lmp, today);
    const weeks = Math.floor(days / 7);
    const remDays = days % 7;
    const trimester = weeks < 14 ? 1 : weeks < 28 ? 2 : 3;
    const daysToDue = diffDays(today, dueDate);
    const conceptionDate = addDays(lmp, 14);

    return { lmp, dueDate, weeks, remDays, trimester, daysToDue, conceptionDate, days };
  }, [date, mode]);

  const fmt = (d: Date) => d.toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora de Embarazo</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Fecha probable de parto, semanas de gestación, trimestre actual · Regla de Naegele.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 space-y-4">
        <div>
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-2">Calcular desde</span>
          <div className="grid grid-cols-3 gap-1">
            <button onClick={() => setMode("lmp")} className="px-2 py-2 rounded-md text-xs font-bold transition" style={mode === "lmp" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>Última regla (FUM)</button>
            <button onClick={() => setMode("conception")} className="px-2 py-2 rounded-md text-xs font-bold transition" style={mode === "conception" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>Concepción</button>
            <button onClick={() => setMode("due")} className="px-2 py-2 rounded-md text-xs font-bold transition" style={mode === "due" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>Fecha parto</button>
          </div>
        </div>

        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Fecha</span>
          <input type="date" className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-mono focus:outline-none focus:border-[color:var(--color-brand)]" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Baby className="w-3 h-3" /> Fecha probable de parto</div>
            <div className="text-4xl md:text-5xl font-black mb-2">{fmt(result.dueDate)}</div>
            <div className="text-base opacity-90">{result.daysToDue > 0 ? `Faltan ${result.daysToDue} días` : `Pasaron ${Math.abs(result.daysToDue)} días`}</div>
            <div className="mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div><div className="text-xs opacity-80 uppercase">Semanas + días</div><div className="text-3xl font-extrabold tabular-nums">{Math.max(0, result.weeks)}<sup className="text-base">+{Math.max(0, result.remDays)}</sup></div></div>
              <div><div className="text-xs opacity-80 uppercase">Trimestre</div><div className="text-3xl font-extrabold">{result.trimester}º</div></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">FUM (estimada)</div>
              <div className="text-base font-bold">{fmt(result.lmp)}</div>
            </div>
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Concepción aprox</div>
              <div className="text-base font-bold">{fmt(result.conceptionDate)}</div>
            </div>
          </div>

          <AdSlot slot="preg_inline" format="auto" minHeight={180} className="mb-6" />

          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-6">
            <div className="font-bold mb-2">📅 Hitos importantes</div>
            <div className="space-y-2 text-sm">
              {[
                { w: 12, label: "Fin del 1º trimestre · Riesgo aborto baja drásticamente" },
                { w: 20, label: "Ecografía morfológica · Sexo del bebé visible" },
                { w: 24, label: "Viabilidad fetal (con cuidados intensivos)" },
                { w: 28, label: "Inicio 3º trimestre · Movimientos fuertes" },
                { w: 37, label: "A término · Bebé ya puede nacer" },
                { w: 40, label: "Fecha probable de parto" }
              ].map((m) => (
                <div key={m.w} className={`flex items-center gap-3 p-2 rounded-lg ${result.weeks >= m.w ? "bg-[color:var(--color-success)]/10" : "bg-[color:var(--color-bg-soft)]"}`}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0" style={{ background: result.weeks >= m.w ? "oklch(0.65 0.18 145)" : "oklch(0.6 0.05 270)" }}>{m.w}sem</div>
                  <div className={result.weeks >= m.w ? "font-semibold" : ""}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">⚠️ Aviso médico</strong>
        Esta calculadora es solo orientativa. La fecha real de parto puede variar ±2 semanas. Solo el 5% de bebés nace en la fecha exacta calculada. Consultá siempre con tu obstetra para seguimiento personalizado y ecografías de control.
      </div>
    </div>
  );
}
