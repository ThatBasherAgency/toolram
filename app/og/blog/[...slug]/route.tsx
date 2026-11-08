import { ImageResponse } from "next/og";
import { POSTS_BY_SLUG } from "@/data/blog";

// 7-nov-2026 - La imagen OG de los posts vivia en app/blog/[...slug]/opengraph-image.tsx,
// pero `next start` (VPS) rechaza un catch-all que no es el ultimo segmento ("Catch-all must
// be the last part of the URL"; Vercel lo toleraba). Se sirve aqui, con el catch-all al final,
// y app/blog/[...slug]/page.tsx la declara en openGraph.images. Mismo diseno que antes.
export const runtime = "edge";
const size = { width: 1200, height: 630 };

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
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
