# servyy

A small personal page and two offset files, served by GitHub Pages. Plain HTML, CSS and
JavaScript — no build step, no framework, no dependencies.

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

- `contacts[0]` — your Discord handle (`@servfur`). Clicking the tile copies it; change
  `value` and `copy` together.
- `eyebrow` — the small line above the name.
- `intro` — the paragraph under it. Keep it short; it reads better.
- `footerLinks` — currently the offsets file and your GitHub profile.

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

## Publishing to GitHub Pages

The URL comes from your **username** and the **repository name**:

| Wanted URL | What it needs |
| --- | --- |
| `https://heliynn.github.io/` | Repo named exactly `heliynn.github.io` under the account `heliynn` |
| `https://servfur.github.io/` | The GitHub **account** renamed to `servfur`, plus a repo named `servfur.github.io` |
| `https://heliynn.github.io/website/` | Any repo name — the site lives in a subfolder |

`servfur.github.io` cannot be reached by renaming a repository: the `*.github.io` domain
follows the account username. Renaming the account (Settings → Account → Change username)
works and GitHub redirects old links, but it changes your profile URL too.

All paths here are relative, so the site works in any of those positions unchanged.

Once the files are pushed to the default branch:

1. Repository → **Settings** → **Pages**.
2. Source: *Deploy from a branch*.
3. Branch `main`, folder `/ (root)` → **Save**.
4. Wait a minute; the URL appears on that page.

Every push updates the live site afterwards.

## Previewing locally

```bash
python -m http.server 4173
# open http://127.0.0.1:4173/
```

Opening `index.html` directly works too, though Google Fonts need a connection.

## Custom domain (optional)

Settings → Pages → *Custom domain*, plus a `CNAME` record pointing at
`<username>.github.io`.
