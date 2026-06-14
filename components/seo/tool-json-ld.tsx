import { SITE } from "@/lib/site";
import { CATEGORIES, type Tool } from "@/lib/tools-registry";
import { defaultFaqs } from "@/lib/default-faqs";

const BUILD_DATE = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);

export function ToolJsonLd({ tool }: { tool: Tool }) {
  const cat = CATEGORIES[tool.category];
  const url = `${SITE.url}/${tool.slug}`;
  const faqs = tool.faqs && tool.faqs.length > 0 ? tool.faqs : defaultFaqs(tool);
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
      author: { "@type": "Person", name: "José Gaspard", url: "https://josegaspard.dev" },
      publisher: { "@type": "Organization", name: "Toolram", url: SITE.url, logo: { "@type": "ImageObject", url: `${SITE.url}/icon-512.png`, width: 512, height: 512 } },
      inLanguage: "es",
      keywords: tool.keywords.join(", "),
      featureList: tool.shortDesc,
      datePublished: "2026-04-29",
      dateModified: BUILD_DATE
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
      dateModified: BUILD_DATE
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
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a }
      }))
    }
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
