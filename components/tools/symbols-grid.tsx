"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { Symbol } from "@/data/symbols";

export function SymbolsGrid({ symbols }: { symbols: Symbol[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(s: Symbol) {
    await navigator.clipboard.writeText(s.char);
    setCopied(s.char);
    setTimeout(() => setCopied(null), 1100);
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {symbols.map((s, i) => (
        <button
          key={`${s.char}-${i}`}
          onClick={() => copy(s)}
          className="card group flex flex-col items-center text-center !p-4 hover:!border-[color:var(--color-brand)] active:scale-95 transition"
          title={`Copiar ${s.name}`}
        >
          <div className="text-4xl md:text-5xl mb-2 leading-none min-h-[1.2em]">{s.char}</div>
          <div className="text-xs font-medium truncate w-full">{s.name}</div>
          <div className="text-[10px] text-[color:var(--color-fg-soft)] mt-1 flex items-center gap-1">
            {copied === s.char ? <><Check className="w-3 h-3 text-[color:var(--color-success)]" /> Copiado</> : <><Copy className="w-3 h-3" /> {s.unicode}</>}
          </div>
        </button>
      ))}
    </div>
  );
}
