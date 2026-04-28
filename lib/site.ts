export const SITE = {
  name: "Toolram",
  domain: "toolram.com",
  url: "https://toolram.com",
  tagline: "Herramientas online gratis: SEO, PDF, IA, símbolos y más",
  taglineEn: "Free online tools: SEO, PDF, AI, symbols and more",
  description:
    "Más de 150 herramientas gratis: convertir PDF a Word, firmar PDF, SEO, símbolos, contador de clicks, generador de QR, y muchas más. Sin registro, sin descargas.",
  defaultLocale: "es",
  locales: ["es", "en"] as const,
  twitter: "@toolram",
  email: "contacto@nebu-lab.com"
};

export type Locale = (typeof SITE.locales)[number];
