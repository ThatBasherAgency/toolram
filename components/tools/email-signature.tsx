"use client";
import { useMemo, useState } from "react";
import { Copy, Check, Mail } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 200)";

export function EmailSignature() {
  const [name, setName] = useState("José Gaspard");
  const [role, setRole] = useState("Consultor SEO · Toolram");
  const [phone, setPhone] = useState("+52 55 1234 5678");
  const [email, setEmail] = useState("contacto@toolram.com");
  const [website, setWebsite] = useState("toolram.com");
  const [linkedin, setLinkedin] = useState("");
  const [color, setColor] = useState("#3b82f6");
  const [copiedHtml, setCopiedHtml] = useState(false);

  const html = useMemo(() => {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;font-size:14px;color:#333">
  <tr>
    <td style="padding:0;border-right:3px solid ${color};padding-right:15px">
      <div style="font-weight:bold;font-size:16px;color:#111">${name}</div>
      <div style="color:#666;font-size:13px;margin-top:2px">${role}</div>
    </td>
    <td style="padding-left:15px;font-size:13px;line-height:1.5">
      ${phone ? `<div>📱 <a href="tel:${phone.replace(/\s/g, "")}" style="color:#333;text-decoration:none">${phone}</a></div>` : ""}
      ${email ? `<div>✉️ <a href="mailto:${email}" style="color:#333;text-decoration:none">${email}</a></div>` : ""}
      ${website ? `<div>🌐 <a href="https://${website.replace(/^https?:\/\//, "")}" style="color:${color};text-decoration:none">${website}</a></div>` : ""}
      ${linkedin ? `<div>🔗 <a href="${linkedin}" style="color:${color};text-decoration:none">LinkedIn</a></div>` : ""}
    </td>
  </tr>
</table>`;
  }, [name, role, phone, email, website, linkedin, color]);

  async function copy() {
    await navigator.clipboard.writeText(html);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 1200);
  }

  async function copyRich() {
    try {
      const blob = new Blob([html], { type: "text/html" });
      const blobText = new Blob([html.replace(/<[^>]+>/g, "")], { type: "text/plain" });
      await navigator.clipboard.write([new ClipboardItem({ "text/html": blob, "text/plain": blobText })]);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 1200);
    } catch {
      copy();
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Firma de Email</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Firma HTML profesional con tabla compatible Gmail, Outlook, Apple Mail · Pegado directo.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 space-y-3">
          <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Nombre</span>
            <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={name} onChange={(e) => setName(e.target.value)} /></label>
          <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Cargo / Empresa</span>
            <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={role} onChange={(e) => setRole(e.target.value)} /></label>
          <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Teléfono</span>
            <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={phone} onChange={(e) => setPhone(e.target.value)} /></label>
          <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Email</span>
            <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Web</span>
            <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm font-mono" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
          <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">LinkedIn (opcional)</span>
            <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm font-mono" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/..." /></label>
          <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Color de marca</span>
            <input type="color" className="w-full h-10 rounded mt-1 cursor-pointer" value={color} onChange={(e) => setColor(e.target.value)} /></label>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-white p-6 min-h-[200px]">
            <div className="text-xs font-bold uppercase text-gray-500 mb-3">Preview</div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>

          <button onClick={copyRich} className="w-full px-4 py-3 rounded-xl text-white font-bold inline-flex items-center justify-center gap-2" style={{ background: ACCENT }}>
            {copiedHtml ? <><Check className="w-4 h-4" /> Copiado al clipboard</> : <><Mail className="w-4 h-4" /> Copiar firma</>}
          </button>
          <button onClick={copy} className="w-full px-4 py-2 rounded-xl bg-[color:var(--color-bg-soft)] text-sm font-bold inline-flex items-center justify-center gap-1.5">
            <Copy className="w-3.5 h-3.5" /> Copiar HTML raw
          </button>
        </div>
      </div>

      <AdSlot slot="emailsig_inline" format="auto" minHeight={180} className="mt-6" />

      <div className="mt-6 rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📧 Cómo instalar tu firma</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Gmail:</strong> Configuración → General → Firma → pegá la firma copiada.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Outlook:</strong> Configuración → Correo → Redactar y responder → pegá.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Apple Mail:</strong> Preferencias → Firmas → arrastrá texto rico.</li>
          <li>• Si pegá texto plano, usá "Copiar HTML raw" y pegalo en modo HTML.</li>
        </ul>
      </div>
    </div>
  );
}
