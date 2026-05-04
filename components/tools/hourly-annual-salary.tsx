"use client";
import { useMemo, useState } from "react";
import { DollarSign, ArrowRightLeft } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 145)";

export function HourlyAnnualSalary() {
  const [mode, setMode] = useState<"hourly" | "annual">("hourly");
  const [val, setVal] = useState("100");
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [currency, setCurrency] = useState("$");

  const result = useMemo(() => {
    const v = parseFloat(val);
    if (!v) return null;
    const totalHours = hoursPerWeek * weeksPerYear;
    if (mode === "hourly") {
      const annual = v * totalHours;
      return { annual, monthly: annual / 12, weekly: v * hoursPerWeek, daily: v * (hoursPerWeek / 5), hourly: v };
    } else {
      return { annual: v, monthly: v / 12, weekly: v / weeksPerYear, daily: v / (weeksPerYear * 5), hourly: v / totalHours };
    }
  }, [val, hoursPerWeek, weeksPerYear, mode]);

  const fmt = (n: number) => `${currency}${n.toLocaleString("es", { maximumFractionDigits: 2 })}`;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Salario Hora ↔ Anual</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Convertí tarifa por hora a sueldo anual y viceversa · Comparar ofertas freelance vs empleo.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6 space-y-3">
        <div className="flex items-center gap-3"><button onClick={() => setMode("hourly")} className="flex-1 px-4 py-2 rounded-lg text-sm font-bold transition" style={mode === "hourly" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>Por hora</button>
          <button onClick={() => setMode(mode === "hourly" ? "annual" : "hourly")} className="w-10 h-10 rounded-lg bg-[color:var(--color-bg-soft)] flex items-center justify-center"><ArrowRightLeft className="w-4 h-4" /></button>
          <button onClick={() => setMode("annual")} className="flex-1 px-4 py-2 rounded-lg text-sm font-bold transition" style={mode === "annual" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>Anual</button></div>
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{mode === "hourly" ? "Tarifa por hora" : "Sueldo anual"}</span>
          <div className="flex gap-2 mt-1"><select value={currency} onChange={(e) => setCurrency(e.target.value)} className="px-3 py-2 rounded-lg bg-[color:var(--color-bg-soft)] font-bold"><option>$</option><option>€</option><option>MX$</option><option>AR$</option></select><input type="number" className="flex-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono tabular-nums" value={val} onChange={(e) => setVal(e.target.value)} /></div></label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Horas/semana: {hoursPerWeek}</span>
            <input type="range" min="10" max="60" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(+e.target.value)} className="w-full mt-2" /></label>
          <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Semanas/año: {weeksPerYear}</span>
            <input type="range" min="40" max="52" value={weeksPerYear} onChange={(e) => setWeeksPerYear(+e.target.value)} className="w-full mt-2" /></label>
        </div>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {[{l:"Por hora",v:result.hourly},{l:"Por día",v:result.daily},{l:"Semanal",v:result.weekly},{l:"Mensual",v:result.monthly},{l:"Anual",v:result.annual}].map((m) => (
              <div key={m.l} className="rounded-2xl p-4 text-white text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 60%, black))` }}>
                <div className="text-xs uppercase opacity-80">{m.l}</div>
                <div className="text-lg md:text-xl font-extrabold">{fmt(m.v)}</div>
              </div>
            ))}
          </div>
          <AdSlot slot="hsalary_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2"><DollarSign className="w-4 h-4 inline mr-1" /> Tip freelance</strong>
        Si dejás un trabajo full-time para freelancing, multiplicá tu tarifa hora estimada × 1.5-2x: tenés que pagar tus propios impuestos, vacaciones, seguro médico y huecos sin cliente.
      </div>
    </div>
  );
}
