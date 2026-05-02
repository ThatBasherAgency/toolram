"use client";
import { useMemo, useState } from "react";
import { Hash, Copy, Check, Sparkles } from "lucide-react";
import { AdSlot } from "@/components/ads/ad-slot";

const ACCENT = "oklch(0.6 0.22 320)";

const CATEGORIES: Record<string, string[]> = {
  fitness: ["fitness", "gym", "workout", "fit", "training", "muscle", "bodybuilding", "fitfam", "gymlife", "gymmotivation", "fitnessmotivation", "personaltrainer", "weightloss", "cardio", "abs", "strong", "fitnessjourney", "homeworkout", "exercise", "healthylifestyle", "transformation", "fitspo", "lifestyle"],
  food: ["food", "foodie", "foodporn", "instafood", "foodphotography", "yummy", "delicious", "foodlover", "homecooking", "recipe", "foodblogger", "tasty", "cooking", "foodgasm", "healthyfood", "vegan", "vegetarian", "dessert", "breakfast", "lunch", "dinner", "chef", "restaurant", "comida"],
  travel: ["travel", "wanderlust", "travelgram", "instatravel", "travelphotography", "vacation", "traveler", "explore", "adventure", "trip", "travelblogger", "tourism", "nature", "mountains", "beach", "sunset", "viajar", "viajes", "turismo", "destination", "passport", "backpacking"],
  fashion: ["fashion", "style", "ootd", "outfit", "fashionblogger", "fashionista", "instafashion", "fashionstyle", "streetstyle", "moda", "trendy", "look", "fashionable", "shoes", "accessories", "shopping", "model", "elegant", "chic", "luxury", "designer"],
  beauty: ["beauty", "makeup", "skincare", "beautyblogger", "mua", "makeupartist", "beautyaddict", "instabeauty", "lipstick", "eyeshadow", "haircare", "selfcare", "natural", "glam", "glow", "cosmetics", "beautytips", "instamakeup", "belleza"],
  tech: ["tech", "technology", "innovation", "gadgets", "developer", "programming", "coding", "software", "ai", "artificialintelligence", "machinelearning", "data", "startup", "engineering", "programmer", "code", "tecnologia", "javascript", "python", "react", "webdev"],
  business: ["business", "entrepreneur", "marketing", "success", "motivation", "businessowner", "entrepreneurship", "startup", "branding", "smallbusiness", "ecommerce", "leadership", "growth", "sales", "investment", "money", "freelance", "remotework", "negocio", "emprendedor"],
  photography: ["photography", "photo", "photographer", "photooftheday", "art", "instagood", "picoftheday", "naturephotography", "portrait", "landscape", "blackandwhite", "streetphotography", "canon", "nikon", "sony", "fotografia", "lightroom", "vsco"],
  pets: ["pet", "dog", "cat", "puppy", "kitten", "doglover", "catlover", "petsofinstagram", "instadog", "instacat", "rescue", "adoptdontshop", "petlovers", "doglife", "perro", "gato", "mascotas"],
  motivation: ["motivation", "inspiration", "quotes", "mindset", "success", "selfimprovement", "positivevibes", "goals", "dream", "believe", "motivacional", "frases", "exito", "lifequotes", "motivationalquotes", "mindfulness"],
  "real-estate": ["realestate", "realtor", "home", "property", "house", "homesweethome", "interiordesign", "realtorlife", "luxuryhomes", "newhome", "househunting", "investment", "property", "casa", "inmobiliaria", "bienesraices"],
  music: ["music", "musician", "song", "songwriter", "singer", "rapper", "producer", "studio", "live", "concert", "guitar", "musica", "instrument", "newmusic", "spotify", "musicproducer", "indie", "rock", "pop"]
};

function generateForKeyword(keyword: string, base: string[], total: number): string[] {
  const k = keyword.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
  if (!k) return base.slice(0, total);
  const variations = [
    k, k + "s", k + "lover", k + "life", k + "addict", k + "community",
    "instagram" + k, k + "gram", k + "daily", "best" + k, k + "world", k + "tips",
    `i${k}`, `${k}love`, `${k}art`, `${k}style`, `${k}vibes`, `${k}club`,
    k + "2026", k + "ofinstagram", k + "ofig", k + "model"
  ].filter((v) => v.length >= 3 && v.length <= 25);
  const merged = [...new Set([...variations, ...base])].slice(0, total);
  return merged;
}

export function HashtagGenerator() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<keyof typeof CATEGORIES>("fitness");
  const [count, setCount] = useState(20);
  const [copied, setCopied] = useState(false);

  const tags = useMemo(() => generateForKeyword(keyword, CATEGORIES[category], count), [keyword, category, count]);
  const formatted = tags.map((t) => `#${t}`).join(" ");

  async function copy() {
    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
          <span style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 50%, black))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Generador de Hashtags</span>
        </h1>
        <p className="text-base md:text-lg text-[color:var(--color-fg-soft)] max-w-2xl mx-auto">Hashtags para Instagram, TikTok, X y LinkedIn. Mix de populares + variaciones de tu keyword.</p>
      </div>

      <div className="rounded-3xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-6 md:p-8 mb-6 space-y-5">
        <label className="block">
          <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Tu keyword (opcional)</span>
          <input className="w-full mt-1.5 px-4 py-3 rounded-xl border-2 border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-base focus:outline-none focus:border-[color:var(--color-brand)]" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Ej: yoga, sushi, viaje, marketing" />
        </label>

        <div>
          <div className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)] mb-2">Categoría</div>
          <div className="flex flex-wrap gap-2">
            {Object.keys(CATEGORIES).map((c) => (
              <button key={c} onClick={() => setCategory(c)} className="px-3 py-1.5 rounded-md text-sm font-medium transition capitalize" style={category === c ? { background: ACCENT, color: "white" } : { background: "var(--color-bg-soft)" }}>
                {c.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block">
            <span className="text-xs font-bold uppercase text-[color:var(--color-fg-soft)]">Cantidad: {count} hashtags</span>
            <input type="range" min={10} max={30} value={count} onChange={(e) => setCount(+e.target.value)} className="w-full mt-2" />
          </label>
          <div className="flex justify-between text-[10px] text-[color:var(--color-fg-soft)]">
            <span>10 (LinkedIn)</span><span>20</span><span>30 (Instagram máx)</span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl p-6 md:p-8 text-white shadow-2xl mb-6" style={{ background: `linear-gradient(135deg, ${ACCENT}, color-mix(in oklch, ${ACCENT} 60%, black))` }}>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs uppercase opacity-80 tracking-widest flex items-center gap-2"><Sparkles className="w-4 h-4" /> {tags.length} hashtags</div>
          <button onClick={copy} className="px-4 py-2 rounded-lg bg-white text-black font-bold text-sm inline-flex items-center gap-1.5 hover:scale-[1.02] transition">
            {copied ? <><Check className="w-4 h-4" /> Copiado</> : <><Copy className="w-4 h-4" /> Copiar todos</>}
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t, i) => (
            <span key={i} className="bg-white/15 backdrop-blur px-2.5 py-1 rounded-md text-sm font-medium inline-flex items-center gap-0.5">
              <Hash className="w-3 h-3 opacity-60" />{t}
            </span>
          ))}
        </div>
      </div>

      <AdSlot slot="hashtags_inline" format="auto" minHeight={180} className="mb-6" />

      <div className="rounded-2xl bg-[color:var(--color-bg-soft)] p-5 text-sm text-[color:var(--color-fg-soft)]">
        <strong className="text-[color:var(--color-fg)] block mb-2">📱 Recomendaciones por plataforma</strong>
        <ul className="space-y-1">
          <li><strong className="text-[color:var(--color-fg)]">Instagram:</strong> 20-30 hashtags al final del post o en el primer comentario.</li>
          <li><strong className="text-[color:var(--color-fg)]">TikTok:</strong> 3-5 hashtags relevantes (algoritmo prioriza relevancia, no cantidad).</li>
          <li><strong className="text-[color:var(--color-fg)]">X/Twitter:</strong> 1-2 dentro del texto, integrados naturalmente.</li>
          <li><strong className="text-[color:var(--color-fg)]">LinkedIn:</strong> 3-5 hashtags profesionales al final del post.</li>
        </ul>
      </div>
    </div>
  );
}
