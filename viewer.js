/* Renders one dumper output.
   <body data-kind="json" data-source="FFlags.json" data-title="fflags">
   json: category -> { name: value } tables (or a flat list, or an array)
   text: any .hpp / .cs / .txt dump, shown as numbered lines
   data-source takes a comma separated list; the first file that exists wins,
   so Offsets.json and the older offsets.json both keep working. */
(() => {
  const body = document.body;
  const kind = body.dataset.kind || 'json';
  const sources = (body.dataset.source || '').split(',').map((s) => s.trim()).filter(Boolean);
  const label = body.dataset.title || 'dump';
  const key = body.dataset.key || '';

  const $ = (sel) => document.querySelector(sel);
  const meta = $('#meta');
  const status = $('#status');
  const list = $('#categories');
  const code = $('#code');
  const search = $('#search');
  const lede = $('#lede');

  const state = { categories: [], query: '', total: 0, text: [], lines: [] };

  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  };

  const format = (value) => {
    if (typeof value === 'number' && Number.isFinite(value)) return '0x' + value.toString(16).toUpperCase();
    if (typeof value === 'boolean') return String(value);
    if (value == null) return '—';
    return String(value);
  };

  const describe = (data) => {
    const parts = [];
    const version = data['Roblox Version'] || data.version || data.Version;
    if (version) parts.push(version);
    if (data['Total Offsets']) parts.push(data['Total Offsets'] + ' offsets');
    if (data['Dumper Version']) parts.push('dumper ' + data['Dumper Version']);
    if (data['Dumped At']) parts.push('dumped ' + data['Dumped At']);
    return { version, parts };
  };

  const pick = (data) => {
    if (key && data[key]) return data[key];
    const skip = new Set(['Roblox Version', 'Dumper Version', 'Dumped At', 'Source Code', 'Discord', 'Total Offsets', 'version', 'updated']);
    for (const [name, value] of Object.entries(data)) {
      if (skip.has(name)) continue;
      if (value && typeof value === 'object' && !Array.isArray(value)) return value;
    }
    return {};
  };

  const normalize = (data) => {
    const raw = pick(data);
    const categories = [];
    const flat = [];

    for (const [name, value] of Object.entries(raw)) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const entries = Object.entries(value).map(([field, v]) => ({
          name: field,
          value: format(v)
        }));
        if (entries.length) categories.push({ name, entries });
      } else if (Array.isArray(value)) {
        categories.push({ name, entries: value.map((v, i) => ({ name: String(i), value: format(v) })) });
      } else {
        flat.push({ name, value: format(value) });
      }
    }
    if (flat.length) categories.unshift({ name: 'core', entries: flat });

    return {
      categories,
      total: categories.reduce((n, category) => n + category.entries.length, 0)
    };
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

  const matches = (category, entry) => {
    if (!state.query) return true;
    return category.name.toLowerCase().includes(state.query) ||
      entry.name.toLowerCase().includes(state.query) ||
      entry.value.toLowerCase().includes(state.query);
  };

  const renderTable = () => {
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

    if (!shown) list.append(el('p', 'empty', 'Nothing matches that search.'));
  };

  const renderCode = () => {
    if (!code) return;
    code.replaceChildren();
    const filtered = state.lines.filter((line) => !state.query || line.text.toLowerCase().includes(state.query));
    if (!filtered.length) {
      code.append(el('p', 'empty', 'Nothing matches that search.'));
      return;
    }

    filtered.forEach((line) => {
      const row = el('div', 'code__line');
      row.append(el('span', 'code__n', String(line.number)));
      const text = el('code', null, line.text);
      row.append(text);
      code.append(row);
    });
  };

  const render = () => (kind === 'text' ? renderCode() : renderTable());

  const load = async () => {
    let response = null;
    let used = '';
    for (const candidate of sources) {
      const attempt = await fetch(candidate + '?v=' + Date.now(), { cache: 'no-store' }).catch(() => null);
      if (attempt && attempt.ok) {
        response = attempt;
        used = candidate;
        break;
      }
    }

    if (!response) {
      status.textContent = 'No dump found yet. Drop ' + (sources[0] || label) + ' next to this page.';
      if (search) search.disabled = true;
      return;
    }

    if (kind === 'text') {
      const raw = await response.text();
      state.lines = raw.split(/\r?\n/).map((text, i) => ({ number: i + 1, text }));
      state.total = state.lines.length;
      if (meta) meta.textContent = used + ' · ' + state.lines.length + ' lines';
      render();
      return;
    }

    const data = await response.json();
    const parsed = normalize(data);
    const info = describe(data);

    state.categories = parsed.categories;
    state.total = parsed.total;

    if (info.version) {
      document.title = label + ' · ' + info.version;
      if (lede) lede.textContent = 'Live values from ' + info.version + ', by heliynn <3';
    }

    if (meta) {
      meta.textContent = info.parts.join(' · ') || used;
      meta.title = meta.textContent;
    }

    if (!state.categories.length) status.textContent = used + ' is present but has no entries yet.';
    render();
  };

  if (search) {
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
  }

  const copyAll = $('#copyAll');
  if (copyAll) {
    copyAll.addEventListener('click', async () => {
      await copy(state.lines.map((line) => line.text).join('\n'));
      const previous = copyAll.textContent;
      copyAll.textContent = 'copied';
      copyAll.classList.add('is-copied');
      setTimeout(() => {
        copyAll.textContent = previous;
        copyAll.classList.remove('is-copied');
      }, 900);
    });
  }

  load();
})();
