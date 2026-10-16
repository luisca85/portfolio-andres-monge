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

- `index.html` es la versión en **inglés** y la fuente de verdad.
- `es/index.html` es la versión en **español**. Se genera, no se edita a mano:

  ```bash
  node tools/build-es.mjs
  ```

  Correrlo después de cada cambio en `index.html`. Las traducciones están en `tools/es.mjs`. Si aparece un texto nuevo sin traducir, el script lo lista y no genera el archivo.
- El selector EN / ES lleva de una página a la otra.

## Archivos

- `index.html`: estructura de la home. Cada bloque indica su nodo de Figma en un comentario.
- `styles.css`: estilos. Los valores ajustables están como variables en `:root`, al principio.
- `script.js`: intro, entrada del hero, player y video de fondo, oficios que se escriben, superposición de años al hacer scroll, entradas al hacer scroll.
- `assets/`: imágenes y SVG exportados de Figma. `assets/intro/` tiene los de la intro.
- [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md): colores, tipografía, espaciado, efectos, estados, componentes y assets.
- [animaciones.md](animaciones.md): cada animación, sus tiempos y cómo está hecha.
- [CONTENIDO.md](CONTENIDO.md): textos, premios y links de la home, con su origen y lo que falta pedir.
- [CHANGELOG.md](CHANGELOG.md): registro de cambios por versión y qué versión está publicada en cada canal.

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

- **Textos sin confirmar**: el texto de identidad del hero incluye dos opciones ("Alternate: …"); el mail y los links del footer son de ejemplo.
- **Links**: The Book, Film & video, Writing, los ensayos, Fashion Design, El Guardaparques, Résumé y LinkedIn apuntan a `#`.
- **Videos**: el ID de YouTube de Silent Pain no está verificado (letras I/l ambiguas). Para el sitio final se recomiendan mp4 propios (loops de 10 a 20 s, H.264, sin audio).
- **Fondos del player**: la película asociada a cada imagen fija del hero es una suposición.
- **Mobile**: la versión mobile es provisoria; no hay diseño mobile medido.
- **Hover de la card**: es una propuesta; no hay variante hover del time-box en Figma.
