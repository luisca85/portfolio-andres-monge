# Cambios para desarrollo · 22 y 23 de octubre de 2026

Relación de los cambios hechos entre el 22 y el 23 de octubre, pensada para quien tiene que pasarlos al sitio. Está ordenada por tipo de cambio: páginas, navegación, contenido, tipografía e interfaz. El detalle técnico de cada cambio está en [CHANGELOG.md](CHANGELOG.md).

- **Repositorio:** https://github.com/luisca85/portfolio-andres-monge (rama `main`).
- **Punto de partida:** commit `b9ca4ad` (16 de octubre). Todo lo que sigue está en el commit del 23 de octubre.
- **Demo para revisar:** https://quiet-travesseiro-97fa3a.netlify.app/ (Netlify).
- **Diseño:** Figma `Portfolio-Monge` (https://www.figma.com/design/6ZzqhrhAVtAsoCXgGpB1jh/Portfolio-Monge). Cada página indica su nodo de Figma en un comentario del HTML.
- **Idiomas:** las páginas de la raíz son la versión en inglés. Las de `es/` se generan con `node tools/build-es.mjs` y no se editan a mano.

---

## 1. Páginas nuevas

Todas existen en inglés (raíz) y en español (`es/`). Ninguna tiene diseño mobile en Figma: la versión mobile es una propuesta del código.

| Página | Archivo | Figma | Estilos |
|---|---|---|---|
| Galería de campañas (The Campaigns) | `campaigns.html` | 655:3679 | `films.css` |
| Detalle de campaña: Fashion Design and Campaign | `campaign-fashion.html` | 590:2331 (mobile 606:5741) | `campaign.css`, `campaign.js` |
| Galería de películas (The Films) | `films.html` | 178:949 | `films.css` |
| Detalle de película: 5 Sentidos | `film-5-sentidos.html` | 610:1344 | `campaign.css`, `campaign.js` |
| Detalle de película: Nahuel | `film-nahuel.html` | 610:1344 | ídem |
| Detalle de película: Silent Pain / Mime | `film-silent-pain.html` | 610:1344 | ídem |
| Detalle de película: Romano Honorario | `film-romano-honorario.html` | 610:1344 | ídem |
| Listado de escritos (The Writing) | `writing.html` | 658:2599 | `writing.css` |
| Detalle de escrito: When Nationalism Becomes a Trend | `writing-nationalism.html` | 655:3884 | `writing.css` |
| Detalle de escrito: Neurodivergent Students… | `writing-neurodivergent.html` | 655:3884 | ídem |
| Detalle de escrito: Us vs. Them | `writing-us-vs-them.html` | 655:3884 | ídem |
| Detalle de escrito: Outside the Wake | `writing-outside-the-wake.html` | 655:3884 | ídem |

**Plantilla reutilizable:** `templates/campaign-detail.html` es el detalle de campaña con textos de ejemplo y los pasos para crear una campaña nueva. No se publica tal cual. Su estructura está documentada en [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md), sección Templates.

---

## 2. Navegación

**Nav superior y menú mobile** (en todas las páginas):

| Antes | Ahora (EN) | Ahora (ES) | Lleva a |
|---|---|---|---|
| The Book | The Campaigns | Campañas | `campaigns.html` |
| Film & video | The Films | Películas | `films.html` |
| Writing | The Writing | Escritos | `writing.html` |
| About | About | Sobre mí | `index.html#about` |
| Contact | (se quita) | (se quita) | |

- **Página actual:** el link de la sección en la que está el usuario va en naranja (`aria-current="page"`).
- **About desde otra página:** la home ahora acepta el ancla `#about`. Si la URL la trae, no se muestra la intro y la página arranca en la sección About, debajo del nav. Cualquier otro ancla se sigue limpiando y la home arranca en el hero. Cambios en el `<head>` de `index.html` y al principio de `script.js`.
- **Migas:**
  - Detalles de película: Home / The Films / película.
  - Detalle de Fashion: Home / The Campaigns.
  - Detalles de escrito: The Writing / ensayo.
  - En todos los casos la página actual va en ámbar y sin link.

**Links nuevos desde la home:**
- Botón "Watch the short" de cada película: lleva a su página de detalle (antes iba a YouTube). Las imágenes con play de la timeline siguen yendo a YouTube.
- Botón "View the project" de Fashion: lleva a `campaign-fashion.html`.
- Botón "Read the essay" de los cuatro escritos: lleva a su página de detalle.

**Entre páginas:**
- Las películas se enlazan con "Newer / Older" en este orden: Nahuel, Silent Pain / Mime, 5 Sentidos, Romano Honorario.
- Los escritos se enlazan con "← Previous / Next →" en el orden del listado: Neurodivergent, Us vs. Them, Outside the Wake, When Nationalism.

---

## 3. Contenido

### Home
- **Texto del hero** (Figma 321:2400). Reemplaza al texto anterior con dos opciones ("Alternate: …"):
  > I'm a Costa Rican writer and creator working in English and Spanish. Writing is the foundation of my work: a way to explore ideas, build characters, and develop a point of view.
- **Sección About** (Figma 321:2379):
  - Bio principal: el mismo texto del hero.
  - Bio secundaria: dos párrafos nuevos ("My work takes different forms…" y "Whether I'm developing an original story…").
  - Sale la mención al BFA en SCAD (2028) y a "Work-eligible in the United States".
  - El overline sigue siendo "ABOUT / CONTACT" / "SOBRE MÍ / CONTACTO".
- **El Guardaparques:** sin el botón "View the project". En su lugar va la etiqueta "Coming soon" / "Próximamente" (ver Interfaz).

### Fuente del contenido nuevo
- **Películas y Fashion:** rol, descripción, premios y videos de [CONTENIDO.md](CONTENIDO.md) (lo que mandó Andrés).
- **Sinopsis de las 4 películas:** provisionales, redactadas a partir de las escenas que describe el Master Brief. Están marcadas en CONTENIDO.md como pendientes de aprobación de Andrés.
- **Escritos:**
  - Las citas y aperturas de Outside the Wake y When Nationalism son textuales del Master Brief (sección D.5), no del sitio publicado ni del Figma, que tienen pequeñas diferencias.
  - Las bajadas (deks) de esos dos ensayos son textos nuevos del brief.
  - Neurodivergent y Us vs. Them no tienen texto del ensayo: en el detalle, la cita y el cuerpo van en **lorem ipsum provisorio**. En el listado solo se muestra su descripción.
- **The Campaigns:** el eyebrow y la bajada son los del Figma 655:3679.
- **Fashion:** las 14 fotos de la galería salen de la carpeta `images_campaña`, optimizadas en `assets/campaign/fashion/` (1600px y miniaturas de 420px).

### Datos que faltan (se muestran como "To confirm" / "A confirmar")
- **Fashion:** categoría, idioma y crédito de fotografía. No hay video del proyecto: se muestra un placeholder.
- **Películas:** dirección de fotografía y elenco de las cuatro, e idioma de 5 Sentidos y Romano Honorario.
- **Escritos:**
  - Extensión de When Nationalism, Neurodivergent y Us vs. Them.
  - "Reads as" de Neurodivergent y Us vs. Them.
  - Texto completo de los cuatro ensayos.
- **Fechas a confirmar con Andrés:** When Nationalism figura como diciembre de 2025 en el brief y como 2026 en CONTENIDO.md. Se usó diciembre de 2025.
- **Links:** LinkedIn sigue apuntando a `#`. El ID de YouTube de Silent Pain no está verificado (I/l ambiguas).

### Español
- Las traducciones están en `tools/es.mjs`. Todo lo nuevo de esta tanda está pendiente de aprobación.
- Quedan en inglés también en la versión en español:
  - Los roles ("Writer, Director & Producer").
  - Los nombres de festivales y de cursos.
  - Las citas y aperturas de los ensayos (texto del autor, marcado con `lang="en"`).
  - El lorem ipsum.

---

## 4. Tipografía y fuentes

### Figma (ya aplicado el 23 de octubre)
- **Lexend pasa a ser la única familia.** Los estilos que estaban en Inter ahora son Lexend con el mismo peso. Solo **UI/Mono** (el contador "1/4" del player del hero) sigue en Courier Prime.
- **Estilos de body unificados:**

  | Estilo eliminado | Reemplazo |
  |---|---|
  | UI/Body Large | Body/Large |
  | Body/Large Tight | Body/Large |
  | UI/Body Large Regular | Body/Large Regular |
  | UI/Body Medium | Body/Medium |
  | UI/Body Default | Body/Default |

  - Además, UI/Caption pasa a llamarse Body/Caption y UI/Body Small pasa a llamarse Body/Small Light.
- **Interlineado 1.5** en todos los estilos Body/*.
- **Estilos eliminados por no tener uso:** UI/Button, UI/Overline, UI/Overline Large, Display/L ExtraLight, Heading/H2 ExtraLight, Heading/H2 Strong y Heading/H2 Display.
- El archivo pasó de 43 a 31 estilos de texto.

### Código: pendiente de alinear con Figma
El código todavía no refleja la unificación de Figma. Cambios a hacer:

1. **Inter → Lexend.** El token `--font-ui` (Inter) se usa en:
   - `styles.css`: selector de idioma (línea ~158) y footer (línea ~819).
   - `campaign.css`: etiquetas `.label`, eyebrow `.campaign__eyebrow`, etiquetas de la ficha `.facts dt`, miniatura "+N", contador de la galería `.gallery__range`, número de sección `.step__num` y `.pager__label`.

   Lo más simple es cambiar `--font-ui` a Lexend en `:root` y revisar pesos (Inter Extra Light → Lexend ExtraLight) y anchos, porque Lexend es más ancha. Después se puede quitar Inter del `<link>` de Google Fonts de cada página.
2. **Interlineado 1.5 en texto corrido** (equivalente a Body/*). Hoy hay textos con 1.245, por ejemplo `.time-box__desc`, `.facts dd`, `.step__text` y `.about__lead`. No aplica a títulos ni a Display/Heading.
3. **Interlineados de 0.943 del Figma en textos de varias líneas:** en Lexend se pisan las líneas. En el código se usó 1.25 (bajada de The Writing, descripción, cita y apertura de las filas de ensayo). Mantener ese criterio.
4. **Pacaembu** (en los mockups 178:949 y 655:3679): se reemplazó por Lexend. No hay que cargarla.

---

## 5. Elementos de interfaz nuevos o modificados

| Elemento | Dónde | Notas |
|---|---|---|
| Galería de fotos | Detalle de campaña | Imagen grande + miniaturas. Páginas de 5 en escritorio y 3 en mobile; "+N more" y flechas pasan de página; flechas del teclado cambian de imagen. La imagen grande se muestra entera (`contain`), no recortada como en el Figma. `campaign.js` |
| Video con póster | Detalles de película | Póster + play de 100px (`assets/film/play-100.svg`). Al hacer clic se reemplaza por el video de YouTube (`youtube-nocookie`, con sonido). `campaign.js` |
| Placeholder de video | Detalle de Fashion | Recuadro 16:9 #1a1a1a con play, sin acción, leyenda "Video to confirm" |
| Card de película o campaña (`film-card`) | The Films, The Campaigns | Borde naranja, póster 508×268, título, tipo, año, descripción y link. Hover (propuesta): sube 6px, sombra y zoom leve del póster. Componente en Figma: 618:3466 |
| Fila de ensayo (`essay-row`) + etiqueta (`tag`) | The Writing | Número, tipo, etiquetas, título, descripción, cita y apertura opcionales, link. Componentes en Figma: 657:1296 y 657:1294 |
| Laureles en el detalle | Detalles de película | Reutiliza `.award` de la home |
| Ficha de datos | Detalles de campaña, película y escrito | 5 columnas (4 en escritos); 2 columnas en mobile |
| Anterior / siguiente | Detalles de campaña, película y escrito | Círculos de 40px con flecha (44px en mobile) en campaña y película; texto "← Previous / Next →" en escritos |
| Botón relleno `.button--filled` | Sección About (home) | Fondo naranja y texto oscuro, con el mail hello@andresmonge.com (abre el correo) y flecha oscura `assets/icon-arrow-dark.svg`. Reemplaza al botón "Résumé (PDF)". El hover (naranja más claro) es una propuesta |
| Etiqueta de estado `.status-tag` | Cuadro de El Guardaparques (home) | "Coming soon" / "Próximamente", naranja con texto oscuro, alineada a la derecha donde iba el botón. Propuesta: no está en Figma |
| Encabezado de The Campaigns | `campaigns.html` | Eyebrow naranja, título de 100px y bajada en `mix-blend-mode: difference`; degradé negro sobre la foto de fondo |
| Footer mobile en páginas internas | Detalles y galerías | Links de Directory en una fila (Figma 606:5741) |

---

## 6. Assets nuevos

- `assets/campaign/fashion/`: 14 fotos de la campaña y sus miniaturas.
- `assets/film/play-100.svg` y `assets/film/arrow-forward-16.svg`: play y flecha de los detalles de película.
- `assets/icon-arrow-dark.svg`: flecha oscura del botón relleno.
- La carpeta `images_campaña/` (originales, unos 130 MB) no está en el repositorio: se agregó al `.gitignore`.

---

## 7. Herramientas

- `tools/build-es.mjs` ahora genera todas las páginas listadas en `PAGES`. Al agregar una página nueva, sumarla ahí.
- `tools/i18n.mjs` también traduce los atributos `alt`.
- `tools/es.mjs` tiene el diccionario y la lista `keep` de textos que no se traducen. Si falta una traducción, el script lo avisa y no genera los archivos.

---

## 8. Publicaciones

- **Demo (Netlify):** https://quiet-travesseiro-97fa3a.netlify.app/ . Es la que se usa para revisar: tiene todas las páginas, en inglés y en español, y los videos de YouTube se reproducen.
- **GitHub:** https://github.com/luisca85/portfolio-andres-monge, rama `main`, actualizado el 23 de octubre.
- **No subir a producción** la carpeta `images_campaña/` (originales); está en el `.gitignore`.
