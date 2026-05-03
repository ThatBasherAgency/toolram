"use client";
import { useMemo, useState } from "react";
import { Mail, Loader2, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 200)";

const DISPOSABLE = new Set([
  "10minutemail.com","mailinator.com","guerrillamail.com","tempmail.com","temp-mail.org","throwawaymail.com","yopmail.com","sharklasers.com","mintemail.com","fakeinbox.com","trashmail.com","getnada.com","emailondeck.com","maildrop.cc","spamgourmet.com","tempmail.io","tempmail.plus","temporary-mail.net","mohmal.com","dispostable.com"
]);

const TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com", "gmaill.com": "gmail.com", "gnail.com": "gmail.com", "gmail.co": "gmail.com",
  "yahooo.com": "yahoo.com", "yaho.com": "yahoo.com", "yahoo.co": "yahoo.com",
  "hotmial.com": "hotmail.com", "hotmal.com": "hotmail.com", "hotnail.com": "hotmail.com",
  "outloo.com": "outlook.com", "outloook.com": "outlook.com",
  "iclud.com": "icloud.com", "icoud.com": "icloud.com"
};

export function EmailValidator() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mxResult, setMxResult] = useState<{ has: boolean; records: string[] } | null>(null);

  const checks = useMemo(() => {
    const e = email.trim();
    const formatRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formatOk = formatRe.test(e);
    const [local, domain] = e.split("@");
    const localOk = !!local && local.length <= 64 && !/\.\./.test(local);
    const domainOk = !!domain && domain.length <= 253 && !domain.startsWith(".") && !domain.endsWith(".");
    const isDisposable = domain ? DISPOSABLE.has(domain.toLowerCase()) : false;
    const typo = domain ? TYPOS[domain.toLowerCase()] : null;
    return { formatOk, localOk, domainOk, isDisposable, typo, domain, local };
  }, [email]);

  async function verify() {
    if (!checks.domain) return;
    setLoading(true);
    setMxResult(null);
    try {
      const r = await fetch(`https://dns.google/resolve?name=${checks.domain}&type=MX`);
      const data = await r.json();
      const records = (data.Answer || []).map((a: { data: string }) => a.data);
      setMxResult({ has: records.length > 0, records });
    } catch {
      setMxResult({ has: false, records: [] });
    } finally {
      setLoading(false);
    }
  }

  const valid = checks.formatOk && checks.localOk && checks.domainOk && !checks.isDisposable && (mxResult ? mxResult.has : true);
  const score = (checks.formatOk ? 1 : 0) + (checks.localOk ? 1 : 0) + (checks.domainOk ? 1 : 0) + (!checks.isDisposable ? 1 : 0) + (mxResult?.has ? 1 : 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Validador de Email</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Verifica formato, dominio, MX records y detecta emails desechables · Antes de enviar campañas.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <div className="flex gap-2">
          <input type="email" className="flex-1 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base font-mono focus:outline-none focus:border-[color:var(--color-brand)]" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contacto@ejemplo.com" onKeyDown={(e) => e.key === "Enter" && verify()} />
          <button onClick={verify} disabled={!checks.formatOk || loading} className="px-6 py-3 rounded-xl text-white font-bold disabled:opacity-40 inline-flex items-center gap-2" style={{ background: ACCENT }}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />} Verificar MX
          </button>
        </div>
        {checks.typo && (
          <div className="mt-3 rounded-lg bg-[color:var(--color-warning)]/10 border border-[color:var(--color-warning)] p-3 text-sm inline-flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[color:var(--color-warning)]" />
            ¿Quisiste decir <button onClick={() => setEmail(`${checks.local}@${checks.typo}`)} className="font-bold text-[color:var(--color-brand)] underline">{checks.local}@{checks.typo}</button>?
          </div>
        )}
      </div>

      {email.trim() && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${valid ? "oklch(0.65 0.18 145)" : "oklch(0.6 0.22 35)"}, color-mix(in oklch, ${valid ? "oklch(0.65 0.18 145)" : "oklch(0.6 0.22 35)"} 55%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2">Email</div>
            <div className="text-4xl md:text-5xl font-black tracking-tight break-all mb-2">{valid ? "✓ Válido" : "✗ Sospechoso"}</div>
            <div className="text-xl opacity-90">Score: {score}/5</div>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-6">
            {[
              { ok: checks.formatOk, label: "Formato RFC válido", detail: "user@dominio.tld" },
              { ok: checks.localOk, label: "Parte local OK", detail: "≤64 chars, sin doble punto" },
              { ok: checks.domainOk, label: "Dominio OK", detail: checks.domain || "—" },
              { ok: !checks.isDisposable, label: "No es desechable", detail: checks.isDisposable ? "Email temporal detectado" : "Dominio normal" },
              { ok: mxResult?.has === true, label: "Tiene servidor MX", detail: mxResult ? (mxResult.has ? `${mxResult.records.length} MX records` : "Sin MX (no recibe email)") : "Click en Verificar" }
            ].map((c, i) => (
              <div key={i} className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-3 flex items-start gap-2.5">
                {c.ok ? <CheckCircle2 className="w-5 h-5 text-[color:var(--color-success)] flex-shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-[color:var(--color-danger)] flex-shrink-0 mt-0.5" />}
                <div>
                  <div className="font-bold text-sm">{c.label}</div>
                  <div className="text-xs text-[color:var(--color-fg-soft)]">{c.detail}</div>
                </div>
              </div>
            ))}
          </div>

          <AdSlot slot="email_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📧 Por qué validar emails</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Reducir bounces</strong>: emails inválidos perjudican tu reputación de envío (Mailchimp, SendGrid).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Detectar typos</strong>: gmial.com, hotmial.com son errores comunes.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Filtrar desechables</strong>: usuarios fake con mailinator/temp-mail no convierten.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">MX check</strong> confirma que el dominio acepta email — pero NO confirma que la cuenta existe (eso requiere SMTP probe).</li>
        </ul>
      </div>
    </div>
  );
}
