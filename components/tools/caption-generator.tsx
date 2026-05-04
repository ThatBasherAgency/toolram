"use client";
import { useMemo, useState } from "react";
import { Instagram, RefreshCw, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 320)";

const HOOKS = ["✨ Plot twist:", "💭 Real talk:", "🔥 Esto es lo que pasa:", "🤫 Secreto:", "💯 100% verdad:", "👀 Mirá esto:", "📌 Guarda esto:", "🎯 PRO tip:"];
const ENGAGE = ["¿Coincidís? 👇", "Déjame tu opinión 💬", "¿Vos qué pensás?", "Compartilo si te gusta 🔁", "Etiquetá a alguien que necesite ver esto 🏷️", "¿Cuál te gusta más? Comentá 1, 2 o 3."];
const CTAS = ["👉 Link en bio", "💌 Dale al ❤️", "🔖 Guardá este post", "📩 DM para más info"];

const TEMPLATES = {
  Instagram: (theme: string) => `${HOOKS[Math.floor(Math.random() * HOOKS.length)]}\n\n${theme}\n\n${ENGAGE[Math.floor(Math.random() * ENGAGE.length)]}\n\n${CTAS[Math.floor(Math.random() * CTAS.length)]}\n.\n.\n.\n#${theme.split(" ")[0].toLowerCase()} #aesthetic #vibes #life`,
  TikTok: (theme: string) => `${HOOKS[Math.floor(Math.random() * HOOKS.length)]} ${theme} 👀\n\n${ENGAGE[Math.floor(Math.random() * ENGAGE.length)]}\n\n#fyp #parati #${theme.split(" ")[0].toLowerCase()} #viral`,
  LinkedIn: (theme: string) => `${theme}\n\nUn aprendizaje clave que me llevó años entender:\n\n→ Punto 1: lo que cambió todo\n→ Punto 2: lo contraintuitivo\n→ Punto 3: la conclusión obvia (en retrospectiva)\n\n¿Te pasó algo similar? Cuéntame en los comentarios.`,
  "Twitter / X": (theme: string) => `${theme}\n\nUn thread 🧵 de cosas que aprendí:\n\n1/`
};

export function CaptionGenerator() {
  const [theme, setTheme] = useState("rutinas matutinas que cambian tu vida");
  const [seed, setSeed] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const captions = useMemo(() => {
    void seed;
    return Object.entries(TEMPLATES).map(([k, fn]) => ({ platform: k, text: fn(theme) }));
  }, [theme, seed]);

  async function copy(t: string, i: number) {
    await navigator.clipboard.writeText(t);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1000);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Captions Redes Sociales</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Captions optimizados para Instagram, TikTok, LinkedIn, Twitter · Hooks + engagement + CTAs.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6">
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Tema del post</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base" value={theme} onChange={(e) => setTheme(e.target.value)} /></label>
        <button onClick={() => setSeed((s) => s + 1)} className="w-full mt-3 px-4 py-2 rounded-xl text-white font-bold inline-flex items-center justify-center gap-2" style={{ background: ACCENT }}><RefreshCw className="w-4 h-4" /> Regenerar variaciones</button>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-6">
        {captions.map((c, i) => (
          <div key={c.platform} className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
            <div className="flex items-center justify-between mb-2"><div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] inline-flex items-center gap-1"><Instagram className="w-3 h-3" /> {c.platform}</div><button onClick={() => copy(c.text, i)} className="px-2 py-1 rounded bg-[color:var(--color-bg-soft)] text-xs font-bold inline-flex items-center gap-1">{copiedIdx === i ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}</button></div>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{c.text}</pre>
          </div>
        ))}
      </div>

      <AdSlot slot="caption_inline" format="auto" minHeight={180} className="mb-6" />
    </div>
  );
}
