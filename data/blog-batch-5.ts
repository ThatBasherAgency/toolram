import type { BlogPost } from "./blog";

/**
 * Batch 5 (3-oct-2026, ola 2). Guías para consultas que Bing ya enseña en posición 4-20 (90 días)
 * y que no tenían una página que las respondiera de frente. Cada cifra está calculada con el mismo
 * algoritmo que usa la herramienta enlazada.
 */

export const POSTS_BATCH_5: BlogPost[] = [
  {
    slug: "blog/digito-de-control-ean-13-como-se-calcula",
    title: "Cómo calcular el dígito de control de un EAN-13",
    excerpt:
      "El último número de un código de barras EAN-13 se calcula con una suma ponderada 1-3-1-3. Ejemplo resuelto con 978020137966 (sale 2), qué significan los prefijos 750, 775 u 84 y cuándo necesitas GS1.",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    author: "José Gaspard",
    category: "Generadores",
    keywords: ["digito de control ean 13", "calcular digito verificador ean13", "ean 13 valido", "generador ean 13", "codigo de barras ean 13"],
    estimatedReadMinutes: 5,
    body: `
## La respuesta corta

El dígito de control de un EAN-13 es el número 13 y se obtiene de los 12 primeros así:

1. Multiplica por 1 los dígitos en posición impar (1.º, 3.º, 5.º…) y por 3 los de posición par (2.º, 4.º, 6.º…).
2. Suma todo.
3. Resta esa suma a la decena siguiente. Si la suma ya termina en 0, el dígito es 0.

Con fórmula: **dígito = (10 − (suma mod 10)) mod 10**. El [generador de códigos EAN-13](/barcode-generator) de Toolram hace exactamente esta cuenta y dibuja el código.

## Ejemplo resuelto: 978020137966

Este número llegó tal cual como búsqueda («978020137966 ean13 hacer»). Son 12 dígitos, así que falta el de control:

| Posición | Dígito | Peso | Resultado |
|---|---|---|---|
| 1 | 9 | ×1 | 9 |
| 2 | 7 | ×3 | 21 |
| 3 | 8 | ×1 | 8 |
| 4 | 0 | ×3 | 0 |
| 5 | 2 | ×1 | 2 |
| 6 | 0 | ×3 | 0 |
| 7 | 1 | ×1 | 1 |
| 8 | 3 | ×3 | 9 |
| 9 | 7 | ×1 | 7 |
| 10 | 9 | ×3 | 27 |
| 11 | 6 | ×1 | 6 |
| 12 | 6 | ×3 | 18 |

Suma: **108**. La decena siguiente es 110, así que el dígito de control es **2**. El EAN-13 completo queda **9780201379662**.

Los códigos que empiezan por 978 o 979 son libros: es el ISBN-13 convertido en código de barras, con el mismo dígito de control.

## Cómo saber si un EAN-13 es válido

Haz la misma suma con los 13 dígitos, ahora con el decimotercero multiplicado por 1. Si el total termina en 0, el código es válido. Con 9780201379662: 108 + 2 = 110, termina en 0, válido.

Esto detecta cualquier error en un solo dígito y la mayoría de los intercambios de dos dígitos vecinos, que son los fallos típicos al teclear un código a mano.

## Qué significan los primeros dígitos

Los primeros 2 o 3 dígitos son el prefijo de la organización GS1 que asignó el código. Algunos de Latinoamérica y España:

| Prefijo | Organización GS1 |
|---|---|
| 750 | GS1 México |
| 775 | GS1 Perú |
| 778-779 | GS1 Argentina |
| 770-771 | GS1 Colombia |
| 780 | GS1 Chile |
| 84 | GS1 España |
| 978-979 | Libros (ISBN) |

Ojo: el prefijo dice qué oficina de GS1 dio el código, no dónde se fabricó el producto. Una empresa mexicana que fabrica en China sigue usando 750.

## ¿Puedo inventarme un EAN-13 para vender?

Para pruebas, etiquetas internas, inventario propio o un prototipo, sí: cualquier número con el dígito de control bien calculado se lee en un escáner. Para vender en supermercados o en marketplaces que exigen código de barras necesitas un prefijo de empresa comprado a GS1 de tu país, porque esos rangos identifican al fabricante y las cadenas los comprueban.
`,
    faqs: [
      { q: "¿Cómo se calcula el dígito de control de un EAN-13?", a: "Multiplica por 1 los dígitos en posición impar y por 3 los de posición par, suma todo y resta el resultado a la decena siguiente. Fórmula: (10 − (suma mod 10)) mod 10." },
      { q: "¿Cuál es el dígito de control de 978020137966?", a: "Es 2. La suma ponderada da 108 y la decena siguiente es 110. El código completo es 9780201379662." },
      { q: "¿Cómo sé si un código EAN-13 es válido?", a: "Haz la suma ponderada con los 13 dígitos (el último por 1). Si el total termina en 0, es válido." },
      { q: "¿Qué país es el código de barras 750?", a: "750 es el prefijo de GS1 México. Indica qué oficina de GS1 asignó el código, no el país de fabricación." }
    ]
  },
  {
    slug: "blog/letra-del-dni-y-nie-como-se-calcula",
    title: "Cómo se calcula la letra del DNI y del NIE",
    excerpt:
      "La letra del DNI es el resto de dividir el número entre 23, buscado en la tabla TRWAGMYFPDXBNJZSQVHLCKE. Ejemplos resueltos (12345678 → Z, X1234567 → L) y cómo se hace con el NIE.",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    author: "José Gaspard",
    category: "Generadores",
    keywords: ["letra del dni", "calcular letra dni", "letra nie", "algoritmo letra dni", "validar nie", "completar letra dni"],
    estimatedReadMinutes: 4,
    body: `
## La respuesta corta

Divide el número del DNI entre 23 y quédate con el **resto** (un número del 0 al 22). Busca ese resto en esta tabla y esa es la letra:

| Resto | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Letra | T | R | W | A | G | M | Y | F | P | D | X | B |

| Resto | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Letra | N | J | Z | S | Q | V | H | L | C | K | E |

Seguidas, las 23 letras forman la cadena **TRWAGMYFPDXBNJZSQVHLCKE**. Es el algoritmo que publica el Ministerio del Interior de España. El [validador de DNI y NIE](/validador-dni-nie) lo aplica solo: si escribes los 8 números sin letra, te devuelve la letra que falta.

## Ejemplo con un DNI

DNI 12345678:

- 12345678 ÷ 23 = 536.768, y sobran **14** (536.768 × 23 = 12.345.664; 12.345.678 − 12.345.664 = 14).
- En la tabla, el 14 es la **Z**.
- DNI completo: **12345678Z**.

## Cómo se calcula la letra del NIE

El NIE de extranjeros empieza por X, Y o Z. Esa letra inicial se cambia por un número y luego se hace lo mismo que con el DNI:

- X → 0
- Y → 1
- Z → 2

Ejemplo, NIE X1234567: se convierte en 01234567. El resto de dividir entre 23 es **19**, que en la tabla es la **L**. NIE completo: **X1234567L**.

Otro: Y7654321 pasa a 17654321, resto **4**, letra **G**: **Y7654321G**.

## Por qué faltan letras

La tabla no usa la I, la Ñ, la O ni la U, para que no se confundan con el 1, la N, el 0 o la V al leer un documento a mano.

## Para qué sirve comprobarla

La letra es un control de errores: si alguien teclea mal un número del DNI en un formulario, la letra deja de cuadrar y se detecta al momento. No prueba que el DNI exista ni a quién pertenece; solo que el número y la letra son coherentes.
`,
    faqs: [
      { q: "¿Cómo se calcula la letra del DNI?", a: "Divide el número entre 23 y busca el resto en la tabla TRWAGMYFPDXBNJZSQVHLCKE, donde la T es el 0 y la E el 22. Ejemplo: 12345678 deja resto 14, letra Z." },
      { q: "¿Cómo se calcula la letra del NIE?", a: "Cambia la letra inicial por un número (X=0, Y=1, Z=2) y haz el mismo cálculo que con el DNI. X1234567 pasa a 01234567, resto 19, letra L." },
      { q: "¿Una letra correcta significa que el DNI existe?", a: "No. Solo indica que el número y la letra son coherentes. Sirve para detectar errores al teclear, no para comprobar identidad." },
      { q: "¿Qué letras no se usan en el DNI?", a: "La I, la Ñ, la O y la U, para evitar confusiones con 1, N, 0 y V." }
    ]
  },
  {
    slug: "blog/formula-cuota-prestamo-ejemplo",
    title: "Fórmula de la cuota de un préstamo, con ejemplo",
    excerpt:
      "Cómo calcular la cuota mensual de un préstamo (sistema francés) y, al revés, cuánto te pueden prestar si sabes la cuota, la tasa y el plazo. Ejemplos resueltos: 100,000 al 24 % anual en 12 meses da 9,455.96 al mes.",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    author: "José Gaspard",
    category: "Calculadoras",
    keywords: ["formula cuota prestamo", "como calcular la cuota de un prestamo", "formula anualidad", "calcular monto de un prestamo", "sistema frances formula"],
    estimatedReadMinutes: 5,
    body: `
## La fórmula

La cuota fija mensual de un préstamo (sistema francés, el que usan casi todos los bancos para créditos personales, de auto e hipotecas) es:

**cuota = P × i ÷ (1 − (1 + i)^−n)**

- **P**: el monto que te prestan.
- **i**: la tasa de interés **del periodo**. Si la tasa es anual y pagas cada mes, divide entre 12.
- **n**: el número de cuotas.

La [calculadora de préstamos](/calculadora-prestamo) de Toolram usa esta fórmula y además arma la tabla de amortización mes a mes.

## Ejemplo: 100,000 pesos al 24 % anual en 12 meses

- P = 100,000
- i = 24 % ÷ 12 = 2 % = 0.02
- n = 12

cuota = 100,000 × 0.02 ÷ (1 − 1.02^−12) = **9,455.96 al mes**.

Pagas 12 × 9,455.96 = **113,471.52** en total, así que los intereses suman **13,471.52**.

## Cómo se reparte cada cuota

En el sistema francés la cuota no cambia, pero sí lo que hay dentro. El primer mes el interés es el 2 % de los 100,000 que debes: **2,000**. El resto de la cuota, **7,455.96**, baja la deuda. El mes siguiente debes menos, el interés es menor y más parte de la cuota va a capital. Por eso, si adelantas pagos, conviene hacerlo al principio.

## Al revés: cuánto me pueden prestar con una cuota

Esta es la fórmula que se busca como «monto de un préstamo cuando se tiene la tasa, el tiempo y la anualidad». Es el valor presente de la anualidad:

**P = cuota × (1 − (1 + i)^−n) ÷ i**

Ejemplo: puedes pagar 5,000 al mes durante 24 meses y el banco cobra 18 % anual (1.5 % mensual).

P = 5,000 × (1 − 1.015^−24) ÷ 0.015 = **100,152.03**.

Con esa cuota y esa tasa, el préstamo máximo ronda los 100,000.

## Tres errores comunes

1. **Usar la tasa anual sin dividir.** Si metes 0.24 en vez de 0.02 con cuotas mensuales, la cuota sale disparada.
2. **Confundir tasa nominal con CAT o TAE.** La fórmula usa la tasa de interés nominal del periodo. El CAT (México) o la TAE (España) incluyen comisiones y seguros: sirven para comparar ofertas, no para esta cuenta.
3. **Olvidar el IVA de los intereses.** En México, los intereses de muchos créditos al consumo llevan IVA, que el banco suma a la cuota. La fórmula da la cuota sin IVA.
`,
    faqs: [
      { q: "¿Cuál es la fórmula de la cuota de un préstamo?", a: "cuota = P × i ÷ (1 − (1 + i)^−n), con P el monto, i la tasa del periodo (anual ÷ 12 si pagas mensual) y n el número de cuotas." },
      { q: "¿Cuánto pago al mes por 100,000 al 24 % anual en 12 meses?", a: "9,455.96 al mes. En total pagas 113,471.52, de los que 13,471.52 son intereses (sin IVA)." },
      { q: "¿Cómo calculo el monto de un préstamo si sé la cuota, la tasa y el plazo?", a: "Con el valor presente de la anualidad: P = cuota × (1 − (1 + i)^−n) ÷ i. Con 5,000 al mes, 24 meses y 1.5 % mensual sale 100,152.03." }
    ]
  },
  {
    slug: "blog/convertir-timestamp-unix-a-fecha",
    title: "Cómo convertir un timestamp Unix a fecha",
    excerpt:
      "Qué es un timestamp Unix, cómo saber si está en segundos o milisegundos (10 o 13 cifras) y cómo pasarlo a fecha en Excel, Google Sheets, JavaScript y Python. Ejemplo: 1784636109303 es el 21 de julio de 2026.",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    author: "José Gaspard",
    category: "Desarrollo",
    keywords: ["timestamp a fecha", "convertir timestamp unix", "timestamp milisegundos", "epoch a fecha excel", "unix time"],
    estimatedReadMinutes: 5,
    body: `
## La respuesta corta

Un timestamp Unix es el número de segundos que han pasado desde el **1 de enero de 1970 a las 00:00:00 UTC**. Para pasarlo a fecha:

- Si tiene **10 cifras**, está en **segundos** (1700000000 = 14-nov-2023 22:13:20 UTC).
- Si tiene **13 cifras**, está en **milisegundos**: divide entre 1000 primero.

El [conversor de timestamp](/timestamp-converter) de Toolram detecta solo si son segundos o milisegundos y te da la fecha en tu hora local, en UTC y en ISO 8601.

## Ejemplo: 1784636109303

Tiene 13 cifras, así que son milisegundos (es lo que devuelve \`Date.now()\` en JavaScript). Dividido entre 1000: 1784636109.303 segundos.

- **UTC:** 21 de julio de 2026, 12:15:09.
- **Ciudad de México (UTC−6):** 21 de julio de 2026, 06:15:09.

Si lo tratas como segundos sin dividir, sale una fecha del año 58.000, que es la señal típica de este error.

## En Excel y Google Sheets

Excel guarda las fechas como días desde 1900, así que hay que convertir:

- Segundos: **=A2/86400+FECHA(1970,1,1)**
- Milisegundos: **=A2/86400000+FECHA(1970,1,1)**

Luego da formato de fecha y hora a la celda. En el Excel de España el separador es punto y coma: FECHA(1970;1;1). En Excel o Sheets en inglés la función es DATE(1970,1,1). El resultado sale en UTC: para la hora de México resta 6/24.

## En JavaScript y Python

JavaScript trabaja en milisegundos:

\`\`\`
new Date(1784636109303).toISOString()   // "2026-07-21T12:15:09.303Z"
new Date(1700000000 * 1000)             // si viene en segundos
\`\`\`

Python trabaja en segundos:

\`\`\`
from datetime import datetime, timezone
datetime.fromtimestamp(1784636109303 / 1000, tz=timezone.utc)
\`\`\`

## El problema del año 2038

Los sistemas que guardan el timestamp como entero de 32 bits con signo llegan a su máximo en **2147483647**, que es el **19 de enero de 2038 a las 03:14:07 UTC**. Un segundo después, el número se desborda y vuelve a 1901. Los sistemas actuales de 64 bits no tienen ese límite, pero todavía hay bases de datos, firmware y código viejo con campos de 32 bits.

## Segundos, milisegundos y microsegundos

| Cifras | Unidad | Quién lo usa |
|---|---|---|
| 10 | segundos | Unix, PHP time(), Python time.time() entero, muchas APIs |
| 13 | milisegundos | JavaScript Date.now(), Java System.currentTimeMillis() |
| 16 | microsegundos | Algunas bases de datos y logs |

Si no sabes qué te pasaron, cuenta las cifras: es la forma más rápida de no equivocarte.
`,
    faqs: [
      { q: "¿Cómo sé si un timestamp está en segundos o en milisegundos?", a: "Cuenta las cifras. Un timestamp actual en segundos tiene 10 cifras y en milisegundos tiene 13." },
      { q: "¿Qué fecha es el timestamp 1784636109303?", a: "Está en milisegundos y corresponde al 21 de julio de 2026 a las 12:15:09 UTC (06:15:09 en Ciudad de México)." },
      { q: "¿Cómo convierto un timestamp a fecha en Excel?", a: "Si está en segundos: =A2/86400+FECHA(1970,1,1). Si está en milisegundos: =A2/86400000+FECHA(1970,1,1) (en Excel de España, con punto y coma). Después aplica formato de fecha y hora; el resultado está en UTC." },
      { q: "¿Qué pasa en 2038 con el timestamp Unix?", a: "Los sistemas que lo guardan en 32 bits con signo llegan al máximo, 2147483647, el 19 de enero de 2038 a las 03:14:07 UTC, y se desbordan." }
    ]
  }
];
