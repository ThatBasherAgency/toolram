"use client";
import { useRef, useState, type ReactNode, type DragEvent } from "react";
import { X } from "lucide-react";

type Props = {
  accept: string;
  onFile: (file: File) => void;
  loaded?: { name: string; size: number; thumbnail?: string } | null;
  onClear?: () => void;
  helpText?: string;
  buttonLabel?: string;
  accentColor?: string;
  illustration?: "pdf" | "image" | "edit";
};

export function DropZone({ accept, onFile, loaded, onClear, helpText, buttonLabel, accentColor = "oklch(0.55 0.22 30)", illustration = "pdf" }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onFile(f);
  }
  function onDragOver(e: DragEvent) { e.preventDefault(); setDrag(true); }
  function onDragLeave() { setDrag(false); }

  if (loaded) {
    return (
      <div className="flex items-center gap-4 p-5 rounded-2xl border-2 bg-white dark:bg-[color:var(--color-bg-soft)] shadow-sm" style={{ borderColor: accentColor }}>
        <div className="flex-shrink-0 w-20 h-24 rounded-xl flex items-center justify-center text-white shadow-lg overflow-hidden bg-[color:var(--color-bg-soft)]">
          {loaded.thumbnail ? (
            <img src={loaded.thumbnail} alt="" className="w-full h-full object-cover" />
          ) : <Illustration kind={illustration} color={accentColor} size={48} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold truncate text-lg">{loaded.name}</div>
          <div className="text-sm text-[color:var(--color-fg-soft)] mt-0.5">{(loaded.size / 1024 / 1024).toFixed(2)} MB</div>
          <button type="button" onClick={() => ref.current?.click()} className="mt-1 text-sm font-semibold inline-flex items-center gap-1" style={{ color: accentColor }}>
            ↻ Cambiar archivo
          </button>
          <input ref={ref} type="file" accept={accept} className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
        </div>
        {onClear && (
          <button onClick={onClear} className="flex-shrink-0 w-11 h-11 rounded-full bg-[color:var(--color-bg-soft)] hover:bg-[color:var(--color-danger)] hover:text-white flex items-center justify-center transition" aria-label="Quitar archivo">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={() => ref.current?.click()}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`relative cursor-pointer rounded-3xl border-2 border-dashed transition-all duration-200 px-6 py-16 md:py-24 text-center min-h-[440px] flex flex-col items-center justify-center ${drag ? "scale-[1.01]" : ""}`}
      style={{
        borderColor: drag ? accentColor : "var(--color-border)",
        background: drag
          ? `color-mix(in oklch, ${accentColor} 8%, transparent)`
          : "linear-gradient(180deg, color-mix(in oklch, var(--color-bg-soft) 80%, transparent), color-mix(in oklch, var(--color-bg-soft) 40%, transparent))"
      }}
    >
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />

      <div className="mb-6 transition-transform" style={{ transform: drag ? "scale(1.1)" : "scale(1)" }}>
        <Illustration kind={illustration} color={accentColor} size={140} />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
        {drag ? "Soltá el archivo aquí" : "Arrastrá tu archivo o hacé click"}
      </h2>
      <p className="text-base text-[color:var(--color-fg-soft)] mb-8 max-w-md">{helpText || "Tu archivo nunca sale de tu navegador. Procesamiento 100% local."}</p>

      <button type="button" className="px-12 py-5 rounded-2xl font-bold text-white text-lg shadow-2xl transition hover:scale-[1.03] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]" style={{ background: accentColor }}>
        {buttonLabel || "Seleccionar archivo"}
      </button>

      <div className="mt-6 text-xs text-[color:var(--color-fg-soft)]">o arrastrá el archivo a esta zona</div>
    </div>
  );
}

function Illustration({ kind, color, size }: { kind: "pdf" | "image" | "edit"; color: string; size: number }) {
  if (kind === "image") {
    return (
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
        <rect x="14" y="20" width="92" height="80" rx="10" fill={color} opacity="0.08" />
        <rect x="14" y="20" width="92" height="80" rx="10" stroke={color} strokeWidth="3" />
        <circle cx="40" cy="48" r="9" fill={color} opacity="0.5" />
        <path d="M14 88 L46 60 L74 80 L94 64 L106 76 L106 90 C106 95.5228 101.523 100 96 100 H24 C18.4772 100 14 95.5228 14 90 Z" fill={color} opacity="0.45" />
      </svg>
    );
  }
  if (kind === "edit") {
    return (
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
        <rect x="20" y="14" width="68" height="92" rx="8" fill="white" stroke={color} strokeWidth="3" />
        <rect x="30" y="28" width="44" height="3" rx="1.5" fill={color} opacity="0.5" />
        <rect x="30" y="38" width="48" height="3" rx="1.5" fill={color} opacity="0.5" />
        <rect x="30" y="48" width="40" height="3" rx="1.5" fill={color} opacity="0.5" />
        <path d="M86 60 L100 74 L78 96 L62 100 L66 84 L86 60 Z" fill={color} opacity="0.95" stroke="white" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <path d="M30 10 H72 L94 32 V104 C94 109.523 89.5228 114 84 114 H30 C24.4772 114 20 109.523 20 104 V20 C20 14.4772 24.4772 10 30 10 Z" fill="white" stroke={color} strokeWidth="3" />
      <path d="M72 10 V32 H94" stroke={color} strokeWidth="3" fill="none" />
      <rect x="32" y="58" width="16" height="22" rx="3" fill={color} />
      <text x="40" y="74" textAnchor="middle" fill="white" fontSize="11" fontWeight="800">PDF</text>
      <rect x="36" y="86" width="42" height="3" rx="1.5" fill={color} opacity="0.4" />
      <rect x="36" y="93" width="36" height="3" rx="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

export function PrimaryAction({ children, onClick, disabled, color = "var(--color-brand)" }: { children: ReactNode; onClick: () => void; disabled?: boolean; color?: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full md:w-auto md:min-w-[320px] mx-auto block py-5 px-12 rounded-2xl font-bold text-white text-lg shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:scale-[1.02] enabled:hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]"
      style={{ background: disabled ? "var(--color-fg-soft)" : color }}
    >
      <span className="inline-flex items-center justify-center gap-2.5">{children}</span>
    </button>
  );
}

export function ProcessingBar({ label, percent }: { label: string; percent?: number }) {
  return (
    <div className="rounded-2xl border bg-white dark:bg-[color:var(--color-bg-soft)] p-8 text-center shadow-sm">
      <div className="inline-flex items-center gap-3 text-base font-semibold mb-3">
        <div className="w-6 h-6 rounded-full border-[3px] border-[color:var(--color-brand)] border-t-transparent animate-spin" />
        {label}
      </div>
      {typeof percent === "number" && (
        <div className="h-2 bg-[color:var(--color-bg-soft)] rounded-full overflow-hidden mt-3 max-w-md mx-auto">
          <div className="h-full bg-[color:var(--color-brand)] transition-all duration-300" style={{ width: `${percent}%` }} />
        </div>
      )}
    </div>
  );
}

export function StepBar({ step, total }: { step: 1 | 2 | 3; total?: 2 | 3 }) {
  const t = total || 3;
  return (
    <div className="flex items-center justify-center gap-1 mb-2">
      {Array.from({ length: t }, (_, i) => i + 1).map((n, idx) => (
        <div key={n} className="flex items-center gap-1">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition ${n <= step ? "bg-[color:var(--color-brand)] text-white shadow-md" : "bg-[color:var(--color-bg-soft)] text-[color:var(--color-fg-soft)]"}`}>{n}</div>
          {idx < t - 1 && <div className={`h-1 w-12 md:w-16 rounded-full ${n < step ? "bg-[color:var(--color-brand)]" : "bg-[color:var(--color-bg-soft)]"}`} />}
        </div>
      ))}
    </div>
  );
}

export function SuccessPanel({ children, onReset }: { children: ReactNode; onReset?: () => void }) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-[color:var(--color-success)]/8 to-transparent border-2 border-[color:var(--color-success)]/40 p-8 md:p-10 text-center space-y-5">
      <div className="w-20 h-20 mx-auto rounded-full bg-[color:var(--color-success)] text-white flex items-center justify-center text-4xl font-bold shadow-xl">✓</div>
      <div>
        <div className="text-3xl font-bold tracking-tight">¡Listo!</div>
        <div className="text-sm text-[color:var(--color-fg-soft)] mt-1">Tu archivo se procesó correctamente</div>
      </div>
      {children}
      {onReset && (
        <button onClick={onReset} className="text-sm font-semibold text-[color:var(--color-fg-soft)] hover:text-[color:var(--color-brand)] underline underline-offset-4">
          ↻ Procesar otro archivo
        </button>
      )}
    </div>
  );
}

export function ToolHero({ title, subtitle, accent }: { title: string; subtitle: string; accent: string }) {
  return (
    <div className="text-center mb-8 md:mb-12">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3">
        <span style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in oklch, ${accent} 70%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {title}
        </span>
      </h1>
      <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}
