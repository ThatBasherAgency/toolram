"use client";
import { useMemo, useState } from "react";
import { Flame, Activity } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 35)";

const ACTIVITY = [
  { v: 1.2, label: "Sedentario", desc: "Poco o nada de ejercicio" },
  { v: 1.375, label: "Ligero", desc: "1-3 días/sem ejercicio ligero" },
  { v: 1.55, label: "Moderado", desc: "3-5 días/sem ejercicio moderado" },
  { v: 1.725, label: "Activo", desc: "6-7 días/sem ejercicio intenso" },
  { v: 1.9, label: "Muy activo", desc: "Atleta, trabajo físico" }
];

const GOALS = [
  { v: -500, label: "Perder peso", color: "oklch(0.65 0.18 230)" },
  { v: -250, label: "Perder lento", color: "oklch(0.55 0.2 200)" },
  { v: 0, label: "Mantener", color: "oklch(0.65 0.18 145)" },
  { v: 250, label: "Ganar lento", color: "oklch(0.7 0.18 75)" },
  { v: 500, label: "Ganar peso", color: "oklch(0.6 0.22 35)" }
];

export function CalorieCalculator() {
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [sex, setSex] = useState<"m" | "f">("m");
  const [activity, setActivity] = useState(1.55);
  const [goal, setGoal] = useState(0);

  const result = useMemo(() => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!a || !w || !h) return null;
    const bmr = sex === "m" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * activity;
    const target = tdee + goal;
    const protein = Math.round(w * 2);
    const fat = Math.round((target * 0.25) / 9);
    const carbs = Math.round((target - protein * 4 - fat * 9) / 4);
    return { bmr: Math.round(bmr), tdee: Math.round(tdee), target: Math.round(target), protein, fat, carbs };
  }, [age, weight, height, sex, activity, goal]);

  const goalCfg = GOALS.find((g) => g.v === goal)!;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora de Calorías (TDEE)</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Calcula tus calorías diarias según objetivo + macros (proteína, grasa, carbos) · Fórmula Mifflin-St Jeor.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Edad</span>
            <input type="number" className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono tabular-nums" value={age} onChange={(e) => setAge(e.target.value)} /></label>
          <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Peso (kg)</span>
            <input type="number" className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono tabular-nums" value={weight} onChange={(e) => setWeight(e.target.value)} /></label>
          <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Altura (cm)</span>
            <input type="number" className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono tabular-nums" value={height} onChange={(e) => setHeight(e.target.value)} /></label>
        </div>

        <div className="inline-flex rounded-xl bg-[color:var(--color-bg-soft)] p-1 w-full">
          {(["m", "f"] as const).map((s) => (
            <button key={s} onClick={() => setSex(s)} className="flex-1 px-4 py-2 rounded-lg text-sm font-bold transition" style={sex === s ? { background: ACCENT, color: "white" } : {}}>{s === "m" ? "Hombre" : "Mujer"}</button>
          ))}
        </div>

        <div>
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-2">Nivel de actividad</span>
          <div className="grid gap-1.5">
            {ACTIVITY.map((a) => (
              <button key={a.v} onClick={() => setActivity(a.v)} className="px-3 py-2 rounded-lg text-left text-sm font-medium transition" style={activity === a.v ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>
                <strong>{a.label}</strong> · <span className="opacity-80">{a.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-2">Objetivo</span>
          <div className="grid grid-cols-5 gap-1">
            {GOALS.map((g) => (
              <button key={g.v} onClick={() => setGoal(g.v)} className="px-2 py-2 rounded-md text-xs font-bold transition" style={goal === g.v ? { background: g.color, color: "white" } : { background: "var(--color-bg-soft)" }}>{g.label}</button>
            ))}
          </div>
        </div>
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${goalCfg.color}, color-mix(in oklch, ${goalCfg.color} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Flame className="w-3 h-3" /> Tu objetivo diario</div>
            <div className="text-7xl md:text-8xl font-black tabular-nums">{result.target}<span className="text-2xl">kcal</span></div>
            <div className="mt-2 text-lg font-bold">{goalCfg.label}</div>
            <div className="mt-6 grid grid-cols-3 gap-3 max-w-md mx-auto text-sm">
              <div><div className="text-xs opacity-80 uppercase">Proteína</div><div className="text-2xl font-extrabold">{result.protein}g</div></div>
              <div><div className="text-xs opacity-80 uppercase">Grasa</div><div className="text-2xl font-extrabold">{result.fat}g</div></div>
              <div><div className="text-xs opacity-80 uppercase">Carbos</div><div className="text-2xl font-extrabold">{result.carbs}g</div></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] inline-flex items-center gap-1"><Activity className="w-3 h-3" /> BMR (metabolismo basal)</div>
              <div className="text-3xl font-extrabold tabular-nums mt-1">{result.bmr} kcal</div>
              <div className="text-xs text-[color:var(--color-fg-soft)] mt-1">Calorías que tu cuerpo quema en reposo</div>
            </div>
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">TDEE (mantener)</div>
              <div className="text-3xl font-extrabold tabular-nums mt-1">{result.tdee} kcal</div>
              <div className="text-xs text-[color:var(--color-fg-soft)] mt-1">BMR × actividad — para mantener tu peso</div>
            </div>
          </div>

          <AdSlot slot="cal_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">🍽️ Sobre las calorías</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">BMR:</strong> calorías solo para vivir (respirar, digerir).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">TDEE:</strong> BMR × factor actividad. Total que gastas en un día normal.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Para perder grasa:</strong> -250 a -500 kcal/día (0.25-0.5kg/sem). Más agresivo: pérdida muscular.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Proteína:</strong> 2g/kg de peso es el mínimo recomendado para preservar masa muscular.</li>
        </ul>
      </div>
    </div>
  );
}
