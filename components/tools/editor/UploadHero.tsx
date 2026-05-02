"use client";
import { useRef, useState, type DragEvent } from "react";

type Props = {
  toolName: string;
  subtitle: string;
  accept: string;
  onFile: (file: File) => void;
  buttonLabel: string;
  accent: string;
  illustration: "pdf" | "image";
};

export function UploadHero({ toolName, subtitle, accept, onFile, buttonLabel, accent, illustration }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  function onDrop(e: DragEvent) { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files?.[0]; if (f) onFile(f); }
  function onDragOver(e: DragEvent) { e.preventDefault(); setDrag(true); }
  function onDragLeave() { setDrag(false); }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in oklch, ${accent} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{toolName}</span>
        </h1>
        <p className="text-lg md:text-xl text-[color:var(--color-fg-soft)] mb-10 max-w-xl mx-auto">{subtitle}</p>

        <div
          onClick={() => ref.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={`relative mx-auto rounded-3xl border-2 border-dashed cursor-pointer transition-all duration-200 px-6 py-16 md:py-20 ${drag ? "scale-[1.01]" : ""}`}
          style={{
            borderColor: drag ? accent : "var(--color-border)",
            background: drag ? `color-mix(in oklch, ${accent} 6%, transparent)` : "var(--color-bg-soft)"
          }}
        >
          <input ref={ref} type="file" accept={accept} className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
          <div className="mb-6">
            {illustration === "pdf" ? (
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mx-auto">
                <path d="M30 10 H72 L94 32 V104 C94 109.523 89.5228 114 84 114 H30 C24.4772 114 20 109.523 20 104 V20 C20 14.4772 24.4772 10 30 10 Z" fill="white" stroke={accent} strokeWidth="3" />
                <path d="M72 10 V32 H94" stroke={accent} strokeWidth="3" fill="none" />
                <rect x="32" y="58" width="16" height="22" rx="3" fill={accent} />
                <text x="40" y="74" textAnchor="middle" fill="white" fontSize="11" fontWeight="800">PDF</text>
                <rect x="36" y="86" width="42" height="3" rx="1.5" fill={accent} opacity="0.4" />
                <rect x="36" y="93" width="36" height="3" rx="1.5" fill={accent} opacity="0.4" />
              </svg>
            ) : (
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mx-auto">
                <rect x="14" y="20" width="92" height="80" rx="10" fill={accent} opacity="0.08" />
                <rect x="14" y="20" width="92" height="80" rx="10" stroke={accent} strokeWidth="3" />
                <circle cx="40" cy="48" r="9" fill={accent} opacity="0.5" />
                <path d="M14 88 L46 60 L74 80 L94 64 L106 76 L106 90 C106 95.5228 101.523 100 96 100 H24 C18.4772 100 14 95.5228 14 90 Z" fill={accent} opacity="0.45" />
              </svg>
            )}
          </div>
          <button
            type="button"
            className="px-12 py-5 rounded-2xl font-bold text-white text-lg shadow-2xl transition hover:scale-[1.03]"
            style={{ background: accent }}
          >
            {buttonLabel}
          </button>
          <div className="mt-5 text-sm text-[color:var(--color-fg-soft)]">o arrastrá tu archivo aquí</div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-10 max-w-xl mx-auto">
          <div className="text-center">
            <div className="text-2xl mb-1">🔒</div>
            <div className="text-xs font-semibold">100% privado</div>
            <div className="text-[10px] text-[color:var(--color-fg-soft)]">Procesado en tu navegador</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-xs font-semibold">Sin esperas</div>
            <div className="text-[10px] text-[color:var(--color-fg-soft)]">Sin upload, sin cola</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🎁</div>
            <div className="text-xs font-semibold">Gratis siempre</div>
            <div className="text-[10px] text-[color:var(--color-fg-soft)]">Sin marca de agua</div>
          </div>
        </div>
      </div>
    </div>
  );
}
