/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  async redirects() {
    return [
      { source: "/:path*", has: [{ type: "host", value: "www.toolram.com" }], destination: "https://toolram.com/:path*", permanent: true }
    ];
  },
  async headers() {
    return [
      {
        // 27-sep-2026 - JEV-003/004/005/006/011. Vercel sirve /index con EL MISMO fichero
        // prerenderizado de la portada: mismo etag (db22999d99b1c901f49474a02367f3b7) y
        // x-matched-path: /. Por eso /index duplica title, meta descripcion y texto de la
        // portada (5 hallazgos de la auditoria) y arrastra sus 5 hreflang, ninguno apuntando
        // a /index (de ahi el "hreflang sin auto-referencia").
        //
        // NO existe app/index/page.tsx: no hay metadata propia donde poner robots noindex,
        // y ponerlo en app/page.tsx desindexaria LA PORTADA. Tampoco se redirige (no esta
        // autorizado) ni se borra nada. La cabecera HTTP es la unica via que afecta solo a
        // /index: Google trata X-Robots-Tag igual que la meta robots. "follow" conserva el
        // enlazado. /index no esta en el sitemap (0 de 334 URLs) ni lo enlaza ninguna pagina.
        source: "/index",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }]
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      }
    ];
  }
};
module.exports = nextConfig;
