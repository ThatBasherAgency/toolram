"use client";
import { useMemo, useState } from "react";
import { Shield, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 30)";

const COMMON_PASSWORDS = new Set([
  "123456", "password", "12345678", "qwerty", "123456789", "12345", "1234", "111111", "1234567", "dragon",
  "123123", "baseball", "abc123", "football", "monkey", "letmein", "shadow", "master", "666666", "qwertyuiop",
  "123321", "mustang", "1234567890", "michael", "654321", "pussy", "superman", "1qaz2wsx", "7777777", "fuckyou",
  "121212", "000000", "qazwsx", "123qwe", "killer", "trustno1", "jordan", "jennifer", "zxcvbnm", "asdfgh",
  "hunter", "buster", "soccer", "harley", "batman", "andrew", "tigger", "sunshine", "iloveyou", "fuckme",
  "2000", "charlie", "robert", "thomas", "hockey", "ranger", "daniel", "starwars", "klaster", "112233",
  "george", "computer", "michelle", "jessica", "pepper", "1111", "zxcvbn", "555555", "11111111", "131313",
  "freedom", "777777", "pass", "fuck", "maggie", "159753", "aaaaaa", "ginger", "princess", "joshua",
  "cheese", "amanda", "summer", "love", "ashley", "6969", "nicole", "chelsea", "biteme", "matthew",
  "access", "yankees", "987654321", "dallas", "austin", "thunder", "taylor", "matrix", "minecraft", "xboxone",
  "contraseña", "password1", "p@ssw0rd", "admin", "qwerty123", "welcome", "letmein123", "123abc",
  "tequiero", "te amo", "amor", "hola1234", "miamor"
]);

function calcEntropy(pw: string): number {
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;
  if (pool === 0) return 0;
  return pw.length * Math.log2(pool);
}

function timeToCrack(entropy: number): { val: string; level: "very-weak" | "weak" | "medium" | "strong" | "very-strong" } {
  // Assume 10 billion guesses per second (modern GPU brute force)
  const guesses = Math.pow(2, entropy);
  const seconds = guesses / 1e10 / 2;
  if (seconds < 1) return { val: "Instantáneo", level: "very-weak" };
  if (seconds < 60) return { val: `${Math.round(seconds)}s`, level: "very-weak" };
  if (seconds < 3600) return { val: `${Math.round(seconds / 60)}m`, level: "weak" };
  if (seconds < 86400) return { val: `${Math.round(seconds / 3600)}h`, level: "weak" };
  if (seconds < 31_536_000) return { val: `${Math.round(seconds / 86400)} días`, level: "medium" };
  if (seconds < 31_536_000 * 100) return { val: `${Math.round(seconds / 31_536_000)} años`, level: "strong" };
  if (seconds < 31_536_000 * 1e9) return { val: `${(seconds / 31_536_000).toExponential(1)} años`, level: "very-strong" };
  return { val: "Trillones de años", level: "very-strong" };
}

export function PasswordStrength() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);

  const analysis = useMemo(() => {
    const entropy = calcEntropy(pw);
    const crack = timeToCrack(entropy);
    const checks = [
      { ok: pw.length >= 12, label: "Al menos 12 caracteres", important: true },
      { ok: pw.length >= 16, label: "Idealmente 16+ caracteres" },
      { ok: /[a-z]/.test(pw), label: "Minúsculas" },
      { ok: /[A-Z]/.test(pw), label: "Mayúsculas" },
      { ok: /[0-9]/.test(pw), label: "Números" },
      { ok: /[^a-zA-Z0-9]/.test(pw), label: "Símbolos especiales" },
      { ok: !COMMON_PASSWORDS.has(pw.toLowerCase()), label: "No es una contraseña común", important: true },
      { ok: !/^[a-zA-Z]+$/.test(pw) && !/^[0-9]+$/.test(pw), label: "Mezcla letras y números" },
      { ok: !/(.)\1{2,}/.test(pw), label: "Sin caracteres repetidos (aaa, 111)" },
      { ok: !/(0123|1234|2345|3456|4567|5678|6789|abcd|qwerty|asdf|zxcv)/i.test(pw), label: "Sin secuencias obvias" }
    ];
    return { entropy, crack, checks };
  }, [pw]);

  const colors = {
    "very-weak": "oklch(0.55 0.24 25)",
    weak: "oklch(0.65 0.2 50)",
    medium: "oklch(0.7 0.18 75)",
    strong: "oklch(0.65 0.18 145)",
    "very-strong": "oklch(0.55 0.2 165)"
  };

  const labels = {
    "very-weak": "Muy débil",
    weak: "Débil",
    medium: "Media",
    strong: "Fuerte",
    "very-strong": "Muy fuerte"
  };

  const c = pw ? colors[analysis.crack.level] : "var(--color-fg-soft)";
  const l = pw ? labels[analysis.crack.level] : "—";

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Test de Contraseña</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Mide la fortaleza de tu contraseña: entropía, tiempo de crackeo y vulnerabilidades comunes.</p>
        <p className="text-xs text-[color:var(--color-fg-soft)] mt-2 inline-flex items-center gap-1"><Shield className="w-3 h-3" /> Análisis 100% local · tu contraseña jamás sale del navegador</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Contraseña a evaluar</span>
          <div className="relative mt-1.5">
            <input type={show ? "text" : "password"} className="w-full px-4 py-4 pr-12 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-mono tabular-nums focus:outline-none focus:border-[color:var(--color-brand)]" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Pegá tu contraseña…" autoComplete="off" />
            <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg hover:bg-[color:var(--color-bg-soft)] flex items-center justify-center" aria-label="Mostrar/ocultar">
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </label>
      </div>

      {pw && (
        <>
          <div className="rounded-3xl p-8 text-white shadow-2xl mb-6 text-center" style={{ background: `linear-gradient(135deg, ${c}, color-mix(in oklch, ${c} 60%, black))` }}>
            <div className="text-xs uppercase opacity-80 tracking-widest mb-2">Fortaleza</div>
            <div className="text-4xl md:text-5xl font-extrabold tracking-tight">{l}</div>
            <div className="mt-4 grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div>
                <div className="text-xs opacity-80">Entropía</div>
                <div className="text-2xl font-extrabold tabular-nums">{analysis.entropy.toFixed(0)} bits</div>
              </div>
              <div>
                <div className="text-xs opacity-80">Tiempo de crackeo</div>
                <div className="text-2xl font-extrabold">{analysis.crack.val}</div>
              </div>
            </div>
            <div className="text-xs opacity-70 mt-3">Asumiendo 10⁹ intentos/seg (GPU moderna)</div>
          </div>

          <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-5 mb-6">
            <div className="font-bold mb-3">Análisis detallado</div>
            <div className="grid md:grid-cols-2 gap-2">
              {analysis.checks.map((c, i) => {
                const isCritical = c.important && !c.ok;
                return (
                  <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg" style={isCritical ? { background: "color-mix(in oklch, var(--color-danger) 10%, transparent)" } : undefined}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 ${c.ok ? "bg-[color:var(--color-success)]" : c.important ? "bg-[color:var(--color-danger)]" : "bg-[color:var(--color-fg-soft)]"}`}>
                      {c.ok ? "✓" : "✗"}
                    </span>
                    <span className="text-sm">{c.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {COMMON_PASSWORDS.has(pw.toLowerCase()) && (
            <div className="rounded-2xl bg-[color:var(--color-danger)]/10 border border-[color:var(--color-danger)] p-4 flex gap-3 mb-6">
              <AlertTriangle className="w-5 h-5 text-[color:var(--color-danger)] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[color:var(--color-danger)]">⚠️ Contraseña comprometida</div>
                <div className="text-sm mt-1">Esta contraseña aparece en listas públicas de filtraciones. Cambiala inmediatamente en cualquier servicio donde la uses.</div>
              </div>
            </div>
          )}

          <AdSlot slot="passstrength_inline" format="auto" minHeight={180} className="mb-6" />
        </>
      )}

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">💡 Cómo crear una contraseña realmente fuerte</strong>
        <ul className="space-y-1.5">
          <li>• Usá un <strong className="text-[color:var(--color-fg)]">administrador de contraseñas</strong> (1Password, Bitwarden) y deja que genere por vos.</li>
          <li>• Mejor que 12 caracteres random: una <strong className="text-[color:var(--color-fg)]">passphrase de 4-5 palabras al azar</strong> (correct-horse-battery-staple style).</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Contraseña única por servicio</strong> — un leak no compromete todo lo demás.</li>
          <li>• Activá 2FA siempre que se pueda (más importante que la contraseña perfecta).</li>
        </ul>
      </div>
    </div>
  );
}
