"use client";
import { useMemo, useState } from "react";
import { Binary, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 145)";

type Base = "binary" | "octal" | "decimal" | "hex";

const BASES: Record<Base, { name: string; radix: number; pattern: RegExp }> = {
  binary: { name: "Binario (2)", radix: 2, pattern: /^[01]+$/ },
  octal: { name: "Octal (8)", radix: 8, pattern: /^[0-7]+$/ },
  decimal: { name: "Decimal (10)", radix: 10, pattern: /^\d+$/ },
  hex: { name: "Hexadecimal (16)", radix: 16, pattern: /^[0-9a-fA-F]+$/ }
};

export function BinaryConverter() {
  const [from, setFrom] = useState<Base>("decimal");
  const [val, setVal] = useState("255");
  const [copied, setCopied] = useState<Base | null>(null);

  const conversions = useMemo(() => {
    const v = val.trim();
    if (!v) return null;
    if (!BASES[from].pattern.test(v)) return null;
    const decimal = parseInt(v, BASES[from].radix);
    if (isNaN(decimal) || decimal > Number.MAX_SAFE_INTEGER) return null;
    return {
      binary: decimal.toString(2),
      octal: decimal.toString(8),
      decimal: decimal.toString(10),
      hex: decimal.toString(16).toUpperCase(),
      ascii: decimal >= 32 && decimal <= 126 ? String.fromCharCode(decimal) : "—"
    };
  }, [val, from]);

  async function copy(base: Base, text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(base);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Conversor Binario / Hex / Decimal</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Convierte entre binario, octal, decimal y hexadecimal · Útil para programación y electrónica.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {(Object.keys(BASES) as Base[]).map((b) => (
            <button key={b} onClick={() => setFrom(b)} className="px-3 py-2 rounded-lg text-xs font-bold transition" style={from === b ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>
              {BASES[b].name}
            </button>
          ))}
        </div>

        <input type="text" className="w-full px-4 py-4 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono tabular-nums focus:outline-none focus:border-[color:var(--color-brand)]" value={val} onChange={(e) => setVal(e.target.value)} placeholder={from === "binary" ? "10101010" : from === "hex" ? "FF" : "255"} />
      </div>

      {conversions && (
        <>
          <div className="grid md:grid-cols-2 gap-3 mb-6">
            {(Object.keys(BASES) as Base[]).map((b) => (
              <div key={b} className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">{BASES[b].name}</div>
                  <button onClick={() => copy(b, conversions[b])} className="text-xs">
                    {copied === b ? <Check className="w-3.5 h-3.5 text-[color:var(--color-success)]" /> : <Copy className="w-3.5 h-3.5 text-[color:var(--color-fg-soft)]" />}
                  </button>
                </div>
                <div className="font-mono text-xl font-bold break-all">{conversions[b] || "—"}</div>
              </div>
            ))}
          </div>

          {conversions.ascii !== "—" && (
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 mb-6">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-1">Carácter ASCII</div>
              <div className="text-4xl font-mono">{conversions.ascii}</div>
            </div>
          )}

          <div className="rounded-3xl p-6 text-white shadow-2xl mb-6" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Binary className="w-3 h-3" /> Representación binaria</div>
            <div className="font-mono text-2xl tracking-wider break-all">
              {conversions.binary.split("").map((c, i) => (
                <span key={i} style={{ color: c === "1" ? "white" : "rgba(255,255,255,0.4)" }}>{c}</span>
              ))}
            </div>
            <div className="text-xs opacity-70 mt-2">{conversions.binary.length} bits</div>
          </div>

          <AdSlot slot="binary_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">💡 Para qué sirven</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Binario:</strong> base de la computación, representa estados ON/OFF.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Octal:</strong> permisos de archivos en Unix/Linux (chmod 755).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Hexadecimal:</strong> colores CSS (#FF5733), direcciones de memoria, MAC.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">ASCII:</strong> 0-127 son caracteres estándar (A=65, a=97).</li>
        </ul>
      </div>
    </div>
  );
}
