"use client";
import { useMemo, useState } from "react";
import { ShoppingBag, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 320)";

const TEMPLATES = [
  { name: "Beneficios + features", build: (p: { name: string; features: string; audience: string; benefit: string }) => `Descubrí ${p.name}, la solución ideal para ${p.audience} que buscan ${p.benefit}.\n\n✨ Características destacadas:\n${p.features.split("\n").filter(Boolean).map((f) => `• ${f.trim()}`).join("\n")}\n\nElegí calidad. Elegí ${p.name}.` },
  { name: "Storytelling", build: (p: { name: string; features: string; audience: string; benefit: string }) => `¿Sos ${p.audience}? Conocemos esa frustración de ${p.benefit ? "no encontrar la solución correcta" : "no tener lo que necesitas"}.\n\nPor eso creamos ${p.name}.\n\n${p.features.split("\n").filter(Boolean).map((f) => `→ ${f.trim()}`).join("\n")}\n\nProbalo hoy. Vas a notar la diferencia.` },
  { name: "Bullet conciso", build: (p: { name: string; features: string }) => `**${p.name}**\n\n${p.features.split("\n").filter(Boolean).map((f) => `✅ ${f.trim()}`).join("\n")}\n\n💯 Garantía de satisfacción · 🚚 Envío rápido · 🔒 Pago seguro` },
  { name: "Lifestyle", build: (p: { name: string; audience: string; benefit: string }) => `Para ${p.audience} que valoran ${p.benefit}.\n\n${p.name} no es solo un producto. Es una decisión.\n\nUna decisión por la calidad. Por la durabilidad. Por hacerlo bien la primera vez.` }
];

export function ProductDescription() {
  const [name, setName] = useState("Auriculares Pro X1");
  const [audience, setAudience] = useState("amantes de la música");
  const [benefit, setBenefit] = useState("calidad de estudio sin cables");
  const [features, setFeatures] = useState("Cancelación de ruido activa\n40h de batería\nAudio Hi-Res certificado\nMicrófono con IA");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const descriptions = useMemo(() => TEMPLATES.map((t) => ({ name: t.name, text: t.build({ name, features, audience, benefit }) })), [name, audience, benefit, features]);

  async function copy(text: string, i: number) {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1200);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Descripción de Producto</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">4 estilos · Beneficios + features, storytelling, bullets, lifestyle · Para Shopify, Mercado Libre, WooCommerce.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6 grid md:grid-cols-2 gap-3">
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Nombre del producto</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={name} onChange={(e) => setName(e.target.value)} /></label>
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Audiencia objetivo</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={audience} onChange={(e) => setAudience(e.target.value)} /></label>
        <label className="block md:col-span-2"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Beneficio principal</span>
          <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={benefit} onChange={(e) => setBenefit(e.target.value)} /></label>
        <label className="block md:col-span-2"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Features (1 por línea)</span>
          <textarea className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm h-24" value={features} onChange={(e) => setFeatures(e.target.value)} /></label>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-6">
        {descriptions.map((d, i) => (
          <div key={i} className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4">
            <div className="flex items-center justify-between mb-2"><div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] inline-flex items-center gap-1"><ShoppingBag className="w-3 h-3" /> {d.name}</div><button onClick={() => copy(d.text, i)} className="px-2 py-1 rounded bg-[color:var(--color-bg-soft)] text-xs font-bold inline-flex items-center gap-1">{copiedIdx === i ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}</button></div>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{d.text}</pre>
          </div>
        ))}
      </div>

      <AdSlot slot="prodesc_inline" format="auto" minHeight={180} className="mb-6" />
    </div>
  );
}
