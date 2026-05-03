"use client";
import { useMemo, useState } from "react";
import { Music, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 320)";

const WORDS = [
  "amor","corazón","pasión","ilusión","canción","emoción","traición","razón","oración","misión",
  "vida","herida","partida","salida","comida","corrida","caída","cabida","medida","dolida",
  "cielo","velo","hielo","duelo","abuelo","desvelo","anhelo","caramelo","modelo","pañuelo",
  "tiempo","contento","viento","aliento","momento","sediento","cuento","intento","talento","sustento",
  "noche","reproche","derroche","fantoche","trasnoche","broche","coche","poche",
  "alma","calma","palma","arma","fama","cama","drama","trama","llama","rama",
  "estrella","huella","aquella","centella","centellas","botella","doncella","querella","sella","esquela",
  "luna","fortuna","cuna","tribuna","laguna","duna","ninguna","alguna","aluna","bruna",
  "sueño","dueño","empeño","ceño","leño","pequeño","desdeño","beleño","reseño","greño",
  "miedo","puedo","quedo","ledo","heredo","dedo","cedo","pedo","sedo","ruedo",
  "verde","muerde","pierde","cuerde","acuerde","recuerde","lerde","disuerde",
  "oscuro","seguro","duro","futuro","puro","muro","conjuro","apuro","jura","conjura",
  "rosa","cosa","hermosa","ansiosa","fabulosa","preciosa","jubilosa","mariposa","verbosa","rugosa",
  "luz","cruz","capuz","arcabuz","testuz","chapuz","tragaluz","altramuz",
  "fuego","ciego","ruego","luego","pego","apego","despego","sosiego","estrego",
  "abrazo","brazo","pedazo","vistazo","lazo","plazo","trazo","balazo","cabezazo","bocazo",
  "color","sabor","olor","temblor","valor","mejor","calor","amargor","fulgor","candor",
  "mar","cantar","amar","hablar","mirar","besar","soñar","llorar","jugar","danzar",
  "alegría","melodía","sinfonía","poesía","fantasía","armonía","compañía","mía","tía","sería",
  "infierno","eterno","tierno","cuaderno","gobierno","interno","invierno","cuerno","yerno","saberno",
  "voz","arroz","atroz","feroz","precoz","albornoz","velloz","poscoz",
  "rey","ley","grey","convoy","buey","jersey",
  "país","feliz","raíz","matiz","narices","aprendiz","perdiz","cariz","desliz",
  "café","ojalá","jamás","quizás","atrás","detrás","compás","sagás","disfraz",
  "rincón","balcón","camión","botón","melón","pichón","callejón","sermón","alcón","bombón"
];

function getEnding(word: string, mode: "consonante" | "asonante"): string {
  const w = word.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const vowels = "aeiou";
  const lastVowelIdx = [...w].map((c, i) => vowels.includes(c) ? i : -1).filter((i) => i >= 0).pop() ?? -1;
  if (lastVowelIdx === -1) return w.slice(-3);
  if (mode === "consonante") return w.slice(lastVowelIdx);
  return [...w.slice(lastVowelIdx)].filter((c) => vowels.includes(c)).join("");
}

export function RhymeFinder() {
  const [word, setWord] = useState("amor");
  const [mode, setMode] = useState<"consonante" | "asonante">("consonante");
  const [copied, setCopied] = useState(false);

  const rhymes = useMemo(() => {
    if (!word.trim()) return [];
    const target = getEnding(word, mode);
    if (!target) return [];
    const matches = WORDS.filter((w) => {
      if (w.toLowerCase() === word.toLowerCase()) return false;
      return getEnding(w, mode) === target;
    });
    return matches.sort((a, b) => a.length - b.length);
  }, [word, mode]);

  async function copy() {
    await navigator.clipboard.writeText(rhymes.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Buscador de Rimas</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Encuentra rimas consonantes o asonantes para canciones, poemas, raps · {WORDS.length}+ palabras.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6">
        <input className="w-full px-4 py-4 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-2xl font-bold text-center focus:outline-none focus:border-[color:var(--color-brand)]" value={word} onChange={(e) => setWord(e.target.value)} placeholder="Escribí una palabra..." />
        <div className="inline-flex rounded-xl bg-[color:var(--color-bg-soft)] p-1 mt-4">
          <button onClick={() => setMode("consonante")} className="px-4 py-2 rounded-lg text-sm font-bold transition" style={mode === "consonante" ? { background: ACCENT, color: "white" } : {}}>Consonante (perfecta)</button>
          <button onClick={() => setMode("asonante")} className="px-4 py-2 rounded-lg text-sm font-bold transition" style={mode === "asonante" ? { background: ACCENT, color: "white" } : {}}>Asonante (vocales)</button>
        </div>
      </div>

      {rhymes.length > 0 && (
        <div className="rounded-3xl p-6 md:p-8 text-white shadow-2xl mb-6 relative" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs uppercase opacity-80 tracking-widest inline-flex items-center gap-1.5"><Music className="w-3 h-3" /> {rhymes.length} rimas</div>
            <button onClick={copy} className="px-3 py-1.5 rounded-md bg-white/20 text-xs font-bold inline-flex items-center gap-1">
              {copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar todas</>}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {rhymes.map((r) => (
              <span key={r} className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-lg font-bold text-sm">{r}</span>
            ))}
          </div>
        </div>
      )}
      {rhymes.length === 0 && word.trim() && (
        <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-6 mb-6 text-center text-[color:var(--color-fg-soft)]">No encontré rimas {mode}s en mi diccionario. Probá con palabras comunes (amor, sueño, vida...).</div>
      )}

      <AdSlot slot="rhyme_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">🎵 Tipos de rima</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">Consonante (perfecta):</strong> coinciden vocales y consonantes desde la última vocal acentuada. Ej: <em>amor / dolor</em>.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Asonante:</strong> solo coinciden las vocales. Ej: <em>amor / sol</em> (o-o).</li>
          <li>• Para hip-hop la asonante da más flexibilidad; para poesía clásica la consonante da más impacto.</li>
        </ul>
      </div>
    </div>
  );
}
