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
    const mountArt = (side) => {
      const art = S.art && S.art[side];
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

    mountArt('left');
    mountArt('right');
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
  const viz = document.querySelector('.pill__viz');
  if (!audio || !button || !viz) return;

  const bars = Array.from(viz.querySelectorAll('span'));
  const titleEl = document.getElementById('pillTitle');
  const subEl = document.getElementById('pillSub');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

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

    if (analyser && data && !audio.paused && !reduced.matches) {
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
