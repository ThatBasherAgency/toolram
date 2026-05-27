export type Locale = "es" | "en";
export const LOCALES: Locale[] = ["es", "en"];
export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_LABEL: Record<Locale, string> = {
  es: "Español",
  en: "English"
};

export const LOCALE_FLAG: Record<Locale, string> = {
  es: "🇲🇽",
  en: "🇺🇸"
};

export const LOCALE_HREFLANG: Record<Locale, string[]> = {
  es: ["es", "es-MX", "es-ES", "es-AR", "es-CO", "es-CL", "es-PE"],
  en: ["en", "en-US", "en-GB", "en-IN", "en-PH", "en-CA", "en-AU"]
};

export function pathFor(locale: Locale, slug: string = ""): string {
  const clean = slug.startsWith("/") ? slug.slice(1) : slug;
  if (locale === "en") return clean ? `/en/${clean}` : "/en";
  return clean ? `/${clean}` : "/";
}

// Translation strings — UI chrome (header, footer, common buttons)
export const T: Record<Locale, Record<string, string>> = {
  es: {
    // navigation
    "nav.all": "Todas",
    "nav.symbols": "Símbolos",
    "nav.fancyText": "Texto decorado",
    "nav.calculators": "Calculadoras",
    "nav.glossary": "Glosario",
    "nav.alternatives": "Alternativas",
    "nav.search": "Buscar",
    "nav.toolsAll": "Todas las herramientas",
    "nav.about": "Sobre",
    "nav.author": "Autor",
    "nav.privacy": "Privacidad",
    "nav.contact": "Contacto",
    "nav.github": "GitHub",
    "nav.topTools": "Top herramientas",
    "nav.categories": "Categorías",
    "nav.resources": "Recursos",
    "nav.site": "Sitio",
    // home
    "home.heroBadge": "{count}+ herramientas gratis",
    "home.heroTitle1": "Herramientas online que realmente",
    "home.heroTitle2": "funcionan",
    "home.heroSubtitle": "PDF, SEO, IA, símbolos, contadores, conversores. Todo gratis, sin registro y procesado en tu navegador cuando es posible.",
    "home.searchPlaceholder": "Buscar herramienta… (ej: PDF a Word, contador, QR)",
    "home.popular": "Más populares",
    "home.viewAll": "Ver todas",
    "home.private": "100% privado",
    "home.privateDesc": "La mayoría de tools procesa tus datos en tu navegador. Tus archivos nunca se suben a nuestros servidores.",
    "home.fast": "Súper rápido",
    "home.fastDesc": "Sin esperar uploads. Resultados instantáneos. Funciona offline en muchas herramientas.",
    "home.noAds": "Sin registro, sin ads invasivos",
    "home.noAdsDesc": "Empezá a usar cualquier tool al instante. No te pedimos email ni te llenamos de pop-ups.",
    "home.allCategories": "Todas las categorías",
    // tool page
    "tool.usefulFor": "Por qué usar Toolram",
    "tool.privatePoint": "🔒 100% privado",
    "tool.privateDesc": "Tus datos nunca salen de tu navegador.",
    "tool.fastPoint": "⚡ Sin esperas",
    "tool.fastDesc": "Resultados instantáneos, sin uploads.",
    "tool.mobilePoint": "📱 Funciona en móvil",
    "tool.mobileDesc": "Diseño responsive optimizado.",
    "tool.freePoint": "🎁 Gratis para siempre",
    "tool.freeDesc": "Sin registro, sin marca de agua.",
    "tool.faqs": "Preguntas frecuentes",
    "tool.related": "Herramientas relacionadas",
    "tool.about": "Sobre {name}",
    "tool.home": "Inicio",
    // glossary
    "gloss.shortAnswer": "Respuesta corta:",
    "gloss.detail": "Explicación detallada",
    "gloss.example": "Ejemplo",
    "gloss.useCases": "Casos de uso comunes",
    "gloss.faqs": "Preguntas frecuentes",
    "gloss.related": "Artículos y herramientas relacionadas"
  },
  en: {
    "nav.all": "All",
    "nav.symbols": "Symbols",
    "nav.fancyText": "Fancy text",
    "nav.calculators": "Calculators",
    "nav.glossary": "Glossary",
    "nav.alternatives": "Alternatives",
    "nav.search": "Search",
    "nav.toolsAll": "All tools",
    "nav.about": "About",
    "nav.author": "Author",
    "nav.privacy": "Privacy",
    "nav.contact": "Contact",
    "nav.github": "GitHub",
    "nav.topTools": "Top tools",
    "nav.categories": "Categories",
    "nav.resources": "Resources",
    "nav.site": "Site",
    "home.heroBadge": "{count}+ free tools",
    "home.heroTitle1": "Online tools that actually",
    "home.heroTitle2": "work",
    "home.heroSubtitle": "PDF, SEO, AI, symbols, counters, converters. All free, no registration, processed in your browser when possible.",
    "home.searchPlaceholder": "Search tools… (e.g. PDF to Word, counter, QR)",
    "home.popular": "Most popular",
    "home.viewAll": "View all",
    "home.private": "100% private",
    "home.privateDesc": "Most tools process your data in your browser. Your files are never uploaded to our servers.",
    "home.fast": "Lightning fast",
    "home.fastDesc": "No waiting for uploads. Instant results. Many tools work offline.",
    "home.noAds": "No registration, no intrusive ads",
    "home.noAdsDesc": "Start using any tool instantly. No email required, no pop-ups.",
    "home.allCategories": "All categories",
    "tool.usefulFor": "Why use Toolram",
    "tool.privatePoint": "🔒 100% private",
    "tool.privateDesc": "Your data never leaves your browser.",
    "tool.fastPoint": "⚡ No waiting",
    "tool.fastDesc": "Instant results, no uploads.",
    "tool.mobilePoint": "📱 Works on mobile",
    "tool.mobileDesc": "Optimized responsive design.",
    "tool.freePoint": "🎁 Forever free",
    "tool.freeDesc": "No signup, no watermark.",
    "tool.faqs": "Frequently asked questions",
    "tool.related": "Related tools",
    "tool.about": "About {name}",
    "tool.home": "Home",
    "gloss.shortAnswer": "Short answer:",
    "gloss.detail": "Detailed explanation",
    "gloss.example": "Example",
    "gloss.useCases": "Common use cases",
    "gloss.faqs": "Frequently asked questions",
    "gloss.related": "Related articles and tools"
  }
};

export function t(locale: Locale, key: string, vars?: Record<string, string | number>): string {
  let s = T[locale][key] ?? T.es[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(`{${k}}`, String(v));
    }
  }
  return s;
}

// Tool translations (key tools to English)
export const TOOL_EN: Record<string, { name: string; shortDesc: string; longDesc: string; faqs?: { q: string; a: string }[] }> = {
  "contador-palabras": {
    name: "Word counter",
    shortDesc: "Count words, characters, paragraphs and reading time in real-time.",
    longDesc: "Paste or type your text and instantly get word count, character count (with and without spaces), paragraph count, sentence count and estimated reading time. Perfect for articles, essays, social media posts and emails.",
    faqs: [
      { q: "How does the word counter work?", a: "It processes text in your browser in real-time. Your data never leaves your computer." },
      { q: "Does it count characters with spaces?", a: "Yes, it shows both: characters with spaces and without." },
      { q: "Is there a length limit?", a: "No. You can paste long texts without restrictions." }
    ]
  },
  "contador-caracteres": {
    name: "Character counter",
    shortDesc: "Count characters with and without spaces for Twitter, SEO, SMS limits.",
    longDesc: "Useful for respecting Twitter/X (280), meta description (155), title tag (60), SMS (160) or any field with a character limit. Real-time counting.",
    faqs: []
  },
  "convertir-mayusculas": {
    name: "Case converter",
    shortDesc: "Convert text to UPPERCASE, lowercase, Title Case or aLtErNaTiNg.",
    longDesc: "Transform your text between 6 formats: UPPERCASE, lowercase, Title Case, Sentence case, aLtErNaTiNg (sarcastic) and InVeRsE. Perfect for titles, normalizing data or creating ironic text.",
    faqs: []
  },
  "lorem-ipsum": {
    name: "Lorem Ipsum generator",
    shortDesc: "Generate custom Lorem Ipsum placeholder text.",
    longDesc: "Create test text in Lorem Ipsum format. Choose paragraphs, words or sentences. Ideal for mockups, web templates and design layouts.",
    faqs: []
  },
  "generador-passwords": {
    name: "Password generator",
    shortDesc: "Generate secure passwords up to 64 characters in one click.",
    longDesc: "Generate strong passwords with uppercase, lowercase, numbers and symbols. Configure length, exclude ambiguous characters (0/O, l/1) and copy with one click. Everything runs locally — no password ever leaves your browser.",
    faqs: [
      { q: "Are passwords stored on any server?", a: "No. Generation happens 100% in your browser using the Web Crypto API." },
      { q: "How secure is a 16-character password?", a: "A random 16-character password with symbols requires thousands of years of compute to brute-force." }
    ]
  },
  "generador-uuid": {
    name: "UUID generator",
    shortDesc: "Generate Universally Unique Identifiers (UUID v4) instantly.",
    longDesc: "Create version 4 (random) UUIDs ready for databases, APIs or unique keys. Generate one or many, copy with one click.",
    faqs: []
  },
  "generador-qr": {
    name: "QR code generator",
    shortDesc: "Create QR codes for URLs, text, WiFi or vCard. Download PNG.",
    longDesc: "Free online QR generator. Paste a URL, text, WiFi data or vCard and get a high-resolution QR code. Downloadable as PNG, no watermark, no registration.",
    faqs: []
  },
  "json-formatter": {
    name: "JSON formatter",
    shortDesc: "Validate, format and minify JSON with error highlighting.",
    longDesc: "Paste JSON and get a formatted version with indentation, error validation with exact line, and minify option. Supports large JSON (>1MB). 100% local processing.",
    faqs: []
  },
  "base64-encode": {
    name: "Base64 encoder/decoder",
    shortDesc: "Encode text to Base64 and decode back instantly.",
    longDesc: "Encode text, URLs or any string to Base64, or decode Base64 back to plain text. Supports UTF-8 (accents, emojis). 100% client-side.",
    faqs: []
  },
  "url-encode": {
    name: "URL encoder/decoder",
    shortDesc: "Encode and decode URLs with special characters.",
    longDesc: "Convert special characters (spaces, accents, symbols) to their percent-encoded equivalents for valid URLs. Also decodes already-encoded URLs.",
    faqs: []
  },
  "hash-md5-sha": {
    name: "MD5/SHA hash generator",
    shortDesc: "Calculate MD5, SHA-1, SHA-256 and SHA-512 of any text.",
    longDesc: "Generate cryptographic hashes of any string. Useful for verifying file integrity, generating checksums, or creating deterministic IDs. Processed in your browser via Web Crypto API.",
    faqs: []
  },
  "cps-test": {
    name: "CPS Test (Clicks Per Second)",
    shortDesc: "Measure your click speed. Modes: 5s, 10s, 30s, 60s, 100s.",
    longDesc: "Click speed test: click as fast as you can in the selected time. Compare your CPS (Clicks Per Second) with personal records. Useful for Minecraft PvP gamers, mouse evaluation, or general practice.",
    faqs: [
      { q: "What's a good CPS?", a: "Human average: 6-8 CPS. Good player: 8-10 CPS. Pro/jitter click: 10-15 CPS." },
      { q: "Does it work on mobile?", a: "Yes, you can tap the screen instead of clicking." }
    ]
  },
  "tiempo-reaccion": {
    name: "Reaction time test",
    shortDesc: "Measure your reaction time in milliseconds. Human average: 250ms.",
    longDesc: "Wait for the box to change color and click as fast as possible. Repeat 5 times for an average. Human average is 200-300ms.",
    faqs: []
  },
  "cronometro": {
    name: "Online stopwatch",
    shortDesc: "Precision stopwatch with laps, pause and export.",
    longDesc: "Online stopwatch with centisecond precision, lap support, pause and reset. Keeps running even when you switch tabs. No installation.",
    faqs: []
  },
  "ruleta-decision": {
    name: "Decision wheel",
    shortDesc: "Add options, spin the wheel and let chance decide.",
    longDesc: "Animated wheel for decisions. Add options, spin it and get a random result. Great for social raffles, picking restaurant, sorting teams in class or any dilemma.",
    faqs: []
  },
  "unir-pdf": {
    name: "Merge PDF",
    shortDesc: "Combine multiple PDFs into one. Processed in your browser.",
    longDesc: "Select multiple PDF files, drag to reorder and download a single combined PDF. Your files never leave your browser — all processing happens locally with the pdf-lib library.",
    faqs: [
      { q: "Is there a file limit?", a: "No explicit limit. In practice, depends on your browser RAM (typically 50-100 medium PDFs)." },
      { q: "Are my files uploaded to a server?", a: "No. The merge happens entirely in your browser via WebAssembly." }
    ]
  },
  "dividir-pdf": {
    name: "Split PDF / extract pages",
    shortDesc: "Extract specific pages from a PDF (e.g. 1-3, 5, 7-9).",
    longDesc: "Upload a PDF, specify which pages to extract (ranges and individual pages separated by commas) and download a PDF with only those pages.",
    faqs: []
  },
  "rotar-pdf": {
    name: "Rotate PDF",
    shortDesc: "Rotate all pages 90°, 180° or 270°.",
    longDesc: "Useful when a scanned PDF arrived in the wrong orientation. Applies rotation to all pages and downloads the result.",
    faqs: []
  },
  "marca-agua-pdf": {
    name: "Watermark PDF",
    shortDesc: "Add diagonal text watermark to your PDF.",
    longDesc: "Stamp any text (e.g. CONFIDENTIAL, DRAFT) as a diagonal watermark on all pages. Configurable: opacity, size and color.",
    faqs: []
  },
  "imagenes-a-pdf": {
    name: "JPG/PNG to PDF",
    shortDesc: "Convert one or many images to a single PDF.",
    longDesc: "Select JPGs or PNGs, reorder as desired and download a PDF containing each image as a page. Useful for sending signed contracts, receipts, screenshots grouped together.",
    faqs: []
  },
  "calculadora-imc": {
    name: "BMI calculator",
    shortDesc: "Calculate your Body Mass Index and health category.",
    longDesc: "BMI is a measure of weight-to-height ratio used as an initial nutritional indicator. Remember: BMI doesn't differentiate muscle from fat, so it's only a guide.",
    faqs: []
  },
  "calculadora-edad": {
    name: "Age calculator",
    shortDesc: "Calculate your exact age in years, months, days, hours and minutes.",
    longDesc: "Enter your birth date and get your age broken down into years, months, days, total days lived and total hours and minutes.",
    faqs: []
  },

  // ============================================================
  // Wave 14 — EN scale up to 50+ tools
  // ============================================================
  "firmar-pdf": {
    name: "Sign PDF online",
    shortDesc: "Draw your signature with mouse or finger and download a signed PDF. No Adobe, no upload.",
    longDesc: "Sign any PDF directly in your browser. Open the file locally, draw your signature with mouse or finger on mobile, adjust position and size, and download the signed PDF. Everything runs client-side with pdf-lib + canvas — your document never leaves your computer.",
    faqs: [
      { q: "Is a browser-drawn signature legally valid?", a: "In most countries (US ESIGN Act, EU eIDAS, Mexico Código de Comercio), simple electronic signatures are valid for common agreements when both parties accept. For documents requiring qualified signatures (notarial deeds, real estate), you need a certificate-based signature (Adobe Sign, DocuSign, government eIDs)." },
      { q: "Does Toolram add a watermark to the signed PDF?", a: "No. The output PDF contains only your original document + your signature overlay. No 'Made with Toolram' watermark." }
    ]
  },
  "comprimir-pdf": {
    name: "Compress PDF",
    shortDesc: "Reduce PDF file size 40-70% while maintaining quality. Browser-based.",
    longDesc: "Upload a PDF and Toolram reduces its size by re-encoding images and removing redundant data, all in your browser via pdf-lib. Smaller PDFs are easier to email, faster to share, and cheaper to store.",
    faqs: []
  },
  "pdf-a-jpg": {
    name: "PDF to JPG",
    shortDesc: "Extract each PDF page as a high-quality JPG image.",
    longDesc: "Convert a PDF document into individual JPG images, one per page. Useful for inserting PDF content into presentations, web galleries or messaging apps. Processed locally with pdf.js.",
    faqs: []
  },
  "quitar-fondo-imagen": {
    name: "Remove image background (AI)",
    shortDesc: "Auto-remove background from any image with U²-Net AI model in your browser.",
    longDesc: "AI-powered background removal running 100% in your browser via WebAssembly (@imgly/background-removal, U²-Net model ~13MB cached). Your image never uploads to a server. Works on photos, products, portraits, logos.",
    faqs: [
      { q: "How does it compare to remove.bg?", a: "remove.bg uses heavier server-side models, marginally better on complex hair/transparency edges. Toolram processes locally — same quality for standard subjects, with zero data exfiltration." }
    ]
  },
  "comprimir-imagen": {
    name: "Compress image (JPG/PNG/WebP)",
    shortDesc: "Reduce image file size 60-90% while keeping visual quality.",
    longDesc: "Compress JPG, PNG or WebP images via canvas API in your browser. Useful for improving website speed (Core Web Vitals), reducing hosting bills, or making images email-friendly.",
    faqs: []
  },
  "convertir-imagen": {
    name: "Convert image format",
    shortDesc: "Convert between JPG, PNG, WebP and AVIF in your browser.",
    longDesc: "Convert images between formats without quality loss (PNG, WebP) or with controlled compression (JPG, AVIF). All conversion happens locally via canvas API.",
    faqs: []
  },
  "redimensionar-imagen": {
    name: "Resize image",
    shortDesc: "Resize images to exact dimensions while keeping aspect ratio.",
    longDesc: "Resize any image (JPG, PNG, WebP) to specific dimensions in pixels or percentages. Preserves aspect ratio by default. 100% client-side.",
    faqs: []
  },
  "youtube-thumbnail": {
    name: "YouTube thumbnail downloader",
    shortDesc: "Download YouTube video thumbnails in 5 qualities (up to 1280×720).",
    longDesc: "Paste any YouTube URL or video ID and download the thumbnail in maxresdefault (1280×720), sddefault (640×480), hqdefault (480×360), mqdefault (320×180) or default (120×90). Useful for blog hero images, mockups or competitive research.",
    faqs: []
  },
  "wifi-qr": {
    name: "WiFi QR code generator",
    shortDesc: "Create a QR that auto-connects phones to your WiFi network.",
    longDesc: "Generate a QR code with your WiFi credentials (SSID + password + security type). iOS 11+ and Android 10+ auto-connect when scanned with the camera. Perfect for cafés, offices and Airbnb. Generated locally — your WiFi password never reaches Toolram or Google.",
    faqs: []
  },
  "escaner-qr": {
    name: "QR code scanner",
    shortDesc: "Scan QR codes from your camera or uploaded image, in-browser.",
    longDesc: "Decode QR codes using your device camera or by uploading an image. Powered by jsQR running 100% in your browser. The image never uploads to a server — important for QR codes containing sensitive data (WiFi credentials, transaction IDs, vCards).",
    faqs: []
  },
  "lector-codigo-barras": {
    name: "Barcode reader",
    shortDesc: "Decode 1D and 2D barcodes from image or camera.",
    longDesc: "Read EAN, UPC, Code 128, QR, DataMatrix and more from your camera feed or uploaded image. All decoding runs in your browser.",
    faqs: []
  },
  "ocr-imagen-texto": {
    name: "Image to text (OCR)",
    shortDesc: "Extract text from images using Tesseract.js in your browser.",
    longDesc: "Optical Character Recognition (OCR) for images, supporting 12+ languages including English, Spanish, Portuguese, French, German. Powered by Tesseract.js running client-side — your images never leave your device.",
    faqs: []
  },
  "texto-a-voz": {
    name: "Text to speech (TTS)",
    shortDesc: "Convert text to natural speech using your device's built-in voices.",
    longDesc: "Listen to any text using the Web Speech API native voices on your device (10-50+ depending on OS). No upload, no API key, no quota. Adjustable speed, pitch and voice.",
    faqs: []
  },
  "voz-a-texto": {
    name: "Speech to text",
    shortDesc: "Transcribe your voice to text in real-time, 12+ languages.",
    longDesc: "Real-time speech-to-text transcription using the Web Speech API. Supports English, Spanish, Portuguese, French, German, Italian, Japanese, Korean, Chinese, Russian, Arabic, Hindi. Audio never leaves your browser.",
    faqs: []
  },
  "creador-backlinks": {
    name: "Backlink maker (40+ SEO services)",
    shortDesc: "Submit your URL to 40+ public SEO services that publish indexable reports with backlinks.",
    longDesc: "Sends your URL to public SEO analysis services (Wayback Machine, GTmetrix, BuiltWith, Similarweb, SSL Labs, schema validators) which publish reports with natural backlinks from DA 70+ domains. Free, no signup. Honest disclaimer: not a replacement for editorial backlinks — best for new sites (0-6 months).",
    faqs: []
  },
  "generador-meta-tags": {
    name: "Meta tags generator",
    shortDesc: "Generate complete HTML meta tags for SEO + Open Graph + Twitter Cards.",
    longDesc: "Fill a simple form (title, description, URL, image) and get ready-to-paste meta tags including <title>, <meta description>, canonical, og:title/description/image/url, twitter:card and robots directives.",
    faqs: []
  },
  "previsualizador-serp": {
    name: "SERP preview tool",
    shortDesc: "Preview how your page will look in Google search results.",
    longDesc: "Paste your title, URL and meta description to see exactly how Google will render them in mobile and desktop SERPs. Character counts and truncation warnings included.",
    faqs: []
  },
  "densidad-keywords": {
    name: "Keyword density analyzer",
    shortDesc: "Analyze keyword density in any text or pasted HTML.",
    longDesc: "Paste text or HTML and get a breakdown of keyword density: 1-word, 2-word (bigrams) and 3-word (trigrams) frequencies, percentages and Top-N list. Useful for content optimization without keyword stuffing.",
    faqs: []
  },
  "analizador-meta": {
    name: "Meta tags analyzer",
    shortDesc: "Paste HTML and get a SEO score with issue list.",
    longDesc: "Paste any HTML and Toolram analyzes title length, meta description length, missing canonical, OG/Twitter tags presence, schema detection, heading hierarchy and gives you a 0-100 SEO score with specific issues to fix.",
    faqs: []
  },
  "generador-robots": {
    name: "robots.txt generator",
    shortDesc: "Generate a robots.txt file with allow/disallow rules and sitemap.",
    longDesc: "Visual generator for robots.txt: configure rules per user-agent (Googlebot, Bingbot, AI bots), define sitemap URL, and download a valid robots.txt ready to deploy.",
    faqs: []
  },
  "generador-sitemap": {
    name: "Sitemap XML generator",
    shortDesc: "Generate an XML sitemap from a list of URLs.",
    longDesc: "Paste a list of URLs (one per line) and get a valid XML sitemap with lastmod, changefreq and priority. Up to 50,000 URLs per sitemap.",
    faqs: []
  },
  "generador-schema-faq": {
    name: "FAQ schema generator",
    shortDesc: "Generate FAQPage JSON-LD schema from question-answer pairs.",
    longDesc: "Add question-answer pairs in a form and get ready-to-paste JSON-LD FAQPage schema. Useful for triggering FAQ rich results in Google.",
    faqs: []
  },
  "css-flex-generator": {
    name: "CSS Flexbox generator",
    shortDesc: "Visual Flexbox playground with auto-generated CSS code.",
    longDesc: "Interactive Flexbox playground: configure justify-content, align-items, flex-direction, gap and see the result in real-time. Copy the generated CSS with one click.",
    faqs: []
  },
  "css-grid-generator": {
    name: "CSS Grid generator",
    shortDesc: "Visual CSS Grid playground with column/row controls and ready code.",
    longDesc: "Define columns, rows, gap and template areas visually. See your grid layout in real-time and copy production-ready CSS.",
    faqs: []
  },
  "cubic-bezier-generator": {
    name: "CSS cubic-bezier easing generator",
    shortDesc: "Visual editor for cubic-bezier() easing functions with live preview.",
    longDesc: "Drag the bezier curve handles to design your custom easing function. Live preview shows animation behavior. Copy the cubic-bezier() value for your CSS transitions.",
    faqs: []
  },
  "color-palette": {
    name: "Color palette generator",
    shortDesc: "Generate harmonic color palettes: monochromatic, complementary, triadic, tetradic.",
    longDesc: "Pick a base color and get harmonic palettes following color theory: monochromatic, analogous, complementary, triadic, tetradic. Copy individual HEX/RGB/HSL values or full palette.",
    faqs: []
  },
  "contraste-color-wcag": {
    name: "WCAG color contrast checker",
    shortDesc: "Check WCAG AA/AAA contrast ratios between any two colors.",
    longDesc: "Enter foreground + background colors and get the contrast ratio, WCAG AA (4.5:1) and AAA (7:1) pass/fail for normal and large text. Essential for accessible web design.",
    faqs: []
  },
  "interes-compuesto": {
    name: "Compound interest calculator",
    shortDesc: "Project investment growth with compound interest, monthly contributions, multiple currencies.",
    longDesc: "Calculate compound interest projections with initial amount, monthly contributions, annual return rate and time horizon. Supports compounding frequencies (annual, monthly, daily) and 8+ currencies.",
    faqs: []
  },
  "salario-hora-anual": {
    name: "Hourly to annual salary converter",
    shortDesc: "Convert between hourly, daily, weekly, monthly and annual salary figures.",
    longDesc: "Enter any salary in any frequency (hourly, daily, weekly, monthly, annual) and get equivalents in all other frequencies. Useful for freelance pricing, job offer comparison or budget planning.",
    faqs: []
  }
};

// Glossary EN translations
export const GLOSSARY_EN: Record<string, { term: string; shortDef: string; longDef: string; example?: string; useCases: string[] }> = {
  "que-es-base64": {
    term: "Base64",
    shortDef: "Base64 is an encoding scheme that converts binary data to an ASCII text string using 64 safe characters (A-Z, a-z, 0-9, +, /).",
    longDef: "Base64 was created to transmit binary data (images, files) through protocols that only support text, like email (MIME) or JSON. Each 3 bytes of binary data are represented as 4 ASCII characters, increasing size by ~33%. It is NOT encryption: anyone can decode Base64 instantly. Its purpose is transport, not security.",
    example: "Text: 'Hello' → Base64: 'SGVsbG8='",
    useCases: ["Embedding small images in CSS (data: URLs)", "Email attachments (MIME encoding)", "JWT tokens (payload portion)", "Storing binaries in JSON or XML", "Basic Auth in HTTP headers"]
  },
  "que-es-md5": {
    term: "MD5",
    shortDef: "MD5 is a cryptographic hash function that produces a 128-bit value (32 hex characters) from any variable-length input.",
    longDef: "MD5 was designed by Ronald Rivest in 1991. Today it is considered cryptographically broken since 2004 — collisions (two different inputs with the same hash) can be generated in seconds on common hardware. Do NOT use for passwords, digital signatures, or anything requiring security. Still useful for non-critical file integrity checksums and as a deterministic identifier.",
    example: "MD5('Hello world') = 5eb63bbbe01eeed093cb22bb8f5acdc3",
    useCases: ["Verifying integrity of downloaded files", "Generating deterministic IDs", "Cache keys (URL hashes)", "Quickly comparing files", "Historical: passwords (DON'T USE TODAY)"]
  },
  "que-es-uuid": {
    term: "UUID",
    shortDef: "A UUID (Universally Unique Identifier) is a 128-bit identifier expressed as 32 hexadecimal characters in 5 groups separated by hyphens (8-4-4-4-12).",
    longDef: "UUIDs guarantee uniqueness without central coordination: any system can generate one and the probability of collision with another UUID anywhere in the world is practically zero (1 in 5.3 × 10^36 for UUID v4). 5 versions exist: v1 based on MAC + timestamp, v3 MD5 hash of namespace+name, v4 random (most used), v5 SHA-1 hash, v7 time-orderable (new).",
    example: "550e8400-e29b-41d4-a716-446655440000 (UUID v4)",
    useCases: ["Primary keys in distributed databases", "Transaction IDs in APIs", "File upload IDs", "Session identifiers", "Tracking IDs in analytics"]
  },
  "que-es-cps-test": {
    term: "CPS Test",
    shortDef: "CPS (Clicks Per Second) Test is a test that measures how many times you can click your mouse in a period of time, generally 5, 10, 30 or 60 seconds.",
    longDef: "The CPS Test became popular in the gaming community, especially Minecraft PvP, where click speed determines combat damage. Normal human average is between 6-8 CPS. Intermediate players reach 8-10 CPS. Pros using techniques like jitter clicking, butterfly clicking or drag clicking exceed 12-15 CPS. Anything above 25 CPS is physically improbable and usually indicates mouse macro or bug.",
    example: "10-second test with 75 clicks = 7.5 CPS",
    useCases: ["Minecraft PvP combat training", "Verifying mouse speed after purchase", "Comparing normal clicks vs advanced techniques", "Diagnosing mouse double-click bug", "Online competitions among friends"]
  }
};
