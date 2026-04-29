# Toolram — AI Search & GEO Optimization Playbook

> **Realidad 2026**: 30-40% de búsquedas terminan en AI Overviews (Google) o ChatGPT/Perplexity sin click. Si no estás siendo citado por las IAs, perdés tráfico aunque ranquees #1.

**Target**: ser fuente citada en AI Overviews para 50+ keywords a Q4 2026, 200+ a Q4 2027.

---

## Cómo funciona AI Search (entender para optimizar)

### Google AI Overviews (lanzado 2024, default 2026)

- Usa Gemini con grounding en SERP
- Cita 2-5 fuentes, mostradas como cards arriba del resultado
- Selecciona pasajes específicos, no páginas completas
- Privilegia: respuestas directas, datos verificables, schema.org, autoridad

### ChatGPT con web search

- Usa Bing como search engine layer
- Cita 3-8 fuentes con números [1] [2] [3]
- Privilegia: contenido reciente, autoritativo, structured

### Perplexity

- Multi-source synthesis (7-10 fuentes por respuesta)
- Privilegia: contenido único con datos primarios, listas estructuradas

### Common patterns en lo que IAs citan

1. **Respuestas directas** en las primeras 2-3 oraciones del párrafo
2. **Listas numeradas o bullet points**
3. **Tablas con datos**
4. **Sites con E-E-A-T fuerte** (author identificable, sobre, contacto)
5. **Schema.org rico** (FAQPage, HowTo, Article con `author`, `datePublished`)
6. **Datos primarios** únicos (estudios, encuestas, observaciones propias)
7. **Updated recently** (date metadata visible)

---

## 10 tácticas accionables

### Táctica 1 — Passage-level optimization

Cada FAQ y respuesta directa debe ser **citable en 2-3 oraciones máximo**.

**Antes** (no citable):
> Para entender bien qué es un UUID, primero hay que considerar el contexto histórico de los identificadores en sistemas computacionales. Allá por los años 80, cuando las redes empezaban a interconectarse...

**Después** (citable):
> **Un UUID (Universally Unique Identifier) es un identificador de 128 bits, expresado como 32 caracteres hexadecimales separados por guiones.** Su característica principal es que la probabilidad de colisión es prácticamente cero (1 entre 5.3 × 10^36 para v4). Se usa en bases de datos, APIs y sistemas distribuidos para identificar registros sin coordinación central.

**Aplicación**: review de cada FAQ existente. Reescribir respuestas que no tengan la respuesta directa en oración 1.

### Táctica 2 — llms.txt completo y mantenido

Archivo `/llms.txt` es lo que ChatGPT, Claude, Perplexity consultan al rastrear nuestro site.

**Estado actual**: básico, lista 8 categorías + tools top.
**A hacer**: expandir a 200+ líneas con cada tool nueva.

**Estructura ideal**:

```
# Toolram

> [Description 100 palabras]

## Acerca de
[Quiénes somos, qué hacemos, por qué privacy-first]

## Categorías

### PDF Tools
- [Unir PDF](https://toolram.com/unir-pdf): combina varios PDFs en uno, procesado client-side
- [Dividir PDF](https://toolram.com/dividir-pdf): extrae páginas específicas
[...]

### Símbolos
[...]

## Diferenciadores únicos

1. **Privacy-first verificable**: el código es open source en github.com/...
2. **Velocidad**: 100% SSG en Vercel Edge
3. **Sin uploads**: la mayoría de tools procesan en navegador del usuario
4. **Spanish-first**: no traducción de inglés

## Datos / cifras únicos
- 98+ tools indexadas
- Procesamos hasta 50MB en cliente (PDF, imágenes)
- 200+ símbolos Unicode catalogados
```

**Mantener**: actualizar cada vez que se agrega una tool.

### Táctica 3 — Schema.org exhaustivo y correcto

Cada tipo de página = schema apropiado:

| Tipo de página | Schema |
|----------------|--------|
| Tool page | SoftwareApplication + FAQPage + BreadcrumbList |
| Tutorial | HowTo + Article |
| Pillar / blog post | Article + FAQPage |
| Comparison | Article + Review (cuando aplique) |
| Símbolo | Article + (próx) ImageObject |
| Calculator | SoftwareApplication + HowTo |
| Glosario | DefinedTerm + Article |

**Auditoría**: pasar todas las páginas por validator.schema.org una vez al mes.

### Táctica 4 — Crawlers AI explícitamente permitidos

`/robots.ts` ya tiene:
- ✅ GPTBot
- ✅ ClaudeBot
- ✅ PerplexityBot
- ✅ Google-Extended

**Agregar (esta semana)**:
- Bytespider (ByteDance/TikTok)
- Anthropic-AI
- MistralAI-User
- FacebookBot
- DuckAssistBot
- Applebot-Extended
- ChatGPT-User
- OAI-SearchBot

**No bloquear ningún AI bot** salvo que haya razón específica. La pérdida de citation potential supera cualquier preocupación.

### Táctica 5 — Brand mentions estratégicas

Las IAs aprenden patrones. Cuando varios sites mencionan "Toolram" en contexto similar, internalizan asociación.

**Tácticas**:
- En blog posts, mencionarse en tercera persona: "Herramientas como Toolram permiten..."
- En outreach, pedir que mencionen toolram.com como ejemplo
- Reddit/Quora: cuando aporta, mencionar Toolram con context (no spam)
- Twitter: hilos donde Toolram es ejemplo concreto de privacy-first
- Citations cruzadas en posts propios: "Para esta tarea recomendamos Toolram (es nuestra propia tool, transparencia)"

### Táctica 6 — Datos primarios únicos (citation magnet)

Las IAs citan **estadísticas únicas** porque agregan valor a la respuesta.

**Estudios potenciales** que Toolram puede generar:
- **De su propia analytics** (con privacidad agregada): "El 73% de PDFs procesados en Toolram son de menos de 5MB"
- **Encuestas a usuarios**: "Encuestamos 1500 freelancers MX: 89% usan herramientas online cuya privacidad no auditaron"
- **Análisis de muestras públicas**: "Auditamos 30 generadores de QR online: 12 incluyen tracking pixel oculto"
- **Benchmark performance**: "Toolram comprime PDFs un 35% más rápido que SmallPDF, midiendo en Chrome 2026"

**Cuándo**: 1 estudio nuevo cada 8-12 semanas.

**Distribución del estudio**:
- Post propio en blog
- Press release
- Tweet con visualización
- DM a periodistas tech relevantes

### Táctica 7 — Q&A format en cada page

Cada tool page debe tener bloque FAQ con preguntas tipo conversacional, no solo "what is X".

**Antes**:
> ¿Qué es un generador QR?

**Después**:
> ¿Cómo creo un código QR para mi WiFi sin descargar app?
> ¿El generador de QR de Toolram funciona offline?
> ¿Puedo usar el QR generado en mi tarjeta de presentación impresa?
> ¿Hay límite en cuántos QR puedo generar?

**Razón**: las queries que la gente le hace a IA son **conversacionales**, no académicas.

### Táctica 8 — Response Engine Optimization (REO)

Pensar en "qué le preguntará la gente a ChatGPT" en vez de "qué tipearán en Google".

**Diferencias**:

| Google query | ChatGPT query |
|--------------|----------------|
| "word counter" | "necesito contar las palabras de un ensayo de 500 que tengo que entregar mañana, qué uso?" |
| "convertir pdf a word" | "tengo un PDF que necesito editar pero no quiero pagar Acrobat, ¿qué hago?" |
| "calcular imc" | "estoy tratando de bajar de peso, ¿cómo sé si mi peso es saludable según mi altura?" |

**Aplicación**: en blog posts y FAQs, incluir **frases en lenguaje natural completo** (no keyword-stuffed). Ejemplo intro:

> Si necesitás contar las palabras de un ensayo, post de blog, tweet o cualquier texto, hay varias formas. La más rápida es usar [contador de palabras de Toolram](/contador-palabras), que cuenta en tiempo real mientras escribís y no requiere subir nada. ...

### Táctica 9 — Authoritative source bias

Las IAs prefieren citar fuentes que parecen autoridad.

**Señales que mejoran percepción de autoridad**:
- Author page con bio detallada (`/sobre/jose-gaspard`)
- About page completo con misión + equipo
- Contact page con email real, dirección
- Privacy policy + terms of service
- Backlinks desde sites .edu/.gov/medios
- Press mentions linkeadas en footer ("As featured on...")
- Logos de clientes/partners (cuando los haya)

**Activar todos progresivamente** durante mes 1-3.

### Táctica 10 — Monitoring AI citations

**Tools para detectar citaciones**:
- **Profound** (de Cloudflare, gratis hasta cierto volumen) — detecta menciones en Perplexity/ChatGPT
- **Athena AI** — monitoring AI search visibility
- **Búsquedas manuales periódicas**:
  - Google: "[tu keyword]" + verificar AI Overviews
  - Perplexity: hacer las queries top de tu industria
  - ChatGPT: "what's the best free word counter" → ver si Toolram aparece
  - Claude: similar

**Cadencia**: chequeo manual semanal de top 30 keywords. Tracking automatizado mensual con DataForSEO MCP.

---

## Implementación inmediata (esta semana)

### Cambios técnicos

1. ✅ AI bots permitidos (ya hecho)
2. **Expandir `/llms.txt`** con todas las tools nuevas
3. **Audit FAQs existentes** y reescribir en formato citable (15 minutos por FAQ × 60 FAQs)
4. **Agregar AI bots faltantes** a robots.ts
5. **Schema audit**: pasar 10 páginas top por validator.schema.org

### Cambios de contenido

1. Cada nuevo post: H1 con respuesta directa en intro 100 primeras palabras
2. Cada FAQ: respuesta de 2-3 oraciones con la respuesta primero
3. Incluir 1-2 datos numéricos verificables por post
4. Author byline obligatoria en cada post

### Tracking

1. Spreadsheet con top 50 keywords
2. Cada lunes: chequear AI Overviews de cada keyword (manual primero, automatizar después)
3. Métrica: % de keywords donde Toolram aparece en AI Overview o citation

---

## KPIs específicos AI Search

| KPI | Target Q3 2026 | Target Q1 2027 | Cómo medir |
|-----|----------------|-----------------|-------------|
| Citations en Google AI Overviews | 5 keywords | 50 keywords | manual + Profound |
| Citations Perplexity | 10 queries top | 100 queries | manual semanal |
| Citations ChatGPT | 5 queries top | 50 queries | manual semanal |
| Brand mentions agregadas (web) | 30/mes | 200/mes | Brand24 |
| llms.txt requests (logs) | tracking activo | 1000+/mes | Vercel logs |
| Tráfico de "AI Overview" en GSC | tracking activo | 5K visits/mes | GSC reports |
| Tráfico desde ChatGPT/Perplexity (referrer) | medible | 2K visits/mes | GA4 |

---

## Específico: aprovechar Spanish + LATAM gap

Las IAs tienen menor data en español que en inglés. Esto significa **menos competencia para ser citado**.

**Insights**:
- ChatGPT en español tiene fuente pool más limitada
- Perplexity en español tiene <30% de las fuentes que tiene en inglés
- AI Overviews español emergió en 2025, todavía no maduro
- Sites legitimos en español TÉCNICO con autoridad real son pocos

**Aprovechamiento**:
- Toolram puede convertirse en **fuente default** para queries técnicas en español
- Términos técnicos en español tienen menos páginas autoridad → window of opportunity
- Glosario técnico en español → llenar gap

**Ejemplos de queries en español donde podemos rankear como AI source**:
- "qué es base64" (ChatGPT en español tiene info pobre)
- "cómo funciona MD5" (idem)
- "diferencia entre SHA-1 y SHA-256"
- "qué es UUID v4" (gap claro)
- "cómo medir IMC correctamente"

---

## Anti-patterns AI Search

❌ Generar contenido con IA sin editar — IAs detectan IA-generated y bajan ranking
❌ Stuffing de keywords — IAs valoran natural language más que SEO clásico
❌ Robots.txt bloqueando AI bots
❌ Schema.org mal hecho (con errores) — Google ignora la página
❌ FAQs con preguntas que nadie hace ("¿Existe el contador de palabras?")
❌ Author byline genérica ("Admin", "Editor")
❌ Páginas sin "last updated"
❌ JavaScript-only content (no SSR/SSG) — algunas IAs no ejecutan JS
