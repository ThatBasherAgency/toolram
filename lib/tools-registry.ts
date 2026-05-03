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
  },
  {
    slug: "mi-ip",
    category: "developer",
    name: "Mi IP — ¿Cuál es mi dirección IP?",
    shortDesc: "Tu IP pública, ubicación aproximada, ISP, zona horaria y user-agent.",
    longDesc:
      "Detectamos tu dirección IP pública (IPv4 o IPv6) y te mostramos información asociada: país, región, ciudad, código postal, organización (ISP), ASN, zona horaria y mapa con tu ubicación aproximada. La precisión es a nivel ciudad/provincia, no calle.",
    keywords: ["mi ip", "cual es mi ip", "ip publica", "ip lookup", "what is my ip"],
    popularity: 95,
    related: ["dns-lookup", "whois-domain", "headers-checker"]
  },
  {
    slug: "generador-utm",
    category: "seo",
    name: "Generador UTM",
    shortDesc: "Constructor de URLs con parámetros UTM para Google Analytics y Meta Ads.",
    longDesc:
      "Crea URLs con UTM source/medium/campaign/term/content para trackear el origen exacto de cada visita en Google Analytics 4. Sugerencias rápidas para los valores estándar (google, facebook, cpc, social, email). URL final lista para copiar o probar.",
    keywords: ["utm builder", "generador utm", "utm parameter", "google analytics tracking"],
    popularity: 86,
    related: ["analizador-meta", "previsualizador-serp", "generador-meta-tags"]
  },
  {
    slug: "conversor-divisas",
    category: "converter",
    name: "Conversor de Divisas",
    shortDesc: "Tasas de cambio actualizadas diariamente · USD, EUR, MXN, ARS, CLP, COP, BRL +30.",
    longDesc:
      "Convertí entre 30+ monedas con tasas oficiales del Banco Central Europeo (vía Frankfurter API), actualizadas diariamente en días hábiles. Soporta peso mexicano, argentino, chileno, colombiano, peruano, real brasileño, dólar, euro, libra, yen y más. Las tasas son referenciales — para transacciones reales tu banco aplica un spread del 2-5%.",
    keywords: ["conversor divisas", "tipo de cambio", "currency converter", "dolar a peso", "euro a dolar"],
    popularity: 96,
    related: ["conversor-unidades", "calculadora-edad", "numero-a-letras"]
  },
  {
    slug: "numero-a-letras",
    category: "converter",
    name: "Número a Letras (en español)",
    shortDesc: "Convierte números a texto en español. Ideal para cheques, facturas, contratos.",
    longDesc:
      "Convertidor de números a letras en español con 5 formatos simultáneos: texto general, pesos mexicanos, pesos argentinos, dólares y euros, todos con el formato XX/100 estándar para documentos formales. Soporta hasta cientos de miles de millones, con decimales de centavos.",
    keywords: ["numero a letras", "numero en letras", "convertidor numero texto"],
    popularity: 89,
    related: ["conversor-divisas", "conversor-unidades", "contador-palabras"]
  },
  {
    slug: "calculadora-edad",
    category: "calculator",
    name: "Calculadora de Edad detallada",
    shortDesc: "Tu edad exacta en años, meses, días, horas y segundos · signo zodiacal incluido.",
    longDesc:
      "Calculadora completa de edad: ingresá tu fecha de nacimiento y obtené años + meses + días, además de tu edad expresada en meses totales, semanas, días, horas, minutos y segundos. Bonus: tu signo zodiacal occidental, signo del horóscopo chino, día de la semana en que naciste y cuántos días faltan para tu próximo cumpleaños.",
    keywords: ["calculadora edad", "edad exacta", "cumpleaños", "horoscopo edad"],
    popularity: 92,
    related: ["calculadoras", "numero-a-letras", "cronometro"]
  },
  {
    slug: "htaccess-generator",
    category: "developer",
    name: "Generador .htaccess",
    shortDesc: "Configura redirects 301, HTTPS, cache, gzip y seguridad para Apache.",
    longDesc:
      "Generador visual de archivo .htaccess para servidores Apache. Toggles para forzar HTTPS, canonical www/sin www, URLs limpias (quitar index.html), redirects 301 personalizados, compresión gzip, cache del navegador (mejora Core Web Vitals), bloqueo de archivos sensibles (.env, .git, wp-config.php), anti-hotlinking y páginas de error custom. Código copiable o descargable.",
    keywords: ["generador htaccess", "htaccess redirect", "apache config", "htaccess wordpress"],
    popularity: 84,
    related: ["generador-robots", "headers-checker", "seo-quick-audit", "json-formatter"]
  },
  {
    slug: "generador-hashtags",
    category: "ai",
    name: "Generador de Hashtags",
    shortDesc: "Hashtags para Instagram, TikTok, X y LinkedIn por categoría + variaciones.",
    longDesc:
      "Generador de hashtags por categoría (fitness, food, travel, fashion, beauty, tech, business, photography, pets, motivation, real estate, music) más variaciones automáticas de tu keyword propia. Ajustá la cantidad de 10 (LinkedIn) a 30 (Instagram máximo). Incluye recomendaciones por plataforma social.",
    keywords: ["generador hashtags", "hashtags instagram", "hashtags tiktok", "best hashtags"],
    popularity: 91,
    related: ["generador-titulos-seo", "prompt-builder", "plantillas-prompts"]
  },
  {
    slug: "password-strength",
    category: "developer",
    name: "Test de fuerza de contraseña",
    shortDesc: "Mide entropía, tiempo de crackeo y vulnerabilidades · 100% local.",
    longDesc:
      "Análisis completo de tu contraseña: entropía en bits, tiempo de crackeo asumiendo 10⁹ intentos/segundo (GPU moderna), score visual muy débil/débil/media/fuerte/muy fuerte y 10 checks específicos (longitud, mayúsculas, números, símbolos, no común, no secuencias, sin repeticiones). Detecta contraseñas comprometidas en listas públicas de filtraciones. Análisis 100% en tu navegador — la contraseña jamás se envía.",
    keywords: ["password strength", "fortaleza contraseña", "contraseña segura", "password tester"],
    popularity: 88,
    related: ["generador-passwords", "hash-md5-sha", "jwt-decoder"]
  },
  {
    slug: "calculadora-imc",
    category: "calculator",
    name: "Calculadora de IMC",
    shortDesc: "Índice de Masa Corporal + peso ideal + metabolismo basal (BMR).",
    longDesc:
      "Calcula tu IMC (Índice de Masa Corporal) en sistema métrico (kg/cm) o imperial (lb/in). Muestra categoría OMS (bajo peso, normal, sobrepeso, obesidad I/II/III), peso ideal según tu altura y metabolismo basal (BMR) usando la fórmula Mifflin-St Jeor según sexo y edad. Resultado al instante con consejos personalizados.",
    keywords: ["calculadora imc", "indice masa corporal", "bmi calculator", "peso ideal", "calcular bmr"],
    popularity: 96,
    faqs: [
      { q: "¿Qué es el IMC?", a: "El Índice de Masa Corporal relaciona peso y altura para evaluar si tu peso está en rango saludable. IMC = peso(kg) / altura(m)²." },
      { q: "¿Es fiable el IMC?", a: "Es una orientación general. No diferencia masa muscular de grasa. Atletas, embarazadas y adultos mayores requieren evaluaciones específicas." },
      { q: "¿Qué es el BMR?", a: "Metabolismo Basal: las calorías que tu cuerpo quema en reposo solo para funciones vitales. Sirve como base para calcular tus calorías diarias." }
    ],
    related: ["calculadora-edad", "calculadora-porcentaje", "conversor-unidades"]
  },
  {
    slug: "calculadora-porcentaje",
    category: "calculator",
    name: "Calculadora de Porcentaje",
    shortDesc: "4 modos: X% de Y, qué % es X de Y, variación porcentual y propina.",
    longDesc:
      "4 calculadoras en una: cuánto es X% de un número, qué porcentaje representa X sobre Y, variación porcentual entre dos valores (aumento o disminución) y cálculo de propina. Muestra fórmula y explicación al instante para que entiendas cómo se calculó.",
    keywords: ["calculadora porcentaje", "calcular %", "porcentaje online", "variación porcentual"],
    popularity: 95,
    related: ["calculadora-descuento", "calculadora-propina", "calculadora-iva"]
  },
  {
    slug: "calculadora-prestamo",
    category: "calculator",
    name: "Calculadora de Préstamo",
    shortDesc: "Cuota mensual, intereses totales y tabla de amortización francesa.",
    longDesc:
      "Calcula tu cuota mensual fija usando el sistema francés (el más común para hipotecas y préstamos personales). Muestra capital total a pagar, intereses, y tabla de amortización detallada por mes (capital + interés + saldo). Soporta múltiples monedas (USD, EUR, MX$, AR$, CLP$, S/, COL$).",
    keywords: ["calculadora prestamo", "calcular cuota mensual", "calculadora hipoteca", "amortización francesa", "loan calculator"],
    popularity: 94,
    faqs: [
      { q: "¿Qué es el sistema francés?", a: "Sistema de cuota fija donde la primera cuota tiene mayor proporción de interés y la última mayor proporción de capital. Es el más usado en préstamos personales e hipotecas." },
      { q: "¿Cómo se calcula la cuota?", a: "Fórmula: cuota = P × (r × (1+r)ⁿ) / ((1+r)ⁿ − 1), donde P = capital, r = tasa mensual, n = número de cuotas." },
      { q: "¿Por qué pagás tantos intereses?", a: "Porque el interés se calcula sobre el saldo restante. Al inicio el saldo es alto, entonces el interés es alto. Pagar cuotas extra al inicio reduce drásticamente el interés total." }
    ],
    related: ["calculadora-iva", "calculadora-porcentaje", "conversor-divisas"]
  },
  {
    slug: "calculadora-iva",
    category: "calculator",
    name: "Calculadora de IVA",
    shortDesc: "Sumar IVA o extraerlo del precio · Tasas para 8 países.",
    longDesc:
      "Calcula IVA en dos modos: sumar IVA al subtotal o extraer IVA del precio total con impuesto incluido. Tasas preconfiguradas para México (16%), España (21%), Argentina (21%), Chile (19%), Perú (18%), Colombia (19%), Uruguay (22%) y Ecuador (15%). Tasa personalizable de 0 a 30%.",
    keywords: ["calculadora iva", "calcular iva", "iva mexico", "iva españa", "vat calculator", "calcular impuestos"],
    popularity: 93,
    related: ["calculadora-descuento", "calculadora-prestamo", "conversor-divisas"]
  },
  {
    slug: "calculadora-propina",
    category: "calculator",
    name: "Calculadora de Propina",
    shortDesc: "Divide la cuenta entre amigos · Propina justa según servicio.",
    longDesc:
      "Calcula la propina sobre el total de la cuenta y divide automáticamente entre el número de personas. Presets de 10/12/15/18/20/25%. Muestra cuánto paga cada uno y cuánto es la propina por persona. Soporta múltiples monedas.",
    keywords: ["calculadora propina", "calcular propina", "tip calculator", "dividir cuenta"],
    popularity: 90,
    related: ["calculadora-descuento", "calculadora-porcentaje", "conversor-divisas"]
  },
  {
    slug: "calculadora-descuento",
    category: "calculator",
    name: "Calculadora de Descuento",
    shortDesc: "Precio final + descuento extra + impuestos · Cuánto ahorras.",
    longDesc:
      "Calcula el precio final tras aplicar un descuento principal, un descuento extra (cupón) y un impuesto. Muestra el ahorro total en moneda y el porcentaje de descuento real (los descuentos compuestos NO se suman). Útil para calcular ofertas reales en Black Friday, rebajas, hot sales.",
    keywords: ["calculadora descuento", "calcular descuento", "discount calculator", "ahorro", "rebaja"],
    popularity: 92,
    faqs: [
      { q: "¿50% + 20% es 70% de descuento?", a: "No. El segundo descuento se aplica sobre el precio ya rebajado. 50% + 20% = 60% real (no 70%)." },
      { q: "¿Cómo calculo el descuento real?", a: "((Precio original − Precio final) / Precio original) × 100. Esta calculadora lo hace automáticamente." }
    ],
    related: ["calculadora-iva", "calculadora-porcentaje", "calculadora-propina"]
  },
  {
    slug: "box-shadow-generator",
    category: "developer",
    name: "Box Shadow Generator (CSS)",
    shortDesc: "CSS box-shadow visual con multi-shadow + insets · 7 presets.",
    longDesc:
      "Generador visual de CSS box-shadow con múltiples sombras simultáneas, soporte para inset, control de offsetX, offsetY, blur, spread, color y opacidad. 7 presets profesionales (suave, card, material, neumorfo, glow, sunken, larga). Preview en vivo y código copiable al portapapeles.",
    keywords: ["box shadow generator", "css box shadow", "sombras css", "neumorfismo css"],
    popularity: 87,
    related: ["gradient-generator", "paleta-colores", "convertidor-color"]
  },
  {
    slug: "gradient-generator",
    category: "developer",
    name: "Generador de Gradientes CSS",
    shortDesc: "Gradientes lineales, radiales y cónicos · multi-color stops.",
    longDesc:
      "Editor visual de gradientes CSS con 3 tipos: lineal (con ángulo), radial (circular) y cónico (rotacional). Soporta múltiples color stops con posición personalizable. 10 presets curados (sunset, ocean, purple, rainbow, mint, pink, gold, dark, neon, fire). Generador aleatorio + código CSS copiable.",
    keywords: ["gradient generator", "gradiente css", "linear gradient", "radial gradient", "conic gradient"],
    popularity: 89,
    related: ["box-shadow-generator", "paleta-colores", "convertidor-color"]
  },
  {
    slug: "paleta-colores",
    category: "generator",
    name: "Generador de Paleta de Colores",
    shortDesc: "Paletas armónicas: monocromática, análoga, complementaria, triádica.",
    longDesc:
      "Genera paletas de 5 colores armónicas usando teoría del color: monocromática (mismo tono distinta luminosidad), análoga (tonos vecinos), complementaria (opuestos), triádica (3 equidistantes), tetrádica (4 equidistantes) o aleatoria. Bloquea colores que te gusten y regenera el resto. Atajo: barra espaciadora para generar nueva paleta.",
    keywords: ["paleta colores", "color palette generator", "paleta cromática", "armonía colores"],
    popularity: 91,
    faqs: [
      { q: "¿Qué es una paleta armónica?", a: "Combinación de colores que funcionan bien juntos según la teoría del color. Las paletas monocromática y análoga son seguras; la complementaria es alto contraste; triádica y tetrádica dan variedad." },
      { q: "¿Para qué sirve bloquear colores?", a: "Para mantener un color que te guste mientras experimentas con el resto. Click en el candado del color y regenera la paleta." }
    ],
    related: ["gradient-generator", "convertidor-color", "favicon-generator"]
  },
  {
    slug: "numeros-romanos",
    category: "converter",
    name: "Convertidor de Números Romanos",
    shortDesc: "Convierte de número arábigo a romano y viceversa (1 a 3999).",
    longDesc:
      "Convertidor bidireccional entre números arábigos (1, 2, 3...) y romanos (I, II, III...). Rango soportado: 1 a 3999. Validación de romanos correctos según las reglas clásicas (sustracción IV/IX, máximo 3 repeticiones consecutivas, V/L/D no se repiten). Tabla de símbolos básicos incluida.",
    keywords: ["numeros romanos", "convertidor romanos", "roman numerals", "decimal a romano"],
    popularity: 84,
    related: ["binario-decimal", "calculadora-cientifica", "conversor-unidades"]
  },
  {
    slug: "binario-decimal",
    category: "converter",
    name: "Conversor Binario / Hex / Decimal",
    shortDesc: "Convierte entre binario, octal, decimal y hexadecimal + ASCII.",
    longDesc:
      "Convertidor instantáneo entre las 4 bases numéricas más usadas: binario (base 2), octal (base 8), decimal (base 10) y hexadecimal (base 16). Muestra representación binaria con bits coloreados y carácter ASCII si está en rango imprimible (32-126). Útil para programación, electrónica y permisos Unix.",
    keywords: ["binario a decimal", "decimal a binario", "hex a decimal", "binary converter", "ascii converter"],
    popularity: 86,
    related: ["numeros-romanos", "calculadora-cientifica", "hash-md5-sha"]
  },
  {
    slug: "pomodoro",
    category: "test",
    name: "Temporizador Pomodoro",
    shortDesc: "Técnica Pomodoro: 25 min trabajo + pausas · Sonido al terminar.",
    longDesc:
      "Temporizador Pomodoro con ciclos de 25 minutos de trabajo + 5 minutos de pausa corta. Cada 4 pomodoros completados se activa una pausa larga de 15 minutos. Duraciones personalizables. Sonido al terminar (oscilador Web Audio, no requiere archivos), contador de pomodoros completados, controles play/pause/reset/skip. Ideal para estudiar, programar, escribir.",
    keywords: ["pomodoro timer", "técnica pomodoro", "temporizador estudio", "productividad timer"],
    popularity: 90,
    related: ["temporizador", "cronometro", "tiempo-reaccion"]
  },
  {
    slug: "calculadora-cientifica",
    category: "calculator",
    name: "Calculadora Científica",
    shortDesc: "Trigonometría, log, potencias, raíces, factoriales, π y e.",
    longDesc:
      "Calculadora científica completa: funciones trigonométricas (sin, cos, tan e inversas) con DEG/RAD, logaritmos (ln natural, log base 10), potencias (x², x³, xʸ), raíces (cuadrada y cúbica), factorial (!), constantes π y e, memoria Ans para reutilizar el último resultado. Soporta paréntesis anidados.",
    keywords: ["calculadora cientifica", "scientific calculator", "trigonometria online", "calcular logaritmo"],
    popularity: 87,
    related: ["calculadora-porcentaje", "binario-decimal", "numeros-romanos"]
  },
  {
    slug: "markdown-html",
    category: "developer",
    name: "Markdown ↔ HTML",
    shortDesc: "Conversor bidireccional Markdown a HTML con preview en vivo.",
    longDesc:
      "Convierte Markdown a HTML y viceversa con preview renderizado en vivo. Soporta headings (H1-H6), negrita, cursiva, links, imágenes, listas (ordenadas y no), bloques de código con language hint, código inline, citas (blockquotes), separadores. Útil para escribir docs, README, blogposts.",
    keywords: ["markdown to html", "html to markdown", "markdown converter", "md a html"],
    popularity: 85,
    related: ["css-formatter", "json-formatter", "yaml-json-converter"]
  },
  {
    slug: "favicon-generator",
    category: "generator",
    name: "Generador de Favicon",
    shortDesc: "Crea favicons en 16, 32, 64, 128, 256 y 512px desde texto o imagen.",
    longDesc:
      "Generador de favicon en todos los tamaños estándar (16x16 hasta 512x512 PNG). Modo texto (1-2 letras con 4 fuentes) o subir imagen propia. Forma rounded, circle, square o squircle. Color de fondo y texto personalizables. Preview en vivo. Descarga directa al navegador.",
    keywords: ["favicon generator", "generador favicon", "favicon online", "icono web"],
    popularity: 88,
    related: ["paleta-colores", "convertidor-color", "generador-qr"]
  },
  {
    slug: "creador-backlinks",
    category: "seo",
    name: "Creador de Backlinks Gratis",
    shortDesc: "Envía tu URL a 40+ servicios SEO públicos · Backlinks legítimos gratis.",
    longDesc:
      "Backlink Maker que envía tu URL a 40+ herramientas SEO públicas (Wayback Machine, Google PageSpeed, GTmetrix, BuiltWith, Ahrefs, Similarweb, WhoIs, schema validators, sociales y más). Estos servicios al consultar tu sitio generan reportes públicos indexables = backlinks reales y legítimos. Filtros por categoría: SEO, velocidad, cache, schema, social, seguridad. Track de servicios ya enviados. NO es spam — son consultas reales que diagnostican tu sitio Y dejan trace público.",
    keywords: ["creador backlinks gratis", "backlink maker", "crear backlinks", "backlinks gratuitos", "submit url seo tools"],
    popularity: 99,
    faqs: [
      { q: "¿Es legal y seguro?", a: "100% legal. Solo envía tu URL a herramientas públicas que cualquiera puede consultar. No genera links artificiales — son reportes reales que aparecen en los resultados de búsqueda." },
      { q: "¿Cuántos backlinks reales obtengo?", a: "Variable. No todos los reportes terminan indexados por Google, pero típicamente 30-60% sí. Es un suplemento a tu estrategia SEO, no reemplazo." },
      { q: "¿Penaliza Google?", a: "No, porque son consultas naturales a herramientas públicas. Distinto a paquetes de 'comprar backlinks' que sí pueden penalizar." }
    ],
    related: ["headers-checker", "seo-quick-audit", "whois-domain", "anchor-text"]
  },
  {
    slug: "test-velocidad-web",
    category: "seo",
    name: "Test de Velocidad de Sitio Web",
    shortDesc: "Mide TTFB y tiempo total de carga · Diagnóstico desde Edge.",
    longDesc:
      "Mide la velocidad de carga de cualquier sitio web desde un edge server: TTFB (Time To First Byte), tiempo total de descarga del HTML, status code y tamaño del documento. Categoriza performance (excelente/aceptable/lento) según benchmarks Google. Para análisis completo de Core Web Vitals incluye link directo a PageSpeed Insights.",
    keywords: ["test velocidad web", "speed test website", "medir velocidad sitio", "ttfb checker", "page speed test"],
    popularity: 94,
    related: ["headers-checker", "seo-quick-audit", "creador-backlinks"]
  },
  {
    slug: "citas-apa",
    category: "generator",
    name: "Generador de Citas APA · MLA · Chicago",
    shortDesc: "Crea referencias bibliográficas APA 7, MLA 9, Chicago, Harvard.",
    longDesc:
      "Generador de citas académicas en 4 estilos (APA 7ma edición, MLA 9, Chicago, Harvard) para 3 tipos de fuente: páginas web, libros y artículos de revista. Genera la referencia con formato exacto incluyendo autor, año, título, editor, ciudad, volumen, número, páginas y URL según corresponda. Ideal para tesis, ensayos universitarios y trabajos de investigación.",
    keywords: ["generador citas apa", "citas mla", "bibliografía online", "citation generator", "referencias bibliográficas"],
    popularity: 92,
    related: ["contador-palabras", "markdown-html", "plantillas-prompts"]
  },
  {
    slug: "buscar-rimas",
    category: "text",
    name: "Buscador de Rimas en Español",
    shortDesc: "Encuentra rimas consonantes y asonantes para canciones, poemas, raps.",
    longDesc:
      "Buscador de rimas en español con diccionario de 200+ palabras comunes. Modo consonante (rima perfecta donde coinciden vocales y consonantes) o asonante (solo coinciden vocales). Útil para escribir canciones, hip-hop, poesía, jingles publicitarios y discursos.",
    keywords: ["buscar rimas", "rimas español", "rhymes spanish", "rimas consonantes", "rimas asonantes"],
    popularity: 89,
    related: ["contador-palabras", "texto-invertido", "generador-anagrama"]
  },
  {
    slug: "generador-username",
    category: "generator",
    name: "Generador de Usernames",
    shortDesc: "Nombres únicos para Instagram, TikTok, Twitch, Discord, gaming.",
    longDesc:
      "Generador de nombres de usuario en 8 estilos diferentes: gaming (con números), aesthetic (con puntos), pro (CamelCase), underscore, X theme, 1337 (leet speak), uppercase, con números. Soporta nombre base personalizado o genera variedad aleatoria. Verifica disponibilidad en namechk.com antes de elegir.",
    keywords: ["generador username", "nombres de usuario", "username generator", "nick gaming", "nombres instagram"],
    popularity: 91,
    related: ["generador-nombres", "generador-passwords", "generador-anagrama"]
  },
  {
    slug: "slug-generator",
    category: "seo",
    name: "Generador de Slug URL",
    shortDesc: "Convierte títulos en URLs amigables para SEO sin acentos ni stopwords.",
    longDesc:
      "Convierte cualquier título o frase en un slug URL optimizado para SEO: quita acentos, ñ, símbolos, normaliza separador (guión, underscore, punto), opcionalmente elimina stopwords (el, la, de, y, etc) y respeta largo máximo (20-120 chars). Genera URLs limpias, legibles y SEO-friendly al estilo de Yoast.",
    keywords: ["slug generator", "url slug", "permalink generator", "url amigable", "seo url"],
    popularity: 87,
    related: ["generador-meta-tags", "previsualizador-serp", "creador-backlinks"]
  },
  {
    slug: "youtube-thumbnail",
    category: "image",
    name: "Descargar Miniatura de YouTube",
    shortDesc: "Descarga thumbnails de cualquier video de YouTube en 5 calidades.",
    longDesc:
      "Extrae el ID de cualquier URL de YouTube (videos normales y Shorts) y descarga la miniatura oficial en 5 calidades: maxres (1920x1080), HQ (480x360), MQ (320x180), SD (640x480) y default (120x90). Descarga directa desde el CDN oficial de YouTube (i.ytimg.com). Útil para análisis de competencia, materiales educativos, blog posts.",
    keywords: ["descargar miniatura youtube", "youtube thumbnail downloader", "thumbnail yt", "miniatura video"],
    popularity: 95,
    related: ["redimensionar-imagen", "comprimir-imagen", "convertir-imagen"]
  },
  {
    slug: "json-csv",
    category: "developer",
    name: "Conversor JSON ↔ CSV",
    shortDesc: "Convierte JSON a CSV y viceversa · Detección automática de tipos.",
    longDesc:
      "Conversor bidireccional JSON a CSV y CSV a JSON con detección automática de tipos (números, booleans, null). Soporta arrays de objetos, separadores múltiples (coma, punto y coma, tab, pipe), escapado de comillas y comas en campos. Útil para migrar datos entre sistemas, exportar APIs a Excel, importar exportaciones de WooCommerce/Shopify.",
    keywords: ["json to csv", "csv to json", "conversor json csv", "json csv converter"],
    popularity: 90,
    related: ["json-formatter", "yaml-json-converter", "html-formatter"]
  },
  {
    slug: "html-formatter",
    category: "developer",
    name: "HTML Beautifier / Minifier",
    shortDesc: "Formatea HTML legible o minifícalo para producción.",
    longDesc:
      "HTML beautifier y minifier en una herramienta. Beautify formatea con indentación personalizable (2/4 espacios o tab), respeta tags inline (a, span, em, strong) y muestra el HTML legible. Minify quita espacios, comentarios y saltos de línea reduciendo 20-40% del tamaño. Stats en vivo de % de reducción.",
    keywords: ["html formatter", "html beautifier", "html minifier", "formatear html", "minificar html"],
    popularity: 86,
    related: ["css-formatter", "js-formatter", "json-formatter"]
  },
  {
    slug: "js-formatter",
    category: "developer",
    name: "JavaScript Beautifier / Minifier",
    shortDesc: "Formatea o comprime código JavaScript respetando strings y comentarios.",
    longDesc:
      "JavaScript beautifier y minifier que respeta strings, comentarios, template literals y operadores. Beautify añade indentación coherente con saltos de línea. Minify quita espacios y comentarios. Para builds reales se recomienda esbuild/terser/swc, pero esta herramienta es útil para code review, debugging y archivos sueltos.",
    keywords: ["js beautifier", "javascript minifier", "js formatter", "formatear javascript"],
    popularity: 85,
    related: ["html-formatter", "css-formatter", "json-formatter"]
  },
  {
    slug: "validador-email",
    category: "developer",
    name: "Validador de Email + MX",
    shortDesc: "Verifica formato, dominio, MX records y detecta emails desechables.",
    longDesc:
      "Validador completo de email: formato RFC válido, parte local (≤64 chars), dominio (≤253 chars), detección de emails desechables (mailinator, 10minutemail, etc), corrección de typos comunes (gmial.com → gmail.com) y verificación de MX records vía DNS-over-HTTPS. Score 0-5. Útil antes de campañas de email marketing para reducir bounce rate.",
    keywords: ["validador email", "verificar email", "email validator", "mx record check", "email checker"],
    popularity: 88,
    related: ["dns-lookup", "whois-domain", "headers-checker"]
  },
  {
    slug: "texto-a-voz",
    category: "ai",
    name: "Texto a Voz Online (Text to Speech)",
    shortDesc: "Convierte texto en audio con voces nativas · 40+ idiomas · Sin límite.",
    longDesc:
      "Text-to-speech 100% gratis usando la Web Speech API nativa del navegador. Más de 40 idiomas y 100+ voces (depende del sistema). Control de velocidad (0.5x - 2x), tono y volumen. No requiere instalación ni conexión externa. Para audiolibros, accesibilidad, aprender pronunciación de idiomas.",
    keywords: ["texto a voz", "text to speech", "lector de texto", "tts español", "voz artificial"],
    popularity: 93,
    related: ["voz-a-texto", "contador-palabras", "ocr-imagen-texto"]
  },
  {
    slug: "voz-a-texto",
    category: "ai",
    name: "Voz a Texto (Speech to Text)",
    shortDesc: "Dicta y convierte tu voz a texto en tiempo real · 12 idiomas.",
    longDesc:
      "Speech-to-text gratis con la Web Speech API. Reconocimiento continuo en tiempo real con resultados intermedios visibles. 12 idiomas pre-configurados (español MX/AR/CO/ES/CL/PE, inglés US/UK, portugués, francés, italiano, alemán). Útil para tomar notas, transcribir entrevistas, dictar emails. Funciona en Chrome, Edge y Safari.",
    keywords: ["voz a texto", "speech to text", "dictado voz", "transcribir audio", "reconocimiento voz"],
    popularity: 91,
    related: ["texto-a-voz", "ocr-imagen-texto", "contador-palabras"]
  },
  {
    slug: "rotar-imagen",
    category: "image",
    name: "Rotar y Voltear Imagen",
    shortDesc: "Rotación 90/180/270° + flip horizontal y vertical · Sin servidor.",
    longDesc:
      "Rotador y volteador de imágenes 100% client-side con Canvas API. Rotación en pasos de 90° y flip horizontal/vertical. Soporta JPG, PNG, WebP. Descarga en JPG (calidad 92%) o PNG (lossless). Útil para fotos del celular sin EXIF rotation, selfies invertidos, documentos escaneados.",
    keywords: ["rotar imagen", "voltear imagen", "rotate image online", "flip image", "girar foto"],
    popularity: 89,
    related: ["redimensionar-imagen", "recortar-imagen", "filtros-imagen"]
  },
  {
    slug: "filtros-imagen",
    category: "image",
    name: "Filtros de Imagen Online",
    shortDesc: "10 presets (B&N, sepia, vintage, polaroid) + ajustes manuales.",
    longDesc:
      "Editor de filtros de imagen con 10 presets profesionales: Original, B&N, Sepia, Vintage, Polaroid, Frío, Cálido, Drama, Dreamy, Negativo. Ajustes manuales de brillo, contraste, saturación, gris, sepia, blur, hue rotation e invertir. Procesado 100% en navegador con Canvas API. Descarga en JPG calidad alta.",
    keywords: ["filtros imagen online", "image filters", "blanco y negro foto", "sepia filter", "polaroid effect"],
    popularity: 87,
    related: ["recortar-imagen", "rotar-imagen", "marca-agua-imagen"]
  },
  {
    slug: "generador-nombres",
    category: "generator",
    name: "Generador de Nombres LATAM",
    shortDesc: "Nombres y apellidos hispanos aleatorios para personajes y datos demo.",
    longDesc:
      "Generador de nombres y apellidos hispanos con 80 nombres (40 masculinos + 40 femeninos) y 50 apellidos comunes en LATAM y España. Opciones: género (masculino/femenino/cualquiera), cantidad (1-50), segundo nombre, título profesional (Lic., Ing., Dr., etc). Útil para personajes de novela, NPCs en juegos, datos demo en bases de prueba.",
    keywords: ["generador nombres", "nombres aleatorios", "name generator spanish", "nombres latam", "apellidos hispanos"],
    popularity: 84,
    related: ["generador-username", "numero-aleatorio", "ruleta-decision"]
  },
  {
    slug: "generador-anagrama",
    category: "text",
    name: "Generador de Anagramas",
    shortDesc: "Reordena las letras de una palabra para encontrar todas las combinaciones.",
    longDesc:
      "Generador de anagramas: reordena las letras de una palabra para formar todas las permutaciones posibles. Hasta 7 letras muestra TODAS las permutaciones (max 5,040). Más de 7 letras muestra 50 combinaciones aleatorias (porque 8! = 40,320 y crece exponencial). Útil para crucigramas, juegos de palabras, encontrar nombres únicos.",
    keywords: ["generador anagramas", "anagrama español", "anagram generator", "reordenar letras"],
    popularity: 82,
    related: ["buscar-rimas", "contador-palabras", "generador-username"]
  },
  {
    slug: "generador-logo-texto",
    category: "generator",
    name: "Generador de Logo de Texto",
    shortDesc: "Crea logos tipográficos en 6 estilos · Descarga PNG transparente.",
    longDesc:
      "Generador de logos basados en texto con 6 estilos: solid, gradient, outline, shadow, neon, retro. 6 fuentes (bold sans, serif, mono, italic, light, black), 2 colores personalizables, tamaño 40-200px, fondo personalizado o transparente. Descarga PNG en alta resolución (1200x400). Ideal para wordmarks de marca personal, logos rápidos, headers de redes sociales.",
    keywords: ["logo texto", "text logo maker", "wordmark generator", "crear logo gratis"],
    popularity: 90,
    related: ["favicon-generator", "paleta-colores", "gradient-generator"]
  },
  {
    slug: "anchor-text",
    category: "seo",
    name: "Generador de Anchor Text SEO",
    shortDesc: "Variaciones naturales para link building · Mix exact + branded + generic.",
    longDesc:
      "Genera 21 variaciones de anchor text para link building seguro: exact match (con advertencia de riesgo), phrase match (mejor X, X gratis, X 2026), branded, naked URL, generic (click acá, leer más), LSI, long-tail, preguntas. Indica peso recomendado (alto/medio/bajo). Distribución natural sugerida: 40-50% branded, 25-30% generic, 15-20% phrase, ≤10% exact match.",
    keywords: ["anchor text generator", "generador anchor text", "link building anchors", "anchor text seo"],
    popularity: 86,
    related: ["creador-backlinks", "slug-generator", "generador-meta-tags"]
  },
  {
    slug: "whatsapp-link",
    category: "generator",
    name: "Generador de Link WhatsApp (wa.me)",
    shortDesc: "Crea wa.me con mensaje precargado · Botón HTML + QR · Sin guardar contacto.",
    longDesc:
      "Generador de links wa.me para WhatsApp con mensaje precargado. Soporta 18 países LATAM + España + USA. Genera 3 outputs: link directo wa.me, código HTML del botón verde oficial listo para pegar en tu web, y QR descargable (vía api.qrserver.com). Click-to-chat sin necesidad de guardar el número. Ideal para landing pages, bio de Instagram/TikTok, email signature, flyers con QR.",
    keywords: ["link whatsapp", "wa.me generator", "boton whatsapp web", "click to chat", "qr whatsapp"],
    popularity: 96,
    faqs: [
      { q: "¿Funciona sin guardar el contacto?", a: "Sí, ese es el principal beneficio de wa.me. El visitante hace click y se abre WhatsApp con la conversación lista, sin agregar tu número a sus contactos." },
      { q: "¿Puedo poner el botón en mi web?", a: "Sí. Copiá el código HTML que generamos y pegalo donde quieras. Es un anchor con SVG inline, sin dependencias." }
    ],
    related: ["generador-qr", "generador-utm", "favicon-generator"]
  },
  {
    slug: "ocr-imagen-texto",
    category: "ai",
    name: "OCR · Imagen a Texto",
    shortDesc: "Extrae texto de fotos, capturas y documentos escaneados · 6 idiomas.",
    longDesc:
      "OCR (Optical Character Recognition) usando Tesseract.js que corre 100% en tu navegador (la imagen NUNCA se sube a un servidor). Soporta español, inglés, portugués, francés, italiano y alemán. Primera vez tarda ~10s en cargar el modelo (~3MB), después es instantáneo. Útil para extraer texto de capturas de pantalla, fotos de pizarrón, documentos físicos escaneados, libros antiguos.",
    keywords: ["ocr español", "imagen a texto", "extraer texto imagen", "ocr online", "image to text"],
    popularity: 92,
    faqs: [
      { q: "¿Es gratis?", a: "100% gratis. Tesseract.js es open source. No hay límite de imágenes." },
      { q: "¿Sube mi imagen a algún servidor?", a: "No. Todo el reconocimiento se hace en tu navegador con WebAssembly. Tu imagen nunca sale de tu computadora." }
    ],
    related: ["voz-a-texto", "texto-a-voz", "rotar-imagen"]
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
