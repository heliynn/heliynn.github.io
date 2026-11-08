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
  setText('[data-eyebrow]', S.eyebrow);
  setText('[data-statement]', S.statement);
  setText('[data-footer-left]', S.footer);

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

    if (item.dot) {
      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.setAttribute('aria-hidden', 'true');
      value.append(dot);
    }

    const text = document.createElement('span');
    text.className = 'panel__text';
    text.textContent = item.value || '';
    value.append(text);

    node.append(label, value);

    if (copies) {
      node.addEventListener('click', async () => {
        const ok = await copyText(item.copy);
        if (!ok) return;
        const original = item.value || item.copy;
        text.textContent = 'copied';
        node.classList.add('is-copied');
        clearTimeout(node.copyTimer);
        node.copyTimer = setTimeout(() => {
          text.textContent = original;
          node.classList.remove('is-copied');
        }, 1400);
      });
    }

    return node;
  };

  const notes = q('[data-notes]');
  if (notes) (S.notes || []).forEach((item) => notes.append(noteRow(item)));

  /* ---------- footer links ---------- */
  const links = q('[data-footer-links]');
  if (links) {
    (S.footerLinks || []).forEach((item) => {
      const a = document.createElement('a');
      a.href = item.href || '#';
      a.textContent = item.label || '';
      if (isExternal(item.href)) {
        a.target = '_blank';
        a.rel = 'noreferrer';
      }
      links.append(a);
    });
  }

  /* ---------- side art (only if the files exist) ---------- */
  const mountArt = (side) => {
    const src = S.art && S.art[side];
    if (!src) return;

    const img = document.createElement('img');
    img.className = `art art--${side}`;
    img.src = src;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.decoding = 'async';
    img.addEventListener('error', () => img.remove());
    document.body.append(img);
  };

  mountArt('left');
  mountArt('right');
})();
