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

  /* ---------- server modal ---------- */
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

    // Make CTA button open the modal
    if (S.server && S.server.label) {
      const cta = document.querySelector('.panel__cta');
      if (cta) {
        cta.setAttribute('data-modal', 'server');
        cta.addEventListener('click', openModal);
      }
    }
  }
})();
