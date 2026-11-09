# Side images

These two files are already placed and shown at the page edges:

- `art-left.png`: the MEGUMIN picture (217×320, transparent background)
- `art-right.png`: the MEGUMIN2 picture (228×340, transparent background)
- `share.png`: the 1200×630 social preview, built from `art-left.png`

They sit behind the content with a quiet black filter and hide below 1260px wide so they
never sit under the text. If a file is missing, the slot is simply skipped.

To swap sides, rename the files or change the paths in `content.js`:

```js
art: {
  left: { src: "assets/art-left.png?v=11", width: 564, height: 1000 },
  right: { src: "assets/art-right.png?v=12", width: 395, height: 583 }
}
```

Remove a line to drop that side. The width and height let the page reserve space before
the file loads. The version query on each path is a cache-buster; raise it when you replace
a picture so browsers fetch the new one.

`share.png` is not used on the page. It is only the preview image for links, and you can
replace it with any 1200×630 PNG.
