import { ImageResponse } from "next/og";
import { POSTS_BY_SLUG } from "@/data/blog";

// 27-sep-2026 - JEV-008. De las 51 paginas sin og:image, 45 ya las cubren
// app/[slug]/opengraph-image.tsx y app/categoria/[slug]/opengraph-image.tsx. Las 6
// restantes son los posts del blog: app/blog/[...slug]/page.tsx declara su propio bloque
// openGraph (title, description, type article, publishedTime...) y al hacerlo Next deja de
// heredar la imagen del sitio (app/opengraph-image.tsx). Comprobado en vivo el 27-sep:
// /blog/firmar-pdf-online-gratis-guia-2026 servia og:title pero NINGUN og:image.
// El resto de secciones (/glosario, /alternativas, /calculadoras, /texto-decorado,
// /simbolos, /buscar, /blog, /herramientas, /contacto, /sobre, /privacidad, /en) NO
// declaran openGraph propio: heredan bien la imagen del sitio y no habia nada que tocar.
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Toolram — guía del blog";

export default async function OG({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const post = POSTS_BY_SLUG[`blog/${slug.join("/")}`];
  // Los titulares del blog son largos (el mas corto de los 6 pasa de 70 caracteres), asi
  // que se corta por el primer ":" y se escala el cuerpo segun lo que quede.
  const titulo = (post?.title ?? slug.join(" ").replace(/-/g, " ")).split(":")[0].trim();
  const cuerpo = titulo.length > 60 ? 50 : titulo.length > 38 ? 62 : 76;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 80px",
          textAlign: "center",
          background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
          color: "white",
          fontFamily: "system-ui"
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, opacity: 0.85, letterSpacing: 2 }}>
          TOOLRAM{post?.category ? ` · ${post.category.toUpperCase()}` : ""}
        </div>
        <div style={{ fontSize: cuerpo, fontWeight: 800, marginTop: 20, lineHeight: 1.15 }}>{titulo}</div>
        <div style={{ fontSize: 30, opacity: 0.9, marginTop: 24 }}>Gratis · sin registro · en tu navegador</div>
      </div>
    ),
    { ...size }
  );
}
