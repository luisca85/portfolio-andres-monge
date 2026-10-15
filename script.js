(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  // Arranca arriba aunque el navegador intente restaurar la posición.
  const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  toTop();
  window.addEventListener('load', toTop, { once: true });

  // ---------- Entrada del hero ----------
  // Doble rAF: asegura que el estado inicial se pinte antes de animar.
  const hero = document.querySelector('.hero');
  // Duración total de la entrada (player: 1.6 s de demora + 0.7 s). El negativo
  // de la mitad izquierda se mantiene al menos hasta que termina.
  const ENTRANCE_MS = reduceMotion ? 0 : 2300;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // ---------- Menú mobile (Figma 420:2685) ----------
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('mobile-menu');

  function setMenu(open) {
    if (!nav || !toggle || !menu) return;
    nav.classList.toggle('is-menu-open', open);
    menu.classList.toggle('is-open', open);
    menu.inert = !open;
    document.documentElement.classList.toggle('is-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
  }

  if (toggle && menu) {
    toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });
    // Si se agranda la ventana a escritorio con el menú abierto, se cierra.
    matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  // Selector de idioma (Figma 421:2560): son links entre index.html (EN) y
  // es/index.html (ES); no necesita JS.

  // ---------- Intro (Figma 345:5946) ----------
  // Se reproduce una vez; al terminar (o si el usuario la saltea) se funde y
  // arranca la entrada del hero.
  const INTRO = { DURATION_MS: 7132, FADE_MS: 600, LOAD_TIMEOUT_MS: 2500 };
  const introDone = runIntro();

  function runIntro() {
    const root = document.documentElement;
    const intro = document.querySelector('.intro');
    if (!intro || !root.classList.contains('has-intro')) return Promise.resolve();
    try { sessionStorage.setItem('intro-seen', '1'); } catch (e) {}

    const stage = intro.querySelector('.intro__stage');
    const fit = () => {
      // Cubre la ventana como el frame de Figma, pero el logo (478 px) siempre entra.
      const cover = Math.max(innerWidth / 1440, innerHeight / 1024);
      const logoFit = (innerWidth * 0.86) / 407.4;  // isotipo + palabras en reposo
      stage.style.setProperty('--intro-scale', String(Math.min(cover, logoFit)));
    };
    fit();
    addEventListener('resize', fit);

    return new Promise((resolve) => {
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        removeEventListener('resize', fit);
        ['click', 'keydown', 'wheel', 'touchstart'].forEach((ev) => removeEventListener(ev, finish));
        intro.classList.add('is-leaving');
        root.classList.add('intro-done');        // libera el scroll; la capa sigue durante el fundido
        resolve();
        setTimeout(() => intro.remove(), INTRO.FADE_MS);
      };

      // Arranca cuando las fotos están decodificadas (o tras un tope de espera).
      const stills = [...intro.querySelectorAll('img')];
      const ready = Promise.all(stills.map((img) => (img.decode ? img.decode().catch(() => {}) : null)));
      Promise.race([ready, wait(INTRO.LOAD_TIMEOUT_MS)]).then(() => {
        intro.classList.add('is-playing');
        setTimeout(finish, INTRO.DURATION_MS);
      });

      // Saltear: clic, tecla, rueda o toque.
      ['click', 'keydown', 'wheel', 'touchstart'].forEach((ev) =>
        addEventListener(ev, finish, { passive: true }));
    });
  }

  let entranceDone = Promise.resolve();
  if (hero) {
    entranceDone = introDone.then(() => new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        hero.classList.add('is-in');
        setTimeout(resolve, ENTRANCE_MS);
      }));
    }));
  }

  // ---------- Oficios: se escriben y desescriben intercambiando lados ----------
  // Writer ↔ Filmmaker y Branded Content ↔ Film & TV, cada HOLD_MS.
  const ROLES = { HOLD_MS: 3500, ERASE_MS: 45, TYPE_MS: 75, GAP_MS: 250 };

  async function retype(el, text) {
    el.classList.add('is-typing');
    while (el.textContent.length) {
      el.textContent = el.textContent.slice(0, -1);
      await wait(ROLES.ERASE_MS);
    }
    await wait(ROLES.GAP_MS);
    for (let i = 1; i <= text.length; i++) {
      el.textContent = text.slice(0, i);
      await wait(ROLES.TYPE_MS);
    }
    el.classList.remove('is-typing');
  }

  async function cycleRoles() {
    const left = [...document.querySelectorAll('.hero__roles--left [data-role-pair]')];
    const right = [...document.querySelectorAll('.hero__roles--right [data-role-pair]')];
    if (!left.length || left.length !== right.length) return;
    for (;;) {
      await wait(ROLES.HOLD_MS);
      if (document.hidden) continue; // no animar con la pestaña en segundo plano
      const jobs = left.flatMap((l, i) => {
        const r = right[i];
        const [a, b] = [l.textContent, r.textContent];
        return [retype(l, b), retype(r, a)];
      });
      await Promise.all(jobs);
    }
  }

  if (!reduceMotion) entranceDone.then(cycleRoles);

  // ---------- Player del hero: película de fondo sin sonido ----------
  // Si una película tiene `src` (mp4 propio) se usa ese archivo; si no, YouTube.
  // `start` permite saltear créditos o negro inicial (segundos).
  const FILMS = [
    { title: '5 Sentidos', youtube: 'ZeUtnoE-9aY', src: '', start: 0 },
    { title: 'Nahuel', youtube: 'uoE--jaxy3g', src: '', start: 0 },
    { title: 'Romano Honorario', youtube: '-ETgsrVfcU4', src: '', start: 0 },
    { title: 'Silent Pain / Mime', youtube: 'AoQZPk6PI6E', src: '', start: 0 }, // verificar I/l del id
  ];

  const buttons = document.querySelectorAll('.player__item');
  const layers = document.querySelectorAll('.hero__bg');
  const counter = document.querySelector('[data-player-index]');
  const slots = [...document.querySelectorAll('[data-video-slot]')];
  let current = 0;

  // Dos fuentes de video, una por mitad. La izquierda manda y la derecha la sigue.
  const video = createVideoBackground();

  function selectFilm(index) {
    current = index;
    buttons.forEach((btn) => {
      const active = Number(btn.dataset.film) === index;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    layers.forEach((layer) => {
      layer.classList.toggle('is-active', Number(layer.dataset.film) === index);
    });
    if (counter) counter.textContent = String(index + 1);
    video.load(FILMS[index]);
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => selectFilm(Number(btn.dataset.film)));
  });

  function createVideoBackground() {
    // Sin video si el usuario pide menos movimiento: queda el still.
    if (reduceMotion || !hero || slots.length !== 2) return { load() {} };

    let ytPlayers = null;
    let ytReady = null;
    let syncTimer = null;
    let token = 0;

    const showVideo = (on) => {
      hero.classList.toggle('is-video', on);
      // La primera vez que la película arranca, se quita el negativo y no vuelve.
      if (on) entranceDone.then(() => hero.classList.add('is-unified'));
    };

    function stopSync() { clearInterval(syncTimer); syncTimer = null; }
    function startSync(getTime, setTime) {
      stopSync();
      syncTimer = setInterval(() => {
        const [a, b] = [getTime(0), getTime(1)];
        if (Math.abs(a - b) > 0.25) setTime(1, a);
      }, 1500);
    }

    // --- mp4 propio ---
    function loadFile(film, myToken) {
      const els = slots.map((slot) => {
        slot.innerHTML = '';
        const v = document.createElement('video');
        Object.assign(v, { src: film.src, muted: true, loop: true, autoplay: true, playsInline: true });
        v.setAttribute('muted', '');
        v.currentTime = film.start || 0;
        slot.appendChild(v);
        return v;
      });
      let playing = 0;
      els.forEach((v) => v.addEventListener('playing', () => {
        if (myToken === token && ++playing === 2) showVideo(true);
      }, { once: true }));
      startSync((i) => els[i].currentTime, (i, t) => { els[i].currentTime = t; });
    }

    // --- YouTube (IFrame API, dominio sin cookies) ---
    function ensureYouTube(film) {
      if (ytReady) return ytReady;
      ytReady = new Promise((resolve) => {
        if (window.YT && window.YT.Player) return resolve();
        window.onYouTubeIframeAPIReady = resolve;
        const s = document.createElement('script');
        s.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(s);
      }).then(() => Promise.all(slots.map((slot) => new Promise((resolve) => {
        slot.innerHTML = '<div></div>';
        const p = new YT.Player(slot.firstChild, {
          videoId: film.youtube,
          playerVars: {
            autoplay: 1, mute: 1, controls: 0, disablekb: 1, fs: 0,
            iv_load_policy: 3, modestbranding: 1, playsinline: 1, rel: 0,
            start: film.start || 0, origin: window.location.origin,
          },
          events: {
            onReady: () => { p.mute(); resolve(p); },
            onStateChange: (e) => onYtState(p, e.data),
            onError: () => showVideo(false), // embed bloqueado o id inválido: queda el still
          },
        });
      })))).then((players) => { ytPlayers = players; return players; });
      return ytReady;
    }

    let ytPlaying = new Set();
    function onYtState(p, state) {
      if (state === YT.PlayerState.ENDED) {
        p.seekTo(FILMS[current].start || 0, true); // loop
        p.playVideo();
      }
      if (state === YT.PlayerState.PLAYING) {
        ytPlaying.add(p);
        if (ytPlaying.size === 2) showVideo(true);
      }
    }

    function loadYouTube(film, myToken) {
      ensureYouTube(film).then((players) => {
        if (myToken !== token) return;
        ytPlaying = new Set();
        players.forEach((p) => {
          p.mute();
          // El primer video ya viene cargado desde la creación del player.
          const loaded = p.getVideoData && p.getVideoData().video_id;
          if (loaded !== film.youtube) {
            p.loadVideoById({ videoId: film.youtube, startSeconds: film.start || 0 });
          } else if (p.getPlayerState() === YT.PlayerState.PLAYING) {
            ytPlaying.add(p);
          } else {
            p.playVideo();
          }
        });
        if (ytPlaying.size === 2) showVideo(true);
        startSync((i) => players[i].getCurrentTime(), (i, t) => players[i].seekTo(t, true));
      });
    }

    return {
      load(film) {
        const myToken = ++token;
        stopSync();
        showVideo(false);
        // Espera el fundido del video anterior antes de cambiar la fuente.
        setTimeout(() => {
          if (myToken !== token) return;
          if (film.src) {
            if (ytPlayers) {
              ytPlayers.forEach((p) => p.destroy());
              ytPlayers = null;
              ytReady = null;
            }
            loadFile(film, myToken);
          } else if (film.youtube) {
            loadYouTube(film, myToken);
          }
        }, 400);
      },
    };
  }

  selectFilm(0);

  // ---------- Timeline: cada año se superpone sobre el anterior ----------
  // Un año más alto que la ventana se fija cuando su borde inferior llega al
  // borde inferior de la ventana, así se ve completo antes de que lo tape el siguiente.
  const years = document.querySelectorAll('.year');

  // Un año más bajo que la ventana se fija justo debajo del nav (no detrás,
  // donde quedaría tapado el título del año).
  const navBar = document.querySelector('.nav');

  // Un año alto sigue subiendo hasta que su final queda a STICKY_RELEASE de la
  // pantalla por encima del borde inferior, y recién ahí se fija. Así su último
  // contenido (el botón del cuadro) no queda tapado apenas aparece.
  const STICKY_RELEASE = 0.33;

  function updateStickyTops() {
    const navH = navBar ? navBar.offsetHeight : 0;
    const release = window.innerHeight * STICKY_RELEASE;
    years.forEach((year) => {
      year.style.top = `${Math.min(navH, window.innerHeight - release - year.offsetHeight)}px`;
    });
  }

  if (!reduceMotion) {
    updateStickyTops();
    window.addEventListener('resize', updateStickyTops);
    // Se recalcula cada vez que cambia el alto de un año o del nav
    // (fuentes, imágenes, cambio a mobile).
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(updateStickyTops);
      years.forEach((year) => ro.observe(year));
      if (navBar) ro.observe(navBar);
    } else {
      window.addEventListener('load', updateStickyTops);
    }
  }

  // ---------- Franja de premios: entrada escalonada ----------
  // Se observa recién cuando termina la entrada del hero: en pantallas altas
  // la franja ya está a la vista al cargar y no debe animarse tapada por la intro.
  const strip = document.querySelector('.awards-strip');
  if (strip) {
    strip.querySelectorAll('.award').forEach((award, i) => award.style.setProperty('--i', i));
    if (!('IntersectionObserver' in window) || reduceMotion) {
      strip.classList.add('is-visible');
    } else {
      entranceDone.then(() => {
        const stripObserver = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) return;
          strip.classList.add('is-visible');
          stripObserver.disconnect();
        }, { threshold: 0.6 });
        stripObserver.observe(strip);
      });
    }
  }

  // ---------- Entrada de bloques al hacer scroll ----------
  const items = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || reduceMotion) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  items.forEach((el) => observer.observe(el));
})();
