"use client";
import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";

export function TimestampConverter() {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [ts, setTs] = useState(String(Math.floor(Date.now() / 1000)));
  const [iso, setIso] = useState(new Date().toISOString().slice(0, 19));
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(t);
  }, []);

  const tsNum = parseInt(ts, 10);
  const tsValid = !isNaN(tsNum) && tsNum > 0;
  const tsDate = tsValid ? new Date(tsNum * 1000) : null;

  const isoValid = !isNaN(Date.parse(iso));
  const isoTs = isoValid ? Math.floor(Date.parse(iso) / 1000) : 0;

  async function copy(key: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="space-y-4">
      <div className="card !p-4 text-center">
        <div className="text-xs uppercase text-[color:var(--color-fg-soft)] mb-1">Timestamp Unix actual</div>
        <div className="text-3xl font-bold text-[color:var(--color-brand)] tabular-nums">{now}</div>
        <button onClick={() => copy("now", String(now))} className="btn btn-ghost h-7 mt-2 text-xs">
          {copied === "now" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied === "now" ? "Copiado" : "Copiar"}
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="card !p-3 space-y-2">
          <div className="text-xs uppercase text-[color:var(--color-fg-soft)]">Timestamp → Fecha</div>
          <input className="input" value={ts} onChange={(e) => setTs(e.target.value)} placeholder="1714505600" />
          {tsDate && (
            <div className="text-sm space-y-1">
              <div><strong>Local:</strong> {tsDate.toLocaleString("es-MX")}</div>
              <div><strong>UTC:</strong> {tsDate.toUTCString()}</div>
              <div><strong>ISO:</strong> {tsDate.toISOString()}</div>
            </div>
          )}
        </div>
        <div className="card !p-3 space-y-2">
          <div className="text-xs uppercase text-[color:var(--color-fg-soft)]">Fecha → Timestamp</div>
          <input className="input" type="datetime-local" value={iso} onChange={(e) => setIso(e.target.value)} />
          {isoValid && (
            <div className="text-sm space-y-1">
              <div><strong>Unix (seg):</strong> <span className="font-mono">{isoTs}</span></div>
              <div><strong>Unix (ms):</strong> <span className="font-mono">{isoTs * 1000}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
