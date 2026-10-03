"use client";
import { useEffect } from "react";

/**
 * 3-oct-2026 · AdSense se carga con la PRIMERA interacción (toque, clic, tecla o scroll), no en el <head>.
 * Medido con Lighthouse móvil: con AdSense en el head la home daba 36 (TBT 1.620 ms) y /cps-test tenía
 * CLS 0,229 por los anuncios automáticos; bloqueando AdSense, 92 y CLS 0. Los <ins> de AdSlot hacen
 * push a window.adsbygoogle, que hace de cola hasta que llega el script, así que no se pierde ninguno.
 * La verificación de la cuenta sigue en la meta «google-adsense-account» del layout.
 */
const SRC = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5572962820995975";
const EVENTS = ["pointerdown", "keydown", "touchstart", "scroll"] as const;

export function AdsenseLoader() {
  useEffect(() => {
    let done = false;
    const load = () => {
      if (done) return;
      done = true;
      EVENTS.forEach((e) => window.removeEventListener(e, load));
      const s = document.createElement("script");
      s.async = true;
      s.src = SRC;
      s.crossOrigin = "anonymous";
      document.head.appendChild(s);
    };
    EVENTS.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    return () => EVENTS.forEach((e) => window.removeEventListener(e, load));
  }, []);
  return null;
}
