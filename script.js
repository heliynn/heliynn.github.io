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
  if (notes) (S.notes || []).forEach((item) => notes.append(noteRow(item)));

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
