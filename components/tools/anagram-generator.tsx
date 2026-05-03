"use client";
import { useMemo, useState } from "react";
import { Shuffle, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 280)";

function permute(arr: string[], limit: number): string[] {
  const out = new Set<string>();
  function bt(cur: string[], rest: string[]) {
    if (out.size >= limit) return;
    if (rest.length === 0) { out.add(cur.join("")); return; }
    for (let i = 0; i < rest.length; i++) {
      bt([...cur, rest[i]], [...rest.slice(0, i), ...rest.slice(i + 1)]);
    }
  }
  bt([], arr);
  return [...out];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function AnagramGenerator() {
  const [text, setText] = useState("AMOR");
  const [seed, setSeed] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const anagrams = useMemo(() => {
    void seed;
    const clean = text.replace(/\s+/g, "").toUpperCase();
    if (!clean) return [];
    if (clean.length <= 7) {
      const all = permute([...clean], 5040);
      return all.filter((a) => a !== clean).slice(0, 100);
    }
    const random: string[] = [];
    for (let i = 0; i < 50; i++) {
      const sh = shuffle([...clean]).join("");
      if (sh !== clean && !random.includes(sh)) random.push(sh);
    }
    return random;
  }, [text, seed]);

  async function copy(s: string, i: number) {
    await navigator.clipboard.writeText(s);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1200);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Anagramas</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Reordena las letras de una palabra para encontrar todas las combinaciones posibles.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <input className="w-full px-4 py-4 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-3xl font-bold text-center uppercase tracking-widest focus:outline-none focus:border-[color:var(--color-brand)]" value={text} onChange={(e) => setText(e.target.value)} placeholder="Palabra a reordenar" maxLength={12} />
        <div className="flex items-center justify-between mt-3 text-sm">
          <span className="text-[color:var(--color-fg-soft)]">{text.replace(/\s+/g, "").length} letras → {anagrams.length} {text.length > 7 ? "combinaciones aleatorias" : "permutaciones"}</span>
          {text.length > 7 && (
            <button onClick={() => setSeed((s) => s + 1)} className="px-3 py-1.5 rounded-lg bg-[color:var(--color-bg-soft)] text-xs font-bold inline-flex items-center gap-1"><Shuffle className="w-3 h-3" /> Mezclar más</button>
          )}
        </div>
      </div>

      {anagrams.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {anagrams.map((a, i) => (
              <button key={i} onClick={() => copy(a, i)} className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2 font-mono font-bold text-sm hover:border-[color:var(--color-brand)] transition flex items-center justify-between gap-2">
                <span>{a}</span>
                {copiedIdx === i ? <Check className="w-3 h-3 text-[color:var(--color-success)]" /> : <Copy className="w-3 h-3 text-[color:var(--color-fg-soft)]" />}
              </button>
            ))}
          </div>

          <AdSlot slot="anagram_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">🔤 Sobre los anagramas</strong>
        <ul className="space-y-1">
          <li>• Un anagrama es reordenar las letras de una palabra para formar otra.</li>
          <li>• Hasta <strong className="text-[color:var(--color-fg)]">7 letras</strong> mostramos TODAS las permutaciones (5,040 max).</li>
          <li>• Más de 7 letras → mostramos 50 combinaciones aleatorias.</li>
          <li>• Útil para crucigramas, juegos de palabras, encontrar nombres únicos.</li>
        </ul>
      </div>
    </div>
  );
}
