# Toolram

> Portal gratis de herramientas online: PDF, SEO, IA, símbolos, tests, generadores y más.

🌐 **toolram.com**

## Stack

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS v4
- Vercel (deploy)
- Sin DB (fase 1) — todo client-side cuando se puede

## Desarrollo

```bash
pnpm install
pnpm dev
```

## Agregar una herramienta nueva

1. Crear el componente en `components/tools/<nombre>.tsx`
2. Registrarlo en `lib/tools-registry.ts` (slug, categoría, FAQs, keywords)
3. Mapearlo en `components/tools/tool-renderer.tsx`
4. La página, sitemap, breadcrumbs y schema se generan automáticamente desde el registry

## Categorías

📝 Texto · 🔍 SEO · 📄 PDF · 🖼️ Imágenes · 💻 Desarrollador · 🔄 Conversores · ✨ Generadores · 🧮 Calculadoras · ♥ Símbolos · 𝓐 Texto decorado · ⏱️ Tests · 🎲 Aleatorios · 🤖 IA

## SEO

- Sitemap dinámico (`/sitemap.xml`)
- robots.txt con allow para GPTBot, ClaudeBot, PerplexityBot
- llms.txt en raíz
- Schema.org SoftwareApplication + FAQPage + BreadcrumbList por tool
- Open Graph dinámico

## Privacidad

Procesamiento client-side por defecto. Tools que requieren backend lo indican explícitamente.
