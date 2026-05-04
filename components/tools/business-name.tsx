"use client";
import { useMemo, useState } from "react";
import { Building2, RefreshCw, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 165)";

const PREFIXES = ["Neo", "Pro", "Eco", "Smart", "Fast", "Quick", "Bright", "Pure", "Vital", "Elite", "Prime", "Core", "Ultra", "Mega", "Hyper", "Nova", "Aero", "Hydro", "Bio", "Tech"];
const SUFFIXES = ["Lab", "Hub", "Cloud", "Studio", "Works", "Solutions", "Co", "Group", "Tech", "Digital", "Pro", "Plus", "Box", "Kit", "Wave", "Forge", "Logic", "Mind", "Stack", "Spark"];
const ROOTS = ["nova", "lumi", "kuro", "vela", "argo", "veno", "kira", "solo", "lex", "mira", "vio", "tana", "kelvin", "aurum", "delta", "zeta"];

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

const STYLES = [
  { name: "Compuesto EN", fn: (b: string) => `${rand(PREFIXES)}${b ? b.charAt(0).toUpperCase() + b.slice(1) : rand(ROOTS)}` },
  { name: "Marca + Sufijo", fn: (b: string) => `${b || rand(ROOTS)}${rand(SUFFIXES)}` },
  { name: "Mash-up", fn: (b: string) => `${rand(PREFIXES)}${rand(ROOTS)}` },
  { name: "Espaciado", fn: (b: string) => `${b || rand(ROOTS)} ${rand(SUFFIXES)}` },
  { name: "ily / ify", fn: (b: string) => `${b || rand(ROOTS)}${Math.random() < 0.5 ? "ify" : "ly"}` },
  { name: "Pre + Espacio", fn: (b: string) => `${rand(PREFIXES)} ${b || rand(ROOTS)}` }
];

export function BusinessName() {
  const [base, setBase] = useState("");
  const [seed, setSeed] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const names = useMemo(() => {
    void seed;
    const out: string[] = [];
    for (let i = 0; i < 30; i++) {
      const style = STYLES[Math.floor(Math.random() * STYLES.length)];
      out.push(style.fn(base));
    }
    return Array.from(new Set(out));
  }, [base, seed]);

  async function copy(name: string, i: number) {
    await navigator.clipboard.writeText(name);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1000);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Nombres de Empresa</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Naming creativo para startups, marcas y productos · 6 estilos diferentes.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6 space-y-3">
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Palabra base (opcional)</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-mono" value={base} onChange={(e) => setBase(e.target.value)} placeholder="dejá vacío para nombres random" /></label>
        <button onClick={() => setSeed((s) => s + 1)} className="w-full px-4 py-3 rounded-xl text-white font-bold inline-flex items-center justify-center gap-2" style={{ background: ACCENT }}><RefreshCw className="w-4 h-4" /> Generar 30 ideas</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
        {names.map((n, i) => (
          <button key={n} onClick={() => copy(n, i)} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-3 text-left hover:border-[color:var(--color-brand)] flex items-center justify-between gap-2 group">
            <span className="font-bold">{n}</span>
            {copiedIdx === i ? <Check className="w-4 h-4 text-[color:var(--color-success)]" /> : <Copy className="w-4 h-4 text-[color:var(--color-fg-soft)]" />}
          </button>
        ))}
      </div>

      <AdSlot slot="bizname_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2"><Building2 className="w-4 h-4 inline mr-1" /> Cómo elegir</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Verificá disponibilidad de .com</strong> en namecheap o godaddy</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Buscá en Google</strong> que no exista ya en tu industria</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Verificá Instagram + Twitter</strong> (handles disponibles)</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Pronunciable</strong> en español E inglés (mercados globales)</li>
        </ul>
      </div>
    </div>
  );
}
