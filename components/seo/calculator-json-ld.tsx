import { SITE } from "@/lib/site";
import type { Calculator } from "@/lib/calculators";
import { defaultCalcFaqs } from "@/lib/default-faqs";

const BUILD_DATE = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);

export function CalculatorJsonLd({ calc }: { calc: Calculator }) {
  const url = `${SITE.url}/${calc.slug}`;
  const faqs = calc.faqs && calc.faqs.length > 0 ? calc.faqs : defaultCalcFaqs(calc);
  const data: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${url}#software`,
      name: calc.name,
      description: calc.longDesc.slice(0, 320),
      url,
      applicationCategory: "Calculadoras",
      applicationSubCategory: "Calculator",
      operatingSystem: "Web Browser, Windows, macOS, Linux, iOS, Android",
      browserRequirements: "Requires JavaScript",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
      author: { "@type": "Person", name: "José Gaspard", url: "https://josegaspard.dev" },
      publisher: { "@type": "Organization", name: "Toolram", url: SITE.url, logo: { "@type": "ImageObject", url: `${SITE.url}/og.png` } },
      inLanguage: "es",
      keywords: calc.keywords.join(", "),
      featureList: calc.shortDesc,
      datePublished: "2026-04-29",
      dateModified: BUILD_DATE
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: calc.name,
      description: calc.shortDesc,
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
        { "@type": "ListItem", position: 2, name: "Calculadoras", item: `${SITE.url}/calculadoras` },
        { "@type": "ListItem", position: 3, name: calc.name, item: url }
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
