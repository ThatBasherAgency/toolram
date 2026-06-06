<div align="center">

# Toolram

### 100+ free online tools that run in your browser — your files are never uploaded

[**toolram.com**](https://toolram.com) · Privacy-first · No signup · Open source

</div>

---

**Toolram** is a collection of 100+ small, fast web tools — PDF, QR codes, calculators, SEO utilities, text and developer tools. The defining constraint: **almost everything runs 100% client-side**. PDF operations use [`pdf-lib`](https://github.com/Hopding/pdf-lib) in the browser, media uses `FFmpeg.wasm`, hashing/crypto uses the Web Crypto API. Your files never leave your device — you can verify it in the network tab.

No accounts. No watermarks. No "uploading… 2 minutes left" for a 3 MB file. Spanish-first (built in Mexico), with a growing English mirror at [`/en`](https://toolram.com/en).

## Why it's different

| | Toolram | Typical "free" online tools |
|---|---|---|
| Where your file is processed | **In your browser** | Uploaded to their server |
| Signup required | No | Often |
| Watermarks | No | On free tier |
| Works offline (after first load) | Many tools | No |
| Open source | **Yes** | Rarely |

## What's inside

📄 **PDF** — merge, split, rotate, sign, compress, watermark, page numbers (all client-side)
🔍 **SEO** — meta tags, schema, robots.txt, canonical, keyword tools
🧮 **Calculators** — tip, rule of three, VAT (Mexico), BMI, compound interest, due dates
⏱️ **Tests** — [CPS / click speed test](https://toolram.com/cps-test), reaction time, typing
🔣 **Generators** — QR codes (URL, WiFi, vCard), passwords, UUIDs, fancy text, symbols
💻 **Developer** — JWT decoder, hash, base64, CSS generators, subnet calculator
🤖 **AI & text** — word counter, case converter, text utilities

Plus honest [side-by-side comparisons](https://toolram.com/alternativas) with iLovePDF, Smallpdf, PiliApp and others — including where they beat us.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- Statically rendered (SSG), deployed on **Vercel**
- No database — state lives in the browser
- WebAssembly for heavy client-side work (`pdf-lib`, `FFmpeg.wasm`, Web Crypto API)

## Development

```bash
pnpm install
pnpm dev
```

### Adding a tool

1. Create the component in `components/tools/<name>.tsx`
2. Register it in `lib/tools-registry.ts` (slug, category, FAQs, keywords)
3. Map it in `components/tools/tool-renderer.tsx`
4. Page, sitemap, breadcrumbs and Schema.org JSON-LD are generated automatically from the registry

## SEO & AI-friendliness

- Dynamic sitemap, `llms.txt`, IndexNow
- `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot and 20+ AI crawlers
- Schema.org `SoftwareApplication` + `FAQPage` + `BreadcrumbList` per tool; `WebSite` + `Organization` + `Person` globally

## Contributing

Issues and PRs welcome — especially **which client-side tools are missing** and where the WASM approach breaks down for you (big files, mobile, edge cases). If Toolram is useful to you, a ⭐ helps it reach more people.

## Author

Built by [**José Gaspard**](https://josegaspard.dev) (Mexico) · [@toolram](https://twitter.com/toolram)

## License

MIT
