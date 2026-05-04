import type { Tool } from "@/lib/tools-registry";
import type { Calculator } from "@/lib/calculators";

const YEAR = new Date().getFullYear();

const TITLE_TEMPLATES: Record<string, (name: string) => string> = {
  pdf: (n) => `${n} online ${YEAR} · 100% privado, sin subir archivos`,
  image: (n) => `${n} gratis ${YEAR} — Sin marca de agua, en tu navegador`,
  text: (n) => `${n} online · Gratis y sin registro (${YEAR})`,
  developer: (n) => `${n} ${YEAR} — Rápido, gratis y privacy-first`,
  generator: (n) => `${n} gratis ${YEAR} · Sin login ni marca de agua`,
  calculator: (n) => `${n} ${YEAR} — Fórmula, ejemplos y tabla`,
  finance: (n) => `${n} ${YEAR} — Fórmula y proyección año a año`,
  design: (n) => `${n} visual ${YEAR} — Preview en vivo + código copiable`,
  marketing: (n) => `${n} ${YEAR} — Métricas, benchmarks y feedback automático`,
  network: (n) => `${n} ${YEAR} — Cálculo instantáneo gratis`,
  seo: (n) => `${n} gratis ${YEAR} · Auditoría rápida sin registro`,
  converter: (n) => `${n} online ${YEAR} — Conversión instantánea, sin servidor`,
  symbols: (n) => `${n} ${YEAR} · Copiar y pegar al instante`,
  "fancy-text": (n) => `${n} ${YEAR} — Para Instagram, TikTok, Discord, X`,
  test: (n) => `${n} ${YEAR} — Mide tu rendimiento al instante`,
  random: (n) => `${n} gratis ${YEAR} — Decisión imparcial al instante`,
  ai: (n) => `${n} ${YEAR} — Asistido por IA, gratis y privado`
};

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

export function toolSeoTitle(tool: Tool): string {
  const fn = TITLE_TEMPLATES[tool.category];
  return fn ? fn(tool.name) : `${tool.name} online gratis ${YEAR}`;
}

export function toolSeoDesc(tool: Tool): string {
  const fn = DESC_TEMPLATES[tool.category];
  const desc = tool.shortDesc.endsWith(".") ? tool.shortDesc : `${tool.shortDesc}.`;
  const out = fn ? fn(tool.name, desc) : `${desc} Gratis, sin registro y privacy-first.`;
  return out.length <= 158 ? out : out.slice(0, 155) + "...";
}

export function calcSeoTitle(calc: Calculator): string {
  return `${calc.name} ${YEAR} — Fórmula, ejemplos y resultado al instante`;
}

export function calcSeoDesc(calc: Calculator): string {
  const desc = calc.shortDesc.endsWith(".") ? calc.shortDesc : `${calc.shortDesc}.`;
  const out = `${desc} Cálculo instantáneo en tu navegador, sin registro, gratis.`;
  return out.length <= 158 ? out : out.slice(0, 155) + "...";
}
