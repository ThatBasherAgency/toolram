"use client";
import { useMemo, useState } from "react";
import { Smile, Search, Copy, Check } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.7 0.18 75)";

const EMOJIS: { e: string; n: string; cat: string; tags: string[] }[] = [
  { e: "😀", n: "Sonriendo", cat: "caras", tags: ["feliz", "smile", "alegre"] },
  { e: "😂", n: "Lágrimas de risa", cat: "caras", tags: ["risa", "lol", "haha"] },
  { e: "🥰", n: "Cara enamorada", cat: "caras", tags: ["amor", "love", "corazones"] },
  { e: "😍", n: "Ojos corazón", cat: "caras", tags: ["amor", "enamorado", "in love"] },
  { e: "🤩", n: "Estrellas en ojos", cat: "caras", tags: ["wow", "excited", "asombrado"] },
  { e: "😘", n: "Beso", cat: "caras", tags: ["kiss", "amor", "beso"] },
  { e: "😎", n: "Gafas de sol", cat: "caras", tags: ["cool", "buena onda"] },
  { e: "🤔", n: "Pensativo", cat: "caras", tags: ["thinking", "duda", "hmm"] },
  { e: "😴", n: "Durmiendo", cat: "caras", tags: ["sleep", "dormir", "cansado"] },
  { e: "🤯", n: "Cabeza explotando", cat: "caras", tags: ["mind blown", "wow"] },
  { e: "🥺", n: "Cara suplicante", cat: "caras", tags: ["plead", "puchero", "súplica"] },
  { e: "😭", n: "Llorando fuerte", cat: "caras", tags: ["sad", "triste", "cry"] },
  { e: "😡", n: "Enojado", cat: "caras", tags: ["angry", "rabia"] },
  { e: "🤬", n: "Insultando", cat: "caras", tags: ["fuck", "swearing", "puta"] },
  { e: "🥳", n: "Fiesta", cat: "caras", tags: ["party", "celebrate", "cumple"] },
  { e: "🤗", n: "Abrazando", cat: "caras", tags: ["hug", "abrazo"] },
  { e: "😈", n: "Diablito", cat: "caras", tags: ["devil", "diablo"] },
  { e: "🤡", n: "Payaso", cat: "caras", tags: ["clown", "ridículo"] },
  { e: "💩", n: "Caca", cat: "caras", tags: ["poop", "mierda"] },
  { e: "👻", n: "Fantasma", cat: "caras", tags: ["ghost", "halloween"] },
  { e: "❤️", n: "Corazón rojo", cat: "corazones", tags: ["love", "amor", "rojo"] },
  { e: "🧡", n: "Corazón naranja", cat: "corazones", tags: ["amor", "naranja"] },
  { e: "💛", n: "Corazón amarillo", cat: "corazones", tags: ["amor", "amistad"] },
  { e: "💚", n: "Corazón verde", cat: "corazones", tags: ["amor", "verde"] },
  { e: "💙", n: "Corazón azul", cat: "corazones", tags: ["amor", "azul"] },
  { e: "💜", n: "Corazón morado", cat: "corazones", tags: ["amor", "morado", "purple"] },
  { e: "🖤", n: "Corazón negro", cat: "corazones", tags: ["amor", "negro", "luto"] },
  { e: "🤍", n: "Corazón blanco", cat: "corazones", tags: ["amor", "blanco", "puro"] },
  { e: "💔", n: "Corazón roto", cat: "corazones", tags: ["broken", "roto", "heartbreak"] },
  { e: "💕", n: "Dos corazones", cat: "corazones", tags: ["amor", "love"] },
  { e: "💖", n: "Corazón brillante", cat: "corazones", tags: ["sparkling", "amor"] },
  { e: "💘", n: "Corazón flecha", cat: "corazones", tags: ["cupido", "flechazo"] },
  { e: "🔥", n: "Fuego", cat: "objetos", tags: ["fire", "hot", "buena"] },
  { e: "✨", n: "Brillos", cat: "objetos", tags: ["sparkle", "magia"] },
  { e: "💯", n: "100", cat: "objetos", tags: ["cien", "perfecto"] },
  { e: "⭐", n: "Estrella", cat: "objetos", tags: ["star", "favorito"] },
  { e: "🌟", n: "Estrella brillante", cat: "objetos", tags: ["star", "magia"] },
  { e: "💎", n: "Diamante", cat: "objetos", tags: ["diamond", "joya", "valioso"] },
  { e: "🎉", n: "Confeti", cat: "objetos", tags: ["fiesta", "celebrar", "cumple"] },
  { e: "🎂", n: "Pastel cumple", cat: "objetos", tags: ["birthday", "torta", "cumpleaños"] },
  { e: "🎁", n: "Regalo", cat: "objetos", tags: ["gift", "presente"] },
  { e: "🎈", n: "Globo", cat: "objetos", tags: ["balloon", "fiesta"] },
  { e: "💰", n: "Bolsa dinero", cat: "objetos", tags: ["money", "plata", "billetes"] },
  { e: "💸", n: "Dinero volando", cat: "objetos", tags: ["money", "gastar"] },
  { e: "🚀", n: "Cohete", cat: "objetos", tags: ["rocket", "lanzamiento", "growth"] },
  { e: "🎯", n: "Diana", cat: "objetos", tags: ["target", "objetivo", "goals"] },
  { e: "🏆", n: "Trofeo", cat: "objetos", tags: ["trophy", "ganador"] },
  { e: "🥇", n: "Medalla oro", cat: "objetos", tags: ["gold", "primero"] },
  { e: "📚", n: "Libros", cat: "objetos", tags: ["books", "estudiar", "school"] },
  { e: "💻", n: "Laptop", cat: "objetos", tags: ["computer", "laptop", "trabajo"] },
  { e: "📱", n: "Celular", cat: "objetos", tags: ["phone", "smartphone"] },
  { e: "👍", n: "Pulgar arriba", cat: "manos", tags: ["like", "ok", "bueno"] },
  { e: "👎", n: "Pulgar abajo", cat: "manos", tags: ["dislike", "malo"] },
  { e: "👌", n: "OK", cat: "manos", tags: ["okay", "perfecto"] },
  { e: "✌️", n: "Paz", cat: "manos", tags: ["peace", "victoria"] },
  { e: "🤞", n: "Cruzados", cat: "manos", tags: ["fingers crossed", "suerte"] },
  { e: "🤝", n: "Apretón manos", cat: "manos", tags: ["handshake", "deal"] },
  { e: "👏", n: "Aplauso", cat: "manos", tags: ["clap", "bravo"] },
  { e: "🙌", n: "Manos arriba", cat: "manos", tags: ["celebration", "gracias"] },
  { e: "🙏", n: "Rezando", cat: "manos", tags: ["pray", "rezar", "gracias"] },
  { e: "💪", n: "Bíceps", cat: "manos", tags: ["strong", "fuerte", "gym"] },
  { e: "🤘", n: "Cuernos rock", cat: "manos", tags: ["rock", "metal"] },
  { e: "🐶", n: "Perrito", cat: "animales", tags: ["dog", "perro", "puppy"] },
  { e: "🐱", n: "Gatito", cat: "animales", tags: ["cat", "gato", "kitten"] },
  { e: "🦄", n: "Unicornio", cat: "animales", tags: ["unicorn", "mágico"] },
  { e: "🐔", n: "Pollo", cat: "animales", tags: ["chicken", "ave"] },
  { e: "🦋", n: "Mariposa", cat: "animales", tags: ["butterfly"] },
  { e: "🌹", n: "Rosa", cat: "naturaleza", tags: ["rose", "flor", "amor"] },
  { e: "🌺", n: "Hibisco", cat: "naturaleza", tags: ["flower", "tropical"] },
  { e: "🌻", n: "Girasol", cat: "naturaleza", tags: ["sunflower", "amarillo"] },
  { e: "🌈", n: "Arcoíris", cat: "naturaleza", tags: ["rainbow", "lgbt", "orgullo"] },
  { e: "☀️", n: "Sol", cat: "naturaleza", tags: ["sun", "verano", "calor"] },
  { e: "🌙", n: "Luna", cat: "naturaleza", tags: ["moon", "noche"] },
  { e: "⛅", n: "Sol con nube", cat: "naturaleza", tags: ["clima", "tiempo"] },
  { e: "🌊", n: "Ola", cat: "naturaleza", tags: ["wave", "mar", "playa"] },
  { e: "🍕", n: "Pizza", cat: "comida", tags: ["pizza", "italian"] },
  { e: "🍔", n: "Hamburguesa", cat: "comida", tags: ["burger", "fast food"] },
  { e: "🌮", n: "Taco", cat: "comida", tags: ["taco", "mexican"] },
  { e: "🍦", n: "Helado", cat: "comida", tags: ["icecream", "verano"] },
  { e: "☕", n: "Café", cat: "comida", tags: ["coffee", "café"] },
  { e: "🍺", n: "Cerveza", cat: "comida", tags: ["beer", "chela"] },
  { e: "🍷", n: "Vino", cat: "comida", tags: ["wine"] },
  { e: "⚽", n: "Pelota fútbol", cat: "deportes", tags: ["soccer", "futbol"] },
  { e: "🏀", n: "Básquet", cat: "deportes", tags: ["basket"] },
  { e: "🎮", n: "Control juego", cat: "deportes", tags: ["gaming", "videojuego"] },
  { e: "🎵", n: "Nota musical", cat: "musica", tags: ["music", "cancion"] },
  { e: "🎶", n: "Notas musicales", cat: "musica", tags: ["music"] },
  { e: "🎸", n: "Guitarra", cat: "musica", tags: ["guitar"] },
  { e: "🎤", n: "Micrófono", cat: "musica", tags: ["mic", "karaoke"] },
  { e: "🇲🇽", n: "México", cat: "banderas", tags: ["mexico", "mx"] },
  { e: "🇦🇷", n: "Argentina", cat: "banderas", tags: ["argentina", "ar"] },
  { e: "🇨🇱", n: "Chile", cat: "banderas", tags: ["chile", "cl"] },
  { e: "🇵🇪", n: "Perú", cat: "banderas", tags: ["peru", "pe"] },
  { e: "🇨🇴", n: "Colombia", cat: "banderas", tags: ["colombia", "co"] },
  { e: "🇪🇸", n: "España", cat: "banderas", tags: ["spain", "es"] },
  { e: "🇺🇸", n: "Estados Unidos", cat: "banderas", tags: ["usa", "us"] }
];

const CATS = ["todos", "caras", "corazones", "manos", "objetos", "animales", "naturaleza", "comida", "deportes", "musica", "banderas"];

export function EmojiFinder() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("todos");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let f = EMOJIS;
    if (cat !== "todos") f = f.filter((e) => e.cat === cat);
    if (q.trim()) {
      const ql = q.toLowerCase();
      f = f.filter((e) => e.n.toLowerCase().includes(ql) || e.tags.some((t) => t.toLowerCase().includes(ql)));
    }
    return f;
  }, [q, cat]);

  async function copy(e: string, i: number) {
    await navigator.clipboard.writeText(e);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1000);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Buscador de Emojis</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">{EMOJIS.length} emojis con búsqueda por nombre, categoría o tags · Click para copiar al instante.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 mb-6 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--color-fg-soft)]" />
          <input className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base focus:outline-none focus:border-[color:var(--color-brand)]" value={q} onChange={(e) => setQ(e.target.value)} placeholder="amor, fuego, dinero, pizza, fiesta..." />
        </div>
        <div className="flex flex-wrap gap-1">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} className="px-3 py-1.5 rounded-md text-xs font-bold capitalize transition" style={cat === c ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>{c}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mb-6">
        {filtered.map((emoji, i) => (
          <button key={emoji.e + i} onClick={() => copy(emoji.e, i)} title={emoji.n} className="aspect-square rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] flex items-center justify-center text-3xl md:text-4xl hover:border-[color:var(--color-brand)] hover:scale-105 transition relative">
            {emoji.e}
            {copiedIdx === i && <span className="absolute inset-0 flex items-center justify-center bg-[color:var(--color-success)]/90 text-white text-xs font-bold rounded-xl"><Check className="w-5 h-5" /></span>}
          </button>
        ))}
      </div>
      {filtered.length === 0 && <div className="text-center text-[color:var(--color-fg-soft)] py-8">No encontré emojis. Probá otra búsqueda.</div>}

      <AdSlot slot="emoji_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2"><Smile className="w-4 h-4 inline mr-1" /> Tips de uso</strong>
        <ul className="space-y-1">
          <li>• Click en cualquier emoji para copiarlo al portapapeles.</li>
          <li>• Pegá ({"Ctrl/Cmd + V"}) en WhatsApp, Instagram, email, donde sea.</li>
          <li>• Funcionan en todas las plataformas modernas (Unicode estándar).</li>
        </ul>
      </div>
    </div>
  );
}
