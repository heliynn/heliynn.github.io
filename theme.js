/* Seasonal switch.

   Sets html[data-theme="xmas"] from localStorage, ?theme=xmas, the button or
   the t key, and tells the rest of the page with a "themechange" event.

   Two things are added to the page here: a tree behind everything, and a hat
   on the mascot, which has to follow the cat because the cat can be dragged
   anywhere. Both disappear with this file. */
(() => {
  const KEY = 'site-theme';
  const root = document.documentElement;

  /* where a hat sits on each mascot, as fractions of the picture as drawn:
     the first cat sits upright and fills most of its frame, the second is
     asleep in a wizard hat with its head small and low in the corner, so one
     set of numbers cannot fit both. The tilt goes with the head, not the hat */
  const HAT_SPOTS = {
    /* measured off the picture. The upright cat: ears at x .17 and .68, crown
       running .27-.60 at y .16-.19, eyes at y .30-.34, so its trim lands at
       .24 over a head centred on .43 */
    'chomusuke-1': { left: .28, top: -.11, width: .45, tilt: -9 },
    /* The sleeping cat: head spans x .245-.46 with its crown at y .445 and the
       shut eyes at y .645, so its trim lands at .47, centred on .35 */
    'chomusuke-2': { left: .25, top: .22, width: .25, tilt: -8 }
  };
  const HAT_FALLBACK = { left: .28, top: -.11, width: .45, tilt: -9 };

  const HAT = '<svg viewBox="0 0 72 56" aria-hidden="true" focusable="false">'
    + '<path d="M9 45C16 26 32 9 49 5c-2 12-5 26 3 35z" fill="#bf1f27" />'
    + '<rect x="2" y="38" width="54" height="12" rx="6" fill="#efe9dd" transform="rotate(-9 29 44)" />'
    + '<circle cx="52" cy="6" r="7.5" fill="#efe9dd" />'
    + '</svg>';

  /* this script is the only thing that knows where the season's pictures
     live, so resolve them against its own URL: the 404 page is served from
     whatever address was asked for, where a relative path would not hold */
  const here = document.currentScript ? document.currentScript.src : location.href;
  const asset = (name) => new URL('assets/' + name, here).href;

  const TREE = '<img src="' + asset('tree.png') + '" alt="" width="221" height="320"'
    + ' decoding="async" />';

  const SNOWFLAKE = '<img src="' + asset('snowflake.webp') + '" alt="" width="63" height="64"'
    + ' decoding="async" />';

  /* the winter pictures that take over the two edge corners in the season. They
     are only ever pointed at from inside the season, so a visit in July never
     asks for one */
  /* 4 and 6 are left out: they are cropped tight on the face, so at the size a
     corner picture is drawn they read as a zoom rather than a portrait next to
     the other six. The files stay in assets for whenever they are wanted */
  const WINTER_ART = [1, 2, 3, 5, 7, 8]
    .map((n) => asset('christmas-megumin-' + n + '.webp'));

  const read = () => {
    try {
      return localStorage.getItem(KEY) || '';
    } catch (error) {
      return ''; /* storage blocked: the choice just does not outlive the tab */
    }
  };

  const save = (value) => {
    try {
      localStorage.setItem(KEY, value);
    } catch (error) {
      /* same */
    }
  };

  const button = document.createElement('button');
  button.className = 'season';
  button.type = 'button';
  button.innerHTML = SNOWFLAKE;
  button.setAttribute('aria-label', 'Seasonal theme');
  button.setAttribute('aria-pressed', 'false');
  button.title = 'Seasonal theme (t)';

  const tree = document.createElement('div');
  tree.className = 'xmas-tree';
  tree.setAttribute('aria-hidden', 'true');
  tree.innerHTML = TREE;

  const hat = document.createElement('span');
  hat.className = 'mascot__hat';
  hat.setAttribute('aria-hidden', 'true');
  hat.innerHTML = HAT;

  document.body.append(tree, hat, button);

  let mascot = null;
  let watcher = null;
  let chasing = 0;
  let chaseUntil = 0;

  const spotFor = (source) => {
    const name = (source || '').split('/').pop().split('?')[0].replace(/\.[a-z]+$/i, '');
    return HAT_SPOTS[name] || HAT_FALLBACK;
  };

  /* the mascot's box already includes the drag lean, so reading it here keeps
     the hat tilted with the cat without touching the drag code */
  const sync = () => {
    if (!root.dataset.theme) return;
    if (!mascot || !mascot.isConnected) mascot = document.querySelector('.mascot');
    /* the picture can fail to load and remove itself: no cat, no hat */
    if (!mascot) {
      hat.style.width = '';
      return;
    }
    if (!mascot.naturalWidth) return;

    const box = mascot.getBoundingClientRect();
    if (!box.width) return;

    /* the mascot is drawn "contain" inside its box, so the box is wider than
       the picture: work from where the picture actually is, not the element */
    const scale = Math.min(box.width / mascot.naturalWidth, box.height / mascot.naturalHeight);
    const drawnW = mascot.naturalWidth * scale;
    const drawnH = mascot.naturalHeight * scale;
    const originX = box.left + (box.width - drawnW) / 2;
    const originY = box.top + (box.height - drawnH) / 2;

    /* the src attribute, not currentSrc: currentSrc still reports the old
       picture for a moment after a swap, which put the wrong hat on the cat */
    const spot = spotFor(mascot.getAttribute('src') || mascot.src);
    hat.style.width = Math.round(drawnW * spot.width) + 'px';
    hat.style.setProperty('--hat-tilt', spot.tilt + 'deg');
    hat.style.left = Math.round(originX + drawnW * spot.left) + 'px';
    hat.style.top = Math.round(originY + drawnH * spot.top) + 'px';
  };

  const chase = () => {
    sync();
    chasing = performance.now() < chaseUntil ? requestAnimationFrame(chase) : 0;
  };

  /* the lean is a CSS transition, so the cat keeps moving for a moment after
     the last style write: follow it for as long as that can last, or the hat
     arrives early and drifts back into place when the cat settles */
  const follow = () => {
    if (!root.dataset.theme) return;
    chaseUntil = performance.now() + 420;
    if (!chasing) chasing = requestAnimationFrame(chase);
  };

  /* place the hat at once, then chase the transition the drag starts: the
     immediate pass is what makes it right on the first frame */
  const kick = () => {
    sync();
    follow();
  };

  /* The winter picture each corner was given, kept for the whole visit. The
     observer below fires on every change to the body, and choosing again on
     each of those made the corners shuffle while the page was still building
     itself. A toggle is the only thing that re-picks. */
  const winterPick = new WeakMap();

  const art = (repick) => {
    const edges = [...document.querySelectorAll('.art')];
    if (!edges.length) return;

    const taken = new Set();

    for (const image of edges) {
      /* the picture the visit started with, remembered once per element */
      if (!image.dataset.seasonSrc) image.dataset.seasonSrc = image.getAttribute('src') || '';

      if (!root.dataset.theme) {
        winterPick.delete(image);
        const original = image.dataset.seasonSrc;
        if (original && image.getAttribute('src') !== original) image.setAttribute('src', original);
        continue;
      }

      if (repick) winterPick.delete(image);
      if (!winterPick.has(image)) {
        /* the two corners never wear the same picture */
        const free = WINTER_ART.filter((src) => !taken.has(src));
        const pool = free.length ? free : WINTER_ART;
        winterPick.set(image, pool[Math.floor(Math.random() * pool.length)]);
      }

      const next = winterPick.get(image);
      taken.add(next);
      if (next && image.getAttribute('src') !== next) image.setAttribute('src', next);
    }
  };

  /* script.js mounts the mascot after this runs, so wait for it to appear
     instead of assuming it is on every page */
  const watch = () => {
    if (mascot && mascot.isConnected) return;
    mascot = document.querySelector('.mascot');
    if (!mascot) return;
    if (watcher) watcher.disconnect();
    watcher = new MutationObserver(kick);
    watcher.observe(mascot, { attributes: true, attributeFilter: ['style', 'class', 'src'] });
    /* the picture can still be decoding when the element appears, and then
       there is no box to measure: place the hat again once it has a size */
    mascot.addEventListener('load', kick);
    kick();
  };

  new MutationObserver(() => {
    watch();
    art(false);
  }).observe(document.body, { childList: true });

  const apply = (on, remember) => {
    if (on) root.dataset.theme = 'xmas';
    else delete root.dataset.theme;
    button.setAttribute('aria-pressed', String(on));
    if (remember) save(on ? 'xmas' : '');
    watch();
    kick();
    /* turning it on is the moment to choose the corners again */
    art(on);
    document.dispatchEvent(new CustomEvent('themechange', { detail: { on } }));
  };

  /* a shared link wins on load, and is then remembered like any other choice */
  const asked = new URLSearchParams(location.search).get('theme');
  const on = asked ? asked === 'xmas' : read() === 'xmas';
  apply(on, false);
  if (asked) save(on ? 'xmas' : '');

  button.addEventListener('click', () => apply(!root.dataset.theme, true));
  addEventListener('resize', kick);

  addEventListener('keydown', (event) => {
    if (event.key !== 't' && event.key !== 'T') return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target;
    if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
    event.preventDefault();
    apply(!root.dataset.theme, true);
  });
})();
