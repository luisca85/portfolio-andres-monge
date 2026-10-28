// Genera la versión en español (es/) de cada página en inglés de PAGES.
// Uso: node tools/build-es.mjs   — correrlo después de cada cambio en una página.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { translateHtml } from './i18n.mjs';
import { es, keep } from './es.mjs';

const PAGES = ['index.html', 'campaign-fashion.html', 'film-5-sentidos.html',
  'film-nahuel.html', 'film-silent-pain.html', 'film-romano-honorario.html', 'films.html', 'campaigns.html',
  'writing.html', 'writing-nationalism.html', 'writing-neurodivergent.html', 'writing-us-vs-them.html',
  'writing-outside-the-wake.html'];
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Primero se traducen todas: una clave sin usar solo es error si no la usa ninguna página.
const results = PAGES.map((page) => ({ page, ...translateHtml(fs.readFileSync(path.join(root, page), 'utf8'), es) }));
const used = new Set(results.flatMap((r) => r.used));
const unused = Object.keys(es).filter((k) => !used.has(k));
let failed = false;
for (const r of results) {
  const missing = r.missing.filter((t) => !keep.has(t) && /[A-Za-zÀ-ÿ]/.test(t));
  if (missing.length) {
    console.error(`Sin traducción en es.mjs (${r.page}):\n  ` + missing.join('\n  '));
    failed = true;
  }
}
if (unused.length) {
  console.error('Claves de es.mjs que ya no están en ninguna página:\n  ' + unused.join('\n  '));
  failed = true;
}
if (failed) process.exit(1);

for (const { page, html: translated } of results) {
  let html = translated;
  const swap = (from, to) => {
    if (!html.includes(from)) throw new Error(`No se encontró en ${page}: ${from}`);
    html = html.split(from).join(to);
  };
  // Idioma del documento
  swap('<html lang="en">', '<html lang="es">');
  // Selector EN / ES y alternates. Links a archivos (no a carpetas) para que
  // funcionen también abriendo con doble clic.
  swap(`<a class="lang__option is-active" href="${page}" hreflang="en" lang="en" aria-current="page">EN</a>`,
       `<a class="lang__option" href="../${page}" hreflang="en" lang="en">EN</a>`);
  swap(`<a class="lang__option" href="es/${page}" hreflang="es" lang="es">ES</a>`,
       `<a class="lang__option is-active" href="${page}" hreflang="es" lang="es" aria-current="page">ES</a>`);
  swap(`<link rel="alternate" hreflang="en" href="${page}">`, `<link rel="alternate" hreflang="en" href="../${page}">`);
  swap(`<link rel="alternate" hreflang="es" href="es/${page}">`, `<link rel="alternate" hreflang="es" href="${page}">`);
  // Rutas relativas desde /es/ (los links entre páginas quedan dentro de /es/)
  html = html.replace(/(href|src)="([\w-]+\.(?:css|js))"/g, '$1="../$2"');
  html = html.replace(/(src|data-full|data-video)="assets\//g, '$1="../assets/');

  html = html.replace('<!doctype html>', `<!doctype html>\n<!-- Archivo generado por tools/build-es.mjs a partir de ${page}: no editar a mano -->`);
  fs.mkdirSync(path.join(root, 'es'), { recursive: true });
  fs.writeFileSync(path.join(root, 'es', page), html);
  console.log(`es/${page} generado`);
}
