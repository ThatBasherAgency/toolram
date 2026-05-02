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
  },
  {
    slug: "unir-pdf",
    category: "pdf",
    name: "Unir PDF (Merge)",
    shortDesc: "Une varios PDFs en uno solo. Procesado en tu navegador.",
    longDesc: "Selecciona múltiples archivos PDF, ordénalos arrastrando y descarga un único PDF combinado. Tus archivos nunca salen de tu navegador — todo el procesamiento ocurre localmente con la librería pdf-lib.",
    keywords: ["unir pdf", "merge pdf", "combinar pdf"],
    popularity: 97,
    faqs: [
      { q: "¿Hay límite de archivos?", a: "No hay límite explícito. En la práctica, depende de la RAM de tu navegador (típicamente 50-100 PDFs medianos)." },
      { q: "¿Se suben mis archivos a un servidor?", a: "No. Todo el merge ocurre en tu navegador con WebAssembly." }
    ],
    related: ["dividir-pdf", "rotar-pdf", "marca-agua-pdf"]
  },
  {
    slug: "dividir-pdf",
    category: "pdf",
    name: "Dividir PDF / extraer páginas",
    shortDesc: "Extrae páginas específicas de un PDF (ej: 1-3, 5, 7-9).",
    longDesc: "Sube un PDF, indica qué páginas quieres extraer (rangos y páginas sueltas separadas por coma) y descarga un PDF con solo esas páginas.",
    keywords: ["dividir pdf", "split pdf", "extraer paginas pdf"],
    popularity: 90,
    related: ["unir-pdf", "rotar-pdf", "informacion-pdf"]
  },
  {
    slug: "rotar-pdf",
    category: "pdf",
    name: "Rotar PDF",
    shortDesc: "Rota todas las páginas de un PDF 90°, 180° o 270°.",
    longDesc: "Útil cuando un PDF llegó escaneado en orientación incorrecta. Aplica la rotación a todas las páginas y descarga el resultado.",
    keywords: ["rotar pdf", "rotate pdf"],
    popularity: 75,
    related: ["unir-pdf", "dividir-pdf"]
  },
  {
    slug: "marca-agua-pdf",
    category: "pdf",
    name: "Marca de agua en PDF",
    shortDesc: "Agrega texto en diagonal como marca de agua a tu PDF.",
    longDesc: "Estampa cualquier texto (ej: CONFIDENCIAL, BORRADOR, DRAFT) como marca de agua diagonal sobre todas las páginas. Configurable: opacidad, tamaño y color.",
    keywords: ["marca de agua pdf", "watermark pdf"],
    popularity: 78,
    related: ["unir-pdf", "numerar-pdf", "proteger-pdf"]
  },
  {
    slug: "numerar-pdf",
    category: "pdf",
    name: "Numerar páginas de PDF",
    shortDesc: "Agrega números de página automáticamente.",
    longDesc: "Coloca el formato '1/N' al pie de cada página. Posición configurable (abajo centro, abajo derecha o arriba derecha). Ideal para entregables académicos o legales.",
    keywords: ["numerar pdf", "page numbers pdf"],
    popularity: 70,
    related: ["unir-pdf", "marca-agua-pdf"]
  },
  {
    slug: "imagenes-a-pdf",
    category: "pdf",
    name: "JPG/PNG a PDF",
    shortDesc: "Convierte una o varias imágenes en un único PDF.",
    longDesc: "Selecciona JPGs o PNGs, ordénalos como quieras y descarga un PDF que contiene cada imagen como página. Útil para enviar contratos firmados con foto, comprobantes, screenshots agrupados.",
    keywords: ["jpg a pdf", "png a pdf", "imagen a pdf"],
    popularity: 92,
    related: ["unir-pdf", "informacion-pdf"]
  },
  {
    slug: "proteger-pdf",
    category: "pdf",
    name: "Marcar PDF como protegido",
    shortDesc: "Agrega marca visible de confidencialidad a un PDF.",
    longDesc: "Esta versión client-side agrega una marca visible de confidencialidad y metadata. Para encriptación con contraseña AES real estamos preparando un microservicio backend (fase 2).",
    keywords: ["proteger pdf", "protect pdf"],
    popularity: 60,
    related: ["marca-agua-pdf", "unir-pdf"]
  },
  {
    slug: "informacion-pdf",
    category: "pdf",
    name: "Información de PDF",
    shortDesc: "Inspecciona páginas, tamaño, autor y metadata de un PDF.",
    longDesc: "Súper útil para verificar de cuántas páginas es un PDF antes de imprimir, o para ver quién lo creó.",
    keywords: ["info pdf", "pdf metadata"],
    popularity: 55,
    related: ["unir-pdf", "dividir-pdf"]
  },
  {
    slug: "redimensionar-imagen",
    category: "image",
    name: "Redimensionar imagen",
    shortDesc: "Cambia el ancho y alto de fotos JPG, PNG o WebP en tu navegador.",
    longDesc:
      "Subí una imagen, definí ancho/alto en píxeles (manteniendo o no la proporción), elegí formato de salida (JPG, PNG o WebP) y calidad. Ideal para preparar fotos para web, redes sociales o emails sin perder privacidad — todo se procesa con Canvas en tu navegador.",
    keywords: ["redimensionar imagen", "resize image online", "cambiar tamaño foto"],
    popularity: 90,
    faqs: [
      { q: "¿Pierdo calidad al redimensionar?", a: "Si reducís dimensiones, sí (es inevitable). Para minimizar pérdida usá WebP a 85-90% de calidad." },
      { q: "¿Hay límite de tamaño?", a: "El límite lo pone tu RAM. En PCs modernas funciona bien con imágenes hasta 30-50 MP." }
    ],
    related: ["comprimir-imagen", "convertir-imagen", "imagenes-a-pdf"]
  },
  {
    slug: "comprimir-imagen",
    category: "image",
    name: "Comprimir imagen",
    shortDesc: "Reduce el peso de tus fotos JPG y PNG sin subirlas a un servidor.",
    longDesc:
      "Bajá el tamaño en KB de cualquier foto ajustando el nivel de calidad. Usa el algoritmo nativo del navegador (Canvas + toBlob) — privado, instantáneo y sin marca de agua. Resultado típico: 60-80% menos peso con calidad visual aceptable.",
    keywords: ["comprimir imagen", "compress image", "reducir peso jpg"],
    popularity: 95,
    related: ["redimensionar-imagen", "convertir-imagen"]
  },
  {
    slug: "convertir-imagen",
    category: "image",
    name: "Convertir imagen JPG/PNG/WebP",
    shortDesc: "Cambia entre JPG, PNG y WebP sin instalar nada.",
    longDesc:
      "Convertí entre los tres formatos web más usados. WebP suele pesar 25-35% menos que JPG con misma calidad y soporta transparencia como PNG. PNG conserva 100% de calidad sin compresión con pérdida.",
    keywords: ["convertir jpg a png", "png a webp", "convertir imagen"],
    popularity: 88,
    related: ["redimensionar-imagen", "comprimir-imagen"]
  },
  {
    slug: "conversor-temperatura",
    category: "converter",
    name: "Conversor de temperatura",
    shortDesc: "Convierte entre Celsius, Fahrenheit y Kelvin al instante.",
    longDesc:
      "Pegá un valor en cualquiera de las tres escalas y obtené el equivalente en las otras dos. Útil para recetas internacionales, ciencia, viajes a EE.UU. y trabajo de laboratorio.",
    keywords: ["convertir celsius fahrenheit", "kelvin a celsius", "conversor temperatura"],
    popularity: 78,
    faqs: [
      { q: "¿Cuál es la fórmula exacta?", a: "°F = °C × 9/5 + 32. Para Kelvin: K = °C + 273.15." }
    ],
    related: ["conversor-unidades", "calculadora-imc"]
  },
  {
    slug: "conversor-unidades",
    category: "converter",
    name: "Conversor de unidades",
    shortDesc: "Longitud, peso, volumen, área y tiempo en una sola herramienta.",
    longDesc:
      "Convertí entre sistema métrico y anglosajón: metros↔pies, kg↔libras, litros↔galones, hectáreas↔acres, segundos↔años y mucho más. Cinco grupos con 30+ unidades, todo client-side.",
    keywords: ["conversor unidades", "metros a pies", "kg a libras", "convertir unidades"],
    popularity: 85,
    related: ["conversor-temperatura", "timestamp-converter"]
  },
  {
    slug: "timestamp-converter",
    category: "developer",
    name: "Conversor de Timestamp Unix",
    shortDesc: "Convierte timestamps Unix a fechas legibles y viceversa.",
    longDesc:
      "Pegá un timestamp Unix (segundos desde 1970) y obtené la fecha en formato local, UTC e ISO. O pegá una fecha y obtené el timestamp en segundos y milisegundos. El reloj actual se actualiza en tiempo real.",
    keywords: ["unix timestamp converter", "epoch a fecha", "timestamp converter"],
    popularity: 80,
    related: ["json-formatter", "url-encode"]
  },
  {
    slug: "typing-test",
    category: "test",
    name: "Test de velocidad de tipeo (WPM)",
    shortDesc: "Mide tu velocidad escribiendo en palabras por minuto y tu precisión.",
    longDesc:
      "Escribí la frase aleatoria que aparece en pantalla lo más rápido y preciso posible. Al terminar te mostramos tu WPM (Words Per Minute) y porcentaje de precisión. Promedio adulto: 38-45 WPM. Tipistas profesionales: 65-75 WPM.",
    keywords: ["typing test español", "test velocidad tipeo", "wpm test"],
    popularity: 92,
    faqs: [
      { q: "¿Qué es un buen WPM?", a: "Adulto promedio: 38-45 WPM. Programador: 50-65 WPM. Profesional/data entry: 70-90 WPM." }
    ],
    related: ["cps-test", "tiempo-reaccion"]
  },
  {
    slug: "temporizador",
    category: "test",
    name: "Temporizador online (countdown)",
    shortDesc: "Cuenta regresiva con alarma. Configurá horas, minutos y segundos.",
    longDesc:
      "Temporizador con alarma sonora cuando llega a cero. Presets rápidos para Pomodoro (25 min), descansos cortos (5 min) o cocción de huevos (3, 5, 10 min). Pausa, reset y sigue corriendo aunque cambies de pestaña.",
    keywords: ["temporizador online", "countdown timer", "alarma online"],
    popularity: 90,
    related: ["cronometro", "cps-test"]
  },
  {
    slug: "numero-aleatorio",
    category: "random",
    name: "Generador de número aleatorio",
    shortDesc: "Genera 1 o varios números entre un rango. Sin repetir si querés.",
    longDesc:
      "Definí un rango mínimo y máximo, cantidad de números (1 a 1000) y si pueden repetirse o no. Útil para sorteos, lotería, asignar ganadores, simulaciones y juegos. Aleatoriedad nativa del navegador.",
    keywords: ["generador numero aleatorio", "random number generator", "número al azar"],
    popularity: 87,
    related: ["ruleta-decision", "cara-cruz", "dados"]
  },
  {
    slug: "cara-cruz",
    category: "random",
    name: "Cara o cruz online",
    shortDesc: "Lanza una moneda virtual. ¿Cara o cruz? Decidí al azar.",
    longDesc:
      "Lanza una moneda virtual animada con resultado 50/50. Llevá registro de las últimas 20 tiradas y verificá la distribución (la ley de los grandes números acerca al 50/50 con suficientes lanzamientos).",
    keywords: ["cara o cruz online", "lanzar moneda", "coin flip online"],
    popularity: 91,
    related: ["dados", "ruleta-decision", "numero-aleatorio"]
  },
  {
    slug: "dados",
    category: "random",
    name: "Tirar dados online",
    shortDesc: "Tira hasta 20 dados de 4, 6, 8, 10, 12, 20 o 100 caras.",
    longDesc:
      "Lanzador de dados virtual para mesa de rol (D&D, Pathfinder), board games, decisiones grupales o cualquier juego que necesite azar. Soporta D4, D6, D8, D10, D12, D20 y D100. Mostramos suma total cuando tirás varios.",
    keywords: ["tirar dados online", "dice roller", "d20 online"],
    popularity: 89,
    related: ["cara-cruz", "ruleta-decision", "numero-aleatorio"]
  },
  {
    slug: "regex-tester",
    category: "developer",
    name: "Tester de Expresiones Regulares",
    shortDesc: "Probá patrones regex en tiempo real con resaltado de coincidencias.",
    longDesc:
      "Pegá un patrón regex con sus flags (g, i, m, s, u, y) y un texto de prueba. Las coincidencias se resaltan al instante. Soporta JavaScript regex (la misma sintaxis que usás en código). Incluye cheatsheet rápido.",
    keywords: ["regex tester", "regex online", "expresiones regulares"],
    popularity: 82,
    related: ["json-formatter", "base64-encode"]
  },
  {
    slug: "convertidor-color",
    category: "developer",
    name: "Conversor de color HEX/RGB/HSL",
    shortDesc: "Convierte entre HEX, RGB, HSL y formato Tailwind. Color picker incluido.",
    longDesc:
      "Pegá un color en HEX, ajustá con el picker o copiá los formatos equivalentes en RGB, HSL, CSS variable y clase Tailwind arbitraria. Útil para diseñadores y devs front-end.",
    keywords: ["hex a rgb", "rgb a hsl", "color converter", "color picker"],
    popularity: 84,
    related: ["regex-tester", "timestamp-converter"]
  },
  {
    slug: "texto-invertido",
    category: "text",
    name: "Texto invertido / al revés",
    shortDesc: "Invierte caracteres, palabras o líneas de un texto.",
    longDesc:
      "Cuatro modos: caracteres invertidos (espejo letra por letra), palabras invertidas (orden inverso de palabras), cada palabra invertida individualmente y líneas en orden inverso. Útil para crear acertijos, contraseñas mnemotécnicas o efectos visuales.",
    keywords: ["texto invertido", "texto al revés", "reverse text"],
    popularity: 75,
    related: ["convertir-mayusculas", "eliminar-acentos", "contador-palabras"]
  },
  {
    slug: "eliminar-acentos",
    category: "text",
    name: "Eliminar tildes y acentos",
    shortDesc: "Quita tildes, diéresis, ñ y crea slugs URL-friendly.",
    longDesc:
      "Tres salidas: texto sin tildes (mantiene ñ), sin tildes ni ñ (transliterado a ASCII puro) y slug URL-friendly listo para usar en links. Útil para normalizar nombres, generar URLs SEO o exportar a sistemas que no soportan UTF-8.",
    keywords: ["quitar tildes", "remove accents", "slug generator"],
    popularity: 78,
    related: ["convertir-mayusculas", "texto-invertido", "url-encode"]
  },
  {
    slug: "generador-meta-tags",
    category: "seo",
    name: "Generador de Meta Tags",
    shortDesc: "Title, description, Open Graph y Twitter Card listos para pegar en <head>.",
    longDesc:
      "Completá título, descripción, URL canónica e imagen y obtené el bloque HTML completo con meta description, Open Graph (Facebook, LinkedIn) y Twitter Card. Indicadores de longitud de title (60) y description (160) en tiempo real para no pasarte de los límites de Google.",
    keywords: ["generador meta tags", "open graph generator", "twitter card", "meta tags seo"],
    popularity: 90,
    faqs: [
      { q: "¿Cuál es el largo recomendado del title?", a: "Google muestra ~600 píxeles, equivalente a 50-60 caracteres." },
      { q: "¿Qué tamaño de imagen OG?", a: "1200×630 píxeles es el estándar para que se vea bien en Facebook y LinkedIn." }
    ],
    related: ["generador-robots", "previsualizador-serp", "generador-schema-faq"]
  },
  {
    slug: "generador-robots",
    category: "seo",
    name: "Generador de robots.txt",
    shortDesc: "Crea tu robots.txt con presets para WordPress, e-commerce y bloqueo de IA.",
    longDesc:
      "Generador interactivo de robots.txt con 5 presets: todo permitido, todo bloqueado, WordPress, e-commerce con filtros y bloqueo de scrapers de IA (GPTBot, Google-Extended, CCBot, anthropic-ai). Editable manualmente y con campo dedicado para sitemap.",
    keywords: ["robots.txt generator", "generar robots txt", "bloquear gptbot"],
    popularity: 85,
    related: ["generador-meta-tags", "generador-sitemap", "previsualizador-serp"]
  },
  {
    slug: "densidad-keywords",
    category: "seo",
    name: "Análisis de densidad de keywords",
    shortDesc: "Detecta palabras y bigramas más usados en un texto.",
    longDesc:
      "Pegá el contenido de tu artículo o página y obtené las 30 palabras y 15 bigramas más frecuentes con porcentaje de densidad. Filtra stopwords en español (artículos, preposiciones, conjunciones) para mostrar solo términos relevantes para SEO.",
    keywords: ["densidad keywords", "keyword density", "analizador palabras clave"],
    popularity: 82,
    related: ["contador-palabras", "generador-meta-tags", "previsualizador-serp"]
  },
  {
    slug: "previsualizador-serp",
    category: "seo",
    name: "Previsualizador de Google SERP",
    shortDesc: "Visualiza cómo se verá tu título y descripción en los resultados de Google.",
    longDesc:
      "Pegá title, URL y description y mirá una preview fiel del aspecto de tu resultado en Google. Indicadores de color advierten cuando te pasás de los límites recomendados (60 chars title, 160 chars description) que harían que Google trunque tu snippet.",
    keywords: ["serp preview", "previsualizador google", "google snippet preview"],
    popularity: 88,
    related: ["generador-meta-tags", "densidad-keywords", "generador-schema-faq"]
  },
  {
    slug: "generador-schema-faq",
    category: "seo",
    name: "Generador de Schema FAQ (JSON-LD)",
    shortDesc: "Crea structured data FAQPage para rich results en Google.",
    longDesc:
      "Agregá tus preguntas y respuestas y obtené el JSON-LD listo para pegar en <head>. Compatible con FAQPage schema de Schema.org, lo que puede activar el rich result de FAQ en Google con ítems desplegables que aumentan el CTR significativamente.",
    keywords: ["schema faq generator", "faqpage json-ld", "structured data faq"],
    popularity: 80,
    related: ["generador-meta-tags", "previsualizador-serp", "generador-robots"]
  },
  {
    slug: "generador-sitemap",
    category: "seo",
    name: "Generador de sitemap.xml",
    shortDesc: "Convierte una lista de URLs en un sitemap XML válido.",
    longDesc:
      "Pegá tus URLs (una por línea), elegí frecuencia de cambio y prioridad, y obtené un sitemap.xml válido para enviar a Google Search Console y Bing Webmaster Tools. Soporta hasta 50.000 URLs por archivo (límite del estándar Sitemap Protocol).",
    keywords: ["generador sitemap", "sitemap generator", "sitemap xml"],
    popularity: 78,
    related: ["generador-robots", "generador-meta-tags"]
  },
  {
    slug: "jwt-decoder",
    category: "developer",
    name: "Decodificador JWT",
    shortDesc: "Inspecciona header, payload, exp e iat de un JSON Web Token.",
    longDesc:
      "Pegá un JWT y mostramos su header, payload, fechas de emisión (iat) y expiración (exp), e indicador de si está vigente o expirado. Decodificación 100% local — la firma no se verifica (eso requiere la clave secreta del servidor).",
    keywords: ["jwt decoder", "decodificar jwt", "json web token"],
    popularity: 86,
    related: ["base64-encode", "json-formatter", "timestamp-converter"]
  },
  {
    slug: "diff-checker",
    category: "developer",
    name: "Comparador de texto (Diff)",
    shortDesc: "Encuentra diferencias línea por línea entre dos textos.",
    longDesc:
      "Pegá dos versiones de un texto y obtené un diff con líneas eliminadas (rojo), agregadas (verde) e iguales. Útil para revisar cambios en código, contratos legales, configuraciones o cualquier texto. Algoritmo basado en LCS (Longest Common Subsequence).",
    keywords: ["diff checker", "comparar texto", "text diff online"],
    popularity: 85,
    related: ["json-formatter", "regex-tester", "css-formatter"]
  },
  {
    slug: "css-formatter",
    category: "developer",
    name: "Formateador y minificador CSS",
    shortDesc: "Formatea CSS legible o minificalo para producción.",
    longDesc:
      "Dos modos: formatear CSS minificado para hacerlo legible (con indentación de 2 espacios) o minificar CSS extenso para reducir bytes en producción. Muestra el porcentaje de reducción al minificar.",
    keywords: ["css formatter", "css minifier", "formatear css"],
    popularity: 82,
    related: ["json-formatter", "diff-checker", "yaml-json-converter"]
  },
  {
    slug: "yaml-json-converter",
    category: "developer",
    name: "Convertidor YAML ↔ JSON",
    shortDesc: "Convierte entre formatos YAML y JSON en ambas direcciones.",
    longDesc:
      "Útil para configuración: GitHub Actions usa YAML, package.json usa JSON. Soporta tipos básicos (strings, números, booleans, null), listas y objetos anidados. Para YAML avanzado (anchors, multi-line) usar parser server-side.",
    keywords: ["yaml a json", "json a yaml", "yaml json converter"],
    popularity: 80,
    related: ["json-formatter", "css-formatter", "jwt-decoder"]
  },
  {
    slug: "prompt-builder",
    category: "ai",
    name: "Generador de prompts para IA",
    shortDesc: "Construí prompts estructurados para ChatGPT, Claude o Gemini.",
    longDesc:
      "Plantilla guiada con rol, tarea, audiencia, tono, formato, ejemplos few-shot y restricciones. Te devuelve un prompt en formato markdown listo para pegar en ChatGPT, Claude, Gemini, Mistral o cualquier LLM. Construido localmente — no enviamos tu prompt a ningún servidor.",
    keywords: ["generador prompts", "prompt builder", "prompts chatgpt"],
    popularity: 92,
    faqs: [
      { q: "¿Sirve para imágenes (Midjourney/DALL·E)?", a: "Esta versión está optimizada para LLMs de texto. Para imágenes necesitás describir composición, estilo y detalles visuales." }
    ],
    related: ["plantillas-prompts", "contador-tokens", "generador-titulos-seo"]
  },
  {
    slug: "contador-tokens",
    category: "ai",
    name: "Contador de tokens IA",
    shortDesc: "Estima tokens y costo para GPT-4o, Claude, Gemini y más.",
    longDesc:
      "Pegá tu texto y elegí modelo. Te mostramos tokens estimados (basados en chars/token promedio del modelo), porcentaje del context window que ocupás y costo estimado en USD como input y output. Útil para presupuestar batch jobs o validar que tu prompt entra en el contexto.",
    keywords: ["contador tokens", "token counter", "tokenizer gpt claude"],
    popularity: 88,
    related: ["prompt-builder", "contador-palabras", "json-formatter"]
  },
  {
    slug: "generador-titulos-seo",
    category: "ai",
    name: "Generador de títulos SEO",
    shortDesc: "15 variantes de títulos SEO a partir de una keyword.",
    longDesc:
      "Aplicamos 15 plantillas comprobadas con CTR alto (números, año, pregunta, comparativa, secretos, guía, listado) sobre tu keyword. Indicador de longitud para que ningún título supere los 60 caracteres recomendados por Google.",
    keywords: ["generador titulos seo", "title generator", "ideas de titulos"],
    popularity: 85,
    related: ["generador-meta-tags", "previsualizador-serp", "densidad-keywords"]
  },
  {
    slug: "plantillas-prompts",
    category: "ai",
    name: "Plantillas de prompts (biblioteca)",
    shortDesc: "18 prompts curados para SEO, redacción, código, marketing y aprendizaje.",
    longDesc:
      "Biblioteca de plantillas de prompts probados, agrupadas en 6 categorías: SEO, Redacción, Programación, Marketing, Análisis y Aprender. Filtro por texto y por categoría. Cada plantilla copiable con un click — solo reemplazá los placeholders [EN MAYÚSCULAS] con tu contenido.",
    keywords: ["plantillas prompts", "prompts curados", "prompts chatgpt español"],
    popularity: 90,
    related: ["prompt-builder", "contador-tokens", "generador-titulos-seo"]
  },
  {
    slug: "firmar-pdf",
    category: "pdf",
    name: "Firmar PDF online",
    shortDesc: "Dibujá tu firma con el mouse o dedo y aplicala a cualquier página de tu PDF.",
    longDesc:
      "Subí un PDF, dibujá tu firma directamente en el navegador, posicionala en la página y descarga el PDF firmado. 100% privado: ni el documento ni la firma se suben a un servidor — todo procesado con pdf-lib + Canvas API. Funciona en móvil con dedo o stylus, y en escritorio con mouse o trackpad.",
    keywords: ["firmar pdf online", "firma digital pdf", "sign pdf free", "firma electronica pdf"],
    popularity: 99,
    faqs: [
      { q: "¿La firma tiene validez legal?", a: "Es una firma electrónica simple, válida para documentos no críticos. Para firmas con valor jurídico fuerte (contratos notariales) consultá tu legislación local — usualmente requieren certificado digital." },
      { q: "¿Puedo firmar varias páginas?", a: "En esta versión aplicás una firma por documento. Para múltiples firmas, repetí el proceso o usá el editor de PDF combinado." }
    ],
    related: ["editar-pdf", "marca-agua-pdf", "unir-pdf"]
  },
  {
    slug: "editar-pdf",
    category: "pdf",
    name: "Editar PDF online",
    shortDesc: "Agregá texto a cualquier página y posición de tu PDF sin instalar nada.",
    longDesc:
      "Editor minimalista de PDFs: subí el archivo, agregá uno o varios bloques de texto en la posición exacta (porcentaje X/Y), color y tamaño que quieras, y descargá el resultado. Útil para completar formularios escaneados, agregar notas o tachar datos. Procesamiento client-side con pdf-lib.",
    keywords: ["editar pdf online", "edit pdf free", "agregar texto pdf"],
    popularity: 96,
    related: ["firmar-pdf", "marca-agua-pdf", "informacion-pdf"]
  },
  {
    slug: "reordenar-pdf",
    category: "pdf",
    name: "Reordenar páginas de PDF",
    shortDesc: "Mové páginas arriba/abajo o eliminalas, sin tocar el original.",
    longDesc:
      "Subí un PDF y obtené una vista de todas sus páginas en grid. Cambiá el orden con flechas, eliminá las que no necesités y descargá un nuevo PDF con el orden final. Tu archivo original permanece intacto.",
    keywords: ["reordenar pdf", "ordenar paginas pdf", "rearrange pdf pages"],
    popularity: 88,
    related: ["unir-pdf", "dividir-pdf", "rotar-pdf"]
  },
  {
    slug: "pdf-a-jpg",
    category: "pdf",
    name: "PDF a JPG (extraer páginas)",
    shortDesc: "Convertí cada página del PDF en una imagen JPG de alta resolución.",
    longDesc:
      "Renderizamos cada página de tu PDF como JPG usando pdf.js (la misma librería que usa Firefox y Chrome). Elegí entre 4 niveles de calidad (72 a 288 DPI) y descargá una imagen a la vez o todas a la vez. Procesamiento 100% local.",
    keywords: ["pdf a jpg", "pdf to image", "extraer imagenes pdf", "pdf a imagen"],
    popularity: 94,
    faqs: [
      { q: "¿Qué resolución necesito?", a: "Para web: 144 DPI. Para impresión: 288 DPI. Para previews/miniaturas: 72 DPI." }
    ],
    related: ["imagenes-a-pdf", "dividir-pdf", "informacion-pdf"]
  },
  {
    slug: "comprimir-pdf",
    category: "pdf",
    name: "Comprimir PDF",
    shortDesc: "Reduce el peso de tu PDF optimizando streams y eliminando metadata.",
    longDesc:
      "Optimizamos el PDF reorganizando object streams, eliminando metadata redundante (autor, productor, palabras clave) y aplicando compresión nativa de pdf-lib. Para PDFs con imágenes muy pesadas embebidas se recomienda comprimir las imágenes con la herramienta dedicada antes de generar el PDF.",
    keywords: ["comprimir pdf", "reducir tamaño pdf", "compress pdf"],
    popularity: 95,
    related: ["unir-pdf", "pdf-a-jpg", "imagenes-a-pdf"]
  },
  {
    slug: "quitar-fondo-imagen",
    category: "image",
    name: "Quitar fondo de imagen con IA",
    shortDesc: "Quita el fondo de cualquier foto con IA — 100% en tu navegador, sin API.",
    longDesc:
      "Modelo de segmentación U²-Net optimizado que corre en tu propio navegador (~13 MB la primera vez, después cacheado). Detecta el sujeto principal y devuelve PNG con transparencia. Ideal para productos, retratos, mascotas u objetos con fondo claro. La imagen jamás se sube a ningún servidor.",
    keywords: ["quitar fondo imagen", "remove background", "remover fondo foto"],
    popularity: 99,
    faqs: [
      { q: "¿Por qué la primera vez tarda tanto?", a: "Se descarga el modelo de IA (~13 MB) la primera vez. Luego queda cacheado y los siguientes usos son instantáneos." },
      { q: "¿Funciona en móvil?", a: "Sí, pero requiere un dispositivo con suficiente RAM (recomendado: 4 GB+). En móviles low-end puede ser lento." }
    ],
    related: ["recortar-imagen", "marca-agua-imagen", "convertir-imagen"]
  },
  {
    slug: "recortar-imagen",
    category: "image",
    name: "Recortar imagen online",
    shortDesc: "Recortá fotos arrastrando una caja redimensionable. Descargá el PNG.",
    longDesc:
      "Subí una imagen, mové y redimensioná la caja de recorte tirando de las esquinas, y descargá el resultado en PNG sin pérdida. Útil para preparar avatares, banners, miniaturas y secciones de pantallas.",
    keywords: ["recortar imagen", "crop image online", "cropper online"],
    popularity: 92,
    related: ["redimensionar-imagen", "marca-agua-imagen", "comprimir-imagen"]
  },
  {
    slug: "marca-agua-imagen",
    category: "image",
    name: "Marca de agua en imagen",
    shortDesc: "Estampá texto como marca de agua: posición fija o patrón anti-screenshot.",
    longDesc:
      "Agregá tu copyright o marca como texto sobre cualquier foto. Modo posición fija (esquinas o centro) para una marca discreta, o modo mosaico (tile) que cubre toda la imagen para protegerla contra captura de pantalla. Configurá tamaño, color, opacidad, ángulo de rotación.",
    keywords: ["marca de agua imagen", "watermark image", "copyright foto"],
    popularity: 87,
    related: ["recortar-imagen", "redimensionar-imagen", "marca-agua-pdf"]
  },
  {
    slug: "analizador-meta",
    category: "seo",
    name: "Analizador de Meta Tags y SEO On-Page",
    shortDesc: "Auditá title, meta tags, OG, schema, headings e imágenes de cualquier HTML.",
    longDesc:
      "Pegá el código HTML de una página (View Source o Ctrl+U) y obtené un score SEO básico evaluando 15 meta tags, presencia de H1/H2, imágenes sin alt, cantidad de enlaces internos vs externos y schema.org JSON-LD detectados. Útil para auditar tu propio sitio o el de la competencia.",
    keywords: ["analizador meta tags", "seo on-page checker", "meta tag analyzer"],
    popularity: 90,
    related: ["generador-meta-tags", "previsualizador-serp", "densidad-keywords"]
  },
  {
    slug: "comparador-textos",
    category: "seo",
    name: "Comparador de textos / detector de plagio",
    shortDesc: "Detecta similitud entre dos textos: Jaccard + frases idénticas resaltadas.",
    longDesc:
      "Pegá dos textos (un original y uno sospechoso) y te mostramos: porcentaje de similitud Jaccard (con shingles de 5 palabras), cantidad de oraciones idénticas y resaltado visual de las frases en común. Útil para revisar plagio interno entre artículos, paráfrasis de IA débiles o duplicados en e-commerce.",
    keywords: ["detector plagio", "comparar textos", "similitud jaccard", "plagiarism check"],
    popularity: 87,
    related: ["analizador-meta", "densidad-keywords", "diff-checker"]
  },
  {
    slug: "whois-domain",
    category: "seo",
    name: "WHOIS Lookup",
    shortDesc: "Consulta el dueño, edad, expiración y DNS de cualquier dominio · vía RDAP.",
    longDesc:
      "Lookup gratis de información de dominios usando RDAP (sucesor moderno de WHOIS). Te mostramos: fecha de registro, fecha de expiración, registrar, estado del dominio y servidores DNS. Funciona con .com, .net, .org, .io, .mx, .es y la mayoría de TLDs.",
    keywords: ["whois lookup", "consulta whois", "rdap", "dueño dominio", "edad dominio"],
    popularity: 88,
    faqs: [
      { q: "¿Por qué usás RDAP en lugar de WHOIS?", a: "RDAP es el protocolo moderno (estándar IETF), devuelve JSON estructurado y soporta CORS. WHOIS clásico es texto sin estructura y bloquea consultas desde el navegador." }
    ],
    related: ["dns-lookup", "ssl-checker", "headers-checker", "seo-quick-audit"]
  },
  {
    slug: "dns-lookup",
    category: "seo",
    name: "DNS Lookup",
    shortDesc: "Consulta registros DNS A, AAAA, MX, TXT, NS, CNAME, SOA, CAA · vía Google DoH.",
    longDesc:
      "Lookup completo de registros DNS de cualquier dominio. Consultamos los 8 tipos de registros más usados via Google DNS-over-HTTPS (8.8.8.8) y te mostramos cada uno con su valor y TTL. Útil para validar configuración DNS, debug de email (MX, SPF, DKIM en TXT), o identificar el proveedor de hosting.",
    keywords: ["dns lookup", "consulta dns", "registros dns", "mx record", "txt record"],
    popularity: 87,
    related: ["whois-domain", "headers-checker", "seo-quick-audit"]
  },
  {
    slug: "headers-checker",
    category: "seo",
    name: "HTTP Headers Checker",
    shortDesc: "Inspecciona headers HTTP, redirects y headers de seguridad de cualquier URL.",
    longDesc:
      "Inspector profesional de respuesta HTTP. Hacemos un GET a tu URL y te mostramos: status code, latencia, cadena completa de redirects (301/302/307), todos los response headers, y un análisis de los 6 headers de seguridad clave (HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy). Útil para SEO, debug de redirects y auditorías de seguridad.",
    keywords: ["http headers checker", "inspector http", "redirect chain", "security headers"],
    popularity: 86,
    related: ["whois-domain", "dns-lookup", "seo-quick-audit", "analizador-meta"]
  },
  {
    slug: "seo-quick-audit",
    category: "seo",
    name: "SEO Quick Audit",
    shortDesc: "Análisis SEO instantáneo de cualquier URL · score 0-100 con checks críticos.",
    longDesc:
      "Audit SEO en segundos: te conectamos directamente al sitio, parseamos el HTML, y evaluamos 16 checks divididos en críticos (HTTPS, title, meta description, H1, viewport, canonical) y recomendados (lang, OG, Twitter, Schema, alt, H2, links internos, HSTS, CSP). Devolvemos un score 0-100 con detalle de cada check, link de status code, tiempo de respuesta y peso del HTML.",
    keywords: ["seo audit", "auditoria seo", "seo checker", "site audit", "on-page seo"],
    popularity: 92,
    faqs: [
      { q: "¿Es comparable con Ahrefs/SEMrush/Moz?", a: "No: esto cubre on-page SEO técnico básico. Para backlinks, autoridad de dominio o ranking de keywords se necesita una API paga (Ahrefs/Moz/SEMrush). Esta herramienta es un primer chequeo gratis honest." },
      { q: "¿Qué incluye exactamente?", a: "Title/description con longitudes, encabezados H1/H2, canonical, robots, viewport, lang, Open Graph completo, Twitter card, schema JSON-LD detectados, % de imágenes con alt, conteo de links internos vs externos, HTTPS, HSTS y CSP." }
    ],
    related: ["whois-domain", "dns-lookup", "headers-checker", "analizador-meta", "previsualizador-serp"]
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
