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
  "ruleta-decision": dynamic(() => import("./decision-wheel").then((m) => m.DecisionWheel), { ssr: false }),
  "unir-pdf": dynamic(() => import("./pdf-merge").then((m) => m.PdfMerge), { ssr: false }),
  "dividir-pdf": dynamic(() => import("./pdf-split").then((m) => m.PdfSplit), { ssr: false }),
  "rotar-pdf": dynamic(() => import("./pdf-rotate").then((m) => m.PdfRotate), { ssr: false }),
  "marca-agua-pdf": dynamic(() => import("./pdf-watermark").then((m) => m.PdfWatermark), { ssr: false }),
  "numerar-pdf": dynamic(() => import("./pdf-page-numbers").then((m) => m.PdfPageNumbers), { ssr: false }),
  "imagenes-a-pdf": dynamic(() => import("./jpg-to-pdf").then((m) => m.JpgToPdf), { ssr: false }),
  "proteger-pdf": dynamic(() => import("./pdf-protect").then((m) => m.PdfProtect), { ssr: false }),
  "informacion-pdf": dynamic(() => import("./pdf-info").then((m) => m.PdfInfo), { ssr: false }),
  "redimensionar-imagen": dynamic(() => import("./image-resize").then((m) => m.ImageResize), { ssr: false }),
  "comprimir-imagen": dynamic(() => import("./image-compress").then((m) => m.ImageCompress), { ssr: false }),
  "convertir-imagen": dynamic(() => import("./image-convert").then((m) => m.ImageConvert), { ssr: false }),
  "conversor-temperatura": dynamic(() => import("./temperature-converter").then((m) => m.TemperatureConverter), { ssr: false }),
  "conversor-unidades": dynamic(() => import("./unit-converter").then((m) => m.UnitConverter), { ssr: false }),
  "timestamp-converter": dynamic(() => import("./timestamp-converter").then((m) => m.TimestampConverter), { ssr: false }),
  "typing-test": dynamic(() => import("./typing-test").then((m) => m.TypingTest), { ssr: false }),
  temporizador: dynamic(() => import("./timer").then((m) => m.Timer), { ssr: false }),
  "numero-aleatorio": dynamic(() => import("./random-number").then((m) => m.RandomNumber), { ssr: false }),
  "cara-cruz": dynamic(() => import("./coin-flip").then((m) => m.CoinFlip), { ssr: false }),
  dados: dynamic(() => import("./dice-roller").then((m) => m.DiceRoller), { ssr: false }),
  "regex-tester": dynamic(() => import("./regex-tester").then((m) => m.RegexTester), { ssr: false }),
  "convertidor-color": dynamic(() => import("./color-converter").then((m) => m.ColorConverter), { ssr: false }),
  "texto-invertido": dynamic(() => import("./text-reverse").then((m) => m.TextReverse), { ssr: false }),
  "eliminar-acentos": dynamic(() => import("./remove-accents").then((m) => m.RemoveAccents), { ssr: false })
} as const;

export function ToolRenderer({ slug }: { slug: string }) {
  const Component = useMemo(() => map[slug as keyof typeof map], [slug]);
  if (!Component) {
    return <div className="card text-center !py-10 text-[color:var(--color-fg-soft)]">🚧 Esta herramienta estará disponible muy pronto.</div>;
  }
  return <Component />;
}
