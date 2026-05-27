import type { BlogPost } from "./blog";

/**
 * Batch 3 (Wave 14, mayo 2026) — 7 pillars + 7 satellites.
 * Cada pillar es un hub editorial ~3000-3500 palabras que cubre una categoría top.
 * Cada satellite es un artículo ~1000 palabras enlazado al pillar de su categoría.
 */

export const POSTS_BATCH_3: BlogPost[] = [
  // ============================================================
  // PILLAR 1 — PDF (hub completo)
  // ============================================================
  {
    slug: "blog/guia-completa-pdf-online-2026",
    title: "Guía completa para trabajar con PDF online en 2026: 13 operaciones gratis sin Adobe",
    excerpt: "Hub maestro de las 13 operaciones más útiles sobre PDF — unir, dividir, firmar, comprimir, OCR, conversiones — con foco en hacerlas sin Adobe Acrobat y sin subir tus archivos a servidores.",
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
    author: "José Gaspard",
    category: "PDF",
    keywords: ["pdf online", "editar pdf", "pdf gratis", "alternativas adobe acrobat", "pdf privacy", "guia pdf", "como trabajar con pdf", "herramientas pdf 2026"],
    estimatedReadMinutes: 14,
    body: `
## El estado del PDF en 2026

El PDF cumplió **32 años** este año y sigue siendo el formato universal para documentos: contratos, facturas, recetas médicas, tesis, manuales técnicos. Lo que cambió no es el formato — cambió **cómo trabajamos sobre él**.

Hace 5 años para firmar un PDF había que pagar Adobe Acrobat ($14.99/mes) o instalar Foxit. Para unir dos PDFs, subirlos a un servicio que después te muestra ads. Para OCR de un PDF escaneado, abrir Office y rezar.

En 2026 hay un cambio técnico que la mayoría de portales SEO de "herramientas PDF online" todavía no aprovecha: **las APIs modernas del navegador permiten procesar PDFs completos sin enviarlos a ningún servidor**. WebAssembly + pdf-lib + pdf.js dan capacidades comparables a las de Adobe — corriendo en tu Chrome.

Esta guía cubre las 13 operaciones más buscadas sobre PDF: cuándo conviene cada una, qué tool usar (incluyendo opciones de Toolram y competidores), y cuándo todavía necesitás software pago de verdad.

## Las 13 operaciones más útiles sobre PDF

### 1. Unir varios PDFs en uno solo

Caso de uso clásico: tu jefe te pidió "mandame todo en un solo PDF" y vos tenés 5 archivos separados.

**Lo que hay en Toolram:** [Unir PDF](/unir-pdf) — arrastrás los archivos, los reordenás, descargás. 100% en el navegador con pdf-lib. Sin marca de agua, sin límite de tamaño más allá de tu RAM (~100-200 MB práctico).

**Alternativas:** iLovePDF Merge (sube al server, marca de agua en algunos casos), SmallPDF Merge (2 operaciones gratis por día, después paywall), PDF24 Merge (web sube al server, app Windows es offline).

### 2. Dividir PDF / extraer páginas específicas

Útil cuando recibís un PDF de 200 páginas y solo necesitás 3.

**Toolram:** [Dividir PDF](/dividir-pdf) acepta rangos (1-3, 5, 7-9) o "una página por archivo". Procesamiento local.

### 3. Firmar un PDF

Probablemente la operación más demandada de 2026. Tenés tres caminos:

- **Firma simple dibujada** (Toolram, gratis): válida para acuerdos comunes en MX/ES/UE bajo eIDAS y similar. [Ver tool de firma](/firmar-pdf).
- **Firma electrónica avanzada** (Autofirma + e.firma SAT en México, Autofirma + FNMT en España): gratuita pero requiere certificado oficial.
- **Firma electrónica cualificada** (Adobe Sign, DocuSign): paga pero con audit trail y valor legal reforzado internacional.

Para 80% de casos cotidianos (autorizaciones académicas, cartas, reservaciones), la firma simple alcanza. Para escrituras notariales o contratos de millones, vas a Adobe Sign / DocuSign.

### 4. Comprimir un PDF que es muy pesado

Caso de uso: tu PDF de 25 MB rebota en Gmail (límite 25 MB) o en el portal del banco.

**Toolram:** [Comprimir PDF](/comprimir-pdf) — re-encoda imágenes embedded y remueve datos redundantes. Reduce típicamente 40-70% sin pérdida visual.

**Cuándo gana Adobe Acrobat:** compresión muy agresiva sobre PDFs con muchas imágenes. Adobe usa algoritmos propietarios que bajan PDFs 80-90% manteniendo aceptable calidad.

### 5. Convertir PDF a JPG (extraer imágenes de cada página)

**Toolram:** [PDF a JPG](/pdf-a-jpg) renderiza cada página como imagen con pdf.js. Útil para insertar páginas de PDF en presentaciones de PowerPoint, mockups web, o galerías.

### 6. Convertir imágenes a PDF

**Toolram:** [JPG/PNG a PDF](/imagenes-a-pdf) — seleccionás imágenes, las reordenás, descargás un PDF con cada imagen en una página. Útil para escaneos de comprobantes que querés agrupar.

### 7. Rotar PDF mal orientado

**Toolram:** [Rotar PDF](/rotar-pdf) — aplica rotación 90°/180°/270° a todas las páginas. Útil para escaneos invertidos.

### 8. Agregar marca de agua a PDF

**Toolram:** [Marca de agua PDF](/marca-agua-pdf) — texto diagonal (CONFIDENCIAL, BORRADOR) con opacidad y color configurable. Útil para drafts internos o documentos con copyright.

### 9. Agregar números de página

**Toolram:** [Numerar PDF](/numerar-pdf) — agrega números de página automáticos en todas las páginas. Posición configurable.

### 10. OCR de un PDF escaneado (texto a partir de imágenes)

**Toolram:** parcialmente cubierto via [OCR imagen a texto](/ocr-imagen-texto) (Tesseract.js client-side). Para PDFs con OCR profesional, Adobe Acrobat o ABBYY FineReader siguen siendo superiores.

### 11. Convertir PDF a Word/Excel/PowerPoint

Esta es la operación donde **Toolram aún no compite a nivel profesional**. La conversión PDF → Word con preservación de layout (columnas, tablas, headers) requiere modelos server-side entrenados con millones de docs.

**Para esto sigue ganando Adobe Acrobat ($14.99/mes)** o iLovePDF/SmallPDF (free limitado, después pago).

### 12. Editar texto de un PDF (modificar el contenido)

Tampoco soportado todavía en Toolram. Para edición visual de texto, Adobe Acrobat sigue siendo el estándar. PDFescape (web gratis básico) y Sejda Desktop (offline) son alternativas razonables.

### 13. Proteger un PDF con contraseña

Toolram tiene esto en roadmap Q3-Q4 2026 vía pdf-lib. Por ahora, Adobe Acrobat, PDF24 o macOS Preview (Cmd+P → Save as PDF con password) cubren este caso.

## ¿Cuándo todavía necesitás Adobe Acrobat?

Honestamente:

1. **Formularios PDF interactivos complejos** con cálculos y validaciones
2. **Firma electrónica cualificada** con audit trail enterprise (eIDAS qualified, AATL)
3. **OCR profesional** sobre documentos densos con tablas
4. **PDF/A para archivo legal a largo plazo** con metadatos completos
5. **Edición visual avanzada** del texto y elementos del PDF
6. **Compliance regulatorio** (GDPR, HIPAA con BAA, SOC 2)

Para todo lo demás — 80% de los casos cotidianos — herramientas como Toolram cubren bien y gratis.

## ¿Por qué importa que sea client-side?

Los PDFs muchas veces contienen datos sensibles: contratos con cláusulas confidenciales, estados de cuenta bancarios, recetas médicas, escrituras inmobiliarias. Subir esos archivos a servidores de terceros — aunque digan que los borran a las 2 horas — es un riesgo innecesario cuando el navegador puede procesarlos localmente.

**No es paranoia, es higiene básica de datos en 2026.**

## Próximos pasos

Si tenés una operación PDF específica, andá directo a la tool:

- [Unir PDF](/unir-pdf) · [Dividir PDF](/dividir-pdf) · [Firmar PDF](/firmar-pdf) · [Comprimir PDF](/comprimir-pdf)
- [PDF a JPG](/pdf-a-jpg) · [Imágenes a PDF](/imagenes-a-pdf) · [Rotar PDF](/rotar-pdf) · [Marca de agua PDF](/marca-agua-pdf)
- Ver toda la categoría: [Herramientas PDF](/categoria/pdf)

Si te interesan las alternativas analizadas: [Alternativas a iLovePDF](/alternativas-a-ilovepdf) · [SmallPDF](/alternativas-a-smallpdf) · [Sejda](/alternativas-a-sejda) · [Adobe Acrobat online](/alternativas-a-adobe-acrobat-online).
`,
    faqs: [
      { q: "¿Puedo trabajar con PDF online sin instalar nada?", a: "Sí. Toolram ofrece 13 operaciones sobre PDF que corren 100% en tu navegador via WebAssembly: unir, dividir, firmar, comprimir, rotar, marca de agua, números de página, conversión a JPG, e imágenes a PDF. Sin descargar, sin registro, sin upload de archivos." },
      { q: "¿Es seguro firmar PDFs online?", a: "Depende de DÓNDE se firma. Si la herramienta sube tu PDF a un servidor (la mayoría), tu documento pasa por terceros. Si la herramienta es client-side como Toolram, tu PDF nunca sale de tu computadora — es tan seguro como firmarlo en Adobe instalado." },
      { q: "¿Qué herramientas online de PDF NO recomendarías?", a: "Las que: (a) ponen marca de agua en plan gratis sin advertirlo, (b) requieren registro tras 2 operaciones, (c) cargan muchos trackers de terceros (Tinywow es caso extremo), (d) tienen política de retención vaga ('eliminados a la hora') sin auditoría externa." },
      { q: "¿Cuándo necesito Adobe Acrobat de verdad?", a: "Para formularios complejos con cálculos, firma electrónica cualificada con audit trail, OCR profesional de docs densos, edición visual avanzada de texto, PDF/A para archivo legal, o compliance regulatorio formal (HIPAA, GDPR con DPA). Para todo lo demás, herramientas gratuitas modernas alcanzan." }
    ]
  },

  // ============================================================
  // PILLAR 2 — SEO
  // ============================================================
  {
    slug: "blog/auditoria-seo-tecnica-gratis-2026",
    title: "Cómo hacer una auditoría SEO técnica sin pagar herramientas premium (guía 2026)",
    excerpt: "Las 8 partes de una auditoría SEO técnica completa que podés hacer sin pagar Ahrefs, Semrush o Screaming Frog Premium. Cubre crawlability, indexabilidad, schema, Core Web Vitals, AI search optimization.",
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
    author: "José Gaspard",
    category: "SEO",
    keywords: ["auditoria seo", "seo tecnico", "core web vitals", "schema markup", "seo gratis", "ai search optimization", "geo", "llms.txt", "crawlability"],
    estimatedReadMinutes: 16,
    body: `
## El problema de las "auditorías SEO" en 2026

Si googleás "auditoría SEO gratis", el 90% de los resultados son lead magnets de agencias que escanean 10 páginas y te mandan un PDF con 3 hallazgos genéricos para venderte un retainer mensual.

La verdad es que **una auditoría SEO técnica completa se puede hacer sin pagar nada** — usando solo herramientas gratuitas + Google Search Console + Lighthouse del navegador.

Esta guía cubre las **8 capas** de una auditoría SEO técnica real en 2026, con herramientas concretas para cada una.

## Capa 1: Crawlability

**Pregunta:** ¿Google puede ver y rastrear tu sitio?

**Cosas a verificar:**

1. **robots.txt** — ¿permite a Googlebot? ¿permite a los bots de IA (GPTBot, ClaudeBot, PerplexityBot)?
2. **Sitemap.xml** — ¿existe? ¿está actualizado? ¿no excede 50k URLs por sitemap? ¿está referenciado en robots.txt?
3. **Links internos** — ¿todas las páginas importantes son alcanzables en ≤3 clicks desde home?
4. **Status codes** — ¿hay 404s, 5xxs, redirects en cadena?

**Herramientas gratis:**
- [Generador robots.txt](/generador-robots) — Toolram
- [Generador sitemap XML](/generador-sitemap) — Toolram
- Google Search Console → "Cobertura"
- [SEO Audit API](/api/seo-audit) — verificá una URL contra básicos

## Capa 2: Indexabilidad

**Pregunta:** ¿Las páginas que importan están indexadas?

**Cosas a verificar:**

1. **Meta robots** — ¿hay páginas con \`noindex\` por accidente?
2. **Canonical** — ¿cada página tiene su canonical correcto? ¿no apunta a otra URL incorrectamente?
3. **hreflang** — si tenés versiones multi-idioma, ¿están bien declaradas?
4. **Sitemap submission** — ¿el sitemap está enviado en GSC?
5. **Index Coverage Report** — ¿páginas excluidas? ¿páginas indexadas que no deberían?

**Herramientas:**
- [Generador meta tags](/generador-meta-tags) — Toolram
- [SERP preview](/previsualizador-serp) — visualizá cómo se verá en Google
- Google Search Console → "Indexación de páginas"

## Capa 3: Velocidad y Core Web Vitals

**Pregunta:** ¿Las páginas cargan rápido en mobile?

**Métricas 2026:**

- **LCP** (Largest Contentful Paint) — bueno < 2.5s
- **INP** (Interaction to Next Paint) — bueno < 200ms (reemplazó FID en 2024)
- **CLS** (Cumulative Layout Shift) — bueno < 0.1

**Herramientas:**
- [Test velocidad web](/test-velocidad-web) — Toolram (TTFB + total + size)
- PageSpeed Insights (insights.pageexperience.google) — datos de campo CrUX
- Chrome DevTools → Lighthouse → Performance tab
- Web Vitals Chrome extension

**Lo común:** mobile siempre da peor que desktop. Optimizá mobile-first.

## Capa 4: Schema markup (datos estructurados)

**Pregunta:** ¿Google tiene contexto rico de tus páginas?

**Schemas críticos por tipo de página:**

- **Home/About** → Organization, WebSite, Person
- **Producto** → Product (con offers, aggregateRating si tenés reviews reales)
- **Servicio** → Service o LocalBusiness (si tenés ubicación física)
- **Artículo** → Article o NewsArticle + Person (author) + Organization (publisher)
- **FAQ** → FAQPage
- **HowTo** → HowTo (con steps)
- **Breadcrumbs** → BreadcrumbList

**Herramientas:**
- [Generador FAQ schema](/generador-schema-faq) — Toolram
- Google Rich Results Test (search.google.com/test/rich-results)
- Schema.org validator (validator.schema.org)

**Regla importante:** NO inventar AggregateRating fake. Google detecta inconsistencias y puede penalizar. Solo agregá si tenés reviews reales con sistema de moderación.

## Capa 5: Contenido y E-E-A-T

**Pregunta:** ¿Tu contenido demuestra Experiencia, Expertise, Authoritativeness, Trustworthiness?

**Cosas a verificar:**

1. **Author bylines** — ¿cada artículo tiene un autor identificable con bio?
2. **Author schema** — ¿hay Person schema con sameAs a perfiles externos?
3. **Page de autores** — ¿el autor tiene su propia página con credenciales?
4. **About page** — ¿es robusta? ¿incluye información del equipo, dirección, contacto verificable?
5. **Frescura** — ¿los artículos viejos están actualizados? ¿muestran fecha de update?

**Herramientas:**
- [Densidad de keywords](/densidad-keywords) — Toolram
- [Contador de palabras](/contador-palabras) — Toolram
- [Comparador de textos](/comparador-textos) — detectar duplicación

## Capa 6: Mobile-friendliness

**Pregunta:** ¿Funciona bien en móvil?

**Cosas a verificar:**

1. **Viewport meta tag** — \`<meta name="viewport" content="width=device-width, initial-scale=1">\`
2. **Tap targets** — botones ≥44×44px, no encimados
3. **Font size** — texto ≥16px en mobile
4. **Imágenes responsive** — \`<picture>\` o \`srcset\`
5. **No interstitiales agresivos** — pop-ups que tapan el contenido bajan rankings mobile

**Herramientas:**
- Chrome DevTools → Device Mode
- Lighthouse mobile

## Capa 7: AI Search Optimization (GEO) — la novedad 2026

**Pregunta:** ¿Te aparecés en ChatGPT, Perplexity, Google AI Overviews?

**Cosas nuevas que hacer en 2026:**

1. **llms.txt** — archivo en raíz con resumen del sitio + tools/contenido principal (formato similar a robots.txt pero para LLMs). [Generador llms.txt](/generador-llms-txt) si lo tenés.
2. **Robots.txt con AI bots whitelist** — explícitamente permitir GPTBot, ClaudeBot, PerplexityBot, Bytespider, OAI-SearchBot, ChatGPT-User
3. **Passages citables** — párrafos cortos (50-80 palabras) en blockquote con respuestas directas a "qué es X" y "cómo funciona X" → estos son los formatos que LLMs citan
4. **Person schema con sameAs** — el LLM necesita verificar que sos persona real para citarte
5. **Brand entity** — tu marca debería existir en Wikidata, Crunchbase, GitHub README

## Capa 8: Backlinks y autoridad

**Pregunta:** ¿Quién te linkea?

**Herramientas gratis (limitadas):**
- Google Search Console → Links → Top linking sites
- Ahrefs Webmaster Tools (free tier para tu propio sitio)
- Moz Link Explorer free tier
- [Creador de Backlinks](/creador-backlinks) de Toolram — submission a 40+ servicios SEO que dejan backlinks naturales

## Tu checklist en 1 hora

Si tenés 60 minutos y querés cubrir lo crítico:

1. (5min) Lighthouse mobile de home + 5 páginas top → screenshot scores
2. (10min) GSC: revisar Cobertura, errores 404/5xx, sitemap status
3. (10min) Rich Results Test sobre 5 páginas top → identificar schemas faltantes
4. (10min) PageSpeed Insights mobile sobre home → mirar LCP/INP/CLS
5. (10min) Audit manual: meta titles/descriptions de top 10 páginas (longitud, keywords)
6. (5min) Buscarte por brand en ChatGPT/Perplexity → ¿te citan? ¿con qué tools?
7. (10min) Diff de backlinks: GSC + Ahrefs free → ¿quiénes te linkearon últimos 30 días?

Con eso ya tenés un mapa de los próximos 3 sprints SEO.

## Próximos pasos

- [Test velocidad web](/test-velocidad-web)
- [Analizador de meta tags](/analizador-meta)
- [Densidad de keywords](/densidad-keywords)
- [Creador de Backlinks](/creador-backlinks)
- Ver toda la categoría: [Herramientas SEO](/categoria/seo)
`,
    faqs: [
      { q: "¿Puedo hacer una auditoría SEO sin pagar Ahrefs ni Semrush?", a: "Sí. Google Search Console (gratis) + Lighthouse del navegador (gratis) + las herramientas de Toolram cubren las 8 capas críticas: crawlability, indexabilidad, velocidad, schema, contenido, mobile, AI search optimization, y backlinks. Las tools pagas dan más datos de competencia y backlinks ajenos, pero para auditoría propia, gratis alcanza." },
      { q: "¿Qué es GEO (Generative Engine Optimization) y cómo se diferencia del SEO clásico?", a: "GEO optimiza para aparecer citado en respuestas de IA (ChatGPT, Perplexity, Google AI Overviews) en lugar de solo aparecer en los 10 resultados azules. Requiere: passages citables (párrafos cortos con respuestas directas), Person/Organization schema robusto, llms.txt, robots.txt con AI bots explícitamente permitidos, y brand entity registrada en Wikidata/Crunchbase." },
      { q: "¿Importa el INP (Interaction to Next Paint) más que FID?", a: "Sí. INP reemplazó FID como métrica Core Web Vital en marzo 2024. INP mide la latencia de TODAS las interacciones de la página (clicks, teclas, taps), no solo la primera. Bueno < 200ms, malo > 500ms. Es más estricto que FID y más representativo de la experiencia real del usuario." },
      { q: "¿Debería inventar reviews para schema AggregateRating?", a: "NO. Google detecta inconsistencias entre tu schema y la realidad (ej: AggregateRating con ratingValue 5.0/127 pero página sin reviews visibles) y puede dar una manual action por structured data spam. Solo agregá AggregateRating si tenés sistema real de reviews con moderación, y mostralos visualmente en la página." }
    ]
  },

  // ============================================================
  // PILLAR 3 — DEV
  // ============================================================
  {
    slug: "blog/herramientas-desarrolladores-online-2026",
    title: "20 herramientas online imprescindibles para desarrolladores en 2026 (todas client-side)",
    excerpt: "JSON formatter, Base64, hashes, JWT decoder, UUID generator, regex tester, diff checker — las 20 herramientas que todo dev abre 10 veces por semana, ejecutándose 100% en tu navegador.",
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
    author: "José Gaspard",
    category: "Desarrollador",
    keywords: ["herramientas desarrollador", "json formatter", "base64 decoder", "jwt decoder", "uuid generator", "regex tester", "dev tools online", "hash generator"],
    estimatedReadMinutes: 12,
    body: `
## El problema: los dev tools online "típicos" exponen tus datos

Cuando un dev necesita decodificar un JWT con un access_token de producción, lo natural es pegarlo en jwt.io. Cuando necesita validar un JSON con un payload de API privada, lo pega en jsonlint.com.

El problema: **esos sitios procesan tu data en sus servidores**. Si pegaste un JWT con info sensible, podría quedar en logs. Si pegaste un payload con datos de cliente, salió de tu control.

En 2026 esto es evitable. Las APIs modernas del navegador (Web Crypto, TextEncoder, structuredClone, Web Workers) permiten ejecutar 90% de las dev tools 100% client-side. Esta lista cubre las 20 más usadas — todas privacy-first.

## Las 20 herramientas

### Formato y validación

1. **[JSON Formatter](/json-formatter)** — valida, prettifica e indenta JSON. Detecta errores con línea exacta.
2. **[JSON ↔ CSV](/json-csv-converter)** — conversión bidireccional con headers y delimitadores configurables.
3. **[YAML ↔ JSON](/yaml-json-converter)** — conversión bidireccional para configs Kubernetes/Ansible.
4. **[XML ↔ JSON](/xml-json-converter)** — útil para APIs SOAP legacy o configs Maven.
5. **[CSS Formatter](/css-formatter)** — pretty-print + minify para CSS.
6. **[HTML Formatter](/html-formatter)** — beautify + minify HTML preservando strings.
7. **[JS/TS Formatter](/js-formatter)** — formato JS con manejo correcto de template literals.
8. **[SQL Formatter](/sql-formatter)** — pretty-print queries SQL para code review.

### Encoding y hashing

9. **[Base64 encode/decode](/base64-encode)** — soporta UTF-8 (emojis, acentos).
10. **[URL encode/decode](/url-encode)** — percent-encoding para query strings.
11. **[Hash MD5/SHA-1/SHA-256/SHA-512](/hash-md5-sha)** — Web Crypto API (cero servidor).
12. **[Binario ↔ Decimal/Hex/ASCII](/binario-texto)** — conversión entre bases numéricas.
13. **[Números romanos](/numeros-romanos)** — bidireccional 1-3999.

### IDs y generadores

14. **[UUID Generator](/generador-uuid)** — UUID v4 (random), v7 (time-orderable) próximamente.
15. **[Password Generator](/generador-passwords)** — Web Crypto, hasta 64 chars, configurable.
16. **[Slug Generator](/slug-generator)** — convierte títulos a URL slugs SEO-friendly.
17. **[Anchor Text Generator](/anchor-text)** — 21 variaciones de anchor text para link building.

### Inspección y debugging

18. **[JWT Decoder](/jwt-decoder)** — separa las 3 partes del JWT y decodifica el payload (sin verificar firma).
19. **[Diff Checker](/diff-checker)** — compara dos textos línea por línea con highlighting.
20. **[Validador de email + MX](/validador-email)** — sintaxis + lookup MX records via DNS over HTTPS.

### Bonus: Network

- **[Subnet calculator CIDR](/subnet-calculator)** — IP ranges, máscaras, hosts útiles.
- **[MAC Generator](/mac-generator)** — random MAC addresses para testing.
- **[Mock Data Faker](/mock-data-faker)** — genera datos fake (nombres, emails, addresses) para tests.

## ¿Cuáles realmente NO pueden ser client-side?

Para honestidad técnica, algunas operaciones de dev SÍ requieren servidor o API externa:

- **DNS lookup público completo** (más allá de DoH): requiere acceso a queries DNS arbitrarias
- **WHOIS lookup**: requiere conexión a registries
- **HTTP request tester** (tipo curl/Postman): el navegador bloquea cross-origin sin CORS
- **Scrapping/crawling**: requiere proxy server
- **OCR con modelos muy pesados**: Tesseract.js corre client-side pero modelos enterprise (Google Vision, AWS Textract) son server-side

Para esos casos, Toolram ofrece endpoints API mínimos (\`/api/seo-audit\`, \`/api/speed-test\`) corriendo en Vercel Edge — sin guardar tus datos.

## ¿Por qué importa el privacy-first para devs?

Tres razones concretas:

1. **Tokens y credenciales** — JWT decoders típicos pueden loggear el token. Si era válido, te lo robaron.
2. **Datos de cliente** — pegar un payload con info de usuarios en jsonlint.com puede violar GDPR/HIPAA.
3. **Código privado** — formatear código propietario en sitios online lo expone potencialmente.

## Próximos pasos

- Ver toda la categoría: [Herramientas Desarrollador](/categoria/desarrollador) (27 tools)
- Si te interesa Open Source: el código de Toolram está en [GitHub MIT](https://github.com/ThatBasherAgency/toolram)
`,
    faqs: [
      { q: "¿Por qué importa que un JSON formatter sea client-side?", a: "Porque los payloads de API frecuentemente contienen datos sensibles (tokens, IDs de usuario, info personal). Si los pegás en un sitio que procesa server-side, esos datos podrían quedar en logs del servicio. Toolram procesa con el JSON.parse nativo del navegador — el JSON nunca sale de tu computadora." },
      { q: "¿Es seguro decodificar JWTs en sitios online?", a: "Solo si son CLIENT-SIDE. jwt.io y similares procesan server-side — si pegás un token válido, queda potencialmente expuesto. Toolram decodifica el JWT con string.split() + atob() en tu navegador. Igual: NUNCA pegues tokens de producción válidos en ninguna herramienta online, ni siquiera client-side — siempre puede haber un MITM o extension maliciosa." },
      { q: "¿Por qué hay tantos formatters de cada lenguaje en lugar de uno solo?", a: "Cada lenguaje tiene reglas particulares: JSON tiene strings con comillas dobles obligatorias, YAML usa indentación significativa, SQL tiene keywords mayúsculas, HTML tiene tags self-closing. Un formatter genérico falla en casos edge de cada uno. Toolram tiene formatters específicos por lenguaje con parsers dedicados." }
    ]
  },

  // ============================================================
  // PILLAR 4 — Calculadoras / Finanzas
  // ============================================================
  {
    slug: "blog/calculadoras-financieras-imc-imc-2026",
    title: "15 calculadoras útiles que necesitarás en 2026: financieras, salud, conversiones",
    excerpt: "Interés compuesto, IMC, IVA, propina, préstamo francés, calorías, embarazo, edad, descuento — las calculadoras más usadas en LATAM con fórmulas explicadas.",
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
    author: "José Gaspard",
    category: "Calculadoras",
    keywords: ["calculadora imc", "interes compuesto", "calculadora iva", "calculadora prestamo", "calculadora embarazo", "calculadora propina", "calculadora descuento"],
    estimatedReadMinutes: 11,
    body: `
## ¿Por qué cobré tan poco de propina? ¿Cómo se calcula la cuota de mi préstamo?

Hay 15 cálculos que la gente busca repetidamente en Google. Calculadora de IMC, interés compuesto, IVA por país, edad exacta, propina restaurante, descuento porcentual, préstamo francés, calorías diarias (TDEE).

Esta guía cubre las 15 calculadoras más usadas en LATAM en 2026, con fórmulas explicadas y links directos a cada una en Toolram.

## Salud y bienestar

### 1. IMC (Índice de Masa Corporal)

\`IMC = peso (kg) / altura² (m²)\`

Rangos OMS:
- < 18.5 → bajo peso
- 18.5 – 24.9 → normal
- 25 – 29.9 → sobrepeso
- 30 – 34.9 → obesidad I
- 35 – 39.9 → obesidad II
- ≥ 40 → obesidad III

**Limitación importante:** el IMC no diferencia músculo de grasa. Un atleta puede tener IMC 28 sin ser obeso. Es una guía inicial, no un diagnóstico.

→ [Calculadora IMC](/calculadora-imc)

### 2. Calorías diarias (TDEE)

TDEE = BMR × factor de actividad (1.2 sedentario, 1.55 activo, 1.9 muy activo).

BMR (Mifflin-St Jeor 1990):
- Hombre: 10×peso + 6.25×altura − 5×edad + 5
- Mujer: 10×peso + 6.25×altura − 5×edad − 161

→ [Calculadora TDEE / calorías](/calculadora-calorias)

### 3. Calculadora de embarazo / semanas de gestación

Calcula edad gestacional desde la fecha de último período (FUM) y proyecta fecha probable de parto (regla de Naegele: FUM + 280 días).

→ [Calculadora de embarazo](/calculadora-embarazo)

### 4. Edad exacta

Diferencia exacta entre dos fechas en años, meses, días, horas y minutos.

→ [Calculadora de edad](/calculadora-edad)

## Finanzas personales

### 5. Interés compuesto

\`A = P × (1 + r/n)^(nt)\`

Donde:
- A = monto final
- P = principal (capital inicial)
- r = tasa anual decimal (5% = 0.05)
- n = veces que se compone por año (12 si es mensual, 1 si es anual)
- t = años

Toolram también suma aportes periódicos: \`A = P(1+r/n)^(nt) + PMT × [((1+r/n)^(nt) - 1) / (r/n)]\`

→ [Interés compuesto](/interes-compuesto)

### 6. Préstamo (sistema francés)

\`Cuota = P × [r(1+r)^n] / [(1+r)^n − 1]\`

Cuota fija mensual, donde la proporción interés/capital cambia: al principio pagás mucho interés y poco capital, al final al revés.

→ [Calculadora de préstamo](/calculadora-prestamo)

### 7. IVA por país

Tasas LATAM/ES en 2026:

- 🇲🇽 México: 16% general / 8% frontera norte
- 🇦🇷 Argentina: 21% general / 10.5% alimentos básicos
- 🇪🇸 España: 21% general / 10% reducido / 4% superreducido
- 🇨🇴 Colombia: 19% general
- 🇨🇱 Chile: 19% general
- 🇵🇪 Perú: 18% (IGV)
- 🇺🇾 Uruguay: 22% / 10% reducido

Toolram calcula: precio neto → con IVA, o precio con IVA → desglose neto + IVA.

→ [Calculadora IVA](/calculadora-iva) · [IVA México](/calculadora-iva-mexico)

### 8. Salario hora ↔ anual

Conversión entre todas las frecuencias salariales: hora ↔ día ↔ semana ↔ mes ↔ año. Útil para comparar ofertas de trabajo o pricing de freelance.

→ [Salario hora/anual](/salario-hora-anual)

## Conversiones rápidas

### 9. Descuento porcentual

Precio final tras descuento: \`Final = Original × (1 - descuento/100)\`

Descuento compuesto (ej: 30% + 15% adicional): \`Final = Original × (1 - d1/100) × (1 - d2/100)\` — NO es 45% combinado, es 40.5%.

→ [Calculadora de descuento](/calculadora-descuento)

### 10. Propina

\`Propina = Cuenta × (porcentaje/100)\`

Reglas comunes:
- Estados Unidos: 18-25%
- México: 10-15%
- España: 5-10% (opcional)
- Argentina: 10%

Toolram divide propina entre N personas también.

→ [Calculadora de propina](/calculadora-propina)

### 11. Regla de tres

Clásica regla de proporcionalidad: si A=B, ¿cuánto vale C? \`X = (B × C) / A\`

→ [Regla de tres](/calculadora-regla-tres)

### 12. Porcentaje

¿Qué porcentaje es X de Y? ¿Cuánto es X% de Y? ¿Cuál es el cambio porcentual de A a B?

→ [Calculadora de porcentaje](/calculadora-porcentaje)

### 13. Conversión de temperatura

Celsius ↔ Fahrenheit ↔ Kelvin con fórmulas:
- F = C × 9/5 + 32
- K = C + 273.15

→ [Conversor de temperatura](/conversor-temperatura)

### 14. Conversor de zonas horarias

Convierte hora entre 19 ciudades de LATAM, España, USA y Asia. Útil para meetings globales o calls con clientes en otra zona.

→ [Conversor zonas horarias](/conversor-zonas-horarias)

### 15. Días entre fechas

Cuenta días, semanas, meses entre dos fechas. Útil para tracking de proyectos, deadlines o tiempo desde un evento.

→ [Días entre fechas](/dias-entre-fechas)

## Próximos pasos

Ver todas las 16 calculadoras: [/calculadoras](/calculadoras)
`,
    faqs: [
      { q: "¿El IMC es preciso para todos?", a: "No. El IMC asume composición corporal promedio (mix grasa/músculo). Para atletas con mucha masa muscular, infraestima la salud (los marca como sobrepeso/obesos cuando no lo son). Para adultos mayores con sarcopenia, sobreestima (los marca como normales cuando tienen baja masa muscular). Es una guía inicial, no un diagnóstico." },
      { q: "¿Cuál es la fórmula del interés compuesto con aportes mensuales?", a: "A = P(1+r/n)^(nt) + PMT × [((1+r/n)^(nt) - 1) / (r/n)]. Donde P=capital inicial, r=tasa anual decimal, n=compounding por año (12 mensual), t=años, PMT=aporte periódico. Toolram lo calcula con todos esos inputs." },
      { q: "¿Por qué dos descuentos seguidos no se suman?", a: "Porque el segundo descuento se aplica sobre el monto YA descontado, no sobre el original. 30% + 15% adicional sobre $100 = $100 × 0.70 × 0.85 = $59.50 (descuento efectivo 40.5%), NO $55 (45%). Toolram tiene una opción de descuento compuesto para calcular esto correctamente." }
    ]
  },

  // ============================================================
  // PILLAR 5 — Símbolos
  // ============================================================
  {
    slug: "blog/simbolos-copiar-pegar-unicode-2026",
    title: "Símbolos Unicode para copiar y pegar (2026): corazones, estrellas, flechas, matemáticos",
    excerpt: "Guía completa de símbolos Unicode para WhatsApp, Instagram, TikTok bio y email. 200+ símbolos organizados, con códigos HTML/CSS y compatibilidad en apps.",
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
    author: "José Gaspard",
    category: "Símbolos",
    keywords: ["simbolos copiar pegar", "simbolos unicode", "corazones para copiar", "estrellas unicode", "simbolos para whatsapp", "simbolos instagram"],
    estimatedReadMinutes: 8,
    body: `
## Por qué Unicode importa más de lo que parece

Cuando ponés ❤ o ★ en tu bio de Instagram, no estás usando una "imagen". Estás usando un **carácter Unicode** — la misma tecnología que permite que existan los emojis, el chino, el árabe, los acentos y los kaomoji japoneses.

Unicode 16.0 (lanzado 2024) define **154,998 caracteres** en 168 sistemas de escritura. La mayoría son letras de idiomas, pero hay miles de símbolos decorativos que funcionan como "fuentes especiales" en cualquier app moderna.

Esta guía cubre los 8 grupos más populares: dónde funcionan, cómo copiarlos, y cómo usarlos en HTML/CSS.

## Los 8 grupos más usados

### ❤ Corazones (25+)

♥ ♡ ❤ ❣ ❥ 💕 💖 💗 💘 💙 💚 💛 💜 🖤 🤍 🤎 🧡 💝 💞 💟 💌 💔 💓 ❦ ❧

[Ver todos](/simbolos/corazones)

### ⭐ Estrellas (22+)

★ ☆ ✦ ✧ ✩ ✪ ✫ ✬ ✭ ✮ ✯ ✰ ⭐ 🌟 ✨ 💫 ⋆ ✱ ✲ ❋ ✴ ✵

[Ver todas](/simbolos/estrellas)

### ➡ Flechas (27+)

← → ↑ ↓ ↔ ↕ ↖ ↗ ↘ ↙ ⇐ ⇒ ⇑ ⇓ ⇔ ↩ ↪ ⤴ ⤵ ⬅ ➡ ⬆ ⬇ ➜ ➤ ➔ ➢

[Ver todas](/simbolos/flechas)

### ∑ Matemáticos (30+)

∑ ∏ ∫ √ ∞ ≈ ≠ ≤ ≥ ± × ÷ π Σ Δ α β γ θ λ μ Ω ∂ ∇ ∈ ∉ ⊂ ⊃ ∪ ∩

[Ver todos](/simbolos/matematicos)

### 💲 Moneda (15+)

$ € £ ¥ ₹ ₽ ₿ ₩ ¢ ₱ ₪ ₫ ₴ ₸ ₺

[Ver todos](/simbolos/moneda)

### ♪ Música (7)

♩ ♪ ♫ ♬ ♭ ♮ ♯

[Ver todos](/simbolos/musica)

### ✓ Check y cruz (10)

✓ ✔ ✗ ✘ ☑ ☒ ☐ ✅ ❌ ❎

[Ver todos](/simbolos/check-cross)

### ʕ•ᴥ•ʔ Lenny Faces / Kaomoji (15+)

( ͡° ͜ʖ ͡°) ( ͡~ ͜ʖ ͡°) ( ͠° ͟ʖ ͡°) ( ͡ᵔ ͜ʖ ͡ᵔ) ಠ_ಠ ¬‿¬ ʕ•ᴥ•ʔ (╯°□°)╯︵ ┻━┻ ┬─┬ノ( º _ ºノ) (づ｡◕‿‿◕｡)づ ヽ(´▽\`)/ ಥ_ಥ (ʘ‿ʘ) (◕‿◕) (─‿‿─)

[Ver todos](/simbolos/lenny-faces)

## ¿Cómo se copian?

### Desde Toolram

1. Andá a la categoría que querés ([corazones](/simbolos/corazones), [estrellas](/simbolos/estrellas), etc.)
2. Click sobre el símbolo → se copia automáticamente al portapapeles
3. Pegá en WhatsApp/Instagram/Word/email con Ctrl+V (Cmd+V en Mac)

### En HTML

\`\`\`html
<p>Te quiero &#x2764; (corazón)</p>
<p>Mira la estrella &#x2B50;</p>
\`\`\`

Donde el código hex viene del Unicode oficial (ej: U+2764 → \`&#x2764;\`).

### En CSS (pseudo-elementos)

\`\`\`css
.star::before {
  content: "\\2B50"; /* la barra invertida + hex code */
}
\`\`\`

## ¿Funciona en todas las apps?

**Sí, en cualquier app moderna que soporte Unicode 16+**: WhatsApp, Instagram, Twitter/X, Discord, TikTok bio, Word, Google Docs, Slack, Notion, email.

**Si aparece como cuadrado vacío (☐):**
- La fuente del dispositivo NO incluye ese carácter
- Solución: actualizá la app o instalá una fuente Unicode completa (Noto Sans, Symbola)

## Casos de uso comunes

- **Instagram bio**: 5-10 corazones, estrellas y flechas para destacar
- **TikTok username**: símbolos decorativos para diferenciarse
- **Currículum o LinkedIn**: ✓ para skills, → para flujos
- **WhatsApp business**: ❤ ⭐ para resaltar reviews positivas
- **Notas matemáticas**: ∑ ∫ √ π en lugar de imágenes
- **Email signature**: ✦ ❦ ❧ como ornamento minimalista

## Próximos pasos

- [Ver todas las categorías de símbolos](/simbolos)
- [Generador de texto decorado (fancy text)](/texto-decorado) — 25 estilos como 𝓮𝓼𝓽𝓮 o ＴＨＩＳ o ᴛʜɪs
`,
    faqs: [
      { q: "¿Funcionan los símbolos Unicode en WhatsApp e Instagram?", a: "Sí. WhatsApp e Instagram soportan Unicode completo desde hace años. Cualquier símbolo de las 8 categorías de Toolram (corazones, estrellas, flechas, matemáticos, moneda, música, check/cruz, kaomoji) se copia y pega sin problemas. Si aparece como cuadrado vacío, es porque la fuente del dispositivo no incluye ese carácter — probá con otro dispositivo." },
      { q: "¿Cuál es la diferencia entre emoji y símbolo Unicode?", a: "Los emojis (❤️) son un subset de Unicode con representación gráfica color obligatoria. Los símbolos (❤) son caracteres Unicode más básicos que se renderizan en blanco/negro con la tipografía actual. La diferencia visible: emojis siempre tienen color, símbolos toman el color del texto." },
      { q: "¿Puedo usar símbolos Unicode en mi código HTML?", a: "Sí, de dos formas: pegándolos directamente en el HTML (asegurate que tu archivo esté en UTF-8) o usando entidades HTML como &#x2764; (hex) o &#10084; (decimal). Para CSS pseudo-elementos: content: \"\\2764\" con la barra invertida + código hex." }
    ]
  },

  // ============================================================
  // PILLAR 6 — Imágenes
  // ============================================================
  {
    slug: "blog/edicion-imagenes-online-gratis-2026",
    title: "Edición de imágenes online gratis en 2026: 10 operaciones sin Photoshop",
    excerpt: "Quitar fondo con IA, comprimir, convertir formato, redimensionar, marca de agua, recortar — las 10 operaciones más útiles sobre imágenes hechas client-side.",
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
    author: "José Gaspard",
    category: "Imágenes",
    keywords: ["editar imagen online", "quitar fondo imagen", "comprimir imagen", "convertir imagen", "redimensionar imagen", "marca de agua imagen"],
    estimatedReadMinutes: 9,
    body: `
## El estado de la edición de imágenes en 2026

Photoshop sigue siendo el estándar profesional, pero para 80% de los casos diarios (subir productos a Mercado Libre, hacer thumbnails para YouTube, comprimir fotos para WhatsApp, quitar fondo de un retrato) hay alternativas gratuitas que corren en el navegador.

Las APIs modernas — Canvas API, WebAssembly, WebGPU para modelos AI — permiten hacer operaciones que hace 5 años requerían software de escritorio.

## Las 10 operaciones más útiles

### 1. Quitar fondo de imagen automáticamente (AI)

Antes: cargar en Photoshop, usar "Selección rápida", refinar el borde durante 20 minutos.

2026: subir a [Quitar fondo de imagen](/quitar-fondo-imagen) → click → descargar PNG transparente. El modelo U²-Net corre en tu navegador con WebAssembly.

### 2. Comprimir imagen (JPG/PNG/WebP)

Reduce 60-90% el peso del archivo manteniendo calidad visual aceptable. Crítico para:
- Mejorar Core Web Vitals (LCP)
- Bajar el bill de Cloudflare/Cloudinary
- Hacer fotos email-friendly

→ [Comprimir imagen](/comprimir-imagen)

### 3. Convertir entre formatos

JPG ↔ PNG ↔ WebP ↔ AVIF. Cuándo usar cada uno:

- **JPG** — fotos sin transparencia
- **PNG** — logos, screenshots, transparencia
- **WebP** — formato moderno Google, 25-35% más liviano que JPG
- **AVIF** — más eficiente que WebP, soporte aún limitado

→ [Convertir imagen](/convertir-imagen)

### 4. Redimensionar a dimensiones exactas

Útil para thumbnails específicas (Instagram: 1080×1080, YouTube: 1280×720, OG image: 1200×630).

→ [Redimensionar imagen](/redimensionar-imagen)

### 5. Recortar imagen

Crop a aspect ratio específico (1:1, 16:9, 4:3, libre).

→ [Recortar imagen](/recortar-imagen)

### 6. Agregar marca de agua

Texto o imagen como marca de agua, posición y opacidad configurables. Útil para fotos de portfolio o productos.

→ [Marca de agua imagen](/marca-agua-imagen)

### 7. Rotar / voltear

Rotar 90°/180°/270° o voltear horizontal/vertical.

→ [Rotar imagen](/rotar-imagen)

### 8. Aplicar filtros (B&N, sepia, vintage, polaroid)

10 presets clásicos sin necesidad de Lightroom.

→ [Filtros de imagen](/filtros-imagen)

### 9. Convertir imagen a PDF

Junta múltiples imágenes en un solo PDF. Útil para escanear documentos con el teléfono y armar un PDF.

→ [Imágenes a PDF](/imagenes-a-pdf)

### 10. Descargar thumbnail de YouTube

Descarga thumbnails de cualquier video YouTube en 5 calidades. Útil para mockups, blog hero images o estudios competitivos.

→ [YouTube thumbnail downloader](/youtube-thumbnail)

## ¿Cuándo todavía necesitás Photoshop?

- Edición avanzada con capas y máscaras complejas
- Color grading profesional
- Retoque facial detallado
- Composiciones con múltiples elementos
- Trabajo profesional con licencias y entrega a clientes (workflow industria)

Para todo lo demás — 90% de casos cotidianos — las tools online cubren bien y gratis.

## ¿Por qué client-side para imágenes?

Tres casos donde importa especialmente:

1. **Fotos privadas** (familiares, personales) — no querés subirlas a un server random
2. **Productos pre-lanzamiento** — fotos confidenciales antes del launch comercial
3. **Documentos escaneados** — DNI, pasaporte, contratos con datos personales

Toolram procesa todo localmente con Canvas API + WebAssembly.

## Próximos pasos

- Ver toda la categoría: [Herramientas de imagen](/categoria/imagenes)
- También útil: [PDF a JPG](/pdf-a-jpg) e [Imágenes a PDF](/imagenes-a-pdf)
`,
    faqs: [
      { q: "¿La herramienta de quitar fondo de Toolram funciona offline?", a: "Sí, después de la primera carga. El modelo U²-Net (~13MB) se descarga la primera vez y se cachea en tu navegador. Las siguientes veces funciona sin conexión. Las imágenes nunca se suben a un servidor, todo el procesamiento ocurre localmente con WebAssembly." },
      { q: "¿Qué formato de imagen conviene usar en 2026: JPG, PNG, WebP o AVIF?", a: "Depende del caso: JPG para fotos sin transparencia, PNG para logos/transparencia, WebP como default moderno (25-35% más liviano que JPG, soportado por todos los browsers modernos), AVIF para casos donde el peso es crítico y aceptás soporte limitado. Toolram convierte entre los 4 formatos." },
      { q: "¿Cuándo usar Photoshop en lugar de Toolram?", a: "Para edición avanzada con capas múltiples, color grading profesional, retoque facial detallado, composiciones complejas con varios elementos, o trabajo profesional con workflows de entrega cliente. Para 90% de casos cotidianos (comprimir, quitar fondo, convertir, recortar), Toolram alcanza." }
    ]
  },

  // ============================================================
  // PILLAR 7 — Generadores
  // ============================================================
  {
    slug: "blog/generadores-online-utiles-2026",
    title: "15 generadores online que necesitarás en 2026: QR, passwords, UUID, captions, nombres",
    excerpt: "Generadores de QR (URL/WiFi/vCard), passwords seguros, UUIDs, captions de redes sociales, nombres de empresa, favicons, citas APA/MLA, anchor text.",
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
    author: "José Gaspard",
    category: "Generadores",
    keywords: ["generador qr", "generador password", "generador uuid", "generador caption", "generador nombre empresa", "generador favicon", "generador anchor text"],
    estimatedReadMinutes: 8,
    body: `
## ¿Para qué necesito un generador?

A veces hace falta crear algo desde cero: un password seguro, un UUID para tu base de datos, un QR para WiFi del Airbnb, un caption con hashtags para Instagram, un nombre para una empresa nueva, un favicon a partir de tu logo.

Esta lista cubre los 15 generadores que más se usan, todos corriendo en tu navegador.

## Los 15 generadores

### Seguridad

1. **[Password generator](/generador-passwords)** — hasta 64 chars, Web Crypto API, configurable
2. **[Hash generator](/hash-md5-sha)** — MD5/SHA-1/SHA-256/SHA-512

### IDs y datos técnicos

3. **[UUID generator](/generador-uuid)** — v4 random, próximamente v7 time-orderable
4. **[Mock data faker](/mock-data-faker)** — nombres, emails, addresses falsos para tests

### QR y códigos

5. **[QR generator](/generador-qr)** — URL, texto, WiFi, vCard, SMS, email
6. **[WiFi QR](/wifi-qr)** — específico para credenciales WiFi (auto-conecta iOS/Android)
7. **[WhatsApp link](/generador-whatsapp-link)** — wa.me/{numero}?text={mensaje} + botón HTML + QR
8. **[Barcode generator](/barcode-generator)** — EAN, UPC, Code 128 y más

### Redes sociales y contenido

9. **[Caption generator](/caption-generator)** — captions optimizados para IG/TT/LinkedIn/X con hashtags
10. **[YouTube tags](/youtube-tags-generator)** — tags relevantes para descripción de video
11. **[Username generator](/generador-username)** — 8 estilos incluyendo 1337
12. **[Logo de texto](/generador-logo-texto)** — logos minimalistas con texto en 6 estilos canvas

### Negocios y branding

13. **[Nombre de empresa](/generador-nombre-empresa)** — combinaciones para startup/marca
14. **[Tagline generator](/generador-tagline)** — slogans para marcas
15. **[Favicon multi-tamaño](/generador-favicon)** — 16-512px, formas, texto o imagen

### SEO

16. **[Slug generator](/slug-generator)** — URL slugs SEO-friendly
17. **[Anchor text](/anchor-text)** — 21 variaciones para link building
18. **[Meta tags](/generador-meta-tags)** — title + description + OG + Twitter

### Académicos

19. **[Citas APA/MLA/Chicago/Harvard](/citas-apa-mla)** — citas bibliográficas

### Random

20. **[Lorem Ipsum](/lorem-ipsum)** — texto placeholder

## ¿Por qué importa que sean client-side?

Tres casos donde aplica:

1. **Passwords**: el password generado en server podría loggearse. Toolram lo genera con \`crypto.getRandomValues()\` localmente — ni siquiera Toolram lo "ve".

2. **QR de WiFi**: tu password de WiFi nunca llega a Toolram (los QR generados por servicios típicos mandan SSID+password a su backend).

3. **vCard / mock data con info personal**: si generás cards con nombres/emails para tests, mejor que no salgan de tu computadora.

## Próximos pasos

- Ver toda la categoría: [Generadores](/categoria/generators)
- Para SEO específicamente: [Herramientas SEO](/categoria/seo)
`,
    faqs: [
      { q: "¿Los passwords generados por Toolram son realmente aleatorios?", a: "Sí, usa crypto.getRandomValues() de la Web Crypto API — entropía del sistema operativo, no el predecible Math.random(). Un password de 16 caracteres generado así tiene ~95 bits de entropía, requiere miles de años de cómputo para forzar." },
      { q: "¿Por qué el QR de WiFi auto-conecta el teléfono?", a: "Porque sigue un formato estándar (WIFI:T:WPA;S:nombre;P:clave;;) que iOS 11+ y Android 10+ reconocen nativamente. Al escanear con la cámara, el sistema operativo ofrece conectarse sin pedir la clave manualmente." },
      { q: "¿Cuál UUID generar: v4 o v7?", a: "v4 (random) es el estándar actual y suficiente para 99% de casos. v7 (time-orderable) es nuevo y útil para databases donde querés que el UUID sea ordenable por tiempo de creación (mejor para índices). Toolram empieza con v4 y agregará v7 en próxima wave." }
    ]
  },

  // ============================================================
  // SATELLITE 1 — PDF
  // ============================================================
  {
    slug: "blog/como-comprimir-pdf-sin-perder-calidad-2026",
    title: "Cómo comprimir un PDF sin perder calidad en 2026 (4 métodos comparados)",
    excerpt: "Comparativa real de 4 métodos para comprimir PDFs: navegador (Toolram), Adobe Acrobat, ghostscript (Linux/Mac terminal) y servicios online. Pros, contras, qué tanto reduce cada uno.",
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
    author: "José Gaspard",
    category: "PDF",
    keywords: ["comprimir pdf", "reducir tamaño pdf", "pdf pesa mucho", "como comprimir pdf"],
    estimatedReadMinutes: 6,
    body: `
## Por qué tu PDF pesa 25 MB

La mayoría de PDFs grandes son grandes por la misma razón: **imágenes embedded sin comprimir**. Un escaneo en color a 300 DPI puede pesar 5 MB por página. Si tu PDF tiene 5 páginas escaneadas, ya estás en 25 MB.

Hay 4 métodos reales para reducir ese peso. Esta nota los compara honestamente.

## Método 1: Toolram (cliente-side, en el navegador)

→ [Comprimir PDF](/comprimir-pdf)

**Cómo funciona:** pdf-lib re-encoda imágenes embedded (downsample + JPEG compression) y remueve metadata redundante.

**Reducción típica:** 40-70%.

**Ventajas:**
- Gratis, sin registro
- Procesamiento local (tu PDF nunca se sube)
- Inmediato

**Limitaciones:**
- Compresión menos agresiva que Adobe o ghostscript
- No hace OCR ni reduce calidad de fonts

## Método 2: Adobe Acrobat (pago, $14.99/mes)

**Cómo funciona:** algoritmos propietarios + opción de comprimir a "tamaño mínimo" o "calidad óptima".

**Reducción típica:** 70-90% en modo agresivo.

**Ventajas:**
- Mejor compresión del mercado
- Preserva calidad visual incluso en modo agresivo
- Integración con flujos enterprise

**Limitaciones:**
- $14.99/mes
- Sube a Adobe Cloud (privacy concern)

## Método 3: ghostscript (terminal Linux/Mac)

Para devs que ya tienen ghostscript instalado:

\`\`\`bash
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \\
   -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH \\
   -sOutputFile=output.pdf input.pdf
\`\`\`

Niveles de \`-dPDFSETTINGS\`:
- \`/screen\` — máxima compresión, calidad baja (72 DPI)
- \`/ebook\` — balance recomendado (150 DPI)
- \`/printer\` — alta calidad (300 DPI)
- \`/prepress\` — calidad máxima

**Reducción típica:** 60-80% en /ebook.

**Ventajas:**
- Open source, totalmente offline
- Control fino sobre parámetros
- Batch processing trivial

**Limitaciones:**
- Requiere terminal
- No es para usuarios no-técnicos

## Método 4: Servicios online (iLovePDF, SmallPDF, PDF24)

**Reducción típica:** 50-80%.

**Ventajas:**
- Fácil, sin instalación

**Limitaciones:**
- Suben tu archivo a sus servidores (privacy concern)
- Marca de agua en algunos plan free
- Límites de tamaño o tareas diarias

## Comparativa rápida

| Método | Reducción | Privacy | Precio | UX |
|--------|-----------|---------|--------|----|
| Toolram | 40-70% | ✅ Local | Gratis | ⭐⭐⭐⭐⭐ |
| Adobe Acrobat | 70-90% | ❌ Cloud | $14.99/mes | ⭐⭐⭐⭐⭐ |
| ghostscript | 60-80% | ✅ Local | Gratis | ⭐⭐ (CLI) |
| Online (iLovePDF etc) | 50-80% | ❌ Server | Free/Pago | ⭐⭐⭐⭐ |

## ¿Cuál elegir?

- **Privacy + gratis + simple** → Toolram
- **Máxima compresión + tenés Adobe** → Adobe Acrobat
- **Sos developer + tenés terminal** → ghostscript
- **Batch grande + no te importa privacy** → iLovePDF Pro

## Próximos pasos

- [Comprimir PDF en Toolram](/comprimir-pdf)
- Si tu objetivo es solo enviar por email, considerá [Unir PDF](/unir-pdf) + comprimir
- Ver más sobre PDF: [Guía completa PDF online 2026](/blog/guia-completa-pdf-online-2026)
`,
    faqs: [
      { q: "¿Comprimir un PDF baja la calidad de las imágenes?", a: "Depende del modo. Compresión conservadora (40-50% reducción) mantiene calidad visual casi idéntica. Compresión agresiva (70-90%) puede notarse en fotos detalladas pero es invisible en gráficos/texto. Toolram usa modo conservador por default." },
      { q: "¿Cuánto puedo comprimir un PDF que tiene solo texto?", a: "Poco. Los PDFs solo-texto ya son livianos (~10-100KB por página). La compresión efectiva es cuando hay imágenes embedded sin optimizar — ahí podés bajar 70-90%." },
      { q: "¿Por qué Adobe comprime mejor que las alternativas gratis?", a: "Adobe usa algoritmos propietarios (Adobe Acrobat) optimizados durante 30 años: detección inteligente de imágenes vs texto, downsampling adaptativo, fuentes subsetadas. Las alternativas open source (pdf-lib, ghostscript) son buenas pero no igualan ese refinamiento." }
    ]
  },

  // ============================================================
  // SATELLITE 2 — SEO
  // ============================================================
  {
    slug: "blog/como-mejorar-core-web-vitals-2026",
    title: "Cómo mejorar Core Web Vitals en 2026 (LCP, INP, CLS explicados)",
    excerpt: "INP reemplazó FID en 2024. Esta guía explica las 3 métricas Core Web Vitals 2026, los rangos buenos/regulares/malos, y cómo arreglar cada una.",
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
    author: "José Gaspard",
    category: "SEO",
    keywords: ["core web vitals", "lcp", "inp", "cls", "mejorar velocidad web", "page speed insights"],
    estimatedReadMinutes: 7,
    body: `
## Las 3 métricas que Google mira (2026)

Desde marzo 2024, INP reemplazó FID como métrica Core Web Vital. Las 3 actuales son:

| Métrica | Mide | Bueno | Regular | Malo |
|---------|------|-------|---------|------|
| LCP | Tiempo hasta que el elemento más grande del fold se renderiza | <2.5s | 2.5-4s | >4s |
| INP | Latencia de TODAS las interacciones (clicks, taps, teclas) | <200ms | 200-500ms | >500ms |
| CLS | Cuánto "salta" el layout durante la carga | <0.1 | 0.1-0.25 | >0.25 |

## LCP: Largest Contentful Paint

**Qué mide:** cuánto tarda en aparecer el elemento más grande visible above the fold (hero image, headline, banner).

**Cómo mejorar:**

1. **Optimizar la imagen hero**: si es JPG > 200KB, comprimila con [Comprimir imagen](/comprimir-imagen). Considerá convertir a WebP.
2. **Preload del LCP element**: \`<link rel="preload" as="image" href="hero.webp">\` en el \`<head>\`.
3. **Eliminar render-blocking**: CSS crítico inline, defer al resto.
4. **CDN cercano** al usuario (Vercel/Cloudflare globales).
5. **Server response time** < 600ms (TTFB).

## INP: Interaction to Next Paint

**Qué mide:** la latencia entre el click/tap del usuario y el siguiente paint visual. Mide TODAS las interacciones, no solo la primera (como FID).

**Cómo mejorar:**

1. **Reducir JavaScript main thread** — code splitting, dynamic imports, web workers para tareas pesadas.
2. **Debounce / throttle** event handlers caros (search, scroll listeners).
3. **Optimizar React rendering** — useMemo, useCallback, React.memo para componentes pesados.
4. **Eliminar long tasks** (>50ms) — partir en chunks con \`scheduler.postTask()\` o setTimeout(0).
5. **Si usás virtual scrolling**: chequear que el rendering por scroll no genera tasks >100ms.

## CLS: Cumulative Layout Shift

**Qué mide:** cuánto salta el contenido durante la carga (la barra de scroll donde estabas leyendo se mueve, los botones se mueven justo cuando ibas a clickear).

**Cómo mejorar:**

1. **Reservar espacio para imágenes** con \`width\` y \`height\` HTML attributes o \`aspect-ratio\` CSS.
2. **Reservar espacio para anuncios** con min-height en el contenedor (aunque el ad cargue después).
3. **Cargar fonts con \`font-display: optional\`** o \`fallback\` con font-metric matching para evitar FOIT/FOUT.
4. **No insertar contenido encima del existente** (banners de cookies arriba del header).
5. **Skeleton loaders** para contenido async.

## Tools para medir

- **[Test velocidad web](/test-velocidad-web)** — TTFB + total time (medición real)
- **PageSpeed Insights** (insights.pageexperience.google) — datos de campo de Chrome UX Report
- **Lighthouse** en Chrome DevTools — auditoría completa con sugerencias
- **Web Vitals Chrome extension** — overlay en cualquier página

## Errores comunes

- **Solo testear desktop** — mobile es el que Google evalúa
- **Solo testear home** — el algoritmo evalúa cada URL relevante
- **Testear con cache caliente** — Lighthouse debe correr en modo incognito
- **Pensar que CLS se mide solo durante el load** — es durante TODA la sesión (un modal que abre y empuja contenido suma CLS)

## Próximos pasos

- [Test velocidad web](/test-velocidad-web)
- [Auditoría SEO técnica completa](/blog/auditoria-seo-tecnica-gratis-2026)
`,
    faqs: [
      { q: "¿Cuándo reemplazó INP a FID como Core Web Vital?", a: "El 12 de marzo de 2024. INP (Interaction to Next Paint) mide TODAS las interacciones de la página, no solo la primera (FID). Por eso es más estricto y representativo de la experiencia real del usuario." },
      { q: "¿Cuál Core Web Vital es la más difícil de arreglar?", a: "Depende del sitio. Para sitios con muchas imágenes y SSR pesado: LCP. Para SPAs con mucho JavaScript: INP. Para sitios con ads dinámicos o lazy loading mal hecho: CLS. La regla: empezá por la que tu sitio falla en PageSpeed Insights." },
      { q: "¿Los Core Web Vitals son factor de ranking de Google?", a: "Sí, oficialmente desde junio 2021 (Page Experience update). Su peso es modesto pero acumulativo — sitios rápidos ganan a sitios lentos en tie-breakers. Más importante: usuarios convierten mejor en sitios rápidos." }
    ]
  },

  // ============================================================
  // SATELLITE 3 — DEV
  // ============================================================
  {
    slug: "blog/jwt-decoder-explicado-2026",
    title: "Qué es un JWT y cómo decodificarlo sin filtrar el token (2026)",
    excerpt: "JSON Web Tokens explicados de forma simple: estructura, qué información llevan, cómo decodificarlos sin enviar el token a un servidor de terceros.",
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
    author: "José Gaspard",
    category: "Desarrollador",
    keywords: ["jwt decoder", "que es jwt", "json web token", "decodificar jwt"],
    estimatedReadMinutes: 6,
    body: `
## Qué es un JWT

**JWT** = JSON Web Token. Es un formato estándar (RFC 7519) para transmitir información firmada entre partes. Lo usan APIs, autenticación OAuth, sessions modernas y casi cualquier sistema distribuido.

Un JWT se ve así:

\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
\`\`\`

Tres partes separadas por punto:

1. **Header** (algoritmo + tipo)
2. **Payload** (los datos / claims)
3. **Signature** (firma criptográfica)

Cada parte está codificada en Base64URL (variante de Base64 con caracteres URL-safe).

## Cómo decodificarlo

### En JavaScript

\`\`\`js
const token = "eyJ...XYZ";
const [headerB64, payloadB64, sigB64] = token.split(".");
const header = JSON.parse(atob(headerB64));
const payload = JSON.parse(atob(payloadB64));
console.log({ header, payload });
\`\`\`

### En Toolram

[JWT Decoder](/jwt-decoder) — pegás el token y obtenés header + payload formateados. **100% client-side** — el token nunca sale de tu navegador.

## Por qué NO usar jwt.io con tokens de producción

jwt.io es la herramienta más popular para decodificar JWTs. **Procesa el token en el server**. Si pegás un token de producción válido:

- Queda potencialmente en logs del servicio
- Si alguien con acceso al backend de jwt.io quisiera, podría usarlo durante su tiempo de vida
- Si tu token tiene info sensible (email, ID, scope), esa info salió de tu control

**Regla:** NUNCA decodifiques tokens de producción válidos en herramientas online server-side. Usá client-side (Toolram) o local en tu terminal.

## Qué información típica lleva un JWT

Payload típico:

\`\`\`json
{
  "sub": "1234567890",          // subject (user ID)
  "name": "John Doe",
  "email": "john@example.com",
  "iat": 1516239022,            // issued at
  "exp": 1516242622,            // expires
  "iss": "https://api.example.com",  // issuer
  "aud": "my-api",              // audience
  "scope": "read:users write:posts"
}
\`\`\`

Claims estándar:
- \`iss\` — issuer
- \`sub\` — subject (user ID)
- \`aud\` — audience
- \`exp\` — expiration time
- \`nbf\` — not before
- \`iat\` — issued at
- \`jti\` — JWT ID (unique)

## La firma: ¿qué garantiza?

La signature se calcula así:

\`\`\`
signature = HMAC-SHA256(
  base64(header) + "." + base64(payload),
  secret
)
\`\`\`

**Garantiza:**
- El token no fue modificado en tránsito
- Solo quien tiene el \`secret\` pudo haberlo firmado

**NO garantiza:**
- Confidencialidad del payload (todos pueden decodificar y leer)
- Que el token no esté revocado (necesitarías un backend con allowlist/blocklist)

## Casos de uso comunes

- **Authentication**: API issues JWT al login, cliente lo envía en cada request via \`Authorization: Bearer <token>\`
- **OAuth 2.0** flows
- **Single Sign-On (SSO)** entre apps
- **Webhook signatures** (Stripe, GitHub, etc.)

## Próximos pasos

- [JWT Decoder en Toolram](/jwt-decoder)
- [Base64 encode/decode](/base64-encode) — útil para decodificar manualmente partes del JWT
- [Hash MD5/SHA](/hash-md5-sha) — para verificar firmas
- [Glosario: ¿Qué es JWT?](/que-es-jwt) — definición técnica corta
`,
    faqs: [
      { q: "¿Es seguro decodificar JWTs en sitios web?", a: "Solo si son CLIENT-SIDE. Sitios como jwt.io procesan server-side, pueden loggear tokens. Toolram decodifica con JavaScript en tu navegador — el token nunca se envía. Igual: NUNCA pegues tokens válidos de producción en NINGUNA herramienta online — siempre puede haber un MITM o extensión maliciosa." },
      { q: "¿El payload de un JWT está encriptado?", a: "No. Está solo CODIFICADO en Base64URL, que es trivial de decodificar. Cualquiera con el JWT puede leer el contenido. La SIGNATURE garantiza integridad (no fue modificado), no confidencialidad. Si necesitás encriptar, usá JWE (JSON Web Encryption)." },
      { q: "¿Cómo verifico la firma de un JWT?", a: "Necesitás el secret (HMAC) o la public key (RSA/EC) del issuer. Recalculás HMAC-SHA256(header + . + payload, secret) y comparás con la signature recibida. Toolram solo DECODIFICA — no verifica firma porque eso requiere acceso al secret, que nunca debería compartirse." }
    ]
  },

  // ============================================================
  // SATELLITE 4 — Calc / IMC
  // ============================================================
  {
    slug: "blog/calculadora-imc-formula-rangos-explicados-2026",
    title: "Calculadora de IMC explicada: fórmula, rangos OMS y limitaciones (2026)",
    excerpt: "El IMC es la herramienta más conocida para evaluar peso saludable, pero tiene limitaciones conocidas. Esta nota explica la fórmula, los rangos OMS y cuándo no usar el IMC.",
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
    author: "José Gaspard",
    category: "Calculadoras",
    keywords: ["calculadora imc", "indice masa corporal", "como calcular imc", "rangos imc"],
    estimatedReadMinutes: 5,
    body: `
## La fórmula

\`IMC = peso (kg) / altura² (m²)\`

Ejemplo: persona de 70 kg y 1.75 m → IMC = 70 / (1.75)² = 70 / 3.0625 = 22.86 (normal).

## Los rangos OMS

| IMC | Categoría |
|-----|-----------|
| < 18.5 | Bajo peso |
| 18.5 – 24.9 | Normal |
| 25.0 – 29.9 | Sobrepeso |
| 30.0 – 34.9 | Obesidad grado I |
| 35.0 – 39.9 | Obesidad grado II |
| ≥ 40 | Obesidad grado III (mórbida) |

→ [Calculadora IMC en Toolram](/calculadora-imc)

## ¿De dónde viene esta fórmula?

La inventó Adolphe Quetelet, un matemático belga, en 1832. Originalmente se llamaba "índice Quetelet" y era un proxy estadístico para estudiar poblaciones, no individuos.

Recién en 1972 Ancel Keys (epidemiólogo estadounidense) la propuso como métrica clínica de obesidad, renombrándola Body Mass Index (BMI). La OMS la adoptó oficialmente en 1995.

## Las 4 limitaciones conocidas

### 1. No diferencia músculo de grasa

Un atleta de 1.80 m y 100 kg de músculo tiene IMC 30.9 → "obesidad grado I" según la OMS. Pero su % de grasa puede ser 8%. El IMC ignora composición corporal.

### 2. No considera distribución de grasa

Una persona con IMC 24 pero toda la grasa en el abdomen (obesidad central / "manzana") tiene más riesgo cardiovascular que alguien con IMC 27 y grasa distribuida en caderas/muslos ("pera").

**Mejor métrica para esto:** circunferencia de cintura o ratio cintura/cadera.

### 3. Subestima riesgo en adultos mayores

Después de los 65 años, hay pérdida natural de masa muscular (sarcopenia). Un adulto mayor con IMC 24 ("normal") puede tener masa muscular muy baja y % grasa alto → riesgo mayor del que indica el IMC.

### 4. Es menos confiable en ciertos grupos étnicos

Los rangos OMS están basados en datos predominantemente caucásicos. Algunos estudios sugieren ajustes para:

- Asiáticos del sur: riesgo metabólico aparece en IMC menores (>23 en lugar de >25)
- Afroamericanos: relación IMC↔mortalidad más débil
- Pacífico-isleños: IMC alto sin necesariamente alto riesgo metabólico

## Cuándo no usar el IMC

- **Niños y adolescentes** → usar percentiles por edad/sexo (no rangos OMS adultos)
- **Atletas de alto rendimiento** → composición corporal con DEXA o bioimpedancia
- **Embarazadas** → no aplica
- **Personas amputadas o con condiciones que alteran peso** → ajustes específicos
- **Adultos mayores con sarcopenia** → complementar con circunferencia muscular

## Alternativas más precisas (pero menos accesibles)

- **DEXA scan** — gold standard para % grasa, costo $80-150 USD por sesión
- **Bioimpedancia profesional** — balanza médica, $30-50 por sesión
- **Pliegues cutáneos** — calibrador de pliegues, requiere experto
- **Circunferencia de cintura** — fácil y útil para obesidad central

## Próximos pasos

- [Calculadora IMC](/calculadora-imc)
- [Calculadora de calorías (TDEE)](/calculadora-calorias)
- [Glosario: ¿Qué es el IMC?](/que-es-imc)
- [Otras calculadoras de salud](/categoria/calculator)
`,
    faqs: [
      { q: "¿El IMC es preciso para deportistas?", a: "No. El IMC no diferencia masa muscular de grasa. Un atleta con mucho músculo puede tener IMC alto sin estar obeso. Para deportistas, usar composición corporal directa (DEXA scan, bioimpedancia profesional, pliegues cutáneos)." },
      { q: "¿Hay un IMC saludable diferente según edad?", a: "Algunos estudios sugieren que en adultos mayores (65+) un IMC ligeramente mayor (24-27) podría asociarse con menor mortalidad — la 'paradoja de la obesidad'. La OMS aún usa los mismos rangos para todos los adultos." },
      { q: "¿Por qué el IMC tiene diferentes rangos en Asia?", a: "Estudios mostraron que poblaciones asiáticas desarrollan riesgo metabólico (diabetes, hipertensión) en IMC menores. La OMS regional para Asia-Pacífico recomienda: sobrepeso >23 (vs >25 estándar) y obesidad >27.5 (vs >30)." }
    ]
  },

  // ============================================================
  // SATELLITE 5 — Símbolos
  // ============================================================
  {
    slug: "blog/como-poner-emojis-y-simbolos-instagram-bio-2026",
    title: "Cómo poner símbolos y emojis en tu bio de Instagram (2026)",
    excerpt: "Guía rápida para usar símbolos Unicode, fancy text y kaomoji en tu bio de Instagram, TikTok y X. Compatibilidad, métodos de inserción y ejemplos.",
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
    author: "José Gaspard",
    category: "Símbolos",
    keywords: ["simbolos instagram bio", "emojis instagram", "como poner simbolos instagram", "fancy text instagram"],
    estimatedReadMinutes: 4,
    body: `
## Lo que la mayoría no sabe

Cuando ves perfiles de Instagram con bios llenas de ★ ✦ ❀ ✿ o nombres en 𝓯𝓪𝓷𝓬𝔂 𝓽𝓮𝔁𝓽, NO están usando fuentes especiales que tengas que instalar. Están usando **caracteres Unicode** — los mismos caracteres que ya soporta tu teclado y cualquier app moderna.

## Paso a paso (mobile)

1. Abrí Toolram en tu teléfono (o computadora)
2. Andá a la categoría que querés:
   - [Corazones](/simbolos/corazones)
   - [Estrellas](/simbolos/estrellas)
   - [Flechas](/simbolos/flechas)
   - [Fancy text (𝓮𝓼𝓽𝓲𝓵𝓸𝓼)](/texto-decorado)
3. Tocá sobre el símbolo → se copia al portapapeles
4. Abrí Instagram → Editar perfil → Bio
5. Mantené presionado en el campo bio → Pegar

## Bio templates que funcionan

**Minimalista con estrellas:**
\`\`\`
★ Diseñadora UX
★ Madre x2
★ Café > todo
\`\`\`

**Con corazones de color:**
\`\`\`
💙 Frontend dev
💚 Plant lover
💛 Foodie
\`\`\`

**Con flechas como CTA:**
\`\`\`
Fotógrafa | Querétaro 📍
→ DM para sesiones
⬇️ Mi portfolio
\`\`\`

**Con fancy text para el nombre:**
\`\`\`
Hola, soy 𝓘𝓼𝓪
✦ Marketer
✦ Newsletter cada lunes
\`\`\`

## Para username (no solo bio)

Instagram permite Unicode en el "Nombre" (no en el "@username" — ese debe ser ASCII).

Generá nombres con fancy text en [/texto-decorado](/texto-decorado): 25 estilos disponibles, desde 𝓼𝓬𝓻𝓲𝓹𝓽 hasta 𝕞𝕒𝕥𝕙𝕖𝕞𝕒𝕥𝕚𝕔𝕒𝕝.

## Si aparece como cuadrado vacío

Algunos caracteres muy nuevos no están en todas las fuentes. Solución:

- Usá símbolos del bloque "Symbol, Other" de Unicode (más universales)
- Evitá kaomoji muy complejos en perfiles que se ven en muchos dispositivos viejos
- Probá desde otro teléfono: si se ve bien en uno y mal en otro, es problema de fuente local, no de Instagram

## Casos prácticos

**Negocio:**
- ✅ Reviews 5⭐
- 📦 Envíos a todo MX
- 💬 Atención WhatsApp

**Creator:**
- ✨ Content & video
- 🎙️ Podcast: link abajo
- 📩 Brand collabs: DM

**Personal:**
- ☕ + ✈️ + 📚
- 🐶 Madre de Luna
- 🌎 CDMX → Madrid

## Próximos pasos

- [Todas las categorías de símbolos](/simbolos)
- [Generador de fancy text (25 estilos)](/texto-decorado)
- [Generador de QR para WhatsApp](/generador-whatsapp-link)
`,
    faqs: [
      { q: "¿Instagram permite todos los símbolos Unicode?", a: "Casi todos. Acepta Unicode estándar incluyendo emojis, símbolos decorativos, fancy text y kaomoji. Las únicas excepciones son algunos zero-width characters o caracteres muy nuevos no soportados aún por la fuente. El @username (handle) sí está restringido a ASCII." },
      { q: "¿Por qué algunos símbolos se ven distintos en iPhone vs Android?", a: "Cada sistema operativo tiene su propia fuente. Los emojis Unicode estándar se renderizan con el set de Apple (Apple Color Emoji) en iOS y Noto Color Emoji en Android — son diferentes diseños del mismo carácter Unicode. Los símbolos puros (★, ❤, ➜) son más universales pero pueden variar levemente." },
      { q: "¿Puedo usar fancy text para mi @username de Instagram?", a: "No, el handle (@username) debe ser ASCII alfanumérico + . y _. Pero podés usar fancy text en el campo 'Nombre' (que aparece más prominente en tu perfil)." }
    ]
  },

  // ============================================================
  // SATELLITE 6 — Imágenes
  // ============================================================
  {
    slug: "blog/como-quitar-fondo-imagen-gratis-2026",
    title: "Cómo quitar el fondo a una imagen gratis (2026) — comparativa de 5 métodos",
    excerpt: "5 formas de quitar fondo a imágenes en 2026: Toolram (browser AI), remove.bg, Canva, Pixlr y Photoshop. Calidad, privacidad, precio y velocidad comparados.",
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
    author: "José Gaspard",
    category: "Imágenes",
    keywords: ["quitar fondo imagen", "remover fondo foto", "fondo transparente png", "background remover"],
    estimatedReadMinutes: 5,
    body: `
## El estado del "remove background" en 2026

Hace 5 años requería Photoshop, máscara manual y 20 minutos por imagen. Hoy es un click — gracias a modelos AI (U²-Net, BiRefNet, SAM2) que detectan el sujeto automáticamente.

Esta nota compara 5 opciones reales.

## Comparativa rápida

| Tool | Calidad | Privacy | Precio | Velocidad | Hair/transparencia |
|------|---------|---------|--------|-----------|--------------------|
| **Toolram** | Buena | ✅ Local | Gratis | Rápido* | Media |
| **remove.bg** | Excelente | ❌ Cloud | Free 50/mes / $9 mes | Rápido | Excelente |
| **Canva** | Buena | ❌ Cloud | Pro $12.99 mes | Rápido | Buena |
| **Pixlr** | Buena | ❌ Cloud | Free con ads / $4.90 mes | Rápido | Buena |
| **Photoshop AI** | Excelente | ❌ Cloud | $22.99 mes | Rápido | Excelente |

*Primera carga: descarga modelo ~13MB. Subsiguientes: instantáneo.

## Análisis por caso de uso

### Quiero subir productos a Mercado Libre / Shopify

**Recomendado:** Toolram (gratis, sin cuenta, sin marca de agua) o remove.bg (mejor calidad para productos con pelo/transparencia).

Para productos sólidos definidos (zapatos, herramientas, cosméticos), Toolram con U²-Net da resultado profesional. Para productos con pelo, vidrio transparente o muebles complejos, remove.bg gana en limpieza de borde.

### Quiero quitar fondo a retratos

**Recomendado:** remove.bg o Photoshop. El pelo fino es donde los modelos server-side pesados (BiRefNet, SAM2) ganan a los browser-side (U²-Net).

### Fotos personales / familiares (privacy crítica)

**Recomendado:** Toolram. Procesamiento 100% local, ninguna foto sale de tu computadora.

### Volumen alto (100+ imágenes)

**Recomendado:** Photoshop con Actions o remove.bg API ($9 por 200 imágenes). Toolram no tiene batch processing UI todavía.

## ¿Por qué algunas tools cobran cuando otras son gratis?

Tres factores:

1. **Modelos pesados server-side** (BiRefNet, SAM2) requieren GPUs caras
2. **Infrastructure** para servir millones de imágenes mensuales
3. **Modelo de negocio** — algunas son freemium agresivo (limit muy bajo), otras pago directo

Toolram puede ser gratis porque corre client-side (cero costo de GPU server) y el modelo U²-Net es open source y eficiente (~13MB).

## Próximos pasos

- [Quitar fondo en Toolram](/quitar-fondo-imagen)
- [Comprimir la imagen resultante](/comprimir-imagen) si va a web
- [Convertir a WebP para mejor performance](/convertir-imagen)
`,
    faqs: [
      { q: "¿Qué modelo AI usa Toolram para quitar fondos?", a: "U²-Net (U-square Net), un modelo open source publicado en 2020 optimizado para salient object detection. Toolram lo ejecuta via @imgly/background-removal con WebAssembly — la primera carga descarga ~13MB del modelo y lo cachea localmente." },
      { q: "¿remove.bg da mejores resultados que Toolram?", a: "Para casos complejos (pelo fino, transparencias, fondos similares al sujeto), sí — usa modelos server-side más pesados. Para productos definidos y retratos estándar, Toolram alcanza calidad comparable con la ventaja de procesar localmente." },
      { q: "¿Puedo procesar 100 imágenes a la vez?", a: "En Toolram aún no — la UI procesa una imagen a la vez. Para batch, las opciones son: Photoshop con Actions, remove.bg API (~$9 por 200 imágenes), o Rembg (CLI Python open source)." }
    ]
  },

  // ============================================================
  // SATELLITE 7 — Generadores
  // ============================================================
  {
    slug: "blog/que-es-un-uuid-cuando-usar-2026",
    title: "Qué es un UUID y cuándo usarlo (v4 vs v7 explicado, 2026)",
    excerpt: "UUIDs son identificadores únicos universales de 128 bits. Esta nota explica para qué sirven, las versiones (v1, v4, v7), y cuándo usar UUID vs auto-increment integer.",
    publishedAt: "2026-05-27",
    updatedAt: "2026-05-27",
    author: "José Gaspard",
    category: "Generadores",
    keywords: ["que es uuid", "uuid v4 v7", "generador uuid", "uuid vs auto increment"],
    estimatedReadMinutes: 5,
    body: `
## La idea

UUID = Universally Unique Identifier. Es un identificador de 128 bits expresado como 32 caracteres hex en 5 grupos: \`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx\`.

Ejemplo: \`550e8400-e29b-41d4-a716-446655440000\`

## Por qué importan

**El problema que resuelven:** generar IDs únicos sin coordinación central.

Si tu app tiene 10 servidores creando registros concurrentemente, no podés usar \`AUTO_INCREMENT\` (cada server tendría que pedir el siguiente número al DB → bottleneck). Con UUIDs, cualquier server (o cliente) puede generar uno y la probabilidad de colisión es prácticamente cero (1 en 5.3 × 10^36 para v4).

## Las versiones más usadas

### UUID v1 — timestamp + MAC

Basado en el momento de generación + dirección MAC de la máquina.

- ✅ Ordenable por tiempo
- ❌ Expone MAC address (privacy leak)
- ❌ Casi nadie lo usa hoy

### UUID v4 — completamente random

122 bits aleatorios (los otros 6 son version + variant).

- ✅ Sin info filtrada
- ✅ El estándar de facto desde 2010
- ❌ No es ordenable por tiempo → mal para índices DB

### UUID v7 — time-orderable (2024)

Combina timestamp (48 bits) + random (74 bits).

- ✅ Random pero ordenable por tiempo de creación
- ✅ Mucho mejor performance en índices DB (B-tree)
- ✅ Nuevo estándar recomendado para DBs

## Cuándo usar UUID vs auto-increment

### Usá UUID cuando:

- Tenés sistema distribuido sin DB central única
- Los IDs son visibles públicamente (URLs, APIs) — UUIDs no revelan cuántos registros tenés
- Necesitás generar IDs offline (mobile app sin conexión)
- Querés migrar/mergear bases de datos sin colisiones

### Usá auto-increment cuando:

- Tu DB es monolítica
- Performance de inserts es crítico (auto-increment es 4 bytes vs 16 de UUID)
- Los IDs son internos (no expuestos)
- No te importa exponer "cuántos registros hay"

## ¿UUID en URLs es buena idea?

Tres consideraciones:

1. **Privacy:** /post/1234 → todos saben que tenés ~1234 posts. /post/550e... → no exponés nada.
2. **SEO:** Google indexa ambos igual. Pero URLs con slugs descriptivos (\`/post/como-hacer-x\`) son mejores para SEO que cualquier ID numérico o UUID.
3. **UX:** URLs con slugs son compartibles. UUIDs largos rompen UX.

**Recomendación:** UUID en API + slug en URL pública. Ej: \`/post/{slug}\` y \`/api/posts/{uuid}\`.

## Próximos pasos

- [Generador UUID en Toolram](/generador-uuid)
- [Glosario: ¿Qué es UUID?](/que-es-uuid)
- [Slug generator](/slug-generator) — para URLs SEO-friendly
- [Mock Data Faker](/mock-data-faker) — generar datos fake para tests
`,
    faqs: [
      { q: "¿Hay riesgo de que dos UUIDs v4 sean iguales?", a: "Casi cero. La probabilidad de colisión entre dos UUIDs v4 aleatorios es ~1 en 5.3 × 10^36. Para tener 50% de chance de UNA colisión necesitarías generar ~2.71 quintillones de UUIDs. En la práctica, considerá imposible." },
      { q: "¿UUID v7 es mejor que v4 para todo?", a: "Para almacenamiento en bases de datos con índices: sí. v7 es ordenable por timestamp → inserts secuenciales en B-tree → mucho mejor performance que v4 (que distribuye random y fragmenta el índice). Para casos donde NO querés revelar el momento de creación, v4 sigue siendo mejor." },
      { q: "¿Por qué UUID son 36 caracteres si son 128 bits?", a: "128 bits = 16 bytes = 32 caracteres hex. Los 4 caracteres extra son los guiones que separan los grupos (8-4-4-4-12). El formato con guiones está en el RFC 4122 — es el estándar visual aunque internamente son solo 16 bytes." }
    ]
  }
];
