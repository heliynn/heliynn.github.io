# Side images

These two files are already placed and shown at the page edges:

- `art-left.png`: the white-haired picture (656×1164, transparent background)
- `art-right.png`: the red-dress picture (790×1166, transparent background)
- `share.png`: the 1200×630 social preview, built from `art-left.png`

They sit behind the content at full opacity and hide below 1260px wide so they never sit
under the text. If a file is missing, the slot is simply skipped.

To swap sides, rename the files or change the paths in `content.js`:

```js
art: {
  left: { src: "assets/art-left.png?v=10", width: 656, height: 1164 },
  right: { src: "assets/art-right.png?v=10", width: 790, height: 1166 }
}
```

Remove a line to drop that side. The width and height let the page reserve space before
the file loads. The `?v=10` on each path is a cache-buster; raise that number when you
replace a picture so browsers fetch the new one.

`share.png` is not used on the page. It is only the preview image for links, and you can
replace it with any 1200×630 PNG.
