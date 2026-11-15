#!/usr/bin/env node
/* Keeps an older dumper output, in every format it came in, at the address of
   the build it belongs to:

     node tools/dump.mjs <folder>             archive what is in <folder>
     node tools/dump.mjs <folder> --latest    archive it and make it the live one
     node tools/dump.mjs <folder> --force     replace an archive that is already there

   <folder> is whatever the dumper wrote: Offsets.json, Offsets.txt, Offsets.cs,
   offsets.hpp, FFlags.* and their friends, in any casing. The offsets and
   fflags of that build are copied to version-<id>/ as offsets.json, offsets.txt,
   offsets.cs, offsets.hpp and the same for fflags, together with the pages that
   read them, so this works:

     /version-4ea8e85481e34f46/offsets.html
     /version-4ea8e85481e34f46/offsets-txt.html
     /version-4ea8e85481e34f46/offsets.txt

   and the newest build stays where it always was, at /offsets.html and friends.
   assets/dumps/manifest.json is rewritten either way: that file is what the
   dumps page and the diff page read, so it must not drift from the folders. */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

const EXTS = ['json', 'txt', 'cs', 'hpp'];
const FAMILIES = [
  { id: 'offsets', solid: 'Offsets' },
  { id: 'fflags', solid: 'FFlags' }
];

/* the names the live files already use, so a new build lands on the same paths
   instead of leaving the old casing behind on a case-sensitive host */
const DEFAULT_ROOT = {
  offsets: 'Offsets.json',
  'offsets.hpp': 'offsets.hpp',
  'offsets.cs': 'Offsets.cs',
  'offsets.txt': 'Offsets.txt',
  fflags: 'FFlags.json',
  'fflags.hpp': 'FFlags.hpp',
  'fflags.cs': 'FFlags.cs',
  'fflags.txt': 'FFlags.txt'
};

const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith('--')));
const source = args.find((arg) => !arg.startsWith('--'));

if (!source) {
  console.log('usage: node tools/dump.mjs <folder> [--latest] [--force]');
  process.exit(1);
}
if (!existsSync(source) || !statSync(source).isDirectory()) {
  console.log(`${source}: not a folder`);
  process.exit(1);
}

const read = (path) => readFileSync(path, 'utf8');
const esc = (text) => String(text == null ? '' : text)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------- what the dumper wrote ---------- */

const written = new Map(); /* "offsets.json" -> path in <folder> */
for (const name of readdirSync(source)) {
  const match = name.match(/^(offsets|fflags)\.(json|txt|cs|hpp)$/i);
  if (match) written.set(match[1].toLowerCase() + '.' + match[2].toLowerCase(), join(source, name));
}

const offsetsJson = written.get('offsets.json');
if (!offsetsJson) {
  console.log(`${source}: no Offsets.json in there, nothing to archive`);
  process.exit(1);
}

const data = JSON.parse(read(offsetsJson));
const version = String(data['Roblox Version'] || data.version || '').trim();
if (!version) {
  console.log(`${offsetsJson}: no "Roblox Version" in the file`);
  process.exit(1);
}

const id = version.replace(/^version-/, '');
const folder = 'version-' + id;
const dumper = String(data['Dumper Version'] || '?');
const dumped = String(data['Dumped At'] || '?');
const versionLabel = 'version-' + id;

if (existsSync(folder) && !flags.has('--force')) {
  console.log(`${folder}/ is already archived. Pass --force to replace it.`);
  process.exit(1);
}

/* ---------- the page numbers come from the pages themselves ---------- */

const rootPage = read('offsets.html');
const pick = (pattern) => {
  const match = rootPage.match(pattern);
  return match ? match[1] : '1';
};
const stamps = {
  '%%OFFSETS_CSS%%': pick(/offsets\.css\?v=(\d+)/),
  '%%THEME_CSS%%': pick(/theme\.css\?v=(\d+)/),
  '%%THEME_JS%%': pick(/theme\.js\?v=(\d+)/),
  '%%BACKDROP_JS%%': pick(/backdrop\.js\?v=(\d+)/),
  '%%VIEWER_JS%%': pick(/viewer\.js\?v=(\d+)/)
};

/* ---------- the pages ---------- */

const tableTemplate = read('tools/version/table.html');
const textTemplate = read('tools/version/text.html');

const fill = (template, tokens) => template.replace(/%%[A-Z0-9_]+%%/g, (name) => (name in tokens ? tokens[name] : name));

const LEDE = {
  json: 'The whole dump as json, every field as the dumper wrote it.',
  txt: 'Plain text dump straight from the dumper.',
  cs: 'C# class straight from the dumper.',
  hpp: 'C++ header straight from the dumper.'
};

const nav = (family) => ['offsets', 'fflags', 'types', 'struct']
  .map((name) => {
    const isFamily = name === family;
    return '<a href="../' + name + '.html"' + (isFamily ? ' aria-current="page"' : '') + '>' + name + '</a>';
  })
  .join('\n          ');

/* the chips of one build point at that build, and every page carries a way
   back to the newest one: an old page is a place people arrive at from a
   search result, not from a click through the site */
const chips = (family, format, hasPage) => {
  const parts = [
    '<a class="btn" href="' + family + '-json.html"' + (format === 'json' ? ' aria-current="page"' : '') + '>json</a>',
    '<a class="btn" href="' + family + '-hpp.html"' + (format === 'hpp' ? ' aria-current="page"' : '') + '>hpp</a>',
    '<a class="btn" href="' + family + '-cs.html"' + (format === 'cs' ? ' aria-current="page"' : '') + '>cs</a>',
    '<a class="btn" href="' + family + '-txt.html"' + (format === 'txt' ? ' aria-current="page"' : '') + '>txt</a>'
  ];
  if (format !== 'table') {
    parts.push('<a class="btn" href="' + family + '.' + format + '" download>download</a>');
    parts.push('<button class="btn" id="copyAll" type="button">copy all</button>');
  }
  return parts.join('\n        ');
};

const stampLine = (family) => '    <p class="status">'
  + '<strong>' + esc(versionLabel) + '</strong> · dumped ' + esc(dumped)
  + ' · <a href="../' + family + '.html">newest build</a>'
  + ' · <a href="../versions.html">all builds</a></p>';

const tablePage = (family) => fill(tableTemplate, {
  ...stamps,
  '%%BASE%%': '../',
  '%%TITLE%%': esc(family + ' · ' + versionLabel + ' · heliynn'),
  '%%DESC%%': esc('The ' + family + ' dump from ' + versionLabel + ', kept so you can look up what a value used to be.'),
  '%%H1%%': family,
  '%%LEDE%%': 'Live values from ' + esc(versionLabel) + ', by heliynn <3',
  '%%SOURCE%%': family + '.json',
  '%%DATA_TITLE%%': family,
  '%%SEARCH%%': 'search category or name…',
  '%%NAV%%': nav(family),
  '%%ACTIONS%%': chips(family, 'table', true),
  '%%STAMP%%': stampLine(family)
});

const textPage = (family, format) => fill(textTemplate, {
  ...stamps,
  '%%BASE%%': '../',
  '%%TITLE%%': esc(family + '.' + format + ' · ' + versionLabel + ' · heliynn'),
  '%%DESC%%': esc('The ' + family + ' dump from ' + versionLabel + ' as ' + format + '.'),
  '%%H1%%': family + '.' + format,
  '%%LEDE%%': LEDE[format],
  '%%SOURCE%%': family + '.' + format,
  '%%DATA_TITLE%%': family + '.' + format,
  '%%BUILD%%': esc(versionLabel),
  '%%DUMPED%%': esc(dumped),
  '%%NAV%%': nav(family),
  '%%ACTIONS%%': chips(family, format, true),
  '%%STAMP%%': stampLine(family)
});

/* ---------- write the folder ---------- */

mkdirSync(folder, { recursive: true });

const files = {};
const pages = {};

for (const family of FAMILIES) {
  const known = {};
  for (const ext of EXTS) {
    const from = written.get(family.id + '.' + ext);
    if (!from) continue;
    const to = family.id + '.' + ext;
    copyFileSync(from, join(folder, to));
    known[ext] = to;
    files[ext === 'json' ? family.id : family.id + '.' + ext] = to;
  }
  if (!known.json) continue;

  writeFileSync(join(folder, family.id + '.html'), tablePage(family.id));
  pages[family.id] = family.id + '.html';
  for (const ext of EXTS) {
    if (!known[ext]) continue;
    writeFileSync(join(folder, family.id + '-' + ext + '.html'), textPage(family.id, ext));
    pages[family.id + '.' + ext] = family.id + '-' + ext + '.html';
  }
}

/* ---------- the manifest ---------- */

const manifestPath = 'assets/dumps/manifest.json';
let manifest = { live: null, builds: [] };
try {
  manifest = JSON.parse(read(manifestPath));
} catch (error) { /* first run: there is nothing to keep */ }

const builds = [
  { version: versionLabel, dumper, dumped, path: folder + '/', files, pages },
  ...(manifest.builds || []).filter((build) => build.version !== versionLabel)
];

let live = manifest.live;
if (flags.has('--latest') || !live) {
  const rootFiles = { ...DEFAULT_ROOT, ...((live && live.files) || {}) };
  const writtenTo = {};
  for (const [kind, file] of Object.entries(files)) {
    const target = rootFiles[kind] || file;
    writtenTo[kind] = target;
    const from = join(folder, file);
    if (resolve(from) !== resolve(target)) copyFileSync(from, target);
  }
  /* types and struct have no archive of their own yet: keep whatever is live */
  for (const [kind, file] of Object.entries((live && live.files) || {})) {
    if (!(kind in writtenTo)) writtenTo[kind] = file;
  }
  live = { version: versionLabel, dumper, dumped, path: './', files: writtenTo };
}

writeFileSync(manifestPath, JSON.stringify({ live, builds }, null, 2) + '\n');

const list = Object.keys(pages);
console.log(`archived ${versionLabel} in ${folder}/`);
console.log('  files: ' + Object.values(files).join(', '));
console.log('  pages: ' + list.length + ' (' + list.join(', ') + ')');
console.log(flags.has('--latest') || !manifest.live ? '  and set as the live build' : '  live build left as ' + live.version);
