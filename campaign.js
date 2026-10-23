(function () {
  // ---------- Video principal (detalle de película) ----------
  // Póster + play: al hacer clic se cambia por el video de YouTube, con sonido.
  document.querySelectorAll('[data-video-youtube]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const frame = document.createElement('div');
      frame.className = 'video__frame';
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.videoYoutube}?autoplay=1&rel=0`;
      iframe.title = btn.getAttribute('aria-label');
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.allowFullscreen = true;
      frame.appendChild(iframe);
      btn.replaceWith(frame);
      iframe.focus();
    }, { once: true });
  });
})();

(function () {
  // ---------- Galería del detalle de campaña ----------
  // Páginas de miniaturas (5 en escritorio, 3 en mobile, como en el Figma).
  // Clic en una miniatura: la muestra grande. "+N" y las flechas pasan de página.
  // Flechas del teclado (con foco en la galería): imagen anterior / siguiente.
  const gallery = document.querySelector('[data-gallery]');
  if (!gallery) return;

  const main = gallery.querySelector('[data-gallery-main]');
  const thumbs = [...gallery.querySelectorAll('.thumb[data-full]')];
  const items = thumbs.map((t) => t.closest('li'));
  const moreItem = gallery.querySelector('.gallery__more-item');
  const moreBtn = gallery.querySelector('[data-gallery-more]');
  const moreCount = gallery.querySelector('[data-gallery-more-count]');
  const range = gallery.querySelector('[data-gallery-range]');
  const prev = gallery.querySelector('[data-gallery-prev]');
  const next = gallery.querySelector('[data-gallery-next]');
  const strip = gallery.querySelector('.gallery__strip');

  const ofWord = document.documentElement.lang === 'es' ? 'de' : 'of';
  const mobile = matchMedia('(max-width: 900px)');
  const pageSize = () => (mobile.matches ? 3 : 5);
  const pages = () => Math.ceil(thumbs.length / pageSize());

  let active = 0;
  let page = 0;

  function show(i) {
    active = (i + thumbs.length) % thumbs.length;
    const t = thumbs[active];
    const img = t.querySelector('img');
    thumbs.forEach((b) => {
      b.classList.toggle('is-active', b === t);
      b.setAttribute('aria-pressed', String(b === t));
    });
    if (main.getAttribute('src') !== t.dataset.full) {
      main.classList.add('is-loading');
      const pre = new Image();
      pre.onload = pre.onerror = () => {
        main.src = t.dataset.full;
        main.alt = img.alt;
        main.classList.remove('is-loading');
      };
      pre.src = t.dataset.full;
    }
    const p = Math.floor(active / pageSize());
    if (p !== page) setPage(p, false);
  }

  function setPage(p, select = true) {
    page = Math.max(0, Math.min(p, pages() - 1));
    const size = pageSize();
    const from = page * size;
    const to = Math.min(from + size, thumbs.length);
    items.forEach((li, i) => { li.hidden = i < from || i >= to; });
    const rest = thumbs.length - to;
    moreItem.hidden = rest === 0;
    moreCount.textContent = '+' + rest;
    range.textContent = `${from + 1}–${to} ${ofWord} ${thumbs.length}`;
    prev.disabled = page === 0;
    next.disabled = page === pages() - 1;
    if (strip) strip.scrollLeft = 0;
    if (select) show(from);
  }

  thumbs.forEach((t, i) => t.addEventListener('click', () => show(i)));
  moreBtn.addEventListener('click', () => setPage(page + 1));
  prev.addEventListener('click', () => setPage(page - 1));
  next.addEventListener('click', () => setPage(page + 1));
  gallery.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    show(active + (e.key === 'ArrowRight' ? 1 : -1));
    thumbs[active].focus();
  });
  // Al cambiar entre escritorio y mobile cambia el tamaño de página.
  mobile.addEventListener('change', () => setPage(Math.floor(active / pageSize()), false));

  setPage(0, false);
  show(0);
})();
