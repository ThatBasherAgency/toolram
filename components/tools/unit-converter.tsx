"use client";
import { useState } from "react";

type Group = "longitud" | "peso" | "volumen" | "area" | "tiempo";

const UNITS: Record<Group, { id: string; label: string; toBase: number }[]> = {
  longitud: [
    { id: "mm", label: "Milímetros (mm)", toBase: 0.001 },
    { id: "cm", label: "Centímetros (cm)", toBase: 0.01 },
    { id: "m", label: "Metros (m)", toBase: 1 },
    { id: "km", label: "Kilómetros (km)", toBase: 1000 },
    { id: "in", label: "Pulgadas (in)", toBase: 0.0254 },
    { id: "ft", label: "Pies (ft)", toBase: 0.3048 },
    { id: "yd", label: "Yardas (yd)", toBase: 0.9144 },
    { id: "mi", label: "Millas (mi)", toBase: 1609.344 }
  ],
  peso: [
    { id: "mg", label: "Miligramos (mg)", toBase: 0.000001 },
    { id: "g", label: "Gramos (g)", toBase: 0.001 },
    { id: "kg", label: "Kilogramos (kg)", toBase: 1 },
    { id: "t", label: "Toneladas (t)", toBase: 1000 },
    { id: "oz", label: "Onzas (oz)", toBase: 0.0283495 },
    { id: "lb", label: "Libras (lb)", toBase: 0.453592 }
  ],
  volumen: [
    { id: "ml", label: "Mililitros (ml)", toBase: 0.001 },
    { id: "l", label: "Litros (l)", toBase: 1 },
    { id: "m3", label: "Metros cúbicos (m³)", toBase: 1000 },
    { id: "tsp", label: "Cucharaditas (tsp)", toBase: 0.00492892 },
    { id: "tbsp", label: "Cucharadas (tbsp)", toBase: 0.0147868 },
    { id: "cup", label: "Tazas (cup)", toBase: 0.236588 },
    { id: "gal", label: "Galones (gal)", toBase: 3.78541 }
  ],
  area: [
    { id: "cm2", label: "cm²", toBase: 0.0001 },
    { id: "m2", label: "Metros² (m²)", toBase: 1 },
    { id: "ha", label: "Hectáreas (ha)", toBase: 10000 },
    { id: "km2", label: "km²", toBase: 1000000 },
    { id: "ft2", label: "Pies² (ft²)", toBase: 0.092903 },
    { id: "ac", label: "Acres", toBase: 4046.86 }
  ],
  tiempo: [
    { id: "s", label: "Segundos (s)", toBase: 1 },
    { id: "min", label: "Minutos", toBase: 60 },
    { id: "h", label: "Horas", toBase: 3600 },
    { id: "d", label: "Días", toBase: 86400 },
    { id: "w", label: "Semanas", toBase: 604800 },
    { id: "y", label: "Años", toBase: 31557600 }
  ]
};

export function UnitConverter() {
  const [group, setGroup] = useState<Group>("longitud");
  const [val, setVal] = useState("1");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");

  function pickGroup(g: Group) {
    setGroup(g);
    setFrom(UNITS[g][0].id);
    setTo(UNITS[g][1]?.id || UNITS[g][0].id);
  }

  const fromU = UNITS[group].find((u) => u.id === from);
  const toU = UNITS[group].find((u) => u.id === to);
  const num = parseFloat(val) || 0;
  const result = fromU && toU ? (num * fromU.toBase) / toU.toBase : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(UNITS) as Group[]).map((g) => (
          <button key={g} onClick={() => pickGroup(g)} className={`btn ${group === g ? "btn-primary" : "btn-ghost"} h-8 text-xs capitalize`}>{g}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="card !p-3 space-y-2">
          <label className="block text-sm">
            <span className="text-xs uppercase text-[color:var(--color-fg-soft)]">Desde</span>
            <input type="number" className="input mt-1" value={val} onChange={(e) => setVal(e.target.value)} />
          </label>
          <select className="input" value={from} onChange={(e) => setFrom(e.target.value)}>
            {UNITS[group].map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
          </select>
        </div>
        <div className="card !p-3 space-y-2">
          <div className="text-xs uppercase text-[color:var(--color-fg-soft)]">Resultado</div>
          <div className="text-3xl font-bold text-[color:var(--color-brand)] py-3">{result.toLocaleString("es", { maximumFractionDigits: 6 })}</div>
          <select className="input" value={to} onChange={(e) => setTo(e.target.value)}>
            {UNITS[group].map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
          </select>
        </div>
      </div>
      <div className="text-xs text-center text-[color:var(--color-fg-soft)]">{val} {fromU?.label.split(" ")[0]} = {result.toFixed(6)} {toU?.label.split(" ")[0]}</div>
    </div>
  );
}
