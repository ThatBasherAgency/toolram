"use client";
import { useMemo, useState } from "react";
import { Clock, Plus, Trash2 } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 200)";

type Day = { id: number; date: string; in: string; out: string; breakMin: number };

function calcMinutes(d: Day): number {
  const [h1, m1] = d.in.split(":").map(Number);
  const [h2, m2] = d.out.split(":").map(Number);
  if (isNaN(h1) || isNaN(h2)) return 0;
  let mins = (h2 * 60 + m2) - (h1 * 60 + m1);
  if (mins < 0) mins += 24 * 60;
  return Math.max(0, mins - d.breakMin);
}

function formatMins(m: number): string {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${h}h ${min.toString().padStart(2, "0")}m`;
}

export function WorkHoursCalculator() {
  const today = new Date().toISOString().slice(0, 10);
  const [days, setDays] = useState<Day[]>([
    { id: 1, date: today, in: "09:00", out: "18:00", breakMin: 60 }
  ]);
  const [hourlyRate, setHourlyRate] = useState("100");
  const [currency, setCurrency] = useState("$");

  const totals = useMemo(() => {
    const totalMins = days.reduce((sum, d) => sum + calcMinutes(d), 0);
    const rate = parseFloat(hourlyRate) || 0;
    const earned = (totalMins / 60) * rate;
    return { totalMins, earned };
  }, [days, hourlyRate]);

  function addDay() {
    setDays((d) => [...d, { id: Date.now(), date: today, in: "09:00", out: "18:00", breakMin: 60 }]);
  }
  function update(id: number, field: keyof Day, value: string | number) {
    setDays((d) => d.map((day) => day.id === id ? { ...day, [field]: value } : day));
  }
  function remove(id: number) {
    setDays((d) => d.filter((day) => day.id !== id));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora de Horas Trabajadas</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Suma horas + descanso · Calcula el sueldo a la hora · Para freelancers, planilla, time tracking.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <div className="space-y-3 mb-4">
          {days.map((d) => {
            const mins = calcMinutes(d);
            return (
              <div key={d.id} className="grid grid-cols-12 gap-2 items-center">
                <input type="date" value={d.date} onChange={(e) => update(d.id, "date", e.target.value)} className="col-span-12 md:col-span-3 px-2 py-2 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-xs" />
                <input type="time" value={d.in} onChange={(e) => update(d.id, "in", e.target.value)} className="col-span-3 md:col-span-2 px-2 py-2 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm tabular-nums" />
                <input type="time" value={d.out} onChange={(e) => update(d.id, "out", e.target.value)} className="col-span-3 md:col-span-2 px-2 py-2 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm tabular-nums" />
                <div className="col-span-3 md:col-span-2 inline-flex items-center gap-1">
                  <input type="number" value={d.breakMin} onChange={(e) => update(d.id, "breakMin", +e.target.value)} className="w-full px-2 py-2 rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm tabular-nums" />
                  <span className="text-xs text-[color:var(--color-fg-soft)]">min</span>
                </div>
                <div className="col-span-2 md:col-span-2 text-sm font-bold text-right tabular-nums">{formatMins(mins)}</div>
                <button onClick={() => remove(d.id)} className="col-span-1 text-[color:var(--color-danger)] flex justify-center" disabled={days.length === 1}><Trash2 className="w-4 h-4" /></button>
              </div>
            );
          })}
        </div>

        <button onClick={addDay} className="w-full px-4 py-2 rounded-xl bg-[color:var(--color-bg-soft)] text-sm font-bold inline-flex items-center justify-center gap-1.5"><Plus className="w-4 h-4" /> Agregar día</button>

        <div className="grid md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-[color:var(--color-border)]">
          <label className="block">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Tarifa por hora</span>
            <div className="flex gap-1 mt-1">
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="px-2 py-2 rounded-md border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm font-bold">
                <option>$</option><option>€</option><option>MX$</option><option>AR$</option><option>CLP$</option><option>S/</option>
              </select>
              <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} className="flex-1 px-2 py-2 rounded-md border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-mono tabular-nums" />
            </div>
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-6">
        <div className="rounded-3xl p-6 text-white text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
          <div className="text-xs uppercase opacity-80 tracking-widest inline-flex items-center gap-1"><Clock className="w-3 h-3" /> Total horas</div>
          <div className="text-5xl font-black tabular-nums mt-1">{formatMins(totals.totalMins)}</div>
          <div className="text-sm opacity-90 mt-1">{(totals.totalMins / 60).toFixed(2)} horas decimales</div>
        </div>
        <div className="rounded-3xl p-6 text-white text-center" style={{ background: `linear-gradient(135deg, oklch(0.65 0.18 145), oklch(0.5 0.15 145))` }}>
          <div className="text-xs uppercase opacity-80 tracking-widest">A cobrar</div>
          <div className="text-5xl font-black tabular-nums mt-1">{currency}{totals.earned.toLocaleString("es", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</div>
          <div className="text-sm opacity-90 mt-1">{days.length} día{days.length !== 1 ? "s" : ""} cargado{days.length !== 1 ? "s" : ""}</div>
        </div>
      </div>

      <AdSlot slot="hours_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">⏰ Casos de uso</strong>
        <ul className="space-y-1">
          <li>• Freelancers facturando por hora a clientes.</li>
          <li>• Empleados verificando horas extra de planilla.</li>
          <li>• Estudiantes con trabajos part-time.</li>
          <li>• Manejo de turnos rotativos en hostelería/retail.</li>
        </ul>
      </div>
    </div>
  );
}
