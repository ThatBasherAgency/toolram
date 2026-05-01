"use client";
import { useState } from "react";

type Unit = "C" | "F" | "K";

function convert(v: number, from: Unit, to: Unit) {
  let c = v;
  if (from === "F") c = ((v - 32) * 5) / 9;
  if (from === "K") c = v - 273.15;
  if (to === "C") return c;
  if (to === "F") return (c * 9) / 5 + 32;
  return c + 273.15;
}

export function TemperatureConverter() {
  const [val, setVal] = useState("25");
  const [from, setFrom] = useState<Unit>("C");
  const num = parseFloat(val) || 0;
  const out: Record<Unit, number> = {
    C: convert(num, from, "C"),
    F: convert(num, from, "F"),
    K: convert(num, from, "K")
  };
  const labels: Record<Unit, string> = { C: "Celsius", F: "Fahrenheit", K: "Kelvin" };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm">
          Valor
          <input className="input mt-1" type="number" value={val} onChange={(e) => setVal(e.target.value)} />
        </label>
        <label className="block text-sm">
          Unidad de origen
          <select className="input mt-1" value={from} onChange={(e) => setFrom(e.target.value as Unit)}>
            <option value="C">°C — Celsius</option>
            <option value="F">°F — Fahrenheit</option>
            <option value="K">K — Kelvin</option>
          </select>
        </label>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {(Object.keys(out) as Unit[]).map((u) => (
          <div key={u} className="card text-center !py-4">
            <div className="text-3xl font-bold text-[color:var(--color-brand)]">{out[u].toFixed(2)}</div>
            <div className="text-xs uppercase tracking-wide text-[color:var(--color-fg-soft)]">{u === "C" ? "°C" : u === "F" ? "°F" : "K"} {labels[u]}</div>
          </div>
        ))}
      </div>
      <div className="card !p-3 text-xs text-[color:var(--color-fg-soft)] space-y-1">
        <div><strong>Fórmulas:</strong></div>
        <div>°F = °C × 9/5 + 32</div>
        <div>K = °C + 273.15</div>
        <div>°C = (°F − 32) × 5/9</div>
      </div>
    </div>
  );
}
