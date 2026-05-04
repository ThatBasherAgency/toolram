"use client";
import { useEffect, useRef, useState } from "react";
import { Wifi, Download } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 200)";

function escapeStr(s: string) {
  return s.replace(/([\\;,":])/g, "\\$1");
}

export function WifiQrGenerator() {
  const [ssid, setSsid] = useState("Mi WiFi");
  const [password, setPassword] = useState("contraseña123");
  const [encryption, setEncryption] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [hidden, setHidden] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const wifi = `WIFI:T:${encryption};S:${escapeStr(ssid)};P:${encryption === "nopass" ? "" : escapeStr(password)};${hidden ? "H:true;" : ""};`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ssid) return;
    (async () => {
      const QRCode = (await import("qrcode")).default;
      await QRCode.toCanvas(canvas, wifi, { width: 400, margin: 2, errorCorrectionLevel: "M", color: { dark: "#000", light: "#fff" } });
    })();
  }, [wifi, ssid]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `wifi-qr-${ssid.replace(/[^a-z0-9]/gi, "_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador QR para WiFi</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Tus invitados se conectan al WiFi escaneando el QR · Sin tipear contraseña · Compatible iOS y Android.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 space-y-4">
          <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Nombre de red (SSID)</span>
            <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-mono" value={ssid} onChange={(e) => setSsid(e.target.value)} /></label>
          <div>
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-1">Tipo de seguridad</span>
            <div className="grid grid-cols-3 gap-1">
              {(["WPA", "WEP", "nopass"] as const).map((e) => (
                <button key={e} onClick={() => setEncryption(e)} className="px-3 py-2 rounded-md text-sm font-bold transition" style={encryption === e ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{e === "nopass" ? "Sin pass" : e}</button>
              ))}
            </div>
          </div>
          {encryption !== "nopass" && (
            <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Contraseña</span>
              <input type="text" className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-mono" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          )}
          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-bg-soft)] cursor-pointer text-sm">
            <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} /> Red oculta (no broadcast SSID)
          </label>
        </div>

        <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-white p-6 text-center">
          <canvas ref={canvasRef} className="mx-auto rounded-lg" />
          <div className="mt-4 text-sm font-bold text-gray-700">{ssid}</div>
          <div className="text-xs text-gray-500">Escanéame con la cámara</div>
          <button onClick={download} className="mt-4 px-4 py-2 rounded-xl text-white font-bold inline-flex items-center gap-2" style={{ background: ACCENT }}>
            <Download className="w-4 h-4" /> Descargar PNG
          </button>
        </div>
      </div>

      <AdSlot slot="wifiqr_inline" format="auto" minHeight={180} className="mt-6" />

      <div className="mt-6 rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2"><Wifi className="w-4 h-4 inline mr-1" /> Cómo lo escanean tus invitados</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">iPhone:</strong> abrí la cámara y apuntá al QR. Aparece notificación "Conectarse a WiFi".</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Android:</strong> con Google Lens o cámara nativa. En algunos modelos hay opción "QR de WiFi" en Configuración → WiFi → Compartir.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Imprimí y pegá</strong> el QR en una pared del living/oficina/Airbnb. Ya no más tipear la pass de 16 chars.</li>
        </ul>
      </div>
    </div>
  );
}

