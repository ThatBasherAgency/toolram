import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Toolram — Herramientas online gratis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
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
          background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
          color: "white",
          fontFamily: "system-ui"
        }}
      >
        <div style={{ fontSize: 140, marginBottom: 20 }}>🔧</div>
        <div style={{ fontSize: 80, fontWeight: 800 }}>Toolram</div>
        <div style={{ fontSize: 36, opacity: 0.9, marginTop: 8 }}>Herramientas online gratis</div>
        <div style={{ fontSize: 28, opacity: 0.7, marginTop: 8 }}>PDF · SEO · IA · Símbolos · Tests · 150+ tools</div>
      </div>
    ),
    { ...size }
  );
}
