"use client";
import { useState } from "react";
import { Zap, Loader2, ExternalLink } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.65 0.2 145)";

type Metric = { url: string; ttfb: number; total: number; status: number; size?: number };

export function WebSpeedTest() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Metric | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function test() {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const r = await fetch(`/api/speed-test?url=${encodeURIComponent(url)}`);
      const data = await r.json();
      if (data.error) setError(data.error);
      else setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  function score(ms: number, good: number, ok: number): { color: string; label: string } {
    if (ms <= good) return { color: "oklch(0.65 0.18 145)", label: "Excelente" };
    if (ms <= ok) return { color: "oklch(0.7 0.18 75)", label: "Aceptable" };
    return { color: "oklch(0.6 0.22 35)", label: "Lento" };
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Test de Velocidad Web</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Mide TTFB y tiempo total de carga · Diagnóstico instantáneo desde Edge.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <div className="flex gap-2">
          <input type="url" className="flex-1 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-mono focus:outline-none focus:border-[color:var(--color-brand)]" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://ejemplo.com" onKeyDown={(e) => e.key === "Enter" && test()} />
          <button onClick={test} disabled={loading || !url} className="px-6 py-3 rounded-xl text-white font-bold disabled:opacity-40 inline-flex items-center gap-2" style={{ background: ACCENT }}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            {loading ? "Midiendo..." : "Medir"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl bg-[color:var(--color-danger)]/10 border border-[color:var(--color-danger)] p-4 mb-6 text-[color:var(--color-danger)] text-sm">{error}</div>
      )}

      {result && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><Zap className="w-3 h-3" /> Tiempo total</div>
            <div className="text-7xl md:text-8xl font-black tabular-nums">{result.total}<span className="text-3xl">ms</span></div>
            <div className="mt-2 text-lg font-bold">{score(result.total, 1000, 3000).label}</div>
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto text-sm">
              <div>
                <div className="text-xs opacity-80 uppercase">TTFB</div>
                <div className="text-2xl font-extrabold">{result.ttfb}<span className="text-xs">ms</span></div>
                <div className="text-[10px] opacity-80">{score(result.ttfb, 200, 600).label}</div>
              </div>
              <div>
                <div className="text-xs opacity-80 uppercase">Status</div>
                <div className="text-2xl font-extrabold">{result.status}</div>
              </div>
              {result.size && (
                <div>
                  <div className="text-xs opacity-80 uppercase">Tamaño</div>
                  <div className="text-2xl font-extrabold">{(result.size / 1024).toFixed(1)}<span className="text-xs">KB</span></div>
                </div>
              )}
            </div>
          </div>

          <AdSlot slot="speed_inline" format="auto" minHeight={180} className="mb-6" />

          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-4 text-sm">
            <div className="font-bold mb-2">📊 Análisis avanzado en Google PageSpeed Insights</div>
            <a href={`https://pagespeed.web.dev/report?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="text-[color:var(--color-brand)] inline-flex items-center gap-1 font-bold">Abrir en PageSpeed Insights <ExternalLink className="w-3 h-3" /></a>
          </div>
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📈 Métricas que importan</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">TTFB (Time To First Byte):</strong> &lt; 200ms excelente, &lt; 600ms aceptable. Mide velocidad del servidor.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Tiempo total HTML:</strong> &lt; 1s ideal. Solo mide HTML, no incluye CSS/JS/imágenes.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Para LCP/FCP/CLS</strong> usá PageSpeed Insights — son métricas Core Web Vitals que impactan SEO.</li>
        </ul>
      </div>
    </div>
  );
}
