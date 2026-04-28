import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Toolram",
  description: "Toolram es un portal gratis de herramientas online. Sin registro, sin uploads innecesarios, procesamiento local cuando es posible.",
  alternates: { canonical: "/sobre" }
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-10 prose prose-sm">
      <h1 className="text-3xl font-bold mb-4">Sobre Toolram</h1>
      <p className="text-lg text-[color:var(--color-fg-soft)]">
        Toolram nació de una idea simple: la mayoría de los sitios de “herramientas online” están saturados de ads, te piden registrarte para usar una calculadora,
        suben tus archivos a sus servidores sin necesidad o tardan más en cargar que en hacer lo que prometen.
      </p>
      <h2 className="mt-6 text-xl font-bold">Nuestros principios</h2>
      <ul className="space-y-2 mt-3">
        <li><strong>Privacidad primero:</strong> 9 de cada 10 tools procesan tus datos en tu navegador. Si una tool necesita enviar algo a un servidor, lo decimos arriba del fold.</li>
        <li><strong>Velocidad real:</strong> sin esperas, sin pop-ups antes de empezar.</li>
        <li><strong>Sin registro:</strong> nunca te vamos a pedir un email para usar una herramienta básica.</li>
        <li><strong>Multilingüe:</strong> español de LATAM nativo, inglés en camino.</li>
      </ul>
      <h2 className="mt-6 text-xl font-bold">Roadmap</h2>
      <p>Estamos llevando Toolram a 200+ herramientas durante 2026. Próximas adiciones: PDF→Word/Excel con OCR, generador de imágenes IA, tests de tipeo en español, símbolos para Instagram/Discord.</p>
    </article>
  );
}
