/* Renders content.js into index.html. */
(() => {
  const S = window.SITE || {};
  const q = (sel) => document.querySelector(sel);

  /* ---------- text ---------- */
  document.title = S.display || document.title;
  if (S.statement) {
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', S.statement);
  }

  /* ---------- detail rows ---------- */
  const notes = q('[data-notes]');
  if (notes && S.notes) {
    S.notes.forEach(item => {
      const li = document.createElement('div');
      li.className = 'panel__row';
      li.textContent = item.label + ': ' + (item.value || '');
      notes.append(li);
    });
  }

  /* ---------- CTA button ---------- */
  if (S.server && S.server.label) {
    const cta = document.createElement('button');
    cta.type = 'button';
    cta.className = 'panel__cta';
    cta.textContent = S.server.label;
    notes.after(cta);
  }
})();
