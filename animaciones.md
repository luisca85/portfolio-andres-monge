# Animaciones · Home Andrés Monge

> **Origen de cada animación.** La intro sale del Figma con sus tiempos exactos (`get_motion_context` del frame `Animacion 2`, 345:5946). La entrada del hero sigue tiempos de referencia acordados en la maqueta previa, "a definir con desarrollo". La superposición de años sale de la anotación de Luis en Figma (`Anotaciones - scroll por año`). El resto (oficios, grano, hovers de card, entradas por scroll) son pedidos de diseño implementados sin prototipo en Figma, así que sus valores son una propuesta ajustable.

Todo está hecho con CSS (transiciones, `@keyframes`, `position: sticky`) y JavaScript sin librerías (`script.js`). La curva principal es `--ease: cubic-bezier(.77, 0, .18, 1)` (arranque lento, final suave).

## Línea de tiempo al cargar

Tiempos contados desde que arranca la intro (que espera hasta 2.5 s a que carguen sus imágenes):

| Momento | Qué pasa |
|---|---|
| 0 → 7.13 s | Intro |
| 7.13 → 7.73 s | La capa de la intro se funde mientras la home ya empieza a entrar |
| 7.13 → 8.23 s | Las mitades del hero se unen |
| 7.88 → 8.78 s | Entran ANDRES y MONGE |
| 8.48 → 9.08 s | Aparecen los oficios |
| 8.73 → 9.43 s | Aparecen el texto de identidad y el player; termina la entrada |
| desde 9.43 s | Si el video ya reproduce, se disuelve el negativo; se activa la franja de premios |
| 12.93 s | Primer cambio de oficios |

La intro se ve una vez por sesión. Sin intro, la misma secuencia arranca al cargar (todo 7.13 s antes).

## 1. Intro (Figma 345:5946)

**Qué se ve.** Pantalla negra. Tres tiras con nueve formas del logo funcionan como ventanas: por adentro de las formas se ven escenas de las películas. Una tira horizontal cruza de izquierda a derecha, una vertical baja y otra vertical sube. Después entra el isotipo, luego las palabras ANDRES / MONGE / PROJECTS, y todo se desvanece a negro.

**Tiempos (duración total 7.131846 s, una sola vez; en Figma hace loop):**

| Elemento | Movimiento | Inicio → fin | Curva |
|---|---|---|---|
| Tira 1 (horizontal) | x −232.76 → +2573.56 px | 0 → 1.41 s | linear |
| Tira 3 (vertical) | y −44.28 → +2375.88 px | 1.20 → 2.49 s | linear |
| Tira 2 (vertical) | y 0 → −2376.83 px | 2.39 → 3.66 s | linear |
| Isotipo · opacidad | 0 → 1 | 4.15 → 4.65 s | ease-out |
| Isotipo · sube | y +200 → 0 (con x +200) | 4.15 → 4.65 s | ease-out |
| Isotipo · se corre | x +200 → 0 | 4.96 → 5.46 s | ease-out |
| Palabras · entran | x +200 → 0 y opacidad 0 → 1 | 4.96 → 5.46 s | ease-out |
| Isotipo · sale | opacidad 1 → 0 | 6.82 → 7.13 s | ease-out |
| Palabras · salen | opacidad 1 → 0 | 6.84 → 7.13 s | ease-out |
| Capa de la intro | opacidad 1 → 0 (fundido a la home) | 7.13 → 7.73 s | `--ease` (propuesta, no está en Figma) |

**Cómo está hecho.**

- Escenario fijo de 1440×1024 (el frame de Figma), centrado y escalado con `transform: scale()` para cubrir la ventana. En pantallas angostas la escala se limita para que el logo (407px) entre completo.
- **Las fotos no se mueven; se mueve la máscara.** Cada foto lleva `mask-image` con el SVG de la tira (`assets/intro/strip-*.svg`). El desplazamiento se anima con una propiedad CSS registrada:
  ```css
  @property --t { syntax: "<length>"; inherits: true; initial-value: 0px; }
  .intro__strip--1 { animation: kf_345_6019_translate_0 7.131846s linear both; }
  @keyframes kf_345_6019_translate_0 { 0% { --t: -232.76px; } 19.777% { --t: 2573.564px; } 100% { --t: 2573.564px; } }
  .intro__strip--h .intro__still { mask-position: calc(var(--ox) - var(--ix) + var(--t)) calc(var(--oy) - var(--iy)); }
  ```
  `--ox/--oy` es el origen de la tira y `--ix/--iy` la posición de la foto, ambos en coordenadas del frame.
- **Tiras verticales.** En Figma son la tira horizontal rotada 90°, pero el SVG se exporta horizontal. Se resuelve con un contenedor rotado 90° desde el origen de la tira (`.intro__window`) que lleva la máscara, y la foto adentro contra-rotada −90° para quedar en su lugar. La máscara avanza sobre el eje rotado, que coincide con el eje vertical de la pantalla.
- El logo usa los `@keyframes` de Figma tal cual (`kf_345_5986_*` para el isotipo, `kf_345_6668_*` para las palabras), con `opacity` y `translate`.
- **Arranque:** las animaciones quedan en pausa (`animation-play-state: paused`) hasta que las fotos se decodifican (`img.decode()`), con un tope de 2.5 s.
- **Salida:** a los 7.132 s JS agrega `.is-leaving` (fundido de 0.6 s), libera el scroll y quita la capa del DOM.
- **Una vez por sesión:** un script en `<head>` agrega `html.has-intro` si no hay marca en `sessionStorage`; con `?intro` en la URL se fuerza. Sin `has-intro`, la capa no se pinta.
- **Saltear:** clic, tecla, rueda o toque terminan la intro en el acto.
- **Compatibilidad:** `@property` funciona en Chrome 85+, Safari 16.4+ y Firefox 128+. En navegadores más viejos las tiras no se mueven, el logo sí.

**Mobile y tablet (≤ 900px): recorrido en cruz.** En pantallas angostas solo se ve la franja central del escenario (centro en x 720, y 512), y en el Figma las cintas verticales pasan cerca de los bordes, fuera de esa franja. Se mantienen los tiempos y recorridos; solo cambia la posición:

| Elemento | Escritorio (Figma) | Mobile |
|---|---|---|
| Cinta horizontal | y 357.8 a 611.8 | centrada en y 512 (`--oy: 385px`) |
| Cintas verticales | x 143.7 a 397.7 (baja) · x 998 a 1252 (sube) | las dos centradas en x 720 (`--ox: 847px`): una baja y después la otra sube |
| Logo al final | x 531 · y 414 | centrado en (720, 512) |

Esta adaptación es una propuesta: no hay versión mobile de la intro en Figma.

**Para emularlo en otro stack:** con GSAP o Motion se puede animar `maskPosition` directamente en lugar de `--t`. Los porcentajes de los keyframes multiplicados por 7131.846 ms dan los tiempos absolutos.

## 2. Entrada del hero

**Qué se ve.** Las dos mitades de la película entran desde afuera y se unen en el centro: la izquierda sube desde abajo y la derecha baja desde arriba. Después aparecen los nombres por detrás de una máscara, luego los oficios y al final el texto de identidad y el player.

| Elemento | Movimiento | Duración | Demora | Curva |
|---|---|---|---|---|
| Mitad izquierda | `translateY(100%)` → 0 | 1.1 s | 0 | `--ease` |
| Mitad derecha | `translateY(-100%)` → 0 | 1.1 s | 0 | `--ease` |
| ANDRES | `translateY(110%)` → 0, dentro de máscara | 0.9 s | 0.75 s | `--ease` |
| MONGE | `translateY(-110%)` → 0, dentro de máscara | 0.9 s | 0.75 s | `--ease` |
| Oficios | opacidad 0 → 1, `translateY(12px)` → 0 | 0.6 s | 1.35 s | ease |
| Texto de identidad y player | opacidad 0 → 1, `translateY(16px)` → 0 | 0.7 s | 1.6 s | ease |

**Cómo está hecho.**

- Cada mitad (`.hero__half`, 50% de ancho, `overflow: hidden`) contiene la película completa con el doble de ancho, anclada a su borde exterior. Así las dos mitades muestran juntas la imagen entera.
- El estado inicial vive en CSS bajo `.js .hero:not(.is-in)`; JS agrega `.is-in` (con doble `requestAnimationFrame` para que el estado inicial llegue a pintarse) y las transiciones hacen el resto.
- La clase `js` se agrega en `<head>` antes del primer pintado para evitar un parpadeo del hero.
- La máscara de los nombres es el propio contenedor con `overflow: hidden` y un margen extra de 32px para no recortar la sombra.
- La entrada espera a que termine la intro (promesa `introDone`). Todo lo que depende del hero (oficios, disolución del negativo, premios) espera a `entranceDone` = fin de la entrada, 2.3 s.

## 3. Película de fondo y player

**Qué se ve.** La película se reproduce sin sonido en las dos mitades. Mientras carga se ve una imagen fija. Al tocar un título del player, la película cambia con un fundido.

**Cómo está hecho.**

- Una lista `FILMS` en `script.js` define cada película: `youtube` (ID), `src` (mp4 propio, opcional, tiene prioridad) y `start` (segundos a saltear).
- **YouTube:** dos reproductores de la IFrame API, uno por mitad, `mute`, sin controles. La mitad izquierda manda: cada 1.5 s, si la derecha se desfasa más de 0.25 s, se la reubica con `seekTo`. Al terminar, vuelve a `start` (loop).
- **mp4 propio:** dos `<video muted loop autoplay playsinline>` sincronizados con el mismo criterio.
- El video (`.hero__video`) aparece con un fundido de 0.8 s (`.hero.is-video`) recién cuando las dos mitades están reproduciendo. Antes se ve la imagen fija (`.hero__bg`), que también cambia con fundido de 0.9 s al elegir otra película.
- El video se agranda un 15 % (`scale(1.15)`) para esconder bordes y marca de YouTube, y cubre el hero en 16:9 con unidades de contenedor (`max(100cqw, 177.78cqh)`).
- Requiere servir el sitio por `http(s)://`; con `file://` YouTube no reproduce. Si el video falla, queda la imagen fija.

## 4. Disolución del negativo

**Qué se ve.** Durante la entrada, la mitad izquierda se ve en negativo. Cuando la película empieza a reproducirse, el negativo se disuelve y queda la película entera en sus colores.

**Cómo está hecho.** La capa `#D9D9D9` con `mix-blend-mode: difference` pasa a opacidad 0 en 1.4 s (`--ease`) cuando el hero recibe `.is-unified`. JS la agrega la primera vez que el video reproduce, pero nunca antes de que termine la entrada del hero. No vuelve al cambiar de película. Si el video no carga, el negativo se mantiene.

## 5. Oficios que se escriben

**Qué se ve.** Cada 3.5 s, los oficios se borran letra por letra y se escribe el del otro lado: Writer ↔ Filmmaker, Branded Content ↔ Film & TV. Mientras escriben hay un cursor que parpadea.

| Parámetro | Valor |
|---|---|
| Espera entre cambios | 3500 ms |
| Borrado | 45 ms por letra |
| Pausa entre borrar y escribir | 250 ms |
| Escritura | 75 ms por letra |
| Cursor | 1px, parpadeo cada 0.5 s (`steps(1)`) |

**Cómo está hecho.** Bucle `async` en JS que cambia `textContent` letra por letra y espera con `setTimeout`. Los cuatro oficios cambian en paralelo (`Promise.all`). Arranca cuando termina la entrada del hero y se saltea si la pestaña está en segundo plano. Las listas animadas están ocultas para lectores de pantalla; se lee una lista fija con los cuatro oficios.

## 6. Grano de película

**Qué se ve.** Una textura de grano que tiembla sobre el video del hero y sobre los fondos de cada año.

**Cómo está hecho.** Un `<div class="grain">` con un SVG de ruido (`feTurbulence`, escala de grises) como fondo repetido. El div mide el doble que su contenedor (`inset: -50%`) y salta entre 8 posiciones con `@keyframes` en `steps(1)`.

| | Años | Hero |
|---|---|---|
| Opacidad | 14 % | 75 % |
| Tamaño del patrón | 160px | 120px |
| Modo de fusión | normal | overlay |
| Ciclo de posiciones | 0.8 s | 0.5 s |
| Parpadeo | no | contraste 1.5 a 1.8 y brillo 0.96 a 1.06 cada 0.08 s |

En el hero el grano va dentro de cada mitad (entra con ellas) y por encima del negativo, para no invertirse.

## 7. Superposición de años al hacer scroll

**Qué se ve.** Al bajar, cada año queda fijo y el siguiente sube por encima, con una sombra en el borde. Al subir, se devuelve.

**Cómo está hecho.** Cada `.year` tiene `position: sticky`. JS calcula su `top` como `min(alto del nav, alto de ventana × 0.67 − alto del año)`: un año más bajo que la ventana se fija justo debajo del nav (no detrás, para no tapar el título del año); uno más alto sigue subiendo hasta que su final queda a un tercio de la pantalla desde abajo (`STICKY_RELEASE = 0.33`) y recién ahí se fija: así su último contenido, como el botón del cuadro, llega a la vista antes de que lo tape el siguiente. Se recalcula al cambiar el tamaño de la ventana. La sombra es `--year-shadow` proyectada hacia arriba. About usa la misma sombra porque sube sobre 2026. También funciona en mobile, con la timeline en una columna. Con movimiento reducido, la superposición se desactiva. Las posiciones se recalculan con un `ResizeObserver` cada vez que cambia el alto de un año o del nav.

## 8. Entradas al hacer scroll

| Elemento | Movimiento | Duración | Disparo |
|---|---|---|---|
| Cards y bloques de My Story (`[data-reveal]`) | opacidad 0 → 1, `translateY(24px)` → 0 | 0.8 s, `--ease` | 20 % visible |
| Premios de la franja | opacidad 0 → 1, `translate 18px` → 0, escalonados 90 ms | 0.7 s | 60 % visible, después de la entrada del hero |
| Laurel de cada premio | `scale .7` → 1 | 0.8 s, demora +120 ms | igual que su premio |

**Cómo está hecho.** `IntersectionObserver` agrega `.is-visible` una sola vez por elemento. El escalonado de premios usa `--i` (índice) en `transition-delay: calc(var(--i) * 90ms)`. El estado oculto solo aplica con la clase `js`: sin JS todo se ve.

## 9. Hovers

| Elemento | Efecto | Duración |
|---|---|---|
| Botón | fondo `rgba(51,51,51,.3)` (Figma) | 0.25 s |
| Card completa | sube 6px (`translate`), fondo al 72 %, sombra `0 18px 40px`, su botón en hover | 0.4 s (`--ease`) movimiento · 0.3 s fondo |
| Play box | imagen `scale(1.04)`, ícono `scale(1.1)` | 0.6 s · 0.3 s |
| Links del nav y footer | color naranja | 0.2 s |
| Títulos del player | blanco | 0.3 s |

La card es clickeable completa porque el botón se estira sobre ella con `::after { position: absolute; inset: 0 }`. El hover de la card usa la propiedad `translate` (no `transform`) para no chocar con la entrada por scroll, que usa `transform`.

## 10. Menú mobile

**Qué se ve.** Al tocar el ícono de menú, la pantalla bajo la cabecera pasa a negro y aparecen los cinco accesos; el ícono cambia a una cruz.

| Elemento | Movimiento | Duración | Demora |
|---|---|---|---|
| Panel | opacidad 0 → 1 | 0.3 s | 0 |
| Accesos | opacidad 0 → 1, `translate 12px` → 0 | 0.45 s, `--ease` | 0, 40, 80, 120 y 160 ms |
| Flecha de cada acceso (hover) | se corre 4px | 0.25 s | 0 |

**Cómo está hecho.** El botón alterna `.is-open` en el panel y `.is-menu-open` en el nav y en `<html>` (bloquea el scroll). El panel cerrado queda `inert` y con `visibility: hidden`. Se cierra con la cruz, con Escape (el foco vuelve al botón), al tocar un acceso o al agrandar la ventana a escritorio. La animación es una **propuesta**: el Figma muestra solo el estado abierto.

## Movimiento reducido

Con `prefers-reduced-motion: reduce`: no hay intro ni video, la superposición de años se desactiva, los oficios quedan fijos, el grano queda quieto y todos los elementos aparecen en su estado final sin transición.

## Dónde ajustar

| Qué | Dónde |
|---|---|
| Tiempos de la intro | `INTRO` en `script.js` y `--intro-dur` + `@keyframes kf_345_*` en `styles.css` |
| Entrada del hero | bloque "Entrada del hero" en `styles.css`; `ENTRANCE_MS` en `script.js` |
| Oficios | `ROLES` en `script.js` |
| Películas del player | `FILMS` en `script.js` |
| Curva general | `--ease` en `:root` |
| Grano | `--grain-*` y `--hero-grain-*` en `:root`; `@keyframes grain` y `grain-flicker` |
