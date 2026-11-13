/* Renders offsets.json. Supports the dumper schema (Offsets: category -> fields)
   and the older flat shape (offsets: name -> value). */
(() => {
  const $ = (sel) => document.querySelector(sel);
  const meta = $('#meta');
  const status = $('#status');
  const list = $('#categories');
  const search = $('#search');
  const count = $('#count');
  const lede = $('#lede');

  const state = { categories: [], query: '', total: 0 };

  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  };

  const format = (value) => {
    if (typeof value === 'number' && Number.isFinite(value)) return '0x' + value.toString(16).toUpperCase();
    if (typeof value === 'boolean') return String(value);
    return String(value);
  };

  const normalize = (data) => {
    const raw = (data && (data.Offsets || data.offsets)) || {};
    const categories = [];
    const flat = [];

    for (const [name, value] of Object.entries(raw)) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const entries = Object.entries(value).map(([field, v]) => ({ name: field, value: format(v) }));
        if (entries.length) categories.push({ name, entries });
      } else {
        flat.push({ name, value: format(value) });
      }
    }
    if (flat.length) categories.unshift({ name: 'core', entries: flat });

    const counted = categories.reduce((n, category) => n + category.entries.length, 0);
    return {
      categories,
      version: data['Roblox Version'] || data.version || '',
      dumper: data['Dumper Version'] || '',
      dumped: data['Dumped At'] || data.updated || '',
      total: Number(data['Total Offsets']) || counted
    };
  };

  const matches = (category, entry) => {
    if (!state.query) return true;
    return category.name.toLowerCase().includes(state.query) ||
      entry.name.toLowerCase().includes(state.query);
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch { /* fall through */ }
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.append(field);
    field.select();
    try { document.execCommand('copy'); } finally { field.remove(); }
  };

  const render = () => {
    list.replaceChildren();
    let shown = 0;

    for (const category of state.categories) {
      const entries = category.entries.filter((entry) => matches(category, entry));
      if (!entries.length) continue;
      shown += entries.length;

      const card = el('section', 'cat');
      const head = el('div', 'cat__head');
      head.append(el('span', 'cat__name', category.name), el('span', 'cat__n', String(entries.length)));

      const rows = el('div', 'rows');
      for (const entry of entries) {
        const row = el('div', 'row');
        const name = el('span', 'row__name', entry.name);
        const value = el('button', 'row__val', entry.value);
        value.type = 'button';
        value.title = 'Copy ' + entry.value;
        value.setAttribute('aria-label', 'Copy ' + entry.name + ' value');

        value.addEventListener('click', async () => {
          await copy(entry.value);
          const previous = value.textContent;
          value.textContent = 'copied';
          value.classList.add('is-copied');
          setTimeout(() => {
            value.textContent = previous;
            value.classList.remove('is-copied');
          }, 900);
        });

        row.append(name, value);
        rows.append(row);
      }

      card.append(head, rows);
      list.append(card);
    }

    if (!shown) list.append(el('p', 'empty', 'No offsets match that search.'));
  };

  const init = async () => {
    try {
      const response = await fetch('offsets.json?v=' + Date.now(), { cache: 'no-store' });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const data = await response.json();
      const parsed = normalize(data);

      state.categories = parsed.categories;
      state.total = parsed.total;
      if (!state.categories.length) state.total = 0;

      if (parsed.version) {
        document.title = 'offsets · ' + parsed.version;
        lede.textContent = 'Live values from ' + parsed.version + ', by heliynn <3';
      }

      const parts = [];
      if (parsed.version) parts.push(parsed.version);
      if (parsed.total) parts.push(parsed.total + ' offsets');
      if (parsed.dumper) parts.push('dumper ' + parsed.dumper);
      if (parsed.dumped) parts.push('dumped ' + parsed.dumped);
      meta.textContent = parts.join(' · ');
      meta.title = parts.join(' · ');

      if (!state.categories.length) status.textContent = 'offsets.json is present but has no offsets yet.';
      render();
    } catch (error) {
      status.textContent = 'Could not load offsets.json (' + error.message + ').';
      count.textContent = '';
    }
  };

  search.addEventListener('input', () => {
    state.query = search.value.trim().toLowerCase();
    render();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && document.activeElement !== search) {
      event.preventDefault();
      search.focus();
    }
    if (event.key === 'Escape' && document.activeElement === search) {
      search.value = '';
      state.query = '';
      render();
      search.blur();
    }
  });

  init();
})();
