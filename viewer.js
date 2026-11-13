/* Renders one dumper output.
   data-kind="json"|"text", data-source="FFlags.json" (comma separated, first that exists wins),
   data-title="fflags". */
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

  /* Pages is case sensitive and the dumper has changed filename casing before,
     so the download links follow whichever file loaded rather than a hardcoded path. */
  const setDownloads = (href) => {
    for (const link of document.querySelectorAll('a[download], a[data-download]')) {
      if (!href) {
        /* href only: keeping download lets the selector find this again */
        link.removeAttribute('href');
        link.setAttribute('aria-disabled', 'true');
        link.classList.add('is-disabled');
        link.title = 'This file has not been dumped yet';
        continue;
      }
      link.href = href;
      link.setAttribute('download', href);
      link.removeAttribute('aria-disabled');
      link.classList.remove('is-disabled');
      link.removeAttribute('title');
    }
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

  const rowNode = (entry) => {
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
    return row;
  };

  const lineNode = (line) => {
    const row = el('div', 'code__line');
    row.append(el('span', 'code__n', String(line.number)));
    row.append(el('code', null, line.text));
    return row;
  };

  /* flag dumps run to tens of thousands of rows, so they go in CHUNK at a time */
  const CHUNK = 120;
  let queue = [];      /* what is left to put on the page */
  let cursor = 0;
  let openCard = null; /* the category card the next rows belong to */
  let sentinel = null;

  const container = () => (kind === 'text' ? code : list);

  const wanted = () => {
    const items = [];

    if (kind === 'text') {
      for (const line of state.lines) {
        if (state.query && !line.text.toLowerCase().includes(state.query)) continue;
        items.push({ kind: 'line', line });
      }
      return items;
    }

    for (const category of state.categories) {
      const entries = category.entries.filter((entry) => matches(category, entry));
      if (!entries.length) continue;
      items.push({ kind: 'head', category, count: entries.length });
      for (const entry of entries) items.push({ kind: 'row', entry });
    }
    return items;
  };

  const stopWatching = () => {
    if (sentinel) {
      sentinel.remove();
      sentinel = null;
    }
  };

  /* a scroll check rather than IntersectionObserver: it cannot silently stop firing */
  const nudge = () => {
    if (!sentinel) return;
    if (sentinel.getBoundingClientRect().top > innerHeight + 600) return;
    flush(CHUNK);
    setTimeout(nudge, 0);
  };

  const watch = () => {
    sentinel = el('div', 'more', 'loading more…');
    container().append(sentinel);
    setTimeout(nudge, 0);
  };

  let checked = 0;
  addEventListener('scroll', () => {
    const now = Date.now();
    if (now - checked < 120) return; /* one check per few frames is plenty */
    checked = now;
    nudge();
  }, { passive: true });

  const place = (item) => {
    if (item.kind === 'head') {
      openCard = el('section', 'cat');
      const head = el('div', 'cat__head');
      head.append(el('span', 'cat__name', item.category.name), el('span', 'cat__n', String(item.count)));
      const rows = el('div', 'rows');
      openCard.append(head, rows);
      openCard.rows = rows;
      list.append(openCard);
      return;
    }
    if (item.kind === 'row') {
      if (openCard) openCard.rows.append(rowNode(item.entry));
      return;
    }
    code.append(lineNode(item.line));
  };

  const flush = (limit) => {
    stopWatching();
    const until = Math.min(queue.length, cursor + limit);
    for (; cursor < until; cursor++) place(queue[cursor]);
    if (cursor < queue.length) watch();
  };

  const render = () => {
    if (kind === 'text' && !code) return;

    stopWatching();
    container().replaceChildren();
    openCard = null;
    queue = wanted();
    cursor = 0;

    if (!queue.length) {
      container().append(el('p', 'empty', 'Nothing matches that search.'));
      return;
    }

    /* small dumps in whole, big ones by the screenful */
    flush(queue.length <= 1500 ? Infinity : CHUNK * 2);
  };

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
      setDownloads('');
      return;
    }

    setDownloads(used);

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

  let typing = 0;

  if (search) {
    search.addEventListener('input', () => {
      /* a big dump filters slowly: wait for a pause, not every key */
      clearTimeout(typing);
      typing = setTimeout(() => {
        state.query = search.value.trim().toLowerCase();
        render();
      }, 120);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === '/' && document.activeElement !== search) {
        event.preventDefault();
        search.focus();
      }
      if (event.key === 'Escape' && document.activeElement === search) {
        search.value = '';
        state.query = '';
        clearTimeout(typing);
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
