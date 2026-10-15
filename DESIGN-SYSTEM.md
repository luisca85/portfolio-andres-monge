# Design system · Portfolio Andrés Monge

> **Alcance y límites.** Este documento describe el sistema tal como está implementado en `styles.css` y lo que se pudo leer del Figma `Portfolio-Monge` durante el desarrollo de la home. No reemplaza al Figma. Los componentes de Figma no están vinculados a variables (usan colores sueltos), así que los tokens de código son la referencia más ordenada hoy. Los valores marcados **(propuesta)** no existen en Figma; los marcados **DATO DESCONOCIDO** no están definidos.

## Referencias

| Qué | Dónde |
|---|---|
| Archivo de diseño | Figma `Portfolio-Monge` · https://www.figma.com/design/6ZzqhrhAVtAsoCXgGpB1jh/Portfolio-Monge |
| Home implementada | página `Home - contenido real` · frame `Home v1 - contenido real (8 hitos)` (321:2316) |
| Intro | frame `Animacion 2` (345:5946) |
| Componentes | página `Components` (27:10) |
| Wireframe y mobile | `Wireframe - Home desktop` (351:2467) · `home mobile` (310:2662, sin medir) |
| Documento DS previo | "Design System Andrés Monge" · https://claude.ai/artifact/EWJU8koMWupdz1ASHkAufz |
| Vista navegable | https://claude.ai/artifact/1Mjk1RFZ1nvUqRvDo1FjsW (privada; sin videos) |

## Principios visuales

- **Un solo tema, oscuro.** Fondo negro puro, texto blanco. No hay modo claro.
- **Cine como material.** Escenas de las películas como fondos, grano de película, negativo (blend Difference) y formas del logo usadas como ventanas.
- **Color por tipo de pieza.** El eyebrow de cada card indica el tipo: película, escrito o campaña.
- **Lexend como voz.** Pesos extremos: ExtraLight (200) para texto y Regular (400) para títulos.

## Color

### Tokens de código (`:root` en `styles.css`)

| Token | Valor | Uso | En Figma |
|---|---|---|---|
| `--color-orange` | `#F2994A` | Película, bordes de card, botones, eyebrows de sección | estilo `Orange` |
| `--color-writing` | `#2F80ED` | Eyebrow de escrito | color suelto |
| `--color-campaign` | `#D1AB5E` | Eyebrow de campaña, nombre y overline en About | `palette/gold/400` · **provisorio**, color final DATO DESCONOCIDO |
| `--color-bg` | `#000000` | Fondo de página | estilo `Black` |
| `--color-text` | `#FFFFFF` | Texto | estilo `white` |
| `--color-muted` | `#A1A1AA` | Texto secundario (bio en About) | color suelto |
| `--color-strip` | `#121212` | Franja de premios (al 95 %) | color suelto |
| `--color-footer` | `#050505` | Fondo del footer | color suelto |
| `--color-headshot` | `#2C2C2C` | Placeholder de la foto en About | color suelto |
| `--color-cream` | `#E8DAC8` | Logotipo, íconos y accesos del menú mobile | color suelto |
| `--color-text-inverse` | `#0A0806` | Texto sobre naranja (idioma activo) | `color-text-inverse` |
| `--color-text-secondary` | `rgba(255,255,255,.5)` | Idioma inactivo | `color-text-secondary` |
| `--color-border-subtle` | `rgba(255,255,255,.12)` | Borde del selector de idioma, líneas del menú mobile | `color-border-subtle-white` |
| `--color-bg-overlay-light` | `rgba(0,0,0,.5)` | Fondo del selector de idioma | `color-bg-overlay-light` |

### Transparencias en uso

| Valor | Dónde |
|---|---|
| `rgba(0,0,0,.5)` | Fondo de la card (time-box) |
| `rgba(0,0,0,.7)` + blur 11.35px | Fondo del nav |
| `rgba(255,255,255,.5)` | Títulos inactivos del player, textos del footer, divisor del player |
| `rgba(255,255,255,.3)` | Labels y copyright del footer |
| `rgba(255,255,255,.12)` | Borde superior del footer y línea divisoria |
| `#D9D9D9` + `mix-blend-mode: difference` | Negativo de la mitad izquierda del hero |

### Variables de Figma

Colecciones: **Primitives** (30 colores), **Color** (38 tokens semánticos, modo Default, apuntan a las primitivas), **Spacing** (4 a 120), **Radius** (0, 4, 8, 16, 999). Los nombres y valores de cada token individual no se exportaron al código: ver el documento DS previo.

## Tipografía

Familias (Google Fonts):

| Rol | Familia | Pesos cargados | Token |
|---|---|---|---|
| Display, títulos, cuerpo | **Lexend** | 200, 300, 400, 600, 700 | `--font-display` |
| Interfaz (footer, selector de idioma) | **Inter** | 200, 400, 500 | `--font-ui` |
| Mono (contador del player) | **Courier Prime** | 400 | `--font-mono` |

El logotipo es vectorial (SVG), no tipográfico.

### Estilos de texto de Figma usados en la home

Interlineado expresado como múltiplo; tracking en % del tamaño (−5 % = −0.05em). El Figma tiene 43 estilos en total; acá van los que aparecen en la home.

| Estilo | Familia · peso | Tamaño | Interlineado | Tracking | Dónde |
|---|---|---|---|---|---|
| Display/Hero | Lexend 400 | 100 | 1.245 | −5 % | ANDRES / MONGE |
| Display/XL | Lexend 600 | 56 | normal | 0 | Nombre en About |
| Heading/H1 | Lexend 400 | 36 | 1.245 | −5 % | "Bilingual by birth" |
| Heading/H2 | Lexend 400 | 32 | 0.945 | 0 | Títulos de card, años |
| Heading/H3 ExtraLight | Lexend 200 | 24 | 1.245 | −5 % | Oficios del hero |
| Heading/H3 ExtraLight Loose | Lexend 200 | 24 | 1.245 | 0 | Texto de identidad del hero |
| UI/Nav | Lexend 200 | 20 | normal | +5 % (1px) | Links del nav |
| UI/Label | Inter 500 | 12 | normal | 0 | EN / ES del selector de idioma |
| Display/L | Lexend 400 | 40 | 1.245 | −5 % | Accesos del menú mobile |
| Heading/H4 | Lexend 200 | 20 | 0.943 | 0 | Eyebrows de My Story |
| Heading/H4 Regular | Lexend 400 | 20 | normal | 0 | Bio principal en About |
| Body/Lead | Lexend 400 | 18 | 1.245 | 0 | Botones |
| Body/Large | Lexend 200 | 16 | 1.245 | 0 | Descripciones de card, cuerpo |
| Body/Medium | Lexend 200 | 15 | 1.245 | 0 | Títulos inactivos del player |
| Body/Medium Regular | Lexend 400 | 15 | 1.245 | 0 | Título activo del player, bio secundaria |
| Body/Default Regular | Lexend 400 | 14 | normal | 0 | "Director & Screenwriter" |
| Body/Small | Lexend 400 | 13 | 1.245 | 0 | Eyebrow de card |
| Label/Strong | Lexend 600 | 12 | normal | 0 | Nombre sobre la foto (mayúsculas) |
| Label/Tag Large | Lexend 700 | 13 | normal | 0 | "ABOUT / CONTACT" |
| UI/Body Large | Inter 200 | 16 | 1.5 | 0 | Tagline y mail del footer |
| UI/Body Medium | Inter 200 | 15 | normal | 0 | Links sociales del footer |
| UI/Body Small | Inter 200 | 13 | normal | 0 | Copyright y ubicación |
| UI/Caption | Inter 200 | 12 | normal | 0 | "US & LATAM representation" |
| (labels del footer) | Inter 400 | 14 | normal | +5 % | Labels del footer (mayúsculas) |
| UI/Mono | Courier Prime 400 | 16 | 1.245 | 0 | Contador "1/4" |
| (sin estilo) | Lexend 300 | 10 | normal | 0 | Texto de premios (mayúsculas) |
| (sin estilo) | Lexend 200 · 400 | 40 | 1.245 | −2px | Frase de My Story |

## Layout y espaciado

- **Ancho de diseño:** 1440px (`--page-w`). Márgenes laterales del contenido: 189 a 202px según sección.
- **Fila de la timeline:** `Col 570 | Spine 120 | Col 570`, padding lateral 90px. La columna izquierda alinea a la derecha y la derecha a la izquierda; la spine lleva el año y la línea.
- **Regla de contenido:** en una película, el lado opuesto a la card muestra un play box. En un escrito, el lado opuesto queda vacío. Los hitos más recientes van últimos.
- **Padding vertical de cada año:** 80px (`--year-pad-y`; en Figma 32px).
- **Card (time-box):** padding 32, gap 16 (texto ↔ botón), gap 8 (bloque título ↔ descripción), gap 4 (eyebrow ↔ título). Ancho 363px (5 Sentidos: 404px en Figma).
- **Botón:** padding 8, gap 8 (texto ↔ flecha 24px).
- **Alturas de referencia:** nav 97 · hero 823 · franja de premios 156 · My Story 499 · About 650 mín.
- **Escala de Spacing en Figma:** 4 a 120. **Radius:** 0, 4, 8, 16, 999 (en la home solo se usa 16, en la foto de About).

## Efectos

| Efecto | Valor | Dónde |
|---|---|---|
| Blur de fondo | `backdrop-filter: blur(11.35px)` | Nav |
| Negativo | capa `#D9D9D9` en `difference` | Mitad izquierda del hero; se disuelve cuando arranca el video |
| Degradé inferior | negro → transparente, 50 % de alto (`--hero-fade-h`) | Hero |
| Sombra de nombres | `--hero-name-shadow: 0 2px 28px rgba(0,0,0,.35)` | ANDRES / MONGE |
| Sombra de textos | `--hero-text-shadow: 0 1px 14px rgba(0,0,0,.55)` | Oficios y player |
| Sombra de identidad | `--hero-identity-shadow: 0 1px 3px rgba(0,0,0,.6), 0 2px 22px rgba(0,0,0,.8)` | Texto "Bilingual writer…" |
| Oscurecimiento de años | `--year-overlay: .78` (imagen, vía `brightness`) · `--year-overlay-gradient: .45` (degradé) | Fondos de la timeline |
| Degradé de años sin imagen | `linear-gradient(#4A3A2A 0%, #241B14 39.286%, #0A0806 71.429%)` a 154.7° (2025) y 138.1° (2026) | 2025 y 2026 |
| Sombra entre años | `--year-shadow: 0 -4px 10px rgba(0,0,0,.35), 0 -28px 60px rgba(0,0,0,.425)` | Borde superior de cada año y de About |
| Grano | ruido SVG en grises · años: 14 %, 160px · hero: 75 %, 120px, modo overlay | Fondos y video |
| Efectos en Figma | Shadow/Soft, Shadow/Strong, Blur/Background Medium y Large, Blur/Layer | Valores no exportados |

## Estados

| Componente | Estado | Valor | Origen |
|---|---|---|---|
| Botón primario y secundario | hover | fondo `rgba(51,51,51,.3)` (`--button-hover-bg`), transición .25s | Figma `button, state=hover` |
| Card (time-box) | hover / foco | sube 6px, fondo `rgba(0,0,0,.72)`, sombra `0 18px 40px rgba(0,0,0,.45)`, el botón toma su hover; toda la card es clickeable | **(propuesta)** |
| Play box | hover | imagen escala 1.04, ícono de play escala 1.1 | **(propuesta)** |
| Links del nav y footer | hover | color naranja | **(propuesta)**, no definido en Figma |
| Título del player | hover / activo | blanco; activo en peso 400 | **(propuesta)** |
| Foco de teclado | `:focus-visible` | outline 1px naranja, offset 4px | **(propuesta)** |
| Botón | foco, deshabilitado | DATO DESCONOCIDO | Pendiente en Figma |
| Idioma inactivo | hover | blanco | **(propuesta)** |
| Acceso del menú mobile | hover / foco | la flecha se corre 4px | **(propuesta)** |

## Componentes

| Componente | Figma | Clases | Notas |
|---|---|---|---|
| Nav desktop | `Nav=desktop` 83:452 | `.nav`, `.nav__links`, `.nav__right` | Fijo arriba, 97px. Links con gap 16: The Book, Film & video, Writing, About, Contact |
| Selector de idioma | `lang-selector` 421:2560 | `.lang`, `.lang__option` | EN / ES. Activo: fondo naranja, texto `#0A0806`. Por ahora no traduce el contenido |
| Nav mobile | `Nav=mobile` 180:5047 | `.nav` (≤ 900px), `.logotype--small`, `.nav__toggle` | 66px, padding 16, logotype small, ícono de menú 24px |
| Menú mobile | `Menú mobile abierto` 420:2685 | `.mobile-menu`, `.mobile-menu__item` | Pantalla negra bajo la cabecera; accesos de 100px con línea superior, Lexend 40 crema y flecha 28px; ícono de cerrar |
| Logotype | `logotype` 178:2687 | `.logotype` | Isotipo (2 SVG superpuestos) + ANDRES / MONGE / PROJECTS en SVG |
| Hero | `hero 2` 129:1886 | `.hero`, `.hero__half`, `.hero__name`, `.hero__roles`, `.hero__identity` | Dos mitades con la misma película |
| Player | `Player` 90:901 | `.player`, `.player__item` | Contador mono, divisor, 4 títulos |
| Awards strip | `awards-strip` 121:1429 | `.awards-strip` | 6 premios, `space-between` |
| Award box | `award-box` 342:5437 | `.award` | Laurel 39.95px + texto 10px; ancho por instancia (`--award-w`) |
| Time-box (card) | `time-box` 83:702 | `.time-box`, `--writing`, `--campaign` | Variantes left/right en Figma; en código el lado lo da la columna |
| Button | `button` 83:744 | `.button`, `.button--secondary` | Primario naranja, secundario blanco; flecha 24px |
| Play box | `Play box` 83:618 | `.playbox` | Imagen recortada + ícono de play 71×72 centrado |
| Spine | (dentro de Row) | `.spine`, `.spine__line` | Año + línea SVG rotada 90° con bullets redondos |
| Línea con bullets | (código) | `.dot-line` | Trazo de 1px con bullet redondo de 5.33px en cada punta; largo `--dot-line-h`. My Story (70px) y timeline mobile (50px). Reemplaza la flecha con rombo del Figma |
| About / Contact | 321:2379 | `.about` | Foto 380×480, radio 16 |
| Footer | `footer` 83:513 | `.footer` | Marca + Inquiries + Directory + línea + fila inferior |

Problemas abiertos del componente time-box en Figma: las variantes left/right mezclan lado y tipo (anchos 363 y 356), la propiedad se llama "Property 1", el tipo "secundary" del botón está mal escrito, faltan variantes de campaña y de hover.

## Assets (`assets/`)

| Archivo | Tamaño nativo | Uso |
|---|---|---|
| `logo-mark-a.svg`, `logo-mark-b.svg` | 26.3×48.1 · 27.1×48.9 | Isotipo del nav y footer |
| `logo-andres.svg`, `logo-monge.svg`, `logo-projects.svg` | 67.8 · 60.6 · 86.4 de ancho | Palabras del logotype |
| `hero.png` | 1417×752 | Fondo del hero (película inicial) y tira 2 de la intro |
| `year-2020.png` | 1408×752 | Fondo 2020 y play box de Romano Honorario |
| `year-2022.png` | 1434×584 | Fondo 2022 y play box de 5 Sentidos |
| `year-2023.png` | 1417×589 | Fondo 2023 y play box de Silent Pain |
| `nahuel.png` | 1449×784 | Play box de Nahuel |
| `wreath.png` | 512×512 | Laurel de premios |
| `icon-play.svg` | 71×72 | Ícono de play en play box |
| `icon-play-small.svg` | 24×24 | Sin uso (en Figma queda tapado por la imagen) |
| `icon-arrow-orange.svg`, `icon-arrow-white.svg` | 24×24 | Flecha de botones |
| `my-story-line.svg` | 72.9×5.8 | Sin uso: la línea de My Story ahora es `.dot-line` (bullets redondos) |
| `spine-*.svg` | largo según año | Líneas de la timeline (se rotan 90°). En `spine-2026a` y `spine-2026c` el rombo de una punta se cambió por un bullet redondo, a pedido |
| `player-divider.svg` | 356×1 | Divisor del player |
| `footer-line.svg`, `footer-dot.svg` | 1042×1 · 4×4 | Línea y punto del footer |
| `intro/logo-*.svg` | isotipo 94.3×171.7 y 91.4×169.3; palabras 181.9 · 231.8 · 162.5 | Logo de la intro (versión grande) |
| `intro/strip-h1.svg`, `strip-v2.svg`, `strip-v3.svg` | 1314×254 | Máscaras de las tiras de la intro (9 formas del logo) |
| `intro/still-a.png`, `intro/still-b.png` | 1421×587 · 1415×576 | Escenas que se ven por las tiras |

La película a la que pertenece cada imagen fija se dedujo de su ubicación en la timeline del Figma; no está confirmado (DATO DESCONOCIDO).

## Responsive

- **≥ 1241px:** diseño de Figma.
- **≤ 1240px:** hero con márgenes de 64px y nombres a 72px; filas con padding 32px.
- **≤ 900px (provisorio):** nav mobile con menú desplegable (Figma), hero apilado, timeline en una columna con la misma superposición por scroll que en escritorio (padding de cada año 32px; 16px entre el año y su contenido y entre las partes de una obra; en cada película el orden es premios → video → cuadro; entre el año y la primera obra y entre obras, línea de 50px con bullets redondos y 24px arriba y abajo: variables `--m-pad-year`, `--m-gap-obra`, `--m-gap-entre`, `--m-divider-h`), About apilado, footer apilado.
- No hay diseño mobile medido: `home mobile` (310:2662) está pendiente.

## Accesibilidad

- `prefers-reduced-motion`: sin intro, sin video, sin superposición por scroll; todo aparece sin animar.
- Foco visible en naranja. Toda la card es clickeable pero el foco cae en su botón.
- Oficios animados ocultos para lectores de pantalla (`aria-hidden`); se lee una lista fija.
- Pendiente: contraste de los títulos inactivos del player (blanco al 50 %) sobre zonas claras de la película.
