"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

const COMBINING = /[̀-ͯ]/g;

export function RemoveAccents() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const noAccents = text.normalize("NFD").replace(COMBINING, "");
  const safe = noAccents.replace(/ñ/g, "n").replace(/Ñ/g, "N");
  const slug = safe.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  const variants = {
    "Sin tildes": noAccents,
    "Sin tildes ni ñ": safe,
    "Slug URL-friendly": slug
  };

  async function copy(k: string, v: string) {
    await navigator.clipboard.writeText(v);
    setCopied(k);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="space-y-4">
      <textarea className="input" rows={5} placeholder="Pegá tu texto con tildes y acentos…" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="space-y-3">
        {Object.entries(variants).map(([k, v]) => (
          <div key={k} className="card !p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wide text-[color:var(--color-fg-soft)]">{k}</span>
              <button onClick={() => copy(k, v)} className="btn btn-ghost h-7 !px-2 text-xs" disabled={!v}>
                {copied === k ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied === k ? "Copiado" : "Copiar"}
              </button>
            </div>
            <div className={`break-words min-h-[2rem] ${k.includes("Slug") ? "font-mono text-sm" : "text-sm"}`}>{v || <span className="text-[color:var(--color-fg-soft)]">…</span>}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
