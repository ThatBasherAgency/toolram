"use client";
import { useMemo, useState } from "react";
import { Activity, Info } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.65 0.2 145)";

type Unit = "metric" | "imperial";

function categoryFor(bmi: number) {
  if (bmi < 18.5) return { label: "Bajo peso", color: "oklch(0.7 0.18 230)", advice: "Considera incrementar tu ingesta calórica con alimentos nutritivos. Consulta a un profesional." };
  if (bmi < 25) return { label: "Peso normal", color: "oklch(0.65 0.18 145)", advice: "Tu peso está en rango saludable. Mantén una dieta balanceada y actividad física regular." };
  if (bmi < 30) return { label: "Sobrepeso", color: "oklch(0.7 0.18 75)", advice: "Pequeños cambios en dieta y actividad física pueden hacer una gran diferencia." };
  if (bmi < 35) return { label: "Obesidad I", color: "oklch(0.65 0.2 50)", advice: "Recomendable consultar a un médico o nutricionista para un plan personalizado." };
  if (bmi < 40) return { label: "Obesidad II", color: "oklch(0.6 0.22 35)", advice: "Importante consultar a un profesional de salud para evaluar riesgos cardiovasculares." };
  return { label: "Obesidad III", color: "oklch(0.55 0.24 25)", advice: "Riesgo elevado para la salud. Es crucial buscar atención médica especializada." };
}

export function BmiCalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [age, setAge] = useState("30");
  const [sex, setSex] = useState<"m" | "f">("m");

  const result = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h || w <= 0 || h <= 0) return null;
    let bmi: number;
    if (unit === "metric") {
      bmi = w / Math.pow(h / 100, 2);
    } else {
      bmi = (w / (h * h)) * 703;
    }
    const a = parseInt(age) || 30;
    const heightCm = unit === "metric" ? h : h * 2.54;
    const weightKg = unit === "metric" ? w : w * 0.453592;
    const idealMin = 18.5 * Math.pow(heightCm / 100, 2);
    const idealMax = 24.9 * Math.pow(heightCm / 100, 2);
    const bmr = sex === "m"
      ? 10 * weightKg + 6.25 * heightCm - 5 * a + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * a - 161;
    return { bmi, cat: categoryFor(bmi), idealMin, idealMax, bmr };
  }, [weight, height, age, sex, unit]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Calculadora de IMC</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Índice de Masa Corporal + peso ideal + metabolismo basal (BMR). Resultado al instante.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 space-y-5">
        <div className="inline-flex rounded-xl bg-[color:var(--color-bg-soft)] p-1">
          {(["metric", "imperial"] as const).map((u) => (
            <button key={u} onClick={() => setUnit(u)} className="px-4 py-2 rounded-lg text-sm font-bold transition" style={unit === u ? { background: ACCENT, color: "white" } : {}}>
              {u === "metric" ? "Métrico (kg/cm)" : "Imperial (lb/in)"}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Peso ({unit === "metric" ? "kg" : "lb"})</span>
            <input type="number" className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono tabular-nums focus:outline-none focus:border-[color:var(--color-brand)]" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Altura ({unit === "metric" ? "cm" : "in"})</span>
            <input type="number" className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono tabular-nums focus:outline-none focus:border-[color:var(--color-brand)]" value={height} onChange={(e) => setHeight(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Edad</span>
            <input type="number" className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono tabular-nums focus:outline-none focus:border-[color:var(--color-brand)]" value={age} onChange={(e) => setAge(e.target.value)} />
          </label>
          <div>
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Sexo</span>
            <div className="mt-1.5 inline-flex rounded-xl bg-[color:var(--color-bg-soft)] p-1 w-full">
              {(["m", "f"] as const).map((s) => (
                <button key={s} onClick={() => setSex(s)} className="flex-1 px-4 py-2.5 rounded-lg text-sm font-bold transition" style={sex === s ? { background: ACCENT, color: "white" } : {}}>
                  {s === "m" ? "Hombre" : "Mujer"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${result.cat.color}, color-mix(in oklch, ${result.cat.color} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Activity className="w-3 h-3" /> Tu IMC</div>
            <div className="text-7xl md:text-8xl font-black tracking-tight tabular-nums mb-2">{result.bmi.toFixed(1)}</div>
            <div className="text-2xl md:text-3xl font-extrabold tracking-tight">{result.cat.label}</div>
            <div className="mt-4 text-sm opacity-90 max-w-md mx-auto">{result.cat.advice}</div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-1">Peso ideal</div>
              <div className="text-2xl font-extrabold tabular-nums">{result.idealMin.toFixed(1)} – {result.idealMax.toFixed(1)} kg</div>
              <div className="text-xs text-[color:var(--color-fg-soft)] mt-1">Rango saludable para tu altura</div>
            </div>
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-1">Metabolismo basal (BMR)</div>
              <div className="text-2xl font-extrabold tabular-nums">{Math.round(result.bmr)} kcal/día</div>
              <div className="text-xs text-[color:var(--color-fg-soft)] mt-1">Calorías que tu cuerpo quema en reposo</div>
            </div>
          </div>

          <AdSlot slot="bmi_inline" format="auto" minHeight={180} className="mb-6" />

          <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 mb-4">
            <div className="font-bold mb-3 inline-flex items-center gap-2"><Info className="w-4 h-4" /> Tabla de IMC (OMS)</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {[["< 18.5", "Bajo peso", "oklch(0.7 0.18 230)"], ["18.5 – 24.9", "Normal", "oklch(0.65 0.18 145)"], ["25 – 29.9", "Sobrepeso", "oklch(0.7 0.18 75)"], ["30 – 34.9", "Obesidad I", "oklch(0.65 0.2 50)"], ["35 – 39.9", "Obesidad II", "oklch(0.6 0.22 35)"], ["≥ 40", "Obesidad III", "oklch(0.55 0.24 25)"]].map(([range, label, color]) => (
                <div key={range} className="rounded-lg p-2 text-white text-xs font-medium text-center" style={{ background: color }}>
                  <div className="font-bold">{label}</div>
                  <div className="opacity-90">{range}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">⚠️ Aviso importante</strong>
        El IMC es una orientación general. No diferencia masa muscular de grasa, ni considera distribución corporal. Atletas, embarazadas y adultos mayores requieren evaluaciones específicas. Consulta siempre con un profesional de salud antes de tomar decisiones sobre tu dieta o entrenamiento.
      </div>
    </div>
  );
}
