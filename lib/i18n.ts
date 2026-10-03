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
    faqs: [
      { q: "Does it count spaces as characters?", a: "Yes. It shows both totals side by side: characters including spaces and characters without them, because Twitter/X and SMS count them differently." },
      { q: "Is there a character limit?", a: "No. You can paste an entire book if you want — the count runs in your browser, so nothing is uploaded." },
      { q: "Can I use it to check a meta description length?", a: "Yes, that is one of the most common uses. Aim for 150-160 characters so Google does not cut your snippet mid-word." }
    ]
  },
  "convertir-mayusculas": {
    name: "Case converter",
    shortDesc: "Convert text to UPPERCASE, lowercase, Title Case or aLtErNaTiNg.",
    longDesc: "Transform your text between 6 formats: UPPERCASE, lowercase, Title Case, Sentence case, aLtErNaTiNg (sarcastic) and InVeRsE. Perfect for titles, normalizing data or creating ironic text.",
    faqs: [
      { q: "Which cases can I convert to?", a: "UPPERCASE, lowercase, Sentence case, Title Case and toggle case. Paste the text once and switch between them freely." },
      { q: "Does it keep my accents and special characters?", a: "Yes. Accented letters, ñ, ü and other marks are preserved when changing case." },
      { q: "Does Title Case follow English rules?", a: "It capitalises the first letter of each word, which is the behaviour most people expect. Short articles and prepositions are not lowercased automatically." }
    ]
  },
  "lorem-ipsum": {
    name: "Lorem Ipsum generator",
    shortDesc: "Generate custom Lorem Ipsum placeholder text.",
    longDesc: "Create test text in Lorem Ipsum format. Choose paragraphs, words or sentences. Ideal for mockups, web templates and design layouts.",
    faqs: [
      { q: "What is Lorem Ipsum for?", a: "It is placeholder text used in design and development so you can see how a layout behaves before the real copy exists." },
      { q: "Can I choose how much text I get?", a: "Yes. You pick the number of paragraphs, sentences or words, so you can fill anything from a caption to a full article mock-up." },
      { q: "Does it always start with «Lorem ipsum dolor sit amet»?", a: "You can choose. Starting with the classic opening is the convention, but you can generate text without it if you prefer." }
    ]
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
    faqs: [
      { q: "Which UUID version does it generate?", a: "Version 4, the random one. It is the version you want for database keys, session identifiers and anything that must not collide." },
      { q: "Can two generated UUIDs ever be the same?", a: "In practice, no. A v4 UUID has 122 random bits: the chance of a repeat is so small it is not a risk worth planning for." },
      { q: "Are they generated on your server?", a: "No. They are created in your browser with the Web Crypto API, so the values never travel anywhere." }
    ]
  },
  "generador-qr": {
    name: "QR code generator",
    shortDesc: "Create QR codes for URLs, text, WiFi or vCard. Download PNG.",
    longDesc: "Free online QR generator. Paste a URL, text, WiFi data or vCard and get a high-resolution QR code. Downloadable as PNG, no watermark, no registration.",
    faqs: [
      { q: "What can I put inside the QR code?", a: "A URL, plain text, a phone number, an email address or a WiFi network. The code adapts its density to the amount of data." },
      { q: "Can I print it large without losing quality?", a: "Yes. Download it as SVG and it stays sharp at any size, which is what you want for posters, menus or packaging." },
      { q: "Does the QR code expire?", a: "No. It is a static code: the content is inside the image itself, so it works forever and does not depend on our site staying online." }
    ]
  },
  "json-formatter": {
    name: "JSON formatter",
    shortDesc: "Validate, format and minify JSON with error highlighting.",
    longDesc: "Paste JSON and get a formatted version with indentation, error validation with exact line, and minify option. Supports large JSON (>1MB). 100% local processing.",
    faqs: [
      { q: "What happens if my JSON is invalid?", a: "It tells you where the problem is instead of failing silently, so you can jump straight to the line with the missing comma or bracket." },
      { q: "Can I minify as well as prettify?", a: "Yes. You can indent it for reading or strip every space for production, both ways." },
      { q: "Is my JSON sent anywhere?", a: "No. It is parsed in your browser, which matters when the file contains API keys or customer data." }
    ]
  },
  "base64-encode": {
    name: "Base64 encoder/decoder",
    shortDesc: "Encode text to Base64 and decode back instantly.",
    longDesc: "Encode text, URLs or any string to Base64, or decode Base64 back to plain text. Supports UTF-8 (accents, emojis). 100% client-side.",
    faqs: [
      { q: "What is Base64 actually for?", a: "It turns binary data into plain text so it can travel through channels that only accept text: emails, JSON payloads, data URIs in CSS." },
      { q: "Is Base64 a form of encryption?", a: "No, and this trips people up. It is an encoding: anyone can decode it instantly. Never use it to hide passwords." },
      { q: "Does it handle accents and emoji?", a: "Yes. Text is treated as UTF-8, so ñ, á and emoji survive the round trip intact." }
    ]
  },
  "url-encode": {
    name: "URL encoder/decoder",
    shortDesc: "Encode and decode URLs with special characters.",
    longDesc: "Convert special characters (spaces, accents, symbols) to their percent-encoded equivalents for valid URLs. Also decodes already-encoded URLs.",
    faqs: [
      { q: "When do I need to encode a URL?", a: "Whenever a parameter contains spaces, accents, &, ? or #. Without encoding, the browser cuts the value at the first special character." },
      { q: "What does %20 mean?", a: "It is a space. Percent encoding replaces each unsafe character with a % followed by its hexadecimal code." },
      { q: "Can it decode a link someone sent me?", a: "Yes. Paste the encoded URL and it returns the readable version, which is handy for reading long tracking links." }
    ]
  },
  "hash-md5-sha": {
    name: "MD5/SHA hash generator",
    shortDesc: "Calculate MD5, SHA-1, SHA-256 and SHA-512 of any text.",
    longDesc: "Generate cryptographic hashes of any string. Useful for verifying file integrity, generating checksums, or creating deterministic IDs. Processed in your browser via Web Crypto API.",
    faqs: [
      { q: "Which algorithms are supported?", a: "MD5, SHA-1, SHA-256 and SHA-512, calculated in your browser through the Web Crypto API." },
      { q: "Can I recover the original text from a hash?", a: "No. Hashing only goes one way by design. What attackers do is guess inputs until one matches, which is why weak passwords fall." },
      { q: "Should I still use MD5?", a: "Only for checksums, never for security. MD5 and SHA-1 are broken for cryptographic use; pick SHA-256 or SHA-512." }
    ]
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
    faqs: [
      { q: "What is a normal reaction time?", a: "Most people land between 200 and 300 milliseconds. Under 200 ms is genuinely fast; over 400 ms usually means tiredness or distraction." },
      { q: "Does my screen affect the result?", a: "Yes, quite a lot. A 60 Hz monitor and a wireless mouse add several milliseconds that have nothing to do with you." },
      { q: "How many attempts should I average?", a: "At least five. A single try is mostly luck; the average across a handful is the number that means something." }
    ]
  },
  "cronometro": {
    name: "Online stopwatch",
    shortDesc: "Precision stopwatch with laps, pause and export.",
    longDesc: "Online stopwatch with centisecond precision, lap support, pause and reset. Keeps running even when you switch tabs. No installation.",
    faqs: [
      { q: "Does it keep running if I switch tabs?", a: "Yes. The count is based on real elapsed time, so leaving the tab or minimising the window does not slow it down." },
      { q: "Can I record lap times?", a: "Yes. Each lap is stored with its split, so you can compare rounds without stopping the clock." },
      { q: "Do I lose everything if I reload the page?", a: "Yes, a reload resets the stopwatch. Note down your laps before refreshing." }
    ]
  },
  "ruleta-decision": {
    name: "Decision wheel",
    shortDesc: "Add options, spin the wheel and let chance decide.",
    longDesc: "Animated wheel for decisions. Add options, spin it and get a random result. Great for social raffles, picking restaurant, sorting teams in class or any dilemma.",
    faqs: [
      { q: "Is the result really random?", a: "Yes. Each spin uses the browser's random number generator, and every option on the wheel has exactly the same chance." },
      { q: "How many options can I add?", a: "As many as you need. With very long lists the labels get small, so keep it readable if you want to see the winner clearly." },
      { q: "Can I save my wheel for later?", a: "The options live in the page while it is open. If you close it, you will need to type them again." }
    ]
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
    faqs: [
      { q: "Can I extract just one page?", a: "Yes. Choose the exact page or a range like 3-7 and you get a new PDF containing only that." },
      { q: "Is my document uploaded to a server?", a: "No. The PDF is processed inside your browser, which is the whole point when the file is a contract or an invoice." },
      { q: "Does splitting reduce the quality?", a: "No. Pages are copied as they are, so text stays selectable and images keep their original resolution." }
    ]
  },
  "rotar-pdf": {
    name: "Rotate PDF",
    shortDesc: "Rotate all pages 90°, 180° or 270°.",
    longDesc: "Useful when a scanned PDF arrived in the wrong orientation. Applies rotation to all pages and downloads the result.",
    faqs: [
      { q: "Can I rotate only some pages?", a: "Yes. You can turn the whole document or pick specific pages, which is what you need after scanning a batch sideways." },
      { q: "Which angles are available?", a: "90°, 180° and 270°. Applying 90° twice is the same as 180°." },
      { q: "Will the rotation stick when I open it elsewhere?", a: "Yes. The rotation is written into the file, so it looks the same in any reader or when printed." }
    ]
  },
  "marca-agua-pdf": {
    name: "Watermark PDF",
    shortDesc: "Add diagonal text watermark to your PDF.",
    longDesc: "Stamp any text (e.g. CONFIDENTIAL, DRAFT) as a diagonal watermark on all pages. Configurable: opacity, size and color.",
    faqs: [
      { q: "Can I choose where the watermark goes?", a: "Yes. You control the text, its position, size, angle and transparency, so it can sit diagonally across the page or discreetly in a corner." },
      { q: "Can the watermark be removed afterwards?", a: "It is drawn onto the page, so it is not a layer someone can switch off casually. It is a deterrent, not encryption." },
      { q: "Does it apply to every page?", a: "Yes, the watermark is added to all pages of the document in one pass." }
    ]
  },
  "imagenes-a-pdf": {
    name: "JPG/PNG to PDF",
    shortDesc: "Convert one or many images to a single PDF.",
    longDesc: "Select JPGs or PNGs, reorder as desired and download a PDF containing each image as a page. Useful for sending signed contracts, receipts, screenshots grouped together.",
    faqs: [
      { q: "Can I combine several images into one PDF?", a: "Yes. Add all the images, drag them into the order you want and they become a single document." },
      { q: "Which formats are accepted?", a: "JPG, PNG and WebP. They are placed at their original resolution, so the result is as sharp as the source." },
      { q: "Can I choose page size and orientation?", a: "Yes, you can fit the page to the image or use a standard size such as A4 in portrait or landscape." }
    ]
  },
  "calculadora-imc": {
    name: "BMI calculator",
    shortDesc: "Calculate your Body Mass Index and health category.",
    longDesc: "BMI is a measure of weight-to-height ratio used as an initial nutritional indicator. Remember: BMI doesn't differentiate muscle from fat, so it's only a guide.",
    faqs: [
      { q: "What is a healthy BMI range?", a: "The WHO considers 18.5 to 24.9 normal weight. Below that is underweight and above it is overweight, with obesity from 30." },
      { q: "Why is BMI unreliable for athletes?", a: "Because it only knows height and weight. Muscle is denser than fat, so a very fit person can score as «overweight» while carrying little fat." },
      { q: "Does it work with pounds and inches?", a: "Yes, you can switch units. The formula is the same; only the conversion factor changes." }
    ]
  },
  "calculadora-edad": {
    name: "Age calculator",
    shortDesc: "Calculate your exact age in years, months, days, hours and minutes.",
    longDesc: "Enter your birth date and get your age broken down into years, months, days, total days lived and total hours and minutes.",
    faqs: [
      { q: "How exact is the result?", a: "It gives your age in years, months and days, counting leap years properly rather than assuming every year has 365 days." },
      { q: "Can I calculate the age at a past or future date?", a: "Yes. Set the reference date and it works out the age on that day, which is useful for forms and eligibility checks." },
      { q: "Does it tell me how long until my next birthday?", a: "Yes, it shows the days remaining alongside your current age." }
    ]
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
    faqs: [
      { q: "How much smaller will my file get?", a: "It depends on what is inside. Documents full of photos can drop a lot; a PDF that is mostly text is already compact and will barely change." },
      { q: "Will the text become blurry?", a: "No. Text stays vector and selectable; compression works on the embedded images." },
      { q: "Is there a file size limit?", a: "The limit is your device's memory, because the work happens in your browser rather than on a server." }
    ]
  },
  "pdf-a-jpg": {
    name: "PDF to JPG",
    shortDesc: "Extract each PDF page as a high-quality JPG image.",
    longDesc: "Convert a PDF document into individual JPG images, one per page. Useful for inserting PDF content into presentations, web galleries or messaging apps. Processed locally with pdf.js.",
    faqs: [
      { q: "Do I get one image per page?", a: "Yes. Each page becomes its own JPG, so a ten-page PDF gives you ten images." },
      { q: "Can I choose the resolution?", a: "Yes. Higher DPI means sharper images and bigger files; 150 DPI is fine for screens, 300 for printing." },
      { q: "Does it work with scanned documents?", a: "Yes, though the output is only as good as the scan. A blurry original stays blurry." }
    ]
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
    faqs: [
      { q: "Will I notice the quality loss?", a: "At around 80% quality most photos look identical to the eye while weighing far less. You can move the slider and compare before downloading." },
      { q: "Which formats can I compress?", a: "JPG, PNG and WebP. Converting a PNG photo to WebP usually saves the most." },
      { q: "Are my photos uploaded anywhere?", a: "No. Everything happens in your browser, so personal pictures never leave the device." }
    ]
  },
  "convertir-imagen": {
    name: "Convert image format",
    shortDesc: "Convert between JPG, PNG, WebP and AVIF in your browser.",
    longDesc: "Convert images between formats without quality loss (PNG, WebP) or with controlled compression (JPG, AVIF). All conversion happens locally via canvas API.",
    faqs: [
      { q: "Which conversions are supported?", a: "Between JPG, PNG and WebP in any direction." },
      { q: "Which format should I choose for a website?", a: "WebP, in most cases. It gives similar quality at a noticeably smaller size and every current browser supports it." },
      { q: "Does PNG keep transparency when converting?", a: "Converting PNG to WebP keeps transparency. Converting to JPG does not — JPG has no transparency, so it fills with a solid background." }
    ]
  },
  "redimensionar-imagen": {
    name: "Resize image",
    shortDesc: "Resize images to exact dimensions while keeping aspect ratio.",
    longDesc: "Resize any image (JPG, PNG, WebP) to specific dimensions in pixels or percentages. Preserves aspect ratio by default. 100% client-side.",
    faqs: [
      { q: "Does it keep the aspect ratio?", a: "Yes by default, so nothing looks stretched. You can unlock it if you deliberately need exact dimensions." },
      { q: "Can I make an image bigger?", a: "You can, but enlarging never adds detail that was not captured. Going up much beyond the original size looks soft." },
      { q: "Can I resize several images at once?", a: "You can process them one after another in the same session without reloading the page." }
    ]
  },
  "youtube-thumbnail": {
    name: "YouTube thumbnail downloader",
    shortDesc: "Download YouTube video thumbnails in 5 qualities (up to 1280×720).",
    longDesc: "Paste any YouTube URL or video ID and download the thumbnail in maxresdefault (1280×720), sddefault (640×480), hqdefault (480×360), mqdefault (320×180) or default (120×90). Useful for blog hero images, mockups or competitive research.",
    faqs: [
      { q: "Which sizes can I download?", a: "All the ones YouTube stores, from the small preview up to maxresdefault at 1280×720 when the uploader provided it." },
      { q: "Why is the maximum resolution missing sometimes?", a: "Because maxresdefault only exists if the original video was uploaded in HD. Older or low-resolution videos simply do not have it." },
      { q: "Can I use the thumbnail in my own content?", a: "The image belongs to whoever uploaded the video. Use it for reference or commentary, not as if it were yours." }
    ]
  },
  "wifi-qr": {
    name: "WiFi QR code generator",
    shortDesc: "Create a QR that auto-connects phones to your WiFi network.",
    longDesc: "Generate a QR code with your WiFi credentials (SSID + password + security type). iOS 11+ and Android 10+ auto-connect when scanned with the camera. Perfect for cafés, offices and Airbnb. Generated locally — your WiFi password never reaches Toolram or Google.",
    faqs: [
      { q: "How does a WiFi QR code work?", a: "It stores the network name, the password and the security type. Scanning it makes the phone offer to join without typing anything." },
      { q: "Does it work on iPhone and Android?", a: "Yes. Both connect straight from the camera app on current versions." },
      { q: "Is it safe to print and leave on a table?", a: "Anyone who can see it can join your network, so it is ideal for a guest network and a bad idea for your main one." }
    ]
  },
  "escaner-qr": {
    name: "QR code scanner",
    shortDesc: "Scan QR codes from your camera or uploaded image, in-browser.",
    longDesc: "Decode QR codes using your device camera or by uploading an image. Powered by jsQR running 100% in your browser. The image never uploads to a server — important for QR codes containing sensitive data (WiFi credentials, transaction IDs, vCards).",
    faqs: [
      { q: "Do I need to install an app?", a: "No. It uses your device camera straight from the browser, and you can also scan an image file you already have." },
      { q: "Is the scanned content sent anywhere?", a: "No. Decoding happens on your device, so whatever the code contains stays with you." },
      { q: "Can it read a QR code from a screenshot?", a: "Yes. Upload the image and it decodes it without needing the camera." }
    ]
  },
  "lector-codigo-barras": {
    name: "Barcode reader",
    shortDesc: "Decode 1D and 2D barcodes from image or camera.",
    longDesc: "Read EAN, UPC, Code 128, QR, DataMatrix and more from your camera feed or uploaded image. All decoding runs in your browser.",
    faqs: [
      { q: "Which barcode types can it read?", a: "The common retail and logistics formats, including EAN-13, UPC, Code 128 and Code 39." },
      { q: "Does it tell me the product name?", a: "No. A barcode is just a number; matching it to a product needs a commercial database. You get the digits." },
      { q: "Can I scan from a photo instead of the camera?", a: "Yes, upload the picture and it will try to decode it. A sharp, well-lit shot works far better." }
    ]
  },
  "ocr-imagen-texto": {
    name: "Image to text (OCR)",
    shortDesc: "Extract text from images using Tesseract.js in your browser.",
    longDesc: "Optical Character Recognition (OCR) for images, supporting 12+ languages including English, Spanish, Portuguese, French, German. Powered by Tesseract.js running client-side — your images never leave your device.",
    faqs: [
      { q: "How accurate is the recognition?", a: "Very good with clean, printed text. Handwriting, low light and photos taken at an angle drop the accuracy sharply." },
      { q: "Which languages does it handle?", a: "It is tuned for the Latin alphabet, so English, Spanish and similar languages work well, accents included." },
      { q: "Is my image uploaded to a server?", a: "No. Recognition runs in your browser, which matters when you are scanning documents with personal data." }
    ]
  },
  "texto-a-voz": {
    name: "Text to speech (TTS)",
    shortDesc: "Convert text to natural speech using your device's built-in voices.",
    longDesc: "Listen to any text using the Web Speech API native voices on your device (10-50+ depending on OS). No upload, no API key, no quota. Adjustable speed, pitch and voice.",
    faqs: [
      { q: "Which voices are available?", a: "The ones installed on your own device, because it uses your system's speech engine. That is why the list differs between Windows, macOS and Android." },
      { q: "Can I download the audio as a file?", a: "It plays through the browser. To keep a file you would need to record the system audio." },
      { q: "Can I change the speed and pitch?", a: "Yes, both are adjustable, which helps when you are proofreading a text by ear." }
    ]
  },
  "voz-a-texto": {
    name: "Speech to text",
    shortDesc: "Transcribe your voice to text in real-time, 12+ languages.",
    longDesc: "Real-time speech-to-text transcription using the Web Speech API. Supports English, Spanish, Portuguese, French, German, Italian, Japanese, Korean, Chinese, Russian, Arabic, Hindi. Audio never leaves your browser.",
    faqs: [
      { q: "Do I need a microphone permission?", a: "Yes, the browser will ask for it. Without permission it cannot hear anything." },
      { q: "Does it add punctuation on its own?", a: "Partly. Saying «comma» or «full stop» out loud is still the reliable way to get the punctuation you want." },
      { q: "Which browsers support it?", a: "Chrome and Edge handle it best. Support in Firefox and Safari is more limited." }
    ]
  },
  "creador-backlinks": {
    name: "Backlink maker (40+ SEO services)",
    shortDesc: "Submit your URL to 40+ public SEO services that publish indexable reports with backlinks.",
    longDesc: "Sends your URL to public SEO analysis services (Wayback Machine, GTmetrix, BuiltWith, Similarweb, SSL Labs, schema validators) which publish reports with natural backlinks from DA 70+ domains. Free, no signup. Honest disclaimer: not a replacement for editorial backlinks — best for new sites (0-6 months).",
    faqs: [
      { q: "Do these links actually improve my ranking?", a: "They are mostly analysis and directory pages. Treat them as quick visibility and indexing signals, not as a substitute for links people give you because your content is good." },
      { q: "Is this safe for my site?", a: "These are public, well-known services rather than a private link network, so the risk is low. Building thousands of links quickly is what gets sites in trouble." },
      { q: "How long until they appear?", a: "Some pages are created instantly, others need the service to crawl your site first, which can take days." }
    ]
  },
  "generador-meta-tags": {
    name: "Meta tags generator",
    shortDesc: "Generate complete HTML meta tags for SEO + Open Graph + Twitter Cards.",
    longDesc: "Fill a simple form (title, description, URL, image) and get ready-to-paste meta tags including <title>, <meta description>, canonical, og:title/description/image/url, twitter:card and robots directives.",
    faqs: [
      { q: "Which tags does it produce?", a: "Title, description, canonical, robots, Open Graph and Twitter Card — the set most pages actually need." },
      { q: "How long should my title and description be?", a: "Around 55-60 characters for the title and 150-160 for the description, so Google does not cut them mid-word." },
      { q: "Does Google always use my description?", a: "No. It often writes its own from the page content when it thinks that answers the query better. A good description still raises your odds." }
    ]
  },
  "previsualizador-serp": {
    name: "SERP preview tool",
    shortDesc: "Preview how your page will look in Google search results.",
    longDesc: "Paste your title, URL and meta description to see exactly how Google will render them in mobile and desktop SERPs. Character counts and truncation warnings included.",
    faqs: [
      { q: "Why does my title look cut off?", a: "Google measures pixels, not characters. A title full of wide letters gets truncated sooner than one with narrow ones." },
      { q: "Is the preview exactly what Google will show?", a: "It is a faithful simulation, but Google can rewrite titles and descriptions. Use it to avoid obvious truncation." },
      { q: "Does it show mobile and desktop?", a: "Yes, and they differ. Mobile has less room, so check both before publishing." }
    ]
  },
  "densidad-keywords": {
    name: "Keyword density analyzer",
    shortDesc: "Analyze keyword density in any text or pasted HTML.",
    longDesc: "Paste text or HTML and get a breakdown of keyword density: 1-word, 2-word (bigrams) and 3-word (trigrams) frequencies, percentages and Top-N list. Useful for content optimization without keyword stuffing.",
    faqs: [
      { q: "What is a good keyword density?", a: "There is no magic number. Writing naturally usually lands between 1% and 2%; anything far above that reads like spam to people and to Google." },
      { q: "Does keyword density still matter for SEO?", a: "Not as a ranking factor on its own. It is useful as a sanity check: it tells you whether your page is actually about what you think it is." },
      { q: "Does it count two-word and three-word phrases?", a: "Yes, and those are usually more revealing than single words." }
    ]
  },
  "analizador-meta": {
    name: "Meta tags analyzer",
    shortDesc: "Paste HTML and get a SEO score with issue list.",
    longDesc: "Paste any HTML and Toolram analyzes title length, meta description length, missing canonical, OG/Twitter tags presence, schema detection, heading hierarchy and gives you a 0-100 SEO score with specific issues to fix.",
    faqs: [
      { q: "What does it check?", a: "The title, description, canonical, robots directives and the Open Graph tags of any public URL, plus their lengths." },
      { q: "Why does it say my description is missing?", a: "Either the page has no description tag, or it is injected by JavaScript after load, in which case a crawler may not see it either." },
      { q: "Can I analyse a competitor's page?", a: "Yes, any publicly reachable URL works." }
    ]
  },
  "generador-robots": {
    name: "robots.txt generator",
    shortDesc: "Generate a robots.txt file with allow/disallow rules and sitemap.",
    longDesc: "Visual generator for robots.txt: configure rules per user-agent (Googlebot, Bingbot, AI bots), define sitemap URL, and download a valid robots.txt ready to deploy.",
    faqs: [
      { q: "What should a basic robots.txt contain?", a: "Allow crawling of your content, block private or duplicated areas such as admin and internal search, and point to your sitemap." },
      { q: "Does blocking a page in robots.txt remove it from Google?", a: "No, and this is the classic mistake. Blocking stops crawling, not indexing. To remove a page use a noindex tag and let Google crawl it." },
      { q: "Should I block AI crawlers?", a: "That is your call. It is a trade-off between appearing in AI answers and having your content used for training." }
    ]
  },
  "generador-sitemap": {
    name: "Sitemap XML generator",
    shortDesc: "Generate an XML sitemap from a list of URLs.",
    longDesc: "Paste a list of URLs (one per line) and get a valid XML sitemap with lastmod, changefreq and priority. Up to 50,000 URLs per sitemap.",
    faqs: [
      { q: "How many URLs can a sitemap hold?", a: "Up to 50,000 URLs or 50 MB. Beyond that you need several sitemaps and an index file." },
      { q: "What should the lastmod date say?", a: "The truth. If every URL claims it changed today, Google stops trusting the field and ignores it entirely." },
      { q: "Do I have to include every page?", a: "No. Include the pages you want indexed. Leaving out thin or duplicated URLs is a feature, not an omission." }
    ]
  },
  "generador-schema-faq": {
    name: "FAQ schema generator",
    shortDesc: "Generate FAQPage JSON-LD schema from question-answer pairs.",
    longDesc: "Add question-answer pairs in a form and get ready-to-paste JSON-LD FAQPage schema. Useful for triggering FAQ rich results in Google.",
    faqs: [
      { q: "Will this give me rich results in Google?", a: "FAQ rich results are now limited to a narrow set of authoritative sites. The markup still helps search engines and AI assistants understand your page." },
      { q: "Do the questions have to be visible on the page?", a: "Yes. Marking up questions and answers that a visitor cannot see breaks Google's guidelines." },
      { q: "Which format does it output?", a: "JSON-LD, which is the format Google recommends. Paste it into the head of your page." }
    ]
  },
  "css-flex-generator": {
    name: "CSS Flexbox generator",
    shortDesc: "Visual Flexbox playground with auto-generated CSS code.",
    longDesc: "Interactive Flexbox playground: configure justify-content, align-items, flex-direction, gap and see the result in real-time. Copy the generated CSS with one click.",
    faqs: [
      { q: "What is the difference between Flexbox and Grid?", a: "Flexbox lays things out along one axis — a row or a column. Grid handles rows and columns at the same time. For a navigation bar you want Flexbox." },
      { q: "Does the preview reflect real behaviour?", a: "Yes. You are seeing actual CSS applied live, so what you copy is what you get." },
      { q: "What does justify-content do exactly?", a: "It distributes free space along the main axis: pushing items to the start, the end, the centre, or spreading them apart." }
    ]
  },
  "css-grid-generator": {
    name: "CSS Grid generator",
    shortDesc: "Visual CSS Grid playground with column/row controls and ready code.",
    longDesc: "Define columns, rows, gap and template areas visually. See your grid layout in real-time and copy production-ready CSS.",
    faqs: [
      { q: "When should I use Grid instead of Flexbox?", a: "When the layout has both rows and columns that need to line up — page templates, dashboards, image galleries." },
      { q: "What does 1fr mean?", a: "A fraction of the free space. Three columns of 1fr split the space equally; 2fr 1fr gives the first column twice the width." },
      { q: "Can I create responsive layouts with it?", a: "Yes. Combining repeat(auto-fit, minmax(...)) lets the grid reflow without a single media query." }
    ]
  },
  "cubic-bezier-generator": {
    name: "CSS cubic-bezier easing generator",
    shortDesc: "Visual editor for cubic-bezier() easing functions with live preview.",
    longDesc: "Drag the bezier curve handles to design your custom easing function. Live preview shows animation behavior. Copy the cubic-bezier() value for your CSS transitions.",
    faqs: [
      { q: "What is an easing curve for?", a: "It decides how an animation accelerates. Linear motion looks robotic; a curve makes it feel natural." },
      { q: "Which curve should I use for a UI?", a: "Something that starts fast and settles gently — ease-out is the safe default for elements entering the screen." },
      { q: "Can I go outside the 0-1 range?", a: "Yes, and that gives you the bounce or overshoot effect. It is intentional, not a bug." }
    ]
  },
  "color-palette": {
    name: "Color palette generator",
    shortDesc: "Generate harmonic color palettes: monochromatic, complementary, triadic, tetradic.",
    longDesc: "Pick a base color and get harmonic palettes following color theory: monochromatic, analogous, complementary, triadic, tetradic. Copy individual HEX/RGB/HSL values or full palette.",
    faqs: [
      { q: "How are the palettes built?", a: "From colour theory relationships — complementary, analogous, triadic — starting from the colour you pick." },
      { q: "Can I get the values in HEX and RGB?", a: "Yes, each colour comes with its HEX, RGB and HSL values ready to copy." },
      { q: "Will the palette be accessible?", a: "Not automatically. Check text and background pairs with a contrast checker before shipping them." }
    ]
  },
  "contraste-color-wcag": {
    name: "WCAG color contrast checker",
    shortDesc: "Check WCAG AA/AAA contrast ratios between any two colors.",
    longDesc: "Enter foreground + background colors and get the contrast ratio, WCAG AA (4.5:1) and AAA (7:1) pass/fail for normal and large text. Essential for accessible web design.",
    faqs: [
      { q: "What contrast ratio do I need?", a: "4.5:1 for normal text and 3:1 for large text to meet AA. AAA asks for 7:1." },
      { q: "Why did my brand colour fail?", a: "Brand palettes are chosen to look good, not to be readable. Light greys and mid-tone colours on white fail very often." },
      { q: "Does it apply to icons and buttons?", a: "Yes. Interface elements and meaningful graphics need at least 3:1 against their background." }
    ]
  },
  "interes-compuesto": {
    name: "Compound interest calculator",
    shortDesc: "Project investment growth with compound interest, monthly contributions, multiple currencies.",
    longDesc: "Calculate compound interest projections with initial amount, monthly contributions, annual return rate and time horizon. Supports compounding frequencies (annual, monthly, daily) and 8+ currencies.",
    faqs: [
      { q: "What is the difference from simple interest?", a: "Simple interest always pays on the original amount. Compound interest pays on the amount plus the interest already earned, which is why it accelerates." },
      { q: "Does the compounding frequency matter?", a: "Yes. Monthly compounding beats annual at the same rate, though the gap is smaller than most people expect." },
      { q: "Can I add regular contributions?", a: "Yes, and that is usually where the real growth comes from — more than the rate itself over long periods." }
    ]
  },
  "salario-hora-anual": {
    name: "Hourly to annual salary converter",
    shortDesc: "Convert between hourly, daily, weekly, monthly and annual salary figures.",
    longDesc: "Enter any salary in any frequency (hourly, daily, weekly, monthly, annual) and get equivalents in all other frequencies. Useful for freelance pricing, job offer comparison or budget planning.",
    faqs: [
      { q: "How does it convert hourly pay to annual?", a: "It multiplies your rate by the hours you work per week and by the weeks you work per year, so part-time and unpaid holidays are handled properly." },
      { q: "Does it account for taxes?", a: "No. The figures are gross, before tax and deductions, which vary by country." },
      { q: "Can I go the other way round?", a: "Yes. Enter an annual salary and it works out the equivalent hourly rate." }
    ]
  }
};

// Glossary EN translations
export const GLOSSARY_EN: Record<string, { term: string; shortDef: string; longDef: string; example?: string; useCases: string[]; faqs?: { q: string; a: string }[] }> = {
  "que-es-base64": {
    term: "Base64",
    shortDef: "Base64 is an encoding scheme that converts binary data to an ASCII text string using 64 safe characters (A-Z, a-z, 0-9, +, /).",
    longDef: "Base64 was created to transmit binary data (images, files) through protocols that only support text, like email (MIME) or JSON. Each 3 bytes of binary data are represented as 4 ASCII characters, increasing size by ~33%. It is NOT encryption: anyone can decode Base64 instantly. Its purpose is transport, not security.",
    example: "Text: 'Hello' → Base64: 'SGVsbG8='",
    useCases: ["Embedding small images in CSS (data: URLs)", "Email attachments (MIME encoding)", "JWT tokens (payload portion)", "Storing binaries in JSON or XML", "Basic Auth in HTTP headers"],
    faqs: [
      { q: "Is Base64 encryption?", a: "No. It is an encoding, not a cipher: anyone can decode it in a second. Never use it to protect a password or a token." },
      { q: "Why does Base64 make files bigger?", a: "Because it represents every 3 bytes with 4 characters. The result is roughly 33% larger than the original binary." },
      { q: "Where is Base64 used in practice?", a: "Email attachments, data URIs for small images in CSS, JSON payloads carrying binary data, and JWT tokens." }
    ]
  },
  "que-es-md5": {
    term: "MD5",
    shortDef: "MD5 is a cryptographic hash function that produces a 128-bit value (32 hex characters) from any variable-length input.",
    longDef: "MD5 was designed by Ronald Rivest in 1991. Today it is considered cryptographically broken since 2004 — collisions (two different inputs with the same hash) can be generated in seconds on common hardware. Do NOT use for passwords, digital signatures, or anything requiring security. Still useful for non-critical file integrity checksums and as a deterministic identifier.",
    example: "MD5('Hello world') = 5eb63bbbe01eeed093cb22bb8f5acdc3",
    useCases: ["Verifying integrity of downloaded files", "Generating deterministic IDs", "Cache keys (URL hashes)", "Quickly comparing files", "Historical: passwords (DON'T USE TODAY)"],
    faqs: [
      { q: "Is MD5 still safe to use?", a: "Not for security. Collisions can be produced deliberately, so it must not be used for passwords or digital signatures. It is fine as a quick file checksum." },
      { q: "What should I use instead?", a: "SHA-256 for integrity, and bcrypt or Argon2 for storing passwords. A general-purpose hash is the wrong tool for passwords." },
      { q: "Can an MD5 hash be reversed?", a: "Not mathematically, but common values are already in public lookup tables, so in practice a weak input is trivially recovered." }
    ]
  },
  "que-es-uuid": {
    term: "UUID",
    shortDef: "A UUID (Universally Unique Identifier) is a 128-bit identifier expressed as 32 hexadecimal characters in 5 groups separated by hyphens (8-4-4-4-12).",
    longDef: "UUIDs guarantee uniqueness without central coordination: any system can generate one and the probability of collision with another UUID anywhere in the world is practically zero (1 in 5.3 × 10^36 for UUID v4). 5 versions exist: v1 based on MAC + timestamp, v3 MD5 hash of namespace+name, v4 random (most used), v5 SHA-1 hash, v7 time-orderable (new).",
    example: "550e8400-e29b-41d4-a716-446655440000 (UUID v4)",
    useCases: ["Primary keys in distributed databases", "Transaction IDs in APIs", "File upload IDs", "Session identifiers", "Tracking IDs in analytics"],
    faqs: [
      { q: "What does UUID stand for?", a: "Universally Unique Identifier: a 128-bit value written as 36 characters, designed so separate systems can generate IDs without coordinating." },
      { q: "Which version should I use?", a: "Version 4, the random one, covers almost every case. Version 7 is worth knowing about because it sorts by time, which helps database indexes." },
      { q: "Can I use a UUID as a database primary key?", a: "Yes, and it is common in distributed systems. The trade-off is size and index fragmentation compared with an auto-incrementing integer." }
    ]
  },
  "que-es-cps-test": {
    term: "CPS Test",
    shortDef: "CPS (Clicks Per Second) Test is a test that measures how many times you can click your mouse in a period of time, generally 5, 10, 30 or 60 seconds.",
    longDef: "The CPS Test became popular in the gaming community, especially Minecraft PvP, where click speed determines combat damage. Normal human average is between 6-8 CPS. Intermediate players reach 8-10 CPS. Pros using techniques like jitter clicking, butterfly clicking or drag clicking exceed 12-15 CPS. Anything above 25 CPS is physically improbable and usually indicates mouse macro or bug.",
    example: "10-second test with 75 clicks = 7.5 CPS",
    useCases: ["Minecraft PvP combat training", "Verifying mouse speed after purchase", "Comparing normal clicks vs advanced techniques", "Diagnosing mouse double-click bug", "Online competitions among friends"],
    // Answers written for the exact questions Bing already ranks this page for
    // (positions 3-4, zero clicks): the "in Spanish", "in math" and
    // "in computer skills" variants the previous copy never addressed.
    faqs: [
      { q: "What is a CPS test in Spanish?", a: "In Spanish a CPS test is called \"test de clics por segundo\" or \"prueba de velocidad de clic\". CPS stands for Clicks Per Second — in Spanish, \"clics por segundo\". The Spanish version of this page is at toolram.com/que-es-cps-test, and the test itself works the same in any language." },
      { q: "What does CPS mean in math?", a: "CPS is not a mathematical constant: it is a rate, clicks divided by seconds, exactly like speed is distance divided by time. If you click 75 times in 10 seconds, your CPS is 75 ÷ 10 = 7.5. That simple division is the whole formula." },
      { q: "What is a CPS test in computer skills?", a: "In a computer-skills or IT class, a CPS test measures mouse dexterity: how fast and how consistently a student can click. It is used alongside typing tests (WPM) to assess input speed, and it also reveals hardware problems such as a mouse that registers double clicks." },
      { q: "What is a 1 second CPS test?", a: "The 1-second CPS test measures your burst speed: the highest number of clicks you can land in a single second, with no endurance involved. Scores come out higher and noisier than the 10-second test, which is the one people use to compare results." },
      { q: "Is CPS used in Roblox and Minecraft?", a: "Yes. In Minecraft PvP click speed affects hit rate and knockback, which is why the 10-second Kohi test became the standard. Roblox players use it for clicker games and combat too, although many servers restrict techniques like drag clicking." },
      { q: "What is a good CPS score?", a: "The human average is 6-8 CPS. Around 8-10 CPS is a good score, and 10-15 CPS is reached with techniques like jitter or butterfly clicking. Sustained results above 25 CPS normally mean an autoclicker rather than a human hand." }
    ]
  }
};

/**
 * 3-oct-2026 · Traducciones /en/ que SÍ se indexan.
 * Las /en/ son traducciones de ~150 palabras. 47 de 54 no tuvieron NI UNA impresión en Bing (90 días)
 * ni en Google (16 meses). Google tiene el sitio entero en «rastreada: sin indexar» y estas páginas
 * finas diluyen la valoración. Las que no están aquí pasan a noindex,follow, salen del sitemap y
 * pierden el hreflang (en ambos sentidos). Siguen existiendo y enlazadas: es reversible añadiendo el slug.
 * Datos: Bing GetPageStats + GSC searchAnalytics por página, 3-oct-2026.
 */
export const EN_INDEXABLE = new Set<string>([
  "que-es-cps-test", // Bing 267 impr
  "unir-pdf",        // Bing 2, Google 24
  "generador-qr",    // Google 18
  "contador-palabras", // Google 5
  "cps-test",        // Google 5
  "dividir-pdf",     // Google 2
  "rotar-pdf"        // Google 1
]);
