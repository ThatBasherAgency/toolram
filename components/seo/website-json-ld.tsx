import { SITE } from "@/lib/site";

export function WebsiteJsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      inLanguage: "es",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/buscar?q={search_term_string}` },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/og/default.png`,
      sameAs: [
        "https://github.com/ThatBasherAgency/toolram",
        "https://josegaspard.dev",
        "https://nebu-lab.com"
      ],
      founder: { "@type": "Person", name: "José Gaspard", url: "https://josegaspard.dev" },
      contactPoint: { "@type": "ContactPoint", email: SITE.email, contactType: "customer service", availableLanguage: ["es", "en"] }
    }
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
