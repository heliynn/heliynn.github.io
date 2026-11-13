# Assets

Side art:

- `art-left.png`: the MEGUMIN picture (217×320, transparent background)
- `art-right.png`: the MEGUMIN2 picture (228×340, transparent background)
- `share.png`: the 1200×630 social preview, built from the old left art

Discord popup icons:

- `server-archive.png`: the servyy's archive server icon (128×128)
- `server-sourcesgg.png`: the Sources.gg server icon (128×128)

The side art sits behind the content with a quiet black filter and hides below 1260px wide
so it never sits under the text. If a file is missing, the slot is simply skipped.

To swap sides, rename the files or change the paths in `content.js`:

```js
art: {
  left: { src: "assets/art-left.png?v=15", width: 217, height: 320 },
  right: { src: "assets/art-right.png?v=15", width: 228, height: 340 }
}
```

Remove a line to drop that side. The width and height let the page reserve space before
the file loads. The version query on each path is a cache-buster; raise it when you replace
a picture so browsers fetch the new one.

The popup list also lives in `content.js` under `servers`. Each entry has a `name`, the
`invite` code (the part after `https://discord.gg/`), your `role`, and an `image` path.
Replace the icon files here if you want different server pictures.

`share.png` is not used on the page. It is only the preview image for links, and you can
replace it with any 1200×630 PNG.

## Music for the bottom pill

Drop one file at `assets/music.mp3` and the player picks it up on load. Nothing else to
change. The name shown next to the bars comes from the filename, so `late-night.mp3`
displayed as "late-night". To use a different file or title, edit the `<audio>` line in
`index.html`:

```html
<audio id="pillAudio" src="assets/music.mp3" data-title="what you want" preload="metadata" loop></audio>
```

MP3, OGG, WAV and M4A all play in browsers. Keep it under a few MB so the page stays quick,
and keep it in this folder (or anywhere on the site) so the browser lets the visualizer read
the audio.
