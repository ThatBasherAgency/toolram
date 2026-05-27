"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopySymbolButton({ symbol, label }: { symbol: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(symbol);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = symbol;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {}
      document.body.removeChild(ta);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[color:var(--color-brand)] text-white font-bold hover:scale-105 transition"
      aria-label={`Copiar símbolo ${symbol} al portapapeles`}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? "¡Copiado!" : label || `Copiar ${symbol}`}
    </button>
  );
}
