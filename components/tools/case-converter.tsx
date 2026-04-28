"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CASES = [
  { name: "MAYÚSCULAS", fn: (t: string) => t.toUpperCase() },
  { name: "minúsculas", fn: (t: string) => t.toLowerCase() },
  { name: "Title Case", fn: (t: string) => t.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase()) },
  { name: "Sentence case", fn: (t: string) => t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()) },
  { name: "aLtErNaDo", fn: (t: string) => t.split("").map((c, i) => (i % 2 ? c.toUpperCase() : c.toLowerCase())).join("") },
  { name: "InVeRsO", fn: (t: string) => t.split("").map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join("") }
];

export function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(name: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(name);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="space-y-4">
      <textarea className="input" rows={5} placeholder="Pegá tu texto…" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="grid sm:grid-cols-2 gap-3">
        {CASES.map((c) => {
          const out = c.fn(text);
          return (
            <div key={c.name} className="card !p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wide text-[color:var(--color-fg-soft)]">{c.name}</span>
                <button onClick={() => copy(c.name, out)} className="btn btn-ghost h-7 !px-2 text-xs" disabled={!out}>
                  {copied === c.name ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied === c.name ? "Copiado" : "Copiar"}
                </button>
              </div>
              <div className="text-sm break-words min-h-[2.5rem]">{out || <span className="text-[color:var(--color-fg-soft)]">…</span>}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
