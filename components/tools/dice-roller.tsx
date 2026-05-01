"use client";
import { useState } from "react";

const FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export function DiceRoller() {
  const [count, setCount] = useState(2);
  const [sides, setSides] = useState(6);
  const [results, setResults] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);

  function roll() {
    if (rolling) return;
    setRolling(true);
    let ticks = 0;
    const id = setInterval(() => {
      setResults(Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1));
      if (++ticks >= 8) {
        clearInterval(id);
        setRolling(false);
      }
    }, 90);
  }

  const total = results.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm">Dados<input type="number" min="1" max="20" className="input mt-1" value={count} onChange={(e) => setCount(Math.max(1, Math.min(20, +e.target.value || 1)))} /></label>
        <label className="block text-sm">Caras
          <select className="input mt-1" value={sides} onChange={(e) => setSides(+e.target.value)}>
            <option value={4}>D4</option>
            <option value={6}>D6</option>
            <option value={8}>D8</option>
            <option value={10}>D10</option>
            <option value={12}>D12</option>
            <option value={20}>D20</option>
            <option value={100}>D100</option>
          </select>
        </label>
      </div>
      <button onClick={roll} disabled={rolling} className="btn btn-primary w-full !py-3">{rolling ? "Tirando…" : "🎲 Tirar dados"}</button>
      {results.length > 0 && (
        <div className="card !p-4 text-center">
          <div className="flex justify-center flex-wrap gap-3 mb-4">
            {results.map((v, i) => (
              <div key={i} className="w-16 h-16 rounded-xl bg-[color:var(--color-brand-soft)] flex items-center justify-center text-3xl font-bold text-[color:var(--color-brand)]">
                {sides === 6 ? FACES[v - 1] : v}
              </div>
            ))}
          </div>
          {results.length > 1 && (
            <div>
              <div className="text-xs uppercase text-[color:var(--color-fg-soft)]">Suma total</div>
              <div className="text-3xl font-bold text-[color:var(--color-brand)]">{total}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
