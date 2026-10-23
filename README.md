# Portfolio Andrés Monge · Home

Home del portfolio de Andrés Monge (cineasta y escritor) en HTML, CSS y JS sin dependencias, salvo Google Fonts (Lexend, Inter, Courier Prime) y la API de YouTube para los videos del hero.

Diseño: Figma `Portfolio-Monge` (https://www.figma.com/design/6ZzqhrhAVtAsoCXgGpB1jh/Portfolio-Monge), frame `Home v1 - contenido real` (321:2316) e intro `Animacion 2` (345:5946). Contexto completo del proyecto en [CONTEXT.md](CONTEXT.md).

## Cómo verlo en local

Hay que servirlo por `http://`. Abriendo `index.html` con doble clic (`file://`) los videos de YouTube no se reproducen.

```bash
npx serve .
```

o cualquier servidor estático. Para volver a ver la intro (se muestra una vez por sesión), agregar `?intro` a la URL.

## Idiomas

- Las páginas de la raíz (`index.html`, `campaign-fashion.html`) son la versión en **inglés** y la fuente de verdad.
- Las de `es/` son la versión en **español**. Se generan, no se editan a mano:

  ```bash
  node tools/build-es.mjs
  ```

  Correrlo después de cada cambio en una página. Las páginas que procesa están en `PAGES`, al principio de `tools/build-es.mjs`. Las traducciones están en `tools/es.mjs`. Si aparece un texto nuevo sin traducir, el script lo lista y no genera el archivo.
- El selector EN / ES lleva de una página a la otra.

## Archivos

- `index.html`: estructura de la home. Cada bloque indica su nodo de Figma en un comentario.
- `styles.css`: estilos. Los valores ajustables están como variables en `:root`, al principio.
- `campaign-fashion.html`, `campaign.css`, `campaign.js`: detalle de campaña de Fashion Design and Campaign (Figma 590:2331 y 606:5741) con galería de fotos. Usa también `styles.css` y `script.js` (nav, menú mobile, footer).
- `films.html`, `films.css`: galería Film & video (Figma 178:949) con las cards de las cuatro películas.
- `writing.html`, `writing-*.html`, `writing.css`: listado The Writing (Figma 658:2599) y detalle de cada ensayo (Figma 655:3884). Neurodivergent y Us vs. Them tienen cita y cuerpo en lorem ipsum.
- `campaigns.html`: galería The Campaigns con la misma plantilla (`films.css`); por ahora solo Fashion Design and Campaign.
- `film-5-sentidos.html`, `film-nahuel.html`, `film-silent-pain.html`, `film-romano-honorario.html`: detalles de película (Figma 610:1344). Usa `campaign.css` y `campaign.js` (video con póster que carga YouTube al hacer clic).
- `templates/campaign-detail.html`: template de la página de detalle de campaña, con placeholders y los pasos para crear una nueva. No se publica tal cual: se copia a la raíz como `campaign-[slug].html`.
- `assets/campaign/fashion/`: fotos de la galería optimizadas (1600px y miniaturas de 420px) a partir de `images_campaña/`.
- `script.js`: intro, entrada del hero, player y video de fondo, oficios que se escriben, superposición de años al hacer scroll, entradas al hacer scroll.
- `assets/`: imágenes y SVG exportados de Figma. `assets/intro/` tiene los de la intro.
- [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md): colores, tipografía, espaciado, efectos, estados, componentes y assets.
- [animaciones.md](animaciones.md): cada animación, sus tiempos y cómo está hecha.
- [CONTENIDO.md](CONTENIDO.md): textos, premios y links de la home, con su origen y lo que falta pedir.
- [CHANGELOG.md](CHANGELOG.md): registro de cambios por versión y qué versión está publicada en cada canal.
- [CAMBIOS-DESARROLLO-2026-10-22-23.md](CAMBIOS-DESARROLLO-2026-10-22-23.md): resumen para desarrollo de los cambios del 22 y 23 de octubre (contenido, fuentes e interfaz).

## Secuencia de la home

1. **Intro** (7.13 s, tiempos de Figma): tres tiras con la forma del logo muestran escenas; entra el isotipo, después las palabras, y todo se desvanece. Se puede saltear con clic, tecla, rueda o toque.
2. **Entrada del hero**: las mitades se unen (1.1 s), nombres +0.75 s, oficios +1.35 s, texto y player +1.6 s.
3. **Video de fondo**: YouTube sin sonido en las dos mitades, sincronizadas desde la izquierda. Cuando arranca, el negativo de la mitad izquierda se disuelve. Si una película tiene `src` (mp4 propio) en `FILMS` (`script.js`), se usa ese archivo en lugar de YouTube.
4. **Oficios**: Writer ↔ Filmmaker y Branded Content ↔ Film & TV se escriben y desescriben cada 3.5 s.
5. **Timeline**: cada año queda fijo (`position: sticky`) y el siguiente sube por encima.

Todo respeta `prefers-reduced-motion`.

## Variables ajustables (`styles.css`, `:root`)

| Variable | Qué controla |
|---|---|
| `--year-overlay`, `--year-overlay-gradient` | Oscurecimiento del fondo de cada año |
| `--year-pad-y` | Padding vertical de cada año (80px) |
| `--year-shadow` | Sombra superior de cada año al superponerse |
| `--hero-fade-h`, `--hero-fade-opacity` | Degradé negro desde la base del hero |
| `--hero-text-shadow`, `--hero-name-shadow`, `--hero-identity-shadow` | Sombras de los textos del hero |
| `--grain-opacity`, `--grain-size`, `--hero-grain-opacity`, `--hero-grain-size` | Grano de película |
| `--button-hover-bg` | Hover del botón (valor de Figma) |
| `--card-hover-bg`, `--card-hover-shadow` | Hover de la card (propuesta, no está en Figma) |

## Pendientes

- **Textos sin confirmar**: el mail y los links del footer son de ejemplo; la traducción al español del hero y del About está pendiente de aprobación.
- **Detalle de campaña (Fashion)**: categoría, idioma y crédito de fotografía sin dato ("To confirm"); video con placeholder; el link a Jogo y la miga "The Book" apuntan a `#`.
- **Detalles de película**: sinopsis provisionales; fotografía y elenco sin dato; idioma sin dato en 5 Sentidos y Romano; sin diseño mobile.
- **Galería Film & video**: sin diseño mobile.
- **The Writing**: falta el texto completo de los cuatro ensayos; la cita y la apertura de Neurodivergent y Us vs. Them (hoy lorem ipsum); la extensión de tres de ellos.
- **Links**: los ensayos, El Guardaparques, Résumé y LinkedIn apuntan a `#`.
- **Videos**: el ID de YouTube de Silent Pain no está verificado (letras I/l ambiguas). Para el sitio final se recomiendan mp4 propios (loops de 10 a 20 s, H.264, sin audio).
- **Fondos del player**: la película asociada a cada imagen fija del hero es una suposición.
- **Mobile**: la versión mobile es provisoria; no hay diseño mobile medido.
- **Hover de la card**: es una propuesta; no hay variante hover del time-box en Figma.
