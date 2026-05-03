"use client";
import { useMemo, useState } from "react";
import { PawPrint } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.65 0.2 50)";

type Pet = "dog" | "cat";
type Size = "small" | "medium" | "large" | "giant";

function dogYears(years: number, size: Size): number {
  if (years <= 0) return 0;
  if (years <= 1) return 15 * years;
  if (years <= 2) return 15 + 9 * (years - 1);
  const baseFactor = size === "small" ? 4 : size === "medium" ? 5 : size === "large" ? 6 : 7;
  return 24 + (years - 2) * baseFactor;
}

function catYears(years: number): number {
  if (years <= 0) return 0;
  if (years <= 1) return 15 * years;
  if (years <= 2) return 24;
  return 24 + (years - 2) * 4;
}

export function PetAgeCalculator() {
  const [pet, setPet] = useState<Pet>("dog");
  const [years, setYears] = useState("3");
  const [months, setMonths] = useState("0");
  const [size, setSize] = useState<Size>("medium");

  const result = useMemo(() => {
    const y = (parseFloat(years) || 0) + (parseFloat(months) || 0) / 12;
    if (y <= 0) return null;
    const human = pet === "dog" ? dogYears(y, size) : catYears(y);
    const stage = human < 12 ? "Cachorro 🍼" : human < 24 ? "Joven 🎾" : human < 50 ? "Adulto 💪" : human < 80 ? "Adulto mayor 🧓" : "Anciano 🧙";
    return { human: Math.round(human), stage, petYears: y };
  }, [years, months, pet, size]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Edad de Tu Mascota en Años Humanos</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">¿Qué edad tendría tu perro o gato si fuera humano? · Fórmula científica AAHA por raza y tamaño.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setPet("dog")} className="px-4 py-4 rounded-xl text-2xl font-bold transition" style={pet === "dog" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>🐕 Perro</button>
          <button onClick={() => setPet("cat")} className="px-4 py-4 rounded-xl text-2xl font-bold transition" style={pet === "cat" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>🐈 Gato</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Años</span>
            <input type="number" className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono tabular-nums text-center" value={years} onChange={(e) => setYears(e.target.value)} min="0" /></label>
          <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Meses</span>
            <input type="number" className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono tabular-nums text-center" value={months} onChange={(e) => setMonths(e.target.value)} min="0" max="11" /></label>
        </div>

        {pet === "dog" && (
          <div>
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-2">Tamaño del perro (envejecen distinto)</span>
            <div className="grid grid-cols-4 gap-1">
              {([
                { s: "small", l: "Pequeño", w: "<10kg" },
                { s: "medium", l: "Mediano", w: "10-25kg" },
                { s: "large", l: "Grande", w: "25-45kg" },
                { s: "giant", l: "Gigante", w: ">45kg" }
              ] as const).map((o) => (
                <button key={o.s} onClick={() => setSize(o.s)} className="px-2 py-2 rounded-md text-xs font-bold transition" style={size === o.s ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>
                  <div>{o.l}</div><div className="text-[10px] opacity-80">{o.w}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {result && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><PawPrint className="w-3 h-3" /> En años humanos</div>
            <div className="text-7xl md:text-9xl font-black tabular-nums leading-none">{result.human}</div>
            <div className="mt-3 text-2xl font-bold">{result.stage}</div>
            <div className="mt-2 text-sm opacity-90">{result.petYears.toFixed(1)} años de tu {pet === "dog" ? "perro" : "gato"} = {result.human} años humanos</div>
          </div>

          <AdSlot slot="petage_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">🐾 La regla "1 año = 7 humanos" es FALSA</strong>
        <ul className="space-y-1">
          <li>• El primer año de vida = ~15 años humanos (crecen muy rápido).</li>
          <li>• Segundo año = +9 años más (total 24).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Perros grandes envejecen más rápido</strong> que los pequeños (genética). Un Gran Danés de 8 años es como un humano de 70.</li>
          <li>• Gatos: el envejecimiento es más uniforme (~4 años humanos por cada año felino después de los 2).</li>
        </ul>
      </div>
    </div>
  );
}
