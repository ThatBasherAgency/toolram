import type { MetadataRoute } from "next";
import { CATEGORIES, TOOLS, TOOLS_BY_SLUG } from "@/lib/tools-registry";
import { CALCULATORS } from "@/lib/calculators";
import { SYMBOL_CATEGORIES } from "@/data/symbols";
import { GLOSSARY, GLOSSARY_BY_SLUG } from "@/data/glossary";
import { ALTERNATIVES } from "@/data/alternatives";
import { TOOL_EN, GLOSSARY_EN } from "@/lib/i18n";
import { ALL_POSTS as POSTS } from "@/data/blog";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

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

/**
 * Single dynamic sitemap served at /sitemap.xml (no sitemap index — this Next version's
 * generateSitemaps() serves /sitemap/[id].xml segments but does NOT emit a root index).
 * Per-symbol pages (/simbolos/[categoria]/[simbolo]) are intentionally excluded: they are
 * noindex,follow to keep crawl/quality signal concentrated on valuable URLs.
 */
/**
 * 16-ago-2026 · `lastmod` TIENE QUE SER VERDAD O GOOGLE DEJA DE MIRARLO.
 *
 * Esto era `new Date()`. Con `revalidate = 3600`, cada regeneración del sitemap
 * ponía la hora actual en TODAS las entradas: el 90% de las URLs (307 de 341)
 * declaraba haber cambiado hace segundos, una y otra vez, sin que nadie hubiera
 * tocado nada. Google usa `lastmod` para decidir a qué vuelve; si siempre dice
 * «todo acaba de cambiar», la señal no vale nada y la ignora.
 *
 * Y aquí duele el doble: este sitio ya estaba muerto de rastreo (Google no pasaba
 * por la mayoría de las URLs desde abril/mayo), así que estábamos quemando justo
 * lo único que sirve para decirle qué merece una visita.
 *
 * Ahora: fecha real cuando el contenido la tiene (el blog trae `updatedAt`) y,
 * si no, la fecha del último cambio de contenido del sitio. ESTA CONSTANTE SE
 * SUBE A MANO cuando se publican o reescriben herramientas — no automáticamente,
 * que es justo lo que la rompía.
 */
const CONTENT_UPDATED = new Date("2026-08-09T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = CONTENT_UPDATED;

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

  const toolPages: Entry[] = TOOLS.map((t) => ({
    url: `${SITE.url}/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
    alternates: withLanguagesIfEn(t.slug, !!TOOL_EN[t.slug])
  }));

  // 16-ago-2026 · Siete calculadoras están dadas de alta EN LOS DOS REGISTROS
  // (TOOLS y CALCULATORS), así que el sitemap las emitía dos veces: 341 entradas
  // para 334 URLs reales. Duplicados exactos: calculadora-edad, -imc, -porcentaje,
  // -prestamo, -propina, -descuento y -ovulacion. Google los descarta, pero un
  // sitemap que se contradice a sí mismo no ayuda a que te crean el resto.
  const calcPages: Entry[] = CALCULATORS.filter((c) => !TOOLS_BY_SLUG[c.slug]).map((c) => ({
    url: `${SITE.url}/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85
  }));

  // Estilos de texto-decorado: las páginas de detalle son noindex,follow
  // (contenido mínimo). Solo el hub /texto-decorado va en el sitemap (staticPages).
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

  // Symbols: only hub + category collection pages (per-symbol pages are noindex).
  const symbolCategoryPages: Entry[] = SYMBOL_CATEGORIES.map((c) => ({
    url: `${SITE.url}/simbolos/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

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
  // /en/[slug] returns 200 only when BOTH the EN translation AND the underlying ES tool exist
  // (see app/en/[slug]/page.tsx: `if (!en || !tool) notFound()`). Some TOOL_EN keys have no
  // matching tool slug (renamed/aliased tools), so emitting them produced 404s in the sitemap.
  const enToolPages: Entry[] = Object.keys(TOOL_EN)
    .filter((slug) => TOOLS_BY_SLUG[slug])
    .map((slug) => ({
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
  const enGlossPages: Entry[] = Object.keys(GLOSSARY_EN)
    .filter((slug) => GLOSSARY_BY_SLUG[slug])
    .map((slug) => ({
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

  return [
    ...staticPages,
    ...categoryPages,
    ...toolPages,
    ...calcPages,
    ...glossaryPages,
    ...altPages,
    ...symbolCategoryPages,
    ...blogIndex,
    ...blogPosts,
    ...enHome,
    ...enAllTools,
    ...enToolPages,
    ...enGlossPages
  ];
}
