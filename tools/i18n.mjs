// Traducción por nodos: reemplaza textos completos (nodos de texto y
// atributos aria-label / data-label-*), nunca fragmentos sueltos.
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
  const head = html.indexOf('<body>');
  let out = html.slice(0, head) + html.slice(head)
    // nodos de texto fuera de <script> y <style>
    .replace(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->)|>([^<>]+)</g,
      (m, skip, text) => (skip ? skip : `>${tr(text)}<`))
    .replace(/(aria-label|data-label-open|data-label-close)="([^"]*)"/g,
      (m, attr, val) => `${attr}="${tr(val)}"`);
  const unused = Object.keys(dict).filter((k) => !used.has(k));
  return { html: out, missing: [...missing], unused };
}
