/**
 * Rellena las FAQ en inglés que estaban vacías en lib/i18n.ts.
 *
 * QUÉ PASABA (16-ago-2026):
 * 45 de las 51 herramientas traducidas tenían `faqs: []`. La plantilla de
 * /en/[slug] solo pinta la sección de preguntas si el array trae algo, así que
 * esas 45 páginas se quedaban en 65-80 palabras: H1, un párrafo y «Why use
 * Toolram». Google las rastreó y las dejó en «Rastreada: actualmente sin
 * indexar» — que es lo que hace con el contenido delgado.
 *
 * No era canibalización (el radar marcaba 11 parejas; medido contra las páginas
 * reales, el texto que comparten es del 2 % al 25 %). Era que estaban vacías.
 *
 * Esto sube cada página a ~200-250 palabras y además activa el schema FAQPage.
 * Es un cambio de DATOS: no toca la plantilla ni la lógica.
 *
 * Uso:  node scripts/rellenar-faqs-en.mjs        (escribe lib/i18n.ts)
 *       node scripts/rellenar-faqs-en.mjs --dry  (solo informa)
 */
import { readFileSync, writeFileSync } from "node:fs";

const FAQS = {
  "contador-caracteres": [
    ["Does it count spaces as characters?", "Yes. It shows both totals side by side: characters including spaces and characters without them, because Twitter/X and SMS count them differently."],
    ["Is there a character limit?", "No. You can paste an entire book if you want — the count runs in your browser, so nothing is uploaded."],
    ["Can I use it to check a meta description length?", "Yes, that is one of the most common uses. Aim for 150-160 characters so Google does not cut your snippet mid-word."]
  ],
  "convertir-mayusculas": [
    ["Which cases can I convert to?", "UPPERCASE, lowercase, Sentence case, Title Case and toggle case. Paste the text once and switch between them freely."],
    ["Does it keep my accents and special characters?", "Yes. Accented letters, ñ, ü and other marks are preserved when changing case."],
    ["Does Title Case follow English rules?", "It capitalises the first letter of each word, which is the behaviour most people expect. Short articles and prepositions are not lowercased automatically."]
  ],
  "lorem-ipsum": [
    ["What is Lorem Ipsum for?", "It is placeholder text used in design and development so you can see how a layout behaves before the real copy exists."],
    ["Can I choose how much text I get?", "Yes. You pick the number of paragraphs, sentences or words, so you can fill anything from a caption to a full article mock-up."],
    ["Does it always start with «Lorem ipsum dolor sit amet»?", "You can choose. Starting with the classic opening is the convention, but you can generate text without it if you prefer."]
  ],
  "generador-uuid": [
    ["Which UUID version does it generate?", "Version 4, the random one. It is the version you want for database keys, session identifiers and anything that must not collide."],
    ["Can two generated UUIDs ever be the same?", "In practice, no. A v4 UUID has 122 random bits: the chance of a repeat is so small it is not a risk worth planning for."],
    ["Are they generated on your server?", "No. They are created in your browser with the Web Crypto API, so the values never travel anywhere."]
  ],
  "generador-qr": [
    ["What can I put inside the QR code?", "A URL, plain text, a phone number, an email address or a WiFi network. The code adapts its density to the amount of data."],
    ["Can I print it large without losing quality?", "Yes. Download it as SVG and it stays sharp at any size, which is what you want for posters, menus or packaging."],
    ["Does the QR code expire?", "No. It is a static code: the content is inside the image itself, so it works forever and does not depend on our site staying online."]
  ],
  "json-formatter": [
    ["What happens if my JSON is invalid?", "It tells you where the problem is instead of failing silently, so you can jump straight to the line with the missing comma or bracket."],
    ["Can I minify as well as prettify?", "Yes. You can indent it for reading or strip every space for production, both ways."],
    ["Is my JSON sent anywhere?", "No. It is parsed in your browser, which matters when the file contains API keys or customer data."]
  ],
  "base64-encode": [
    ["What is Base64 actually for?", "It turns binary data into plain text so it can travel through channels that only accept text: emails, JSON payloads, data URIs in CSS."],
    ["Is Base64 a form of encryption?", "No, and this trips people up. It is an encoding: anyone can decode it instantly. Never use it to hide passwords."],
    ["Does it handle accents and emoji?", "Yes. Text is treated as UTF-8, so ñ, á and emoji survive the round trip intact."]
  ],
  "url-encode": [
    ["When do I need to encode a URL?", "Whenever a parameter contains spaces, accents, &, ? or #. Without encoding, the browser cuts the value at the first special character."],
    ["What does %20 mean?", "It is a space. Percent encoding replaces each unsafe character with a % followed by its hexadecimal code."],
    ["Can it decode a link someone sent me?", "Yes. Paste the encoded URL and it returns the readable version, which is handy for reading long tracking links."]
  ],
  "hash-md5-sha": [
    ["Which algorithms are supported?", "MD5, SHA-1, SHA-256 and SHA-512, calculated in your browser through the Web Crypto API."],
    ["Can I recover the original text from a hash?", "No. Hashing only goes one way by design. What attackers do is guess inputs until one matches, which is why weak passwords fall."],
    ["Should I still use MD5?", "Only for checksums, never for security. MD5 and SHA-1 are broken for cryptographic use; pick SHA-256 or SHA-512."]
  ],
  "tiempo-reaccion": [
    ["What is a normal reaction time?", "Most people land between 200 and 300 milliseconds. Under 200 ms is genuinely fast; over 400 ms usually means tiredness or distraction."],
    ["Does my screen affect the result?", "Yes, quite a lot. A 60 Hz monitor and a wireless mouse add several milliseconds that have nothing to do with you."],
    ["How many attempts should I average?", "At least five. A single try is mostly luck; the average across a handful is the number that means something."]
  ],
  "cronometro": [
    ["Does it keep running if I switch tabs?", "Yes. The count is based on real elapsed time, so leaving the tab or minimising the window does not slow it down."],
    ["Can I record lap times?", "Yes. Each lap is stored with its split, so you can compare rounds without stopping the clock."],
    ["Do I lose everything if I reload the page?", "Yes, a reload resets the stopwatch. Note down your laps before refreshing."]
  ],
  "ruleta-decision": [
    ["Is the result really random?", "Yes. Each spin uses the browser's random number generator, and every option on the wheel has exactly the same chance."],
    ["How many options can I add?", "As many as you need. With very long lists the labels get small, so keep it readable if you want to see the winner clearly."],
    ["Can I save my wheel for later?", "The options live in the page while it is open. If you close it, you will need to type them again."]
  ],
  "dividir-pdf": [
    ["Can I extract just one page?", "Yes. Choose the exact page or a range like 3-7 and you get a new PDF containing only that."],
    ["Is my document uploaded to a server?", "No. The PDF is processed inside your browser, which is the whole point when the file is a contract or an invoice."],
    ["Does splitting reduce the quality?", "No. Pages are copied as they are, so text stays selectable and images keep their original resolution."]
  ],
  "rotar-pdf": [
    ["Can I rotate only some pages?", "Yes. You can turn the whole document or pick specific pages, which is what you need after scanning a batch sideways."],
    ["Which angles are available?", "90°, 180° and 270°. Applying 90° twice is the same as 180°."],
    ["Will the rotation stick when I open it elsewhere?", "Yes. The rotation is written into the file, so it looks the same in any reader or when printed."]
  ],
  "marca-agua-pdf": [
    ["Can I choose where the watermark goes?", "Yes. You control the text, its position, size, angle and transparency, so it can sit diagonally across the page or discreetly in a corner."],
    ["Can the watermark be removed afterwards?", "It is drawn onto the page, so it is not a layer someone can switch off casually. It is a deterrent, not encryption."],
    ["Does it apply to every page?", "Yes, the watermark is added to all pages of the document in one pass."]
  ],
  "imagenes-a-pdf": [
    ["Can I combine several images into one PDF?", "Yes. Add all the images, drag them into the order you want and they become a single document."],
    ["Which formats are accepted?", "JPG, PNG and WebP. They are placed at their original resolution, so the result is as sharp as the source."],
    ["Can I choose page size and orientation?", "Yes, you can fit the page to the image or use a standard size such as A4 in portrait or landscape."]
  ],
  "calculadora-imc": [
    ["What is a healthy BMI range?", "The WHO considers 18.5 to 24.9 normal weight. Below that is underweight and above it is overweight, with obesity from 30."],
    ["Why is BMI unreliable for athletes?", "Because it only knows height and weight. Muscle is denser than fat, so a very fit person can score as «overweight» while carrying little fat."],
    ["Does it work with pounds and inches?", "Yes, you can switch units. The formula is the same; only the conversion factor changes."]
  ],
  "calculadora-edad": [
    ["How exact is the result?", "It gives your age in years, months and days, counting leap years properly rather than assuming every year has 365 days."],
    ["Can I calculate the age at a past or future date?", "Yes. Set the reference date and it works out the age on that day, which is useful for forms and eligibility checks."],
    ["Does it tell me how long until my next birthday?", "Yes, it shows the days remaining alongside your current age."]
  ],
  "comprimir-pdf": [
    ["How much smaller will my file get?", "It depends on what is inside. Documents full of photos can drop a lot; a PDF that is mostly text is already compact and will barely change."],
    ["Will the text become blurry?", "No. Text stays vector and selectable; compression works on the embedded images."],
    ["Is there a file size limit?", "The limit is your device's memory, because the work happens in your browser rather than on a server."]
  ],
  "pdf-a-jpg": [
    ["Do I get one image per page?", "Yes. Each page becomes its own JPG, so a ten-page PDF gives you ten images."],
    ["Can I choose the resolution?", "Yes. Higher DPI means sharper images and bigger files; 150 DPI is fine for screens, 300 for printing."],
    ["Does it work with scanned documents?", "Yes, though the output is only as good as the scan. A blurry original stays blurry."]
  ],
  "comprimir-imagen": [
    ["Will I notice the quality loss?", "At around 80% quality most photos look identical to the eye while weighing far less. You can move the slider and compare before downloading."],
    ["Which formats can I compress?", "JPG, PNG and WebP. Converting a PNG photo to WebP usually saves the most."],
    ["Are my photos uploaded anywhere?", "No. Everything happens in your browser, so personal pictures never leave the device."]
  ],
  "convertir-imagen": [
    ["Which conversions are supported?", "Between JPG, PNG and WebP in any direction."],
    ["Which format should I choose for a website?", "WebP, in most cases. It gives similar quality at a noticeably smaller size and every current browser supports it."],
    ["Does PNG keep transparency when converting?", "Converting PNG to WebP keeps transparency. Converting to JPG does not — JPG has no transparency, so it fills with a solid background."]
  ],
  "redimensionar-imagen": [
    ["Does it keep the aspect ratio?", "Yes by default, so nothing looks stretched. You can unlock it if you deliberately need exact dimensions."],
    ["Can I make an image bigger?", "You can, but enlarging never adds detail that was not captured. Going up much beyond the original size looks soft."],
    ["Can I resize several images at once?", "You can process them one after another in the same session without reloading the page."]
  ],
  "youtube-thumbnail": [
    ["Which sizes can I download?", "All the ones YouTube stores, from the small preview up to maxresdefault at 1280×720 when the uploader provided it."],
    ["Why is the maximum resolution missing sometimes?", "Because maxresdefault only exists if the original video was uploaded in HD. Older or low-resolution videos simply do not have it."],
    ["Can I use the thumbnail in my own content?", "The image belongs to whoever uploaded the video. Use it for reference or commentary, not as if it were yours."]
  ],
  "wifi-qr": [
    ["How does a WiFi QR code work?", "It stores the network name, the password and the security type. Scanning it makes the phone offer to join without typing anything."],
    ["Does it work on iPhone and Android?", "Yes. Both connect straight from the camera app on current versions."],
    ["Is it safe to print and leave on a table?", "Anyone who can see it can join your network, so it is ideal for a guest network and a bad idea for your main one."]
  ],
  "escaner-qr": [
    ["Do I need to install an app?", "No. It uses your device camera straight from the browser, and you can also scan an image file you already have."],
    ["Is the scanned content sent anywhere?", "No. Decoding happens on your device, so whatever the code contains stays with you."],
    ["Can it read a QR code from a screenshot?", "Yes. Upload the image and it decodes it without needing the camera."]
  ],
  "lector-codigo-barras": [
    ["Which barcode types can it read?", "The common retail and logistics formats, including EAN-13, UPC, Code 128 and Code 39."],
    ["Does it tell me the product name?", "No. A barcode is just a number; matching it to a product needs a commercial database. You get the digits."],
    ["Can I scan from a photo instead of the camera?", "Yes, upload the picture and it will try to decode it. A sharp, well-lit shot works far better."]
  ],
  "ocr-imagen-texto": [
    ["How accurate is the recognition?", "Very good with clean, printed text. Handwriting, low light and photos taken at an angle drop the accuracy sharply."],
    ["Which languages does it handle?", "It is tuned for the Latin alphabet, so English, Spanish and similar languages work well, accents included."],
    ["Is my image uploaded to a server?", "No. Recognition runs in your browser, which matters when you are scanning documents with personal data."]
  ],
  "texto-a-voz": [
    ["Which voices are available?", "The ones installed on your own device, because it uses your system's speech engine. That is why the list differs between Windows, macOS and Android."],
    ["Can I download the audio as a file?", "It plays through the browser. To keep a file you would need to record the system audio."],
    ["Can I change the speed and pitch?", "Yes, both are adjustable, which helps when you are proofreading a text by ear."]
  ],
  "voz-a-texto": [
    ["Do I need a microphone permission?", "Yes, the browser will ask for it. Without permission it cannot hear anything."],
    ["Does it add punctuation on its own?", "Partly. Saying «comma» or «full stop» out loud is still the reliable way to get the punctuation you want."],
    ["Which browsers support it?", "Chrome and Edge handle it best. Support in Firefox and Safari is more limited."]
  ],
  "creador-backlinks": [
    ["Do these links actually improve my ranking?", "They are mostly analysis and directory pages. Treat them as quick visibility and indexing signals, not as a substitute for links people give you because your content is good."],
    ["Is this safe for my site?", "These are public, well-known services rather than a private link network, so the risk is low. Building thousands of links quickly is what gets sites in trouble."],
    ["How long until they appear?", "Some pages are created instantly, others need the service to crawl your site first, which can take days."]
  ],
  "generador-meta-tags": [
    ["Which tags does it produce?", "Title, description, canonical, robots, Open Graph and Twitter Card — the set most pages actually need."],
    ["How long should my title and description be?", "Around 55-60 characters for the title and 150-160 for the description, so Google does not cut them mid-word."],
    ["Does Google always use my description?", "No. It often writes its own from the page content when it thinks that answers the query better. A good description still raises your odds."]
  ],
  "previsualizador-serp": [
    ["Why does my title look cut off?", "Google measures pixels, not characters. A title full of wide letters gets truncated sooner than one with narrow ones."],
    ["Is the preview exactly what Google will show?", "It is a faithful simulation, but Google can rewrite titles and descriptions. Use it to avoid obvious truncation."],
    ["Does it show mobile and desktop?", "Yes, and they differ. Mobile has less room, so check both before publishing."]
  ],
  "densidad-keywords": [
    ["What is a good keyword density?", "There is no magic number. Writing naturally usually lands between 1% and 2%; anything far above that reads like spam to people and to Google."],
    ["Does keyword density still matter for SEO?", "Not as a ranking factor on its own. It is useful as a sanity check: it tells you whether your page is actually about what you think it is."],
    ["Does it count two-word and three-word phrases?", "Yes, and those are usually more revealing than single words."]
  ],
  "analizador-meta": [
    ["What does it check?", "The title, description, canonical, robots directives and the Open Graph tags of any public URL, plus their lengths."],
    ["Why does it say my description is missing?", "Either the page has no description tag, or it is injected by JavaScript after load, in which case a crawler may not see it either."],
    ["Can I analyse a competitor's page?", "Yes, any publicly reachable URL works."]
  ],
  "generador-robots": [
    ["What should a basic robots.txt contain?", "Allow crawling of your content, block private or duplicated areas such as admin and internal search, and point to your sitemap."],
    ["Does blocking a page in robots.txt remove it from Google?", "No, and this is the classic mistake. Blocking stops crawling, not indexing. To remove a page use a noindex tag and let Google crawl it."],
    ["Should I block AI crawlers?", "That is your call. It is a trade-off between appearing in AI answers and having your content used for training."]
  ],
  "generador-sitemap": [
    ["How many URLs can a sitemap hold?", "Up to 50,000 URLs or 50 MB. Beyond that you need several sitemaps and an index file."],
    ["What should the lastmod date say?", "The truth. If every URL claims it changed today, Google stops trusting the field and ignores it entirely."],
    ["Do I have to include every page?", "No. Include the pages you want indexed. Leaving out thin or duplicated URLs is a feature, not an omission."]
  ],
  "generador-schema-faq": [
    ["Will this give me rich results in Google?", "FAQ rich results are now limited to a narrow set of authoritative sites. The markup still helps search engines and AI assistants understand your page."],
    ["Do the questions have to be visible on the page?", "Yes. Marking up questions and answers that a visitor cannot see breaks Google's guidelines."],
    ["Which format does it output?", "JSON-LD, which is the format Google recommends. Paste it into the head of your page."]
  ],
  "css-flex-generator": [
    ["What is the difference between Flexbox and Grid?", "Flexbox lays things out along one axis — a row or a column. Grid handles rows and columns at the same time. For a navigation bar you want Flexbox."],
    ["Does the preview reflect real behaviour?", "Yes. You are seeing actual CSS applied live, so what you copy is what you get."],
    ["What does justify-content do exactly?", "It distributes free space along the main axis: pushing items to the start, the end, the centre, or spreading them apart."]
  ],
  "css-grid-generator": [
    ["When should I use Grid instead of Flexbox?", "When the layout has both rows and columns that need to line up — page templates, dashboards, image galleries."],
    ["What does 1fr mean?", "A fraction of the free space. Three columns of 1fr split the space equally; 2fr 1fr gives the first column twice the width."],
    ["Can I create responsive layouts with it?", "Yes. Combining repeat(auto-fit, minmax(...)) lets the grid reflow without a single media query."]
  ],
  "cubic-bezier-generator": [
    ["What is an easing curve for?", "It decides how an animation accelerates. Linear motion looks robotic; a curve makes it feel natural."],
    ["Which curve should I use for a UI?", "Something that starts fast and settles gently — ease-out is the safe default for elements entering the screen."],
    ["Can I go outside the 0-1 range?", "Yes, and that gives you the bounce or overshoot effect. It is intentional, not a bug."]
  ],
  "color-palette": [
    ["How are the palettes built?", "From colour theory relationships — complementary, analogous, triadic — starting from the colour you pick."],
    ["Can I get the values in HEX and RGB?", "Yes, each colour comes with its HEX, RGB and HSL values ready to copy."],
    ["Will the palette be accessible?", "Not automatically. Check text and background pairs with a contrast checker before shipping them."]
  ],
  "contraste-color-wcag": [
    ["What contrast ratio do I need?", "4.5:1 for normal text and 3:1 for large text to meet AA. AAA asks for 7:1."],
    ["Why did my brand colour fail?", "Brand palettes are chosen to look good, not to be readable. Light greys and mid-tone colours on white fail very often."],
    ["Does it apply to icons and buttons?", "Yes. Interface elements and meaningful graphics need at least 3:1 against their background."]
  ],
  "interes-compuesto": [
    ["What is the difference from simple interest?", "Simple interest always pays on the original amount. Compound interest pays on the amount plus the interest already earned, which is why it accelerates."],
    ["Does the compounding frequency matter?", "Yes. Monthly compounding beats annual at the same rate, though the gap is smaller than most people expect."],
    ["Can I add regular contributions?", "Yes, and that is usually where the real growth comes from — more than the rate itself over long periods."]
  ],
  "salario-hora-anual": [
    ["How does it convert hourly pay to annual?", "It multiplies your rate by the hours you work per week and by the weeks you work per year, so part-time and unpaid holidays are handled properly."],
    ["Does it account for taxes?", "No. The figures are gross, before tax and deductions, which vary by country."],
    ["Can I go the other way round?", "Yes. Enter an annual salary and it works out the equivalent hourly rate."]
  ]
};

const RUTA = new URL("../lib/i18n.ts", import.meta.url).pathname;
const seco = process.argv.includes("--dry");
let src = readFileSync(RUTA, "utf8");

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
let hechas = 0, faltan = [];

for (const [slug, pares] of Object.entries(FAQS)) {
  // localizar la entrada y su `faqs: []`
  const ini = src.indexOf(`\n  "${slug}": {`);
  if (ini === -1) { faltan.push(`${slug}: no está en i18n.ts`); continue; }
  const sig = src.indexOf('\n  "', ini + 5);
  const fin = sig === -1 ? src.length : sig;
  const bloque = src.slice(ini, fin);
  if (!/faqs:\s*\[\s*\]/.test(bloque)) { faltan.push(`${slug}: su faqs ya tenía contenido`); continue; }
  const nuevo = bloque.replace(
    /faqs:\s*\[\s*\]/,
    "faqs: [\n" +
      pares.map(([q, a]) => `      { q: "${esc(q)}", a: "${esc(a)}" }`).join(",\n") +
      "\n    ]"
  );
  src = src.slice(0, ini) + nuevo + src.slice(fin);
  hechas++;
}

console.log(`FAQ en inglés rellenadas: ${hechas} de ${Object.keys(FAQS).length}`);
if (faltan.length) { console.log("sin tocar:"); faltan.forEach((f) => console.log("   ·", f)); }
if (seco) { console.log("(seco: no se ha escrito nada)"); process.exit(0); }
writeFileSync(RUTA, src);
console.log("✅ lib/i18n.ts actualizado");
