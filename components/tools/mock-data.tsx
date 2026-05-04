"use client";
import { useMemo, useState } from "react";
import { Database, RefreshCw, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.55 0.22 280)";

const NAMES_M = ["Mateo","Santiago","Lucas","Diego","Daniel","Nicolás","Joaquín","Tomás","Benjamín","Carlos"];
const NAMES_F = ["Sofía","Valentina","Camila","Lucía","Mariana","Martina","Renata","Victoria","Catalina","Laura"];
const SURS = ["García","Rodríguez","González","Fernández","López","Martínez","Sánchez","Pérez","Gómez","Martín"];
const STREETS = ["Av. Insurgentes","Calle Reforma","Av. Las Palmas","Calle 9","Av. Libertador","Calle Madrid","Av. Corrientes","Calle 12 de Octubre"];
const CITIES = ["CDMX","Buenos Aires","Madrid","Lima","Bogotá","Santiago","Montevideo","Quito","Caracas","Barcelona"];
const DOMAINS = ["gmail.com","outlook.com","hotmail.com","yahoo.com","icloud.com"];
const COMPANIES = ["Tecnova","DataFlow","CloudMex","DigitalArg","WebPeru","SistemasCo","InfoChile","NubeUY","MarketEC","RedVE"];

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min; }

function makePerson(id: number) {
  const isM = Math.random() < 0.5;
  const first = rand(isM ? NAMES_M : NAMES_F);
  const last = rand(SURS);
  const email = `${first.toLowerCase()}.${last.toLowerCase()}@${rand(DOMAINS)}`;
  return {
    id,
    nombre: first,
    apellido: last,
    email,
    edad: randInt(18, 75),
    telefono: `+52 ${randInt(10, 99)} ${randInt(1000, 9999)} ${randInt(1000, 9999)}`,
    direccion: `${rand(STREETS)} ${randInt(100, 9999)}`,
    ciudad: rand(CITIES),
    cp: randInt(10000, 99999),
    empresa: rand(COMPANIES),
    activo: Math.random() < 0.85
  };
}

export function MockData() {
  const [count, setCount] = useState(10);
  const [format, setFormat] = useState<"json" | "csv" | "sql">("json");
  const [seed, setSeed] = useState(0);
  const [copied, setCopied] = useState(false);

  const data = useMemo(() => {
    void seed;
    return Array.from({ length: count }, (_, i) => makePerson(i + 1));
  }, [count, seed]);

  const output = useMemo(() => {
    if (format === "json") return JSON.stringify(data, null, 2);
    if (format === "csv") {
      const headers = Object.keys(data[0]).join(",");
      const rows = data.map((r) => Object.values(r).map((v) => typeof v === "string" && v.includes(",") ? `"${v}"` : v).join(",")).join("\n");
      return headers + "\n" + rows;
    }
    const cols = Object.keys(data[0]).join(", ");
    const values = data.map((r) => "(" + Object.values(r).map((v) => typeof v === "string" ? `'${v.replace(/'/g, "''")}'` : v).join(", ") + ")").join(",\n  ");
    return `INSERT INTO usuarios (${cols}) VALUES\n  ${values};`;
  }, [data, format]);

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Datos de Prueba</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Mock data realista (LATAM) para testing · JSON, CSV o SQL · Personas con email, dirección, teléfono.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 grid md:grid-cols-3 gap-3 items-end">
        <label className="block"><span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Cantidad: {count}</span>
          <input type="range" min="1" max="100" value={count} onChange={(e) => setCount(+e.target.value)} className="w-full mt-2" /></label>
        <div>
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] block mb-1">Formato</span>
          <div className="grid grid-cols-3 gap-1">
            {(["json", "csv", "sql"] as const).map((f) => (
              <button key={f} onClick={() => setFormat(f)} className="px-2 py-2 rounded-md text-xs font-bold uppercase transition" style={format === f ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{f}</button>
            ))}
          </div>
        </div>
        <button onClick={() => setSeed((s) => s + 1)} className="px-4 py-3 rounded-xl text-white font-bold inline-flex items-center justify-center gap-2" style={{ background: ACCENT }}>
          <RefreshCw className="w-4 h-4" /> Regenerar
        </button>
      </div>

      <div className="rounded-2xl bg-black/95 text-green-300 p-5 font-mono text-sm relative mb-6">
        <button onClick={copy} className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-white/10 text-xs text-white inline-flex items-center gap-1">{copied ? <><Check className="w-3 h-3" /> Copiado</> : <><Copy className="w-3 h-3" /> Copiar</>}</button>
        <pre className="whitespace-pre pr-20 overflow-x-auto max-h-[500px]">{output}</pre>
      </div>

      <AdSlot slot="mock_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2"><Database className="w-4 h-4 inline mr-1" /> Para qué sirve</strong>
        <ul className="space-y-1">
          <li>• Poblar bases de datos de desarrollo y testing</li>
          <li>• Mockups con datos creíbles (no Lorem Ipsum)</li>
          <li>• Tests de carga / performance con N registros</li>
          <li>• Datos demo para presentaciones, screenshots</li>
        </ul>
      </div>
    </div>
  );
}
