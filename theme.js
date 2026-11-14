/* Seasonal switch.

   Sets html[data-theme="xmas"] from localStorage, ?theme=xmas, the chip or the
   t key, and tells the rest of the page with a "themechange" event. The only
   thing it puts on the page besides the chip is the hat, which has to follow
   the mascot because the mascot can be dragged anywhere. */
(() => {
  const KEY = 'site-theme';
  const root = document.documentElement;

  const HAT = '<svg viewBox="0 0 72 56" aria-hidden="true" focusable="false">'
    + '<path d="M9 45C16 26 32 9 49 5c-2 12-5 26 3 35z" fill="#bf1f27" />'
    + '<rect x="2" y="38" width="54" height="12" rx="6" fill="#efe9dd" transform="rotate(-9 29 44)" />'
    + '<circle cx="52" cy="6" r="7.5" fill="#efe9dd" />'
    + '</svg>';

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
  button.textContent = 'Seasonal';
  button.title = 'Seasonal theme (t)';
  button.setAttribute('aria-pressed', 'false');

  const hat = document.createElement('span');
  hat.className = 'mascot__hat';
  hat.setAttribute('aria-hidden', 'true');
  hat.innerHTML = HAT;
  document.body.append(hat);

  let mascot = null;
  let watcher = null;

  /* the mascot's box already includes the drag lean, so reading it here keeps
     the hat tilted with the cat without touching the drag code */
  const sync = () => {
    if (!root.dataset.theme) return;
    if (!mascot || !mascot.isConnected) mascot = document.querySelector('.mascot');
    if (!mascot) return;
    const box = mascot.getBoundingClientRect();
    if (!box.width || !mascot.naturalWidth) return;

    /* the mascot is drawn "contain" inside its box, so the box is wider than
       the cat: work from where the picture actually is, not from the element */
    const scale = Math.min(box.width / mascot.naturalWidth, box.height / mascot.naturalHeight);
    const drawnW = mascot.naturalWidth * scale;
    const drawnH = mascot.naturalHeight * scale;
    const originX = box.left + (box.width - drawnW) / 2;
    const originY = box.top + (box.height - drawnH) / 2;

    hat.style.width = Math.round(drawnW * .42) + 'px';
    hat.style.left = Math.round(originX + drawnW * .18) + 'px';
    hat.style.top = Math.round(originY + drawnH * .02) + 'px';
    hat.style.transform = 'rotate(-12deg)';
  };

  /* script.js mounts the mascot after this runs, so wait for it to appear
     instead of assuming it is on every page */
  const watch = () => {
    if (mascot && mascot.isConnected) return;
    mascot = document.querySelector('.mascot');
    if (!mascot) return;
    if (watcher) watcher.disconnect();
    watcher = new MutationObserver(sync);
    watcher.observe(mascot, { attributes: true, attributeFilter: ['style', 'class'] });
    sync();
  };

  new MutationObserver(watch).observe(document.body, { childList: true });

  const apply = (on, remember) => {
    if (on) root.dataset.theme = 'xmas';
    else delete root.dataset.theme;
    button.setAttribute('aria-pressed', String(on));
    if (remember) save(on ? 'xmas' : '');
    watch();
    sync();
    document.dispatchEvent(new CustomEvent('themechange', { detail: { on } }));
  };

  /* a shared link wins on load, and is then remembered like any other choice */
  const asked = new URLSearchParams(location.search).get('theme');
  const on = asked ? asked === 'xmas' : read() === 'xmas';
  apply(on, false);
  if (asked) save(on ? 'xmas' : '');

  button.addEventListener('click', () => apply(!root.dataset.theme, true));
  document.body.append(button);

  addEventListener('resize', sync);

  addEventListener('keydown', (event) => {
    if (event.key !== 't' && event.key !== 'T') return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target;
    if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
    event.preventDefault();
    apply(!root.dataset.theme, true);
  });
})();
