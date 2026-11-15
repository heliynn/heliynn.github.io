#!/usr/bin/env node
/* Checks the site before it goes out, and optionally checks what actually
   landed.

     node tools/check.mjs                     local: files, syntax, links
     node tools/check.mjs --base https://heliynn.github.io
                                              also fetch every page and asset,
                                              and compare what is deployed
                                              with what is in the repo

   Exit code is the number of problems found, so CI fails on them.

   Two failures this exists for: a page pointing at a file that was renamed,
   and a live site still serving yesterday's script because nothing bumped the
   ?v= on it. Both are invisible in a browser you have already visited. */

import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const baseIndex = args.indexOf('--base');
const base = baseIndex >= 0 ? args[baseIndex + 1].replace(/\/$/, '') : '';

const problems = [];
const fail = (message) => problems.push(message);

const files = readdirSync('.').filter((name) => !name.startsWith('.'));
/* archived builds keep their own pages under version-<id>/, and they are part
   of the site: one pointing at a renamed asset is just as broken as a root page */
const archived = files.filter((name) => /^version-[A-Za-z0-9_-]+$/.test(name) && statSync(name).isDirectory());
const pages = files.filter((name) => name.endsWith('.html'))
  .concat(archived
    .flatMap((dir) => readdirSync(dir).filter((name) => name.endsWith('.html')).map((name) => dir + '/' + name)));
const scripts = files.filter((name) => name.endsWith('.js'));
const sheets = files.filter((name) => name.endsWith('.css'));

/* ---------- javascript parses ---------- */
for (const name of scripts) {
  try {
    execFileSync(process.execPath, ['--check', name], { stdio: 'pipe' });
  } catch (error) {
    fail(`${name}: does not parse\n${String(error.stderr).split('\n').slice(0, 3).join('\n')}`);
  }
}

/* ---------- stylesheets are balanced ----------
   A rule dropped inside another block still looks fine in an editor and kills
   everything after it, which is exactly what happened once already. */
for (const name of sheets) {
  const text = readFileSync(name, 'utf8');
  let depth = 0;
  let broke = false;
  for (const character of text) {
    if (character === '{') depth += 1;
    if (character === '}') depth -= 1;
    if (depth < 0) { broke = true; break; }
  }
  if (broke || depth !== 0) fail(`${name}: braces do not balance (ends at depth ${depth})`);
}

/* ---------- every local link and asset exists ---------- */
const localPath = (page, ref) => {
  const clean = ref.split('#')[0].split('?')[0];
  if (!clean || clean.startsWith('http') || clean.startsWith('//') || clean.startsWith('mailto:')) return null;
  /* ../ resolved the way the browser does it, so a page inside version-<id>/
     can reach the shared files and the check still knows where that lands */
  const folder = page.includes('/') ? page.slice(0, page.indexOf('/')) + '/' : '';
  const parts = [];
  for (const piece of (clean.startsWith('/') ? clean.slice(1) : folder + clean).split('/')) {
    if (piece === '..') parts.pop();
    else if (piece && piece !== '.') parts.push(piece);
  }
  return parts.join('/') || 'index.html';
};

const referenced = new Map(); /* path -> the page that wants it */

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const match of html.matchAll(/(?<![-\w])(?:href|src)="([^"]+)"/g)) {
    const path = localPath(page, match[1]);
    if (!path || path === '404.html') continue;
    if (!referenced.has(path)) referenced.set(path, page);
    const onDisk = path || 'index.html';
    if (!existsSync(onDisk)) fail(`${page}: points at ${path}, which is not in the repo`);
  }
}

/* ---------- the live site is what the repo says ---------- */
const stripCr = (text) => text.replace(/\r/g, '');
const get = async (url) => {
  const response = await fetch(url, { redirect: 'follow' });
  return response;
};

if (base) {
  for (const page of pages) {
    const url = `${base}/${page}`;
    const response = await get(url).catch(() => null);
    if (!response || !response.ok) {
      fail(`${url}: ${response ? response.status : 'did not respond'}`);
      continue;
    }
    const html = await response.text();
    for (const match of html.matchAll(/(?<![-\w])(?:href|src)="([^"]+)"/g)) {
      const path = localPath(page, match[1]);
      if (!path) continue;
      const assetUrl = `${base}/${path}`;
      const asset = await get(assetUrl).catch(() => null);
      if (!asset || !asset.ok) {
        fail(`${page}: ${path} deployed as ${asset ? asset.status : 'unreachable'}`);
        continue;
      }
      /* a script or stylesheet whose bytes differ from the repo is a stale copy */
      if (/\.(js|css)$/.test(path) && existsSync(path)) {
        const deployed = stripCr(await asset.text());
        const local = stripCr(readFileSync(path, 'utf8'));
        if (deployed !== local) fail(`${path}: deployed copy is not the one in the repo (bump its ?v=)`);
      }
    }
  }

  for (const name of ['robots.txt', 'sitemap.xml', 'assets/music-spectrum.json']) {
    const response = await get(`${base}/${name}`).catch(() => null);
    if (!response || !response.ok) fail(`${base}/${name}: ${response ? response.status : 'unreachable'}`);
  }
}

/* ---------- report ---------- */
const size = (path) => {
  try { return statSync(path).size; } catch (error) { return 0; }
};
const heavy = ['assets/music.mp3', 'assets/music-spectrum.json']
  .filter((path) => existsSync(path))
  .map((path) => `${path} ${(size(path) / 1024).toFixed(0)} KB`);

if (problems.length) {
  console.log(`${problems.length} problem${problems.length === 1 ? '' : 's'}:`);
  for (const problem of problems) console.log('  · ' + problem);
} else {
  const scope = base ? `local and ${base}` : 'local';
  console.log(`checked ${pages.length} pages, ${scripts.length} scripts, ${sheets.length} stylesheets (${scope})`);
  if (heavy.length) console.log('heaviest: ' + heavy.join(', '));
}
process.exit(Math.min(problems.length, 99));
