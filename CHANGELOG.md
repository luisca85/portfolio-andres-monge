# Registro de cambios · Home Andrés Monge

Versiones de la home en orden inverso (la más reciente primero). Cada versión indica su commit en GitHub (https://github.com/luisca85/portfolio-andres-monge).

**Dónde está publicada cada versión hoy (2026-10-23)**

| Canal | Versión que muestra |
|---|---|
| Demo en Netlify (https://quiet-travesseiro-97fa3a.netlify.app/) | La del 23 de octubre: todas las páginas, EN y ES. Es la demo de referencia |
| GitHub `main` | Este commit (23 de octubre) |
| Link en claude.ai (https://claude.ai/artifact/1Mjk1RFZ1nvUqRvDo1FjsW) | Versión del 23 de octubre sin The Writing, About ni Contact, sin The Campaigns |

Resumen para desarrollo de los cambios del 22 y 23 de octubre: [CAMBIOS-DESARROLLO-2026-10-22-23.md](CAMBIOS-DESARROLLO-2026-10-22-23.md).

---

## 2026-10-28 · Detalle de película con detrás de escena (5 Sentidos y Romano Honorario)

- **Nueva tipología de página**: el detalle de película (Figma 610:1344) suma la sección **"Galería y videos detrás de escena"** (Figma 679:2063), después de los créditos. Se usa en `film-5-sentidos.html` y `film-romano-honorario.html` (EN y ES); Nahuel y Silent Pain siguen sin galería.
- **Galería con fotos y videos** (misma lógica de la galería de campaña, `campaign.js`): imagen principal con etiqueta "Video · Behind the scenes" / "Photo · Behind the scenes" y botón de play de 72px; miniaturas de 180×120 con etiqueta Video / Photo; paginación. Al hacer play, el video se reproduce en el mismo lugar (con controles); al elegir otra miniatura se detiene.
- **Material**: carpeta `Portafolio_Monge/Detras de escenas`. Por película: 2 videos y 3 fotos (distribución de fotos confirmada por Luis). Optimizados en `assets/film/bts/`:
  - Videos: de HEVC .mov a **MP4 H.264 960×540** (el HEVC no se reproduce en varios navegadores); 10 a 23 MB cada uno, ~72 MB en total. `preload="none"`: se descargan recién al darles play. Póster de cada video generado del primer fotograma.
  - Fotos: JPG de hasta 1600px (sin agrandar las más chicas) y miniaturas de 420px.
- Íconos del Figma: `assets/film/icon-video-14.svg`, `icon-video-12.svg`, `icon-image-12.svg`, `play-72.svg`.
- Textos de la sección: el Figma tiene textos de ejemplo de campaña; se usó "Behind the scenes: photos & videos" / "Galería y videos de detrás de escena" y "Photos and videos from the set." / "Fotos y videos del rodaje." (pendiente de aprobación).
- `tools/build-es.mjs`: corrige las rutas de `data-video` en la versión en español.
- `.claude/serve.mjs` (vista previa local): usa el puerto que asigna la vista previa y sirve video con pedidos por rango.

---

## 2026-10-23 · Los cuatro ensayos y El Guardaparques sin botón

- **Páginas nuevas** (EN y ES), con la plantilla del detalle de escrito: `writing-neurodivergent.html`, `writing-us-vs-them.html`, `writing-outside-the-wake.html`.
  - Outside the Wake: bajada, cita, apertura y "~700 words" del Master Brief (D.5). Cita y apertura quedan en inglés también en la versión en español.
  - Neurodivergent y Us vs. Them: bajada = descripción de la home; cita y cuerpo en **lorem ipsum** (no hay texto del ensayo). Extensión y "Reads as" en "To confirm".
- **Listado `writing.html`**: ahora con los 4 ensayos (01 Neurodivergent, 02 Us vs. Them, 03 Outside the Wake, 04 When Nationalism). En el listado no va lorem ipsum: los que no tienen texto muestran solo la descripción.
- **Anterior / siguiente** en los detalles ("← Previous" / "Next →", como en el Figma), en el orden del listado.
- **Home**: los cuatro botones "Read the essay" llevan a su ensayo.
- **El Guardaparques**: sin el botón "View the project"; en su lugar, etiqueta naranja "Coming soon" / "Próximamente" (`.status-tag`, propuesta: no está en Figma).

---

## 2026-10-23 · Sección About según Figma (321:2379)

- El botón "Résumé (PDF)" se reemplaza por un botón relleno naranja con el mail: **hello@andresmonge.com** (abre el correo) y flecha oscura (`assets/icon-arrow-dark.svg`). Nueva variante `.button--filled`; su hover (naranja más claro) es una propuesta, no está en Figma.
- Bio secundaria: interlineado 1.5 y una línea en blanco entre los dos párrafos (`.about__details`). Rol de la foto con interlineado 1.5.
- Overline: "ABOUT / CONTACT" / "SOBRE MÍ / CONTACTO", como en el Figma (se había cambiado a "ABOUT" un momento antes).

---

## 2026-10-23 · Nav sin Contact; About ancla a la home

- **Contact / Contacto** sale del nav y del menú mobile en todas las páginas (y del template de campaña). El footer sigue mostrando el mail.
- **About / Sobre mí** lleva siempre a la sección About de la home (`index.html#about`, también desde `es/`). Antes, desde otra página, la home limpiaba el ancla y arrancaba arriba.
- Home: si la URL trae `#about`, no se muestra la intro y la página arranca en esa sección, debajo del nav (`scroll-margin-top`). Cualquier otro ancla se sigue limpiando y la home arranca en el hero.

---

## 2026-10-23 · The Writing y detalle de escrito

- **`writing.html`** (Figma 658:2599) y **`writing-nationalism.html`** (Figma 655:3884), en inglés y en español. Estilos en `writing.css`.
- Por ahora un solo escrito: **When Nationalism Becomes a Trend**.
  - Listado: número, "Essay · December 2025", etiquetas Strategic / Brand & narrative, descripción de la home, cita, apertura y "Continue reading" al detalle.
  - Detalle: migas The Writing / título, eyebrow "Essay · Voice & range", ficha (Format, Length, Reads as, Date), bajada, cita, apertura con la primera letra en ámbar y link de vuelta al listado.
- **Fuente del texto**: cita y apertura textuales del Master Brief (D.5), no del sitio publicado ni del Figma (que dicen "territory." en vez de "territory or policy." y suman una frase que no está en el brief). La bajada es la del brief. Fecha: diciembre de 2025 (brief); CONTENIDO dice 2026.
- **Length**: "To confirm" (el Figma dice ~1,200 words, sin fuente).
- **Español**: interfaz, bajada y descripción traducidas (pendiente de aprobación). La cita y la apertura quedan en inglés (`lang="en"`): son del autor y no hay versión en español.
- **Navegación**: "The Writing" / "Escritos" del nav y del menú mobile lleva a `writing.html` en todas las páginas. El botón "Read the essay" del cuadro de When Nationalism en la home lleva al detalle.
- Interlineados de 0.943 del Figma en textos de varias líneas pasan a 1.25 (con Lexend se pisan las líneas).

---

## 2026-10-23 · Tagline nuevo en el hero y el About

- **Hero** (Figma 321:2400): el texto de identidad pasa a ser "I’m a Costa Rican writer and creator working in English and Spanish. Writing is the foundation of my work…". Reemplaza al texto con las dos opciones ("Alternate: …").
- **About** (Figma 321:2389 y 321:2390): bio principal con el mismo texto y bio secundaria en dos párrafos ("My work takes different forms…" y "Whether I’m developing an original story…"). Sale la mención al BFA en SCAD y a work-eligible.
- Traducción al español nueva, pendiente de aprobación.

---

## 2026-10-23 · Galería The Campaigns

- **Nueva página `campaigns.html`** (y `es/campaigns.html`) desde el Figma "The Campaings" (655:3679), sobre la plantilla de Film & video (`films.css`): eyebrow naranja "Branded Content & Advertising — the lead section", título "The Campaigns" de 100px y bajada de 24px, los tres en difference; degradé negro sobre el fondo; botón de la card en Lexend Regular 18. En Figma eyebrow y bajada usan Pacaembu: acá Lexend. Traducción al español de eyebrow y bajada pendiente de aprobación.
- Por ahora un solo proyecto: **Fashion Design and Campaign** (Campaign, 2025), con su descripción de la home y el link "View the project" / "Ver el proyecto" a `campaign-fashion.html`.
- **Navegación**: "The Campaigns" / "Campañas" del nav y del menú mobile lleva a `campaigns.html` en todas las páginas. La miga del detalle de Fashion y la del template de campaña también.
- Fotos usadas: fondo `fashion-03.jpg`, póster `fashion-05.jpg` (recortadas con `object-position`).

---

## 2026-10-23 · Navegación superior con los nombres nuevos

- Nav, menú mobile y migas en todas las páginas: **The Campaigns · The Films · The Writing · About · Contact** (antes The Book · Film & video · Writing). En español: **Campañas · Películas · Escritos · Sobre mí · Contacto**.
- The Films lleva a `films.html`; The Campaigns y The Writing siguen en `#` (no hay páginas de listado).
- Migas: Fashion pasa a Home / The Campaigns; los detalles de película a Home / The Films / película.
- El menú mobile escribía "writing" en minúscula; ahora "The Writing".

---

## 2026-10-23 · Galería Film & video

- **Nueva página `films.html`** (y `es/films.html`) desde el mockup "Film and video" (Figma 178:949): fondo con el still de 2020, título "Film & Video" de 128px en difference y grilla de 2 × 2 cards de 508px con borde naranja.
- **Cards**: 5 Sentidos, Nahuel, Romano Honorario y Silent Pain / Mime (orden del Master Brief), con póster, título, "Short", año, logline y link "Full length view" / "Ver la película" a su página de detalle. Usan el botón secundario de la home. Hover (propuesta): sube, sombra y zoom leve del póster.
- **Tipografía**: el mockup usa Pacaembu; se usa Lexend, la del proyecto. Interlineado de la descripción 1.245 (en el mockup 0.943, que con Lexend se superpone).
- **Mobile**: no hay diseño; una columna y título de 56px.
- **Navegación**: "Film & video" / "Cine y video" del nav y del menú mobile lleva a `films.html` en todas las páginas (antes `#`). La página actual se marca en naranja (`aria-current`). Las migas de los detalles de película pasan a ser Home / Film & video / película.

---

## 2026-10-22 · Detalle de película: Nahuel, Silent Pain / Mime y Romano Honorario

- **Tres páginas nuevas** con la misma estructura que 5 Sentidos, en inglés y en español: `film-nahuel.html`, `film-silent-pain.html`, `film-romano-honorario.html` (y sus versiones en `es/`).
- **Contenido**: rol, descripción (logline), premios y video de `CONTENIDO.md`; sinopsis **provisionales** redactadas con las escenas del Master Brief, sin revelar finales (detalle en `CONTENIDO.md`). Romano Honorario lleva sus 2 laureles; Nahuel y Silent Pain no tienen premios cargados, así que no tienen esa fila.
- **Home**: los botones "Watch the short" / "Ver el corto" de las cuatro películas llevan a su página de detalle (antes iban a YouTube). Las imágenes con play de la timeline siguen yendo a YouTube.
- **Navegación entre películas**: Nahuel → Silent Pain / Mime → 5 Sentidos → Romano Honorario.

---

## 2026-10-22 · Detalle de película: 5 Sentidos

- **Nueva página `film-5-sentidos.html`** (y `es/film-5-sentidos.html`) desde el Figma "Detalle de pelicula" (610:1344, solo escritorio): migas con la página actual en ámbar, título, ficha, video, logline, reconocimientos en festivales (4 laureles), créditos y links a la película más reciente y a la anterior.
- **Contenido**: solo datos de 5 Sentidos de `CONTENIDO.md` (rol, descripción, premios, video). El Figma tiene en la ficha, el logline, la sinopsis y el pie del video textos de Jogo; no se usaron. Idioma, fotografía y elenco quedan como "To confirm". Sinopsis **provisional** redactada con la descripción de la home y las escenas del Master Brief (detalle en `CONTENIDO.md`).
- **Video**: póster (`assets/year-2022.png`) con el play del Figma (`assets/film/play-100.svg`); al hacer clic se carga el video de YouTube con sonido (`campaign.js`).
- **Mobile**: no hay diseño; usa las reglas mobile del detalle de campaña (los laureles pasan a dos filas).
- `campaign.css` y `campaign.js` pasan a ser los archivos de todas las páginas de detalle. Ficha ajustada al Figma (gap 7, interlineado 1.245) también en la campaña.

---

## 2026-10-22 · Detalle de campaña: Fashion Design and Campaign

- **Nueva página `campaign-fashion.html`** (y `es/campaign-fashion.html`) desde el Figma "Detalle de campaña - con galeria" (590:2331) y su versión mobile (606:5741): migas, título, ficha, galería, sección numerada, créditos y link al proyecto siguiente.
- **Contenido**: solo lo que ya teníamos de Fashion Design and Campaign (año, rol y descripción de la home). Categoría, idioma y fotografía quedan como "To confirm" / "A confirmar". El bloque de video es un placeholder (16:9, fondo #1a1a1a, ícono de play) con la leyenda "Video to confirm" / "Video a confirmar" hasta tener el video.
- **Galería**: 14 imágenes de `images_campaña/` (8 fotos de campaña, 2 moodboards, 3 de muestras de tela y un retrato), optimizadas en `assets/campaign/fashion/`. Páginas de 5 miniaturas en escritorio y 3 en mobile, ficha "+N más", flechas de página y flechas del teclado. La imagen grande se muestra entera (las fotos son verticales); en el Figma el placeholder se recorta.
- **Home**: el botón "View the project" de Fashion lleva a la nueva página.
- **Versión en español**: `tools/build-es.mjs` ahora genera varias páginas (lista `PAGES`) y `tools/i18n.mjs` también traduce los `alt` de las imágenes. Nuevas entradas en `tools/es.mjs`. La home en español no cambió.
- **Template reutilizable** `templates/campaign-detail.html`: la misma página con placeholders, 7 bloques numerados (obligatorios y opcionales) y los pasos para crear un detalle de campaña nuevo. Documentado en `DESIGN-SYSTEM.md` (sección Templates).
- Nav y footer: los mismos de la home (el Figma del detalle muestra otros textos en el nav). En mobile, los links de Directory van en fila, como en el Figma.

---

## 2026-10-16 · `b9ca4ad` · Intro adaptada a mobile

- **Recorrido en cruz en mobile y tablet (≤ 900px):** la cinta horizontal cruza por el centro vertical de la pantalla y las dos cintas verticales pasan por el centro horizontal (una baja y después la otra sube). Antes, en un celular las verticales pasaban fuera de la pantalla y la horizontal quedaba unos 27px por encima del centro.
- **Logo centrado al final de la intro en mobile:** antes quedaba corrido unos 15px a la derecha y 27px hacia arriba.
- **Orden de las palabras de la intro:** ANDRES / MONGE / PROJECTS, como en el Figma actualizado (antes ANDRES / PROJECTS / MONGE).
- Escritorio sin cambios: sigue el Figma (345:5946). Tiempos y recorridos iguales en todos los tamaños.
- Documentación: `animaciones.md` (tabla escritorio vs. mobile) y README (se quitó el pendiente del orden de las palabras).

---

## 2026-10-15 · `79f9ea3` · Versión bilingüe (EN / ES)

**Cambios respecto de la versión publicada en GitHub (`3765fa5`).**

### Sitio en dos idiomas
- `index.html` pasa a ser la versión **en inglés completa**. Antes mezclaba idiomas: los cuadros de la timeline estaban en español y el resto en inglés.
- Nueva versión **en español**: `es/index.html`. No se edita a mano: la genera `node tools/build-es.mjs` a partir de `index.html`, así las dos versiones tienen siempre la misma estructura.
- Nuevos archivos de traducción:
  - `tools/es.mjs`: diccionario inglés → español y lista de textos que no se traducen (títulos de obras, festivales, premios, The Book, redes).
  - `tools/i18n.mjs`: traduce textos completos de nodos y atributos de accesibilidad, nunca fragmentos.
  - `tools/build-es.mjs`: genera la página, ajusta rutas a `../` y marca ES como activo. Si encuentra un texto sin traducir, lo lista y no genera el archivo.

### Selector de idioma
- EN / ES ahora son **links entre las dos páginas** (`index.html` ↔ `es/index.html`). Antes solo cambiaban de estado.
- Los links apuntan a archivos, no a carpetas, para que funcionen también abriendo el HTML con doble clic.
- Se agregaron `<link rel="alternate" hreflang>` en las dos páginas.
- **Mobile:** el selector va dentro del menú abierto, a ancho completo (358px, mitad cada idioma). Es una propuesta: no está en el Figma.

### Textos de la versión en inglés (`index.html`)
- Cuadros traducidos al inglés: tipo y rol ("Film · …", "Writing · …", "Campaign · …"), las 12 descripciones y los botones ("Watch the short", "View the project", "Read the essay").
- Tagline del footer: se reemplazó la frase en español por "Bilingual writer and filmmaker."
- Etiquetas de accesibilidad en inglés ("Open menu", "Main", "Language", "Watch … on YouTube", etc.).

### Textos de la versión en español (`es/index.html`)
- Las descripciones y botones de los cuadros son el **texto original en español**.
- Roles de los cuadros y premios ("Award Winner …") quedan **en inglés, como en el contenido original**. Se verificó contra `CONTENIDO.md`: coinciden los 10 títulos, las 12 descripciones y los 10 botones.
- Traducido al español (pendiente de aprobación de Andrés): nav, hero, My Story, About, footer y etiquetas de accesibilidad.

### Código
- `script.js`: el botón del menú mobile toma sus textos de `data-label-open` / `data-label-close` (uno por idioma). Se quitó el manejo del selector por JS, porque ahora son links.
- `styles.css`: estilo del selector dentro del menú mobile (`.lang--menu`).

### Documentación
- `README.md`: sección "Idiomas" (cómo regenerar la versión en español).
- `CONTENIDO.md`: qué se tradujo, qué queda en el idioma original y qué falta aprobar. Corregido el apóstrofo del título de Neurodivergent.
- `DESIGN-SYSTEM.md`: selector de idioma como links y su versión en el menú mobile.
- `CHANGELOG.md`: este archivo.

### Figma (fuera del repositorio)
- Nuevo frame **"Home mobile · EN (desde código)"** (428:1651) en la página "Home - contenido real": la home mobile en inglés, 390×9448px, con capas editables (93 textos, 65 instancias de componentes del archivo), imágenes de `Home v1`, estilos de texto y variables de color.
- Nuevo componente **`dot-line`** (427:1218) en la página Components: línea con bullets redondos.
- El frame `home mobile` original (310:2662) no se modificó.

---

## 2026-10-15 · `3765fa5` · Nav con selector de idioma, menú mobile y timeline mobile

- **Nav de escritorio:** selector EN / ES (Figma 421:2560), solo estado visual. Links con gap 16 y tracking 1px.
- **Nav mobile (≤ 900px):** cabecera de 66px con logotype small e ícono de menú (Figma 180:5047).
- **Menú mobile abierto** (Figma 420:2685): pantalla negra con 5 accesos de 100px, Lexend 40 crema y flecha; se cierra con la cruz, Escape o al tocar un acceso.
- **Timeline mobile:** padding de 32px por año; 16px dentro de cada obra; orden premios → video → cuadro; línea de 50px con bullets redondos entre el año y las obras y entre obras, con 24px de aire.
- **Bullets redondos en todas las líneas:** My Story (antes rombo) y spine de 2026 (`spine-2026a.svg`, `spine-2026c.svg`).
- **Superposición por scroll:** activa también en mobile; los años se fijan debajo del nav (antes quedaban tapados) y suben un tercio de pantalla más antes de fijarse (`STICKY_RELEASE = 0.33`), para que no se tape el último botón. Posiciones recalculadas con `ResizeObserver`.
- Corrección: años y premios que desaparecían en mobile (quedaban debajo de la imagen de fondo).

## 2026-10-13 · `61bc341` · Documentación para desarrollo

- `DESIGN-SYSTEM.md`: tokens, tipografía, espaciado, efectos, estados, componentes y assets.
- `animaciones.md`: tiempos, curvas y técnica de cada animación.
- `CONTENIDO.md`: textos, premios y links con su origen y lo pendiente.

## 2026-10-13 · `5c000ee` · Primera versión

- Home completa desde Figma (Home v1, 321:2316): intro animada (345:5946), hero dividido con negativo, player y video de YouTube de fondo, oficios que se escriben, franja de premios, My Story, timeline 2020–2026 con superposición por scroll, About/Contact y footer.
- Ajustes de diseño pedidos: grano de película, degradé inferior del hero, sombras en textos, padding de 80px en los años, sombra entre años, hovers de botón (Figma) y de cards (propuesta), entrada escalonada de premios.
- Esta es la versión que muestra el link de revisión en claude.ai.
