/* Renders content.js into index.html. You shouldn't need to edit this file. */
(() => {
  const S = window.SITE || {};
  const q = (sel) => document.querySelector(sel);

  const setText = (sel, value) => {
    const node = q(sel);
    if (node && value) node.textContent = value;
  };

  const isExternal = (href) => /^https?:/i.test(href || '');

  /* ---------- icons ---------- */
  const PATHS = {
    mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="3"/><path d="m4 7.5 8 5.5 8-5.5"/>',
    github: '<path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z"/>',
    discord: '<path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.37-.44.86-.61 1.25a18.3 18.3 0 0 0-5.48 0c-.16-.39-.41-.88-.62-1.25a.08.08 0 0 0-.08-.04 19.7 19.7 0 0 0-4.88 1.52.07.07 0 0 0-.04.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.05 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .09-.02c.46-.63.87-1.3 1.22-1.99a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.89.08.08 0 0 1 0-.13c.13-.09.25-.19.37-.29a.07.07 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.06 0a.07.07 0 0 1 .08.01c.12.1.25.2.37.29a.08.08 0 0 1 0 .13 12.3 12.3 0 0 1-1.87.89.08.08 0 0 0-.04.11c.36.7.77 1.36 1.22 1.99a.08.08 0 0 0 .09.02 19.8 19.8 0 0 0 6-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.68-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42s.96-2.42 2.16-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.33-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.16-1.09-2.16-2.42s.96-2.42 2.16-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.33-.95 2.42-2.16 2.42Z"/>',
    link: '<path d="M10 13.5a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L11.5 6.3"/><path d="M14 10.5a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5"/>'
  };

  const icon = (name, size = 17) => {
    const d = PATHS[name] || PATHS.link;
    const paint = (name === 'github' || name === 'discord')
      ? 'fill="currentColor"'
      : 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" focusable="false" ${paint}>${d}</svg>`;
  };

  /* ---------- text ---------- */
  setText('[data-wordmark]', S.display);
  setText('[data-eyebrow]', S.eyebrow);
  setText('[data-contact-label]', S.contactHeading);
  setText('[data-contact-note]', S.contactNote);
  setText('[data-footer-left]', S.footer);

  document.title = S.display || document.title;
  if (S.eyebrow) {
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', `${S.display} — ${S.name}. Software developer.`);
  }

  /* ---------- terminal ---------- */
  const terminal = q('[data-terminal]');
  if (terminal) {
    const t = S.terminal || {};
    const prompt = `${t.user || 'serv'}@${t.host || 'web'} ~$`;

    const rows = [
      { cmd: 'whoami', out: t.whoami },
      { cmd: 'cat about.txt', out: t.about },
      { cmd: 'cat now.txt', out: t.now }
    ].filter((row) => row.out);

    rows.forEach((row) => {
      const line = document.createElement('div');
      line.className = 'term__line';

      const promptNode = document.createElement('span');
      promptNode.className = 'term__prompt';
      promptNode.textContent = prompt;

      const cmdNode = document.createElement('span');
      cmdNode.className = 'term__cmd';
      cmdNode.textContent = row.cmd;

      line.append(promptNode, cmdNode);

      const out = document.createElement('p');
      out.className = 'term__out';
      out.textContent = row.out;

      terminal.append(line, out);
    });

    const cursorLine = document.createElement('div');
    cursorLine.className = 'term__line term__line--cursor';

    const promptNode = document.createElement('span');
    promptNode.className = 'term__prompt';
    promptNode.textContent = prompt;

    const cursor = document.createElement('span');
    cursor.className = 'term__cursor';
    cursor.setAttribute('aria-hidden', 'true');

    cursorLine.append(promptNode, cursor);
    terminal.append(cursorLine);
  }

  /* ---------- contact tiles ---------- */
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

  const tile = (item) => {
    const copies = Boolean(item.copy);
    const node = document.createElement(copies ? 'button' : 'a');
    node.className = copies ? 'tile tile--copy' : 'tile';

    if (copies) {
      node.type = 'button';
      node.setAttribute('aria-label', `Copy ${item.label || 'handle'} ${item.copy}`.replace(/\s+/g, ' ').trim());
    } else {
      node.href = item.href || '#';
      if (isExternal(item.href)) {
        node.target = '_blank';
        node.rel = 'noreferrer';
      }
    }

    const box = document.createElement('span');
    box.className = 'tile__icon';
    box.innerHTML = icon(item.icon);

    const text = document.createElement('span');
    text.className = 'tile__text';

    const label = document.createElement('span');
    label.className = 'tile__label';
    label.textContent = item.label || '';

    const value = document.createElement('span');
    value.className = 'tile__value';
    value.textContent = item.value || '';

    text.append(label, value);
    node.append(box, text);

    if (copies) {
      node.addEventListener('click', async () => {
        const ok = await copyText(item.copy);
        if (!ok) return;
        const original = item.value || item.copy;
        value.textContent = 'copied';
        node.classList.add('is-copied');
        clearTimeout(node.copyTimer);
        node.copyTimer = setTimeout(() => {
          value.textContent = original;
          node.classList.remove('is-copied');
        }, 1500);
      });
    }

    return node;
  };

  const contacts = q('[data-contacts]');
  if (contacts) (S.contacts || []).forEach((item) => contacts.append(tile(item)));

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
