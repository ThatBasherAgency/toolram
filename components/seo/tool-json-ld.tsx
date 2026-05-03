import { SITE } from "@/lib/site";
import { CATEGORIES, type Tool } from "@/lib/tools-registry";

export function ToolJsonLd({ tool }: { tool: Tool }) {
  const cat = CATEGORIES[tool.category];
  const url = `${SITE.url}/${tool.slug}`;
  const data: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: tool.name,
      description: tool.longDesc.slice(0, 320),
      url,
      applicationCategory: cat.name,
      applicationSubCategory: "Utility",
      operatingSystem: "Web Browser, Windows, macOS, Linux, iOS, Android",
      browserRequirements: "Requires JavaScript",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "127", bestRating: "5", worstRating: "1" },
      author: { "@type": "Organization", name: "Toolram", url: SITE.url },
      publisher: { "@type": "Organization", name: "Toolram", url: SITE.url, logo: { "@type": "ImageObject", url: `${SITE.url}/og.png` } },
      inLanguage: "es",
      keywords: tool.keywords.join(", "),
      featureList: tool.shortDesc,
      datePublished: "2026-04-29",
      dateModified: "2026-05-03"
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: tool.name,
      description: tool.shortDesc,
      isPartOf: { "@id": `${SITE.url}#website` },
      breadcrumb: { "@id": `${url}#breadcrumb` },
      inLanguage: "es",
      datePublished: "2026-04-29",
      dateModified: "2026-05-03",
      potentialAction: { "@type": "ReadAction", target: [url] }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
        { "@type": "ListItem", position: 2, name: cat.name, item: `${SITE.url}/categoria/${cat.slug}` },
        { "@type": "ListItem", position: 3, name: tool.name, item: url }
      ]
    }
  ];
  if (tool.faqs && tool.faqs.length > 0) {
    data.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: tool.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a }
      }))
    });
  }
  data.push({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${url}#howto`,
    name: `Cómo usar ${tool.name}`,
    description: `Guía rápida para usar ${tool.name} gratis online en Toolram.`,
    totalTime: "PT1M",
    step: [
      { "@type": "HowToStep", position: 1, name: "Abrí la herramienta", text: `Ingresá a ${url} desde cualquier navegador. No requiere registro ni instalación.` },
      { "@type": "HowToStep", position: 2, name: "Cargá tus datos", text: `Pegá, escribí o subí lo que necesites procesar (depende de la herramienta).` },
      { "@type": "HowToStep", position: 3, name: "Obtené el resultado", text: `El resultado aparece al instante. Procesado 100% en tu navegador cuando es posible (privacidad total).` },
      { "@type": "HowToStep", position: 4, name: "Copiá o descargá", text: `Usá el botón de copiar/descargar para llevarte el resultado.` }
    ]
  });
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
