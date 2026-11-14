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
     the first cat is sitting upright, the second is asleep in a wizard hat
     with its head down in the corner, so one set of numbers cannot fit both */
  const HAT_SPOTS = {
    'chomusuke-1': { left: .18, top: .04, width: .42 },
    'chomusuke-2': { left: .23, top: .14, width: .25 }
  };
  const HAT_FALLBACK = { left: .18, top: .04, width: .42 };

  const HAT = '<svg viewBox="0 0 72 56" aria-hidden="true" focusable="false">'
    + '<path d="M9 45C16 26 32 9 49 5c-2 12-5 26 3 35z" fill="#bf1f27" />'
    + '<rect x="2" y="38" width="54" height="12" rx="6" fill="#efe9dd" transform="rotate(-9 29 44)" />'
    + '<circle cx="52" cy="6" r="7.5" fill="#efe9dd" />'
    + '</svg>';

  const TREE = '<svg viewBox="0 0 120 160" aria-hidden="true" focusable="false">'
    + '<rect x="55" y="126" width="10" height="26" rx="2" fill="#3a2a1d" />'
    + '<path d="M60 8L82 54H38z" fill="#153a28" />'
    + '<path d="M60 32L90 90H30z" fill="#123426" />'
    + '<path d="M60 58L100 126H20z" fill="#0f2c20" />'
    + '<circle cx="50" cy="74" r="3" fill="#d4483c" opacity=".7" />'
    + '<circle cx="69" cy="97" r="3" fill="#e6b45c" opacity=".7" />'
    + '<circle cx="45" cy="107" r="2.6" fill="#e6b45c" opacity=".55" />'
    + '<circle cx="60" cy="9" r="3.6" fill="#e6b45c" opacity=".75" />'
    + '</svg>';

  const SNOWFLAKE = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">'
    + '<g fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round">'
    + '<path d="M8 2.3v11.4" />'
    + '<path d="M3.1 5.2l9.8 5.6" />'
    + '<path d="M12.9 5.2L3.1 10.8" />'
    + '<path d="M6.3 3.2L8 5.3l1.7-2.1" />'
    + '<path d="M6.3 12.8L8 10.7l1.7 2.1" />'
    + '</g></svg>';

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
    if (!mascot || !mascot.naturalWidth) return;

    const box = mascot.getBoundingClientRect();
    if (!box.width) return;

    /* the mascot is drawn "contain" inside its box, so the box is wider than
       the picture: work from where the picture actually is, not the element */
    const scale = Math.min(box.width / mascot.naturalWidth, box.height / mascot.naturalHeight);
    const drawnW = mascot.naturalWidth * scale;
    const drawnH = mascot.naturalHeight * scale;
    const originX = box.left + (box.width - drawnW) / 2;
    const originY = box.top + (box.height - drawnH) / 2;

    const spot = spotFor(mascot.currentSrc || mascot.src);
    hat.style.width = Math.round(drawnW * spot.width) + 'px';
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

  /* script.js mounts the mascot after this runs, so wait for it to appear
     instead of assuming it is on every page */
  const watch = () => {
    if (mascot && mascot.isConnected) return;
    mascot = document.querySelector('.mascot');
    if (!mascot) return;
    if (watcher) watcher.disconnect();
    watcher = new MutationObserver(follow);
    watcher.observe(mascot, { attributes: true, attributeFilter: ['style', 'class', 'src'] });
    /* the picture can still be decoding when the element appears, and then
       there is no box to measure: place the hat again once it has a size */
    mascot.addEventListener('load', follow);
    follow();
  };

  new MutationObserver(watch).observe(document.body, { childList: true });

  const apply = (on, remember) => {
    if (on) root.dataset.theme = 'xmas';
    else delete root.dataset.theme;
    button.setAttribute('aria-pressed', String(on));
    if (remember) save(on ? 'xmas' : '');
    watch();
    follow();
    document.dispatchEvent(new CustomEvent('themechange', { detail: { on } }));
  };

  /* a shared link wins on load, and is then remembered like any other choice */
  const asked = new URLSearchParams(location.search).get('theme');
  const on = asked ? asked === 'xmas' : read() === 'xmas';
  apply(on, false);
  if (asked) save(on ? 'xmas' : '');

  button.addEventListener('click', () => apply(!root.dataset.theme, true));
  addEventListener('resize', follow);

  addEventListener('keydown', (event) => {
    if (event.key !== 't' && event.key !== 'T') return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target;
    if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
    event.preventDefault();
    apply(!root.dataset.theme, true);
  });
})();
