"use client";
import { useMemo, useState } from "react";
import { Binary, Copy, Check, ArrowRightLeft } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.65 0.2 145)";

export function BinaryText() {
  const [mode, setMode] = useState<"to" | "from">("to");
  const [input, setInput] = useState("Hola Toolram");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (mode === "to") {
      return [...input].map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
    }
    try {
      return input.replace(/\s+/g, " ").trim().split(" ").map((b) => String.fromCharCode(parseInt(b, 2))).join("");
    } catch { return ""; }
  }, [input, mode]);

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Convertidor Texto ↔ Binario</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Codifica texto en binario (UTF-8 / ASCII) y viceversa · Útil para aprender computación.</p>
      </div>

      <div className="flex justify-center gap-3 mb-4">
        <button onClick={() => setMode("to")} className="px-4 py-2 rounded-lg text-sm font-bold transition" style={mode === "to" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>Texto → Binario</button>
        <button onClick={() => { setMode(mode === "to" ? "from" : "to"); setInput(output); }} className="w-10 h-10 rounded-lg bg-[color:var(--color-bg-soft)] flex items-center justify-center"><ArrowRightLeft className="w-4 h-4" /></button>
        <button onClick={() => setMode("from")} className="px-4 py-2 rounded-lg text-sm font-bold transition" style={mode === "from" ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>Binario → Texto</button>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-4">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-32 px-3 py-2 rounded-lg bg-transparent font-mono text-base focus:outline-none resize-y" />
      </div>

      <div className="rounded-2xl bg-black/95 text-green-300 p-5 font-mono text-sm relative mb-6">
        <button onClick={copy} className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-white/10 text-xs text-white inline-flex items-center gap-1">{copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}</button>
        <pre className="whitespace-pre-wrap break-all pr-20">{output}</pre>
      </div>

      <AdSlot slot="bintxt_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2"><Binary className="w-4 h-4 inline mr-1" /> Cómo funciona</strong>
        Cada caracter ASCII se representa con 8 bits (1 byte). Ejemplo: A = 65 = 01000001. Para texto con acentos o emojis se usa UTF-8 (1-4 bytes por caracter).
      </div>
    </div>
  );
}
