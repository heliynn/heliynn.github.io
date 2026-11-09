/* Renders content.js into index.html. You shouldn't need to edit this file. */
(() => {
  const S = window.SITE || {};
  const q = (sel) => document.querySelector(sel);

  const setText = (sel, value) => {
    const node = q(sel);
    if (node && value) node.textContent = value;
  };

  const isExternal = (href) => /^https?:/i.test(href || '');

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
      const check = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      check.setAttribute('class', 'panel__check');
      check.setAttribute('viewBox', '0 0 16 16');
      check.setAttribute('aria-hidden', 'true');
      check.innerHTML = '<path d="M3.2 8.4 6.6 11.8 12.8 4.6" />';
      value.append(check);

      node.addEventListener('click', async () => {
        const ok = await copyText(item.copy);
        if (!ok) return;
        node.classList.add('is-copied');
        copyStatus.textContent = `Copied ${item.copy}`;
        clearTimeout(node.copyTimer);
        node.copyTimer = setTimeout(() => {
          node.classList.remove('is-copied');
          copyStatus.textContent = '';
        }, 1500);
      });
    }

    return node;
  };

  const notes = q('[data-notes]');
  if (notes) {
    (S.notes || []).forEach((item) => notes.append(noteRow(item)));

    // CTA button that opens the server modal
    if (S.server && S.server.label) {
      const ctaBtn = document.createElement('button');
      ctaBtn.type = 'button';
      ctaBtn.className = 'panel__cta';
      ctaBtn.setAttribute('aria-label', S.server.label);
      ctaBtn.setAttribute('data-modal', 'server');

      const ctaLabel = document.createElement('span');
      ctaLabel.textContent = S.server.label || 'join the sources server';

      const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      icon.setAttribute('class', 'panel__cta-icon');
      icon.setAttribute('viewBox', '0 0 16 16');
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = '<path d="M5.3 10.7 10.7 5.3M6.4 5.3h4.3v4.3" />';

      ctaBtn.append(ctaLabel, icon);
      notes.after(ctaBtn);
    }

    // Render the server modal with multiple server invites
    if (S.servers && S.servers.length) {
      const modal = document.getElementById('serverModal');
      const overlay = document.getElementById('modalOverlay');
      const modalContent = document.getElementById('modalContent');
      const modalServers = document.getElementById('modalServers');
      const modalClose = document.getElementById('modalClose');

      // Open modal
      const openModal = () => {
        modal.setAttribute('aria-hidden', 'false');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
      };

      // Close modal
      const closeModal = () => {
        modal.setAttribute('aria-hidden', 'true');
        overlay.style.display = 'none';
        document.body.style.overflow = '';
      };

      // Open on CTA button click
      const ctaBtn = document.querySelector('[data-modal="server"]');
      if (ctaBtn) {
        ctaBtn.addEventListener('click', openModal);
      }

      // Close on overlay click, esc, or close button
      overlay.addEventListener('click', closeModal);
      modalClose.addEventListener('click', closeModal);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
      });

      // Render server cards
      const renderServers = () => {
        modalServers.innerHTML = '';
        (S.servers || []).forEach((s) => {
          const card = document.createElement('div');
          card.className = 'modal__server';
          card.innerHTML = `
            <img class="modal__server-image" src="${s.image || 'https://i.imgur.com/placeholder.png'}" alt="${s.name}">
            <div class="modal__server-info">
              <div class="modal__server-name">${s.name}</div>
              <div class="modal__server-role">Role: ${s.role}</div>
            </div>
            <a class="modal__server-invite" href="https://discord.gg/${s.invite}" target="_blank" rel="noreferrer">Join ${s.invite}</a>
          `;
          modalServers.append(card);
        });
      };

      renderServers();
    }
  }

  /* ---------- side art (only if the files exist) ---------- */
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
})();
