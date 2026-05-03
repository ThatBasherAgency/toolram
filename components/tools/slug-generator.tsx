"use client";
import { useMemo, useState } from "react";
import { Link2, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 200)";

const STOPWORDS = new Set(["el","la","los","las","un","una","de","del","y","o","en","a","ante","para","por","con","sin","sobre","tras","como","es","ser","muy","más","menos","si","no","que","se","te","me","lo","al"]);

function slugify(text: string, opts: { sep: string; lower: boolean; stripWords: boolean; maxLen: number }): string {
  let s = text.normalize("NFD").replace(/[̀-ͯ]/g, "");
  if (opts.lower) s = s.toLowerCase();
  s = s.replace(/[^a-zA-Z0-9\s-_]/g, "");
  s = s.replace(/\s+/g, " ").trim();
  let words = s.split(/[\s\-_]+/).filter(Boolean);
  if (opts.stripWords) words = words.filter((w) => !STOPWORDS.has(w.toLowerCase()));
  if (opts.maxLen > 0) {
    let total = 0;
    words = words.filter((w) => {
      total += w.length + 1;
      return total <= opts.maxLen;
    });
  }
  return words.join(opts.sep);
}

export function SlugGenerator() {
  const [text, setText] = useState("Las 10 mejores prácticas SEO para 2026");
  const [sep, setSep] = useState("-");
  const [lower, setLower] = useState(true);
  const [stripWords, setStripWords] = useState(true);
  const [maxLen, setMaxLen] = useState(60);
  const [copied, setCopied] = useState(false);

  const slug = useMemo(() => slugify(text, { sep, lower, stripWords, maxLen }), [text, sep, lower, stripWords, maxLen]);

  async function copy() {
    await navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Slug URL</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Convierte títulos en URLs amigables para SEO · sin acentos, sin stopwords, max 60 chars.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 space-y-4">
        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Título o frase</span>
          <input className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base focus:outline-none focus:border-[color:var(--color-brand)]" value={text} onChange={(e) => setText(e.target.value)} />
        </label>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-1.5">Separador</span>
            <div className="grid grid-cols-3 gap-1">
              {["-", "_", "."].map((s) => (
                <button key={s} onClick={() => setSep(s)} className="px-3 py-2 rounded-md font-mono text-sm font-bold transition" style={sep === s ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-1.5">Largo máx: {maxLen} chars</span>
            <input type="range" min="20" max="120" value={maxLen} onChange={(e) => setMaxLen(+e.target.value)} className="w-full" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-bg-soft)] cursor-pointer">
            <input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} /> <span className="text-sm font-bold">Minúsculas</span>
          </label>
          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-bg-soft)] cursor-pointer">
            <input type="checkbox" checked={stripWords} onChange={(e) => setStripWords(e.target.checked)} /> <span className="text-sm font-bold">Quitar stopwords (de, la, el, y...)</span>
          </label>
        </div>
      </div>

      <div className="rounded-3xl p-6 md:p-8 text-white shadow-2xl mb-6 relative" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
        <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Link2 className="w-3 h-3" /> URL slug ({slug.length} chars)</div>
        <div className="font-mono text-2xl md:text-3xl font-bold break-all">/{slug}</div>
        <button onClick={copy} className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-white/20 backdrop-blur text-xs font-bold inline-flex items-center gap-1">
          {copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}
        </button>
      </div>

      <AdSlot slot="slug_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📐 Buenas prácticas SEO para slugs</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">3-5 palabras</strong> es el sweet spot — describe sin saturar.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Guiones (-) sobre underscores (_)</strong> — Google los lee como espacios.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Sin acentos ni eñes</strong> — más compatible con todos los browsers/CDNs.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Incluí la keyword principal</strong> al inicio del slug.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Evitá fechas en URL</strong> si vas a actualizar el contenido (queda viejo el slug).</li>
        </ul>
      </div>
    </div>
  );
}
