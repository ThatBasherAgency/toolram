import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: `${SITE.name} — Free online tools that actually work`, template: `%s | ${SITE.name}` },
  description: "100+ free online tools: PDF, SEO, AI, symbols, calculators, click speed tests and more. No registration, no uploads. Privacy-first.",
  alternates: {
    canonical: "/en",
    languages: {
      "en": "/en",
      "es": "/",
      "x-default": "/en"
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE.url}/en`,
    title: `${SITE.name} — Free online tools that actually work`,
    description: "100+ free online tools: PDF, SEO, AI, symbols, calculators and more.",
    siteName: SITE.name
  }
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
