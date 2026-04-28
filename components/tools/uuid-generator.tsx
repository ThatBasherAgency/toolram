"use client";
import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";

export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [list, setList] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  function generate() {
    setList(Array.from({ length: count }, () => crypto.randomUUID()));
  }

  async function copyAll() {
    await navigator.clipboard.writeText(list.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs uppercase mb-1">Cantidad</label>
          <input type="number" min={1} max={500} className="input w-24" value={count} onChange={(e) => setCount(Math.max(1, parseInt(e.target.value || "1")))} />
        </div>
        <button onClick={generate} className="btn btn-primary"><RefreshCw className="w-4 h-4" /> Generar</button>
        <button onClick={copyAll} disabled={!list.length} className="btn btn-ghost">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? "Copiado" : "Copiar todos"}
        </button>
      </div>
      <div className="card !p-3">
        {list.length === 0 ? (
          <div className="text-sm text-[color:var(--color-fg-soft)]">Tocá Generar para crear UUIDs.</div>
        ) : (
          <ul className="space-y-1 font-mono text-sm">
            {list.map((u, i) => (
              <li key={i} className="break-all">{u}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
