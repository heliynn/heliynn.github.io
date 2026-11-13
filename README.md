# servyy

A small personal page and two offset files, served by GitHub Pages. One screen: an
oversized name and a short statement on the left, a details card in the right margin, and
the two pictures set into the edges. Plain HTML, CSS and JavaScript, with no build step,
no framework and no dependencies.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page shell. You normally don't touch this. |
| `content.js` | **Everything the site says** — name, statement, details card, links. |
| `styles.css` | The backdrop, details card, type and spacing. |
| `script.js` | Renders `content.js` into the page. Leave it alone. |
| `assets/` | Optional side pictures (`art-left.png`, `art-right.png`). |
| `styles.css` (`.backdrop`) | The animated red halftone background, drawn in CSS. |
| `offsets.json` | Offsets for the app, as JSON. |
| `offsets.hpp` | The same offsets as a C++ header. |
| `offsets.html` | Offsets table, rendered from the JSON dump. |
| `fflags.html`, `types.html`, `struct.html` | One page per dumper output. |
| `viewer.js` | Shared renderer for every dump page. |
| `favicon.svg` | Browser tab icon. |
| `.nojekyll` | Tells Pages to serve the files exactly as they are. |

## Editing the page

Open `content.js`, change the text between the quotes, save, refresh.

The placeholders to replace:

- `statement` — the paragraph next to the name.
- `notes` — the rows in the details card: `discord`, `github`, `offsets`. A row with `copy`
  copies its handle on click, and a row with `href` is a link.
- `server` — the button under the rows. `label` is its wording and `href` is the invite.

The name is lowercase on purpose: `display: "servyy"`.

## The two side pictures

Save them as:

- `assets/art-left.png` — left edge
- `assets/art-right.png` — right edge

They sit behind the content with a quiet black filter and disappear under 1260px wide so
they never cover text. Both should have transparent backgrounds. Missing files are ignored,
so there are no broken images.

`content.js` also stores each picture's width and height, which lets the page reserve
space before the file loads. Update those numbers if you swap in a different image.

To swap sides, either rename the files or swap the paths in `content.js`. Delete a line to
remove that side.

## Share preview

`assets/share.png` is the 1200×630 image shown when the link is posted, built from the left
picture. If you replace that picture, replace this file too with another 1200×630 PNG.

The `og:image` and `twitter:image` tags in `index.html` point at
`https://heliynn.github.io/assets/share.png`. Update those two URLs if the site moves to
another domain.

## Dumper outputs

Every page in the dumper's folder has a page here. Each one fetches its file from the repo
root and renders it; if the file is missing the page says so instead of breaking.

| Output | Page |
| --- | --- |
| `Offsets.json` (or `offsets.json`) | `offsets.html` |
| `Offsets.hpp` / `Offsets.cs` / `Offsets.txt` | `offsets-hpp.html`, `offsets-cs.html`, `offsets-txt.html` |
| `FFlags.json` | `fflags.html` |
| `FFlags.hpp` / `FFlags.cs` / `FFlags.txt` | `fflags-hpp.html`, `fflags-cs.html`, `fflags-txt.html` |
| `Types.json` | `types.html` |
| `Struct.hpp` | `struct.html` |
| `OffsetsHex.json`, `FFlagsHex.json`, `run_dumper*.log` | not shown |

The pages are linked from the header of every dump page (offsets · fflags · types · struct),
and each page has buttons for its other formats plus a download link.

JSON pages read the dump's own `Roblox Version`, `Dumper Version`, `Dumped At` and
`Total Offsets` fields when they exist, then fall back to counting entries. Text pages just
show numbered lines, with search and a copy-all button.

To add another output, copy one of the pages and change `data-kind`, `data-source`,
`data-title` and the heading. `data-source` accepts a comma separated list, so
`Offsets.json,offsets.json` tries the first and falls back to the second.

## Updating the offsets

Two files mirror each other:

1. Edit `offsets.json` — values as strings, e.g. `"PlayerBase": "0x1F3A8C"`.
2. Edit `offsets.hpp` to match — same names, same values.
3. Bump `version` and `updated` in both.
4. Commit and push. Pages takes about 30 seconds.

From GitHub's web editor that's one pencil click per file. Files ending in `.hpp` download
instead of displaying; apps don't care about the content type, they read the bytes.

## Publishing

The site is live at **https://heliynn.github.io/**.




It is served from the public repository `heliynn/heliynn.github.io`. GitHub treats a repo
named `<username>.github.io` as that account's root site, published from `main` at
`/ (root)` — that is why the URL has no subfolder.

To update it:

```bash
git add -A
git commit -m "what changed"
git push
````r

Pages rebuilds on every push to `main`, usually in about 30 seconds. Progress shows under
the repository's **Actions** tab, or under **Settings → Pages**.

The URL only stays `heliynn.github.io` while the repository has exactly that name. Renaming
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

