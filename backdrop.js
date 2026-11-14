/* Halftone backdrop.
   A noise field is screened into dots on a tilted grid: the dot size is the
   field value, so bright areas swell into solid red and dark ones fall away to
   black. The field itself is domain-warped and scrolls continuously, which is
   what makes the shapes flow and stretch instead of sliding back and forth. */
(() => {
  const host = document.querySelector('.backdrop');
  if (!host) return;

  const canvas = document.createElement('canvas');
  host.append(canvas);
  const ctx = canvas.getContext('2d', { alpha: false });

  const STEP = 9;          /* dot pitch, css px */
  const TILT = -0.34;      /* grid angle, radians */
  const LEVELS = 20;       /* dot size / colour steps */
  const SAMPLE = 3;        /* field is sampled every 3 cells, then interpolated */

  const PALETTE = [];
  for (let i = 0; i < LEVELS; i++) {
    const k = i / (LEVELS - 1);
    PALETTE.push('rgb(' +
      Math.round(26 + 233 * Math.pow(k, .9)) + ',' +
      Math.round(5 + 45 * Math.pow(k, 2.2)) + ',' +
      Math.round(7 + 30 * Math.pow(k, 2.2)) + ')');
  }

  const hash = (x, y) => {
    const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return n - Math.floor(n);
  };
  const ease = (t) => t * t * (3 - 2 * t);

  const noise = (x, y) => {
    const ix = Math.floor(x), iy = Math.floor(y);
    const fx = ease(x - ix), fy = ease(y - iy);
    const a = hash(ix, iy), b = hash(ix + 1, iy);
    const c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1);
    const top = a + (b - a) * fx;
    const bottom = c + (d - c) * fx;
    return top + (bottom - top) * fy;
  };

  /* 0..1 for a point on screen at time t */
  const field = (x, y, t, w, h) => {
    const s = 1 / 560;
    const wx = noise(x * s * .8 + 11.3, y * s * .8 + t * .05) - .5;
    const wy = noise(x * s * .8 + 4.1, y * s * .8 + 27.7 + t * .04) - .5;
    const px = (x + wx * 430) * s;
    const py = (y + wy * 430) * s;

    let n = noise(px + t * .035, py + t * .028);
    n += .45 * (noise(px * 2.4 + 5.2, py * 2.4 + 1.3 + t * .05) - .5);
    n += .2 * (noise(px * 5.1 + 9.7, py * 5.1 + 7.4) - .5);

    /* a light that orbits, so a solid red patch keeps wandering */
    const lx = .58 + .3 * Math.sin(t * .043);
    const ly = .34 + .22 * Math.cos(t * .037);
    const dx = (x / w - lx) * 1.25;
    const dy = (y / h - ly);
    const light = Math.exp(-(dx * dx + dy * dy) * 3.1);

    return Math.max(0, Math.min(1, .26 + (n - .5) * 1.5 + light * .46 - .14));
  };

  let w = 0, h = 0, cols = 0, rows = 0;
  const buckets = [];
  for (let i = 0; i < LEVELS; i++) buckets.push([]);

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    w = host.clientWidth;
    h = host.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil((w + h) / STEP) + 2;
    rows = Math.ceil((w + h) / STEP) + 2;
  };

  const cos = Math.cos(TILT), sin = Math.sin(TILT);

  const draw = (t) => {
    ctx.fillStyle = '#07070a';
    ctx.fillRect(0, 0, w, h);

    const gw = Math.ceil(cols / SAMPLE) + 2;
    const gh = Math.ceil(rows / SAMPLE) + 1;
    const grid = new Float32Array(gw * gh);

    for (let gy = 0; gy < gh; gy++) {
      for (let gx = 0; gx < gw; gx++) {
        const cx = gx * SAMPLE * STEP, cy = gy * SAMPLE * STEP;
        grid[gy * gw + gx] = field(cx * cos - cy * sin, cx * sin + cy * cos, t, w, h);
      }
    }

    for (let i = 0; i < LEVELS; i++) buckets[i].length = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const fx = col / SAMPLE, fy = row / SAMPLE;
        const x0 = Math.floor(fx), y0 = Math.floor(fy);
        const tx = ease(fx - x0), ty = ease(fy - y0);
        const i00 = y0 * gw + x0, i10 = i00 + 1, i01 = i00 + gw, i11 = i01 + 1;
        const top = grid[i00] + (grid[i10] - grid[i00]) * tx;
        const bottom = grid[i01] + (grid[i11] - grid[i01]) * tx;
        const v = top + (bottom - top) * ty;

        if (v < .04) continue;

        const level = Math.min(LEVELS - 1, Math.round(v * (LEVELS - 1)));
        const r = Math.pow(v, 1.5) * STEP * .78;

        const cx = col * STEP, cy = row * STEP;
        buckets[level].push(cx * cos - cy * sin, cx * sin + cy * cos, r);
      }
    }

    for (let level = 0; level < LEVELS; level++) {
      const list = buckets[level];
      if (!list.length) continue;
      const path = new Path2D();
      for (let i = 0; i < list.length; i += 3) {
        const r = list[i + 2];
        path.rect(list[i] - r, list[i + 1] - r, r * 2, r * 2);
      }
      ctx.fillStyle = PALETTE[level];
      ctx.fill(path);
    }
  };

  const started = performance.now();
  const frozen = typeof window.HALFTONE_TIME === 'number' ? window.HALFTONE_TIME : null;
  let raf = 0;

  const loop = () => {
    draw(frozen === null ? (performance.now() - started) / 1000 : frozen);
    if (frozen === null) raf = requestAnimationFrame(loop);
  };

  const start = () => {
    if (raf || frozen !== null) return;
    raf = requestAnimationFrame(loop);
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  resize();
  loop();

  addEventListener('resize', () => {
    resize();
    draw(frozen === null ? (performance.now() - started) / 1000 : frozen);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });
})();
