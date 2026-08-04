import type { Tool } from "@/lib/tools-registry";
import type { Calculator } from "@/lib/calculators";
import { getSeoOverride } from "@/lib/seo-overrides";

const YEAR = new Date().getFullYear();

/**
 * Keeps the rendered <title> (this string + " | Toolram" appended by the root
 * layout template) within Google's ~60-char SERP limit. Prefers cutting at the
 * first natural separator so titles stay keyword-first and never break mid-word.
 */
export function clampTitle(s: string, max = 50): string {
  if (s.length <= max) return s;
  for (const sep of [": ", " — ", " – ", " (", " · ", " | ", " - "]) {
    const i = s.indexOf(sep);
    if (i >= 16 && i <= max) return s.slice(0, i).trim();
  }
  let cut = s.slice(0, max + 1);
  const sp = cut.lastIndexOf(" ");
  if (sp >= 16) cut = cut.slice(0, sp);
  return cut.replace(/[\s—–·,:;(|-]+$/u, "").trim();
}

/**
 * Colas por categoría, de la más informativa a la más corta.
 *
 * `clampTitle` corta en el primer separador, así que una cola larga se perdía
 * entera y el título acababa en 20-30 caracteres: media línea de SERP
 * desaprovechada en todas las páginas. En vez de una sola plantilla fija,
 * `composeTitle` prueba estas colas en orden y se queda con la primera que
 * quepa en los 50 caracteres útiles (el layout añade " | Toolram"). Así los
 * nombres cortos lucen el gancho completo y los largos degradan a una cola
 * más breve en lugar de quedarse pelados.
 */
const TITLE_TAILS: Record<string, string[]> = {
  pdf: [" online — sin subir el archivo", " online — 100% privado", " online gratis", " online"],
  image: [" gratis — sin marca de agua", " gratis — sin watermark", " online gratis", " gratis"],
  text: [" online — gratis y sin registro", " online — sin registro", " online gratis", " online"],
  developer: [" online — rápido y sin registro", " online — sin registro", " online gratis", " online"],
  generator: [" gratis — sin login ni watermark", " gratis — sin registro", " online gratis", " gratis"],
  calculator: [" — con fórmula y ejemplos", " — fórmula y ejemplos", " online gratis", " online"],
  finance: [" — fórmula y proyección anual", " — con fórmula y ejemplos", " online gratis", " online"],
  design: [" — preview en vivo y código", " — preview en vivo", " online gratis", " online"],
  marketing: [" — métricas y benchmarks", " — con benchmarks", " online gratis", " online"],
  network: [" — cálculo instantáneo gratis", " — cálculo instantáneo", " online gratis", " online"],
  seo: [" gratis — sin registro", ` gratis ${YEAR}`, " gratis", " online gratis", " online"],
  converter: [" online — conversión instantánea", " online — al instante", " online gratis", " online"],
  symbols: [" — copiar y pegar al instante", " — copiar y pegar", " online gratis", " online"],
  "fancy-text": [" — Instagram, TikTok y Discord", " — para Instagram y TikTok", " online gratis", " online"],
  test: [` ${YEAR} — mide tu marca al instante`, " — mide tu marca al instante", ` ${YEAR} — al instante`, " online gratis"],
  random: [" gratis — decisión imparcial", " gratis — al azar", " online gratis", " gratis"],
  ai: [" — con IA, gratis y privado", " — con IA, gratis", " online gratis", " online"]
};

const FALLBACK_TAILS = [" online gratis", " gratis", " online", ""];

/** Compone `nombre + la cola más larga que quepa` en `max` caracteres. */
function composeTitle(name: string, category: string, max = 50): string {
  const tails = TITLE_TAILS[category] ?? FALLBACK_TAILS;
  for (const tail of [...tails, ...FALLBACK_TAILS]) {
    const candidate = `${name}${tail}`;
    if (candidate.length <= max) return candidate;
  }
  return clampTitle(name, max);
}

const DESC_TEMPLATES: Record<string, (n: string, d: string) => string> = {
  pdf: (n, d) => `${d} 100% privado: el archivo se procesa en tu navegador, no se sube. Gratis, sin registro, sin marca de agua. Compatible con Chrome, Safari, Firefox y Edge.`,
  image: (n, d) => `${d} Funciona en tu navegador con Canvas API — tus imágenes nunca salen de tu dispositivo. Gratis, sin registro, sin watermark.`,
  text: (n, d) => `${d} Procesamiento 100% local en tu navegador. Sin registro, sin límites, sin tracking. Gratis para siempre.`,
  developer: (n, d) => `${d} Procesamiento client-side, sin enviar datos a servidores. Gratis, privacy-first, sin registro.`,
  generator: (n, d) => `${d} Generación instantánea en tu navegador con Web Crypto API. Gratis, sin registro, sin login.`,
  calculator: (n, d) => `${d} Cálculo instantáneo con fórmulas estándar. Sin registro, gratis, en español.`,
  finance: (n, d) => `${d} Cálculo financiero preciso (IEEE 754). Gratis, sin registro, sin envío de datos a servidores.`,
  design: (n, d) => `${d} Editor visual con preview en vivo y código copiable. Gratis, sin registro.`,
  marketing: (n, d) => `${d} Cálculo client-side con benchmarks por industria. Gratis, sin registro, sin tracking de métricas.`,
  network: (n, d) => `${d} Cálculo instantáneo sin enviar tu IP a logs. Gratis, sin registro.`,
  seo: (n, d) => `${d} Auditoría rápida sin registro y sin enviar tu URL a herramientas de tracking. Gratis.`,
  converter: (n, d) => `${d} Conversión 100% en tu navegador. Sin registro, sin envío de datos, gratis.`,
  symbols: (n, d) => `${d} Copia con un click — sin registro ni instalación. Compatible con WhatsApp, Instagram, TikTok, Discord.`,
  "fancy-text": (n, d) => `${d} Conversión Unicode instantánea en tu navegador. Gratis, sin registro, copia con un click.`,
  test: (n, d) => `${d} Medición precisa en tu navegador (performance.now()). Sin registro, gratis.`,
  random: (n, d) => `${d} Aleatorio criptográfico (crypto.getRandomValues). Gratis, sin registro.`,
  ai: (n, d) => `${d} Procesamiento con APIs Web modernas. Gratis, sin registro.`
};

export function toolSeoTitle(tool: Tool, lang: "es" | "en" = "es"): string {
  const overrideSlug = lang === "en" ? `en/${tool.slug}` : tool.slug;
  const override = getSeoOverride(overrideSlug);
  if (override) return clampTitle(override.title);
  return composeTitle(tool.name, tool.category);
}

export function toolSeoDesc(tool: Tool, lang: "es" | "en" = "es"): string {
  const overrideSlug = lang === "en" ? `en/${tool.slug}` : tool.slug;
  const override = getSeoOverride(overrideSlug);
  if (override) {
    return override.description.length <= 158 ? override.description : override.description.slice(0, 155) + "...";
  }
  const fn = DESC_TEMPLATES[tool.category];
  const desc = tool.shortDesc.endsWith(".") ? tool.shortDesc : `${tool.shortDesc}.`;
  const out = fn ? fn(tool.name, desc) : `${desc} Gratis, sin registro y privacy-first.`;
  return out.length <= 158 ? out : out.slice(0, 155) + "...";
}

export function calcSeoTitle(calc: Calculator): string {
  const override = getSeoOverride(calc.slug);
  if (override) return clampTitle(override.title);
  return composeTitle(calc.name, "calculator");
}

export function calcSeoDesc(calc: Calculator): string {
  const override = getSeoOverride(calc.slug);
  if (override) {
    return override.description.length <= 158 ? override.description : override.description.slice(0, 155) + "...";
  }
  const desc = calc.shortDesc.endsWith(".") ? calc.shortDesc : `${calc.shortDesc}.`;
  const out = `${desc} Cálculo instantáneo en tu navegador, sin registro, gratis.`;
  return out.length <= 158 ? out : out.slice(0, 155) + "...";
}

/** Glossary SEO title override-aware */
export function glossarySeoTitle(slug: string, term: string): string {
  const override = getSeoOverride(slug);
  if (override) return clampTitle(override.title);
  return clampTitle(`¿Qué es ${term}? Definición, ejemplos y casos de uso`);
}

/** Glossary SEO desc override-aware */
export function glossarySeoDesc(slug: string, shortDef: string): string {
  const override = getSeoOverride(slug);
  if (override) {
    return override.description.length <= 158 ? override.description : override.description.slice(0, 155) + "...";
  }
  return shortDef.length > 155 ? shortDef.slice(0, 152) + "..." : shortDef;
}

/** Get override H1 if available */
export function getH1Override(slug: string): string | undefined {
  return getSeoOverride(slug)?.h1;
}
