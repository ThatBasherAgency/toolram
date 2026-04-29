import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Globe, Github } from "lucide-react";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "José Gaspard — Fundador de Toolram",
  description: "José Gaspard es desarrollador web y especialista SEO basado en México. Fundador de Toolram, agencia Nebu Lab y consultor SEO con 8+ años de experiencia.",
  alternates: { canonical: "/sobre/jose-gaspard" }
};

export default function AuthorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "José Gaspard",
    url: `${SITE.url}/sobre/jose-gaspard`,
    image: `${SITE.url}/og/default.png`,
    sameAs: [
      "https://josegaspard.dev",
      "https://nebu-lab.com",
      "https://github.com/ThatBasherAgency"
    ],
    jobTitle: "Founder & Lead Developer",
    worksFor: { "@type": "Organization", name: "Toolram", url: SITE.url },
    alumniOf: { "@type": "Organization", name: "Nebu Lab", url: "https://nebu-lab.com" },
    knowsAbout: [
      "SEO técnico", "Next.js", "WordPress", "Programmatic SEO", "AI Search Optimization (GEO)",
      "Privacy-first web development", "Schema.org structured data", "WebAssembly tools"
    ],
    description: "Desarrollador web y especialista SEO mexicano. Fundador de Toolram, Nebu Lab y consultor SEO con 8+ años construyendo sitios privacy-first."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-3xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">José Gaspard</h1>
          <p className="text-lg text-[color:var(--color-fg-soft)]">Fundador de Toolram · Desarrollador web · Especialista SEO · México</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <a href="mailto:contacto@nebu-lab.com" className="btn btn-ghost text-sm"><Mail className="w-4 h-4" /> contacto@nebu-lab.com</a>
            <a href="https://josegaspard.dev" target="_blank" rel="noopener" className="btn btn-ghost text-sm"><Globe className="w-4 h-4" /> josegaspard.dev</a>
            <a href="https://github.com/ThatBasherAgency/toolram" target="_blank" rel="noopener" className="btn btn-ghost text-sm"><Github className="w-4 h-4" /> GitHub</a>
          </div>
        </header>

        <section className="prose prose-sm max-w-none mb-8">
          <h2 className="text-xl font-bold mb-2">Sobre mí</h2>
          <p>Soy desarrollador web y especialista SEO con base en México. Llevo más de 8 años construyendo sitios web, herramientas y plataformas — incluyendo agencias de marketing, portales de noticias, plataformas SaaS, sitios institucionales y sistemas de e-commerce.</p>
          <p>Toolram nació de una observación simple: los portales de "herramientas online" más grandes de internet (smallseotools, ilovepdf, smallpdf, piliapp) tienen UX anticuada, ads invasivos, requieren cuenta innecesariamente, y suben todos tus archivos a sus servidores. Pude hacer algo mejor.</p>

          <h2 className="text-xl font-bold mb-2 mt-6">Por qué privacy-first</h2>
          <p>En 2026, las APIs modernas del navegador (Web Crypto API, pdf-lib, FFmpeg.wasm, tesseract.js) permiten procesar archivos completos sin enviar nada a servidores. La mayoría de competidores no las usan porque su modelo de negocio depende de procesar archivos en server (lock-in, monetización por GB). Toolram demuestra que se puede ofrecer la misma funcionalidad — gratis, sin registro, sin watermark, sin upload — usando solo el navegador del usuario.</p>

          <h2 className="text-xl font-bold mb-2 mt-6">Otros proyectos</h2>
          <ul>
            <li><strong><a href="https://nebu-lab.com" target="_blank" rel="noopener">Nebu Lab</a></strong> — Agencia de SEO técnico y desarrollo web. Clientes en MX, ES, LATAM.</li>
            <li><strong><a href="https://josegaspard.dev" target="_blank" rel="noopener">josegaspard.dev</a></strong> — Sitio personal con blog técnico, casos de estudio y portfolio.</li>
            <li><strong><a href="https://basher.agency" target="_blank" rel="noopener">Basher Agency</a></strong> — Agencia con foco en marketing performance.</li>
            <li><strong><a href="https://3rcore.com" target="_blank" rel="noopener">3rcore</a></strong> — Estudio de desarrollo web con Alejandro Roque.</li>
            <li>15+ proyectos de SEO técnico activos: visamundial.com, calendariodemexico.com, modilimitado.cc, yakupark.com, entre otros.</li>
          </ul>

          <h2 className="text-xl font-bold mb-2 mt-6">Áreas de expertise</h2>
          <ul>
            <li><strong>SEO técnico</strong> — schema.org, Core Web Vitals, sitemap engineering, indexación masiva, programmatic SEO</li>
            <li><strong>AI Search Optimization (GEO)</strong> — citation en Google AI Overviews, ChatGPT, Perplexity, llms.txt</li>
            <li><strong>Next.js + React</strong> — apps complejas con SSG/ISR/Edge runtime</li>
            <li><strong>WordPress avanzado</strong> — mu-plugins, custom themes, REST API hardening</li>
            <li><strong>WebAssembly tools</strong> — pdf-lib, FFmpeg.wasm, tesseract.js para procesamiento client-side</li>
            <li><strong>Email transaccional</strong> — SMTP profesional, deliverability, autenticación SPF/DKIM/DMARC</li>
          </ul>

          <h2 className="text-xl font-bold mb-2 mt-6">Contacto</h2>
          <p>Para consultas sobre Toolram, propuestas de partnership, o servicios de SEO/desarrollo: <a href="mailto:contacto@nebu-lab.com">contacto@nebu-lab.com</a></p>
        </section>
      </article>
    </>
  );
}
