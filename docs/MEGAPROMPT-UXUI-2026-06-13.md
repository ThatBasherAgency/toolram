# MEGA-PROMPT — Auditoría UX/UI completa de toolram.com

> Fecha base: **2026-06-13**. Sitio: Next.js 15 / Tailwind v4 (oklch tokens, dark mode) en Vercel.
> Calibrado al código real en `~/clients/toolram/src`. NO genérico.

---

## 0. Realidad medida (punto de partida honesto)

- **No hay grabaciones ni heatmaps** (no Clarity/Hotjar). **Todo juicio UX aquí es inferencia hasta instalar Clarity.** Acción cero: instalar Microsoft Clarity para convertir inferencia en observación (rage clicks, dead clicks, scroll depth, dónde abandonan).
- **Tráfico ~0**, así que no hay datos de comportamiento agregados; la UX se evalúa por heurística experta + Core Web Vitals de laboratorio, no por funnel real todavía.
- El sitio ya está bien construido: tokens oklch, dark mode, componentes limpios, lucide icons, Tailwind v4. El trabajo UX no es reconstruir — es **pulir conversión, jerarquía y velocidad percibida** para que cuando llegue tráfico, convierta y mande señales de uso (lo que SÍ ayuda al ranking de un sitio de tools).

---

## 1. Objetivo

Para un sitio de herramientas, el "convertir" no es comprar: es **(a) que el visitante encuentre la tool en < 5 s, (b) la USE (no solo la mire), (c) descubra 1–2 tools más, (d) vuelva o la guarde.** Cada uno manda una señal a Google. Optimizar la UX/UI para maximizar esos cuatro eventos.

---

## 2. Marco de auditoría (recorrer las 6 capas)

### Capa 1 — First Paint / Above the fold (home y tool-page)
- ¿Se entiende en 3 s qué es el sitio y qué puedo hacer AHORA? La home actual abre con hero + buscador + chips de tools (bien). Tool-page: ¿la herramienta funcional está visible sin scroll, o hay que pasar bloques de texto SEO primero? **En tool-pages, la herramienta debe ir ARRIBA; el contenido SEO largo, debajo.** Verificar `app/[slug]/page.tsx`.
- Contraste WCAG AA del texto `--color-fg-soft` (oklch 0.45) sobre `--color-bg` — validar ≥ 4.5:1 en claro y oscuro.
- ¿El buscador tiene foco/atajo de teclado ("/") y autocompletar? Es la acción #1 de un sitio de 162 tools.

### Capa 2 — Arquitectura de información / navegación
- 17 categorías + 162 tools: ¿el menú deja llegar a cualquier tool en ≤ 2 clics? ¿Hay "más usadas" y "recientes" para no obligar a navegar?
- Estado vacío del buscador, resultados sin match, y búsqueda con typo (fuzzy).
- Breadcrumbs en tool-pages (también es schema BreadcrumbList — doble beneficio SEO+UX).
- ¿Enlazado "related tools" al final de cada tool para subir páginas/sesión? (clave para señal de uso).

### Capa 3 — La herramienta en sí (el corazón)
- Cada tool: ¿input claro, resultado instantáneo, botón copiar/descargar evidente, sin fricción?
- Microcopy de error y de estado (cargando, copiado, límite).
- ¿Funciona 100% sin registro y sin uploads lentos (promesa del hero)? Verificar que el procesamiento es client-side donde se promete "en tu navegador".
- Mobile: 74%+ del tráfico de tools es móvil. Inputs, botones (≥ 44px), teclado correcto (`inputmode`), nada cortado.

### Capa 4 — Velocidad percibida (Core Web Vitals)
- Correr Lighthouse mobile + desktop sobre home, una calculadora, una tool de PDF/imagen (las pesadas).
- LCP < 2.5 s, INP < 200 ms, CLS < 0.1. Vigilar: lucide-react (¿tree-shaken?), fuentes (system stack — bien), imágenes (next/image + lazy), JS de tools pesadas (cargar bajo `dynamic()` / al interactuar, no en el bundle inicial).
- `revalidate = 3600` en home: ok. Verificar que las tool-pages son estáticas (SSG) y rápidas.

### Capa 5 — Confianza / E-E-A-T visual
- ¿Hay señales de que esto es un producto real y mantenido? (about, autor, GitHub, "open source MIT", política de privacidad — ya existe `/privacidad`).
- Comparativas "honestas" vs iLovePDF/SmallPDF: gran activo de confianza y de GEO — asegurar que se ven y enlazan desde las tools relevantes.
- Dark mode sin bugs de contraste; favicon, OG images por página.

### Capa 6 — Conversión a "uso repetido"
- CTA secundario: "añadir a favoritos", "atajo a la home", PWA installable (manifest) → vuelve sin pasar por Google.
- "Tools relacionadas" y "siguiente paso lógico" (ej. tras unir PDF → comprimir PDF).
- Compartir resultado (link/imagen) → mecanismo de backlink/mención orgánico.

---

## 3. Método

1. Instalar Clarity, esperar datos (paralelo al resto).
2. Heurística Nielsen (10) + auditoría a11y (axe) sobre 5 plantillas: home, categoría, tool-page calculadora, tool-page PDF/imagen, blog post.
3. Lighthouse en las mismas 5.
4. Recorrido móvil real (DevTools device + un teléfono).
5. Salida: lista priorizada **Impacto × Esfuerzo** (P0/P1/P2), cada hallazgo con archivo:línea y el fix concreto.

---

## 4. Entregable

Tabla `hallazgo | capa | severidad | archivo:línea | fix propuesto | impacto esperado` + un "top 10 que haría ya". Y los 3 cambios que más suben la probabilidad de que un visitante USE la tool (no solo la vea), porque ese es el evento que correlaciona con ranking en sitios de utilidades.

---

## 5. Regla de oro

No rediseñar por gusto. El sitio ya se ve moderno. Cada cambio UX debe defenderse por **uno de los cuatro eventos** (encontrar / usar / descubrir otra / volver) o por **Core Web Vitals**. Lo demás es ruido.
