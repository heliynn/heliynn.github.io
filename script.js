/* Renders content.js into index.html. */
(() => {
  const S = window.SITE || {};
  const q = (sel) => document.querySelector(sel);

  const setText = (sel, value) => {
    const node = q(sel);
    if (node && value) node.textContent = value;
  };

  const isExternal = (href) => /^https?:/i.test(href || '');

  const init = () => {
    setText('[data-wordmark]', S.display);
    setText('[data-statement]', S.statement);

    document.title = S.display || document.title;
    if (S.statement) {
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', S.statement);
    }

    const copyText = async (value) => {
      try {
        await navigator.clipboard.writeText(value);
        return true;
      } catch {
        const field = document.createElement('textarea');
        field.value = value;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.append(field);
        field.select();
        let ok = false;
        try { ok = document.execCommand('copy'); } catch { ok = false; }
        field.remove();
        return ok;
      }
    };

    const copyStatus = document.createElement('span');
    copyStatus.className = 'sr-only';
    copyStatus.setAttribute('role', 'status');
    copyStatus.setAttribute('aria-live', 'polite');
    document.body.append(copyStatus);

    const noteRow = (item) => {
      const copies = Boolean(item.copy);
      const node = document.createElement(copies ? 'button' : item.href ? 'a' : 'div');
      node.className = 'panel__row';

      if (copies) {
        node.type = 'button';
        node.setAttribute('aria-label', `Copy ${item.label || 'handle'} ${item.copy}`.replace(/\s+/g, ' ').trim());
      } else if (item.href) {
        node.href = item.href;
        if (isExternal(item.href)) {
          node.target = '_blank';
          node.rel = 'noreferrer';
        }
      } else {
        node.type = 'button';
        node.setAttribute('aria-label', `Copy ${item.label || 'handle'}`.replace(/\s+/g, ' ').trim());
      }

      const label = document.createElement('span');
      label.className = 'panel__label';
      label.textContent = item.label || '';

      const value = document.createElement('span');
      value.className = 'panel__value';

      const text = document.createElement('span');
      text.className = 'panel__text';
      text.textContent = item.value || '';
      value.append(text);

      node.append(label, value);

      if (copies) {
        const copyIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        copyIcon.setAttribute('class', 'panel__copy');
        copyIcon.setAttribute('viewBox', '0 0 16 16');
        copyIcon.setAttribute('aria-hidden', 'true');
        copyIcon.innerHTML = '<rect x="5.5" y="5.5" width="7" height="7" rx="1.5" /><path d="M10.5 5.5v-1a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1" />';
        value.append(copyIcon);

        const check = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        check.setAttribute('class', 'panel__check');
        check.setAttribute('viewBox', '0 0 16 16');
        check.setAttribute('aria-hidden', 'true');
        check.innerHTML = '<path d="M3.2 8.4 6.6 11.8 12.8 4.6" />';
        value.append(check);

        const valueText = item.value || '';

        node.addEventListener('click', async () => {
          const ok = await copyText(item.copy);
          if (!ok) return;
          clearTimeout(node.copyTimer);
          node.classList.add('is-copied');
          text.textContent = 'Copied';
          copyStatus.textContent = `Copied ${item.copy}`;
          node.copyTimer = setTimeout(() => {
            node.classList.remove('is-copied');
            text.textContent = valueText;
            copyStatus.textContent = '';
          }, 1500);
        });
      }

      return node;
    };

    const notes = q('[data-notes]');
    if (!notes) return;

    (S.notes || []).forEach((item) => notes.append(noteRow(item)));

    if (S.server && S.server.label) {
      const cta = document.createElement('a');
      cta.type = 'button';
      cta.className = 'panel__cta';
      cta.setAttribute('aria-haspopup', 'dialog');
      cta.setAttribute('aria-controls', 'serverModal');
      cta.setAttribute('aria-expanded', 'false');
      cta.href = S.server.href || 'https://discord.com/users/744890716878012508';
      cta.textContent = S.server.label;

      notes.after(cta);

      const modal = document.getElementById('serverModal');
      const overlay = document.getElementById('modalOverlay');
      const modalServers = document.getElementById('modalServers');
      const modalClose = document.getElementById('modalClose');

      if (modal && overlay && modalServers && modalClose) {
        const openModal = () => {
          modal.setAttribute('aria-hidden', 'false');
          cta.setAttribute('aria-expanded', 'true');
          document.body.style.overflow = 'hidden';
          modalClose.focus({ preventScroll: true });
        };

        const closeModal = () => {
          modal.setAttribute('aria-hidden', 'true');
          cta.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
          cta.focus({ preventScroll: true });
        };

        const renderServers = () => {
          modalServers.replaceChildren();

          (S.servers || []).forEach((server) => {
            const card = document.createElement('a');
            card.className = 'modal__server';
            card.href = `https://discord.gg/${server.invite}`;
            card.target = '_blank';
            card.rel = 'noreferrer';
            card.setAttribute('aria-label', `Join ${server.name} on Discord`);

            const image = document.createElement('img');
            image.className = 'modal__server-image';
            image.src = server.image || '';
            image.alt = '';
            image.width = 48;
            image.height = 48;
            image.loading = 'lazy';
            image.addEventListener('error', () => { image.style.visibility = 'hidden'; });

            const info = document.createElement('div');
            info.className = 'modal__server-info';

            const name = document.createElement('div');
            name.className = 'modal__server-name';
            name.textContent = server.name || 'Discord server';

            const role = document.createElement('div');
            role.className = 'modal__server-role';
            role.textContent = server.role ? `role: ${server.role}` : '';

            info.append(name, role);

            const arrow = document.createElement('span');
            arrow.className = 'modal__server-arrow';
            arrow.setAttribute('aria-hidden', 'true');
            arrow.textContent = '→';

            card.append(image, info, arrow);
            modalServers.append(card);
          });
        };

        renderServers();

        cta.addEventListener('click', (event) => {
        event.preventDefault();
        openModal();
      });
        overlay.addEventListener('click', closeModal);
        modalClose.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
          }
        });
      }
    }

    const mountArt = (side, art) => {
      if (!art) return;

      const src = typeof art === 'string' ? art : art.src;
      if (!src) return;

      const img = document.createElement('img');
      img.className = `art art--${side}`;
      img.src = src;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.decoding = 'async';
      if (typeof art === 'object' && art.width && art.height) {
        img.width = art.width;
        img.height = art.height;
      }
      img.addEventListener('error', () => img.remove());
      document.body.append(img);
    };

    const pickArt = () => {
      const config = S.art || {};
      const pool = Array.isArray(config.pool) ? config.pool.filter(Boolean) : [];
      if (!pool.length) return { left: config.left, right: config.right };

      const bag = pool.slice();
      for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
      }
      return { left: bag[0], right: bag[1] };
    };

    const choice = pickArt();
    mountArt('left', choice.left);
    mountArt('right', choice.right);

    const MASCOT_KEY = 'mascot-position';

    const mountMascot = () => {
      const config = S.mascot || {};
      const pool = Array.isArray(config.pool) ? config.pool.filter(Boolean) : [];
      if (!pool.length) return;

      const img = document.createElement('img');
      img.className = 'mascot';
      img.src = pool[Math.floor(Math.random() * pool.length)];
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.draggable = false;
      img.decoding = 'async';
      img.addEventListener('error', () => img.remove());
      document.body.append(img);

      let grabX = 0;
      let grabY = 0;
      let dragging = false;
      let moved = false;
      let downX = 0;
      let downY = 0;

      /* preloaded so the first tap is not late */
      const MEOWS = ['assets/meow-1.mp3', 'assets/meow-2.mp3', 'assets/meow-3.mp3'];
      const meows = MEOWS.map((src) => {
        const clip = new Audio(src);
        clip.preload = 'auto';
        clip.volume = .16;
        return clip;
      });
      let lastMeow = -1;
      let spot = null;

      const place = (x, y) => {
        img.style.right = 'auto';
        const maxX = Math.max(0, innerWidth - img.offsetWidth);
        const maxY = Math.max(0, innerHeight - img.offsetHeight);
        const left = Math.min(Math.max(0, x), maxX);
        const top = Math.min(Math.max(0, y), maxY);
        img.style.left = left + 'px';
        img.style.top = top + 'px';
        spot = { x: Math.round(left), y: Math.round(top) };
      };

      /* pixels, clamped on restore so a small window keeps it on screen */
      const remember = () => {
        if (!spot) return;
        try {
          localStorage.setItem(MASCOT_KEY, JSON.stringify(spot));
        } catch (error) { /* private mode or storage disabled: just forget it */ }
      };

      const restore = () => {
        let saved = null;
        try {
          saved = JSON.parse(localStorage.getItem(MASCOT_KEY) || 'null');
        } catch (error) { saved = null; }
        if (!saved || !Number.isFinite(saved.x) || !Number.isFinite(saved.y)) return;
        place(saved.x, saved.y);
      };

      /* width is unknown until the image loads */
      if (img.complete) restore();
      else img.addEventListener('load', restore, { once: true });

      /* tap, not drag; quiet, and silent while the pill is muted */
      const playMeow = () => {
        try {
          if (localStorage.getItem('pill-muted') === '1') return;
        } catch (error) { /* storage blocked: treat as unmuted */ }
        let index = Math.floor(Math.random() * meows.length);
        if (meows.length > 1 && index === lastMeow) index = (index + 1) % meows.length;
        lastMeow = index;

        const clip = meows[index];
        try {
          clip.currentTime = 0;
          const played = clip.play();
          if (played && played.catch) played.catch(() => { /* browser said no */ });
        } catch (error) { /* no audio support: stay quiet */ }
      };

      img.addEventListener('pointerdown', (event) => {
        if (event.button !== undefined && event.button !== 0) return;
        const rect = img.getBoundingClientRect();
        grabX = event.clientX - rect.left;
        grabY = event.clientY - rect.top;
        dragging = true;
        moved = false;
        downX = event.clientX;
        downY = event.clientY;
        img.classList.add('is-dragging');
        img.style.transform = '';
        leanX = 0;
        leanY = 0;
        place(rect.left, rect.top);
        try {
          img.setPointerCapture(event.pointerId);
        } catch (error) { /* capture is a nicety, dragging works without it */ }
        event.preventDefault();
      });

      img.addEventListener('pointermove', (event) => {
        if (!dragging) return;
        if (Math.abs(event.clientX - downX) > 5 || Math.abs(event.clientY - downY) > 5) moved = true;
        place(event.clientX - grabX, event.clientY - grabY);
      });

      const drop = (event) => {
        if (!dragging) return;
        dragging = false;
        img.classList.remove('is-dragging');
        remember();
        if (!moved) playMeow();
        try {
          if (img.hasPointerCapture(event.pointerId)) img.releasePointerCapture(event.pointerId);
        } catch (error) { /* already released */ }
      };

      img.addEventListener('pointerup', drop);
      img.addEventListener('pointercancel', drop);

      /* keep it on screen when the window shrinks */
      addEventListener('resize', () => {
        if (!img.style.left) return;
        place(parseFloat(img.style.left), parseFloat(img.style.top));
      });

      /* the mascot leans toward the pointer: a short translate plus a slight
         tilt, so the corner reacts to you without becoming a cursor follower.
         Skipped on touch. Runs under reduced motion too, like the backdrop. */
      const LEAN_X = 16;
      const LEAN_Y = 10;
      const LEAN_TILT = 2.4;
      const LEAN_REACH = 360;
      let leanX = 0;
      let leanY = 0;

      const lean = (event) => {
        if (event.pointerType === 'touch' || dragging) return;
        const rect = img.getBoundingClientRect();
        if (!rect.width) return;
        const clamp = (value) => Math.max(-1, Math.min(1, value));
        /* subtract the lean already applied so the target does not chase itself */
        const cx = rect.left + rect.width / 2 - leanX;
        const cy = rect.top + rect.height / 2 - leanY;
        const dx = clamp((event.clientX - cx) / LEAN_REACH);
        const dy = clamp((event.clientY - cy) / LEAN_REACH);
        leanX = dx * LEAN_X;
        leanY = dy * LEAN_Y;
        img.style.transform = 'translate(' + leanX.toFixed(1) + 'px, ' + leanY.toFixed(1) + 'px)'
          + ' rotate(' + (dx * LEAN_TILT).toFixed(2) + 'deg)';
      };

      addEventListener('pointermove', lean, { passive: true });
    };

    mountMascot();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
(() => {
  const audio = document.getElementById('pillAudio');
  const button = document.getElementById('pillPlay');
  const muteButton = document.getElementById('pillMute');
  const viz = document.querySelector('.pill__viz');
  if (!audio || !button || !viz) return;

  let dragging = false;

  /* the level the site has always used, and half the slider sits on it: the
     curve is derived from that one fact so the two cannot drift apart */
  const VOLUME = .15;
  const CURVE = Math.log(VOLUME) / Math.log(.5);
  const levelFor = (value) => Math.pow(Number(value) / 100, CURVE);
  const sliderFor = (level) => Math.round(Math.pow(Math.max(0, level), 1 / CURVE) * 100);
  const MUTE_KEY = 'pill-muted';
  /* a new key, because the old saved level was chosen against a louder
     default and a linear slider, and everyone deserves one fresh start
     at background level */
  const VOLUME_KEY = 'pill-volume-3';

  const storedMute = () => {
    try {
      return localStorage.getItem(MUTE_KEY) === '1';
    } catch (error) {
      return false;
    }
  };

  const storedVolume = () => {
    try {
      const saved = localStorage.getItem(VOLUME_KEY);
      /* no saved value is not the same as saved silence */
      if (saved === null) return VOLUME;
      const level = Number(saved);
      return Number.isFinite(level) && level >= 0 && level <= 1 ? level : VOLUME;
    } catch (error) {
      return VOLUME;
    }
  };

  audio.volume = storedVolume();
  audio.muted = storedMute();

  const syncMute = () => {
    if (!muteButton) return;
    muteButton.setAttribute('aria-pressed', String(audio.muted));
    muteButton.setAttribute('aria-label', audio.muted ? 'Unmute' : 'Mute');
  };

  syncMute();

  if (muteButton) {
    muteButton.addEventListener('click', () => {
      audio.muted = !audio.muted;
      try {
        localStorage.setItem(MUTE_KEY, audio.muted ? '1' : '0');
      } catch (error) { /* storage may be blocked */ }
      syncMute();
    });
  }

  const volume = document.getElementById('pillVol');

  const paintVolume = () => {
    if (!volume) return;
    const value = sliderFor(audio.volume);
    volume.value = String(value);
    volume.style.setProperty('--vol', value + '%');
  };

  if (volume) {
    paintVolume();
    volume.addEventListener('input', () => {
      audio.volume = levelFor(volume.value);
      /* reaching for the slider means you want to hear it */
      if (audio.volume > 0 && audio.muted) {
        audio.muted = false;
        try {
          localStorage.setItem(MUTE_KEY, '0');
        } catch (error) { /* storage may be blocked */ }
        syncMute();
      }
      try {
        localStorage.setItem(VOLUME_KEY, String(audio.volume));
      } catch (error) { /* storage may be blocked */ }
      paintVolume();
    });
  }

  /* the bars are the track's own spectrum, measured once from the file and
     played back against the clock. Reading it live means routing the element
     through WebAudio, and when that route fails the sound goes with it, which
     is not a trade a background player should make */
  let song = null;

  fetch('assets/music-spectrum.json')
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      if (!data || !data.data) return;
      const raw = atob(data.data);
      const bytes = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i += 1) bytes[i] = raw.charCodeAt(i);
      song = { fps: data.fps || 10, bands: data.bands || 24, data: bytes };
    })
    .catch(() => { /* no data: the clock still gives the bars a shape */ });

  /* the frame of the song at this second, spread across however many bars
     are on screen */
  const spectrumAt = (time) => {
    const frames = Math.floor(song.data.length / song.bands);
    const at = Math.min(frames - 1, Math.max(0, Math.floor(time * song.fps)));
    const base = at * song.bands;
    return bars.map((bar, index) => {
      const pos = bars.length > 1 ? index / (bars.length - 1) * (song.bands - 1) : 0;
      const lower = Math.floor(pos);
      const upper = Math.min(song.bands - 1, lower + 1);
      const value = song.data[base + lower];
      return (value + (song.data[base + upper] - value) * (pos - lower)) / 255;
    });
  };
  const bars = Array.from(viz.querySelectorAll('span'));
  const levels = bars.map(() => 0);

  /* the last few seconds behind the bars: bass at the bottom, treble at the
     top, a scrolling field of faint dots small enough to read as texture
     rather than as a second equalizer */
  const falls = document.getElementById('pillFalls');
  const fallsCtx = falls && falls.getContext ? falls.getContext('2d') : null;
  const FALLS_SECONDS = 6;
  const FALLS_ROWS = 5;

  const drawFalls = () => {
    if (!fallsCtx) return;
    const box = falls.getBoundingClientRect();
    if (!box.width) return;

    const dpr = window.devicePixelRatio || 1;
    const width = Math.round(box.width * dpr);
    const height = Math.round(box.height * dpr);
    if (falls.width !== width || falls.height !== height) {
      falls.width = width;
      falls.height = height;
    }
    fallsCtx.clearRect(0, 0, width, height);
    if (!song) return;

    const frames = Math.floor(song.data.length / song.bands);
    const here = audio.currentTime * song.fps;

    /* one band group's average level, 0 to 1, out of the measured data */
    const read = (index, low, high) => {
      if (index < 0 || index >= frames) return 0;
      const base = index * song.bands;
      let sum = 0;
      for (let band = low; band < high; band += 1) sum += song.data[base + band];
      return sum / (high - low);
    };

    const step = Math.max(2, Math.round(3 * dpr));
    const columns = Math.ceil(width / step);
    const perColumn = FALLS_SECONDS / columns;
    const size = Math.max(1, Math.round(dpr));

    fallsCtx.fillStyle = '#e2e2e8';

    for (let column = 0; column < columns; column += 1) {
      const at = here - (column + .5) * perColumn * song.fps;
      if (at < 0) continue;
      const index = Math.floor(at);
      if (index >= frames) continue;
      /* blending two frames keeps the drift smooth between 0.1 s steps */
      const blend = at - index;
      const next = Math.min(frames - 1, index + 1);
      const x = width - (column + .5) * step;

      for (let row = 0; row < FALLS_ROWS; row += 1) {
        const low = Math.floor(row * song.bands / FALLS_ROWS);
        const high = Math.max(low + 1, Math.floor((row + 1) * song.bands / FALLS_ROWS));
        const level = (read(index, low, high) * (1 - blend) + read(next, low, high) * blend) / 255;
        const alpha = Math.pow(level, 2.2) * .5;
        if (alpha < .03) continue;
        const y = height - (row + .5) * (height / FALLS_ROWS);
        fallsCtx.globalAlpha = alpha;
        fallsCtx.fillRect(Math.round(x - size / 2), Math.round(y - size / 2), size, size);
      }
    }
    fallsCtx.globalAlpha = 1;
  };
  const titleEl = document.getElementById('pillTitle');
  const subEl = document.getElementById('pillSub');

  let raf = 0;

  const fmt = (seconds) => {
    if (!Number.isFinite(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ':' + String(s).padStart(2, '0');
  };

  /* the clock follows currentTime, not the event that happens to wake it:
     whatever pauses or resumes the element, the time shown is the real one */
  const setTime = (stalled) => {
    /* the pause that ends a failed play fires this too, and the clock
       would wipe the message saying why it failed */
    if (!subEl || gaveUp) return;
    const total = audio.duration;
    const text = stalled
      ? 'buffering…'
      : Number.isFinite(total)
        ? fmt(audio.currentTime) + ' / ' + fmt(total)
        : 'Longview';
    if (subEl.textContent !== text) subEl.textContent = text;
  };

  /* what the element is really doing: a paused track shows its position, a
     playing one ticks, and a clock standing still under a pause glyph is
     stuck, which is worth saying and worth one attempt at fixing */
  let lastTime = -1;
  let lastMove = 0;
  let fixTries = 0;
  /* once the pill has given up it must stop repainting over its own message */
  let gaveUp = false;

  /* data is in hand but the clock will not move: the decoder or the audio
     device is wedged, not the network, so more waiting will not help */
  const wedged = () => audio.readyState >= 3;

  const nudge = () => {
    try {
      audio.currentTime = audio.currentTime + .05;
      return true;
    } catch (error) {
      return false;
    }
  };

  /* and if a nudge does not free it, reload the file and put it back where
     it was: a wedged element rarely survives a fresh load */
  const revive = () => {
    const was = audio.currentTime;
    try {
      audio.load();
      const once = () => {
        audio.removeEventListener('loadedmetadata', once);
        try {
          audio.currentTime = was;
        } catch (error) { /* start from the top instead */ }
        const playing = audio.play();
        if (playing && playing.catch) playing.catch(() => {});
      };
      audio.addEventListener('loadedmetadata', once);
    } catch (error) { /* nothing left to try */ }
  };

  /* what the element believes about itself, for when it will not play */
  const diagnose = () => {
    const bits = [audio.muted ? 'muted' : 'vol ' + Math.round(audio.volume * 100) + '%'];
    bits.push('ready ' + audio.readyState + ', net ' + audio.networkState);
    if (audio.error) bits.push('error ' + audio.error.code);
    const span = audio.buffered;
    bits.push(span.length ? 'held ' + fmt(span.end(span.length - 1) - span.start(0)) : 'nothing buffered');
    return bits.join(' · ');
  };

  const state = () => {
    if (audio.paused) {
      lastTime = -1;
      return 'paused';
    }
    const now = performance.now();
    if (audio.currentTime !== lastTime) {
      lastTime = audio.currentTime;
      lastMove = now;
      fixTries = 0;
      return 'playing';
    }
    /* a second and a half of standing still, timed rather than counted: a
       throttled tab fires far fewer frames than the second and a half needs */
    return now - lastMove > 1500 ? 'stuck' : 'playing';
  };

  let painting = false;

  const paint = () => {
    /* timeupdate and the loop both call this, and seeking from inside it
       fires another timeupdate */
    if (painting || gaveUp) return;
    painting = true;
    try {
      const progress = audio.duration ? audio.currentTime / audio.duration : 0;
      const played = Math.round(progress * bars.length);
      bars.forEach((bar, i) => bar.classList.toggle('is-played', i < played));

      if (Number.isFinite(audio.duration)) {
        viz.setAttribute('aria-valuemax', String(Math.round(audio.duration)));
        viz.setAttribute('aria-valuenow', String(Math.round(audio.currentTime)));
      }

      drawFalls();

      const now = state();

      /* stuck with the data already loaded is a wedged element, and it gets
         two tries before the pill stops pretending it is playing */
      if (now === 'stuck' && wedged()) {
        if (fixTries === 0) {
          fixTries = 1;
          nudge();
        } else if (fixTries === 1) {
          fixTries = 2;
          revive();
        } else {
          gaveUp = true;
          audio.pause();
          syncPlay();
          if (subEl) subEl.textContent = 'sound stalled · ' + diagnose();
          try { console.warn('[pill] stalled', diagnose(), audio); } catch (error) { /* no console */ }
          return;
        }
        lastMove = performance.now();
      }

      setTime(now === 'stuck');

      if (now !== 'playing') return;

      const time = audio.currentTime;

      const spectrum = song ? spectrumAt(audio.currentTime) : null;
      bars.forEach((bar, i) => {
        if (spectrum) {
          /* the data is already absolute, so a quiet verse stays short instead
             of being stretched to full height like a relative meter would */
          const level = Math.pow(spectrum[i], 1.5);
          const target = Math.min(1, level * (.9 + (i / bars.length) * .45));
          levels[i] += (target - levels[i]) * .35;
          bar.style.height = (3 + levels[i] * 26).toFixed(1) + 'px';
          return;
        }
        /* no spectrum yet: the clock still gives a shape to ride */
        const sway = Math.sin(time * (1.9 + (i % 9) * .17) + i * .8)
          + Math.sin(time * .7 + i * 2.3) * .5;
        const shape = Math.max(0, 1 - Math.abs(i / bars.length - .3) * 1.1);
        const target = Math.max(0, Math.min(1, (.42 + sway * .26) * shape));
        levels[i] += (target - levels[i]) * .16;
        bar.style.height = (3 + levels[i] * 26).toFixed(1) + 'px';
      });
    } finally {
      painting = false;
    }
  };

  const loop = () => {
    paint();
    raf = requestAnimationFrame(loop);
  };

  let watch = 0;

  const start = () => {
    /* rAF stops in a tab you are not looking at, and a stalled track is
       exactly the thing that needs watching for, so a timer keeps the check
       alive even when no frame is drawn */
    if (!watch) watch = setInterval(paint, 1000);
    if (raf) return;
    raf = requestAnimationFrame(loop);
  };

  const seek = (clientX) => {
    if (!Number.isFinite(audio.duration) || !audio.duration) return;
    const rect = viz.getBoundingClientRect();
    if (!rect.width) return;
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
    paint();
  };

  viz.addEventListener('pointerdown', (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    dragging = true;
    seek(event.clientX);
    try {
      viz.setPointerCapture(event.pointerId);
    } catch (error) { /* capture is a nicety, dragging still works without it */ }
    event.preventDefault();
  });

  viz.addEventListener('pointermove', (event) => {
    /* no button held means the pointerup was missed, and a latched drag
       would seek on every move: the clock ticks, jumps back, and the track
       restarts forever without ever playing */
    if (event.buttons === 0) dragging = false;
    if (dragging) seek(event.clientX);
  });
  viz.addEventListener('lostpointercapture', () => { dragging = false; });

  const endDrag = (event) => {
    if (!dragging) return;
    dragging = false;
    try {
      if (viz.hasPointerCapture(event.pointerId)) viz.releasePointerCapture(event.pointerId);
    } catch (error) { /* already released */ }
  };

  viz.addEventListener('pointerup', endDrag);
  viz.addEventListener('pointercancel', endDrag);

  viz.addEventListener('keydown', (event) => {
    if (!Number.isFinite(audio.duration)) return;
    const step = event.key === 'ArrowRight' ? 5 : event.key === 'ArrowLeft' ? -5 : 0;
    if (event.key === 'Home') {
      audio.currentTime = 0;
    } else if (event.key === 'End') {
      audio.currentTime = Math.max(0, audio.duration - .25);
    } else if (step) {
      audio.currentTime = Math.min(audio.duration, Math.max(0, audio.currentTime + step));
    } else {
      return;
    }
    event.preventDefault();
    paint();
  });

  const fail = () => {
    button.disabled = true;
    button.textContent = '▶';
    button.setAttribute('aria-label', 'No track loaded');
    if (titleEl) titleEl.textContent = 'no track loaded';
    if (subEl) subEl.textContent = 'drop a song at assets/music.mp3';
  };

  const describeTrack = () => {
    button.disabled = false;
    if (titleEl) {
      titleEl.textContent = audio.dataset.title
        || decodeURIComponent((audio.currentSrc || '').split('/').pop() || '').replace(/\.[^.]+$/, '')
        || 'untitled';
    }
    setTime();
  };

  audio.addEventListener('loadedmetadata', describeTrack);
  /* a cached track can be ready before this script runs, in which case the
     event has already gone by and the pill would sit on its placeholder */
  if (audio.readyState >= 1) describeTrack();

  audio.addEventListener('error', fail);
  audio.addEventListener('timeupdate', () => {
    setTime();
    paint();
  });
  audio.addEventListener('ended', setTime);

  /* the button looks like whatever the element is actually doing: a browser
     can pause playback on its own, and a frozen pause glyph reads as a track
     that is playing but not moving */
  const syncPlay = () => {
    if (button.disabled) return;
    const playing = !audio.paused;
    button.textContent = playing ? '❚❚' : '▶';
    button.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    button.setAttribute('aria-pressed', String(playing));
  };

  const togglePlay = async () => {
    if (button.disabled) return;

    if (audio.paused) {
      /* the pill remembers a mute from last time, and a muted track looks
         broken: pressing play clears the mute. A volume you dragged down is
         left exactly where you put it, only a true zero is moved off silence */
      if (audio.muted || audio.volume === 0) {
        audio.muted = false;
        if (audio.volume === 0) audio.volume = VOLUME;
        try {
          localStorage.setItem(MUTE_KEY, '0');
        } catch (error) { /* storage may be blocked */ }
        syncMute();
        paintVolume();
      }
      try {
        await audio.play();
      } catch (error) {
        /* blocked by the browser, not a missing file: keep the button usable */
        if (subEl) subEl.textContent = 'press play again';
        return;
      }
      syncPlay();
      start();
    } else {
      audio.pause();
      syncPlay();
    }
  };

  button.addEventListener('click', togglePlay);

  /* space plays and m mutes, unless a control or a text field already owns the key */
  addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;

    const target = event.target;
    const tag = target && target.tagName ? target.tagName.toLowerCase() : '';
    const ownsKey = tag === 'input'
      || tag === 'textarea'
      || tag === 'select'
      || (target && target.isContentEditable)
      || (target && typeof target.closest === 'function'
        && target.closest('button, a, [role="button"], [role="slider"]'));
    if (ownsKey) return;

    if (event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      togglePlay();
    } else if (event.key === 'm' || event.key === 'M') {
      if (!muteButton) return;
      event.preventDefault();
      muteButton.click();
    }
  });

  /* A browser will not start audio without a gesture, so the first click on
     the page starts the track. Only the first: a click later must not undo a
     pause. A muted pill stays muted, and a click that lands on the pill
     belongs to the pill's own controls. */
  let firstClickUsed = false;

  addEventListener('click', (event) => {
    if (firstClickUsed) return;
    if (event.target && event.target.closest && event.target.closest('.pill')) {
      firstClickUsed = true;
      return;
    }
    if (audio.muted) {
      firstClickUsed = true;
      return;
    }
    /* the track has not loaded yet: try again on the next click */
    if (button.disabled || !audio.paused) return;
    firstClickUsed = true;
    togglePlay();
  });

  audio.addEventListener('play', () => {
    gaveUp = false;
    fixTries = 0;
    lastMove = performance.now();
    start();
    syncPlay();
  });
  audio.addEventListener('pause', () => {
    paint();
    syncPlay();
    setTime();
  });
  audio.addEventListener('ended', syncPlay);

})();
