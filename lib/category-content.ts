import type { ToolCategory } from "@/lib/tools-registry";

type CategoryContent = {
  longDescription: string;
  faqs: { q: string; a: string }[];
};

export const CATEGORY_CONTENT: Record<ToolCategory, CategoryContent> = {
  text: {
    longDescription:
      "Las herramientas de texto de Toolram cubren las tareas más frecuentes del día a día: contar palabras, caracteres y tiempo de lectura, transformar mayúsculas y minúsculas, generar Lorem Ipsum, invertir o desordenar texto, contar frecuencia de palabras y limpiar espacios. Todas funcionan 100% en tu navegador — pegás el texto y obtenés el resultado al instante, sin que nada se envíe a un servidor. Ideales para escritores, editores, estudiantes universitarios que respetan límites de palabras, social media managers ajustando posts a 280 caracteres, y desarrolladores generando datos de prueba.",
    faqs: [
      { q: "¿Las herramientas de texto envían mi contenido a algún servidor?", a: "No. Todas las herramientas de texto de Toolram funcionan localmente en tu navegador con JavaScript puro. Tu texto nunca sale de tu dispositivo." },
      { q: "¿Hay límite de longitud para procesar texto?", a: "No imponemos límite. El único tope es la memoria de tu navegador (típicamente puedes procesar varios MB de texto sin problema)." },
      { q: "¿Funcionan offline?", a: "Una vez cargada la página, sí. Como no dependen de servidor, las herramientas siguen funcionando incluso sin conexión." },
      { q: "¿Cuál es la mejor herramienta para contar palabras de un ensayo?", a: "Usá nuestro Contador de palabras — muestra palabras, caracteres con/sin espacios, párrafos y tiempo estimado de lectura. Ideal para ensayos académicos con límite de palabras." }
    ]
  },
  seo: {
    longDescription:
      "Las herramientas de SEO de Toolram te permiten auditar y optimizar tu sitio sin enviar tus URLs a servicios de tracking. Generador de meta tags, robots.txt, sitemap y schema FAQ; análisis de densidad de keywords; previsualizador de SERP de Google; generador de keywords por intención (comercial, informacional, comparativa); test de velocidad web (Edge API); creador de backlinks que envía tu URL a 40+ servicios públicos indexables (Wayback, GTmetrix, BuiltWith, schema validators, SSL Labs); y generador de anchor text con 21 variaciones. Todas client-side o vía API neutral — no almacenamos tus URLs ni vendemos data a competidores.",
    faqs: [
      { q: "¿Las herramientas de SEO envían mi URL a herramientas de tracking?", a: "No. Toolram no almacena tus URLs ni las pasa a Ahrefs, SEMrush u otros. El análisis es client-side cuando es posible y, cuando hay backend, no guarda logs de las URLs analizadas." },
      { q: "¿Sirven para SEO local de Google Business?", a: "Sí. El generador de schema soporta LocalBusiness y FAQPage, las dos piezas más importantes para que Google muestre tu negocio en el map pack y AI Overviews." },
      { q: "¿Puedo generar un sitemap.xml para mi WordPress?", a: "Sí, nuestro generador acepta lista de URLs y devuelve XML válido. Para sitios grandes (>500 URLs) recomendamos usar el plugin de Rank Math o Yoast directamente." },
      { q: "¿El creador de backlinks da backlinks reales?", a: "Genera URLs de reportes públicos en servicios SEO/análisis (Wayback, archive.today, etc.). Son backlinks de baja autoridad pero indexables — útiles para acelerar discovery, no para mover ranking competitivo." }
    ]
  },
  pdf: {
    longDescription:
      "Las herramientas de PDF de Toolram cubren todo el flujo profesional sin subir archivos a servidores: firmar PDF (canvas + pdf-lib), unir/dividir/comprimir, convertir PDF a JPG con pdf.js, editar y reordenar páginas, añadir marca de agua y proteger con contraseña. Todo se procesa en tu navegador con WebAssembly — los archivos jamás salen de tu dispositivo. Es la diferencia con iLovePDF y Smallpdf, que sí suben tus archivos a sus servidores. Ideal para abogados firmando contratos confidenciales, RRHH manejando expedientes, y cualquier profesional que maneje documentos sensibles.",
    faqs: [
      { q: "¿Mis PDFs se suben a algún servidor?", a: "No. Toolram procesa los PDFs 100% en tu navegador con WebAssembly y pdf-lib. Es la diferencia clave con iLovePDF y Smallpdf, que sí suben los archivos." },
      { q: "¿Hay límite de tamaño de archivo?", a: "El límite real es la memoria de tu navegador. PDFs hasta 100MB suelen funcionar bien en escritorio; en móvil recomendamos hasta 30MB." },
      { q: "¿Puedo firmar un PDF legalmente con Toolram?", a: "Sí, generamos firma manuscrita o tipográfica embebida en el PDF (pdf-lib). Para firma con validez legal certificada, además añadí firma electrónica avanzada con SAT (México) o FNMT (España) — eso requiere certificado digital de un PSC." },
      { q: "¿Funciona en móvil?", a: "Sí. Las herramientas PDF están optimizadas para iPhone y Android — incluida la firma con dedo en pantalla táctil." }
    ]
  },
  image: {
    longDescription:
      "Toolram ofrece edición y conversión de imágenes en el navegador con Canvas API y la potencia de modelos de IA cuando se necesita: convertir y comprimir, redimensionar, rotar, aplicar filtros (10 presets B&N/sepia/vintage/polaroid/drama), añadir marca de agua, recortar, OCR con Tesseract.js para extraer texto, y quitar fondo de imagen con un modelo U²-Net que corre 100% en tu navegador (sin enviar la imagen a Remove.bg). Los archivos nunca salen de tu dispositivo — privacy-first real, no marketing.",
    faqs: [
      { q: "¿Las imágenes se suben a un servidor?", a: "No. Toolram procesa todas las imágenes localmente con Canvas API. La excepción serían herramientas con backend explícito que avisamos en la descripción." },
      { q: "¿El removedor de fondo es como Remove.bg?", a: "Sí en calidad — usamos el modelo U²-Net (mismo paper) cargado en tu navegador con WebAssembly. Pero a diferencia de Remove.bg, tu imagen nunca se sube a ningún servidor." },
      { q: "¿Hay marca de agua en el resultado?", a: "Nunca. Toolram es 100% gratis sin watermark — esa es nuestra diferencia con TinyPNG y otros." },
      { q: "¿Puedo procesar varias imágenes a la vez?", a: "La mayoría de herramientas soporta drag & drop múltiple y procesamiento en lote." }
    ]
  },
  developer: {
    longDescription:
      "Herramientas de desarrollador para tareas frecuentes: formatear y validar JSON, YAML, HTML, CSS, JavaScript; codificar/decodificar Base64, JWT, URLs; calcular hashes MD5/SHA-1/SHA-256; comparar textos (diff); generar UUIDs y mock data realistas LATAM; convertir entre JSON↔CSV; generar tablas Markdown; verificar regex; validar emails con MX lookup. Todo client-side — tu código y datos nunca abandonan tu navegador. Útil para developers, DBAs, devops y QA que trabajan con datos sensibles y no quieren depender de utilidades online que loguean queries.",
    faqs: [
      { q: "¿Mi código fuente / JSON se envía a Toolram?", a: "No. Las herramientas dev procesan localmente. Tu código nunca sale del navegador — útil cuando trabajas con datos confidenciales o IP sensible." },
      { q: "¿El validador JWT verifica la firma?", a: "Decodifica y muestra header/payload con sintaxis resaltada. Para verificar firma necesitas la clave pública/secreta — la herramienta avisa si la firma es válida si la pegás." },
      { q: "¿Funciona el JSON formatter con archivos grandes?", a: "Sí, hasta varios MB. Para JSON > 50MB recomendamos jq por línea de comandos." },
      { q: "¿Generan UUID v4 criptográficamente seguro?", a: "Sí — usamos crypto.randomUUID() del Web Crypto API, criptográficamente seguro y compatible con RFC 4122." }
    ]
  },
  converter: {
    longDescription:
      "Conversores entre formatos, unidades y representaciones: divisas con tipo de cambio, zonas horarias para 19 ciudades clave, números romanos, binario/octal/decimal/hexadecimal/ASCII, Markdown↔HTML con preview en vivo, JSON↔CSV bidireccional, texto↔binario UTF-8, RGB↔HEX↔CMYK↔HSL para diseñadores web e impresión. Conversión instantánea en el navegador, sin lag y sin enviar tus datos a APIs externas (excepto el conversor de divisas, que consulta tipo de cambio en tiempo real desde un proveedor público).",
    faqs: [
      { q: "¿De dónde sale el tipo de cambio del conversor de divisas?", a: "De ExchangeRate-API.io, una fuente pública gratuita con datos del Banco Central Europeo. Se actualiza una vez al día." },
      { q: "¿El conversor RGB a CMYK sirve para imprenta profesional?", a: "Sí, usa la fórmula estándar. Pero recordá: para impresión offset crítica (catálogos, packaging) tu imprenta debe darte el ICC profile específico — la conversión matemática es solo aproximada." },
      { q: "¿El conversor de zonas horarias respeta el horario de verano?", a: "Sí, usa la API Intl.DateTimeFormat del navegador, que aplica DST automáticamente según la base de datos IANA tz." },
      { q: "¿Funciona offline?", a: "Todos excepto el de divisas (que consulta tipo de cambio actual). Los demás están 100% en JavaScript local." }
    ]
  },
  generator: {
    longDescription:
      "Generadores rápidos para tareas que requieren aleatoriedad o construcción de elementos: contraseñas seguras hasta 64 caracteres con Web Crypto API, UUIDs v4, códigos QR (URL, vCard, WiFi, texto), códigos de barras EAN-13/Code-128, hashtags, nombres LATAM realistas, usernames con 8 estilos (incluyendo 1337), logos de texto con 6 estilos canvas, paletas de colores armónicas (mono/análoga/complementaria/triádica), hashes MD5/SHA, robots.txt, sitemap.xml, .htaccess, schema FAQ, anchor text variations, citas APA/MLA/Chicago/Harvard, taglines, captions IG/TikTok/LinkedIn/X, descripciones de producto, asuntos de email, nombres de empresa, biografías de Instagram, firmas de email, tags YouTube, datos de prueba (mock data), MAC addresses, ASCII art, y más. Todos generan resultado al instante, copiable con un click.",
    faqs: [
      { q: "¿El generador de contraseñas crea contraseñas realmente seguras?", a: "Sí. Usamos crypto.getRandomValues() del Web Crypto API — criptográficamente segura, no Math.random. Una contraseña de 16 caracteres con símbolos requiere miles de años para crackear por fuerza bruta." },
      { q: "¿Las contraseñas o UUIDs generados se guardan en algún lado?", a: "No. La generación es local en tu navegador — Toolram no ve los valores que generás." },
      { q: "¿El generador QR para WiFi es seguro?", a: "Sí. La contraseña se queda en el QR localmente — no se envía a un servidor. Tus invitados escanean y se conectan sin tipear el password." },
      { q: "¿Puedo usar los hashtags / captions generados libremente?", a: "Sí, son sugerencias formateadas — no hay copyright. Adaptalas a tu marca y publicá." }
    ]
  },
  calculator: {
    longDescription:
      "Calculadoras especializadas para situaciones del día a día: IMC con clasificación (Mifflin-St Jeor BMR), porcentaje, préstamo francés con tabla de amortización, IVA para 8 países (México 16%, Argentina 21%, España 21%, Chile 19%, etc.), propina con división, descuento compuesto, científica con trigonometría/logaritmos/factorial, edad cronológica con días vividos, embarazo (FUM + ecografía + Naegele), ovulación (ventana fértil), horas trabajadas con horas extra, sueldo neto con IMSS/ISR/AFP, edad de mascota equivalente humana, calorías diarias (Mifflin-St Jeor + Harris-Benedict), días entre fechas con modo laborables, aspect ratio para diseño, y más. Todas con fórmulas verificadas y resultados copiables.",
    faqs: [
      { q: "¿Las calculadoras son precisas para uso profesional?", a: "Usamos las fórmulas estándar de cada disciplina con precisión IEEE 754 de 64 bits. Para decisiones legales/financieras críticas, validá siempre con un profesional." },
      { q: "¿Los datos que ingreso (peso, sueldo, etc.) se guardan?", a: "No. Toolram nunca guarda los valores ingresados. El cálculo es 100% en tu navegador." },
      { q: "¿La calculadora de IVA cubre mi país?", a: "Soportamos México (16%), España (21%), Argentina (21%), Chile (19%), Colombia (19%), Perú (18%), Uruguay (22%), Costa Rica (13%). Si no aparece tu país, usá la calculadora de porcentaje genérica." },
      { q: "¿Funcionan en móvil?", a: "Sí, todas usan input numérico con teclado nativo móvil." }
    ]
  },
  symbols: {
    longDescription:
      "Galería de 200+ símbolos por categoría listos para copiar y pegar: corazones (♥ ❤ 💕), estrellas (★ ☆ ✨), flechas (→ ↑ ⇒), música (♪ ♫), tarot, monedas, formas geométricas, tildes y acentos, signos matemáticos, emojis. Compatibles con WhatsApp, Instagram, TikTok, Discord, Notion, Word, Google Docs, Twitter/X. Click en cualquier símbolo y se copia automáticamente a tu portapapeles — sin instalar fuentes, sin paquetes Unicode, sin Alt+códigos imposibles de recordar.",
    faqs: [
      { q: "¿Los símbolos funcionan en cualquier red social?", a: "Sí — son caracteres Unicode estándar, compatibles con WhatsApp, Instagram, TikTok, Discord, Twitter/X, Facebook, LinkedIn, Telegram. Funcionan también en email, Word, Google Docs, Notion." },
      { q: "¿Funcionan en iPhone y Android?", a: "Sí. Si tu teclado/sistema soporta Unicode (todos los iOS y Android modernos), los símbolos se ven correctamente." },
      { q: "¿Por qué algunos símbolos se ven como cuadrados □?", a: "Eso pasa cuando el dispositivo destinatario no tiene la fuente Unicode que cubre ese rango. Es raro hoy — afecta solo a símbolos muy nuevos en sistemas viejos." },
      { q: "¿Hay símbolos prohibidos o que infrinjan copyright?", a: "No, todos los símbolos son del estándar Unicode (libre uso). Los emojis varían por plataforma — el diseño cambia entre iOS, Android y Windows pero el carácter es el mismo." }
    ]
  },
  "fancy-text": {
    longDescription:
      "Convertidor de texto normal a 25 estilos Unicode: negrita matemática, cursiva, gótico, manuscrita, serif, monospace, círculos, cuadrados, doble línea, pequeño, invertido, ancho, burbuja, decorativo. Pegá tu texto y elegí estilo — el resultado es Unicode estándar, no fuentes — así funciona en bios de Instagram, TikTok, Discord, WhatsApp, biografías de YouTube, perfiles de Twitter/X. No requiere instalar fuente ni añadir HTML/CSS. Copia con un click. Ideal para destacar tu nombre/bio, crear posts virales o hacer marca personal.",
    faqs: [
      { q: "¿Funciona en biografía de Instagram, TikTok, Discord?", a: "Sí — el texto decorado es Unicode estándar, soportado en todas las apps de redes sociales. Pegás y aparece estilizado." },
      { q: "¿Por qué algunos estilos se ven como cuadrados en mi celular viejo?", a: "Esos estilos usan rangos Unicode que requieren fuentes modernas. Si tu sistema es viejo (iOS < 12, Android < 8), algunos no rendericen — el truco es usar estilos clásicos: bold, italic, monospace." },
      { q: "¿El SEO de mi bio se ve afectado por usar texto decorado?", a: "Cuidado: Google y los buscadores leen el Unicode literal. Si escribís tu nombre en gótico (𝔍𝔬𝔰é), Google no lo asociará a 'José' en búsqueda. Usá texto decorado solo para estética visible, no para keywords." },
      { q: "¿Funciona en LinkedIn?", a: "Parcialmente. LinkedIn permite Unicode pero modera estilos extremos. Bold, italic y serif suelen funcionar; gótico y decorativo a veces son rechazados por el filtro de spam." }
    ]
  },
  test: {
    longDescription:
      "Tests online para medir tu rendimiento: CPS test (clicks por segundo) con records, tiempo de reacción visual, velocidad de tipeo (WPM en español/inglés), cronómetro y temporizador, test de daltonismo Ishihara. Mediciones precisas con performance.now() del navegador (precisión sub-milisegundo). Sin login para que cualquiera pueda probar — perfecto para gamers buscando mejorar APM, escritores midiendo tipeo, profes haciendo dinámicas en clase.",
    faqs: [
      { q: "¿El CPS test es preciso para gamers?", a: "Sí, usamos performance.now() con precisión de microsegundos. Está alineado con los métodos de medición de servidores Hypixel/Mineplex y otros benchmarks gaming." },
      { q: "¿El test de tipeo cuenta errores?", a: "Sí, contamos palabras correctas, errores y precisión total. El score WPM solo cuenta palabras escritas correctamente." },
      { q: "¿Puedo usar el cronómetro para entrenamiento HIIT?", a: "Sí, soporta intervalos personalizados con sonido de aviso al final de cada round. Funciona también offline una vez cargado." },
      { q: "¿Mis records se guardan en algún ranking?", a: "Solo en tu navegador (localStorage) — no hay leaderboard global. Mantenemos privacidad: tu performance no se reporta." }
    ]
  },
  random: {
    longDescription:
      "Generadores aleatorios para tomar decisiones imparciales: ruleta personalizable, número aleatorio entre rango, lanzamiento de dados (D4, D6, D8, D10, D12, D20 D&D), sí o no, cara o cruz, elección de equipos. Todos usan crypto.getRandomValues() para aleatoriedad criptográfica — no Math.random — así que no hay sesgo y nadie puede predecir el resultado. Ideales para sorteos en redes, juegos de mesa, tomar decisiones grupales, dinámicas en clase y partidas de rol.",
    faqs: [
      { q: "¿La ruleta es realmente aleatoria?", a: "Sí, usamos crypto.getRandomValues() del Web Crypto API — fuente criptográficamente segura. No es predecible y no tiene sesgo. Es la misma calidad de aleatoriedad que usan certificados HTTPS." },
      { q: "¿Sirve para sorteos en Instagram?", a: "Sí. Pegá la lista de participantes en la ruleta o el generador de número aleatorio y obtené el ganador. Para validez legal en sorteos grandes consultá las regulaciones locales." },
      { q: "¿Los dados D20 son justos para D&D?", a: "Sí — distribución uniforme garantizada por crypto.getRandomValues(). Validado contra estándares de fairness para juegos de rol." },
      { q: "¿Funciona offline?", a: "Sí, una vez cargada la página los aleatorios funcionan sin conexión." }
    ]
  },
  ai: {
    longDescription:
      "Herramientas de IA para tareas que tradicionalmente requieren ChatGPT Plus o suscripción: prompt builder con templates probados, contador de tokens (GPT-3.5/4/4-turbo) para optimizar costo, generador de títulos SEO con scoring, plantillas de prompts por categoría, texto-a-voz con Web Speech API (sin enviar tu texto a OpenAI), voz-a-texto con SpeechRecognition en 12 idiomas, OCR de imagen con Tesseract.js que corre en tu navegador. Privacy-first: las herramientas que dicen 'Web Speech' o 'Tesseract.js' procesan en tu dispositivo — tu input no se envía a OpenAI, Google ni a nuestros servidores.",
    faqs: [
      { q: "¿Las herramientas de IA mandan mi texto a ChatGPT?", a: "No por defecto. Las herramientas marcadas como 'Web Speech API' o 'Tesseract.js' procesan en tu navegador. Las que llaman a APIs externas lo avisamos en la descripción de la herramienta." },
      { q: "¿El contador de tokens es preciso?", a: "Usamos la lib tiktoken (la oficial de OpenAI) compilada a WebAssembly. Precisión 100% para GPT-3.5, GPT-4, GPT-4-turbo y embeddings." },
      { q: "¿El OCR de imagen funciona con español?", a: "Sí, Tesseract.js carga el modelo español (spa.traineddata) automáticamente. También inglés, portugués, francés y otros 100+ idiomas." },
      { q: "¿La voz-a-texto guarda audio?", a: "No. Usamos SpeechRecognition del navegador — Chrome puede pasar el audio a Google para reconocimiento (Chrome Cloud Speech), pero ni Toolram lo ve ni lo guarda." }
    ]
  },
  finance: {
    longDescription:
      "Calculadoras financieras para planificar tu dinero: interés compuesto con aportes mensuales y tabla año por año (regla del 72), conversor salario hora ↔ anual considerando 10-60h/semana, sueldo neto descontando IMSS/ISR/AFP por país, préstamo francés con tabla de amortización completa, calculadora de IVA para LATAM y España, descuentos en cascada. Todas las fórmulas son las estándar de finanzas — útiles para planificar inversiones, comparar ofertas laborales, evaluar préstamos, freelancers calculando tarifa por hora desde sueldo objetivo, y emprendedores proyectando ingresos.",
    faqs: [
      { q: "¿La calculadora de interés compuesto considera inflación?", a: "No por defecto — calculamos rendimiento nominal. Para rendimiento real (descontando inflación), restá la tasa de inflación esperada de la tasa de interés antes de calcular." },
      { q: "¿El sueldo neto cubre mi país?", a: "Soportamos México (IMSS + ISR), Argentina (jubilación + ganancias), España (IRPF + SS), Chile (AFP + isapre), Colombia, Perú. Para otros países, usá la calculadora de porcentaje con los descuentos manuales." },
      { q: "¿Los datos financieros que ingreso quedan registrados?", a: "No. Cero tracking de los valores. El cálculo es local — Toolram no ve tu sueldo, capital ni inversiones." },
      { q: "¿Puedo usar las calculadoras para asesorar clientes?", a: "Sí, son fórmulas estándar industriales. Para informes formales y declaraciones fiscales, complementá con software contable certificado." }
    ]
  },
  design: {
    longDescription:
      "Herramientas para diseñadores web y UI: generador visual de Flexbox y CSS Grid con preview en vivo, editor de cubic-bezier para animaciones con curva SVG, generador de clip-path con 12 formas pre-hechas, calculadora de aspect ratio para imagen/video, verificador de contraste WCAG 2.1 (AA y AAA) crucial para accesibilidad legal, conversor RGB↔HEX↔CMYK↔HSL para web e imprenta, generador de gradientes, paleta de colores armónica, box-shadow multi-capa, generador de favicon multi-tamaño 16-512px. Todas con preview en vivo y código copiable — el flujo del diseñador moderno sin instalar Figma para tareas rápidas.",
    faqs: [
      { q: "¿El verificador de contraste WCAG es certificado?", a: "Calcula el ratio según fórmula WCAG 2.1 oficial (W3C). El score AA/AAA es el estándar para auditorías de accesibilidad gubernamentales y empresariales." },
      { q: "¿El RGB a CMYK funciona para imprenta offset?", a: "Da una conversión matemática estándar. Para impresión profesional crítica, tu imprenta debe darte el ICC profile específico — la conversión exacta depende de la prensa y el papel." },
      { q: "¿Puedo exportar el favicon en todos los tamaños a la vez?", a: "Sí, generamos un ZIP con 16x16, 32x32, 48x48, 192x192, 512x512 y manifest.json para PWA." },
      { q: "¿Los generadores CSS son responsivos?", a: "El código generado funciona en cualquier breakpoint. Editás los valores y previsualizás — el output es CSS estándar moderno." }
    ]
  },
  marketing: {
    longDescription:
      "Suite de calculadoras y generadores para campañas: ROI / CTR / CPC / CPM / ROAS / conversion rate (6 métricas en 1 tool con benchmarks por industria), generador de UTMs con preview, tester de subject lines de email con detección de palabras spam, generador de captions para Instagram/TikTok/LinkedIn/X, generador de descripción de producto con power words, hashtags trending por nicho, taglines, nombres de empresa, generador de keywords SEO por intent (40+ variaciones por raíz), tags YouTube, slugs SEO, anchor text con 21 variaciones, bio Instagram, firma email. Todo en un solo lugar — para PMs, growth hackers, social media managers y dueños de e-commerce.",
    faqs: [
      { q: "¿Las calculadoras de marketing tienen benchmarks por industria?", a: "Sí. CTR esperado por industria (e-commerce 2.7%, B2B 1.4%, finanzas 0.5%), CPC promedio, conversion rate sano. Te dice si tu campaña está sana o necesita ajustes." },
      { q: "¿El tester de subject lines detecta spam de Mailchimp/Brevo?", a: "Detecta palabras spam clásicas (gratis, ¡!!, 100%, $$$, urgente). Es un primer filtro — los algoritmos reales de Gmail son más complejos. Mandá un test a tu propia cuenta antes de campañas grandes." },
      { q: "¿Los captions y hashtags son originales o copiados?", a: "Son sugerencias generadas algorítmicamente con plantillas + listas de hashtags trending. Adaptalos a tu marca — no copiar literal en serie por riesgo de shadowban." },
      { q: "¿Funciona el generador de UTMs con GA4?", a: "Sí, los parámetros utm_source, utm_medium, utm_campaign, utm_content y utm_term son los estándar reconocidos por GA4 y todas las plataformas de analytics." }
    ]
  },
  network: {
    longDescription:
      "Herramientas de redes para administradores y devops: calculadora de subred CIDR (network, broadcast, máscara, hosts utilizables, wildcard) para IPv4 prefix /1 a /32, generador de direcciones MAC aleatorias con vendor prefix opcional (Google, VMware, VirtualBox, Xen, QEMU/KVM), DNS lookup (A, AAAA, MX, TXT, NS, CNAME), WHOIS de dominio, headers checker (CSP, HSTS, X-Frame-Options), tu IP pública con geo. Útiles para certificaciones Cisco/CompTIA, configuración de VMs, debugging de redes, auditoría de seguridad.",
    faqs: [
      { q: "¿Las consultas DNS y WHOIS guardan mi IP?", a: "Las consultas DNS pasan por DNS over HTTPS (DoH) de Cloudflare/Google. WHOIS pasa por API pública. Toolram no logea las IPs consultadas." },
      { q: "¿La calculadora de subred soporta IPv6?", a: "Por ahora solo IPv4. IPv6 (con prefix /64 default) está en roadmap." },
      { q: "¿El headers checker detecta CSP misconfigured?", a: "Sí — analiza CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. Da score de seguridad similar a securityheaders.com." },
      { q: "¿Sirve para certificaciones Cisco/CompTIA?", a: "Sí, la calculadora de subred CIDR es exactamente lo que se pregunta en CCNA, CompTIA Network+ y exámenes de redes. Las fórmulas son las del estándar RFC 4632." }
    ]
  }
};
