export type AlternativeEntry = {
  slug: string;
  competitor: string;
  competitorUrl: string;
  shortDescription: string;
  intro: string;
  whyLookForAlternatives: string[];
  toolramAdvantages: string[];
  competitorAdvantages: string[];
  comparisonRows: { feature: string; toolram: string | boolean; competitor: string | boolean; }[];
  otherAlternatives: { name: string; description: string; url?: string; }[];
  faqs: { q: string; a: string }[];
};

const t = "✓";
const f = "✗";

export const ALTERNATIVES: AlternativeEntry[] = [
  {
    slug: "alternativas-a-ilovepdf",
    competitor: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com",
    shortDescription: "iLovePDF es una de las plataformas de manipulación de PDF más conocidas. Estas son 7 alternativas gratuitas — incluyendo opciones que NO suben tus archivos a su servidor.",
    intro: "iLovePDF maneja más de 200 millones de visitas mensuales y ofrece 25+ herramientas para PDF. Sin embargo, todas sus herramientas suben tus archivos a sus servidores, requieren cuenta para volúmenes mayores y muestran ads. Si buscás alternativas más privadas, gratuitas o con mejor experiencia, esta es la lista honesta para 2026.",
    whyLookForAlternatives: [
      "Tus archivos se suben a sus servidores europeos (problema para datos sensibles legales/médicos)",
      "Marca de agua en plan gratis para algunas funciones",
      "Límite de 25 MB en plan free",
      "Ads invasivos en la versión web gratuita",
      "Requiere registro después de cierto uso",
      "Política de retención: archivos eliminados a las 2 horas (pero no zero-retention)"
    ],
    toolramAdvantages: [
      "100% client-side: tus PDFs nunca salen de tu navegador",
      "Sin marca de agua, sin registro, sin límites artificiales",
      "Open source: el código es público y auditable",
      "Más rápido (sin uploads ni esperas)",
      "Spanish-first nativo (no traducción)",
      "Sin ads invasivos"
    ],
    competitorAdvantages: [
      "25+ herramientas vs 8 de Toolram (más cobertura de funciones avanzadas)",
      "OCR profesional de PDFs escaneados",
      "PDF a Word/Excel con preservación de tablas complejas",
      "Comprime PDFs de manera más agresiva (algoritmos propietarios)",
      "App móvil dedicada iOS/Android",
      "Plan Premium con batch processing"
    ],
    comparisonRows: [
      { feature: "Procesamiento local (privacy)", toolram: t, competitor: f },
      { feature: "Sin marca de agua en plan free", toolram: t, competitor: "Parcial" },
      { feature: "Sin registro requerido", toolram: t, competitor: "Hasta cierto uso" },
      { feature: "Límite de tamaño", toolram: "Memoria del navegador (~100MB)", competitor: "25 MB free / 100 MB premium" },
      { feature: "Open source", toolram: t, competitor: f },
      { feature: "Cantidad de tools PDF", toolram: "8", competitor: "25+" },
      { feature: "OCR PDF", toolram: "Próximamente", competitor: t },
      { feature: "PDF → Word con tablas complejas", toolram: "Beta cliente-side", competitor: "Sí (server-side)" },
      { feature: "Comprimir PDF agresivo", toolram: "Estándar", competitor: "Algoritmo propio mejor" },
      { feature: "App móvil nativa", toolram: f, competitor: t },
      { feature: "Precio plan completo", toolram: "Gratis", competitor: "$9/mes premium" }
    ],
    otherAlternatives: [
      { name: "SmallPDF", description: "Más pulido pero requiere registro tras 2 usos diarios. Sube archivos al server.", url: "https://smallpdf.com" },
      { name: "PDFCandy", description: "Buena cantidad de herramientas. Sube archivos. Marca de agua en algunas funciones free.", url: "https://pdfcandy.com" },
      { name: "Sejda", description: "Tiene modo desktop offline (rare entre competidores). Web limita a 3 tareas/hora.", url: "https://www.sejda.com" },
      { name: "HiPDF", description: "Por Wondershare. Funciones similares a iLovePDF, marca de agua agresiva en free.", url: "https://www.hipdf.com" },
      { name: "PDF.online", description: "Buen OCR, principalmente conversor.", url: "https://www.pdf.online" },
      { name: "DeftPDF", description: "Sin watermark, free unlimited. Sube al server.", url: "https://deftpdf.com" }
    ],
    faqs: [
      { q: "¿iLovePDF es seguro para documentos legales o médicos?", a: "Su política dice que elimina archivos a las 2 horas y usa SSL en tránsito. Sin embargo, el archivo SÍ pasa por sus servidores. Para datos sensibles regulados (HIPAA, GDPR estricto, secreto profesional), se recomienda procesamiento local como Toolram o Sejda Desktop." },
      { q: "¿Cuál es la mejor alternativa gratuita a iLovePDF?", a: "Depende: para privacy → Toolram (client-side). Para más herramientas → SmallPDF o PDFCandy. Para offline → Sejda Desktop. Para batch profesional sin pagar → DeftPDF." },
      { q: "¿iLovePDF realmente borra mis archivos?", a: "Su política dice que sí a las 2 horas. Pero no hay forma técnica de verificarlo desde fuera. Para certeza absoluta de que tu archivo no es accesible para nadie, usá una herramienta client-side." },
      { q: "¿Toolram tiene todas las funciones de iLovePDF?", a: "No. iLovePDF tiene 25+ herramientas; Toolram cubre las 8 más usadas. Estamos agregando más cada mes. Para funciones avanzadas como compresión agresiva o OCR profesional, iLovePDF sigue siendo una buena opción si la privacidad no es crítica." }
    ]
  },
  {
    slug: "alternativas-a-smallpdf",
    competitor: "SmallPDF",
    competitorUrl: "https://smallpdf.com",
    shortDescription: "SmallPDF es popular pero requiere registro tras pocos usos diarios. Estas son 6 alternativas — incluyendo opciones gratis sin límites artificiales.",
    intro: "SmallPDF (~120M visitas/mes) tiene una UX premium pero impone restricciones agresivas en su plan gratis: solo 2 tareas diarias antes de pedir registro, marca de agua en compresiones gratuitas, y todos los archivos se procesan en sus servidores. Estas son las alternativas reales para 2026.",
    whyLookForAlternatives: [
      "Solo 2 documentos por día en plan free",
      "Marca de agua 'Made with SmallPDF' en algunas conversiones gratuitas",
      "Sube todos los archivos al server (privacy concern)",
      "Plan Pro: $9/mes recurring",
      "Login requerido para batch operations",
      "Algoritmo de compresión bajó calidad notablemente desde 2023"
    ],
    toolramAdvantages: [
      "Sin límite diario de tareas",
      "Sin marca de agua, sin registro, sin Pro tier",
      "Procesamiento local: archivos privados",
      "Open source y verificable",
      "Más rápido sin uploads",
      "Sin pop-ups bloqueantes pidiendo registro"
    ],
    competitorAdvantages: [
      "Más cantidad de herramientas (~22 PDF tools)",
      "Conversiones de calidad enterprise (PDF a Word con layout perfecto)",
      "Integración con Google Drive y Dropbox",
      "Apps nativas iOS/Android",
      "OCR potente con motor propio",
      "eSign con flujo legal completo (incluye AES, audit trail)"
    ],
    comparisonRows: [
      { feature: "Tareas gratis por día", toolram: "Ilimitadas", competitor: "2/día" },
      { feature: "Marca de agua en plan free", toolram: f, competitor: "En conversiones" },
      { feature: "Procesamiento local", toolram: t, competitor: f },
      { feature: "Open source", toolram: t, competitor: f },
      { feature: "Apps móviles nativas", toolram: f, competitor: t },
      { feature: "Integración cloud (Drive/Dropbox)", toolram: f, competitor: t },
      { feature: "eSign con valor legal", toolram: f, competitor: t },
      { feature: "OCR profesional", toolram: "Beta", competitor: t },
      { feature: "Plan completo precio", toolram: "Gratis", competitor: "$9/mes" }
    ],
    otherAlternatives: [
      { name: "iLovePDF", description: "25+ herramientas. Sube archivos al server. Marca de agua en algunas. Más conocido.", url: "https://www.ilovepdf.com" },
      { name: "PDFCandy", description: "47+ herramientas. Sube archivos. Plan free decente.", url: "https://pdfcandy.com" },
      { name: "Sejda", description: "Modo desktop offline disponible. Web tiene 3 tareas/hora límite.", url: "https://www.sejda.com" },
      { name: "DeftPDF", description: "Free unlimited, sin watermark, pero sube al server.", url: "https://deftpdf.com" },
      { name: "PDF24", description: "Alemán, free unlimited, viewer y herramientas básicas.", url: "https://tools.pdf24.org" }
    ],
    faqs: [
      { q: "¿Por qué SmallPDF limita tanto el plan gratis?", a: "Es un freemium agresivo: 2 tareas diarias para forzar upgrade a Pro $9/mes. Funcionó comercialmente — son rentables. Pero para usuarios casuales es frustrante." },
      { q: "¿Cuál alternativa tiene la mejor calidad de PDF a Word?", a: "Para preservar formato complejo (tablas, columnas, headers), iLovePDF y SmallPDF Pro siguen siendo superiores a opciones client-side. Toolram es suficiente para PDFs simples." },
      { q: "¿Hay alguna alternativa con app móvil decente?", a: "iLovePDF (gratis con upsell), Adobe Scan (gratis, foco escanear+convertir). Toolram funciona en mobile via web pero sin app dedicada todavía." },
      { q: "¿SmallPDF tiene zero-knowledge encryption?", a: "No. Los archivos pasan por sus servers en claro durante el procesamiento. Solo Toolram, Sejda Desktop y DocFly Local cumplen zero-server-touch verificable." }
    ]
  },
  {
    slug: "alternativas-a-smallseotools",
    competitor: "SmallSEOTools",
    competitorUrl: "https://smallseotools.com",
    shortDescription: "SmallSEOTools es un mega-portal con 100+ herramientas SEO, pero su UX no avanzó desde 2014. Estas son 5 alternativas modernas.",
    intro: "SmallSEOTools (~5-10M visitas/mes) tiene amplia cobertura de tools pero arrastra problemas: ads invasivos que tapan el contenido, UI muy anticuada, páginas lentas (Lighthouse score sub-50), y muchas tools con resultados de baja calidad o desactualizados. Las alternativas modernas en 2026 ofrecen mejor experiencia con cobertura suficiente.",
    whyLookForAlternatives: [
      "UX/UI con diseño y fonts de 2014",
      "Lighthouse score mobile sub-50 (muy lento)",
      "Ads tapan el widget de la herramienta",
      "Algunas tools dan resultados estáticos o desactualizados",
      "Plagiarism Checker premium $9/mes",
      "API access requiere plan",
      "Sin modo oscuro"
    ],
    toolramAdvantages: [
      "Lighthouse 95+ mobile",
      "Sin ads en MVP, modo oscuro nativo",
      "Tools client-side cuando posible (privacy)",
      "Spanish-first vs traducciones automáticas",
      "Open source",
      "Diseño moderno 2026",
      "Categorías más cohesivas (SEO + PDF + AI + tests + más)"
    ],
    competitorAdvantages: [
      "100+ herramientas vs ~100 de Toolram (cobertura comparable, pero distribuida diferente)",
      "Plagiarism Checker propio (Toolram aún no lo tiene)",
      "Backlink Checker con base de datos propia",
      "Domain authority checker integrado",
      "Más tools específicas SEO (article spinner, keyword density, broken link checker, etc)",
      "Comunidad establecida con tutorials"
    ],
    comparisonRows: [
      { feature: "UX moderna 2026", toolram: t, competitor: f },
      { feature: "Mobile Lighthouse score", toolram: "95+", competitor: "<50" },
      { feature: "Modo oscuro", toolram: t, competitor: f },
      { feature: "Spanish nativo", toolram: t, competitor: "Traducción auto" },
      { feature: "Sin ads", toolram: t, competitor: f },
      { feature: "Plagiarism Checker", toolram: f, competitor: t },
      { feature: "Backlink Checker propio", toolram: f, competitor: t },
      { feature: "Symbols & fancy text", toolram: "300+ páginas", competitor: f },
      { feature: "PDF tools", toolram: "8 client-side", competitor: f },
      { feature: "Open source", toolram: t, competitor: f }
    ],
    otherAlternatives: [
      { name: "PrePostSEO", description: "Similar a SmallSEOTools, ligeramente más moderno. India-céntrico.", url: "https://www.prepostseo.com" },
      { name: "Search Engine Reports", description: "Mix de tools SEO. UX media.", url: "https://searchenginereports.net" },
      { name: "Sitechecker", description: "Profesional, pago.", url: "https://sitechecker.pro" },
      { name: "Ubersuggest", description: "Por Neil Patel. Plan free limitado pero útil.", url: "https://neilpatel.com/ubersuggest" }
    ],
    faqs: [
      { q: "¿SmallSEOTools sigue siendo útil en 2026?", a: "Para tools muy específicas como Plagiarism Checker o Article Spinner, sí — son de las opciones gratuitas más establecidas. Para tools generales (word counter, JSON formatter) hay opciones modernas mejores." },
      { q: "¿Toolram tiene Plagiarism Checker?", a: "Aún no. Es nuestra prioridad #1 en categoría SEO para Q3 2026. Mientras tanto, SmallSEOTools, Plagscan o Quetext free tier son opciones." },
      { q: "¿El Backlink Checker de SmallSEOTools es preciso?", a: "Limitado. Los datos vienen de su propio crawler y suelen estar desactualizados o incompletos comparado con Ahrefs/Majestic. Para análisis serio, Ahrefs Webmaster Tools (gratis) es más confiable." }
    ]
  },
  {
    slug: "alternativas-a-piliapp",
    competitor: "PiliApp",
    competitorUrl: "https://www.piliapp.com",
    shortDescription: "PiliApp es referencia en símbolos, fancy text, CPS test y stopwatch online. Estas son las alternativas modernas y en español.",
    intro: "PiliApp (~30-50M visitas/mes) es el referente en herramientas de Unicode, símbolos, generadores de texto decorado, CPS test y contadores. Su debilidad es que está principalmente en inglés y su UX/diseño no avanzó desde hace años. Para audiencia hispanohablante o que valora UX moderna, hay alternativas mejores.",
    whyLookForAlternatives: [
      "Principal idioma: inglés (limited Spanish)",
      "Diseño anticuado (cambió poco en 5+ años)",
      "Ads invasivos en algunas páginas",
      "Mobile UX subóptima",
      "Sin modo oscuro",
      "Categorización confusa entre tools"
    ],
    toolramAdvantages: [
      "Spanish-first nativo (vs PiliApp en inglés)",
      "Diseño moderno 2026 con dark mode",
      "200+ símbolos categorizados claramente",
      "25 fancy text styles con engine unificado",
      "CPS test con leaderboard local + record personal",
      "PDF + calculadoras + dev tools en mismo portal",
      "Open source"
    ],
    competitorAdvantages: [
      "Más cantidad de fancy text fonts (200+ vs 25)",
      "Más kaomoji y lenny faces variados",
      "CPS test con variantes (Kohi, Jitter, Butterfly clicks)",
      "Comunidad mucho más establecida (especialmente gaming)",
      "Mejor SEO en inglés (rankings consolidados)"
    ],
    comparisonRows: [
      { feature: "Idioma principal", toolram: "Español (en inglés Q3 2026)", competitor: "Inglés" },
      { feature: "Cantidad fancy text styles", toolram: "25", competitor: "200+" },
      { feature: "Diseño moderno 2026", toolram: t, competitor: f },
      { feature: "Modo oscuro", toolram: t, competitor: f },
      { feature: "CPS Test", toolram: t, competitor: t },
      { feature: "Variantes click (Kohi, Jitter)", toolram: "En roadmap", competitor: t },
      { feature: "Símbolos copiar-pegar", toolram: "200+", competitor: "1000+" },
      { feature: "Stopwatch online", toolram: t, competitor: t },
      { feature: "Open source", toolram: t, competitor: f }
    ],
    otherAlternatives: [
      { name: "FancyTextGuru", description: "Especializado en fancy text, 200+ estilos, solo inglés.", url: "https://fancytextguru.com" },
      { name: "Lingojam", description: "Conversor de fancy text, idioma inglés.", url: "https://lingojam.com" },
      { name: "Cool Symbols", description: "Biblioteca grande de símbolos.", url: "https://coolsymbol.com" },
      { name: "Cps-Check", description: "Foco solo en CPS test gaming.", url: "https://cps-check.com" }
    ],
    faqs: [
      { q: "¿PiliApp tiene Spanish version?", a: "Tiene algunas páginas traducidas pero no es nativo. Las descripciones, FAQ y SEO están optimizados para inglés. Toolram nació Spanish-first." },
      { q: "¿Cuál tiene más símbolos?", a: "PiliApp tiene biblioteca más grande (1000+ símbolos categorizados). Toolram tiene 200+ pero en español con casos de uso explicados." },
      { q: "¿Cuál es mejor para gamers Minecraft (CPS test)?", a: "PiliApp/Cps-Check tienen variantes Kohi, Jitter y Butterfly que Toolram no implementó aún. Para test estándar, Toolram es comparable." }
    ]
  },
  {
    slug: "alternativas-a-canva-pdf",
    competitor: "Canva PDF Editor",
    competitorUrl: "https://www.canva.com/edit-pdf",
    shortDescription: "Canva agregó editor de PDF en 2024. Estas son alternativas más enfocadas (Canva es bloated) y privacy-first.",
    intro: "Canva expandió en 2024 con su PDF editor, posicionándose contra Adobe y SmallPDF. Es buena opción si ya estás en el ecosistema Canva, pero está sobrecargada de features irrelevantes para edición simple, requiere cuenta y procesa todo en sus servers. Para tareas específicas de PDF, alternativas dedicadas son más eficientes.",
    whyLookForAlternatives: [
      "Requiere cuenta Canva obligatoria",
      "Funciones avanzadas (firma, formularios) son Pro ($120/año)",
      "Workflow de Canva no diseñado para PDFs profesionales",
      "Procesa archivos en sus servidores (privacy)",
      "Lentitud al abrir editor con PDFs grandes",
      "Para una sola tarea (firmar, dividir) es overkill"
    ],
    toolramAdvantages: [
      "Sin registro, sin cuenta",
      "Procesamiento client-side (privacy)",
      "Cada tool específica para tarea (no editor general)",
      "Más rápido sin overhead de Canva",
      "Gratis sin Pro tier",
      "Funciona offline una vez cargada la página"
    ],
    competitorAdvantages: [
      "Editor visual completo (mover elementos, agregar imágenes, editar texto)",
      "Plantillas pre-diseñadas",
      "Integración con resto del ecosistema Canva",
      "Colaboración multi-usuario",
      "Brand kit (logos, colores, fuentes guardadas)",
      "App móvil con full features"
    ],
    comparisonRows: [
      { feature: "Editor visual completo", toolram: f, competitor: t },
      { feature: "Sin registro", toolram: t, competitor: f },
      { feature: "Procesamiento local", toolram: t, competitor: f },
      { feature: "Plantillas pre-diseñadas", toolram: f, competitor: t },
      { feature: "Funciones específicas (unir/dividir)", toolram: t, competitor: "Limitado" },
      { feature: "Firmar PDF", toolram: "En roadmap", competitor: "Pro" },
      { feature: "Precio", toolram: "Gratis", competitor: "Free / $120 año Pro" }
    ],
    otherAlternatives: [
      { name: "iLovePDF", description: "25+ tools PDF dedicadas. Sube al server.", url: "https://www.ilovepdf.com" },
      { name: "Adobe Acrobat online", description: "El estándar enterprise. Free limitado. Pago $14/mes.", url: "https://www.adobe.com/acrobat/online/sign-pdf.html" },
      { name: "Sejda Desktop", description: "Versión offline de Sejda, una vez instalado no hay servers de por medio.", url: "https://www.sejda.com/desktop" },
      { name: "PDFescape", description: "Editor PDF web gratuito básico.", url: "https://www.pdfescape.com" }
    ],
    faqs: [
      { q: "¿Canva sirve para editar PDFs profesionales?", a: "Sí pero con limitaciones. Funciona bien para PDFs visuales (presentaciones, posters). Para documentos densos de texto (contratos, facturas), Acrobat o Sejda dan mejores resultados." },
      { q: "¿Cuál alternativa edita PDFs realmente como Word?", a: "Adobe Acrobat es el estándar. Sejda Desktop ofrece edición decente offline. Para tareas simples, Toolram cubre operaciones básicas (unir, dividir, watermark)." },
      { q: "¿Toolram puede editar el texto de un PDF?", a: "Aún no. Está en roadmap Q3-Q4 2026 vía pdf-lib + canvas overlays. Por ahora cubrimos operaciones estructurales (unir, dividir, rotar, marca de agua, números de página)." }
    ]
  }
];

ALTERNATIVES.push(
  {
    slug: "alternativas-a-tinywow",
    competitor: "TinyWow",
    competitorUrl: "https://tinywow.com",
    shortDescription: "TinyWow es popular por su catálogo amplio de tools (PDF, AI, video, imagen). Estas son 6 alternativas más privadas y sin tracking agresivo.",
    intro: "TinyWow (~30M visitas/mes) ofrece más de 200 herramientas en una sola plataforma con UX moderna. Su modelo: free + Pro $5.99/mes. El problema: todos los archivos pasan por sus servidores, el sitio carga muchos trackers (analytics + ads + remarketing), y la 'política de eliminación a 1 hora' no es verificable. Para usuarios que valoran privacy real, hay opciones más limpias.",
    whyLookForAlternatives: [
      "Todos los archivos suben a sus servidores (incluso tareas que podrían correr client-side)",
      "Plan free con límite: 5 tareas por hora",
      "Muchos trackers y ads en la página (página principal carga ~80 requests externos)",
      "Pro $5.99/mes con descuento agresivo si no upgradás",
      "Marca de agua en algunos formatos de imagen/video gratuitos",
      "Política de retención: 'eliminados a la hora' — sin auditoría externa"
    ],
    toolramAdvantages: [
      "Procesamiento local en navegador para PDF/imágenes (los archivos nunca salen)",
      "Sin límite de tareas por hora",
      "Sin trackers de terceros invasivos",
      "Sin marca de agua, sin Pro tier",
      "Open source MIT",
      "Spanish-first (vs traducción auto de TinyWow)"
    ],
    competitorAdvantages: [
      "Catálogo mucho más amplio (200+ tools vs 155 de Toolram)",
      "Tools de video (compress, convert, GIF maker)",
      "Tools de AI server-side (generación de imágenes, escritura)",
      "Conversión OCR potente server-side",
      "App móvil disponible"
    ],
    comparisonRows: [
      { feature: "Procesamiento local", toolram: t, competitor: f },
      { feature: "Sin marca de agua", toolram: t, competitor: "En algunos formatos" },
      { feature: "Sin límite de tareas/hora", toolram: t, competitor: "5/hora free" },
      { feature: "Trackers terceros", toolram: "Mínimos", competitor: "Muchos" },
      { feature: "Open source", toolram: t, competitor: f },
      { feature: "Tools video", toolram: f, competitor: t },
      { feature: "AI generativa server-side", toolram: f, competitor: t },
      { feature: "Precio", toolram: "Gratis", competitor: "Free / $5.99 mes" }
    ],
    otherAlternatives: [
      { name: "iLovePDF", description: "25+ tools PDF, marca conocida. Sube archivos al server.", url: "https://www.ilovepdf.com" },
      { name: "PDFCandy", description: "47+ tools PDF. Server-side. Plan free generoso.", url: "https://pdfcandy.com" },
      { name: "Online Convert", description: "Conversor multi-formato veterano. UX dated.", url: "https://www.online-convert.com" },
      { name: "Convertio", description: "Conversor multi-formato moderno. Pago.", url: "https://convertio.co" }
    ],
    faqs: [
      { q: "¿TinyWow realmente borra mis archivos a la hora?", a: "Su política lo dice pero no es verificable externamente. Los archivos pasan por sus servidores AWS y dependés de su buena fe. Para datos sensibles, una herramienta client-side como Toolram elimina el riesgo." },
      { q: "¿TinyWow tiene mejor calidad que Toolram para compresión de PDF?", a: "Para compresión muy agresiva sí (usa algoritmos server-side mejores). Para compresión estándar Toolram es comparable y procesa localmente." },
      { q: "¿Cuál tiene mejor herramienta de remover fondo de imagen?", a: "TinyWow usa modelos server-side más pesados. Toolram usa @imgly/background-removal client-side (modelo U²-Net, ~13MB cache primera vez). La calidad final es similar para imágenes estándar; TinyWow gana en imágenes complejas con pelo/transparencias finas." },
      { q: "¿Hay límite de tamaño de archivo en TinyWow?", a: "Free tier: ~50MB por archivo. Pro: 200MB. Toolram limita solo a la memoria de tu navegador (~100-200MB práctico)." }
    ]
  },
  {
    slug: "alternativas-a-pdf24",
    competitor: "PDF24 Tools",
    competitorUrl: "https://tools.pdf24.org",
    shortDescription: "PDF24 es la opción alemana 'free forever' con 30+ tools PDF. Estas son 5 alternativas — incluyendo las client-side privacy-first.",
    intro: "PDF24 (~80M visitas/mes globalmente) es uno de los servicios PDF más establecidos y permanece free unlimited sin marca de agua. Tiene apps Windows offline disponibles. Su debilidad: web tools pasan archivos por sus servidores alemanes, UI viejo (no actualizó desde 2020), y publicidad fuerte. Para procesamiento privado o experiencia más moderna, hay opciones mejores.",
    whyLookForAlternatives: [
      "Archivos suben a sus servidores aunque tareas podrían correr client-side",
      "UI/UX no actualizado desde 2020",
      "Ads cargan en múltiples slots de la página",
      "Plan free pero con ads invasivos como modelo de negocio",
      "Apps desktop solo Windows (no Mac/Linux)",
      "Idioma principal alemán/inglés, español parcial"
    ],
    toolramAdvantages: [
      "Procesamiento 100% en navegador",
      "UX y diseño 2026 modernos",
      "Sin ads en MVP",
      "Spanish-first nativo",
      "Funciona en cualquier sistema operativo (es web)",
      "Open source verificable"
    ],
    competitorAdvantages: [
      "Más tools PDF específicas (30+)",
      "Versión desktop Windows con todas las features offline",
      "Mejor SEO histórico (rankings consolidados en EU)",
      "Soporta archivos más grandes server-side (hasta 200MB free)",
      "Plugin para Outlook y otros email clients"
    ],
    comparisonRows: [
      { feature: "Procesamiento local", toolram: t, competitor: f },
      { feature: "UX moderna 2026", toolram: t, competitor: f },
      { feature: "Sin ads", toolram: t, competitor: f },
      { feature: "Spanish nativo", toolram: t, competitor: "Parcial" },
      { feature: "Open source", toolram: t, competitor: f },
      { feature: "App desktop Windows", toolram: f, competitor: t },
      { feature: "Cantidad tools PDF", toolram: "8", competitor: "30+" },
      { feature: "Plugin Outlook", toolram: f, competitor: t },
      { feature: "Precio", toolram: "Gratis", competitor: "Gratis (con ads)" }
    ],
    otherAlternatives: [
      { name: "iLovePDF", description: "25+ tools. Server-side. Marca de agua en algunas.", url: "https://www.ilovepdf.com" },
      { name: "SmallPDF", description: "UX premium pero solo 2 tareas/día free.", url: "https://smallpdf.com" },
      { name: "Sejda", description: "Modo desktop offline real. Web limita 3 tareas/hora.", url: "https://www.sejda.com" },
      { name: "PDFsam", description: "Open source desktop. Foco split/merge.", url: "https://pdfsam.org" }
    ],
    faqs: [
      { q: "¿PDF24 es realmente free para siempre?", a: "Sí, sin paywall ni Pro tier — su modelo es ads + apps Windows pago. Tools web siguen 100% gratuitas con ads como contraprestación." },
      { q: "¿PDF24 desktop es seguro y offline?", a: "Sí. La versión Windows funciona 100% offline. El web SÍ sube archivos a sus servidores." },
      { q: "¿Por qué elegir Toolram en lugar de PDF24 web?", a: "Tres razones: privacidad (archivos no salen de tu navegador), UX moderna (PDF24 sigue diseño 2018), y velocidad (sin uploads). Si necesitás 30+ tools específicas o features avanzadas, PDF24 cubre más casos de uso." }
    ]
  },
  {
    slug: "alternativas-a-freepik-tools",
    competitor: "Freepik Tools",
    competitorUrl: "https://www.freepik.com/pikaso",
    shortDescription: "Freepik lanzó Pikaso (AI image gen) y herramientas de fondo/upscale. Estas son alternativas más enfocadas y privacy-first.",
    intro: "Freepik (~150M visitas/mes) expandió su línea de tools con AI Image Generator, Background Remover, Image Upscaler, Reimagine y Pikaso (lienzo AI). Su modelo: free limitado + Premium $9.99/mes. Funciona bien pero todo es server-side y la mayoría de features útiles están gated. Para tareas específicas como quitar fondo o upscale, hay alternativas más privadas y sin freemium agresivo.",
    whyLookForAlternatives: [
      "Features útiles gated detrás de Premium $9.99/mes",
      "Cuenta obligatoria para usar AI tools",
      "Archivos procesados en servidores de Freepik",
      "Plan free limitado a 5-10 generaciones/día según tool",
      "AI tools entrenadas con stock de Freepik (sesgo estilístico hacia ese banco)",
      "Imágenes generadas con AI llevan marca de agua en free tier"
    ],
    toolramAdvantages: [
      "Quitar fondo client-side con @imgly/background-removal (modelo U²-Net)",
      "Sin cuenta requerida",
      "Sin marca de agua en outputs",
      "Sin límite de uso diario",
      "Open source",
      "Tools no relacionadas con AI (PDF, calculadoras, SEO) que Freepik no cubre"
    ],
    competitorAdvantages: [
      "AI image generation (text-to-image, Pikaso lienzo) — Toolram no tiene esto",
      "Upscale 4x con AI server-side (Toolram no tiene)",
      "Acceso al banco Freepik integrado",
      "Reimagine (variaciones de una imagen)",
      "Plantillas Pro de Mockups con AI",
      "Comunidad y tutoriales establecidos"
    ],
    comparisonRows: [
      { feature: "Sin cuenta requerida", toolram: t, competitor: f },
      { feature: "Procesamiento local", toolram: "Quitar fondo + más", competitor: f },
      { feature: "Sin marca de agua", toolram: t, competitor: "Solo Premium" },
      { feature: "Sin límite diario", toolram: t, competitor: "5-10/día" },
      { feature: "AI image generation", toolram: f, competitor: t },
      { feature: "AI upscale 4x", toolram: f, competitor: t },
      { feature: "Banco stock integrado", toolram: f, competitor: t },
      { feature: "Open source", toolram: t, competitor: f },
      { feature: "Precio", toolram: "Gratis", competitor: "Free limitado / $9.99 mes" }
    ],
    otherAlternatives: [
      { name: "remove.bg", description: "El estándar para quitar fondo. Free limitado, Pro pago.", url: "https://www.remove.bg" },
      { name: "Pixlr", description: "Editor + AI tools. Free con ads + Premium.", url: "https://pixlr.com" },
      { name: "Photopea", description: "Photoshop clone web gratis. Sin AI generativa.", url: "https://www.photopea.com" },
      { name: "Upscayl", description: "Upscaler open source desktop, gratis.", url: "https://upscayl.org" }
    ],
    faqs: [
      { q: "¿Toolram tiene AI image generation como Pikaso?", a: "Aún no. Generar imágenes con AI requiere modelos pesados que no corren bien en navegador. Para Q4 2026 evaluamos integrar API gratuita (FLUX, SDXL) sin guardar datos. Por ahora, Freepik/Bing Image Creator/Leonardo.ai cubren ese caso." },
      { q: "¿La herramienta de quitar fondo de Toolram es comparable a Freepik?", a: "Sí para casos estándar (productos, retratos, objetos). Freepik gana en casos complejos (pelo fino, sombras, transparencias) por usar modelos server-side más pesados. Toolram lo hace en tu navegador, gratis, sin cuenta." },
      { q: "¿Las imágenes generadas con Freepik tienen licencia para uso comercial?", a: "Solo en Premium. Plan free tiene marca de agua y licencia personal limitada. Revisá ToS antes de uso comercial." }
    ]
  },
  {
    slug: "alternativas-a-sejda",
    competitor: "Sejda",
    competitorUrl: "https://www.sejda.com",
    shortDescription: "Sejda destaca por su modo desktop offline real. Estas son 5 alternativas — incluidas opciones más rápidas o más privadas.",
    intro: "Sejda (~15M visitas/mes) es respetada en el espacio PDF por dos motivos: la versión Desktop es realmente offline (sin telemetría), y la versión web tiene tools de calidad. Su debilidad: la versión web limita a 3 tareas por hora antes de pedir pago, y el desktop es $5/mes (no compra única). Para tareas web casuales o usuarios buscando free sin restricciones, hay alternativas.",
    whyLookForAlternatives: [
      "Web limita a 3 tareas por hora (luego pide pago)",
      "Plan web Pro: $5/mes",
      "Desktop $5/mes recurring (no compra única)",
      "Free tier suficiente para tareas ocasionales pero frustrante para uso frecuente",
      "Procesamiento web server-side",
      "UX no es la más moderna"
    ],
    toolramAdvantages: [
      "Sin límite de tareas",
      "100% gratis, sin Pro tier",
      "Procesamiento client-side (privacy real, no solo offline binary)",
      "UX moderna 2026",
      "Open source MIT auditable",
      "No requiere instalación de app desktop"
    ],
    competitorAdvantages: [
      "Versión Desktop offline real con audit trail (sin telemetría)",
      "Tools de calidad profesional (PDF a Word con formato preservado)",
      "OCR potente integrado",
      "Edición visual de PDFs (mover elementos, text)",
      "Maneja archivos grandes mejor (hasta 200MB)",
      "Más cantidad de tools PDF (30+)"
    ],
    comparisonRows: [
      { feature: "Sin límite tareas/hora", toolram: t, competitor: "3/hora free" },
      { feature: "Procesamiento local", toolram: t, competitor: "Desktop sí, web no" },
      { feature: "UX moderna", toolram: t, competitor: f },
      { feature: "Open source", toolram: t, competitor: f },
      { feature: "Spanish nativo", toolram: t, competitor: "Parcial" },
      { feature: "Edición visual PDF", toolram: f, competitor: t },
      { feature: "PDF a Word con formato", toolram: "Beta", competitor: t },
      { feature: "OCR profesional", toolram: "Beta", competitor: t },
      { feature: "Precio", toolram: "Gratis", competitor: "Free limitado / $5 mes" }
    ],
    otherAlternatives: [
      { name: "iLovePDF", description: "25+ tools. Server-side. Más marca conocida.", url: "https://www.ilovepdf.com" },
      { name: "PDF24", description: "Free unlimited con ads. Apps Windows offline.", url: "https://tools.pdf24.org" },
      { name: "PDFsam", description: "Open source desktop, foco split/merge.", url: "https://pdfsam.org" },
      { name: "Adobe Acrobat online", description: "Estándar enterprise. Free limitado.", url: "https://www.adobe.com/acrobat/online.html" }
    ],
    faqs: [
      { q: "¿Sejda Desktop es realmente offline y sin telemetría?", a: "Sí. Es uno de los pocos editores PDF con audit trail que confirma cero conexiones externas durante uso normal. Buena opción si necesitás procesar PDFs sensibles offline." },
      { q: "¿Toolram puede reemplazar Sejda para tareas profesionales?", a: "Para operaciones básicas (unir/dividir/comprimir/rotar) sí. Para tareas avanzadas (edición visual, OCR profesional, PDF a Word complejo) Sejda Desktop sigue siendo superior." },
      { q: "¿Cuál tiene mejor compresión de PDF?", a: "Sejda Desktop con compresión 'agresiva' suele bajar PDFs 60-80%. Toolram comprime con pdf-lib más conservadoramente (40-60%). Para máxima compresión, Adobe Acrobat o Sejda Desktop." }
    ]
  },
  {
    slug: "alternativas-a-adobe-acrobat-online",
    competitor: "Adobe Acrobat online",
    competitorUrl: "https://www.adobe.com/acrobat/online.html",
    shortDescription: "Adobe Acrobat es el estándar PDF enterprise. Estas son 6 alternativas — gratuitas, sin Adobe ID, y sin upload obligatorio.",
    intro: "Adobe Acrobat online (~80M visitas/mes) es el estándar de facto en empresas para PDF: la calidad de conversión, edición y OCR no tiene rival. Pero requiere Adobe ID, todo se procesa en sus servidores, el plan free es muy limitado, y el plan completo cuesta $14.99/mes. Para usuarios sin presupuesto enterprise o que valoran privacidad, hay alternativas razonables.",
    whyLookForAlternatives: [
      "Requiere Adobe ID obligatorio para casi todas las tools",
      "Plan free: 2-3 tareas antes de pedir upgrade",
      "Plan completo: $14.99/mes (Acrobat Standard) o $19.99/mes (Pro)",
      "Todos los archivos pasan por servidores Adobe (Creative Cloud)",
      "Workflow lento (cargar Adobe Cloud + procesar + descargar)",
      "Trial 7 días con captura de tarjeta",
      "Marketing intenso hacia upgrade en cada acción"
    ],
    toolramAdvantages: [
      "Sin Adobe ID, sin cuenta de ningún tipo",
      "Procesamiento local en navegador",
      "Sin límite de tareas",
      "Gratis sin Pro tier",
      "Sin tracking ni remarketing de Adobe",
      "Open source"
    ],
    competitorAdvantages: [
      "El estándar enterprise (PDF/A, PDF/X, formularios complejos, firmas certificadas)",
      "OCR de calidad incomparable",
      "PDF a Word/Excel/PowerPoint con preservación perfecta del layout",
      "Firmas digitales con valor legal AES",
      "Integración con Acrobat Reader desktop",
      "Comparación de versiones de PDF",
      "Compliance regulatorio (GDPR, HIPAA con BAA)"
    ],
    comparisonRows: [
      { feature: "Sin cuenta requerida", toolram: t, competitor: f },
      { feature: "Procesamiento local", toolram: t, competitor: f },
      { feature: "Sin límite tareas", toolram: t, competitor: "2-3 free" },
      { feature: "OCR profesional", toolram: "Beta", competitor: t },
      { feature: "Firma digital legal", toolram: f, competitor: t },
      { feature: "PDF a Word perfecto", toolram: "Estándar", competitor: t },
      { feature: "Compliance HIPAA/GDPR", toolram: "Privacy-first (local)", competitor: "BAA pago" },
      { feature: "Precio", toolram: "Gratis", competitor: "$14.99-$19.99 mes" }
    ],
    otherAlternatives: [
      { name: "Foxit PDF online", description: "Alternativa enterprise a Adobe. Pago.", url: "https://www.foxit.com/pdf-editor/" },
      { name: "iLovePDF", description: "25+ tools, marca conocida, free generoso.", url: "https://www.ilovepdf.com" },
      { name: "SmallPDF", description: "UX premium, 2 tareas/día free.", url: "https://smallpdf.com" },
      { name: "Sejda Desktop", description: "Edición y OCR decente, offline.", url: "https://www.sejda.com" },
      { name: "PDFescape", description: "Editor web básico gratuito.", url: "https://www.pdfescape.com" }
    ],
    faqs: [
      { q: "¿Toolram puede reemplazar Adobe Acrobat para mi empresa?", a: "Depende del caso. Para tareas básicas (unir, dividir, comprimir, marca de agua) Toolram funciona. Para firmas digitales con valor legal, formularios complejos, OCR avanzado, conversión a Word con layout perfecto o compliance regulatorio formal, Adobe sigue siendo necesario." },
      { q: "¿Adobe Acrobat es seguro para documentos médicos o legales?", a: "Sí con BAA (Business Associate Agreement) en plan enterprise. Plan free/personal: los archivos pasan por Adobe Creative Cloud (US/EU servers según región). Para zero-trust, herramientas client-side como Toolram eliminan el server del workflow." },
      { q: "¿Hay alguna alternativa gratuita con OCR comparable a Adobe?", a: "OCR profesional de Adobe usa modelos AI propios entrenados con millones de docs — difícil de igualar. Tesseract (open source) que usa Toolram en beta da resultados decentes para texto simple. Para documentos complejos escaneados, Adobe sigue ganando." },
      { q: "¿Puedo crear formularios PDF rellenables sin Adobe?", a: "Toolram no lo soporta todavía. PDFescape, Sejda, o iLovePDF tienen creación de formularios básica. Para formularios avanzados con cálculos y validaciones, Adobe Acrobat Pro sigue siendo el estándar." }
    ]
  }
);

export const ALTERNATIVES_BY_SLUG = Object.fromEntries(ALTERNATIVES.map((a) => [a.slug, a]));
