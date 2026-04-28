export type ToolCategory =
  | "text"
  | "seo"
  | "pdf"
  | "image"
  | "developer"
  | "converter"
  | "generator"
  | "calculator"
  | "symbols"
  | "fancy-text"
  | "test"
  | "random"
  | "ai";

export type Tool = {
  slug: string;
  category: ToolCategory;
  name: string;
  shortDesc: string;
  longDesc: string;
  keywords: string[];
  popularity: number;
  comingSoon?: boolean;
  faqs?: { q: string; a: string }[];
  related?: string[];
};

export const CATEGORIES: Record<ToolCategory, { name: string; slug: string; description: string; emoji: string }> = {
  text: { name: "Texto", slug: "texto", description: "Contar palabras, mayúsculas, minúsculas, lorem ipsum y más.", emoji: "📝" },
  seo: { name: "SEO", slug: "seo", description: "Análisis SEO, meta tags, sitemap, robots.txt y schema markup.", emoji: "🔍" },
  pdf: { name: "PDF", slug: "pdf", description: "Convertir, firmar, unir, dividir y comprimir PDF online gratis.", emoji: "📄" },
  image: { name: "Imágenes", slug: "imagenes", description: "Convertir, comprimir y editar imágenes en tu navegador.", emoji: "🖼️" },
  developer: { name: "Desarrollador", slug: "desarrollador", description: "JSON, Base64, hashes, regex, formateadores.", emoji: "💻" },
  converter: { name: "Conversores", slug: "conversores", description: "Convertir entre unidades, formatos y zonas horarias.", emoji: "🔄" },
  generator: { name: "Generadores", slug: "generadores", description: "QR codes, contraseñas, UUIDs, colores y más.", emoji: "✨" },
  calculator: { name: "Calculadoras", slug: "calculadoras", description: "Préstamos, IMC, edad, descuentos y conversiones.", emoji: "🧮" },
  symbols: { name: "Símbolos", slug: "simbolos", description: "Copia y pega corazones, estrellas, flechas y emojis.", emoji: "♥" },
  "fancy-text": { name: "Texto decorado", slug: "texto-decorado", description: "Convertir texto en fuentes raras para Instagram, Discord, TikTok.", emoji: "𝓐" },
  test: { name: "Tests online", slug: "tests", description: "CPS test, tiempo de reacción, velocidad de tipeo, cronómetro.", emoji: "⏱️" },
  random: { name: "Aleatorios", slug: "aleatorios", description: "Ruleta, número aleatorio, dados, sí o no.", emoji: "🎲" },
  ai: { name: "IA", slug: "ia", description: "Reescribir, resumir, traducir y generar texto con IA.", emoji: "🤖" }
};

export const TOOLS: Tool[] = [
  {
    slug: "contador-palabras",
    category: "text",
    name: "Contador de palabras",
    shortDesc: "Cuenta palabras, caracteres, párrafos y tiempo de lectura.",
    longDesc:
      "Pega o escribe tu texto y obtén al instante el número de palabras, caracteres (con y sin espacios), párrafos, oraciones y tiempo estimado de lectura. Ideal para artículos, ensayos, posts en redes sociales y emails.",
    keywords: ["contador de palabras", "contar palabras online", "word counter"],
    popularity: 98,
    faqs: [
      { q: "¿Cómo funciona el contador de palabras?", a: "Procesa el texto en tu navegador en tiempo real. Tus datos nunca salen de tu computadora." },
      { q: "¿Cuenta caracteres con espacios?", a: "Sí, te muestra ambos valores: caracteres con espacios y sin espacios." },
      { q: "¿Hay límite de longitud?", a: "No, podés pegar textos largos sin restricciones." }
    ],
    related: ["contador-caracteres", "convertir-mayusculas", "lorem-ipsum"]
  },
  {
    slug: "contador-caracteres",
    category: "text",
    name: "Contador de caracteres",
    shortDesc: "Cuenta caracteres con y sin espacios para Twitter, SEO, SMS.",
    longDesc:
      "Útil para respetar límites de Twitter/X (280), meta descriptions (155), title tags (60), SMS (160) o cualquier campo con tope de caracteres. Muestra el conteo en tiempo real.",
    keywords: ["contador de caracteres", "character counter", "contar caracteres"],
    popularity: 92,
    related: ["contador-palabras", "convertir-mayusculas"]
  },
  {
    slug: "convertir-mayusculas",
    category: "text",
    name: "Convertir mayúsculas/minúsculas",
    shortDesc: "Cambia tu texto a MAYÚSCULAS, minúsculas, Title Case o aLtErNaDo.",
    longDesc:
      "Transforma tu texto entre 6 formatos: MAYÚSCULAS, minúsculas, Primera Letra En Mayúscula, Solo La Primera Palabra, aLtErNaDo (sarcástico) e InVeRsO. Útil para títulos, normalizar datos o crear texto irónico.",
    keywords: ["convertir mayúsculas", "title case", "uppercase converter"],
    popularity: 85,
    related: ["contador-palabras", "texto-invertido"]
  },
  {
    slug: "lorem-ipsum",
    category: "text",
    name: "Generador de Lorem Ipsum",
    shortDesc: "Genera texto de relleno Lorem Ipsum personalizado.",
    longDesc:
      "Crea texto de prueba en formato Lorem Ipsum. Elegí cantidad de párrafos, palabras u oraciones. Ideal para mockups, plantillas web y maquetas de diseño.",
    keywords: ["lorem ipsum", "texto de relleno", "dummy text generator"],
    popularity: 80,
    related: ["contador-palabras", "generador-passwords"]
  },
  {
    slug: "generador-passwords",
    category: "generator",
    name: "Generador de contraseñas",
    shortDesc: "Crea contraseñas seguras de hasta 64 caracteres con un click.",
    longDesc:
      "Genera contraseñas robustas con mayúsculas, minúsculas, números y símbolos. Configura longitud, exclusión de caracteres ambiguos (0/O, l/1) y copia con un click. Todo se procesa localmente — ninguna contraseña se envía a internet.",
    keywords: ["generador contraseñas", "password generator", "contraseña segura"],
    popularity: 95,
    faqs: [
      { q: "¿Las contraseñas se guardan en algún servidor?", a: "No. La generación ocurre 100% en tu navegador con la Web Crypto API." },
      { q: "¿Qué tan segura es una contraseña de 16 caracteres?", a: "Una contraseña aleatoria de 16 caracteres con símbolos requiere miles de años de cómputo para crackear por fuerza bruta." }
    ],
    related: ["generador-uuid", "hash-md5-sha"]
  },
  {
    slug: "generador-uuid",
    category: "generator",
    name: "Generador de UUID",
    shortDesc: "Genera identificadores únicos universales (UUID v4) al instante.",
    longDesc:
      "Crea UUIDs versión 4 (random) listos para usar en bases de datos, APIs o claves únicas. Generá uno o varios, copia con un click.",
    keywords: ["UUID generator", "GUID", "identificador único"],
    popularity: 70,
    related: ["generador-passwords", "hash-md5-sha"]
  },
  {
    slug: "generador-qr",
    category: "generator",
    name: "Generador de códigos QR",
    shortDesc: "Crea códigos QR para URLs, texto, WiFi o vCard. Descarga PNG.",
    longDesc:
      "Generador de QR online gratis. Pegá una URL, texto, datos de WiFi o un vCard y obtené un código QR de alta resolución. Descargable como PNG, sin marca de agua, sin registro.",
    keywords: ["generador QR", "QR code generator", "crear código QR"],
    popularity: 96,
    related: ["generador-passwords", "acortador-base64"]
  },
  {
    slug: "json-formatter",
    category: "developer",
    name: "Formateador JSON",
    shortDesc: "Valida, formatea y minifica JSON con resaltado de errores.",
    longDesc:
      "Pegá JSON y obtené versión formateada con indentación, validación de errores con línea exacta, y opción de minificar. Soporta JSON grandes (>1MB). Procesado 100% local.",
    keywords: ["json formatter", "json validator", "formatear json"],
    popularity: 90,
    related: ["base64-encode", "url-encode"]
  },
  {
    slug: "base64-encode",
    category: "developer",
    name: "Codificar/Decodificar Base64",
    shortDesc: "Convierte texto a Base64 y viceversa instantáneamente.",
    longDesc:
      "Codifica texto, URLs o cualquier string a Base64, o decodifica Base64 a texto plano. Soporta UTF-8 (acentos, emojis). 100% client-side.",
    keywords: ["base64 encoder", "base64 decoder", "codificar base64"],
    popularity: 85,
    related: ["url-encode", "json-formatter"]
  },
  {
    slug: "url-encode",
    category: "developer",
    name: "URL Encode/Decode",
    shortDesc: "Codifica y decodifica URLs con caracteres especiales.",
    longDesc:
      "Convierte caracteres especiales (espacios, acentos, símbolos) en su equivalente percent-encoded para URLs válidas. También decodifica URLs ya codificadas.",
    keywords: ["url encoder", "url decoder", "percent encoding"],
    popularity: 80,
    related: ["base64-encode", "json-formatter"]
  },
  {
    slug: "hash-md5-sha",
    category: "developer",
    name: "Generador de hash MD5/SHA",
    shortDesc: "Calcula MD5, SHA-1, SHA-256 y SHA-512 de cualquier texto.",
    longDesc:
      "Generá hashes criptográficos de cualquier string. Útil para verificar integridad de archivos, generar checksums o IDs determinísticos. Procesado en tu navegador con Web Crypto API.",
    keywords: ["md5 generator", "sha256 generator", "hash calculator"],
    popularity: 75,
    related: ["generador-passwords", "generador-uuid"]
  },
  {
    slug: "cps-test",
    category: "test",
    name: "CPS Test (Clicks por segundo)",
    shortDesc: "Mide tu velocidad de clicks. Modos 5s, 10s, 30s, 60s y 100s.",
    longDesc:
      "Test de velocidad de clicks: clickea lo más rápido que puedas en el tiempo seleccionado. Compara tu CPS (Clicks Per Second) con récords personales. Útil para gamers de Minecraft PvP, evaluar mouse o practicar.",
    keywords: ["cps test", "clicks per second", "click speed test"],
    popularity: 99,
    faqs: [
      { q: "¿Cuál es un buen CPS?", a: "Promedio humano: 6-8 CPS. Buen jugador: 8-10 CPS. Pro/jitter click: 10-15 CPS." },
      { q: "¿Funciona en móvil?", a: "Sí, podés tocar la pantalla en lugar de hacer click." }
    ],
    related: ["typing-test", "tiempo-reaccion"]
  },
  {
    slug: "tiempo-reaccion",
    category: "test",
    name: "Test de tiempo de reacción",
    shortDesc: "Mide tu tiempo de reacción en milisegundos. Promedio humano: 250ms.",
    longDesc:
      "Esperá a que el cuadro cambie de color y hacé click lo más rápido posible. Repetí 5 veces para obtener tu tiempo promedio en milisegundos. El promedio humano es 200-300ms.",
    keywords: ["tiempo de reacción", "reaction time test", "test reflejos"],
    popularity: 88,
    related: ["cps-test", "typing-test"]
  },
  {
    slug: "cronometro",
    category: "test",
    name: "Cronómetro online",
    shortDesc: "Cronómetro preciso con vueltas, pausa y exportar.",
    longDesc:
      "Cronómetro online con precisión de centésimas, vueltas (laps), pausa y reset. Sigue corriendo aunque cambies de pestaña. Sin instalar nada.",
    keywords: ["cronómetro online", "stopwatch online", "timer"],
    popularity: 92,
    related: ["temporizador", "cps-test"]
  },
  {
    slug: "ruleta-decision",
    category: "random",
    name: "Ruleta para decidir",
    shortDesc: "Agrega opciones, gira la ruleta y dejá que el azar decida.",
    longDesc:
      "Ruleta animada para tomar decisiones. Agregá opciones, girala y obtené un resultado al azar. Ideal para sorteos en redes, decidir restaurante, equipos en clase o cualquier dilema.",
    keywords: ["ruleta para decidir", "spinner wheel", "ruleta sorteos"],
    popularity: 94,
    related: ["numero-aleatorio", "cara-cruz"]
  }
];

export const TOOLS_BY_SLUG = Object.fromEntries(TOOLS.map((t) => [t.slug, t]));

export function toolsByCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter((t) => t.category === category).sort((a, b) => b.popularity - a.popularity);
}

export function popularTools(limit = 12): Tool[] {
  return [...TOOLS].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}

export function relatedTools(slug: string, limit = 4): Tool[] {
  const tool = TOOLS_BY_SLUG[slug];
  if (!tool) return [];
  const explicit = (tool.related ?? []).map((s) => TOOLS_BY_SLUG[s]).filter(Boolean);
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const sameCategory = TOOLS.filter((t) => t.category === tool.category && t.slug !== slug);
  return [...explicit, ...sameCategory].slice(0, limit);
}
