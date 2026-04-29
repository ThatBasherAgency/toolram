import type { Metadata } from "next";
import { FancyTextGenerator } from "@/components/tools/fancy-text";
import { FANCY_STYLES } from "@/lib/fancy-text";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Generador de texto decorado",
  description: "Convierte tu texto a 25+ estilos: negrita, cursiva, burbujas, tachado, vaporwave, zalgo, al revés y más. Para Instagram, Discord, TikTok, WhatsApp.",
  alternates: { canonical: "/texto-decorado" }
};

export default function FancyTextHub() {
  return (
    <article className="max-w-5xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Generador de texto decorado</h1>
        <p className="text-lg text-[color:var(--color-fg-soft)]">{FANCY_STYLES.length} estilos Unicode listos para copiar y pegar en Instagram, Discord, TikTok, WhatsApp.</p>
      </header>
      <div className="card !p-4 md:!p-6 mb-8">
        <FancyTextGenerator />
      </div>
      <section className="prose prose-sm max-w-none">
        <h2 className="text-xl font-bold mb-2">¿Cómo funciona?</h2>
        <p className="text-[color:var(--color-fg-soft)]">No usamos imágenes ni HTML. Convertimos tus letras al equivalente Unicode de cada estilo (Bold, Italic, Script, Fraktur, etc), por eso pueden pegarse en cualquier red social que acepta texto plano: Instagram, TikTok, X (Twitter), Facebook, Discord, WhatsApp, Telegram, YouTube y más.</p>
        <h2 className="text-xl font-bold mb-2 mt-6">Estilos disponibles</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 list-none p-0">
          {FANCY_STYLES.map((s) => (
            <li key={s.slug}>
              <Link href={`/texto-decorado/${s.slug}`} className="text-sm hover:text-[color:var(--color-brand)]">{s.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
