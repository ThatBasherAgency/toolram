"use client";
import { useMemo, useState } from "react";
import { User, RefreshCw, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 240)";

const ADJ = ["epic","cool","wild","brave","silent","fast","dark","golden","silver","shadow","cosmic","mystic","savage","bright","crazy","royal","fierce","stellar","frozen","crimson","neon","mighty","rapid","ghost","dragon","cyber","pixel","atomic","stealth","blaze","vortex","echo","static","fluid","chrome","prime","alpha","omega","zen","nova"];
const NOUN = ["wolf","ninja","ghost","phoenix","tiger","panda","fox","raven","viper","shark","eagle","hawk","cobra","panther","falcon","pirate","wizard","knight","king","queen","ace","hunter","ranger","sniper","rider","gamer","pilot","captain","viking","samurai","ronin","monk","sage","oracle","reaper","blade","storm","frost","ember","void","glitch"];

const STYLES = [
  { name: "Gaming", fn: () => `${rand(ADJ)}_${rand(NOUN)}${randNum(2)}` },
  { name: "Aesthetic", fn: () => `${rand(NOUN)}.${rand(ADJ)}` },
  { name: "Pro", fn: () => `${capitalize(rand(NOUN))}${capitalize(rand(ADJ))}` },
  { name: "Underscore", fn: () => `_${rand(ADJ)}_${rand(NOUN)}_` },
  { name: "X Theme", fn: () => `x${capitalize(rand(NOUN))}${capitalize(rand(ADJ))}x` },
  { name: "1337", fn: () => leetify(`${rand(ADJ)}${rand(NOUN)}`) },
  { name: "Numbers", fn: () => `${rand(NOUN)}${randNum(4)}` },
  { name: "Uppercase", fn: () => `${rand(ADJ).toUpperCase()}${rand(NOUN).toUpperCase()}` }
];

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function randNum(n: number): string { return String(Math.floor(Math.random() * Math.pow(10, n))).padStart(n, "0"); }
function capitalize(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }
function leetify(s: string): string { return s.replace(/a/gi, "4").replace(/e/gi, "3").replace(/i/gi, "1").replace(/o/gi, "0").replace(/s/gi, "5").replace(/t/gi, "7"); }

export function UsernameGenerator() {
  const [base, setBase] = useState("");
  const [seed, setSeed] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const usernames = useMemo(() => {
    void seed;
    if (base.trim()) {
      const b = base.trim().toLowerCase().replace(/\s+/g, "");
      return [
        `${b}_${rand(ADJ)}`,
        `${rand(ADJ)}.${b}`,
        `${b}${randNum(3)}`,
        `_${b}_x`,
        `${b}${rand(NOUN)}`,
        `${capitalize(b)}${capitalize(rand(NOUN))}`,
        leetify(b),
        `the.${b}`,
        `real.${b}`,
        `${b}_official`,
        `${b}.${randNum(2)}`,
        `${b}_yt`,
        `${b}_tv`,
        `${b}_pro`,
        `${b}_${rand(NOUN)}${randNum(2)}`,
        `xX_${b}_Xx`
      ];
    }
    return STYLES.flatMap((s) => Array.from({ length: 3 }, () => ({ style: s.name, name: s.fn() })));
  }, [base, seed]);

  async function copy(name: string, i: number) {
    await navigator.clipboard.writeText(name);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1200);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Usernames</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Nombres únicos para Instagram, TikTok, Twitch, Discord, gaming · 8 estilos diferentes.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Tu nombre o palabra base (opcional)</span>
          <input className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-mono focus:outline-none focus:border-[color:var(--color-brand)]" value={base} onChange={(e) => setBase(e.target.value)} placeholder="dejá vacío para variedad de estilos" />
        </label>
        <button onClick={() => setSeed((s) => s + 1)} className="mt-4 w-full px-6 py-3 rounded-xl text-white font-bold inline-flex items-center justify-center gap-2" style={{ background: ACCENT }}>
          <RefreshCw className="w-4 h-4" /> Regenerar usernames
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-2 mb-6">
        {usernames.map((u, i) => {
          const isObj = typeof u === "object";
          const name = isObj ? u.name : u;
          const style = isObj ? u.style : "";
          return (
            <button key={i + name} onClick={() => copy(name, i)} className="rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-3 text-left hover:border-[color:var(--color-brand)] transition group flex items-center justify-between gap-2">
              <div>
                <div className="font-mono font-bold text-base break-all">@{name}</div>
                {style && <div className="text-[10px] uppercase tracking-wide text-[color:var(--color-fg-soft)] font-bold">{style}</div>}
              </div>
              <div className="flex-shrink-0">
                {copiedIdx === i ? <Check className="w-4 h-4 text-[color:var(--color-success)]" /> : <Copy className="w-4 h-4 text-[color:var(--color-fg-soft)] group-hover:text-[color:var(--color-brand)]" />}
              </div>
            </button>
          );
        })}
      </div>

      <AdSlot slot="username_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">💡 Tips para username perfecto</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Más corto = mejor</strong> (máx 15 chars en Twitter, 30 en IG).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Evitá números aleatorios</strong> (jorge_91829) — quedan poco profesionales.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Consistencia entre redes</strong> ayuda a tu marca personal.</li>
          <li>• Verificá disponibilidad en namechk.com o checkusernames.com antes de elegir.</li>
        </ul>
      </div>
    </div>
  );
}
