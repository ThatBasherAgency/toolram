/**
 * 28-sep-2026 · Bing Webmaster Tools (regla 118) marcaba 37 URLs con la meta
 * description demasiado corta (35-94 caracteres) y el sitemap tenía 74 bajo 120.
 * Aquí van descriptions escritas a mano (120-155 caracteres), una por URL, en el
 * idioma de cada página. Solo afectan al <meta name="description">; el texto
 * visible de cada página no cambia. Clave = ruta sin la barra inicial.
 * Las entradas de lib/seo-overrides.ts siguen teniendo prioridad.
 */
export const META_DESC: Record<string, string> = {
  // ---------- /en/<tool> ----------
  "en/contador-palabras": "Free word counter: count words, characters with and without spaces, sentences, paragraphs and reading time as you type. No signup, runs in your browser.",
  "en/contador-caracteres": "Count characters with and without spaces in real time. Check limits for X/Twitter (280), SMS (160), title tags and meta descriptions. Free, no signup.",
  "en/convertir-mayusculas": "Convert text to UPPERCASE, lowercase, Title Case, Sentence case, aLtErNaTiNg or InVeRsE in one click. Free online case converter, no signup needed.",
  "en/lorem-ipsum": "Generate Lorem Ipsum placeholder text by paragraphs, sentences or words. Copy it in one click for mockups, templates and layouts. Free, no signup.",
  "en/generador-passwords": "Generate strong passwords up to 64 characters with uppercase, lowercase, numbers and symbols. Created locally: your password never leaves the browser.",
  "en/generador-uuid": "Generate random UUID v4 identifiers for databases, APIs and unique keys. Create one or many at once and copy them with one click. Free, runs in-browser.",
  "en/generador-qr": "Free QR code generator for URLs, text, WiFi or vCard. Download a high-resolution PNG with no watermark and no registration. Made in your browser.",
  "en/json-formatter": "Validate, format and minify JSON online. Errors are shown with their exact line, large files are supported and nothing is uploaded: 100% local processing.",
  "en/base64-encode": "Encode text to Base64 or decode Base64 back to plain text instantly. Supports UTF-8, accents and emojis. Free, private and 100% client-side.",
  "en/url-encode": "Encode and decode URLs online: turn spaces, accents and symbols into percent-encoding, or decode an encoded URL back to readable text. Free, no signup.",
  "en/hash-md5-sha": "Calculate MD5, SHA-1, SHA-256 and SHA-512 hashes of any text for checksums and integrity checks. Runs in your browser with the Web Crypto API.",
  "en/cps-test": "Test your clicks per second (CPS) in 5, 10, 30, 60 or 100-second modes. Track your record and practice for Minecraft PvP or test a new mouse. Free.",
  "en/tiempo-reaccion": "Measure your reaction time in milliseconds: wait for the color change, click, and repeat 5 times for an average. The human average is 200-300 ms.",
  "en/cronometro": "Free online stopwatch with centisecond precision, laps, pause and reset. It keeps running when you switch tabs and needs no installation.",
  "en/ruleta-decision": "Add your options, spin the wheel and let chance decide. Use it for raffles, picking a restaurant, sorting teams or settling any dilemma. Free online.",
  "en/unir-pdf": "Merge several PDF files into one: drag to reorder and download the combined PDF. Your files never leave your browser. Free, no signup, no watermark.",
  "en/dividir-pdf": "Split a PDF or extract specific pages using ranges like 1-3, 5, 7-9 and download a new PDF with only those pages. Free and processed in your browser.",
  "en/rotar-pdf": "Rotate every page of a PDF by 90°, 180° or 270° and download the fixed file. Ideal for scans in the wrong orientation. Free, runs in your browser.",
  "en/marca-agua-pdf": "Add a diagonal text watermark such as CONFIDENTIAL or DRAFT to every page of a PDF. Adjust opacity, size and color. Free and processed locally.",
  "en/imagenes-a-pdf": "Convert JPG or PNG images into a single PDF: pick your files, reorder them and download one page per image. Free, no signup, done in your browser.",
  "en/calculadora-imc": "Calculate your Body Mass Index (BMI) from weight and height and see your category. A quick first guide: BMI does not tell muscle from fat. Free.",
  "en/calculadora-edad": "Calculate your exact age in years, months and days from your birth date, plus the total days, hours and minutes you have lived. Free online tool.",
  "en/firmar-pdf": "Sign a PDF online: draw your signature with mouse or finger, place it and download the signed file. No Adobe and no upload, it all runs in your browser.",
  "en/comprimir-pdf": "Compress a PDF to make it easier to email and share. Images are re-encoded and redundant data removed right in your browser. Free, no upload needed.",
  "en/pdf-a-jpg": "Convert each page of a PDF into a high-quality JPG image for slides, galleries or chats. Processed locally with pdf.js, so no file is uploaded. Free.",
  "en/quitar-fondo-imagen": "Remove the background from any photo with AI that runs in your browser. Works on products, portraits and logos, and your image is never uploaded. Free.",
  "en/comprimir-imagen": "Compress JPG, PNG or WebP images to cut file size while keeping visual quality. Faster websites and email-friendly files, processed in your browser.",
  "en/convertir-imagen": "Convert images between JPG, PNG, WebP and AVIF online. Lossless for PNG and WebP, controlled compression for JPG and AVIF. Done locally in your browser.",
  "en/redimensionar-imagen": "Resize JPG, PNG or WebP images to exact pixels or a percentage while keeping the aspect ratio. Free online image resizer, 100% client-side.",
  "en/youtube-thumbnail": "Download any YouTube video thumbnail in 5 sizes, from 120×90 up to 1280×720 (maxresdefault). Paste the video URL or ID. Free, no signup.",
  "en/wifi-qr": "Create a WiFi QR code with your network name, password and security type so phones connect by scanning it. Generated locally: the password stays private.",
  "en/escaner-qr": "Scan QR codes with your camera or from an uploaded image, in your browser. The image is never sent to a server, which matters for WiFi or vCard codes.",
  "en/lector-codigo-barras": "Read EAN, UPC, Code 128, QR and DataMatrix codes from your camera or an uploaded image. Decoding happens in your browser. Free barcode reader online.",
  "en/ocr-imagen-texto": "Extract text from images with OCR in 12+ languages, including English, Spanish and French. Powered by Tesseract.js in your browser: images stay private.",
  "en/texto-a-voz": "Turn text into speech with your device's built-in voices. Adjust speed, pitch and voice, with no upload, no API key and no quota. Free text to speech.",
  "en/voz-a-texto": "Transcribe your voice to text in real time in 12+ languages with the Web Speech API. Dictate notes or drafts and copy the result. Free, no signup.",
  "en/creador-backlinks": "Submit your URL to 40+ public SEO services (Wayback Machine, GTmetrix, BuiltWith and more) that publish indexable reports. Free, no signup needed.",
  "en/generador-meta-tags": "Generate ready-to-paste meta tags: title, meta description, canonical, Open Graph, Twitter Cards and robots. Fill in a simple form. Free SEO tool.",
  "en/previsualizador-serp": "Preview how your title, URL and meta description will look in Google on mobile and desktop, with character counts and truncation warnings. Free.",
  "en/densidad-keywords": "Analyze keyword density in any text or HTML: single words, bigrams and trigrams with frequencies and percentages. Optimize without keyword stuffing.",
  "en/analizador-meta": "Paste any HTML and get a 0-100 SEO score: title and description length, canonical, Open Graph, schema and headings, with a list of issues to fix.",
  "en/generador-robots": "Build a valid robots.txt with allow and disallow rules per user-agent (Googlebot, Bingbot, AI bots) plus your sitemap URL. Download it ready to use.",
  "en/generador-sitemap": "Generate a valid XML sitemap from a list of URLs, one per line, with lastmod, changefreq and priority. Up to 50,000 URLs per sitemap. Free online tool.",
  "en/generador-schema-faq": "Create FAQPage JSON-LD schema from your question and answer pairs and paste it into your page. Helps your FAQs qualify for rich results. Free.",
  "en/css-flex-generator": "Visual CSS Flexbox generator: set justify-content, align-items, direction and gap, see the layout live and copy the generated CSS in one click.",
  "en/css-grid-generator": "Visual CSS Grid generator: define columns, rows, gap and template areas, preview the layout in real time and copy production-ready CSS. Free.",
  "en/cubic-bezier-generator": "Design custom CSS easing curves by dragging the cubic-bezier handles, preview the animation live and copy the cubic-bezier() value for your transitions.",
  "en/color-palette": "Generate harmonic color palettes from one base color: monochromatic, analogous, complementary, triadic or tetradic. Copy HEX, RGB or HSL values.",
  "en/contraste-color-wcag": "Check the contrast ratio between two colors and see if it passes WCAG AA (4.5:1) and AAA (7:1) for normal and large text. Free accessibility tool.",
  "en/interes-compuesto": "Project how an investment grows with compound interest: initial sum, monthly contributions, annual rate and years, compounded annually, monthly or daily.",
  "en/salario-hora-anual": "Convert a salary between hourly, daily, weekly, monthly and annual figures. Useful for freelance rates, comparing job offers or planning a budget.",
  "en/que-es-md5": "MD5 is a hash function that turns any input into a 128-bit value (32 hex characters). Learn how it works, its uses and why it is no longer secure.",

  // ---------- /simbolos/<categoria> ----------
  "simbolos/corazones": "Copia y pega 25 símbolos de corazón (♥ ♡ ❤ ❣ 💕 💔) para tus mensajes, redes sociales y bio. Un clic para copiar cada uno, con su código Unicode.",
  "simbolos/estrellas": "Copia y pega 22 símbolos de estrella: blancas, negras, brillantes y de varias puntas (★ ☆ ✦ ✧ ✪ ⭐ ✨). Un clic para copiar, con su código Unicode.",
  "simbolos/flechas": "Copia y pega 27 símbolos de flecha: izquierda, derecha, arriba, abajo, dobles y curvas (← → ↑ ↓ ⇒ ↩ ➜). Un clic para copiar, con su código Unicode.",
  "simbolos/matematicos": "Copia y pega 30 símbolos matemáticos para fórmulas y ecuaciones: ∑ ∫ √ ∞ ≈ ≠ ≤ ≥ ± π y letras griegas. Un clic para copiar, con su código Unicode.",
  "simbolos/moneda": "Copia y pega 15 símbolos de moneda: dólar $, euro €, libra £, yen ¥, rupia ₹, bitcoin ₿, peso filipino ₱ y más. Un clic para copiar, con su Unicode.",
  "simbolos/musica": "Copia y pega los símbolos musicales Unicode: notas negra ♩, corchea ♪, semicorcheas ♫ ♬, bemol ♭, becuadro ♮ y sostenido ♯. Un clic para copiar.",
  "simbolos/check-cross": "Copia y pega símbolos de check y cruz (✓ ✔ ✗ ✘ ☑ ☒ ☐ ✅ ❌) para listas de tareas, formularios y documentos. Un clic para copiar, con su código Unicode.",
  "simbolos/lenny-faces": "Copia y pega Lenny faces y kaomoji clásicos: ( ͡° ͜ʖ ͡°), ಠ_ಠ, ʕ•ᴥ•ʔ, (╯°□°)╯︵ ┻━┻ y más caritas japonesas para chats y redes. Un clic para copiar.",

  // ---------- herramientas ES (la plantilla por categoría se quedaba corta) ----------
  "generador-titulos-seo": "Escribe una keyword y obtén 15 variantes de títulos SEO listas para tu artículo, landing o video. Copia la que más te guste. Gratis y sin registro.",
  "subnet-calculator": "Calculadora de subred IPv4 (CIDR): dirección de red, broadcast, máscara, wildcard, primer y último host y total de IPs del /1 al /32. Gratis, sin registro.",
  "mac-address-generator": "Genera direcciones MAC aleatorias con dos puntos, guiones o formato Cisco, con prefijo opcional de VMware, VirtualBox o QEMU. Para VMs y pruebas de red.",
  "caption-generator": "Genera captions para Instagram, TikTok, LinkedIn y X con hooks, preguntas de engagement y llamadas a la acción adaptadas a cada red. Gratis, sin registro.",

  // ---------- calculadoras ES ----------
  "calculadora-interes-compuesto": "Simula cuánto crecerá tu inversión con interés compuesto: capital inicial, aporte mensual, tasa anual y años. Resultado al instante, gratis y sin registro.",
  "calculadora-conversion-temperatura": "Convierte temperaturas de grados Celsius a Fahrenheit y Kelvin al instante. Útil para recetas, viajes, clima y ciencia. Gratis, en tu navegador.",
  "calculadora-velocidad-lectura": "Calcula cuánto se tarda en leer un texto según su número de palabras y la velocidad de lectura (225 palabras por minuto de media). Gratis y al instante.",
  "calculadora-fecha-diferencia": "Calcula la diferencia entre dos fechas en años, meses, semanas, días y horas. Ideal para plazos, aniversarios y proyectos. Gratis, sin registro.",
  "calculadora-bmi-pulgadas-libras": "Calcula tu IMC (BMI) con unidades imperiales: peso en libras y altura en pulgadas. Resultado y categoría al instante. Gratis, en tu navegador.",

  // ---------- alternativas ----------
  "alternativas-a-canva-pdf": "Alternativas a Canva PDF Editor en 2026: herramientas para editar, firmar y unir PDF, frente a Canva, que pide cuenta y procesa en sus servidores."
};

/** Devuelve la description curada para `key` o, si no hay, el fallback. */
export function metaDesc(key: string, fallback: string): string {
  return META_DESC[key] ?? fallback;
}
