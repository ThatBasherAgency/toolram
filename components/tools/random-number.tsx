"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function RandomNumber() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  function generate() {
    if (max < min) return;
    const range = max - min + 1;
    let nums: number[] = [];
    if (unique && count <= range) {
      const pool = Array.from({ length: range }, (_, i) => min + i);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      nums = pool.slice(0, count);
    } else {
      nums = Array.from({ length: count }, () => Math.floor(Math.random() * range) + min);
    }
    setResults(nums);
  }

  async function copy() {
    await navigator.clipboard.writeText(results.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm">Mínimo<input type="number" className="input mt-1" value={min} onChange={(e) => setMin(+e.target.value || 0)} /></label>
        <label className="block text-sm">Máximo<input type="number" className="input mt-1" value={max} onChange={(e) => setMax(+e.target.value || 0)} /></label>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm">Cantidad<input type="number" min="1" max="1000" className="input mt-1" value={count} onChange={(e) => setCount(Math.max(1, Math.min(1000, +e.target.value || 1)))} /></label>
        <label className="flex items-center gap-2 text-sm mt-6"><input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} /> Sin repetir</label>
      </div>
      <button onClick={generate} className="btn btn-primary w-full !py-3">🎲 Generar</button>
      {results.length > 0 && (
        <div className="card !p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase text-[color:var(--color-fg-soft)]">{results.length === 1 ? "Resultado" : `${results.length} números`}</span>
            <button onClick={copy} className="btn btn-ghost h-7 !px-2 text-xs">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}{copied ? "Copiado" : "Copiar"}</button>
          </div>
          {results.length === 1 ? (
            <div className="text-5xl font-bold text-center text-[color:var(--color-brand)] py-3">{results[0]}</div>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-60 overflow-auto">
              {results.map((n, i) => <span key={i} className="px-3 py-1 rounded-md bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand)] font-mono text-sm">{n}</span>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
