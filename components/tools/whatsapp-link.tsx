"use client";
import { useMemo, useState } from "react";
import { MessageCircle, Copy, Check, Download } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.65 0.2 145)";

const COUNTRIES = [
  { code: "+52", name: "México" }, { code: "+54", name: "Argentina" }, { code: "+57", name: "Colombia" },
  { code: "+51", name: "Perú" }, { code: "+56", name: "Chile" }, { code: "+58", name: "Venezuela" },
  { code: "+34", name: "España" }, { code: "+591", name: "Bolivia" }, { code: "+593", name: "Ecuador" },
  { code: "+595", name: "Paraguay" }, { code: "+598", name: "Uruguay" }, { code: "+506", name: "Costa Rica" },
  { code: "+507", name: "Panamá" }, { code: "+503", name: "El Salvador" }, { code: "+502", name: "Guatemala" },
  { code: "+504", name: "Honduras" }, { code: "+505", name: "Nicaragua" }, { code: "+1", name: "USA/Canadá" }
];

export function WhatsappLink() {
  const [country, setCountry] = useState("+52");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("¡Hola! Vi tu sitio en Toolram y quería contactarte.");
  const [copied, setCopied] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const fullPhone = (country.replace("+", "") + phone.replace(/\D/g, ""));
  const link = useMemo(() => {
    if (!fullPhone) return "";
    const m = msg ? `?text=${encodeURIComponent(msg)}` : "";
    return `https://wa.me/${fullPhone}${m}`;
  }, [fullPhone, msg]);

  const buttonHtml = `<a href="${link}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;background:#25D366;color:white;padding:12px 20px;border-radius:8px;font-weight:bold;text-decoration:none;font-family:system-ui">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.4-1.5-.9-.8-1.5-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.2 4.5 1.8.7 2.5.8 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10m0-22C5.4 0 0 5.4 0 12c0 2.1.6 4.1 1.6 5.9L0 24l6.3-1.6c1.7.9 3.7 1.4 5.7 1.4 6.6 0 12-5.4 12-12S18.6 0 12 0Z"/></svg>
  Chatea por WhatsApp
</a>`;

  async function copyLink() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }
  async function copyHtml() {
    await navigator.clipboard.writeText(buttonHtml);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 1200);
  }
  function downloadQr() {
    if (!link) return;
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(link)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Link de WhatsApp</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Crea wa.me con mensaje precargado · Botón HTML listo para tu web · QR descargable · Sin guardar contacto.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 space-y-4">
        <div>
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-1.5">Número de teléfono</span>
          <div className="flex gap-2">
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="px-3 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] font-bold text-sm">
              {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.code} {c.name}</option>)}
            </select>
            <input type="tel" inputMode="numeric" className="flex-1 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-lg font-mono tabular-nums focus:outline-none focus:border-[color:var(--color-brand)]" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="5512345678 (sin +52)" />
          </div>
        </div>

        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Mensaje precargado (opcional)</span>
          <textarea className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm h-24 focus:outline-none focus:border-[color:var(--color-brand)] resize-none" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="¡Hola! Quería..." />
          <div className="text-[10px] text-[color:var(--color-fg-soft)] mt-1">Tip: Usá saltos de línea con \n no funciona; mantené párrafos cortos.</div>
        </label>
      </div>

      {link && (
        <>
          <div className="rounded-3xl p-6 md:p-8 text-white shadow-2xl mb-4 text-center" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><MessageCircle className="w-3 h-3" /> Tu link wa.me</div>
            <div className="font-mono text-sm md:text-base font-bold break-all bg-white/20 backdrop-blur p-3 rounded-lg">{link}</div>
          </div>

          <div className="grid md:grid-cols-3 gap-2 mb-6">
            <button onClick={copyLink} className="px-4 py-3 rounded-xl bg-[color:var(--color-bg-soft)] font-bold inline-flex items-center justify-center gap-2">
              {copied ? <><Check className="w-4 h-4 text-[color:var(--color-success)]" /> Copiado</> : <><Copy className="w-4 h-4" /> Copiar link</>}
            </button>
            <button onClick={copyHtml} className="px-4 py-3 rounded-xl bg-[color:var(--color-bg-soft)] font-bold inline-flex items-center justify-center gap-2">
              {copiedHtml ? <><Check className="w-4 h-4 text-[color:var(--color-success)]" /> Copiado</> : <><Copy className="w-4 h-4" /> Botón HTML</>}
            </button>
            <button onClick={downloadQr} className="px-4 py-3 rounded-xl bg-[color:var(--color-bg-soft)] font-bold inline-flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> QR
            </button>
          </div>

          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-6">
            <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2">Preview del botón</div>
            <div dangerouslySetInnerHTML={{ __html: buttonHtml }} />
          </div>

          <AdSlot slot="walink_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">💬 Casos de uso</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Click-to-chat</strong> en sitio web sin guardar el contacto.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Catálogos:</strong> link directo "consultar producto X" desde shop.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Bio Instagram/TikTok:</strong> wa.me en vez de número.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">QR para flyers/menús:</strong> escaneás → abre WhatsApp con mensaje listo.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Email signature:</strong> link wa.me en lugar de número de teléfono.</li>
        </ul>
      </div>
    </div>
  );
}
