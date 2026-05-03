"use client";
import { useMemo, useState } from "react";
import { BookOpen, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 280)";

type Style = "apa" | "mla" | "chicago" | "harvard";
type SourceType = "web" | "book" | "journal";

export function CitationGenerator() {
  const [style, setStyle] = useState<Style>("apa");
  const [type, setType] = useState<SourceType>("web");
  const [author, setAuthor] = useState("García Márquez, Gabriel");
  const [year, setYear] = useState("2026");
  const [title, setTitle] = useState("La importancia de las citas académicas");
  const [source, setSource] = useState("Toolram");
  const [url, setUrl] = useState("https://toolram.com/citas-apa");
  const [accessed, setAccessed] = useState(new Date().toISOString().slice(0, 10));
  const [city, setCity] = useState("Buenos Aires");
  const [publisher, setPublisher] = useState("Editorial XYZ");
  const [volume, setVolume] = useState("12");
  const [issue, setIssue] = useState("3");
  const [pages, setPages] = useState("45-67");
  const [copied, setCopied] = useState(false);

  const citation = useMemo(() => {
    const t = title.trim() || "[Título]";
    const a = author.trim() || "[Autor]";
    const y = year.trim() || "n.d.";
    const acc = new Date(accessed).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });

    if (type === "web") {
      if (style === "apa") return `${a} (${y}). ${t}. ${source}. ${url}`;
      if (style === "mla") return `${a}. "${t}." ${source}, ${y}, ${url}. Acceso ${acc}.`;
      if (style === "chicago") return `${a}. "${t}." ${source}. ${y}. ${url}.`;
      return `${a} ${y}, '${t}', ${source}, visto ${acc}, <${url}>.`;
    }
    if (type === "book") {
      if (style === "apa") return `${a} (${y}). ${t}. ${publisher}.`;
      if (style === "mla") return `${a}. ${t}. ${publisher}, ${y}.`;
      if (style === "chicago") return `${a}. ${t}. ${city}: ${publisher}, ${y}.`;
      return `${a} ${y}, ${t}, ${publisher}, ${city}.`;
    }
    if (style === "apa") return `${a} (${y}). ${t}. ${source}, ${volume}(${issue}), ${pages}.`;
    if (style === "mla") return `${a}. "${t}." ${source}, vol. ${volume}, no. ${issue}, ${y}, pp. ${pages}.`;
    if (style === "chicago") return `${a}. "${t}." ${source} ${volume}, no. ${issue} (${y}): ${pages}.`;
    return `${a} ${y}, '${t}', ${source}, vol. ${volume}, no. ${issue}, pp. ${pages}.`;
  }, [style, type, author, year, title, source, url, accessed, city, publisher, volume, issue, pages]);

  async function copy() {
    await navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Citas APA · MLA · Chicago</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Crea referencias bibliográficas para trabajos académicos · Formato APA 7, MLA 9, Chicago, Harvard.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-1.5">Estilo</span>
            <div className="grid grid-cols-4 gap-1">
              {(["apa", "mla", "chicago", "harvard"] as Style[]).map((s) => (
                <button key={s} onClick={() => setStyle(s)} className="px-2 py-2 rounded-md text-xs font-bold uppercase transition" style={style === s ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-1.5">Tipo de fuente</span>
            <div className="grid grid-cols-3 gap-1">
              {(["web", "book", "journal"] as SourceType[]).map((t) => (
                <button key={t} onClick={() => setType(t)} className="px-2 py-2 rounded-md text-xs font-bold capitalize transition" style={type === t ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{t === "web" ? "Web" : t === "book" ? "Libro" : "Revista"}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Autor (Apellido, Nombre)</span>
            <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Año</span>
            <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={year} onChange={(e) => setYear(e.target.value)} />
          </label>
          <label className="block md:col-span-2">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Título</span>
            <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>

          {type === "web" && (
            <>
              <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Sitio web</span>
                <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={source} onChange={(e) => setSource(e.target.value)} />
              </label>
              <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Fecha de acceso</span>
                <input type="date" className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={accessed} onChange={(e) => setAccessed(e.target.value)} />
              </label>
              <label className="block md:col-span-2"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">URL</span>
                <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm font-mono" value={url} onChange={(e) => setUrl(e.target.value)} />
              </label>
            </>
          )}
          {type === "book" && (
            <>
              <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Editorial</span>
                <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
              </label>
              <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Ciudad</span>
                <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={city} onChange={(e) => setCity(e.target.value)} />
              </label>
            </>
          )}
          {type === "journal" && (
            <>
              <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Revista</span>
                <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={source} onChange={(e) => setSource(e.target.value)} />
              </label>
              <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Páginas</span>
                <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={pages} onChange={(e) => setPages(e.target.value)} />
              </label>
              <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Volumen</span>
                <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={volume} onChange={(e) => setVolume(e.target.value)} />
              </label>
              <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Número</span>
                <input className="w-full mt-1 px-3 py-2 rounded-lg border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-sm" value={issue} onChange={(e) => setIssue(e.target.value)} />
              </label>
            </>
          )}
        </div>
      </div>

      <div className="rounded-3xl p-6 md:p-8 text-white shadow-2xl mb-6 relative" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 55%, black))` }}>
        <div className="text-xs uppercase opacity-80 tracking-widest mb-2 inline-flex items-center gap-1.5"><BookOpen className="w-3 h-3" /> Cita {style.toUpperCase()}</div>
        <div className="text-base md:text-lg leading-relaxed font-serif">{citation}</div>
        <button onClick={copy} className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-white/20 backdrop-blur text-xs font-bold inline-flex items-center gap-1">
          {copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}
        </button>
      </div>

      <AdSlot slot="cite_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📚 Cuándo usar cada estilo</strong>
        <ul className="space-y-1">
          <li>• <strong className="text-[color:var(--color-fg)]">APA 7:</strong> Psicología, ciencias sociales, educación. Estándar en universidades hispanoamericanas.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">MLA 9:</strong> Humanidades, literatura, lingüística.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Chicago:</strong> Historia, ciencias políticas, filosofía.</li>
          <li>• <strong className="text-[color:var(--color-fg)]">Harvard:</strong> Ciencias económicas y empresariales.</li>
        </ul>
      </div>
    </div>
  );
}
