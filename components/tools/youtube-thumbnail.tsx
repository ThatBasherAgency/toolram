"use client";
import { useMemo, useState } from "react";
import { Download, Youtube } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.24 25)";

const SIZES = [
  { name: "Maxres (1920x1080)", file: "maxresdefault.jpg" },
  { name: "HQ (480x360)", file: "hqdefault.jpg" },
  { name: "MQ (320x180)", file: "mqdefault.jpg" },
  { name: "SD (640x480)", file: "sddefault.jpg" },
  { name: "Default (120x90)", file: "default.jpg" }
];

function extractId(url: string): string | null {
  const u = url.trim();
  if (!u) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/
  ];
  for (const p of patterns) {
    const m = u.match(p);
    if (m) return m[1];
  }
  return null;
}

export function YoutubeThumbnail() {
  const [url, setUrl] = useState("");

  const id = useMemo(() => extractId(url), [url]);

  async function download(file: string) {
    if (!id) return;
    const link = `https://i.ytimg.com/vi/${id}/${file}`;
    try {
      const r = await fetch(link);
      const blob = await r.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `youtube-thumbnail-${id}-${file}`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      window.open(link, "_blank");
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Descargar Miniatura YouTube</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Descarga la miniatura de cualquier video de YouTube en 5 calidades · Maxres, HQ, MQ, SD, default.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">URL del video o ID</span>
          <input className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-mono focus:outline-none focus:border-[color:var(--color-brand)]" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
          {url && !id && <div className="text-xs text-[color:var(--color-danger)] mt-2">No se detectó un ID válido de YouTube.</div>}
          {id && <div className="text-xs text-[color:var(--color-fg-soft)] mt-2">Video ID: <strong className="text-[color:var(--color-fg)] font-mono">{id}</strong></div>}
        </label>
      </div>

      {id && (
        <>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {SIZES.map((s) => (
              <div key={s.file} className="rounded-2xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] overflow-hidden">
                <div className="aspect-video bg-[color:var(--color-bg-soft)]">
                  <img src={`https://i.ytimg.com/vi/${id}/${s.file}`} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-3 flex items-center justify-between gap-2">
                  <div className="text-xs font-bold uppercase">{s.name}</div>
                  <button onClick={() => download(s.file)} className="px-3 py-1.5 rounded-md text-xs font-bold text-white inline-flex items-center gap-1" style={{ background: ACCENT }}>
                    <Download className="w-3 h-3" /> Descargar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <AdSlot slot="ytthumb_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📺 Sobre las miniaturas</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Maxres (1920x1080)</strong> es la mejor calidad pero no todos los videos la tienen (depende de cuándo se subió).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">HQ (480x360)</strong> está disponible para todos los videos.</li>
          <li>• La descarga es directa desde i.ytimg.com (servidor oficial de YouTube).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Uso responsable:</strong> respeta los derechos de autor del creador del video.</li>
        </ul>
      </div>
    </div>
  );
}
