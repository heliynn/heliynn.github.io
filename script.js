/* Renders content.js into index.html. You shouldn't need to edit this file. */
(() => {
  const S = window.SITE || {};
  const q = (sel) => document.querySelector(sel);

  const setText = (sel, value) => {
    const node = q(sel);
    if (node && value) node.textContent = value;
  };

  const isExternal = (href) => /^https?:/i.test(href || '');

  const init = () => {
    /* ---------- text ---------- */
    setText('[data-wordmark]', S.display);
    setText('[data-statement]', S.statement);

    document.title = S.display || document.title;
    if (S.statement) {
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', S.statement);
    }

    /* ---------- detail rows ---------- */
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

    /* ---------- CTA + server modal ---------- */
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

    /* ---------- side art ---------- */
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

    /* Draw two different pictures from the pool, one per edge. */
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

    /* ---------- draggable mascot ---------- */
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

      /* Preloaded so the first tap is not late. */
      const meow = new Audio('assets/meow.mp3');
      meow.preload = 'auto';
      meow.volume = .22;
      let spot = null; /* where it sits, in pixels from the top left */

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

      /* Remembered in pixels and clamped on the way back in, so a reload puts
         it exactly where you dropped it and a smaller window keeps it on screen. */
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

      /* width is only known once the picture has loaded */
      if (img.complete) restore();
      else img.addEventListener('load', restore, { once: true });

      /* A tap (not a drag) gets a soft meow. It follows the pill's mute button,
         and the volume is deliberately low so it never startles anyone. */
      const playMeow = () => {
        try {
          if (localStorage.getItem('pill-muted') === '1') return;
        } catch (error) { /* storage blocked: treat as unmuted */ }
        try {
          meow.currentTime = 0;
          const played = meow.play();
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
    };

    mountMascot();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
/* ---------------- bottom pill player ---------------- */

(() => {
  const audio = document.getElementById('pillAudio');
  const button = document.getElementById('pillPlay');
  const muteButton = document.getElementById('pillMute');
  const viz = document.querySelector('.pill__viz');
  if (!audio || !button || !viz) return;

  let dragging = false;

  const VOLUME = .3;
  const MUTE_KEY = 'pill-muted';

  const storedMute = () => {
    try {
      return localStorage.getItem(MUTE_KEY) === '1';
    } catch (error) {
      return false;
    }
  };

  audio.volume = VOLUME;
  audio.muted = storedMute();

  if (muteButton) {
    const syncMute = () => {
      muteButton.setAttribute('aria-pressed', String(audio.muted));
      muteButton.setAttribute('aria-label', audio.muted ? 'Unmute' : 'Mute');
    };
    syncMute();
    muteButton.addEventListener('click', () => {
      audio.muted = !audio.muted;
      try {
        localStorage.setItem(MUTE_KEY, audio.muted ? '1' : '0');
      } catch (error) { /* storage may be blocked */ }
      syncMute();
    });
  }

  const bars = Array.from(viz.querySelectorAll('span'));
  const titleEl = document.getElementById('pillTitle');
  const subEl = document.getElementById('pillSub');

  let ctx = null;
  let analyser = null;
  let data = null;
  let raf = 0;

  const fmt = (seconds) => {
    if (!Number.isFinite(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ':' + String(s).padStart(2, '0');
  };

  const setTime = () => {
    if (!subEl) return;
    const total = audio.duration;
    subEl.textContent = Number.isFinite(total)
      ? fmt(audio.currentTime) + ' / ' + fmt(total)
      : 'background music';
  };

  const paint = () => {
    const progress = audio.duration ? audio.currentTime / audio.duration : 0;
    const played = Math.round(progress * bars.length);
    bars.forEach((bar, i) => bar.classList.toggle('is-played', i < played));

    if (Number.isFinite(audio.duration)) {
      viz.setAttribute('aria-valuemax', String(Math.round(audio.duration)));
      viz.setAttribute('aria-valuenow', String(Math.round(audio.currentTime)));
    }

    if (analyser && data && !audio.paused) {
      analyser.getByteFrequencyData(data);
      bars.forEach((bar, i) => {
        const band = data[Math.floor(Math.pow(i / bars.length, 1.4) * data.length)] / 255;
        bar.style.height = (4 + Math.pow(band, .72) * 30).toFixed(1) + 'px';
      });
    }
  };

  const loop = () => {
    paint();
    raf = requestAnimationFrame(loop);
  };

  const start = () => {
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
    if (dragging) seek(event.clientX);
  });

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

  const ensureGraph = () => {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      ctx = new AC();
      const source = ctx.createMediaElementSource(audio);
      analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = .82;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      data = new Uint8Array(analyser.frequencyBinCount);
    } catch (error) {
      ctx = null;
      analyser = null;
    }
  };

  const fail = () => {
    button.disabled = true;
    button.textContent = '▶';
    button.setAttribute('aria-label', 'No track loaded');
    if (titleEl) titleEl.textContent = 'no track loaded';
    if (subEl) subEl.textContent = 'drop a song at assets/music.mp3';
  };

  audio.addEventListener('loadedmetadata', () => {
    button.disabled = false;
    if (titleEl) {
      titleEl.textContent = audio.dataset.title
        || decodeURIComponent((audio.currentSrc || '').split('/').pop() || '').replace(/\.[^.]+$/, '')
        || 'untitled';
    }
    setTime();
  });

  audio.addEventListener('error', fail);
  audio.addEventListener('timeupdate', () => {
    setTime();
    paint();
  });
  audio.addEventListener('ended', setTime);

  button.addEventListener('click', async () => {
    ensureGraph();
    if (ctx && ctx.state === 'suspended') await ctx.resume();

    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        fail();
        return;
      }
      button.textContent = '❚❚';
      button.setAttribute('aria-label', 'Pause');
      button.setAttribute('aria-pressed', 'true');
      start();
    } else {
      audio.pause();
      button.textContent = '▶';
      button.setAttribute('aria-label', 'Play');
      button.setAttribute('aria-pressed', 'false');
    }
  });

  audio.addEventListener('play', start);
  audio.addEventListener('pause', paint);
})();
