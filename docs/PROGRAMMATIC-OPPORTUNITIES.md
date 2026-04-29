# Toolram — Oportunidades de SEO Programático

> **Tesis**: 1 dataset bien usado = cientos a miles de páginas indexables. Es nuestro mayor multiplicador de tráfico potencial.

Cada template incluye: **slug pattern**, **target keyword pattern**, **volumen estimado**, **datos requeridos**, **template de página**, **prioridad**.

---

## P1 — Símbolos individuales (PRIORIDAD MÁXIMA)

**Estado actual**: 1 página por categoría (8 páginas, 200 símbolos agrupados).
**Pivot**: 1 página por símbolo individual.

### Slug pattern
```
/simbolo/[slug-name]
```
Ejemplos: `/simbolo/corazon-rojo`, `/simbolo/estrella-fugaz`, `/simbolo/check-verde`

### Target keywords (ejemplos con volumen estimado)

| Keyword | Vol. estimado MX/ES | Competencia |
|---------|---------------------|-------------|
| corazón rojo símbolo | 5,000-12,000/mo | Baja |
| copiar corazon | 8,000-20,000/mo | Media |
| estrella negra simbolo copiar | 1,000-3,000/mo | Baja |
| check verde para copiar | 4,000-9,000/mo | Baja |
| flecha derecha unicode | 2,000-5,000/mo | Baja |
| símbolo de pi | 3,000-8,000/mo | Media |
| símbolo de infinito copiar | 5,000-15,000/mo | Baja |

**Volumen agregado estimado**: ~150,000-400,000 búsquedas/mes para 200+ símbolos.

### Datos requeridos
Ya tenemos en `/data/symbols.ts`. Solo expandir cada entry con:
- `description` largo (200-400 palabras únicas por símbolo)
- `useCases`: 5 ejemplos concretos donde se usa
- `htmlEntity`: `&hearts;`, `&star;`, etc
- `cssEscape`: `\2665`
- `altCodeWindows`: `Alt + 3`
- `altCodeMac`: `Option + 3`
- `whereWorks`: lista de plataformas donde se ve correcto (Instagram ✓, Twitter ✓, Word ✓, antiguos sistemas Windows ✗)
- `relatedSymbols`: 8 slugs relacionados

### Template de página

```
H1: ❤ Corazón rojo — Símbolo y Unicode para copiar y pegar
[Símbolo gigante 6rem + botón Copy]

## Cómo copiar el corazón rojo
3-5 pasos breves

## Información técnica
| Atributo | Valor |
| Carácter | ❤ |
| Unicode | U+2764 |
| HTML | &hearts;, &#10084; |
| CSS | \2764 |
| Alt code Windows | Alt + 9829 |
| Atajo Mac | (no disponible) |

## Casos de uso comunes
1. Bio de Instagram para mostrar afecto sin ser cursi
2. Mensajes de WhatsApp para destacar emoción
3. Documentos Word para crear listas con check de afecto
4. Diseño gráfico como elemento decorativo
5. Redes sociales

## ¿Funciona en todas las plataformas?
Lista detallada por OS y app

## Símbolos similares
Grid de 8 corazones relacionados con link a cada uno

## FAQ (3-5 preguntas)
- ¿Por qué se ve diferente en mi celular?
- ¿Cuál es la diferencia entre ❤ y 💖?
- ¿Cómo hago un corazón rojo en Word?
```

### Cantidad de páginas: **800+ símbolos = 800+ páginas SSG**

### Implementación
- Expandir `/data/symbols.ts` agregando metadata por símbolo
- Crear `/app/simbolo/[slug]/page.tsx` con `generateStaticParams`
- Sitemap auto-incluye

---

## P2 — Conversión de divisas (HIGH ROI)

### Slug pattern
```
/convertir-[amount]-[from]-[to]
```
Ejemplos: `/convertir-100-usd-mxn`, `/convertir-50-eur-ars`, `/convertir-1000-pesos-dolares`

### Target keywords

| Keyword | Vol. estimado | Competencia |
|---------|---------------|-------------|
| 100 dolares a pesos | 50,000-150,000/mo MX | Alta (xe.com, etc) |
| 50 euros a pesos mexicanos | 5,000-15,000/mo | Media |
| convertir 1000 pesos a dolares | 8,000-20,000/mo | Media |
| 200 reales a pesos colombianos | 1,000-3,000/mo | Baja |

**Volumen agregado**: ~3-8M búsquedas/mes para combinaciones populares.

### Estrategia para no canibalizar XE / Google

- **NO competir** en "1 USD to MXN" (Google tiene widget propio).
- **Competir** en montos específicos populares: 100, 500, 1000, 5000, 10000.
- **Foco**: combinaciones LATAM-LATAM ignoradas por XE (peso colombiano ↔ peso argentino, etc).
- **Diferenciador**: contexto histórico, comparación últimos 30 días (gráfico), contexto de uso ("Si vas de viaje a México con USD 500…").

### Cantidad: **~2,000 páginas** (10 montos × 8 monedas × 25 monedas pares)

### Datos
- Tasas de cambio en tiempo real vía API (exchangerate-api free tier o ECB)
- ISR con revalidate 1 hora
- Histórico simple guardado client-side

---

## P3 — Calculadoras pre-configuradas

### Slug pattern
```
/calculadora-[type]-[parameter]
```
Ejemplos:
- `/calculadora-prestamo-50000-pesos`
- `/calculadora-prestamo-100000-mxn-3-anos`
- `/calculadora-imc-mujer-30-anos`
- `/calculadora-iva-mexico-2026`
- `/calculadora-edad-2000-2026`

### Target keywords

| Keyword | Vol. estimado | Competencia |
|---------|---------------|-------------|
| calculadora préstamo 50000 | 3,000-8,000/mo | Baja |
| calcular IMC mujer | 12,000-30,000/mo | Media |
| IVA 16% mexico | 8,000-20,000/mo | Media |
| cuántos años tengo nací 1995 | 5,000-12,000/mo | Baja |

### Cantidad: **500+ páginas** (15 calculadoras × 30+ valores comunes c/u)

### Implementación
- Cada calculadora tiene parámetros pre-cargados desde URL
- Texto único arriba: "¿Cuánto pagás de cuota mensual por un préstamo de $50,000 a 24 meses al 12%? Te calculamos al instante."
- Schema HowTo apropiado

---

## P4 — Páginas localizadas por país

### Slug pattern
```
/[tool]-[country]
```
Ejemplos:
- `/calculadora-iva-mexico`
- `/calculadora-iva-espana`
- `/calculadora-iva-argentina`
- `/calculadora-iva-colombia`
- `/calculadora-prestamo-personal-mexico`
- `/calculadora-imc-segun-oms-latinoamerica`

### Target keywords

Locales tienen alta intención y baja competencia:

| Keyword | Vol. estimado | Competencia |
|---------|---------------|-------------|
| calculadora iva mexico 2026 | 5,000-12,000/mo | Media |
| calculadora iva espana 21% | 3,000-8,000/mo | Media |
| imc mujer mexicana | 1,000-3,000/mo | Baja |
| calcular sueldo mensual neto chile | 8,000-15,000/mo | Media |

### Cantidad: **150+ páginas** (15 calc × 10 países)

### Datos requeridos
- Tasas IVA por país y zona
- Salario mínimo por país (cuando aplique)
- Edades legales por país (jubilación, mayoría de edad, voto)
- ISR/impuestos por país

---

## P5 — Comparison & alternatives pages

### Slug pattern
```
/alternativas-a-[competitor]
/[competitor]-vs-toolram
/[tool]-vs-[other-tool]
```

### Ejemplos prioritarios

| Slug | Target keyword | Vol. estimado |
|------|-----------------|---------------|
| /alternativas-a-ilovepdf | "alternativas ilovepdf" | 3,000-8,000/mo |
| /alternativas-a-smallpdf | "smallpdf alternative free" | 5,000-12,000/mo |
| /alternativas-a-smallseotools | "smallseotools alternative" | 1,500-4,000/mo |
| /ilovepdf-vs-toolram | "ilovepdf vs toolram" (futuro) | branded |
| /word-counter-vs-character-counter | "word counter vs character counter" | 500-1,500/mo |

### Estructura de alternatives page

```
H1: 7 alternativas gratuitas a iLovePDF en 2026 (sin subir archivos)

[Tabla comparativa con:
- Toolram (winner si privacy es criterio)
- iLovePDF
- SmallPDF
- Sejda
- PDFCandy
- HiPDF
- 4dots PDF
]

## ¿Por qué buscar alternativas a iLovePDF?
- Sube archivos a sus servers (privacidad)
- Watermark en plan free
- Límite de 25MB
- Ads invasivos

## Toolram: la opción privacy-first
[Pitch + screenshot]

## [Competidor 2]: la opción [diferenciador]
...

## Tabla comparativa

| Feature | Toolram | iLovePDF | SmallPDF |
| Procesa local | ✅ | ❌ | ❌ |
| Sin marca de agua | ✅ | ❌ | ❌ |
| Sin registro | ✅ | ✅ | ❌ |
| Open source | ✅ | ❌ | ❌ |
| Tools count | 8 PDF | 25 PDF | 21 PDF |

## ¿Cuál es la mejor alternativa para...?
- ...empresas con datos sensibles → Toolram
- ...volumen alto >100MB → iLovePDF Pro
- ...Mac users → PDFCandy
```

### Cantidad: **50-100 páginas**

### Importante
Ser objetivamente honesto: si iLovePDF es mejor en algo, decirlo. Eso le gana la confianza del usuario y lo hace volver. Google también ranks páginas honestas mejor.

---

## P6 — Tutorial pages (cómo + plataforma)

### Slug pattern
```
/tutorial/como-[verb]-[object]-en-[platform]
/blog/[topic]
```

### Ejemplos con vol. estimado

| Slug | Keyword | Vol. estimado |
|------|---------|---------------|
| /tutorial/como-firmar-pdf-iphone-2026 | "firmar pdf iphone" | 8,000/mo |
| /tutorial/como-unir-pdf-mac-sin-software | "unir pdf mac sin app" | 3,000/mo |
| /tutorial/como-hacer-letras-bonitas-instagram | "letras bonitas instagram" | 60,000/mo MX |
| /tutorial/como-poner-corazon-rojo-whatsapp | "corazon whatsapp" | 25,000/mo |
| /tutorial/como-contar-palabras-google-docs | "contar palabras google docs" | 12,000/mo |
| /tutorial/como-medir-velocidad-clicks-mouse | "test cps online" | 50,000/mo |
| /tutorial/como-generar-qr-wifi-casa | "qr wifi" | 15,000/mo |

### Estructura

```
H1: Cómo firmar un PDF en iPhone sin descargar apps (guía 2026)

[Intro 100-150 palabras con keyword exacta + variantes]

## Método 1: Toolram (privacy-first, 30 segundos)
Paso a paso con screenshots

## Método 2: Marcado en Apple (built-in pero limitado)
...

## Método 3: Adobe Fill & Sign (overkill)
...

## Comparativa: ¿cuál usar según tu caso?
| Necesidad | Recomendado |

## FAQ
- ¿Es legal una firma digital en PDF en México?
- ¿Mi firma queda guardada?
- ¿Funciona offline?
```

### Cantidad: **300+ tutoriales** durante 12 meses

---

## P7 — Glosario técnico (entry-level SEO)

### Slug pattern
```
/glosario/[term]
/que-es-[term]
```

### Ejemplos

| Slug | Vol. |
|------|------|
| /que-es-base64 | 8,000/mo |
| /que-es-uuid | 4,000/mo |
| /que-es-md5 | 12,000/mo |
| /que-es-sha-256 | 6,000/mo |
| /que-es-cps-test | 15,000/mo (gamers) |
| /que-es-meta-description | 10,000/mo (marketers) |
| /que-es-schema-markup | 8,000/mo |

### Estructura corta pero densa
- 800-1200 palabras
- Definición clara + ejemplo
- Código snippet
- Use cases
- Link a tool relacionada de Toolram (CTA conversión)

### Cantidad: **150+ entradas glosario**

---

## P8 — Listicles (alto CTR en SERP)

### Patrón

```
/lista/[topic-number]-[descriptor]
```

### Ejemplos

- `/lista/10-tools-gratis-para-marketing-digital-2026`
- `/lista/15-mejores-generadores-qr-online`
- `/lista/20-fonts-bonitos-para-instagram-bio`
- `/lista/8-formas-firmar-pdf-gratis`
- `/lista/100-simbolos-cool-para-copiar`

### Volúmenes

Listicles tienen el CTR más alto en SERPs (~30-40% vs 18% promedio). Aunque vol/keyword sea moderado, conversion al click es alta.

### Cantidad: **50-80 listicles**

---

## P9 — Tool pages by use case

### Slug pattern
```
/tools-para-[audience]
/herramientas-para-[role]
```

### Ejemplos

- `/tools-para-estudiantes-universitarios`
- `/herramientas-gratis-para-community-managers`
- `/tools-para-desarrolladores-frontend`
- `/herramientas-para-emprendedores-mexico`
- `/tools-para-creadores-de-contenido-instagram`

### Estructura: **landing curated** linkeando 8-15 tools relevantes a esa audiencia con explicación de uso.

### Cantidad: **30-50 landings**

---

## P10 — News-jacking / trending tools

### Cuando un tool nuevo viralidad (ej: una IA nueva, formato nuevo de archivo)

- Crear página rápida `/que-es-[trending-thing]` o `/como-usar-[trending-thing]`
- Capturar tráfico antes que SERP se sature
- Ejemplos pasados que se podrían haber capturado: "qué es JSON5", "qué es WebP", "cómo abrir HEIC"

### Frecuencia: **2-5 al mes** según oportunidades

---

## Resumen de páginas programáticas potenciales

| Template | Cantidad | Tráfico estimado/mes a Q4 2026 |
|----------|----------|--------------------------------|
| P1 Símbolos individuales | 800+ | 30K-80K |
| P2 Conversión divisas | 2,000 | 50K-150K |
| P3 Calculadoras pre-config | 500 | 15K-40K |
| P4 Localizadas por país | 150 | 8K-20K |
| P5 Comparisons / alternatives | 100 | 10K-30K |
| P6 Tutoriales cómo-en-X | 300 | 40K-100K |
| P7 Glosario técnico | 150 | 12K-30K |
| P8 Listicles | 60 | 8K-20K |
| P9 Use case landings | 40 | 5K-15K |
| P10 News-jacking | 30/año | 5K-25K |
| **Total** | **~4,200 URLs** | **180K-510K visitas/mes** |

---

## Quality gates obligatorios para programmatic

Sin estos, riesgo de penalty Google muy alto:

1. **Mínimo 400 palabras únicas por página** — no copy-paste con find-replace
2. **Datos verificables y reales** — no inventar tasas, no inventar Unicode
3. **Schema.org apropiado** por tipo de página
4. **Imagen única generada** (OG dinámico)
5. **Link interno desde 3+ páginas relevantes**
6. **Updated date visible** y real
7. **Author byline** o "Toolram team" + página /sobre
8. **No keyword stuffing** — densidad <2.5%
9. **Original use-case section** que no se vea en otros sites

## Velocidad de publicación recomendada

- **Mes 1-3**: 200-400 páginas programáticas (símbolos + 50 conversiones)
- **Mes 4-6**: 800-1200 páginas (símbolos completos + tutoriales)
- **Mes 7-12**: 2000-3000 páginas (conversiones masivas + alternatives)
- **Mes 13-18**: 4000+ páginas (todos los templates activos)

> Publicar todo de golpe = penalty. Publicar gradualmente = señal natural de crecimiento.
