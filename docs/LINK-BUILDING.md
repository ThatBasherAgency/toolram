# Toolram — Link Building Strategy

> **Tesis**: contenido sin backlinks ranquea solo long-tail. Para entrar en top-10 de keywords competitivas, necesitamos autoridad. Autoridad = backlinks + brand mentions + co-citations.

**Target 12 meses**: 150+ dominios refer únicos, mínimo 50 con DR > 30.

---

## Inventario de armas disponibles

### Activos que ya tenés (acción inmediata = mes 1)

Sitios bajo tu control que pueden linkear a toolram.com de forma natural y editorial:

| Sitio | DA estimado | Tipo de link recomendado |
|-------|-------------|--------------------------|
| josegaspard.dev | 18-25 | Footer "tools que uso" + post "mis herramientas favoritas" |
| nebu-lab.com | 15-22 | Recurso "herramientas SEO gratis para clientes" |
| 3rcore.com | 10-18 | Footer agencia + blog post tools devs |
| basher.agency | 25-35 | Recursos clientes |
| visamundial.com | 15-20 | Calculadora cambio de divisas embebida |
| modilimitado.cc | 20-30 | Tools section |
| tenpac.com.mx | 15-25 | Sidebar widget |
| wuasap-plus.plus | 20-28 | Footer bloque "tools recomendadas" |
| wasap-plus.plus | 20-28 | Igual |
| descargarwasapp.plus | 18-25 | Igual |
| imprentaperuana.com | 15-22 | Calculadora dimensiones embebida |
| modanza.com | 15-20 | Calculadora hipoteca link |
| calendariodemexico.com | 30-40 | Bloque "tools útiles" prominent |
| minecraft-apk.com | 20-30 | CPS Test linkeado (audiencia gamer) |
| apk-geometrydash.com | 20-28 | Reaction time test (audiencia gamer) |

**Cantidad de backlinks tier-1 inmediatos disponibles**: **15-20**

### Estrategia primera ola (semana 1-2)

1. **Footer ubicuo** en todos tus sitios: link a toolram.com con anchor "Herramientas online" o "Tools gratis"
2. **Posts contextuales** en sitios donde aporta:
   - calendariodemexico.com → post "10 calculadoras útiles para tus 2026"
   - minecraft-apk.com → post "test tu CPS antes de jugar"
   - apk-geometrydash.com → post "mejorá tu reaction time"
   - visamundial.com → post "calculadoras útiles para tu visa"
3. **Sidebar widgets** en blogs con tráfico (calendariodemexico, modilimitado): bloque visual "Pruebá: contador palabras / generador QR / etc"

### Implementación

```bash
# Para cada sitio WP, agregar footer link via mu-plugin existente
add_action('wp_footer', function() {
    if (is_singular() && !is_page()) return;
    echo '<a href="https://toolram.com/" rel="noopener" target="_blank">Herramientas online gratis</a>';
});
```

---

## Tácticas externas (mes 1-12)

### T1 — Tool widget embeds (alta calidad, escalable)

**Idea**: ofrecer JavaScript embeddable de las calculadoras y tests más populares. Bloggers + sites educativos los embeben para su audiencia → cada embed incluye link-back a toolram.

**Tools embeddables prioritarias**:
- Calculadora de IMC (mucho blogger fitness)
- Calculadora de préstamo (blogs financieros)
- CPS Test (canales/blogs de gaming)
- Word Counter (blogs de redacción)
- Calculadora IVA México (blogs contables)

**Implementación**:
```html
<!-- Embed que ofrece Toolram -->
<iframe src="https://toolram.com/embed/calculadora-imc?theme=light" 
        width="100%" height="500" frameborder="0">
</iframe>
<p>Calculadora IMC by <a href="https://toolram.com/calculadora-imc">Toolram</a></p>
```

**Outreach**: 50-100 emails a:
- Blogs fitness MX/ES/AR
- Blogs contabilidad e impuestos
- Streamers/canales gaming Minecraft
- Profesores universitarios con blogs

**Tasa de éxito esperada**: 5-10% → 5-10 backlinks high-quality del primer batch.

### T2 — Free public API (devs aman esto)

**Endpoints públicos sin auth**:
```
GET https://api.toolram.com/uuid?count=10
GET https://api.toolram.com/qr?text=hello
GET https://api.toolram.com/json/format (POST)
GET https://api.toolram.com/hash?text=hello&algo=md5
```

**Documentación bonita** en `/api` con curl examples + librerías sample.

**Atribution required** (en términos): "Powered by Toolram" link.

**Distribución**:
- Listar en API directories: rapidapi.com, publicapis.dev, freepublicapis.com
- Post en r/webdev, r/programming, hackernews
- Tweet con código demo
- Tutorial en dev.to "Generating UUIDs in JS without a library"

**Backlinks esperados a 6 meses**: 20-40 (devs lo usan en projects + blog posts).

### T3 — Comparison & alternatives pages (con outreach)

Cada página `/alternativas-a-X` que creemos merece outreach al ecosystem:

1. **Mencionar a competidor en post Twitter/LinkedIn** etiquetándolo
2. **Email al author de blog que escribió sobre el competidor**: "Hicimos una comparativa más actualizada, te tagueamos"
3. **Reddit post relevant subreddit**: "Made an honest comparison X vs Y vs Z"

### T4 — HARO / SourceBottle / responses (link earning)

Plataformas donde periodistas piden citas de expertos:
- helpareporter.com (HARO)
- sourcebottle.com
- terkel.io

**Tema sweet spot**: "expert quote about online tools, productivity, privacy".

**Frecuencia**: 5-10 pitches/semana → 1-2 backlinks/mes en sites grandes (CNN, NYT, etc tier).

**Plantilla pitch**:
> Hi [Reporter],
> 
> Saw your query on [topic]. I'm José Gaspard, founder of Toolram (toolram.com), a privacy-first online tools platform.
> 
> Here's my quote: "[2-3 sentencias densas, citables]"
> 
> Verifiable: [link a tool concreta que respalda la cita]
> 
> Bio: [1 línea]

### T5 — Quora + Reddit + Stack Overflow

**Estrategia anti-spam**: solo responder cuando aporta legítimamente, y solo cuando link es directamente útil.

**Subreddits target**:
- r/InternetIsBeautiful (post 1 tool/semana max)
- r/coolguides (cuando aplique)
- r/webdev (tool dev)
- r/learnprogramming (tutorials)
- r/spanish, r/argentina, r/mexico (tools en español)
- r/Minecraft (CPS test cuando topic relevante)
- r/Productivity

**Quora**: 5-10 respuestas/semana en preguntas tipo "what's the best free X tool".

**Backlinks esperados**: 50-100 en 12 meses (mucha cantidad, low DR mostly, pero suman).

### T6 — Guest posts (paid + earned)

**Earned guest posts** (no pago):
- Pitch a Smashing Magazine, dev.to, hackernoon.com — temas técnicos sobre Web APIs nuevas
- Pitch a Marketers MX (blog mexicano de marketing) — caso de estudio Toolram
- Pitch a backlinko.com, ahrefs.com blog — caso de estudio SEO

**Paid guest posts**: solo en sites con DR>40 y audiencia real.
- Budget: $100-300 por post
- Cantidad: 5-10 en 12 meses
- ROI: alto si site tiene tráfico orgánico real (verifiable con SimilarWeb)

**No comprar**: "PBN" o redes de blogs spam — Google los detecta.

### T7 — Tools listing sites

Sitios que listan tools/apps:
- producthunt.com (lanzamiento + recurring features)
- alternativeto.net (registrar como alternative a competidores)
- tinytools.club
- saashub.com
- toolfinder.co
- futurepedia.io (sección AI tools)
- whatruns.com (registrar tech stack)

**Outreach**: enviar 2-3 listings/mes.

### T8 — Datasets / studies (linkbait)

Crear estudios únicos que prensa cite:

- "Encuesta privacy 2026: el 73% de mexicanos no sabe que iLovePDF guarda sus archivos"
- "Estudio: tipo de letras Unicode más usadas en Instagram bio 2026"
- "Análisis de 10K passwords generados: el 40% son débiles"

**Distribución**:
- Press release (PRNewswire $300, o gratis en Reddit/Twitter/LinkedIn)
- Send a periodistas tech/privacy MX/ES
- Tweet con visualización
- Post en LinkedIn

**ROI**: 5-15 backlinks de medios DR>50 en 6 meses si studies son interesantes.

### T9 — Brand mentions reclamation

**Setup**: Brand24 (free trial) o Google Alerts para "Toolram" + variantes.

**Workflow** mensual:
1. Detectar menciones nuevas de "Toolram" sin link
2. Email amistoso al author: "Vi que mencionaste Toolram, ¿podrías agregar el link? Gracias!"
3. Tasa de éxito: 30-50%

### T10 — Edu / .gov links (oro)

**Tácticas**:
- **Donar tool** a profesor universitario para uso en curso → la universidad linkea
- **Free Pro accounts para estudiantes** → agitar uso → algún profesor lo recomienda en syllabus público
- **Sponsorship hackathon universitario** ($200-500) → sites .edu mencionan

**Targets**:
- UNAM, ITESM, UDLAP (México)
- UBA, UNC, UTN (Argentina)
- U. de Chile, PUC (Chile)
- Univ. Complutense, U. de Barcelona (España)

---

## Plantillas de outreach

### Email a blog para guest post

```
Asunto: Idea de post para [blog name] sobre [topic]

Hola [name],

Soy José Gaspard, fundador de Toolram (toolram.com). Sigo [blog name] desde hace un tiempo, en particular el post de [post específico]. 

Quería proponer un post de invitado: "[título tentativo]". Cubriría:
- [punto 1 con valor único]
- [punto 2]
- [punto 3]
- [punto 4]

Vendría con datos propios de Toolram (tenemos data sobre uso de tools en LATAM) y screenshots originales. Sin auto-promo agresiva, solo 1 link contextual a una tool relevante.

Te puedo mandar un draft en 5 días si te interesa.

Saludos,
José
```

### Email para tool widget embed

```
Asunto: Calculadora IMC gratis para tu post de fitness

Hola [name],

Vi tu post sobre [tema fitness en su blog]. Está buenísimo el enfoque.

Ofrezco gratis un widget de calculadora IMC que se embebe en tu post — tus lectores la usan ahí mismo sin abandonar tu site. 

Demo: https://toolram.com/calculadora-imc

Snippet (1 línea):
<iframe src="https://toolram.com/embed/calculadora-imc" ...></iframe>

Solo pido un link de atribución debajo (o donde quieras). El widget no tiene ads.

Si te sirve, te mando custom version en colores de tu blog gratis.

José
```

### Email para reclaim mention

```
Asunto: Mencionaste Toolram — gracias!

Hola [name],

Vi que mencionaste Toolram en tu post [URL]. Gracias por el shoutout!

Si te queda fácil, ¿podrías agregar el link a https://toolram.com? Ayuda a más gente a encontrarlo.

Sin presión.

José
```

---

## Backlink monitoring

### Stack gratis

- **Google Search Console** → "Links" report (semanal)
- **Bing Webmaster** → backlink report
- **Ahrefs Webmaster Tools** (free): backlinks limitado pero suficiente
- **Ubersuggest** free: 3 búsquedas/día
- **Manual**: site:google.com "toolram", site:bing.com "toolram"

### KPIs link building

| Métrica | Target Q3 2026 | Target Q1 2027 |
|---------|----------------|----------------|
| Dominios refer únicos | 25 | 150 |
| DR>20 | 15 | 80 |
| DR>40 | 5 | 25 |
| .edu links | 0 | 3 |
| .gov links | 0 | 1 |
| Brand mentions (con o sin link) | 30/mes | 200/mes |
| Direct + branded traffic % | 8% | 25% |

---

## Anti-patterns (NO hacer)

❌ Comprar backlinks en Fiverr ($5 = 1000 backlinks de mala calidad)
❌ PBN (private blog networks) — Google los detecta y penaliza
❌ Link exchange masivo
❌ Comments con link en blogs random
❌ Foros con firma + link
❌ Wikipedia links auto-puestos (los borran)
❌ Footer links sitewide en sites comprados
❌ Anchor text exact match >30% del perfil

---

## Resumen ejecutable

### Esta semana (semana 1)

- [ ] Agregar footer link `toolram.com` en 10+ sitios propios
- [ ] Publicar 3 posts contextuales en sitios propios mencionando Toolram
- [ ] Set up Brand24 / Google Alerts para "Toolram"
- [ ] Crear cuenta y submit a producthunt, alternativeto

### Este mes (mes 1)

- [ ] 50 emails outreach widget embed (5-10 acepta)
- [ ] 10 respuestas Quora/Reddit con link contextual relevante
- [ ] 1 guest post pitch a blog DR>30
- [ ] HARO: 20 pitches → 1-3 cita
- [ ] Submit a 5 tools directories

### Trimestre 1

- [ ] Lanzar API pública + documentar
- [ ] 1 dataset/study propio publicado
- [ ] 50+ widget outreach
- [ ] 5 guest posts publicados

### Año 1

- [ ] 150+ dominios refer
- [ ] 5+ menciones en medios DR>50 vía HARO/PR
- [ ] 1-3 .edu links via partnership universitario
- [ ] 250K+ visitas/mes orgánicas como resultado
