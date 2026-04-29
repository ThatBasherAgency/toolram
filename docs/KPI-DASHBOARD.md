# Toolram — KPI Dashboard & Tracking

> Lo que no se mide no mejora. Esta es la lista exhaustiva de qué medir, cómo medirlo, con qué frecuencia, y qué decisión tomar.

---

## KPIs Tier 1 — North Star (review semanal)

### 1. Sesiones orgánicas

**Qué**: visitas únicas que vienen de search engines.
**Source**: GA4 → Adquisición → Tráfico orgánico.
**Target trayectoria**:
- M3: 1K-3K/mes
- M6: 10K-25K/mes
- M9: 50K-80K/mes
- M12: 120K-180K/mes
- M18: 300K-500K/mes

**Si está debajo del target -30%**: review keyword targeting, content gaps.
**Si está encima +50%**: identificar la página/keyword winner y replicar pattern.

### 2. Páginas indexadas en Google

**Qué**: páginas que Google rastreó y agregó al índice.
**Source**: Google Search Console → Índice → Cobertura.
**Target trayectoria**:
- M3: 350-500
- M6: 1,200-1,800
- M12: 4,000-5,000
- M18: 8,000+

**Indexation rate** = (páginas indexadas) / (páginas en sitemap).
- Healthy: >75%
- Warning: 50-75% (auditar discoverability + content quality)
- Critical: <50% (problemas técnicos o thin content)

### 3. Keywords ranking top-10

**Qué**: cantidad de keywords donde Toolram aparece en posiciones 1-10 de Google.
**Source**: Google Search Console → Performance → Filter "Position ≤ 10".
**Target**:
- M3: 20
- M6: 100
- M12: 1,000
- M18: 4,000

### 4. Backlinks de calidad

**Qué**: dominios refer únicos con DR > 20.
**Source**: Ahrefs Webmaster Tools (free) o Ubersuggest.
**Target**:
- M3: 5
- M6: 25
- M12: 150
- M18: 400

---

## KPIs Tier 2 — Operacionales (review mensual)

### 5. Click-through rate (CTR) en SERPs

**Qué**: % de impressions que resultan en click.
**Source**: GSC → Performance.
**Benchmark**:
- Position 1: 28-32%
- Position 5: 7-10%
- Position 10: 2-3%

**Si CTR está debajo del benchmark**: optimizar title + meta description.

### 6. Average position en GSC

**Source**: GSC → Performance → Average position.
**Target trayectoria**:
- M3: <50
- M6: <30
- M12: <18
- M18: <12

### 7. Core Web Vitals

**Source**: GSC → Experience → Core Web Vitals + Vercel Analytics.
**Target**:
- LCP: <1.5s mobile, <1.0s desktop
- INP: <200ms (75th percentile)
- CLS: <0.05
- TTFB: <500ms

### 8. Engagement metrics

**Source**: GA4 + Microsoft Clarity.

| Métrica | Target |
|---------|--------|
| Bounce rate | <50% |
| Average session duration | >90s |
| Pages per session | >1.8 |
| Engaged sessions % | >55% |

### 9. AdSense / monetization metrics (cuando activo)

| Métrica | Benchmark |
|---------|-----------|
| RPM (revenue per mille) | $1-5 español, $5-15 inglés |
| CTR ads | 1-3% |
| Viewability | >60% |
| Monthly revenue | $200/M=50K visitas, $1500/M=300K, $5K/M=500K+ |

### 10. Conversion (cuando exista plan Pro)

| Métrica | Target |
|---------|--------|
| Visits → Pro signup | 0.5-1.5% |
| Free → Pro upgrade | 1-3% del active free |
| Churn mensual Pro | <5% |
| LTV Pro | $40-80 |

---

## KPIs Tier 3 — Análisis profundo (review trimestral)

### 11. Topical authority por categoría

% de keywords ranking top-10 dividido por categoría:

| Categoría | M6 target | M12 target |
|-----------|-----------|-------------|
| PDF | 15 keywords top-10 | 100+ |
| Símbolos | 30 keywords top-10 | 200+ |
| Fancy text | 25 keywords top-10 | 100+ |
| Calculadoras | 20 keywords top-10 | 80+ |
| Dev tools | 10 keywords top-10 | 50+ |

**Si una categoría está rezagada**: invertir contenido extra ahí.

### 12. Brand search volume

**Qué**: búsquedas mensuales de "toolram" o variantes.
**Source**: Google Trends + DataForSEO.
**Target**: M12 = 1,000-5,000/mes; M18 = 10,000+/mes.

### 13. Direct traffic %

**Qué**: visitas escribiendo URL directa.
**Source**: GA4.
**Target**: M12 = 15-25% del total. Más alto = mayor brand recognition.

### 14. AI Overview citations

**Qué**: queries donde Toolram aparece como fuente citada en Google AI Overview, ChatGPT, Perplexity.
**Source**: manual + Profound (cuando esté).
**Target**:
- M6: 5 queries
- M12: 50 queries
- M18: 200+ queries

### 15. International expansion metrics

**Qué**: % de tráfico por país.
**Source**: GA4 → Audience → Geography.
**Target distribución M12**:
- México: 35%
- España: 12%
- Argentina: 8%
- Colombia: 7%
- Resto LATAM: 15%
- USA (es + en): 12%
- Otros: 11%

---

## Stack técnico de tracking

### Setup obligatorio (semana 1)

| Tool | Cost | Para qué |
|------|------|----------|
| **Google Search Console** | Free | Source of truth orgánico |
| **GA4** | Free | Behavior + revenue |
| **Microsoft Clarity** | Free | Heatmaps + session replay |
| **Bing Webmaster** | Free | Bing market share |
| **Vercel Analytics** | Free with Pro plan | Real CWV |

### Setup mes 3-6

| Tool | Cost | Para qué |
|------|------|----------|
| **Ahrefs Webmaster Tools** | Free | Backlinks limited |
| **Ubersuggest** | Free 3/día | Keyword research |
| **DataForSEO MCP** | Pay-per-call | Automated keyword tracking |
| **Brand24** | $39/mo | Brand monitoring |
| **Profound** | Free tier | AI citations |

### Setup mes 6-12 (cuando justifique)

| Tool | Cost | Para qué |
|------|------|----------|
| **Ahrefs** standard | $129/mo | Full backlinks + keywords |
| **SEMrush** | $139/mo | Competitor research |
| **AnswerThePublic** | $9/mo | Question keyword research |

---

## Dashboard layout sugerido

### Notion / Supabase / Google Sheet

**Tab 1 — Weekly snapshot**
- Sessions (este mes vs anterior)
- Indexed pages (delta)
- Keywords top-10 count
- New backlinks
- 1 acción tomada esta semana

**Tab 2 — Keywords tracking**
- 50 keywords primarias con position semana a semana
- Color: verde mejora, rojo empeora
- Notes column con qué cambió

**Tab 3 — Content performance**
- Por URL: clicks, impressions, CTR, position
- Top 20 winners
- Top 20 underperformers (oportunidad)

**Tab 4 — Backlinks log**
- Fecha | URL source | DR | Anchor | Target page | Source (outreach/orgánico/widget)

**Tab 5 — AI citations log**
- Fecha | Query | Plataforma (Google/ChatGPT/Perplexity) | Cita posición | Quote

**Tab 6 — Decisions log**
- Cada cambio mayor: hipótesis, acción, resultado a 30 días

---

## Reportes automatizados (mes 4+)

### Semanal a tu email (Lunes 8 AM)

```
Subject: Toolram weekly — Sem [N]

📊 Tráfico
- Orgánico: X (vs anterior +Y%)
- Top 5 países: ...

🔍 Search
- Indexed: X (delta)
- Keywords top-10: X (+Y nuevas)
- Top winning keywords: ...
- Top losing keywords: ...

🔗 Backlinks
- New refs: X
- Quality DR>20: X

⚠️ Alertas
- [Algo crítico que requiera acción]

💡 Recomendación
- [1 acción sugerida basada en data]
```

### Mensual completo (1ro de cada mes)

PDF con:
- Resumen ejecutivo 1 página
- Comparativa MoM y YoY
- Top 20 winners + análisis
- Top 20 losers + plan correctivo
- Roadmap próximo mes

**Implementación**: 
- Cron en GitHub Actions
- DataForSEO MCP para keywords
- GSC API para search data
- Generar markdown → PDF
- Email con Resend

---

## Triggers de acción (qué hacer cuando una métrica se desvía)

### Sessions cae 20%+ semana a semana

1. Revisar GSC → algoritmo update reciente?
2. Revisar Vercel deploy log → cambio rompe SEO?
3. Revisar uptime → outage?
4. Revisar new content quality

### Indexed pages baja

1. GSC → Pages report → ver razones
2. Coverage errors? → fix
3. Soft 404? → review thin content
4. Duplicate content? → canonicals

### Bounce rate sube

1. Clarity heatmap → dónde abandonan?
2. Page speed regression?
3. Tool roto en mobile?

### Keyword cae fuera de top-10

1. SERP analysis manual → qué cambió en SERP?
2. Competitor publicó algo mejor?
3. Refresh content propio + IndexNow ping

---

## Reportes externos (para clientes futuros / press / inversores)

Cuando Toolram crezca, prepará reportes públicos:
- Mensuales: stats agregados (privacy-respecting)
- Anuales: "State of Online Tools 2027" → linkbait gigante

Estos transparentan crecimiento → trust → más backlinks.

---

## Frequency cheatsheet

| Métrica | Cadencia |
|---------|----------|
| Sessions, indexed pages, top-10 KW | **Diario** (glance en GSC) |
| Backlinks, AI citations | **Semanal** |
| CTR, CWV, engagement | **Semanal** |
| Topical authority | **Mensual** |
| International | **Mensual** |
| Brand search | **Trimestral** |
| Full audit | **Trimestral** |
| Strategy review | **Trimestral** |
