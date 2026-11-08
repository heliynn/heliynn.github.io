# Side images

These two files are already placed and shown at the page edges:

- `art-left.png` — the white-haired picture (328×582, transparent background)
- `art-right.png` — the red-dress picture (217×320, flat black background)

They render at 42% opacity, feathered into the backdrop, and hide below 1260px wide so they
never sit under the text. If a file is missing, the slot is simply skipped.

To swap sides, rename the files or change the paths in `content.js`:

```js
art: {
  left: "assets/art-left.png",
  right: "assets/art-right.png"
}
```

Remove a line to drop that side. A higher-resolution version of the right-hand picture
would scale better — it is currently upscaled from 217px wide.
