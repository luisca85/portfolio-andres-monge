// Traducción por nodos: reemplaza textos completos (nodos de texto y
// atributos aria-label / data-label-* / alt), nunca fragmentos sueltos.
export function translateHtml(html, dict) {
  const used = new Set();
  const missing = new Set();
  const tr = (raw) => {
    const core = raw.trim();
    if (!core) return raw;
    if (Object.prototype.hasOwnProperty.call(dict, core)) {
      used.add(core);
      return raw.replace(core, dict[core]);
    }
    missing.add(core);
    return raw;
  };
  const head = html.indexOf('<body');
  if (head < 0) throw new Error('No se encontró <body');
  let out = html.slice(0, head) + html.slice(head)
    // nodos de texto fuera de <script> y <style>
    .replace(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->)|>([^<>]+)</g,
      (m, skip, text) => (skip ? skip : `>${tr(text)}<`))
    .replace(/(aria-label|data-label-open|data-label-close|alt)="([^"]*)"/g,
      (m, attr, val) => `${attr}="${tr(val)}"`);
  return { html: out, missing: [...missing], used: [...used] };
}
