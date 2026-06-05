import type { MetadataRoute } from "next";
import { CATEGORIES, TOOLS } from "@/lib/tools-registry";
import { CALCULATORS } from "@/lib/calculators";
import { FANCY_STYLES } from "@/lib/fancy-text";
import { SYMBOL_CATEGORIES } from "@/data/symbols";
import { GLOSSARY } from "@/data/glossary";
import { ALTERNATIVES } from "@/data/alternatives";
import { TOOL_EN, GLOSSARY_EN } from "@/lib/i18n";
import { ALL_POSTS as POSTS } from "@/data/blog";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export async function generateSitemaps() {
  return [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 }
  ];
}

const ID_MAP: Record<number, string> = {
  0: "static",
  1: "tools",
  2: "symbols",
  3: "blog",
  4: "en"
};

type Entry = MetadataRoute.Sitemap[number];

function withLanguagesIfEn(slug: string, hasEn: boolean): Entry["alternates"] | undefined {
  if (!hasEn) return undefined;
  return {
    languages: {
      es: `${SITE.url}/${slug}`,
      "es-MX": `${SITE.url}/${slug}`,
      "es-ES": `${SITE.url}/${slug}`,
      en: `${SITE.url}/en/${slug}`,
      "x-default": `${SITE.url}/${slug}`
    }
  };
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const kind = ID_MAP[id];

  if (kind === "static") {
    const staticPages: Entry[] = [
      "",
      "/herramientas",
      "/sobre",
      "/sobre/jose-gaspard",
      "/privacidad",
      "/contacto",
      "/buscar",
      "/simbolos",
      "/texto-decorado",
      "/calculadoras",
      "/glosario",
      "/alternativas"
    ].map((p) => ({
      url: `${SITE.url}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1.0 : 0.7
    }));
    const categoryPages: Entry[] = Object.values(CATEGORIES).map((c) => ({
      url: `${SITE.url}/categoria/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8
    }));
    return [...staticPages, ...categoryPages];
  }

  if (kind === "tools") {
    const toolPages: Entry[] = TOOLS.map((t) => ({
      url: `${SITE.url}/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      alternates: withLanguagesIfEn(t.slug, !!TOOL_EN[t.slug])
    }));
    const calcPages: Entry[] = CALCULATORS.map((c) => ({
      url: `${SITE.url}/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85
    }));
    const fancyPages: Entry[] = FANCY_STYLES.map((s) => ({
      url: `${SITE.url}/texto-decorado/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7
    }));
    const glossaryPages: Entry[] = GLOSSARY.map((g) => ({
      url: `${SITE.url}/${g.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      alternates: withLanguagesIfEn(g.slug, !!GLOSSARY_EN[g.slug])
    }));
    const altPages: Entry[] = ALTERNATIVES.map((a) => ({
      url: `${SITE.url}/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85
    }));
    return [...toolPages, ...calcPages, ...fancyPages, ...glossaryPages, ...altPages];
  }

  if (kind === "symbols") {
    // Only the symbol hub + category collection pages are indexable; the 159 per-symbol
    // pages are noindex,follow (see app/simbolos/[categoria]/[simbolo]/page.tsx) and are
    // intentionally excluded from the sitemap to focus crawl budget on valuable URLs.
    const categoryPages: Entry[] = SYMBOL_CATEGORIES.map((c) => ({
      url: `${SITE.url}/simbolos/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8
    }));
    return [...categoryPages];
  }

  if (kind === "blog") {
    const blogIndex: Entry[] = [{
      url: `${SITE.url}/blog`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.85
    }];
    const blogPosts: Entry[] = POSTS.map((p) => ({
      url: `${SITE.url}/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8
    }));
    return [...blogIndex, ...blogPosts];
  }

  if (kind === "en") {
    const enHome: Entry[] = [{
      url: `${SITE.url}/en`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.95,
      alternates: {
        languages: {
          es: `${SITE.url}/`,
          "es-MX": `${SITE.url}/`,
          "es-ES": `${SITE.url}/`,
          en: `${SITE.url}/en`,
          "x-default": `${SITE.url}/`
        }
      }
    }];
    const enAllTools: Entry[] = [{
      url: `${SITE.url}/en/all-tools`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      alternates: {
        languages: {
          es: `${SITE.url}/herramientas`,
          en: `${SITE.url}/en/all-tools`,
          "x-default": `${SITE.url}/herramientas`
        }
      }
    }];
    const enToolPages: Entry[] = Object.keys(TOOL_EN).map((slug) => ({
      url: `${SITE.url}/en/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: {
        languages: {
          es: `${SITE.url}/${slug}`,
          "es-MX": `${SITE.url}/${slug}`,
          "es-ES": `${SITE.url}/${slug}`,
          en: `${SITE.url}/en/${slug}`,
          "x-default": `${SITE.url}/${slug}`
        }
      }
    }));
    const enGlossPages: Entry[] = Object.keys(GLOSSARY_EN).map((slug) => ({
      url: `${SITE.url}/en/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          es: `${SITE.url}/${slug}`,
          en: `${SITE.url}/en/${slug}`,
          "x-default": `${SITE.url}/${slug}`
        }
      }
    }));
    return [...enHome, ...enAllTools, ...enToolPages, ...enGlossPages];
  }

  return [];
}
