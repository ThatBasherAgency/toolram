"use client";
import { useMemo, useState } from "react";
import { Instagram, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 320)";

const STYLES = [
  { name: "Aesthetic", lines: 4, deco: ["✧", "✿", "⋆", "˚", "♡", "✦"] },
  { name: "Minimalista", lines: 3, deco: ["·", "—", "/"] },
  { name: "Profesional", lines: 4, deco: ["▸", "•", "↳"] },
  { name: "Divertido", lines: 4, deco: ["🌟", "✨", "🔥", "💫", "🎀"] },
  { name: "Emoji-heavy", lines: 5, deco: ["🌸", "🌿", "☕", "📚", "🎨", "🌙"] }
];

function generateBio(name: string, role: string, location: string, hobbies: string, link: string, style: typeof STYLES[number]): string {
  const deco = style.deco;
  const d = (i: number) => deco[i % deco.length];
  const parts: string[] = [];
  if (name) parts.push(`${d(0)} ${name}`);
  if (role) parts.push(`${d(1)} ${role}`);
  if (location) parts.push(`${d(2)} ${location}`);
  if (hobbies) parts.push(`${d(3)} ${hobbies}`);
  if (link) parts.push(`${d(4)} ${link}`);
  return parts.slice(0, style.lines).join("\n");
}

export function InstagramBio() {
  const [name, setName] = useState("Tu Nombre");
  const [role, setRole] = useState("Diseñadora gráfica");
  const [location, setLocation] = useState("CDMX");
  const [hobbies, setHobbies] = useState("Coffee + Travel");
  const [link, setLink] = useState("toolram.com");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const bios = useMemo(() => STYLES.map((s) => ({ style: s.name, text: generateBio(name, role, location, hobbies, link, s) })), [name, role, location, hobbies, link]);

  async function copy(text: string, i: number) {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1200);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Bio para Instagram</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">5 estilos de bio con saltos de línea reales · Aesthetic, profesional, emoji · Para Instagram, TikTok, Twitter.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 grid md:grid-cols-2 gap-3">
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Nombre / Marca</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={name} onChange={(e) => setName(e.target.value)} /></label>
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Rol / Profesión</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={role} onChange={(e) => setRole(e.target.value)} /></label>
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Ubicación</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={location} onChange={(e) => setLocation(e.target.value)} /></label>
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Hobby / Vibe</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={hobbies} onChange={(e) => setHobbies(e.target.value)} /></label>
        <label className="block md:col-span-2"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Link / web</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm font-mono" value={link} onChange={(e) => setLink(e.target.value)} /></label>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-6">
        {bios.map((b, i) => (
          <div key={b.style} className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] inline-flex items-center gap-1"><Instagram className="w-3 h-3" /> {b.style}</div>
              <button onClick={() => copy(b.text, i)} className="px-2 py-1 rounded bg-[color:var(--color-bg-soft)] text-xs font-bold inline-flex items-center gap-1">
                {copiedIdx === i ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{b.text}</pre>
            <div className="text-[10px] text-[color:var(--color-fg-soft)] mt-2">{b.text.length}/150 chars</div>
          </div>
        ))}
      </div>

      <AdSlot slot="igbio_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📱 Tips Instagram</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Máximo 150 caracteres</strong> — todo lo demás se trunca con "...".</li>
          <li>• Copia con saltos de línea reales (no usa "|" ni "/") — IG los respeta.</li>
          <li>• Pegá directo en "Editar perfil" → "Biografía".</li>
          <li>• Para link clickeable usá el campo separado "Sitio web" (solo 1 link).</li>
        </ul>
      </div>
    </div>
  );
}
