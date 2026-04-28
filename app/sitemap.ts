import type { MetadataRoute } from "next";
import { CATEGORIES, TOOLS } from "@/lib/tools-registry";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/herramientas", "/sobre", "/privacidad", "/contacto", "/buscar"].map((p) => ({
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
  return [...staticPages, ...categoryPages, ...toolPages];
}
