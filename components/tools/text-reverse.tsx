"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function TextReverse() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const variants = {
    "Caracteres invertidos": [...text].reverse().join(""),
    "Palabras invertidas": text.split(/\s+/).reverse().join(" "),
    "Cada palabra invertida": text.split(/\s+/).map((w) => [...w].reverse().join("")).join(" "),
    "Líneas invertidas": text.split("\n").reverse().join("\n")
  };

  async function copy(k: string, v: string) {
    await navigator.clipboard.writeText(v);
    setCopied(k);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="space-y-4">
      <textarea className="input" rows={5} placeholder="Pegá tu texto…" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="grid sm:grid-cols-2 gap-3">
        {Object.entries(variants).map(([k, v]) => (
          <div key={k} className="card !p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wide text-[color:var(--color-fg-soft)]">{k}</span>
              <button onClick={() => copy(k, v)} className="btn btn-ghost h-7 !px-2 text-xs" disabled={!v}>
                {copied === k ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied === k ? "Copiado" : "Copiar"}
              </button>
            </div>
            <div className="text-sm break-words min-h-[2.5rem] whitespace-pre-wrap">{v || <span className="text-[color:var(--color-fg-soft)]">…</span>}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
