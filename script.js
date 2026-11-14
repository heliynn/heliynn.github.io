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

  /* .15 is the level that actually lets you read the page while it plays */
  const VOLUME = .15;
  const MUTE_KEY = 'pill-muted';
  const VOLUME_KEY = 'pill-volume';

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
    const value = Math.round(audio.volume * 100);
    volume.value = String(value);
    volume.style.setProperty('--vol', value + '%');
  };

  if (volume) {
    paintVolume();
    volume.addEventListener('input', () => {
      audio.volume = Number(volume.value) / 100;
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

  const bars = Array.from(viz.querySelectorAll('span'));
  const levels = bars.map(() => 0);
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
        /* quiet bands stay quiet and loud ones are capped: before this, every
           kick knocked the whole row to full height for a frame */
        const target = Math.pow(band, 1.35) * .8;
        const level = levels[i];
        levels[i] = target > level ? level + (target - level) * .22 : level * .9;
        bar.style.height = (3 + levels[i] * 26).toFixed(1) + 'px';
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
      analyser.smoothingTimeConstant = .86;
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

  const togglePlay = async () => {
    if (button.disabled) return;
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

  audio.addEventListener('play', start);
  audio.addEventListener('pause', paint);
})();
