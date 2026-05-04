"use client";
import { useMemo, useState } from "react";
import { Youtube, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.24 25)";

const SUFFIXES = ["tutorial", "español", "2026", "como hacer", "explicado", "para principiantes", "guía completa", "trucos", "tips", "review", "mejor", "gratis", "online", "rápido", "fácil", "paso a paso", "que necesitas saber", "actualizado"];

export function YoutubeTags() {
  const [keyword, setKeyword] = useState("");
  const [copied, setCopied] = useState(false);

  const tags = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return [];
    const out = [k];
    SUFFIXES.forEach((s) => out.push(`${k} ${s}`));
    out.push(`como ${k}`, `que es ${k}`, `${k} español`, `${k} explicado`, `mejor ${k}`, `${k} 2026`);
    return Array.from(new Set(out));
  }, [keyword]);

  async function copyAll() {
    await navigator.clipboard.writeText(tags.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  const totalChars = tags.join(", ").length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Tags para YouTube</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Tags optimizados para SEO de video · Variaciones long-tail · Pegado directo en YouTube Studio.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6">
        <input className="w-full px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-xl font-bold text-center" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="palabra clave del video..." />
      </div>

      {tags.length > 0 && (
        <>
          <div className="rounded-3xl p-6 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 mb-2 inline-flex items-center gap-1.5"><Youtube className="w-3 h-3" /> {tags.length} tags · {totalChars}/500 chars</div>
            <button onClick={copyAll} className="px-4 py-2 rounded-lg bg-white text-black font-bold text-sm inline-flex items-center gap-1.5">{copied ? <><Check className="w-4 h-4" /> Copiado</> : <><Copy className="w-4 h-4" /> Copiar separados por coma</>}</button>
          </div>

          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4 mb-6">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-[color:var(--color-bg-soft)] text-xs font-medium">{t}</span>
              ))}
            </div>
          </div>

          <AdSlot slot="yttags_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📺 Cómo agregar tags</strong>
        En YouTube Studio → Detalles del video → Mostrar más → Tags · Pegá la lista. <strong className="text-[color:var(--color-fg)]">Máximo 500 caracteres</strong>. Los primeros 3-5 son los más importantes para el algoritmo.
      </div>
    </div>
  );
}
