/* Halftone backdrop, drawn in one fragment shader.
   A noise field is sampled at each dot centre on a tilted grid; the dot radius
   is the field value, so dots swell, meet and merge into solid red while dark
   areas fall away to black. The field is domain-warped and scrolls with time,
   so shapes stretch and flow instead of sliding back and forth.
   Doing it per pixel keeps the edges round and the size ramp continuous, and
   costs the CPU nothing per frame. */
(() => {
  const host = document.querySelector('.backdrop');
  if (!host) return;

  const canvas = document.createElement('canvas');
  host.append(canvas);
  canvas.className = 'backdrop__gl';

  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance'
  });

  if (!gl) {
    host.classList.add('is-flat');
    return;
  }

  const VERT = `
    attribute vec2 aPos;
    void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
  `;

  const FRAG = `
    precision highp float;

    uniform vec2 uRes;    /* css pixels */
    uniform float uTime;
    uniform float uStep;  /* dot pitch */
    uniform float uScale; /* device pixels per css pixel */

    /* integer-style hash: sin() based ones lose precision on some GPUs and
       drift bright, which floods the screen with red */
    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float vnoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }

    float field(vec2 p, float t) {
      vec2 warp = vec2(
        vnoise(p * 0.0014 + 11.3 + t * 0.05),
        vnoise(p * 0.0014 + 4.1 + t * 0.04)
      ) - 0.5;

      vec2 q = (p + warp * 300.0) * (1.0 / 360.0);

      float n = vnoise(q + t * 0.035);
      n += 0.45 * (vnoise(q * 2.4 + 5.2 + t * 0.05) - 0.5);
      n += 0.20 * (vnoise(q * 5.1 + 9.7) - 0.5);

      /* two lights drifting out of phase: the left side gets its own glow
         instead of only ever catching the spill from the right */
      vec2 uv = p / uRes;
      vec2 left = vec2(0.30 + 0.11 * sin(t * 0.029), 0.46 + 0.15 * cos(t * 0.021));
      vec2 right = vec2(0.70 + 0.11 * cos(t * 0.037), 0.54 + 0.17 * sin(t * 0.031));
      vec2 dl = (uv - left) * vec2(1.15, 1.0);
      vec2 dr = (uv - right) * vec2(1.15, 1.0);
      /* max, not sum: when the two lights drift together their overlap must not
         double the brightness or the frame floods */
      float light = max(exp(-dot(dl, dl) * 1.9) * 0.38, exp(-dot(dr, dr) * 2.1) * 0.36);

      /* an anchor glow that does not travel, so the screen never goes fully
         dark while the two lights are both out at the edges */
      vec2 anchor = (uv - vec2(0.80, 0.56)) * vec2(1.1, 1.0);
      light = max(light, exp(-dot(anchor, anchor) * 1.5) * 0.30);

      return clamp(0.40 + (n - 0.5) * 0.55 + light - 0.08, 0.0, 1.0);
    }

    void main() {
      vec2 p = gl_FragCoord.xy / uScale;
      float angle = -0.34;
      float ca = cos(angle);
      float sa = sin(angle);

      vec2 g = vec2(ca * p.x - sa * p.y, sa * p.x + ca * p.y) / uStep;
      vec2 cell = floor(g) + 0.5;

      /* back to css pixels so the field is sampled at the dot centre */
      vec2 centre = vec2(ca * cell.x + sa * cell.y, -sa * cell.x + ca * cell.y) * uStep;

      /* stretch the mid tones so bright regions actually saturate */
      float v = smoothstep(0.13, 0.98, field(centre, uTime));

      /* a late, steep curve on purpose: dots stay small across most of the
         ramp and only meet right at the top, so the run from black through
         dots to solid red takes up space instead of snapping */
      float radius = 0.055 + pow(v, 2.0) * 0.82;

      float dist = length(fract(g) - 0.5) - radius;
      float aa = 0.9 / uStep;
      float cover = 1.0 - smoothstep(-aa, aa, dist);

      vec3 ink = vec3(0.027, 0.027, 0.039);
      vec3 red = mix(vec3(0.12, 0.02, 0.03), vec3(1.0, 0.17, 0.07), pow(v, 1.15));

      gl_FragColor = vec4(mix(ink, red, cover), 1.0);
    }
  `;

  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('backdrop shader:', gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  };

  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) {
    host.classList.add('is-flat');
    return;
  }

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    host.classList.add('is-flat');
    return;
  }
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(program, 'uRes');
  const uTime = gl.getUniformLocation(program, 'uTime');
  const uStep = gl.getUniformLocation(program, 'uStep');
  const uScale = gl.getUniformLocation(program, 'uScale');

  gl.uniform1f(uStep, 9.0);

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = host.clientWidth || window.innerWidth;
    const h = host.clientHeight || window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, w, h);
    gl.uniform1f(uScale, dpr);
  };

  const frozen = typeof window.HALFTONE_TIME === 'number' ? window.HALFTONE_TIME : null;

  /* the clock counts visible time only and is kept in sessionStorage, so
     coming back to the tab (or reloading it) carries on from the same spot
     instead of snapping the pattern back to where it started */
  const CLOCK_KEY = 'servyy:halftone-clock';

  const readClock = () => {
    try {
      const value = parseFloat(sessionStorage.getItem(CLOCK_KEY));
      return Number.isFinite(value) ? value : 0;
    } catch (err) {
      return 0;
    }
  };

  const saveClock = (value) => {
    try {
      sessionStorage.setItem(CLOCK_KEY, value.toFixed(2));
    } catch (err) {
      /* storage blocked: the clock simply restarts on the next visit */
    }
  };

  let elapsed = frozen === null ? readClock() : 0;
  let saved = elapsed;
  let last = 0;
  let raf = 0;

  const frame = (stamp) => {
    const now = typeof stamp === 'number' ? stamp : performance.now();
    if (last) elapsed += (now - last) / 1000;
    last = now;

    gl.uniform1f(uTime, frozen === null ? elapsed : frozen);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    if (frozen === null) {
      if (elapsed - saved > 2) {
        saved = elapsed;
        saveClock(elapsed);
      }
      raf = requestAnimationFrame(frame);
    }
  };

  const start = () => {
    if (raf || frozen !== null) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    last = 0;
    if (frozen === null) {
      saved = elapsed;
      saveClock(elapsed);
    }
  };

  resize();
  frame();

  let resizeTimer = 0;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      if (frozen !== null) frame();
    }, 120);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });
  addEventListener('pagehide', stop);
  /* back/forward cache restores a page without a visibility change */
  addEventListener('pageshow', start);
})();
