/**
 * SEO Overrides — Titles + descriptions optimizados por slug.
 *
 * Origen: Google Search Console (toolram.com, últimos 90 días). Estas URLs
 * tienen impresiones pero 0 clicks o CTR muy bajo. Optimización manual de
 * titles/descs para subir CTR + posiciones, frente a los templates genéricos
 * que sirve `lib/seo-meta.ts`.
 *
 * Mantenimiento: cada entrada documenta impresiones y posición al momento de
 * la optimización (2026-05-22). Re-evaluar trimestralmente.
 */

export type SeoOverride = {
  title: string;
  description: string;
  /** Optional H1 override (si difiere del title). */
  h1?: string;
  /** Optional keywords array (refresh meta keywords). */
  keywords?: string[];
  /** Notas sobre la decisión (impresiones GSC, posición, query objetivo). */
  notes?: string;
};

export const SEO_OVERRIDES: Record<string, SeoOverride> = {
  // ============================================================
  // TOOLS — clusters con impresiones GSC y oportunidad de ranking
  // ============================================================

  "contador-palabras": {
    title: "Contador de palabras online gratis — Cuenta palabras, caracteres y tiempo de lectura",
    description:
      "Cuenta palabras, caracteres con/sin espacios, párrafos, oraciones y tiempo de lectura al instante. Sin registro, sin límites. Funciona offline en tu navegador.",
    h1: "Contador de palabras y caracteres online",
    keywords: [
      "contador de palabras",
      "contador palabras online",
      "contar palabras",
      "contar caracteres",
      "word counter español",
      "calculadora de palabras"
    ],
    notes: "GSC 90d: 7 impr · pos 78.7 — query genérico high-volume, subir contenido y headers"
  },

  "convertir-mayusculas": {
    title: "Convertir mayúsculas y minúsculas online — Title case, MAYÚSCULAS, alternantes",
    description:
      "Cambia texto a MAYÚSCULAS, minúsculas, Title Case, oración o alternante con un click. Gratis, instantáneo, sin instalar nada. Procesado en tu navegador.",
    keywords: [
      "convertir mayúsculas",
      "convertir minúsculas",
      "title case español",
      "cambiar mayúsculas",
      "texto en mayúsculas",
      "convertir texto"
    ],
    notes: "GSC 90d: 2 impr · pos 77.5 — head term de alto volumen latente"
  },

  "rotar-pdf": {
    title: "Rotar PDF online gratis — 90°, 180°, 270° sin subir el archivo",
    description:
      "Gira páginas PDF 90°, 180° o 270° desde tu navegador. El archivo no se sube a ningún servidor. Sin marca de agua, sin registro, gratis.",
    keywords: ["rotar pdf", "girar pdf", "rotar pdf online", "rotar paginas pdf", "rotar pdf gratis"],
    notes: "GSC 90d: 1 impr · pos 72 — head term importante, optimizar title CTR"
  },

  "cps-test": {
    title: "CPS Test — Test de clicks por segundo gratis (1-60s)",
    description:
      "Haz el test de clicks por segundo (CPS) gratis: modos 1s, 5s, 10s, 30s, 60s y Jitter. Resultado al instante, récord guardado, sin registro. Mide tu velocidad de click para Minecraft PvP.",
    h1: "CPS Test — Mide tu velocidad de clicks por segundo",
    keywords: ["cps test", "cps tester", "test de clicks", "test cps", "clic test", "click speed test", "kohi click test", "clicks por segundo"],
    notes: "GSC 90d: pos 23.6. De-canibalizado vs /que-es-cps-test (2026-06-26): esta pagina OWNS la query transaccional 'cps test'."
  },

  "generador-qr": {
    title: "Generador de QR online gratis — URL, WiFi, vCard, texto",
    description:
      "Genera códigos QR para URLs, WiFi, contactos, emails o cualquier texto. Descarga PNG o SVG en HD. Sin registro, sin marca de agua, en tu navegador.",
    keywords: ["generador qr", "codigo qr gratis", "crear qr", "qr code generator español", "qr online"],
    notes: "Categoría: head term de altísimo volumen. EN version tiene 18 impr GSC."
  },

  "unir-pdf": {
    title: "Unir PDF gratis online — Combina varios PDF sin subir archivos",
    description:
      "Une 2, 5, 10 o más PDFs en uno solo desde tu navegador. El archivo no se sube a servidores externos. Sin marca de agua, sin registro, sin tamaño máximo.",
    h1: "Unir PDF online gratis",
    keywords: ["unir pdf", "combinar pdf", "juntar pdf", "merge pdf español", "unir pdfs online"],
    notes: "Head term competitivo (smallpdf, ilovepdf). EN version 24 impr GSC pos 49."
  },

  "dividir-pdf": {
    title: "Dividir PDF gratis — Extraer páginas sin subir el archivo",
    description:
      "Extrae páginas específicas o divide un PDF en varios documentos directamente en tu navegador. Sin marca de agua, sin tamaño máximo, gratis para siempre.",
    keywords: ["dividir pdf", "separar pdf", "extraer paginas pdf", "split pdf español", "dividir pdf gratis"],
    notes: "EN version 2 impr GSC pos 49.5"
  },

  // Símbolos copy-paste (alta intención + CTR potencial alto)
  // Las páginas de símbolos están bajo /simbolos/[slug]/ no /[slug]
  // Los overrides aquí son ignorados por el universal slug router pero se aplicarán via SEO_OVERRIDES_SYMBOLS

  // ============================================================
  // CALCULATORS
  // ============================================================

  "calculadora-propina": {
    title: "Calculadora de propina — Reparte la cuenta entre amigos al instante",
    description:
      "Calcula la propina (10%, 15%, 18%, 20%) y divide la cuenta entre el número de comensales. Sin registro, gratis, funciona offline.",
    keywords: ["calculadora propina", "calcular propina", "propina restaurante", "dividir cuenta"],
    notes: "GSC 90d: 8 impr · pos 41.0 — query buscado, optimizar content"
  },

  "calculadora-regla-tres": {
    title: "Calculadora regla de tres — Simple, inversa y compuesta",
    description:
      "Resuelve la regla de tres simple, inversa y compuesta con explicación paso a paso. Gratis, sin registro, ideal para tareas escolares.",
    h1: "Calculadora de regla de tres",
    keywords: ["regla de tres", "calculadora regla de tres", "regla de 3", "regla de tres simple"],
    notes: "GSC 90d: 10 impr · pos 75.6 — head term escolar muy buscado"
  },

  "calculadora-iva-mexico": {
    title: "Calculadora de IVA México 2026 — 16% y 8% frontera norte",
    description:
      "Calcula IVA en México: 16% nacional, 8% frontera norte. Suma o desglosa el impuesto sobre cualquier importe. Gratis, sin registro.",
    h1: "Calculadora de IVA México (16% y 8%)",
    keywords: ["calculadora iva mexico", "iva 16%", "iva frontera norte 8%", "calcular iva mxn"],
    notes: "GSC 90d: 4 impr · pos 63.5 — hispano-specific MX, alta oportunidad"
  },

  "calculadora-imc": {
    title: "Calculadora de IMC online — Índice de masa corporal y categoría OMS",
    description:
      "Calcula tu IMC con fórmula OMS. Conoce si tu peso es saludable, bajo, sobrepeso u obesidad. Gratis, sin registro, sin enviar tus datos a servidores.",
    keywords: ["calculadora imc", "indice masa corporal", "calcular imc", "imc online"],
    notes: "Head term YMYL salud — necesita disclaimer médico"
  },

  // ============================================================
  // GLOSSARY — /que-es-X
  // ============================================================

  "que-es-cps-test": {
    title: "Qué es el CPS Test: significado, buen CPS y récords",
    description:
      "Qué significa CPS (Clicks Per Second), cuánto es un buen CPS, el promedio humano y los récords mundiales, y las técnicas jitter, butterfly y drag. ¿Quieres medirlo? Haz tu CPS test gratis.",
    h1: "¿Qué es un CPS Test (Clicks Per Second)?",
    keywords: ["que es cps test", "que es cps", "cps significado", "cuanto es un buen cps", "clicks per second significado", "promedio cps"],
    notes: "GSC 90d: 30 impr · pos 15.1. De-canibalizado vs /cps-test (2026-06-26): esta pagina OWNS la query informacional 'que es cps'; el tool OWNS 'cps test'."
  },

  "que-es-imc": {
    title: "¿Qué es el IMC? Índice de masa corporal, fórmula y rangos OMS",
    description:
      "El IMC (Índice de Masa Corporal) mide la relación peso/altura para detectar obesidad o bajo peso. Aprende la fórmula, rangos OMS y limitaciones. Calculadora incluida.",
    h1: "¿Qué es el IMC (Índice de Masa Corporal)?",
    keywords: ["que es imc", "indice masa corporal", "imc oms", "que significa imc"]
  },

  "que-es-pdf": {
    title: "¿Qué es un PDF? Formato, ventajas y cómo crearlo (2026)",
    description:
      "El PDF (Portable Document Format) preserva el diseño en cualquier dispositivo. Aprende su historia, ventajas frente a Word, casos de uso y herramientas gratis.",
    h1: "¿Qué es un archivo PDF?",
    keywords: ["que es pdf", "que significa pdf", "formato pdf", "archivo pdf"]
  },

  "que-es-tdee": {
    title: "¿Qué es TDEE? Gasto Energético Diario Total (fórmula Mifflin-St Jeor)",
    description:
      "TDEE es el total de calorías que quemas al día. Aprende la fórmula Mifflin-St Jeor, factores de actividad y cómo calcularlo para perder, mantener o ganar peso.",
    h1: "¿Qué es el TDEE (Total Daily Energy Expenditure)?",
    keywords: ["que es tdee", "gasto energetico diario", "calorias diarias", "mifflin st jeor"]
  },

  "que-es-uuid": {
    title: "¿Qué es un UUID? Versiones (v1, v4, v7), formato y cuándo usarlo",
    description:
      "UUID (Universally Unique Identifier) es un ID de 128 bits único globalmente. Aprende v1 vs v4 vs v7, formato hexadecimal y casos de uso en bases de datos y APIs.",
    h1: "¿Qué es un UUID (Universally Unique Identifier)?",
    keywords: ["que es uuid", "uuid v4", "uuid v7", "identificador unico universal"]
  },

  "que-es-canonical-url": {
    title: "¿Qué es una URL canónica? Etiqueta rel canonical (2026)",
    description:
      "La URL canónica le dice a Google cuál es la versión preferida de una página duplicada. Aprende cuándo usar rel='canonical', errores comunes y cómo evitar penalizaciones.",
    h1: "¿Qué es una URL canónica (rel='canonical')?",
    keywords: ["url canonica", "canonical url", "rel canonical", "url canonica seo"]
  },

  "que-es-cors": {
    title: "¿Qué es CORS? Cross-Origin Resource Sharing explicado simple",
    description:
      "CORS controla qué dominios pueden hacer peticiones a tu API. Aprende headers (Access-Control-Allow-Origin), preflight, cookies y errores comunes.",
    h1: "¿Qué es CORS (Cross-Origin Resource Sharing)?",
    keywords: ["que es cors", "cors error", "cross origin resource sharing", "access control allow origin"]
  },

  "que-es-jwt": {
    title: "¿Qué es JWT? JSON Web Tokens explicados (estructura, firma, ejemplos)",
    description:
      "JWT (JSON Web Token) es un estándar para transmitir datos entre cliente y servidor de forma segura. Aprende su estructura (header.payload.signature), uso en auth, ventajas y riesgos.",
    h1: "¿Qué es un JWT (JSON Web Token)?",
    keywords: ["que es jwt", "json web token", "jwt token", "estructura jwt"],
    notes: "GSC: pos 5 ya está top — protect ranking + boost"
  },

  "que-es-iva": {
    title: "¿Qué es el IVA? Impuesto al Valor Agregado en México y LATAM (2026)",
    description:
      "El IVA es un impuesto al consumo aplicado en cada venta. Aprende tasas por país (México 16%, Argentina 21%, España 21%), exenciones y cómo calcularlo.",
    h1: "¿Qué es el IVA (Impuesto al Valor Agregado)?",
    keywords: ["que es iva", "iva mexico", "impuesto valor agregado", "calcular iva"]
  },

  // ============================================================
  // ALTERNATIVES — pages con impresiones
  // ============================================================
  // Estas se gestionan en ALTERNATIVES_OVERRIDES porque tienen ruta distinta

  // ============================================================
  // EN versions (English mirrors with impressions)
  // ============================================================

  "en/contador-palabras": {
    title: "Word Counter Online Free — Words, Characters & Reading Time",
    description:
      "Count words, characters (with/without spaces), paragraphs and reading time instantly. No signup, no limits. Works offline in your browser.",
    h1: "Word & Character Counter",
    keywords: ["word counter", "character counter", "count words online", "free word counter"]
  },

  "en/cps-test": {
    title: "CPS Test — Clicks Per Second Test (2026)",
    description:
      "Test your clicks per second over 1s, 5s, 10s, 30s, 60s and 100 ms (Jitter). Compare with world records. No signup, no tracking.",
    h1: "CPS Test — Clicks Per Second"
  },

  "en/unir-pdf": {
    title: "Merge PDF Free Online — Combine PDFs Without Upload",
    description:
      "Merge 2, 5, 10+ PDFs into one directly in your browser. Files never leave your device. No watermark, no signup, no size limit.",
    h1: "Merge PDF Online Free"
  },

  "en/dividir-pdf": {
    title: "Split PDF Free — Extract Pages Without Upload",
    description:
      "Extract specific pages or split a PDF into separate documents in your browser. No watermark, no size limit, free forever.",
    h1: "Split PDF Online Free"
  },

  "en/rotar-pdf": {
    title: "Rotate PDF Free — 90°, 180°, 270° Without Upload",
    description:
      "Rotate PDF pages 90°, 180° or 270° in your browser. File never uploaded. No watermark, no signup, free.",
    h1: "Rotate PDF Online Free"
  },

  "en/generador-qr": {
    title: "QR Code Generator Free — URL, WiFi, vCard, Text",
    description:
      "Generate QR codes for URLs, WiFi, contacts, emails or any text. Download PNG or SVG in HD. No signup, no watermark, runs in your browser.",
    h1: "Free QR Code Generator"
  }
};

/**
 * Lookup helper. Acepta slug crudo o slug con prefix `en/`.
 */
export function getSeoOverride(slug: string): SeoOverride | undefined {
  return SEO_OVERRIDES[slug];
}

/**
 * Slugs prioritarios (orden por impresiones GSC 90d desc).
 * Usar para IndexNow ping, internal linking forzado desde home, etc.
 */
export const PRIORITY_SLUGS = [
  "que-es-cps-test",
  "en/unir-pdf",
  "en/generador-qr",
  "calculadora-regla-tres",
  "calculadora-propina",
  "contador-palabras",
  "cps-test",
  "en/contador-palabras",
  "en/cps-test",
  "que-es-imc",
  "calculadora-iva-mexico",
  "que-es-pdf",
  "que-es-tdee",
  "que-es-canonical-url",
  "convertir-mayusculas",
  "en/dividir-pdf",
  "que-es-uuid",
  "que-es-cors",
  "que-es-iva",
  "que-es-jwt",
  "rotar-pdf",
  "en/rotar-pdf"
];
