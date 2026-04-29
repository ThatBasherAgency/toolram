import type { MetadataRoute } from "next";
import { CATEGORIES, TOOLS } from "@/lib/tools-registry";
import { CALCULATORS } from "@/lib/calculators";
import { FANCY_STYLES } from "@/lib/fancy-text";
import { SYMBOL_CATEGORIES } from "@/data/symbols";
import { GLOSSARY } from "@/data/glossary";
import { ALTERNATIVES } from "@/data/alternatives";
import { TOOL_EN, GLOSSARY_EN } from "@/lib/i18n";
import { POSTS } from "@/data/blog";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
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
  const categoryPages = Object.values(CATEGORIES).map((c) => ({
    url: `${SITE.url}/categoria/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));
  const toolPages = TOOLS.map((t) => ({
    url: `${SITE.url}/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9
  }));
  const calcPages = CALCULATORS.map((c) => ({
    url: `${SITE.url}/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85
  }));
  const fancyPages = FANCY_STYLES.map((s) => ({
    url: `${SITE.url}/texto-decorado/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));
  const symbolPages = SYMBOL_CATEGORIES.map((c) => ({
    url: `${SITE.url}/simbolos/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));
  const glossaryPages = GLOSSARY.map((g) => ({
    url: `${SITE.url}/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75
  }));
  const altPages = ALTERNATIVES.map((a) => ({
    url: `${SITE.url}/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85
  }));
  // English pages
  const enHome = [{ url: `${SITE.url}/en`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.95 }];
  const enAllTools = [{ url: `${SITE.url}/en/all-tools`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.85 }];
  const enToolPages = Object.keys(TOOL_EN).map((slug) => ({
    url: `${SITE.url}/en/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85
  }));
  const enGlossPages = Object.keys(GLOSSARY_EN).map((slug) => ({
    url: `${SITE.url}/en/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  const blogIndex = [{ url: `${SITE.url}/blog`, lastModified: now, changeFrequency: "daily" as const, priority: 0.85 }];
  const blogPosts = POSTS.map((p) => ({
    url: `${SITE.url}/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  return [
    ...staticPages, ...categoryPages, ...toolPages, ...calcPages, ...fancyPages, ...symbolPages, ...glossaryPages, ...altPages,
    ...blogIndex, ...blogPosts,
    ...enHome, ...enAllTools, ...enToolPages, ...enGlossPages
  ];
}
