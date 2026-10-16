# Registro de cambios · Home Andrés Monge

Versiones de la home en orden inverso (la más reciente primero). Cada versión indica su commit en GitHub (https://github.com/luisca85/portfolio-andres-monge).

**Dónde está publicada cada versión hoy (2026-10-16)**

| Canal | Versión que muestra |
|---|---|
| GitHub `main` (antes de este commit) | `79f9ea3` · Versión bilingüe EN / ES |
| Link de revisión en claude.ai (https://claude.ai/artifact/1Mjk1RFZ1nvUqRvDo1FjsW) | Equivale a `5c000ee` (primera versión). No incluye nada de lo que vino después |
| Figma | Frame "Home mobile · EN (desde código)" (428:1651), generado desde esta versión |

---

## 2026-10-16 · Intro adaptada a mobile — este commit

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
