"use client";
import { useRef, useState, type ReactNode, type DragEvent } from "react";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";

type Props = {
  accept: string;
  onFile: (file: File) => void;
  loaded?: { name: string; size: number; thumbnail?: string } | null;
  onClear?: () => void;
  icon?: "pdf" | "image";
  helpText?: string;
  buttonLabel?: string;
  accentColor?: string;
};

export function DropZone({ accept, onFile, loaded, onClear, icon = "pdf", helpText, buttonLabel, accentColor = "var(--color-brand)" }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onFile(f);
  }
  function onDragOver(e: DragEvent) {
    e.preventDefault();
    setDrag(true);
  }
  function onDragLeave() { setDrag(false); }

  if (loaded) {
    return (
      <div className="flex items-center gap-4 p-4 rounded-2xl border-2 bg-[color:var(--color-bg-soft)]" style={{ borderColor: accentColor }}>
        <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-lg overflow-hidden" style={{ background: accentColor }}>
          {loaded.thumbnail ? (
            <img src={loaded.thumbnail} alt="" className="w-full h-full object-cover" />
          ) : icon === "pdf" ? <FileText className="w-8 h-8" /> : <ImageIcon className="w-8 h-8" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate text-base">{loaded.name}</div>
          <div className="text-sm text-[color:var(--color-fg-soft)]">{(loaded.size / 1024 / 1024).toFixed(2)} MB</div>
        </div>
        {onClear && (
          <button onClick={onClear} className="flex-shrink-0 w-10 h-10 rounded-full bg-[color:var(--color-bg)] hover:bg-[color:var(--color-danger)] hover:text-white flex items-center justify-center transition" aria-label="Quitar archivo">
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
      className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 px-6 py-12 md:py-16 text-center ${drag ? "scale-[1.02]" : ""}`}
      style={{
        borderColor: drag ? accentColor : "var(--color-border)",
        background: drag ? `color-mix(in oklch, ${accentColor} 8%, transparent)` : "var(--color-bg-soft)"
      }}
    >
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl" style={{ background: accentColor }}>
          <Upload className="w-9 h-9" />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-bold mb-1">Selecciona o arrastrá tu archivo</div>
          <div className="text-sm text-[color:var(--color-fg-soft)]">{helpText || "Tu archivo nunca sale de tu navegador"}</div>
        </div>
        <button type="button" className="mt-2 px-8 py-3 rounded-xl font-semibold text-white shadow-lg transition hover:scale-105" style={{ background: accentColor }}>
          {buttonLabel || "Seleccionar archivo"}
        </button>
      </div>
    </div>
  );
}

export function PrimaryAction({ children, onClick, disabled, color = "var(--color-brand)" }: { children: ReactNode; onClick: () => void; disabled?: boolean; color?: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:scale-[1.01] enabled:hover:shadow-2xl flex items-center justify-center gap-2"
      style={{ background: disabled ? "var(--color-fg-soft)" : color }}
    >
      {children}
    </button>
  );
}

export function ProcessingBar({ label, percent }: { label: string; percent?: number }) {
  return (
    <div className="rounded-2xl border-2 border-[color:var(--color-brand)] bg-[color:var(--color-brand-soft)] p-6 text-center">
      <div className="inline-flex items-center gap-3 text-base font-semibold mb-3">
        <div className="w-5 h-5 rounded-full border-2 border-[color:var(--color-brand)] border-t-transparent animate-spin" />
        {label}
      </div>
      {typeof percent === "number" && (
        <div className="h-2 bg-white/40 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-[color:var(--color-brand)] transition-all duration-300" style={{ width: `${percent}%` }} />
        </div>
      )}
    </div>
  );
}

export function StepBar({ step, total }: { step: 1 | 2 | 3; total?: 2 | 3 }) {
  const t = total || 3;
  return (
    <div className="flex items-center justify-center gap-1 mb-6">
      {Array.from({ length: t }, (_, i) => i + 1).map((n, idx) => (
        <div key={n} className="flex items-center gap-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${n <= step ? "bg-[color:var(--color-brand)] text-white" : "bg-[color:var(--color-bg-soft)] text-[color:var(--color-fg-soft)]"}`}>{n}</div>
          {idx < t - 1 && <div className={`h-0.5 w-8 md:w-12 ${n < step ? "bg-[color:var(--color-brand)]" : "bg-[color:var(--color-border)]"}`} />}
        </div>
      ))}
    </div>
  );
}

export function SuccessPanel({ children, onReset }: { children: ReactNode; onReset?: () => void }) {
  return (
    <div className="rounded-2xl border-2 border-[color:var(--color-success)] bg-gradient-to-br from-[color:var(--color-success)]/5 to-transparent p-6 text-center space-y-4">
      <div className="w-16 h-16 mx-auto rounded-full bg-[color:var(--color-success)] text-white flex items-center justify-center text-3xl">✓</div>
      <div className="text-xl font-bold">¡Listo!</div>
      {children}
      {onReset && (
        <button onClick={onReset} className="text-sm text-[color:var(--color-fg-soft)] hover:text-[color:var(--color-brand)] underline">
          Procesar otro archivo
        </button>
      )}
    </div>
  );
}
