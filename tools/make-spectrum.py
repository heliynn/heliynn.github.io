#!/usr/bin/env python
"""Measure the music the pill plays, so the bars can show it.

The player cannot read the spectrum live without routing the audio through
WebAudio, and that route silently swallows the sound in some browsers. So the
spectrum is measured once, here, out of the mp3, and shipped as a small file
the page reads as the track plays.

    python tools/make-spectrum.py [song.mp3] [out.json]

Defaults to assets/music.mp3 and assets/music-spectrum.json. Needs ffmpeg on
PATH. Run it again whenever the song changes: the page refuses to draw bars
from data that does not match the length of the audio.
"""

import base64
import json
import math
import struct
import subprocess
import sys

SR = 11025        # plenty for 24 bands up to 5 kHz, and small enough to decode fast
N = 512           # fft window
HOP = 1103        # 0.1 s at 11025 Hz: one frame per tenth of a second
BANDS = 24
LOW, HIGH = 40.0, 5000.0


def fft(a):
    """In-place radix-2 FFT. Small enough to keep here rather than pull in numpy."""
    n = len(a)
    j = 0
    for i in range(1, n):
        bit = n >> 1
        while j & bit:
            j ^= bit
            bit >>= 1
        j |= bit
        if i < j:
            a[i], a[j] = a[j], a[i]

    size = 2
    while size <= n:
        half = size >> 1
        angle = -2 * math.pi / size
        w = complex(math.cos(angle), math.sin(angle))
        for start in range(0, n, size):
            wk = 1 + 0j
            for k in range(start, start + half):
                u = a[k]
                v = a[k + half] * wk
                a[k] = u + v
                a[k + half] = u - v
                wk *= w
        size <<= 1


def main():
    source = sys.argv[1] if len(sys.argv) > 1 else 'assets/music.mp3'
    target = sys.argv[2] if len(sys.argv) > 2 else 'assets/music-spectrum.json'

    pcm = subprocess.run(
        ['ffmpeg', '-v', 'error', '-i', source, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'],
        capture_output=True
    )
    if pcm.returncode != 0:
        print(pcm.stderr.decode()[:500])
        raise SystemExit('ffmpeg could not read ' + source)

    samples = struct.unpack('<%dh' % (len(pcm.stdout) // 2), pcm.stdout)
    window = [0.5 - 0.5 * math.cos(2 * math.pi * i / (N - 1)) for i in range(N)]

    edges = [LOW * (HIGH / LOW) ** (i / BANDS) for i in range(BANDS + 1)]
    bands = []
    for i in range(BANDS):
        low = max(1, int(round(edges[i] * N / SR)))
        high = max(low + 1, int(round(edges[i + 1] * N / SR)))
        bands.append((low, min(high, N // 2)))

    rows = []
    position = 0
    while position + N <= len(samples):
        buffer = [complex(samples[position + i] * window[i], 0) for i in range(N)]
        fft(buffer)
        row = []
        for i, (low, high) in enumerate(bands):
            total = sum(abs(buffer[k]) for k in range(low, high))
            # decibels, plus a tilt so the naturally quiet top still registers
            row.append(20 * math.log10(total / (high - low) + 1e-9) + (i / (BANDS - 1)) * 15)
        rows.append(row)
        position += HOP

    # stretch the range the music actually occupies, so the bars use the height
    flat = sorted(value for row in rows for value in row)
    low = flat[int(len(flat) * .04)]
    high = flat[int(len(flat) * .985)]

    out = bytearray()
    for row in rows:
        for value in row:
            out.append(max(0, min(255, int(round((value - low) / (high - low) * 255)))))

    data = {
        'fps': round(SR / HOP, 3),
        'bands': BANDS,
        'lowHz': LOW,
        'highHz': HIGH,
        'data': base64.b64encode(bytes(out)).decode('ascii')
    }
    with open(target, 'w') as handle:
        handle.write(json.dumps(data, separators=(',', ':')))

    seconds = len(rows) / (SR / HOP)
    print('%s: %d frames, %.1f s, %d bands, %d bytes' % (target, len(rows), seconds, BANDS, len(out)))
    print('the page expects the audio to be about %.1f seconds long' % seconds)


if __name__ == '__main__':
    main()
