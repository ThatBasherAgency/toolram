import { SITE } from "@/lib/site";

export function WebsiteJsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      inLanguage: "es",
      publisher: { "@id": `${SITE.url}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/buscar?q={search_term_string}` },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/og/default.png`,
        width: 1200,
        height: 630
      },
      sameAs: [
        "https://github.com/ThatBasherAgency/toolram",
        "https://josegaspard.dev",
        "https://nebu-lab.com"
      ],
      founder: { "@id": "https://josegaspard.dev/#person" },
      foundingDate: "2026-04-29",
      slogan: "Las herramientas online que realmente funcionan",
      knowsAbout: [
        "PDF processing", "SEO tools", "AI text generation", "Unicode symbols",
        "Privacy-first web tools", "WebAssembly utilities", "Spanish-language web tools"
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: SITE.email,
        contactType: "customer service",
        availableLanguage: ["es", "en"]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://josegaspard.dev/#person",
      name: "José Gaspard",
      givenName: "José",
      familyName: "Gaspard",
      url: "https://josegaspard.dev",
      mainEntityOfPage: "https://josegaspard.dev",
      sameAs: [
        "https://josegaspard.dev",
        "https://nebu-lab.com",
        "https://visamundial.com/autores/jose-gaspard/",
        "https://github.com/ThatBasherAgency",
        "https://www.linkedin.com/in/josegaspard/",
        `${SITE.url}/sobre/jose-gaspard`
      ],
      jobTitle: "Founder & Lead Developer",
      worksFor: [
        { "@id": `${SITE.url}/#organization` },
        { "@type": "Organization", name: "VisaMundial", url: "https://visamundial.com" },
        { "@type": "Organization", name: "Nebu Lab", url: "https://nebu-lab.com" }
      ],
      nationality: { "@type": "Country", name: "México" }
    }
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
