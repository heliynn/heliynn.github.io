/* Diffs two dumper outputs in the browser. Drop a file on either side, or load
   one of the builds the site already holds. Nothing is uploaded anywhere. */
(() => {
  /* header fields, and the two sections that are name lists rather than
     values: they have nothing to compare across builds */
  const SKIP = new Set([
    'roblox version', 'dumper version', 'dumped at', 'source code', 'discord',
    'total offsets', 'version', 'updated', 'clientversion', 'inherited', 'carried'
  ]);

  const $ = (sel) => document.querySelector(sel);

  /* every value ends up comparable: hex without leading zeros, text trimmed */
  const canonical = (value) => {
    if (typeof value === 'number' && Number.isInteger(value)) {
      return '0x' + BigInt(value).toString(16);
    }
    if (typeof value === 'boolean') return String(value);
    const text = String(value).trim();
    const hex = /^0x([0-9a-f]+)$/i.exec(text);
    if (hex) return '0x' + BigInt('0x' + hex[1]).toString(16);
    return text;
  };

  const join = (prefix, name) => (prefix ? prefix + '::' + name : name);

  /* The dump wraps everything in sections (“Offsets”, “FFlagOffsets”, “Types”).
     The .txt and .hpp it writes do not repeat those section names, so the diff
     does not either: both sides end up keyed Cat::Name. */
  const parseJson = (text) => {
    const map = new Map();
    const root = JSON.parse(text);

    const walk = (node, prefix) => {
      for (const [name, value] of Object.entries(node)) {
        if (Array.isArray(value)) continue;
        const key = join(prefix, name);
        if (value && typeof value === 'object') walk(value, key);
        else map.set(key, canonical(value));
      }
    };

    for (const [name, value] of Object.entries(root)) {
      if (SKIP.has(name.toLowerCase())) continue;
      if (value && typeof value === 'object' && !Array.isArray(value)) walk(value, '');
    }
    return map;
  };

  /* headers and classes: the outermost namespace is the dump itself and is
     dropped, the block inside it becomes the key prefix. Struct fields carry
     their offset in a trailing comment instead of an initializer. */
  const parseCode = (text) => {
    const map = new Map();
    let scope = '';
    let outer = false;

    for (const line of text.split(/\r?\n/)) {
      const block = /^\s*(?:public\s+)?(?:static\s+)?(namespace|struct|class)\s+([A-Za-z_]\w*)/.exec(line);
      if (block) {
        if (block[1] === 'namespace' && !outer) outer = true;
        else scope = block[2];
        continue;
      }

      const field = /([A-Za-z_]\w*)\s*;\s*\/\/\s*(0x[0-9a-fA-F]+)/.exec(line);
      if (field) {
        map.set(join(scope, field[1]), canonical(field[2]));
        continue;
      }

      const value = /([A-Za-z_]\w*)\s*=\s*(0x[0-9a-fA-F]+|\d+)\s*;/.exec(line);
      if (value) map.set(join(scope, value[1]), canonical(value[2]));
    }
    return map;
  };

  const parseLines = (text) => {
    const map = new Map();
    for (const line of text.split(/\r?\n/)) {
      const pair = /^\s*([A-Za-z_]\w*(?:::[A-Za-z_]\w*)?)\s*=\s*(.+?)\s*$/.exec(line);
      if (pair) map.set(pair[1], canonical(pair[2]));
    }
    return map;
  };

  const parse = (text) => {
    const head = text.trimStart();
    if (head.startsWith('{') || head.startsWith('[')) return parseJson(text);
    if (/(^|\n)\s*#pragma|(^|\n)\s*namespace\s/.test(text)) return parseCode(text);
    return parseLines(text);
  };

  const sides = {
    a: { map: null, name: '' },
    b: { map: null, name: '' }
  };

  const out = $('#out');
  const summary = $('#summary');
  const changes = $('#changes');
  const filter = $('#filter');
  const empty = $('#empty');

  const label = (side) => (side === 'a' ? $('#fileA') : $('#fileB'));

  let state = { added: [], removed: [], moved: [], same: 0 };
  let queue = [];
  let cursor = 0;
  let sentinel = null;
  let filterTimer = 0;

  const CHUNK = 200;

  const item = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  };

  const word = (count, one, many) => count.toLocaleString() + ' ' + (count === 1 ? one : many);

  const buildQueue = () => {
    const query = filter.value.trim().toLowerCase();
    const keep = (row) => !query
      || row.key.toLowerCase().includes(query)
      || String(row.value || '').toLowerCase().includes(query)
      || String(row.from || '').toLowerCase().includes(query)
      || String(row.to || '').toLowerCase().includes(query);

    const items = [];
    const add = (kind, rows) => {
      const shown = rows.filter(keep);
      if (!shown.length) return;
      items.push({ kind: 'head', label: kind, count: shown.length });
      for (const row of shown) items.push({ kind: 'row', row });
    };

    add('new', state.added);
    add('gone', state.removed);
    add('moved', state.moved);
    return items;
  };

  const rowNode = (row) => {
    const node = item('div', 'drow');
    const values = item('span', 'drow__vals');
    node.append(item('span', 'drow__name', row.key));
    if (row.from != null) {
      values.append(item('span', 'drow__val', row.from));
      values.append(item('span', 'drow__arrow', '→'));
      values.append(item('span', 'drow__val drow__new', row.to));
    } else {
      values.append(item('span', 'drow__val', row.value));
    }
    node.append(values);
    return node;
  };

  const stop = () => {
    if (sentinel) {
      sentinel.remove();
      sentinel = null;
    }
  };

  const flush = (limit) => {
    stop();
    const until = Math.min(queue.length, cursor + limit);
    for (; cursor < until; cursor++) {
      const entry = queue[cursor];
      if (entry.kind === 'head') {
        const head = item('h2', 'diff__title', entry.label);
        head.append(item('span', 'diff__count', String(entry.count)));
        changes.append(head);
      } else {
        changes.append(rowNode(entry.row));
      }
    }
    if (cursor < queue.length) {
      sentinel = item('p', 'diff__more', 'scrolling loads the rest');
      changes.append(sentinel);
    }
  };

  const nudge = () => {
    if (!sentinel) return;
    if (sentinel.getBoundingClientRect().top > innerHeight + 600) return;
    flush(CHUNK);
    setTimeout(nudge, 0);
  };

  addEventListener('scroll', () => nudge(), { passive: true });

  const render = () => {
    stop();
    changes.replaceChildren();
    cursor = 0;
    queue = buildQueue();
    if (!queue.length) {
      empty.hidden = filter.value.trim() === '';
      empty.textContent = filter.value.trim() === ''
        ? 'Both sides have the same names and values.'
        : 'Nothing in the diff matches that filter.';
      return;
    }
    empty.hidden = true;
    flush(CHUNK);
  };

  const compare = () => {
    const a = sides.a.map;
    const b = sides.b.map;
    if (!a || !b) {
      out.hidden = true;
      return;
    }

    const added = [];
    const removed = [];
    const moved = [];
    let same = 0;

    for (const [key, value] of b) {
      if (!a.has(key)) {
        added.push({ key, value });
      } else if (a.get(key) !== value) {
        moved.push({ key, from: a.get(key), to: value });
      } else {
        same++;
      }
    }
    for (const [key, value] of a) {
      if (!b.has(key)) removed.push({ key, value });
    }

    const byKey = (x, y) => (x.key < y.key ? -1 : x.key > y.key ? 1 : 0);
    state = { added: added.sort(byKey), removed: removed.sort(byKey), moved: moved.sort(byKey), same };

    summary.replaceChildren();
    summary.append(item('span', 'diff__stat', word(state.moved.length, 'moved', 'moved')));
    summary.append(item('span', 'diff__stat', word(state.added.length, 'new', 'new')));
    summary.append(item('span', 'diff__stat', word(state.removed.length, 'gone', 'gone')));
    summary.append(item('span', 'diff__stat diff__stat--calm', word(same, 'unchanged', 'unchanged')));

    out.hidden = false;
    render();
  };

  const setSide = (side, name, text) => {
    const slot = sides[side];
    try {
      slot.map = parse(text);
      slot.name = name;
      label(side).textContent = name + ' · ' + slot.map.size.toLocaleString() + ' entries';
      label(side).classList.remove('is-bad');
    } catch (error) {
      slot.map = null;
      slot.name = name;
      label(side).textContent = name + ' could not be read';
      label(side).classList.add('is-bad');
    }
    compare();
  };

  const loadUrl = async (side, url) => {
    const name = url.split('/').pop();
    label(side).textContent = name + ' · loading…';
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(response.status);
      setSide(side, name, await response.text());
    } catch (error) {
      label(side).textContent = name + ' did not load';
      label(side).classList.add('is-bad');
    }
  };

  for (const side of ['a', 'b']) {
    const pick = $(side === 'a' ? '#pickA' : '#pickB');
    const from = $(side === 'a' ? '#fromA' : '#fromB');
    const card = $(side === 'a' ? '#sideA' : '#sideB');

    pick.addEventListener('change', async () => {
      const file = pick.files && pick.files[0];
      if (!file) return;
      setSide(side, file.name, await file.text());
    });

    from.addEventListener('change', () => {
      const url = from.value;
      from.value = '';
      if (url) loadUrl(side, url);
    });

    card.addEventListener('dragover', (event) => {
      event.preventDefault();
      card.classList.add('is-over');
    });
    card.addEventListener('dragleave', () => card.classList.remove('is-over'));
    card.addEventListener('drop', async (event) => {
      event.preventDefault();
      card.classList.remove('is-over');
      const file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
      if (file) setSide(side, file.name, await file.text());
    });
  }

  filter.addEventListener('input', () => {
    clearTimeout(filterTimer);
    filterTimer = setTimeout(render, 120);
  });

  /* the builds the site holds: the live files plus anything archived next to
     them. A build that is not listed here cannot be picked, which is the point
     of keeping the manifest in one place. */
  const fillBuilds = async () => {
    let manifest = null;
    try {
      const response = await fetch('assets/dumps/manifest.json');
      if (response.ok) manifest = await response.json();
    } catch (error) { /* no manifest: file inputs still work */ }
    if (!manifest) return;

    /* the same three slots as the dump pages, with the privacy note in the
       middle since a diff has no fixed size */
    if (manifest.live) {
      const meta = document.querySelector('#meta');
      meta.textContent = [manifest.live.version, 'nothing uploaded', 'dumped ' + manifest.live.dumped].join(' · ');
      meta.title = meta.textContent;
    }

    const entries = [];
    if (manifest.live) entries.push({ build: manifest.live, group: 'this build' });
    for (const build of manifest.builds || []) entries.push({ build, group: build.version });

    for (const side of ['a', 'b']) {
      const select = $(side === 'a' ? '#fromA' : '#fromB');
      for (const { build, group } of entries) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = group;
        for (const [kind, file] of Object.entries(build.files || {})) {
          const option = document.createElement('option');
          option.value = (build.path || './') + file;
          option.textContent = kind + ' · ' + file;
          optgroup.append(option);
        }
        select.append(optgroup);
      }
    }
  };

  fillBuilds();
})();
