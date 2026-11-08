# Side images

These two files are already placed and shown at the page edges:

- `art-left.png`: the white-haired picture (328×582, transparent background)
- `art-right.png`: the red-dress picture (217×320, flat black background)
- `share.png`: the 1200×630 social preview, built from `art-left.png`

They sit behind the content at full opacity and hide below 1260px wide so they never sit
under the text. If a file is missing, the slot is simply skipped.

To swap sides, rename the files or change the paths in `content.js`:

```js
art: {
  left: { src: "assets/art-left.png", width: 328, height: 582 },
  right: { src: "assets/art-right.png", width: 217, height: 320 }
}
```

Remove a line to drop that side. The width and height let the page reserve space before
the file loads. A higher-resolution version of the right-hand picture would scale better,
since it is currently upscaled from 217px wide.

`share.png` is not used on the page. It is only the preview image for links, and you can
replace it with any 1200×630 PNG.
