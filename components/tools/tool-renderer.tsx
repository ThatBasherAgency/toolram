"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const map = {
  "contador-palabras": dynamic(() => import("./word-counter").then((m) => m.WordCounter), { ssr: false }),
  "contador-caracteres": dynamic(() => import("./character-counter").then((m) => m.CharacterCounter), { ssr: false }),
  "convertir-mayusculas": dynamic(() => import("./case-converter").then((m) => m.CaseConverter), { ssr: false }),
  "lorem-ipsum": dynamic(() => import("./lorem-ipsum").then((m) => m.LoremIpsum), { ssr: false }),
  "generador-passwords": dynamic(() => import("./password-generator").then((m) => m.PasswordGenerator), { ssr: false }),
  "generador-uuid": dynamic(() => import("./uuid-generator").then((m) => m.UuidGenerator), { ssr: false }),
  "generador-qr": dynamic(() => import("./qr-generator").then((m) => m.QrGenerator), { ssr: false }),
  "json-formatter": dynamic(() => import("./json-formatter").then((m) => m.JsonFormatter), { ssr: false }),
  "base64-encode": dynamic(() => import("./base64").then((m) => m.Base64Tool), { ssr: false }),
  "url-encode": dynamic(() => import("./url-encode").then((m) => m.UrlEncodeTool), { ssr: false }),
  "hash-md5-sha": dynamic(() => import("./hash-tool").then((m) => m.HashTool), { ssr: false }),
  "cps-test": dynamic(() => import("./cps-test").then((m) => m.CpsTest), { ssr: false }),
  "tiempo-reaccion": dynamic(() => import("./reaction-test").then((m) => m.ReactionTest), { ssr: false }),
  cronometro: dynamic(() => import("./stopwatch").then((m) => m.Stopwatch), { ssr: false }),
  "ruleta-decision": dynamic(() => import("./decision-wheel").then((m) => m.DecisionWheel), { ssr: false })
} as const;

export function ToolRenderer({ slug }: { slug: string }) {
  const Component = useMemo(() => map[slug as keyof typeof map], [slug]);
  if (!Component) {
    return <div className="card text-center !py-10 text-[color:var(--color-fg-soft)]">🚧 Esta herramienta estará disponible muy pronto.</div>;
  }
  return <Component />;
}
