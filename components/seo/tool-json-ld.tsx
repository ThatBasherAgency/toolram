import { SITE } from "@/lib/site";
import { CATEGORIES, type Tool } from "@/lib/tools-registry";

export function ToolJsonLd({ tool }: { tool: Tool }) {
  const cat = CATEGORIES[tool.category];
  const data: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: tool.name,
      description: tool.shortDesc,
      url: `${SITE.url}/${tool.slug}`,
      applicationCategory: "WebApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      inLanguage: "es"
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
        { "@type": "ListItem", position: 2, name: cat.name, item: `${SITE.url}/categoria/${cat.slug}` },
        { "@type": "ListItem", position: 3, name: tool.name, item: `${SITE.url}/${tool.slug}` }
      ]
    }
  ];
  if (tool.faqs && tool.faqs.length > 0) {
    data.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: tool.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a }
      }))
    });
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
