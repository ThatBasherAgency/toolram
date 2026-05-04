"use client";
import { useMemo, useState } from "react";
import { Copy, Check, Type } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 280)";

const FONTS: Record<string, Record<string, string[]>> = {
  Block: {
    A: [" █████ ", "██   ██", "███████", "██   ██", "██   ██"],
    B: ["██████ ", "██   ██", "██████ ", "██   ██", "██████ "],
    C: [" ██████", "██     ", "██     ", "██     ", " ██████"],
    D: ["██████ ", "██   ██", "██   ██", "██   ██", "██████ "],
    E: ["███████", "██     ", "█████  ", "██     ", "███████"],
    F: ["███████", "██     ", "█████  ", "██     ", "██     "],
    G: [" ██████", "██     ", "██  ███", "██   ██", " ██████"],
    H: ["██   ██", "██   ██", "███████", "██   ██", "██   ██"],
    I: ["██", "██", "██", "██", "██"],
    J: ["     ██", "     ██", "     ██", "██   ██", " █████ "],
    K: ["██   ██", "██  ██ ", "█████  ", "██  ██ ", "██   ██"],
    L: ["██     ", "██     ", "██     ", "██     ", "███████"],
    M: ["███    ███", "████  ████", "██ ████ ██", "██  ██  ██", "██      ██"],
    N: ["███   ██", "████  ██", "██ ██ ██", "██  ████", "██   ███"],
    O: [" ██████ ", "██    ██", "██    ██", "██    ██", " ██████ "],
    P: ["██████ ", "██   ██", "██████ ", "██     ", "██     "],
    Q: [" ██████ ", "██    ██", "██    ██", "██  ████", " ██████ "],
    R: ["██████ ", "██   ██", "██████ ", "██   ██", "██   ██"],
    S: [" ██████", "██     ", " █████ ", "     ██", " ██████"],
    T: ["████████", "   ██   ", "   ██   ", "   ██   ", "   ██   "],
    U: ["██   ██", "██   ██", "██   ██", "██   ██", " █████ "],
    V: ["██    ██", "██    ██", "██    ██", " ██  ██ ", "  ████  "],
    W: ["██     ██", "██  █  ██", "██ ███ ██", "████ ████", " ██   ██ "],
    X: ["██   ██", " ██ ██ ", "  ███  ", " ██ ██ ", "██   ██"],
    Y: ["██    ██", " ██  ██ ", "  ████  ", "   ██   ", "   ██   "],
    Z: ["███████", "    ██ ", "  ██   ", " ██    ", "███████"],
    " ": ["    ", "    ", "    ", "    ", "    "],
    "0": [" █████ ", "██   ██", "██   ██", "██   ██", " █████ "],
    "1": [" ██", "███", " ██", " ██", "███"],
    "2": ["██████ ", "     ██", " █████ ", "██     ", "███████"],
    "3": ["██████ ", "     ██", " █████ ", "     ██", "██████ "],
    "4": ["██   ██", "██   ██", "███████", "     ██", "     ██"],
    "5": ["███████", "██     ", "███████", "     ██", "███████"],
    "6": [" █████ ", "██     ", "███████", "██   ██", " █████ "],
    "7": ["███████", "    ██ ", "   ██  ", "  ██   ", " ██    "],
    "8": [" █████ ", "██   ██", " █████ ", "██   ██", " █████ "],
    "9": [" █████ ", "██   ██", " ██████", "     ██", " █████ "],
    "!": ["██", "██", "██", "  ", "██"],
    "?": ["██████ ", "    ██ ", "  ██   ", "       ", " ██    "]
  }
};

function makeArt(text: string, font: string, char: string): string {
  const f = FONTS[font];
  if (!f) return "";
  const lines = ["", "", "", "", ""];
  for (const c of text.toUpperCase()) {
    const glyph = f[c] || f[" "];
    for (let i = 0; i < 5; i++) {
      const block = glyph[i].replace(/█/g, char);
      lines[i] += block + " ";
    }
  }
  return lines.join("\n");
}

export function AsciiArt() {
  const [text, setText] = useState("HOLA");
  const [char, setChar] = useState("█");
  const [copied, setCopied] = useState(false);

  const art = useMemo(() => makeArt(text, "Block", char), [text, char]);

  async function copy() {
    await navigator.clipboard.writeText(art);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de ASCII Art</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Texto en arte ASCII estilo block · Para terminales, banners de README, splash screens.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6 grid md:grid-cols-2 gap-3">
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Texto (max 8 chars)</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-bold text-center uppercase" value={text} onChange={(e) => setText(e.target.value.slice(0, 8))} maxLength={8} /></label>
        <div><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-1">Caracter</span>
          <div className="grid grid-cols-6 gap-1">{["█", "▓", "▒", "░", "#", "$", "@", "*", "+", "•", "❤", "◆"].map((c) => (
            <button key={c} onClick={() => setChar(c)} className="px-2 py-2 rounded-md font-mono text-lg transition" style={char === c ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{c}</button>
          ))}</div>
        </div>
      </div>

      <div className="rounded-2xl bg-black/95 text-green-300 p-5 font-mono text-xs md:text-sm relative mb-6">
        <button onClick={copy} className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-white/10 text-xs text-white inline-flex items-center gap-1">{copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}</button>
        <pre className="whitespace-pre overflow-x-auto pr-20 leading-tight">{art}</pre>
      </div>

      <AdSlot slot="ascii_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2"><Type className="w-4 h-4 inline mr-1" /> Casos de uso</strong>
        Banners ASCII en README de GitHub, headers de scripts CLI, splash screens en aplicaciones de consola, signatures en foros old-school, comentarios decorativos en código.
      </div>
    </div>
  );
}
