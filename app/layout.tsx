import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@/components/seo/analytics";
import { WebsiteJsonLd } from "@/components/seo/website-json-ld";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`
  },
  description: SITE.description,
  keywords: [
    "herramientas online",
    "herramientas gratis",
    "PDF online",
    "SEO tools",
    "convertir PDF a Word",
    "firmar PDF online",
    "contador palabras",
    "generador QR",
    "CPS test",
    "símbolos copiar pegar"
  ],
  authors: [{ name: "Toolram" }],
  creator: "Toolram",
  publisher: "Toolram",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: SITE.name }]
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    site: SITE.twitter
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  verification: {
    google: "Pb94jU8X9iYqyUJO7OFPAQttY1WEACieVFWPPliAB88"
  },
  alternates: {
    canonical: "/",
    languages: {
      "es": "/",
      "es-MX": "/",
      "es-ES": "/",
      "en": "/en",
      "x-default": "/"
    }
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme:dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <WebsiteJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
