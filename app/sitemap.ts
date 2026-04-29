import type { MetadataRoute } from "next";
import { CATEGORIES, TOOLS } from "@/lib/tools-registry";
import { CALCULATORS } from "@/lib/calculators";
import { FANCY_STYLES } from "@/lib/fancy-text";
import { SYMBOL_CATEGORIES } from "@/data/symbols";
import { GLOSSARY } from "@/data/glossary";
import { ALTERNATIVES } from "@/data/alternatives";
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
  return [...staticPages, ...categoryPages, ...toolPages, ...calcPages, ...fancyPages, ...symbolPages, ...glossaryPages, ...altPages];
}
