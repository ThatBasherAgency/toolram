import { ImageResponse } from "next/og";
import { CATEGORIES } from "@/lib/tools-registry";

// 27-sep-2026: 51 paginas servian openGraph SIN imagen. La del sitio (app/opengraph-image.tsx)
// solo cubre la portada: cuando una ruta declara su propio bloque openGraph, Next deja de
// heredarla. Esta ruta da a CADA herramienta su propia imagen con su nombre.
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Toolram — categoria de herramientas online gratis";

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = Object.values(CATEGORIES).find((c) => c.slug === slug);
  const nombre = cat ? `Herramientas de ${cat.name}` : slug.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());
  const grande = nombre.length > 26;
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
        <div style={{ fontSize: 34, fontWeight: 700, opacity: 0.85, letterSpacing: 2 }}>TOOLRAM</div>
        <div style={{ fontSize: grande ? 68 : 86, fontWeight: 800, marginTop: 18, lineHeight: 1.1 }}>{nombre}</div>
        <div style={{ fontSize: 32, opacity: 0.9, marginTop: 22 }}>Gratis · sin registro · en tu navegador</div>
      </div>
    ),
    { ...size }
  );
}
