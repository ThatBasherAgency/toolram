export type GlossaryEntry = {
  slug: string;
  term: string;
  shortDef: string;
  longDef: string;
  example?: string;
  useCases: string[];
  related: string[];
  faqs: { q: string; a: string }[];
};

export const GLOSSARY: GlossaryEntry[] = [
  {
    slug: "que-es-base64",
    term: "Base64",
    shortDef: "Base64 es un esquema de codificación que convierte datos binarios a una cadena de texto ASCII usando 64 caracteres seguros (A-Z, a-z, 0-9, +, /).",
    longDef: "Base64 fue creado para transmitir datos binarios (imágenes, archivos) a través de protocolos que solo soportan texto, como email (MIME) o JSON. Cada 3 bytes de datos binarios se representan como 4 caracteres ASCII, lo que aumenta el tamaño en aproximadamente 33%. NO es encriptación: cualquiera puede decodificar Base64 al instante. Su propósito es transporte, no seguridad.",
    example: "Texto: 'Hola' → Base64: 'SG9sYQ=='",
    useCases: [
      "Embebir imágenes pequeñas en CSS (data: URLs)",
      "Enviar adjuntos en emails (MIME encoding)",
      "Tokens JWT (parte payload)",
      "Almacenar binarios en JSON o XML",
      "Basic Auth en HTTP headers"
    ],
    related: ["que-es-md5", "que-es-uuid", "base64-encode"],
    faqs: [
      { q: "¿Base64 es encriptación?", a: "No. Base64 es codificación: cualquiera puede decodificar el texto en milisegundos. Para seguridad real necesitás encriptación AES o RSA." },
      { q: "¿Por qué algunos Base64 terminan en =?", a: "El = es 'padding' que se agrega cuando los bytes de entrada no son múltiplo de 3, para mantener la longitud múltiplo de 4 caracteres." },
      { q: "¿Qué tan más grande queda un archivo en Base64?", a: "Aproximadamente 33% más grande. 100 KB de datos binarios se convierten en ~133 KB de texto Base64." }
    ]
  },
  {
    slug: "que-es-md5",
    term: "MD5",
    shortDef: "MD5 es una función hash criptográfica que produce un valor de 128 bits (32 caracteres hex) a partir de cualquier entrada de longitud variable.",
    longDef: "MD5 fue diseñado por Ronald Rivest en 1991. Hoy se considera **roto criptográficamente** desde 2004 — se puede generar colisiones (dos entradas distintas con mismo hash) en segundos en hardware común. NO se debe usar para contraseñas, firmas digitales ni nada que requiera seguridad. Sigue siendo útil para checksums de integridad de archivos no críticos y como identificador determinístico.",
    example: "MD5('Hola mundo') = 8e9e2af0a18fbe1b62b80be1d1c9b2c5",
    useCases: [
      "Verificar integridad de archivos descargados",
      "Generar IDs determinísticos (mismo input → mismo ID)",
      "Cache keys (hash de URL para cacheo)",
      "Comparar archivos rápidamente",
      "Histórico: passwords (NO USAR HOY)"
    ],
    related: ["que-es-sha-256", "que-es-base64", "hash-md5-sha"],
    faqs: [
      { q: "¿MD5 es seguro para contraseñas?", a: "No. Está roto desde 2004. Para contraseñas usá bcrypt, Argon2 o scrypt." },
      { q: "¿Cuánto mide un hash MD5?", a: "128 bits o 32 caracteres hexadecimales (ej: '5d41402abc4b2a76b9719d911017c592')." },
      { q: "¿Qué reemplaza a MD5?", a: "SHA-256 para integridad. Bcrypt o Argon2 para contraseñas. SHA-3 para nuevas aplicaciones criptográficas." }
    ]
  },
  {
    slug: "que-es-sha-256",
    term: "SHA-256",
    shortDef: "SHA-256 es una función hash criptográfica que produce 256 bits (64 caracteres hex). Forma parte de la familia SHA-2 publicada por NSA en 2001.",
    longDef: "SHA-256 (Secure Hash Algorithm 256) es el estándar actual para verificación de integridad y firmas digitales. A diferencia de MD5 y SHA-1, no se conocen ataques prácticos de colisión. Es la base de Bitcoin (mining), TLS/SSL certificates, y la mayoría de sistemas modernos. Es determinístico (mismo input siempre da mismo output) y unidireccional (no se puede revertir).",
    example: "SHA-256('Hola mundo') = c5e9...864c (64 caracteres)",
    useCases: [
      "Bitcoin proof-of-work mining",
      "Verificación de integridad de software (checksum)",
      "Firmas digitales SSL/TLS",
      "Tokens de sesión",
      "HMAC para autenticación de mensajes",
      "Git commits (Git usa SHA-1 pero migra a SHA-256)"
    ],
    related: ["que-es-md5", "que-es-base64", "hash-md5-sha"],
    faqs: [
      { q: "¿Cuántos posibles SHA-256 existen?", a: "2^256, aproximadamente 1.16 × 10^77. Más que átomos en el universo observable." },
      { q: "¿SHA-256 sirve para contraseñas?", a: "Para passwords, mejor usar bcrypt o Argon2 (que incluyen salt + slow function). SHA-256 puro es muy rápido y vulnerable a brute force." },
      { q: "¿Diferencia entre SHA-256 y SHA-512?", a: "SHA-512 produce 512 bits y es ligeramente más rápido en CPUs 64-bit. Para la mayoría de casos SHA-256 es suficiente." }
    ]
  },
  {
    slug: "que-es-uuid",
    term: "UUID",
    shortDef: "Un UUID (Universally Unique Identifier) es un identificador de 128 bits expresado como 32 caracteres hexadecimales en 5 grupos separados por guiones (8-4-4-4-12).",
    longDef: "Los UUIDs garantizan unicidad sin coordinación central: cualquier sistema puede generar uno y la probabilidad de colisión con otro UUID generado en cualquier parte del mundo es prácticamente cero (1 entre 5.3 × 10^36 para UUID v4). Existen 5 versiones: v1 basado en MAC + timestamp, v3 hash MD5 de namespace+nombre, v4 random (el más usado), v5 hash SHA-1, v7 ordenable por tiempo (nuevo).",
    example: "550e8400-e29b-41d4-a716-446655440000 (UUID v4)",
    useCases: [
      "Primary keys en bases de datos distribuidas",
      "IDs de transacciones en APIs",
      "IDs de archivos subidos",
      "Identificadores de sesión",
      "Tracking IDs en analytics"
    ],
    related: ["que-es-md5", "que-es-base64", "generador-uuid"],
    faqs: [
      { q: "¿Cuál UUID debo usar?", a: "Para la mayoría de casos: v4 (random). Si necesitás ordenable por tiempo: v7. Si querés determinístico de nombres: v5." },
      { q: "¿UUIDs son seguros para urls públicas?", a: "Sí. v4 son aleatorios y no revelan información. v1 sí revela MAC y timestamp." },
      { q: "¿Cuántos UUIDs puedo generar?", a: "Para que haya 50% chance de colisión necesitarías 2^61 UUIDs (~2.3 mil millones de millones)." }
    ]
  },
  {
    slug: "que-es-cps-test",
    term: "CPS Test",
    shortDef: "CPS (Clicks Per Second) Test es una prueba que mide cuántas veces puedes hacer click con el mouse en un período de tiempo, generalmente 5, 10, 30 o 60 segundos.",
    longDef: "El CPS Test se popularizó en la comunidad gamer, especialmente Minecraft PvP, donde la velocidad de click determina el daño en combate. El promedio humano normal está entre 6-8 CPS. Jugadores intermedios alcanzan 8-10 CPS. Pros con técnicas como jitter clicking, butterfly clicking o drag clicking superan los 12-15 CPS. Cualquier valor por encima de 25 CPS es físicamente improbable y suele indicar mouse macro o bug.",
    example: "Test de 10 segundos con 75 clicks = 7.5 CPS",
    useCases: [
      "Minecraft PvP combat training",
      "Verificar velocidad de mouse después de comprarlo",
      "Comparar diferencia entre clicks normales y técnicas avanzadas",
      "Diagnóstico de double-click bug en mouse",
      "Competencias online entre amigos"
    ],
    related: ["tiempo-reaccion", "cronometro", "cps-test"],
    faqs: [
      { q: "¿Cuál es un buen CPS?", a: "6-8 CPS es promedio humano. 8-10 es bueno. 10-15 con técnica avanzada (jitter, butterfly). >15 requiere drag clicking o mouse especial." },
      { q: "¿Es legal el CPS alto en Minecraft?", a: "Click normal sí. Macros automáticos no — la mayoría de servers banean por macro. Jitter y butterfly están en zona gris según server." },
      { q: "¿El test funciona en móvil?", a: "Sí, podés tocar la pantalla. El CPS suele ser un poco más alto que con mouse por la mayor área." }
    ]
  },
  {
    slug: "que-es-meta-description",
    term: "Meta description",
    shortDef: "La meta description es un resumen de 150-160 caracteres en HTML (`<meta name=\"description\">`) que describe el contenido de una página web y aparece debajo del título en los resultados de Google.",
    longDef: "La meta description NO es un factor directo de ranking en Google desde 2009, pero influye fuertemente en el CTR (click-through rate) desde SERPs. Una meta description bien escrita puede duplicar el CTR de una mediocre, lo que indirectamente mejora el ranking (Google ve mejor engagement). Si no la escribís, Google genera una automáticamente extrayendo texto de la página, generalmente con peor resultado.",
    example: "<meta name=\"description\" content=\"Calculadora IMC online gratis. Ingresa peso y altura, obtén tu Índice de Masa Corporal y categoría de salud al instante. Sin registro.\">",
    useCases: [
      "Cada página de producto en e-commerce",
      "Cada post de blog",
      "Páginas de aterrizaje",
      "Páginas de categoría",
      "Cualquier página que se quiera indexar"
    ],
    related: ["que-es-schema-markup", "que-es-canonical-url"],
    faqs: [
      { q: "¿Cuál es la longitud óptima?", a: "Entre 150-160 caracteres. Google trunca alrededor de 155-160 en desktop y 120 en mobile." },
      { q: "¿Debo incluir la keyword?", a: "Sí, naturalmente. Google la marca en bold cuando coincide con la búsqueda, mejorando CTR." },
      { q: "¿Pasa algo si no la pongo?", a: "Google extraerá texto de la página. Generalmente peor que una escrita manualmente." }
    ]
  },
  {
    slug: "que-es-imc",
    term: "IMC (Índice de Masa Corporal)",
    shortDef: "El IMC es una medida calculada como peso (kg) dividido entre altura al cuadrado (m²) que sirve como indicador inicial del estado nutricional.",
    longDef: "El IMC fue desarrollado por Adolphe Quetelet en 1832 y popularizado por la OMS como métrica universal. La fórmula es IMC = peso / (altura)². Categorías OMS: <18.5 bajo peso, 18.5-24.9 normal, 25-29.9 sobrepeso, ≥30 obesidad (con 3 grados). Sus limitaciones: no distingue masa muscular de grasa (atletas pueden dar 'sobrepeso' siendo saludables), no considera distribución de grasa, no es preciso en edades extremas ni durante embarazo. Es una herramienta de cribado, no diagnóstica.",
    example: "Persona de 70 kg y 1.70 m: IMC = 70 / (1.70)² = 70 / 2.89 = 24.2 → Normal",
    useCases: [
      "Screening inicial en consultas médicas",
      "Estudios poblacionales",
      "Auto-monitoreo personal",
      "Programas de fitness",
      "Pólizas de seguro de salud"
    ],
    related: ["calculadora-imc", "calculadora-tdee"],
    faqs: [
      { q: "¿El IMC sirve para atletas?", a: "Limitadamente. Atletas con mucha masa muscular suelen dar 'sobrepeso' o incluso 'obeso' siendo perfectamente saludables." },
      { q: "¿IMC es lo mismo en hombres y mujeres?", a: "La fórmula es la misma. Los rangos saludables OMS también. Pero el % de grasa corporal saludable difiere: 10-20% hombres, 18-28% mujeres." },
      { q: "¿Qué reemplaza al IMC?", a: "Para análisis individual: % grasa corporal medido con DEXA, bioimpedancia o medición de pliegues. Circunferencia de cintura es muy buena complemento." }
    ]
  },
  {
    slug: "que-es-iva",
    term: "IVA",
    shortDef: "El IVA (Impuesto al Valor Agregado) es un impuesto indirecto que grava el consumo de bienes y servicios, calculado como un porcentaje sobre el precio final.",
    longDef: "El IVA es la principal fuente de ingresos fiscales en la mayoría de países latinoamericanos y europeos. Cada país tiene tasas diferentes: México 16% general (8% en zona fronteriza, 0% en alimentos básicos), España 21%, Argentina 21%, Colombia 19%, Perú 18%, Chile 19%. Se cobra en cada etapa de la cadena de valor pero solo el consumidor final lo absorbe completamente. Las empresas registradas pueden acreditar el IVA pagado en sus compras contra el IVA cobrado en sus ventas.",
    example: "Producto $1,000 + IVA 16% = $1,160 total. El IVA es $160.",
    useCases: [
      "Facturación de empresas",
      "Cálculo de precios de venta al público",
      "Declaración mensual de impuestos",
      "Importaciones y exportaciones",
      "Facturas electrónicas (CFDI en México)"
    ],
    related: ["calculadora-iva-mexico", "calculadora-descuento", "calculadora-porcentaje"],
    faqs: [
      { q: "¿Cómo agrego IVA a un precio?", a: "Multiplicá el precio sin IVA por 1 + tasa. Ejemplo: $1000 × 1.16 = $1,160 (con IVA del 16%)." },
      { q: "¿Cómo extraigo el IVA de un precio que ya lo incluye?", a: "Dividí el precio total entre 1 + tasa. Ejemplo: $1,160 ÷ 1.16 = $1,000 (subtotal)." },
      { q: "¿Qué productos están exentos de IVA en México?", a: "Alimentos básicos no procesados, medicinas, libros, periódicos y revistas. La lista completa está en el artículo 2-A de la LIVA." }
    ]
  },
  {
    slug: "que-es-qr-code",
    term: "Código QR",
    shortDef: "Un código QR (Quick Response) es una matriz bidimensional de cuadros blancos y negros que codifica información digital y se lee con la cámara de un smartphone.",
    longDef: "Inventado por Denso Wave (Japón) en 1994 para tracking de partes automotrices, el QR ganó adopción masiva con los smartphones a partir de 2010 y explotó durante la pandemia 2020 (menús digitales, pagos sin contacto, registro covid). Puede almacenar hasta 4,296 caracteres alfanuméricos o 7,089 numéricos. Soporta corrección de errores Reed-Solomon hasta 30%, por eso funcionan aún si una parte está sucia o tapada. Versiones: 1 (21x21 módulos) hasta 40 (177x177).",
    example: "Generar QR para WiFi: WIFI:T:WPA;S:MiRed;P:miContraseña;;",
    useCases: [
      "Menús digitales en restaurantes",
      "Pago móvil (Mercado Pago, Bizum, OXXO Pay)",
      "Compartir contacto (vCard)",
      "Acceso a WiFi sin tipear contraseña",
      "Verificación de tickets y boletos",
      "Tarjetas de presentación digitales",
      "Marketing en empaques físicos"
    ],
    related: ["generador-qr"],
    faqs: [
      { q: "¿Necesito una app especial para leer QR?", a: "No desde 2017. iPhone (cámara nativa), Android 9+ (Google Lens integrado) y todas las apps de cámara modernas detectan QR automáticamente." },
      { q: "¿Caducan los códigos QR?", a: "Estáticos no caducan (el contenido está en el QR). Dinámicos (que redirigen a una URL) sí pueden caducar si el dueño no paga el servicio." },
      { q: "¿Puedo personalizar el color de un QR?", a: "Sí, mientras mantengas suficiente contraste (generalmente oscuro sobre claro). Demasiado color o muy poco contraste rompe la lectura." }
    ]
  },
  {
    slug: "que-es-jwt",
    term: "JWT (JSON Web Token)",
    shortDef: "JWT es un estándar abierto (RFC 7519) para representar afirmaciones (claims) entre dos partes como un objeto JSON firmado, codificado en Base64.",
    longDef: "Un JWT consta de 3 partes separadas por puntos: Header (algoritmo + tipo), Payload (claims/datos) y Signature (firma criptográfica). Cada parte está codificada en Base64Url. Se usa principalmente para autenticación stateless: el servidor genera un JWT al login, lo firma, y el cliente lo manda en cada request. El servidor valida la firma sin necesidad de consultar base de datos.",
    example: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0In0.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk",
    useCases: [
      "Autenticación de usuarios en APIs",
      "Single Sign-On (SSO)",
      "Tokens de recuperación de contraseña",
      "API keys con expiración",
      "Comunicación entre microservicios"
    ],
    related: ["que-es-base64", "que-es-uuid", "que-es-md5"],
    faqs: [
      { q: "¿JWT es seguro?", a: "Sí, si se usa correctamente: HTTPS, algoritmo fuerte (HS256/RS256), expiración corta, validación de signature. Su debilidad principal es revocación: una vez emitido, vale hasta que expira." },
      { q: "¿Por qué no decodificar la firma me deja modificar el JWT?", a: "Porque la firma se calcula con una clave secreta. Si modificás el payload, la firma deja de coincidir y el servidor rechaza el token." },
      { q: "¿Dónde guardar JWT en el cliente?", a: "Mejor en cookie HttpOnly Secure SameSite=Strict (no accesible por JS, protegido contra XSS). LocalStorage es vulnerable a XSS." }
    ]
  },
  {
    slug: "que-es-schema-markup",
    term: "Schema markup",
    shortDef: "Schema markup es código estructurado (JSON-LD, microdata o RDFa) que se agrega al HTML para describir el contenido de una página de manera que motores de búsqueda lo entiendan mejor.",
    longDef: "Schema.org es un vocabulario colaborativo creado por Google, Bing, Yahoo y Yandex en 2011. Usa un esquema jerárquico de tipos (Article, Product, Recipe, Person, Organization, etc.) y propiedades (name, author, datePublished, etc.). El formato preferido por Google hoy es JSON-LD en un script. Schema markup habilita rich results en SERPs: estrellas de review, precio, FAQs, breadcrumbs visibles, sitelinks, knowledge panels.",
    example: "<script type=\"application/ld+json\">{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"...\"}</script>",
    useCases: [
      "Productos e-commerce → estrellas + precio + stock en SERPs",
      "Recetas → tiempo + calorías visibles",
      "Eventos → fecha + lugar en SERP",
      "Artículos → autor + fecha + imagen",
      "FAQ → preguntas expandibles directamente en Google",
      "Local Business → mapa + horarios + reviews"
    ],
    related: ["que-es-meta-description", "que-es-canonical-url"],
    faqs: [
      { q: "¿Schema markup mejora el ranking?", a: "Indirectamente. No es factor de ranking directo, pero rich results aumentan CTR significativamente (hasta 30% más clicks)." },
      { q: "¿Qué formato es mejor: JSON-LD o microdata?", a: "JSON-LD. Es el formato recomendado por Google desde 2014, más limpio y mantenible que microdata inline." },
      { q: "¿Cómo verifico mi schema?", a: "Usá validator.schema.org para sintaxis y search.google.com/test/rich-results para validar elegibilidad de rich snippets." }
    ]
  },
  {
    slug: "que-es-canonical-url",
    term: "Canonical URL",
    shortDef: "Canonical URL es la versión 'oficial' de una página entre múltiples URLs que sirven contenido similar o duplicado. Se declara con `<link rel=\"canonical\" href=\"...\">`.",
    longDef: "Cuando una misma página es accesible vía múltiples URLs (con/sin www, http/https, con/sin trailing slash, parámetros de query, mobile/desktop), Google necesita saber cuál considerar la principal para evitar penalty por contenido duplicado. La etiqueta canonical le dice a Google: 'aunque me veas en varias URLs, esta es la que tenés que indexar y atribuir señales SEO'. Ignorar canonicals correctos es causa #1 de pérdida de tráfico orgánico en e-commerce.",
    example: "<link rel=\"canonical\" href=\"https://toolram.com/calculadora-imc\" />",
    useCases: [
      "E-commerce con filtros de categoría (mismo producto en múltiples URLs)",
      "Versiones AMP que apuntan al artículo original",
      "Posts en múltiples categorías",
      "Páginas con parámetros UTM",
      "Versiones móviles que apuntan a desktop"
    ],
    related: ["que-es-meta-description", "que-es-schema-markup"],
    faqs: [
      { q: "¿Self-canonical es necesario?", a: "Sí, recomendado. Apuntar canonical de la página a sí misma previene que parámetros de query (UTM, fbclid, gclid) creen 'duplicados' en el índice de Google." },
      { q: "¿Qué pasa si todas mis páginas tienen el mismo canonical?", a: "Google solo indexa la URL canonical. Las demás son ignoradas. Esto puede destruir tu indexación si está mal configurado." },
      { q: "¿Canonical y redirect son lo mismo?", a: "No. Canonical es una sugerencia (Google puede ignorarla). 301 redirect es definitivo: la URL vieja deja de funcionar." }
    ]
  },
  {
    slug: "que-es-tiempo-de-reaccion",
    term: "Tiempo de reacción",
    shortDef: "El tiempo de reacción es el intervalo entre la presentación de un estímulo (visual, auditivo o táctil) y la respuesta voluntaria del sujeto, medido en milisegundos.",
    longDef: "El tiempo de reacción humano promedio a estímulos visuales es 250-300 ms. Atletas profesionales (boxeadores, tenistas, gamers de FPS) bajan a 180-220 ms. El tiempo aumenta con la edad (~1 ms por año a partir de los 25), fatiga, alcohol, falta de sueño y disminuye con entrenamiento, cafeína moderada (200 mg) y atención focalizada. Tipos: simple (un estímulo, una respuesta), de elección (varios estímulos, varias respuestas), de discriminación (responder solo ante estímulo correcto).",
    example: "Promedio adulto sano: 215-265 ms en test simple visual",
    useCases: [
      "Diagnóstico médico (Parkinson, lesión cerebral)",
      "Selección de pilotos y deportistas",
      "Investigación psicológica",
      "Entrenamiento atlético",
      "Evaluación de fatiga ocupacional"
    ],
    related: ["cps-test", "tiempo-reaccion"],
    faqs: [
      { q: "¿Por qué mi tiempo de reacción es peor en la mañana?", a: "El cuerpo necesita 30-60 minutos post-despertar para alcanzar pico de alerta. Cafeína acelera el proceso. La 'inercia del sueño' es real y medible." },
      { q: "¿Se puede mejorar el tiempo de reacción?", a: "Sí, hasta cierto punto. Entrenamiento específico mejora 5-15% en 4-6 semanas. Más allá depende de límites neurológicos individuales." },
      { q: "¿Cuál es el tiempo de reacción más bajo registrado?", a: "Atletas elite alcanzan 100-150 ms, pero salidas de pista <100 ms en atletismo se consideran salida en falso (anticipación, no reacción real)." }
    ]
  },
  {
    slug: "que-es-pdf",
    term: "PDF",
    shortDef: "PDF (Portable Document Format) es un formato de archivo creado por Adobe en 1993 que preserva el aspecto visual de documentos independientemente del dispositivo, sistema operativo o software usado para abrirlo.",
    longDef: "PDF se convirtió en estándar ISO 32000 en 2008. Su característica clave: el documento se ve igual en cualquier lugar (a diferencia de Word, donde formato puede variar). Internamente combina texto, fuentes embebidas, imágenes vectoriales/raster y metadata en un solo archivo. Soporta formularios interactivos, firmas digitales (eIDAS, FIEL), encriptación AES, JavaScript embebido (riesgo de seguridad), y accesibilidad. Versiones: PDF/A (archivo), PDF/X (impresión), PDF/UA (accesibilidad).",
    example: "Un PDF de 10 páginas con texto + 5 imágenes pesa típicamente 200 KB - 2 MB",
    useCases: [
      "Contratos y documentos legales",
      "Recibos y facturas",
      "Manuales y documentación técnica",
      "Trabajos académicos",
      "E-books",
      "Formularios gubernamentales (SAT, IMSS, etc)"
    ],
    related: ["unir-pdf", "dividir-pdf", "marca-agua-pdf", "imagenes-a-pdf"],
    faqs: [
      { q: "¿Por qué los PDFs pesan más que un Word equivalente?", a: "PDF embebe fuentes y a veces convierte texto en imagen. Para reducir tamaño: comprimir imágenes y usar fuentes estándar." },
      { q: "¿Es seguro abrir PDFs de fuentes desconocidas?", a: "Riesgo bajo pero no cero. PDFs pueden contener JavaScript o exploit de viewer. Mejor usar viewer actualizado y desactivar JS en Adobe Reader." },
      { q: "¿Puedo editar un PDF como un Word?", a: "Solo si fue creado preservando texto editable. La mayoría de PDFs de scanner son imágenes y necesitan OCR para extraer texto." }
    ]
  },
  {
    slug: "que-es-bcrypt",
    term: "Bcrypt",
    shortDef: "Bcrypt es una función de hashing diseñada específicamente para almacenar contraseñas de manera segura, que incluye salt automático y es deliberadamente lenta para prevenir ataques de fuerza bruta.",
    longDef: "Creado por Niels Provos y David Mazières en 1999, basado en el cifrado Blowfish. A diferencia de MD5/SHA, bcrypt es lento por diseño: incluye un parámetro 'cost' que define cuántas veces se itera el hash (típicamente 10-12, lo que toma ~100ms). Esto hace que crackear contraseñas por brute force sea económicamente inviable. Cada hash incluye salt único (random bytes) automáticamente, previniendo ataques de rainbow tables. Se considera el estándar de facto desde los 2010s, junto con Argon2 y scrypt.",
    example: "$2b$12$KIXz8jqe9KqQqMc5GiCK8eLDRCuFZ6JqB3z9X3vN7K5LqYXPxZsvC",
    useCases: [
      "Almacenar contraseñas de usuarios en DB",
      "Verificación de credenciales en login",
      "Tokens de API key persistentes",
      "Recuperación de contraseña (verificar identidad)"
    ],
    related: ["que-es-md5", "que-es-sha-256", "generador-passwords"],
    faqs: [
      { q: "¿Bcrypt es mejor que SHA-256 para contraseñas?", a: "Sí, considerablemente. SHA-256 es rápido (millones/segundo); bcrypt es lento por diseño (~10/segundo con cost 12), haciendo brute force impráctico." },
      { q: "¿Qué cost factor usar?", a: "Mínimo 10. Recomendado 12-14 en 2026. Aumentar cuando hardware mejora — la regla es que un login válido tome ~100-500ms." },
      { q: "¿Bcrypt vs Argon2?", a: "Argon2 (ganador de Password Hashing Competition 2015) es teóricamente más resistente a ataques con GPU y ASIC. Bcrypt sigue siendo seguro y más maduro/probado." }
    ]
  },
  {
    slug: "que-es-cors",
    term: "CORS",
    shortDef: "CORS (Cross-Origin Resource Sharing) es un mecanismo HTTP que permite a un servidor especificar qué orígenes pueden acceder a sus recursos desde un navegador, relajando la Same-Origin Policy.",
    longDef: "Por defecto, los navegadores bloquean requests entre orígenes distintos (different protocol, domain, or port) por seguridad — esto es la Same-Origin Policy. CORS permite excepciones controladas. El servidor responde con headers `Access-Control-Allow-Origin` indicando qué dominios pueden acceder. Para requests 'no simples' (POST con JSON, custom headers), el navegador hace primero un preflight OPTIONS request. Es responsabilidad del SERVIDOR habilitar CORS, no del cliente.",
    example: "Access-Control-Allow-Origin: https://miapp.com\\nAccess-Control-Allow-Methods: GET, POST\\nAccess-Control-Allow-Headers: Content-Type",
    useCases: [
      "API pública consumida desde frontend",
      "Microservicios con frontend separado",
      "CDN sirviendo recursos a múltiples dominios",
      "OAuth flows con redirección"
    ],
    related: ["que-es-jwt", "que-es-base64"],
    faqs: [
      { q: "¿CORS es problema del cliente o del servidor?", a: "Del servidor. El navegador bloquea por defecto. El servidor debe explícitamente permitir el origen vía headers." },
      { q: "¿Access-Control-Allow-Origin: * es seguro?", a: "Para APIs públicas sin auth: sí. Para APIs con cookies/credentials: NO — el wildcard no permite credentials. Especificar dominios concretos." },
      { q: "¿Por qué mi POST falla con CORS pero el GET no?", a: "GET son 'simples', no requieren preflight. POST con Content-Type: application/json sí requiere OPTIONS preflight con headers permitidos." }
    ]
  },
  {
    slug: "que-es-https",
    term: "HTTPS",
    shortDef: "HTTPS (HTTP Secure) es la versión cifrada de HTTP que usa TLS (antes SSL) para encriptar el tráfico entre cliente y servidor, garantizando confidencialidad, integridad y autenticación.",
    longDef: "HTTPS protege contra 3 amenazas: 1) Eavesdropping (espiar tráfico) — cifrado simétrico AES, 2) Tampering (modificación) — MAC/HMAC, 3) Impersonation (sitio falso) — certificados X.509 firmados por CA. Desde 2014 Google lo usa como factor de ranking. Desde 2018 Chrome marca HTTP como 'No seguro'. Let's Encrypt democratizó certificados gratuitos en 2016. TLS 1.3 (2018) eliminó vulnerabilidades de versiones anteriores y aceleró el handshake.",
    example: "https://toolram.com — el candado en el navegador indica conexión cifrada y certificado válido",
    useCases: [
      "Cualquier sitio con login",
      "E-commerce con pagos",
      "APIs de cualquier tipo",
      "Sitios SEO-conscientes (factor ranking)",
      "Compliance GDPR, HIPAA, PCI-DSS"
    ],
    related: ["que-es-jwt", "que-es-cors"],
    faqs: [
      { q: "¿HTTPS hace mi sitio lento?", a: "Casi nada con TLS 1.3 + HTTP/2 + HTTP/3. El overhead del handshake (1-RTT) es despreciable y se compensa con multiplexing de HTTP/2." },
      { q: "¿Necesito comprar certificado SSL?", a: "No. Let's Encrypt es gratis y reconocido por todos los navegadores. La mayoría de hostings lo automatizan." },
      { q: "¿HTTPS me protege contra hackers?", a: "Solo el tráfico en tránsito. NO protege contra: SQL injection, XSS, malware del servidor, o usuarios reusando contraseñas comprometidas." }
    ]
  },
  {
    slug: "que-es-llms-txt",
    term: "llms.txt",
    shortDef: "llms.txt es un archivo de texto en la raíz de un sitio web que provee información estructurada y condensada sobre el sitio para que modelos de lenguaje (LLMs) la entiendan eficientemente.",
    longDef: "Propuesto en 2024 por Jeremy Howard y la comunidad de IA, llms.txt es análogo a robots.txt pero para LLMs. Mientras robots.txt dice qué crawlear, llms.txt explica QUÉ ES el sitio en lenguaje natural. Útil porque los LLMs tienen ventana de contexto limitada y no pueden 'leer' un sitio entero — un llms.txt bien escrito les da la información esencial en 1-3 KB. Se está adoptando por Anthropic, Perplexity, y se espera adopción más amplia. Ubicación: /llms.txt (raíz del dominio).",
    example: "Ver https://toolram.com/llms.txt — describe categorías, tools, diferenciadores y datos para citation por IA",
    useCases: [
      "Sitios que quieren ser citados correctamente por ChatGPT/Claude/Perplexity",
      "Documentación técnica para que IA la consulte",
      "E-commerce que quiere ser comparable por agentes de IA",
      "Portales de tools/SaaS",
      "Sitios con contenido que los LLMs no acaban de entender"
    ],
    related: ["que-es-schema-markup", "que-es-meta-description"],
    faqs: [
      { q: "¿llms.txt es obligatorio?", a: "No. Es un estándar emergente, no oficial. Pero para competir en AI Search 2026+ es recomendable tenerlo." },
      { q: "¿Reemplaza al sitemap.xml?", a: "No, son complementarios. Sitemap.xml lista URLs (para crawlers tradicionales). llms.txt explica qué es el sitio (para LLMs)." },
      { q: "¿Hay que registrarlo en algún lado?", a: "No. Solo subirlo a /llms.txt y los LLMs que lo soporten lo encontrarán automáticamente." }
    ]
  },
  {
    slug: "que-es-regex",
    term: "Regex (expresión regular)",
    shortDef: "Una expresión regular (regex) es un patrón de búsqueda que define caracteres y reglas para encontrar, validar o reemplazar texto que coincida con esa estructura.",
    longDef: "Inventada por Stephen Kleene en los 1950s y popularizada por herramientas Unix como grep y sed. Hoy implementada en casi todos los lenguajes (JavaScript, Python, Java, etc.). Sintaxis básica: . (cualquier char), * (0 o más), + (1 o más), ? (opcional), [abc] (clase), \\d (dígito), \\w (palabra), ^ y $ (inicio/fin). Variantes: PCRE (Perl-compatible, la más usada), POSIX (Unix tradicional), regex en JavaScript (similar a PCRE pero con quirks).",
    example: "Validar email simple: /^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$/i",
    useCases: [
      "Validación de inputs (email, teléfono, código postal)",
      "Búsqueda y reemplazo masivo en editores de código",
      "Parsing de logs",
      "Web scraping (extraer datos)",
      "Reglas de URL routing"
    ],
    related: ["json-formatter", "que-es-base64"],
    faqs: [
      { q: "¿Regex es lento?", a: "Generalmente no, salvo si tu patrón tiene 'catastrophic backtracking' (anidamiento de cuantificadores). Probá tus regex contra inputs maliciosos." },
      { q: "¿Cómo aprendo regex eficientemente?", a: "regex101.com (interactivo con explicación), regexr.com, o el libro 'Mastering Regular Expressions' de Friedl." },
      { q: "¿Se puede usar regex para validar HTML?", a: "Generalmente NO. HTML es un lenguaje no-regular. Para parsing serio usar parsers DOM o librerías como cheerio (Node) o BeautifulSoup (Python)." }
    ]
  },
  {
    slug: "que-es-tdee",
    term: "TDEE",
    shortDef: "TDEE (Total Daily Energy Expenditure) es la cantidad total de calorías que tu cuerpo quema en un día completo, sumando metabolismo basal, actividad física y digestión.",
    longDef: "TDEE = BMR × factor de actividad. El BMR (metabolismo basal) representa el gasto en reposo absoluto (60-75% del TDEE), calculado con la fórmula Mifflin-St Jeor (la más precisa hoy). El factor de actividad multiplica el BMR: sedentario 1.2, ligero 1.375, moderado 1.55, activo 1.725, muy activo 1.9. Conocer tu TDEE es la base para definir déficit (bajar peso, ~500 kcal menos) o superávit (subir masa, ~300 kcal más). Es estimación, no exacto: el cuerpo se adapta al déficit prolongado bajando metabolismo.",
    example: "Hombre 30 años, 70kg, 175cm, moderadamente activo: BMR ≈ 1638, TDEE ≈ 1638 × 1.55 = 2539 kcal/día",
    useCases: [
      "Planificación de pérdida de peso",
      "Ganancia de masa muscular (bulk)",
      "Mantenimiento de peso",
      "Planning nutricional para atletas",
      "Cálculo de macros (proteína/carbo/grasa)"
    ],
    related: ["calculadora-tdee", "calculadora-imc", "que-es-imc"],
    faqs: [
      { q: "¿Las calculadoras de TDEE son precisas?", a: "±10-15% típicamente. La variabilidad individual es real. Mejor empezar con el estimado y ajustar después de 2-3 semanas según resultados reales." },
      { q: "¿Cuánto déficit es seguro?", a: "10-20% del TDEE. Más que eso prolongado puede bajar metabolismo, perder músculo y generar restricción psicológica." },
      { q: "¿El TDEE cambia con la edad?", a: "Sí. BMR baja ~1-2% por década a partir de los 25. Mantener masa muscular minimiza la caída." }
    ]
  }
];

export const GLOSSARY_BY_SLUG = Object.fromEntries(GLOSSARY.map((g) => [g.slug, g]));
