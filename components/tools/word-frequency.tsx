"use client";
import { useMemo, useState } from "react";
import { BarChart3 } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 200)";

const STOPWORDS = new Set(["el","la","los","las","un","una","unos","unas","de","del","y","o","u","en","a","al","ante","bajo","con","contra","desde","durante","entre","hacia","hasta","mediante","para","por","según","sin","sobre","tras","es","son","fue","ser","ha","han","he","has","muy","más","menos","si","no","que","se","te","me","lo","le","les","nos","yo","tú","él","ella","como","pero","esto","eso","esta","ese","aquel","this","the","is","are","of","and","to","in"]);

export function WordFrequency() {
  const [text, setText] = useState("Toolram es la mejor plataforma de herramientas online gratis. Toolram tiene calculadoras, generadores y conversores. En Toolram cada herramienta es 100% gratis, sin registro y procesada en tu navegador.");
  const [excludeStopwords, setExcludeStopwords] = useState(true);
  const [minLength, setMinLength] = useState(3);

  const result = useMemo(() => {
    const words = text.toLowerCase().match(/\b[a-záéíóúñü]+\b/g) || [];
    const filtered = words.filter((w) => w.length >= minLength && (!excludeStopwords || !STOPWORDS.has(w)));
    const freq: Record<string, number> = {};
    filtered.forEach((w) => { freq[w] = (freq[w] || 0) + 1; });
    const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 50);
    return { sorted, total: filtered.length, unique: Object.keys(freq).length, totalWords: words.length };
  }, [text, excludeStopwords, minLength]);

  const max = result.sorted[0]?.[1] || 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Análisis de Frecuencia de Palabras</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Top 50 palabras más usadas en tu texto · Útil para SEO, ensayos, content writing.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6 space-y-3">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-40 px-3 py-2 rounded-lg bg-transparent text-base focus:outline-none resize-y" placeholder="Pegá tu texto..." />
        <div className="flex flex-wrap gap-3">
          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-bg-soft)] cursor-pointer text-sm">
            <input type="checkbox" checked={excludeStopwords} onChange={(e) => setExcludeStopwords(e.target.checked)} /> Excluir stopwords
          </label>
          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-bg-soft)] text-sm">
            Largo mín: {minLength}<input type="range" min="2" max="8" value={minLength} onChange={(e) => setMinLength(+e.target.value)} className="w-24" />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl bg-[color:var(--color-bg)] border border-[color:var(--color-border)] p-4 text-center"><div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Total palabras</div><div className="text-3xl font-extrabold tabular-nums">{result.totalWords}</div></div>
        <div className="rounded-2xl bg-[color:var(--color-bg)] border border-[color:var(--color-border)] p-4 text-center"><div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Únicas filtradas</div><div className="text-3xl font-extrabold tabular-nums">{result.unique}</div></div>
        <div className="rounded-2xl bg-[color:var(--color-bg)] border border-[color:var(--color-border)] p-4 text-center"><div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Diversidad</div><div className="text-3xl font-extrabold tabular-nums">{result.total > 0 ? ((result.unique / result.total) * 100).toFixed(0) : 0}%</div></div>
      </div>

      <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-6">
        <div className="font-bold mb-3 inline-flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Top {result.sorted.length}</div>
        <div className="space-y-1.5">
          {result.sorted.map(([word, count]) => (
            <div key={word} className="flex items-center gap-2">
              <div className="w-32 text-sm font-semibold truncate">{word}</div>
              <div className="flex-1 h-6 bg-[color:var(--color-bg-soft)] rounded-md overflow-hidden">
                <div className="h-full rounded-md flex items-center justify-end px-2 text-white text-xs font-bold" style={{ width: `${(count / max) * 100}%`, background: ACCENT }}>{count}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdSlot slot="wordfreq_inline" format="auto" minHeight={180} className="mb-6" />
    </div>
  );
}
