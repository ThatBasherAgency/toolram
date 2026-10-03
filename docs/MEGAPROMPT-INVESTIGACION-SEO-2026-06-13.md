# MEGA-PROMPT — Investigación profunda SEO de toolram.com

> Documento de trabajo. Fecha base de datos: **2026-06-13**.
> Pégalo en cualquier modelo con acceso a GSC/GA4/los archivos del repo y ejecútalo paso a paso.
> NO es un prompt genérico: está calibrado al estado real del sitio medido el 2026-06-13.

---

## 0. Contexto verificado (no asumir, ya está medido)

- **Qué es**: toolram.com, Next.js 15 / App Router en Vercel (proyecto `toolram`, team `team_r38BKKJzTFS2wCCzD85A4il1`). 162+ herramientas online gratis en español (PDF, SEO, calculadoras, símbolos, texto decorado, generadores, dev). Bilingüe es/en. Código en `~/clients/toolram/src`.
- **Estado de tráfico (GSC sc-domain:toolram.com, 28 días al 2026-06-11)**: **0 clics, 1 impresión, posición 1.0.** Esto NO es "bajo rendimiento", es **pre-tráfico**.
- **Estado de indexación (GSC, 2026-06-13)**: sitemap con **336 URLs → 0 indexadas** salvo la home.
  - `https://toolram.com/` → *Submitted and indexed*, último crawl **2026-05-20**.
  - `/blog` → *Crawled - currently not indexed* (crawl 2026-05-03).
  - `/conversor-zonas-horarias`, `/calculadora-imc`, `/creador-backlinks` → *URL is unknown to Google, lastCrawl = never*.
- **Diagnóstico raíz**: **inanición de crawl + autoridad cero** (dominio nuevo, ~0 backlinks). Google rastreó la home una vez y no volvió por el resto. El on-page YA está saturado de trabajo SEO (ver git log: content boost, hreflang, schema, internal linking, llms.txt, IndexNow). **El cuello de botella NO es on-page; es discovery + autoridad + señales de uso real.**
- **Analítica disponible**: solo **GA4 (`G-TQ1B5S820Q`, gtag directo)**. **No hay GTM container ni grabaciones de sesión (Clarity/Hotjar).** Cualquier "análisis de grabaciones/tag manager" es vacío hasta instalarlos.
- **Robots**: permite GPTBot, ClaudeBot, OAI-SearchBot, PerplexityBot (bien para GEO). `llms.txt` presente.

---

## 1. Objetivo de la investigación

Responder con evidencia, no opinión: **¿por qué toolram.com no recibe tráfico orgánico y cuál es la secuencia de acciones de mayor ROI para pasar de 0 a primeras 1.000 sesiones/mes?** Separar tajantemente:
1. Problemas de **discovery/indexación** (Google no conoce las páginas).
2. Problemas de **autoridad** (Google las conoce pero no las premia).
3. Problemas de **relevancia/intención** (rankean pero para términos sin volumen o sin clic).
4. Problemas de **UX/conversión** (entran pero no usan la herramienta ni vuelven).

---

## 2. Recolección de datos (ejecutar TODO antes de concluir)

### 2.1 Search Console (fuente de verdad)
Usar `~/.credentials/google-seo-sa.json` + helper `/tmp/gauth.py`, propiedad `sc-domain:toolram.com` (el SA es Owner). Extraer:
- Totales 90 días y 28 días: clics, impresiones, CTR, posición.
- Top 100 queries por impresiones (no por clics — con 0 clics el ranking real está en impresiones).
- Top 100 páginas por impresiones.
- Inspección de URL (`urlInspection/index:inspect`) sobre una muestra de 25 URLs representativas (1 por categoría + home + blog) → clasificar cada una en: *indexed / crawled-not-indexed / discovered-not-crawled / unknown*.
- Estado de sitemaps (`/sitemaps`): submitted vs indexed.
- **Entregable**: tabla `url, estado_index, lastCrawl, impresiones_28d` y un histograma de estados. La proporción `unknown + discovered` vs total = severidad de la inanición de crawl.

### 2.2 GA4 (`G-TQ1B5S820Q`)
- Property ID numérico: confirmar si el SA `claude-seo-bot` tiene acceso al GA4 Admin API; si no, pedir acceso o leer en la UI.
- Métricas 28/90 días: usuarios, sesiones, fuente/medio (cuánto es directo/referral/orgánico/IA), engagement rate, páginas por sesión, eventos.
- Páginas de entrada (landing pages) y eventos de uso de herramientas (si están instrumentados; probablemente NO — verificar).
- **Si no hay eventos de uso de herramienta** → marcar como gap: no se puede medir si el visitante realmente USA la tool (la métrica que correlaciona con rankings de tools).

### 2.3 Grabaciones / mapas de calor
- **No existen.** Recomendación: instalar **Microsoft Clarity** (gratis, ilimitado) para tener heatmaps + grabaciones + "rage clicks" + "dead clicks". Sin esto, el análisis UX es inferencia, no observación.

### 2.4 Tag Manager
- **No existe GTM.** Decidir: (a) seguir con gtag directo + eventos manuales `gtag('event', ...)`, o (b) migrar a GTM-only para gestionar Clarity/Ads/eventos sin tocar código. Para un sitio de una persona, gtag + eventos en código suele bastar; GTM aporta si va a haber muchas etiquetas.

### 2.5 Autoridad / off-page (sin DataForSEO — saldo negativo)
- WHOIS: edad real del dominio (clave: si es < 6 meses, la inanición de crawl es esperable).
- Backlinks: usar GSC → Enlaces (links report) como fuente gratis y fiable. Contar dominios de referencia reales (no auto-referencias).
- Menciones de marca "toolram" en la web (búsqueda manual en Google/Bing): ¿existe huella de marca? Con 0 menciones, Google no tiene razón para confiar.

### 2.6 Competencia y demanda real
- Para las 20 herramientas más estratégicas, hacer SERP manual (WebSearch / búsqueda incógnito es-MX, es-PE, es-CO, es-AR) de la keyword principal. Anotar: ¿quién rankea top 5? ¿son utility-sites fuertes (rapidtables, calculadora-online, lifehacker-style)? ¿hay AI Overview? ¿el intent es satisfecho por un widget instantáneo?
- Clasificar cada tool en: **(A) gano si me indexan** (long-tail, competencia débil), **(B) batalla larga** (head term, competencia DR alto), **(C) no vale** (sin volumen o ya resuelto por feature de Google).

---

## 3. Análisis (preguntas que la investigación DEBE responder)

1. **¿Cuántas de las 336 URLs son técnicamente indexables y útiles, y cuántas son thin/duplicadas que diluyen el crawl budget?** (Páginas por-símbolo, alternativas, glossary: ¿aportan o canibalizan? El git log ya menciona noindex de 159 símbolos — verificar que se aplicó en vivo.)
2. **¿La home enlaza internamente a las páginas que MÁS cerca están de rankear?** Mapear el grafo de enlaces internos: qué páginas son huérfanas (0 enlaces entrantes internos) → esas nunca se descubren.
3. **¿Cuál es el subconjunto mínimo de páginas (20–40) en las que concentrar TODO el crawl budget y la autoridad** para conseguir las primeras indexaciones + clics, en vez de pedirle a Google 336 a la vez?
4. **¿Qué señales de autoridad existen hoy y cuáles son las 5 acciones off-page de mayor ROI** para un dominio nuevo en español (Product Hunt, directorios de tools, Reddit/comunidades dev, awesome-lists en GitHub, prensa nicho)? Ya hay borradores en `backlinks-drafts/` y `docs/` — evaluar cuáles ejecutar primero.
5. **¿El sitio es "citable" por IA (GEO)?** Robots permite los bots de IA y hay llms.txt. ¿El contenido está en formato pasaje-respuesta (definición corta + tabla + FAQ) que ChatGPT/Perplexity citan? El canal "AI Assistant" suele llegar antes que el orgánico clásico en sitios nuevos.
6. **¿Hay canibalización es/en o entre tool-page vs blog-post vs glossary** para la misma keyword?

---

## 4. Entregables de la investigación

1. **Tabla de indexación** (336 filas) con estado + acción (forzar crawl / mejorar / noindex / borrar).
2. **Lista priorizada de 20–40 "páginas faro"** donde concentrar autoridad, con su keyword objetivo, volumen estimado, dificultad (A/B/C) y el enlace interno que les falta.
3. **Plan off-page de 90 días** con las 5 tácticas de mayor ROI ya redactadas y listas para ejecutar.
4. **Diagnóstico GEO**: % de tool-pages con formato citable + las 10 a arreglar primero.
5. **Lista de gaps de medición** (eventos de uso de tool, Clarity, etc.) con el código exacto a añadir.
6. **Una sola frase de tesis**: cuál es EL cuello de botella y la primera acción.

---

## 5. Regla de oro

Con 0 clics y 0 indexación, **prohibido recomendar "mejorar meta titles" o "añadir más contenido"** como acción principal — eso ya está hecho y no es el problema. La investigación debe priorizar, en este orden: **(1) forzar descubrimiento e indexación de un núcleo pequeño, (2) ganar las primeras señales de autoridad/uso, (3) recién después escalar contenido.**
