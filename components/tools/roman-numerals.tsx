"use client";
import { useMemo, useState } from "react";
import { ArrowRightLeft, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 25)";

const VALUES: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
];

function toRoman(n: number): string {
  if (n <= 0 || n > 3999) return "—";
  let res = "";
  for (const [val, sym] of VALUES) {
    while (n >= val) { res += sym; n -= val; }
  }
  return res;
}

function fromRoman(s: string): number | null {
  const r = s.toUpperCase().trim();
  if (!/^[IVXLCDM]+$/.test(r)) return null;
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0, prev = 0;
  for (let i = r.length - 1; i >= 0; i--) {
    const cur = map[r[i]];
    if (cur < prev) total -= cur;
    else total += cur;
    prev = cur;
  }
  if (toRoman(total) !== r) return null;
  return total;
}

export function RomanNumerals() {
  const [mode, setMode] = useState<"to" | "from">("to");
  const [val, setVal] = useState("2026");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (mode === "to") {
      const n = parseInt(val);
      if (isNaN(n) || n <= 0 || n > 3999) return { ok: false, text: "Número entre 1 y 3999" };
      return { ok: true, text: toRoman(n) };
    }
    const n = fromRoman(val);
    if (n === null) return { ok: false, text: "Romano no válido" };
    return { ok: true, text: n.toString() };
  }, [val, mode]);

  async function copy() {
    if (!result.ok) return;
    await navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Convertidor Números Romanos</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Convierte de número a romano y viceversa · Soporta 1 a 3999.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="inline-flex rounded-xl bg-[color:var(--color-bg-soft)] p-1 flex-1">
            <button onClick={() => setMode("to")} className="flex-1 px-4 py-2.5 rounded-lg text-sm font-bold transition" style={mode === "to" ? { background: ACCENT, color: "white" } : {}}>Número → Romano</button>
            <button onClick={() => setMode("from")} className="flex-1 px-4 py-2.5 rounded-lg text-sm font-bold transition" style={mode === "from" ? { background: ACCENT, color: "white" } : {}}>Romano → Número</button>
          </div>
          <button onClick={() => { setMode(mode === "to" ? "from" : "to"); setVal(result.ok ? result.text : val); }} className="w-11 h-11 rounded-xl bg-[color:var(--color-bg-soft)] flex items-center justify-center"><ArrowRightLeft className="w-4 h-4" /></button>
        </div>

        <input type={mode === "to" ? "number" : "text"} className="w-full px-4 py-4 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-3xl font-mono tabular-nums text-center font-bold focus:outline-none focus:border-[color:var(--color-brand)]" value={val} onChange={(e) => setVal(e.target.value)} placeholder={mode === "to" ? "2026" : "MMXXVI"} />
      </div>

      {result.ok && (
        <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
          <div className="text-xs uppercase opacity-80 tracking-widest mb-2">Resultado</div>
          <div className="text-5xl md:text-7xl font-black tracking-wider mb-3 break-all">{result.text}</div>
          <button onClick={copy} className="px-4 py-2 rounded-lg bg-white/20 text-sm font-bold inline-flex items-center gap-1.5">
            {copied ? <><Check className="w-4 h-4" /> Copiado</> : <><Copy className="w-4 h-4" /> Copiar</>}
          </button>
        </div>
      )}
      {!result.ok && (
        <div className="rounded-2xl bg-[color:var(--color-danger)]/10 border border-[color:var(--color-danger)] p-4 mb-6 text-[color:var(--color-danger)] text-sm font-bold text-center">{result.text}</div>
      )}

      <AdSlot slot="roman_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)] mb-4">
        <strong className="text-[color:var(--color-fg)] block mb-2">📜 Símbolos básicos</strong>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-2 text-center font-mono">
          {[["I", "1"], ["V", "5"], ["X", "10"], ["L", "50"], ["C", "100"], ["D", "500"], ["M", "1000"]].map(([sym, val]) => (
            <div key={sym} className="bg-[color:var(--color-bg)] rounded-lg p-2 border border-[color:var(--color-border)]">
              <div className="text-2xl font-extrabold text-[color:var(--color-fg)]">{sym}</div>
              <div className="text-xs">{val}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📐 Reglas de uso</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Repetición:</strong> I, X, C, M se repiten hasta 3 veces (III=3, MMM=3000).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">V, L, D nunca se repiten</strong>.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Sustracción:</strong> IV=4, IX=9, XL=40, XC=90, CD=400, CM=900.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Máximo 3999:</strong> MMMCMXCIX. Para más se usa raya superior (vinculum).</li>
        </ul>
      </div>
    </div>
  );
}
