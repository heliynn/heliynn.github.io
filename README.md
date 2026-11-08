# servyy

A small personal page and two offset files, served by GitHub Pages. One screen: an
oversized name and short statement on the left, a glass details card in the right margin,
and the two pictures faded into the edges. Plain HTML, CSS and JavaScript — no build step,
no framework, no dependencies.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page shell. You normally don't touch this. |
| `content.js` | **Everything the site says** — name, intro, contact tiles, links. |
| `styles.css` | The grey backdrop, glass cards, type and spacing. |
| `script.js` | Renders `content.js` into the page. Leave it alone. |
| `assets/` | Optional side pictures (`art-left.png`, `art-right.png`). |
| `backdrop.svg` | The marbled grey background. |
| `offsets.json` | Offsets for the app, as JSON. |
| `offsets.hpp` | The same offsets as a C++ header. |
| `favicon.svg` | Browser tab icon. |
| `.nojekyll` | Tells Pages to serve the files exactly as they are. |

## Editing the page

Open `content.js`, change the text between the quotes, save, refresh.

The placeholders to replace:

- `eyebrow` — the small line above the name.
- `statement` — the paragraph under the name.
- `notes` — the rows in the details card: `now`, `discord`, `github`, `data`. A row with
  `copy` copies its handle on click, `href` makes it a link, and `dot` adds the status light.
- `footerLinks` — currently just a link to the repository.

The name is lowercase on purpose: `display: "servyy"`.

## The two side pictures

Save them as:

- `assets/art-left.png` — left edge
- `assets/art-right.png` — right edge

They fade toward the bottom, sit behind the content, and disappear under 1100px wide so
they never cover text. Missing files are ignored — no broken images.

To swap sides, either rename the files or swap the paths in `content.js`. Delete a line to
remove that side.

## Updating the offsets

Two files mirror each other:

1. Edit `offsets.json` — values as strings, e.g. `"PlayerBase": "0x1F3A8C"`.
2. Edit `offsets.hpp` to match — same names, same values.
3. Bump `version` and `updated` in both.
4. Commit and push. Pages takes about 30 seconds.

From GitHub's web editor that's one pencil click per file. Files ending in `.hpp` download
instead of displaying; apps don't care about the content type, they read the bytes.

## Publishing

The site is live at **https://servfur.github.io/**.

It is served from the public repository `servfur/servfur.github.io`. GitHub treats a repo
named `<username>.github.io` as that account's root site, published from `main` at
`/ (root)` — that is why the URL has no subfolder.

To update it:

```bash
git add -A
git commit -m "what changed"
git push
```

Pages rebuilds on every push to `main`, usually in about 30 seconds. Progress shows under
the repository's **Actions** tab, or under **Settings → Pages**.

The URL only stays `servfur.github.io` while the repository has exactly that name. Renaming
the repo, or renaming the account, changes the address.

## Previewing locally

```bash
python -m http.server 4173
# open http://127.0.0.1:4173/
```

Opening `index.html` directly works too, though Google Fonts need a connection.

## Custom domain (optional)

Settings → Pages → *Custom domain*, plus a `CNAME` record pointing at
`<username>.github.io`.
