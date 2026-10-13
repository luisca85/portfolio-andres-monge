# Contexto del proyecto: portfolio web de Andrés Monge

Documento para continuar el trabajo en Claude Code. Fecha de corte: 2026-10-12. Lo que no figura acá es DATO DESCONOCIDO y no se debe inventar.

## 1. Quién es quién

- Usuario: Luis Carlos Romero León, UX/UI designer independiente, Argentina. Escribe en español rioplatense con voseo.
- Cliente: Andrés Monge, cineasta y escritor bilingüe. El sitio es su portfolio.
- Sesiones anteriores: Project de claude.ai "Portafolio monge" (docs `claude/contenido-andres-monge.md`, `claude/ds-playbox-timebox.md`, `claude/tokens.css`).

## 2. Reglas de trabajo de Luis (cumplirlas siempre)

1. Basarse solo en la información de las capturas que dio. No suponer ni inventar datos. Usar exactamente la información dada. Fuente única: `contenido-andres-monge.md`.
2. Control epistémico: si falta un dato, escribir "DATO DESCONOCIDO: [punto]". Poner los límites y fallas en la primera línea, antes del análisis. El tono debe corresponder a la certeza real.
3. Español estándar (no de España), voseo con Luis. Sin rayas largas (em dashes) en textos en español. Copy del sitio en español.
4. Prefiere texto plano a widgets para revisar documentos. Prefiere co-creación iterativa y encuadre directo y accionable.
5. Cuando dice "por ahora no apliques nada", solo analizar y reportar.
6. Reglas de contenido: en una película, el lado opuesto a la card muestra un player o vista previa. En un escrito, solo aparece la card y el lado opuesto queda vacío. Los hitos más recientes van últimos.

## 3. Figma

- Archivo: `Portfolio-Monge`, key `6ZzqhrhAVtAsoCXgGpB1jh` (https://www.figma.com/design/6ZzqhrhAVtAsoCXgGpB1jh/Portfolio-Monge).
- Páginas: `op1`, `Mockups` (originales con el contenido Pacaembu, no tocar), `Diseños actualizados`, `Components` (27:10), `Home - contenido real` (307:1984).
- En `Home - contenido real`:
  - `Home v1 - contenido real (8 hitos)` 321:2316. Es la home con los 10 contenidos reales que Luis ajusta a mano.
  - `Wireframe - Home desktop` 351:2467, creado el 2026-10-12 (nav, hero dividido, awards, timeline, about, footer, con placeholders).
  - `home mobile` 310:2662.
  - `Animacion 2` 345:5946: origen DATO DESCONOCIDO.
- Home v1: estructura de la timeline en 321:2322 (awards-strip, My Story, secciones Year 2020/2022/2023/2025/2026 con filas Col 570 | Spine 120 | Col 570, about-contact, footer aparte).
- Cards (instancias de time-box) en Home v1: Romano 321:2540, 5 Sentidos 321:2567, Silent Pain 321:2594, Nahuel 321:2619, Fashion 334:5355, Neurodivergent 321:2640, Us vs. Them 334:5368, Outside the Wake 321:2681, When Nationalism 340:1538, El Guardaparques 340:1552.
- Componentes (página Components): Nav=desktop 83:452, Nav=mobile 180:5047, footer 83:513, Play box 83:618, Imagenes 83:658, time-box 83:702, button 83:744, Player 90:901, awards-strip 121:1429, award-box 342:5437, hero 2 129:1886, logotype 178:2687, logo 178:2707.
- Nav del Figma: logotype y 5 links: Branded content, Film & video, Writing, About, Contact.

### Notas técnicas de la API de Figma

- Cargar la skill `figma-use` antes de cada `use_figma`. Devolver siempre los IDs con `return`.
- Una sola `setCurrentPageAsync` por llamada. Esperar toda promesa.
- Antes de cambiar `characters`, cargar fuentes con `figma.loadFontAsync` para cada segmento de `getStyledTextSegments(['fontName'])`.
- `layoutSizingHorizontal/Vertical` HUG y FILL solo se pueden fijar después de `appendChild` en un padre con auto layout. `resize()` resetea a FIXED.
- Un script que falla a mitad no deja cambios.
- `get_screenshot` a veces devuelve un render viejo justo después de editar. `node.screenshot()` dentro de `use_figma` devuelve la imagen inline.
- Valores mixtos (`figma.mixed`) rompen la conversión a texto: protegerlos.

## 4. Design System (tomado del Figma)

Detalle completo en "Design System Andrés Monge" (https://claude.ai/artifact/EWJU8koMWupdz1ASHkAufz) y en `tokens.css`.

- Colecciones de variables: Primitives (30 colores), Color (38 tokens semánticos, modo Default), Spacing (4 a 120), Radius (0, 4, 8, 16, 999).
- Fuentes: Lexend (display, títulos, cuerpo), Inter (interfaz), Courier Prime (mono). 43 estilos de texto. Lexend: peso mínimo ExtraLight. Logotipo vectorial.
- Efectos: Shadow/Soft, Shadow/Strong, Blur/Background Medium y Large, Blur/Layer.
- Colores por tipo de pieza (eyebrow del time-box): película #F2994A, escrito #2F80ED, campaña DATO DESCONOCIDO (provisorio #D1AB5E, palette/gold/400).
- Los componentes no están enlazados a variables (colores sueltos, incluidos #050505 y #333333).
- Time-box: padding 32, gap 16, fondo #000000 al 50%, borde #F2994A. Texto: eyebrow, título, descripción, botón.
- Problemas abiertos: variantes left/right del time-box mezclan lado y tipo (anchos 363 y 356), propiedad "Property 1", "secundary" mal escrito, faltan variantes de campaña, imágenes de Nahuel y El Guardaparques, foco y deshabilitado del botón.
- Propuesta pendiente de aprobación: propiedad `type` (film, writing, campaign) en time-box, ancho fijo 363, propiedades de texto, variables semánticas por tipo.

## 5. Contenido

Fuente única: `contenido-andres-monge.md` (10 hitos transcritos de capturas).

- 2020: Romano Honorario. 2022: 5 Sentidos. 2023: Silent Pain y Nahuel. 2025: Neurodivergent Students Aren't Broken, the System Is (escrito) y Fashion Design and Campaign (The Book). 2026: Us vs. Them, Outside the Wake, When Nationalism Becomes a Trend (escritos) y El Guardaparques (película en postproducción).
- YouTube: Romano -ETgsrVfcU4, 5 Sentidos ZeUtnoE-9aY, Nahuel uoE--jaxy3g, Silent Pain AoQZPk6PI6E (letras ambiguas I/l, verificar). El Guardaparques no tiene enlace.
- Premios: Romano, Award Winner en Berlin Shorts Festival y Las Vegas Shorts Film Festival. 5 Sentidos, ganador de Best Student Short/Film en WorldFest-Houston International Film Festival, Reality Bytes Independent Student Film Festival, Phoenix Shorts Film Festival y Las Vegas Short Film Festival. Las dos Las Vegas figuran con nombre distinto: no asumir que son el mismo festival.
- No figura en las capturas: "Tomá el Turno" (campaña de El Guardaparques). No usarlo sin verificar.
- Orden dentro de un mismo año (2023, 2025, 2026): DATO DESCONOCIDO. El orden usado hasta ahora es una suposición.

## 6. Estructura de la home

1. Nav: logo y 5 links de secciones.
2. Hero: video de fondo (Romano Honorario) con máscara que lo parte en dos. Mitad izquierda con blend mode Difference, mitad derecha normal. Izquierda: "Andrés" y dos oficios. Derecha: "Monge" y otros dos oficios. Oficios: DATO DESCONOCIDO. Abajo a la izquierda, player para cambiar la película de fondo (5 Sentidos, Nahuel, Romano Honorario, Silent). Sobre la izquierda, texto corto de identidad (DATO DESCONOCIDO).
3. Franja de awards, lista horizontal de premios.
4. Timeline: My Story (fondo negro, bienvenida y dato de nacimiento, textos DATO DESCONOCIDO), años 2020, 2022, 2023, 2025, 2026. Cada año es una sección con fondo de una escena de la película (imagen estática).
5. About/Contacto: foto a la izquierda y datos a la derecha.
6. Footer.

- Animación de scroll (Figma `Anotaciones - scroll por año`): al bajar, cada año se superpone sobre el siguiente; al subir, se devuelve.

## 7. Maqueta HTML (`home-monge.html`)

Artefacto: https://claude.ai/artifact/27NyUa32MbnQMfeqo1u6n3. Un solo archivo HTML/CSS/JS, sin dependencias salvo Google Fonts (Lexend, Inter).

- Hero: dos mitades que entran (izquierda desde abajo, derecha desde arriba, 1.1 s, `cubic-bezier(.77,0,.18,1)`). Mitad izquierda con capa blanca `mix-blend-mode: difference`. ANDRÉS y MONGE con máscara a +0.75 s, oficios a +1.35 s, player a +1.6 s. Tiempos de referencia.
- Video: placeholder animado en CSS. Arreglo `FILMS` con id de YouTube y `src` vacío; con un mp4 en `src` se reproduce en ambas mitades. Falta el mp4 de Romano Honorario.
- Player: 4 botones que cambian la película con fundido.
- Timeline: años `position: sticky; top: 0`. Cards con color de eyebrow por tipo. Películas con `playbox` al lado opuesto; escritos no.
- Placeholders `[ ]`: logo, links del nav, oficios, texto del hero, premios, My Story, About, footer.
- Respeta `prefers-reduced-motion`.
- Sin validar visualmente en navegador.

## 8. Estado y pendientes

Hecho: DS documentado, `contenido-andres-monge.md`, Home v1 con 10 hitos, wireframe de la home, maqueta HTML con animación del hero, `tokens.css`.

Decisiones pendientes de Luis:

- Color de campaña (The Book).
- Si The Book lleva media al lado opuesto.
- Si el laurel de 5 Sentidos incluye "Best Student Short/Film".
- Si El Guardaparques lleva player o placeholder.
- Los 4 oficios, texto de identidad, textos de My Story y About, foto y datos de contacto.
- Orden dentro de 2023, 2025 y 2026.
- Aprobar la propuesta de componentes del DS.

Ajustes ofrecidos en espera ("por ahora no apliques nada"):

- Unificar tamaños de Play box y pasar bloques fijos a automático en Home v1.
- Cerrar el hueco de 19 px entre la timeline y el footer.
- Marcar el contenido de ejemplo con "[TEXTO PENDIENTE]".

Fases siguientes (no empezadas):

1. Vincular componentes del DS a variables y aplicar la propuesta.
2. Páginas Film & Video, The Book, Writing y de detalle, con contenido real.
3. Versión mobile de la home (`home mobile` 310:2662 sin medir).
4. Animaciones para desarrollo: hero y superposición por scroll.
5. Reemplazar imágenes de fondo por las finales.

## 9. Archivos de esta carpeta

- `CONTEXT.md`: este documento.
- `contenido-andres-monge.md`: transcripción verbatim de los 10 hitos (fuente única de contenido). FALTA COPIAR.
- `tokens.css`: variables y clases de texto del DS. FALTA COPIAR.
- `home-monge.html`: maqueta de la home. FALTA COPIAR.
