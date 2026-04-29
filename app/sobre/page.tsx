import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Toolram",
  description: "Toolram es un portal gratis de herramientas online creado por José Gaspard. Sin registro, sin uploads innecesarios, procesamiento local cuando es posible. Open source.",
  alternates: { canonical: "/sobre" }
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-10 prose prose-sm">
      <h1 className="text-3xl font-bold mb-4">Sobre Toolram</h1>
      <p className="text-lg text-[color:var(--color-fg-soft)]">
        Toolram es un portal de herramientas online gratis creado en abril de 2026 por <Link href="/sobre/jose-gaspard">José Gaspard</Link> con un objetivo claro: ofrecer las mismas utilidades que los grandes portales (smallseotools, ilovepdf, smallpdf, piliapp), pero <strong>sin sacrificar tu privacidad ni saturar la pantalla con ads</strong>.
      </p>

      <h2 className="mt-8 text-xl font-bold">Nuestros principios</h2>
      <ul className="space-y-2 mt-3">
        <li><strong>Privacidad primero</strong>. Más de 95 de cada 100 herramientas procesan tus datos en tu navegador. Si una herramienta necesita enviar algo a un servidor, lo decimos arriba del fold con un banner explícito.</li>
        <li><strong>Velocidad real</strong>. Lighthouse 95+ mobile. Static site generation con CDN edge global. Sin pop-ups ni overlays de "regístrate antes de usar".</li>
        <li><strong>Sin registro</strong>. Nunca te vamos a pedir un email para usar una herramienta básica. Nunca habrá un paywall que aparezca después de tu segunda calculada.</li>
        <li><strong>Sin watermarks</strong> en los archivos que procesamos. Tus PDFs salen limpios, tu QR sale limpio.</li>
        <li><strong>Open source</strong>. <a href="https://github.com/ThatBasherAgency/toolram" target="_blank" rel="noopener">El código es público</a>. Cualquiera puede auditar exactamente qué hacemos con tus datos. Spoiler: nada — porque todo se queda en tu navegador.</li>
        <li><strong>Spanish-first</strong>. No traducimos de inglés con error. El contenido se escribe nativo en español de México y se adapta a contextos LATAM/España.</li>
      </ul>

      <h2 className="mt-8 text-xl font-bold">Cómo es posible "sin server"</h2>
      <p>El secreto son las APIs modernas del navegador, disponibles desde 2020-2022 pero infrautilizadas por la industria. Toolram usa:</p>
      <ul>
        <li><strong>pdf-lib</strong> (WebAssembly) para todas las operaciones PDF</li>
        <li><strong>Web Crypto API</strong> para hashes (MD5, SHA-256, SHA-512), generación de UUIDs y contraseñas seguras</li>
        <li><strong>Canvas API</strong> para conversión y manipulación de imágenes</li>
        <li><strong>FFmpeg.wasm</strong> (próximamente) para video y audio</li>
        <li><strong>tesseract.js</strong> (próximamente) para OCR de PDFs e imágenes</li>
      </ul>

      <h2 className="mt-8 text-xl font-bold">Roadmap</h2>
      <p>Estamos llevando Toolram a 200+ herramientas durante 2026 y a 500+ páginas indexables a Q4. Próximas adiciones:</p>
      <ul>
        <li>PDF→Word/Excel con OCR (microservicio dedicado para preservar layouts complejos)</li>
        <li>Generador de imágenes con IA</li>
        <li>Test de tipeo en español</li>
        <li>500+ páginas de símbolos individuales</li>
        <li>Versión inglés (toolram.com/en) Q3 2026</li>
        <li>API pública para devs</li>
      </ul>

      <h2 className="mt-8 text-xl font-bold">Contacto</h2>
      <p>
        Sugerencias, bugs, propuestas: <a href="mailto:contacto@nebu-lab.com">contacto@nebu-lab.com</a><br />
        Sobre el creador: <Link href="/sobre/jose-gaspard">José Gaspard</Link><br />
        Issues técnicos: <a href="https://github.com/ThatBasherAgency/toolram/issues" target="_blank" rel="noopener">GitHub Issues</a>
      </p>
    </article>
  );
}
