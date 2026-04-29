type StyleMap = { [key: string]: string };

const ABC_LOWER = "abcdefghijklmnopqrstuvwxyz";
const ABC_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function buildMap(toLower: string, toUpper: string): StyleMap {
  const m: StyleMap = {};
  for (let i = 0; i < 26; i++) {
    m[ABC_LOWER[i]] = [...toLower][i] || ABC_LOWER[i];
    m[ABC_UPPER[i]] = [...toUpper][i] || ABC_UPPER[i];
  }
  return m;
}

function transformWith(map: StyleMap, text: string): string {
  return [...text].map((ch) => map[ch] ?? ch).join("");
}

export type FancyStyle = {
  slug: string;
  name: string;
  description: string;
  preview: string;
  transform: (text: string) => string;
};

const BUBBLE = buildMap("ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ", "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ");
const SQUARE = buildMap("🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉", "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉");
const SMALL_CAPS = buildMap("ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ", "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ");
const SCRIPT = buildMap("𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏", "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵");
const BOLD = buildMap("𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳", "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙");
const ITALIC = buildMap("𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧", "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍");
const BOLD_ITALIC = buildMap("𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛", "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁");
const FRAKTUR = buildMap("𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷", "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ");
const DOUBLE = buildMap("𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫", "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ");
const MONOSPACE = buildMap("𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣", "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉");
const UPSIDE = buildMap("ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz", "∀ꓭƆꓷƎℲ⅁HIᒋꓘ⅂WNOꓒꓓꓤSꓕꓵꓥMX⅄Z");

const STYLES: FancyStyle[] = [
  { slug: "negrita", name: "Negrita", description: "Texto en Unicode bold para Instagram, WhatsApp y bios.", preview: "𝐍𝐞𝐠𝐫𝐢𝐭𝐚", transform: (t) => transformWith(BOLD, t) },
  { slug: "italica", name: "Itálica", description: "Texto inclinado en Unicode.", preview: "𝐼𝑡𝑎́𝑙𝑖𝑐𝑎", transform: (t) => transformWith(ITALIC, t) },
  { slug: "negrita-italica", name: "Negrita itálica", description: "Bold + italic combinados.", preview: "𝑩𝒐𝒍𝒅 𝒊𝒕𝒂𝒍𝒊𝒄", transform: (t) => transformWith(BOLD_ITALIC, t) },
  { slug: "cursiva", name: "Cursiva script", description: "Caligrafía elegante para perfiles.", preview: "𝒞𝓊𝓇𝓈𝒾𝓋𝒶", transform: (t) => transformWith(SCRIPT, t) },
  { slug: "gotica-fraktur", name: "Gótica (Fraktur)", description: "Tipografía medieval/gótica.", preview: "𝔊𝔬́𝔱𝔦𝔠𝔞", transform: (t) => transformWith(FRAKTUR, t) },
  { slug: "doble-trazo", name: "Doble trazo", description: "Letras de pizarra (matemática).", preview: "𝔻𝕠𝕓𝕝𝕖", transform: (t) => transformWith(DOUBLE, t) },
  { slug: "monospace", name: "Monospace", description: "Texto de máquina de escribir.", preview: "𝙼𝚘𝚗𝚘", transform: (t) => transformWith(MONOSPACE, t) },
  { slug: "burbujas", name: "Burbujas", description: "Letras dentro de círculos.", preview: "Ⓑⓤⓡⓑⓤⓙⓐⓢ", transform: (t) => transformWith(BUBBLE, t) },
  { slug: "cuadrados", name: "Cuadrados", description: "Letras dentro de cuadrados.", preview: "🅂🅀🅄🄰🅁🄴", transform: (t) => transformWith(SQUARE, t) },
  { slug: "small-caps", name: "Versalitas", description: "Mayúsculas pequeñas (small caps).", preview: "ꜱᴍᴀʟʟ ᴄᴀᴘꜱ", transform: (t) => transformWith(SMALL_CAPS, t) },
  { slug: "tachado", name: "Tachado", description: "Texto con línea encima.", preview: "T̶a̶c̶h̶a̶d̶o̶", transform: (t) => [...t].map((c) => c + "̶").join("") },
  { slug: "subrayado", name: "Subrayado", description: "Texto con línea debajo.", preview: "S̲u̲b̲r̲a̲y̲a̲d̲o̲", transform: (t) => [...t].map((c) => c + "̲").join("") },
  { slug: "doble-tachado", name: "Doble tachado", description: "Línea doble encima.", preview: "D̳o̳b̳l̳e̳", transform: (t) => [...t].map((c) => c + "̳").join("") },
  { slug: "al-reves", name: "Al revés", description: "Texto invertido (upside down).", preview: "lɐ ɹǝʌǝs", transform: (t) => [...t.toLowerCase()].reverse().map((c) => UPSIDE[c] ?? c).join("") },
  { slug: "espejo", name: "Espejo (reverso)", description: "Texto al reverso.", preview: "ojepsE", transform: (t) => [...t].reverse().join("") },
  { slug: "espaciado", name: "E s p a c i a d o", description: "Letras separadas con espacios.", preview: "S P A C E D", transform: (t) => [...t].join(" ") },
  { slug: "vaporwave", name: "Vaporwave (full-width)", description: "Estilo aesthetic ancho.", preview: "Ｖａｐｏｒｗａｖｅ", transform: (t) => [...t].map((c) => { const code = c.charCodeAt(0); return code >= 33 && code <= 126 ? String.fromCharCode(code + 0xFEE0) : c === " " ? "　" : c; }).join("") },
  { slug: "aesthetic", name: "A E S T H E T I C", description: "Letras separadas estilo Tumblr.", preview: "a e s t h e t i c", transform: (t) => [...t.toLowerCase()].join(" ") },
  { slug: "zalgo", name: "Zalgo (glitch)", description: "Texto corrupto / glitch para gaming.", preview: "Z͙a͙l͙g͙o͙", transform: (t) => { const marks = ["̀","́","̂","̃","̄","̅","̆","̇","̈","̊","̋","̌","̧","̨","̮","̼","͍"]; return [...t].map((c) => c + marks[Math.floor(Math.random()*marks.length)] + marks[Math.floor(Math.random()*marks.length)]).join(""); } },
  { slug: "burbujas-negras", name: "Burbujas negras", description: "Letras blancas en círculos negros.", preview: "🅑🅛🅐🅒🅚", transform: (t) => transformWith(buildMap("🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩", "🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩"), t) },
  { slug: "doble-tachado-grueso", name: "Tachado grueso", description: "Línea más visible encima del texto.", preview: "T̴a̴c̴h̴", transform: (t) => [...t].map((c) => c + "̴").join("") },
  { slug: "punto-arriba", name: "Punto arriba", description: "Cada letra con punto encima.", preview: "Ṗu̇ṅṫȯ", transform: (t) => [...t].map((c) => c + "̇").join("") },
  { slug: "ondulado", name: "Ondulado", description: "Línea ondulada bajo cada letra.", preview: "O̰n̰d̰", transform: (t) => [...t].map((c) => c + "̰").join("") },
  { slug: "punto-abajo", name: "Punto abajo", description: "Cada letra con punto debajo.", preview: "Ṗụṇṭọ", transform: (t) => [...t].map((c) => c + "̣").join("") },
  { slug: "instagram-bio", name: "Estilo Instagram bio", description: "Mix mejor para bio de Instagram.", preview: "𝐢𝐠 𝐛𝐢𝐨", transform: (t) => transformWith(BOLD, t) }
];

export const FANCY_STYLES = STYLES;
export const FANCY_BY_SLUG = Object.fromEntries(STYLES.map((s) => [s.slug, s]));
export function transformAll(text: string) {
  return STYLES.map((s) => ({ ...s, output: s.transform(text) }));
}
