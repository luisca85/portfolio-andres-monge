// Genera es/index.html (versión en español) a partir de index.html (inglés).
// Uso: node tools/build-es.mjs   — correrlo después de cada cambio en index.html.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { translateHtml } from './i18n.mjs';
import { es, keep } from './es.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

let { html, missing, unused } = translateHtml(src, es);
missing = missing.filter((t) => !keep.has(t) && /[A-Za-zÀ-ÿ]/.test(t));
if (missing.length || unused.length) {
  if (missing.length) console.error('Sin traducción en es.mjs:\n  ' + missing.join('\n  '));
  if (unused.length) console.error('Claves de es.mjs que ya no están en index.html:\n  ' + unused.join('\n  '));
  process.exit(1);
}

const swap = (from, to) => {
  if (!html.includes(from)) throw new Error('No se encontró: ' + from);
  html = html.split(from).join(to);
};
// Idioma del documento y selector EN / ES
swap('<html lang="en">', '<html lang="es">');
// Links a archivos (no a carpetas) para que funcionen también abriendo con doble clic
swap('<a class="lang__option is-active" href="index.html" hreflang="en" lang="en" aria-current="page">EN</a>',
     '<a class="lang__option" href="../index.html" hreflang="en" lang="en">EN</a>');
swap('<a class="lang__option" href="es/index.html" hreflang="es" lang="es">ES</a>',
     '<a class="lang__option is-active" href="index.html" hreflang="es" lang="es" aria-current="page">ES</a>');
swap('<link rel="alternate" hreflang="en" href="index.html">', '<link rel="alternate" hreflang="en" href="../index.html">');
swap('<link rel="alternate" hreflang="es" href="es/index.html">', '<link rel="alternate" hreflang="es" href="index.html">');
// Rutas relativas desde /es/
swap('href="styles.css"', 'href="../styles.css"');
swap('src="script.js"', 'src="../script.js"');
swap('src="assets/', 'src="../assets/');

html = html.replace('<!doctype html>', '<!doctype html>\n<!-- Archivo generado por tools/build-es.mjs a partir de index.html: no editar a mano -->');
fs.mkdirSync(path.join(root, 'es'), { recursive: true });
fs.writeFileSync(path.join(root, 'es', 'index.html'), html);
console.log('es/index.html generado');
