"""Procedural background score + SFX for the Footprint video (royalty-free, generated from scratch).

114.47 BPM, vi-IV-I-V (Am F C G) progression, sidechained supersaw pad, sub bass, 16th pluck
arpeggio, risers / impacts / whooshes placed on the exact animation cues (src/sfxCues.json),
and the music bus ducked under the voice-over (scripts/vo_chunks.json).

Outputs public/music_sfx.wav (48 kHz stereo, 24-bit).
"""
import json
from pathlib import Path

import numpy as np
import pyloudnorm as pyln
import scipy.signal as sg
import soundfile as sf

ROOT = Path(__file__).resolve().parent.parent
SR = 48000
DUR = 42.5
N = int(SR * DUR)
BAR = 2.0967
BEAT = BAR / 4
G0 = 0.0899
rng = np.random.default_rng(11)

CUES = json.loads((ROOT / "src" / "sfxCues.json").read_text())
VO = json.loads((ROOT / "scripts" / "vo_chunks.json").read_text())


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def tt(n):
    return np.arange(n) / SR


def place(buf, x, t0, gain=1.0):
    i = int(round(t0 * SR))
    if i < 0:
        x = x[-i:]
        i = 0
    n = min(len(x), len(buf) - i)
    if n <= 0:
        return
    if x.ndim == 1:
        buf[i:i + n] += gain * x[:n, None]
    else:
        buf[i:i + n] += gain * x[:n]


def pan(x, p):
    a = (p + 1) * np.pi / 4
    return np.stack([x * np.cos(a), x * np.sin(a)], 1) * np.sqrt(2)


def saw(freq, n, ph0=0.0):
    dt = freq / SR
    ph = (ph0 + dt * np.arange(n)) % 1.0
    y = 2 * ph - 1
    m = ph < dt
    x = ph[m] / dt
    y[m] -= x + x - x * x - 1
    m = ph > 1 - dt
    x = (ph[m] - 1) / dt
    y[m] -= x * x + x + x + 1
    return y


def biquad_lp(f, q=0.707):
    w = 2 * np.pi * f / SR
    al = np.sin(w) / (2 * q)
    cw = np.cos(w)
    b = np.array([(1 - cw) / 2, 1 - cw, (1 - cw) / 2])
    a = np.array([1 + al, -2 * cw, 1 - al])
    return b / a[0], a / a[0]


def tv_lowpass(x, cutoff, q=0.8, block=256):
    """Time-varying lowpass; cutoff is an array (per-sample) or callable of time."""
    out = np.zeros_like(x)
    zi = np.zeros((2,) + x.shape[1:])
    for i in range(0, len(x), block):
        c = float(np.clip(cutoff[min(i, len(cutoff) - 1)], 40, 20000))
        b, a = biquad_lp(c, q)
        seg = x[i:i + block]
        if x.ndim == 1:
            y, zi = sg.lfilter(b, a, seg, zi=zi)
        else:
            y, zi = sg.lfilter(b, a, seg, axis=0, zi=zi)
        out[i:i + block] = y
    return out


def bandpass(x, lo, hi, order=2):
    sos = sg.butter(order, [lo, hi], btype="band", fs=SR, output="sos")
    return sg.sosfilt(sos, x, axis=0)


def highpass(x, f, order=2):
    sos = sg.butter(order, f, btype="high", fs=SR, output="sos")
    return sg.sosfilt(sos, x, axis=0)


def lowpass(x, f, order=2):
    sos = sg.butter(order, f, btype="low", fs=SR, output="sos")
    return sg.sosfilt(sos, x, axis=0)


def make_ir(seconds=2.2, decay=0.55, bright=7000):
    n = int(seconds * SR)
    t = tt(n)
    env = np.exp(-t / decay)
    ir = np.stack([rng.standard_normal(n), rng.standard_normal(n)], 1) * env[:, None]
    ir = lowpass(ir, bright)
    ir[: int(0.012 * SR)] *= np.linspace(0, 1, int(0.012 * SR))[:, None]
    return ir / np.sqrt((ir ** 2).sum(0)).max()


IR = make_ir()


def reverb(x, wet=0.3):
    if x.ndim == 1:
        x = np.stack([x, x], 1)
    y = np.stack([sg.fftconvolve(x[:, 0], IR[:, 0])[: len(x)], sg.fftconvolve(x[:, 1], IR[:, 1])[: len(x)]], 1)
    return y * wet


# ---------------------------------------------------------------- arrangement
BARS = 21  # bar 20 = final stab at 42.02s
CHORDS = [  # (pad voicing, bass root)
    ([57, 60, 64, 69], 45),  # Am
    ([57, 60, 65, 69], 41),  # F
    ([55, 60, 64, 67], 48),  # C
    ([55, 59, 62, 67], 43),  # G
]
BREAK_START, DROP = 35.0, 37.83


def bar_t(k):
    return G0 + k * BAR


def section(t):
    if t < bar_t(2):
        return "intro"
    if t < bar_t(6):
        return "a"
    if t < bar_t(12):
        return "b"
    if t < BREAK_START:
        return "c"
    if t < DROP:
        return "break"
    return "drop"


# ---------------------------------------------------------------- drums
def kick():
    n = int(0.5 * SR)
    t = tt(n)
    f = 46 + 110 * np.exp(-t / 0.032)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.3)
    click = highpass(rng.standard_normal(n), 2500) * np.exp(-t / 0.004) * 0.35
    return np.tanh(1.6 * (y + click))


def clap():
    n = int(0.6 * SR)
    t = tt(n)
    noise = bandpass(rng.standard_normal(n), 900, 4200)
    env = np.zeros(n)
    for d in (0.0, 0.011, 0.022):
        i = int(d * SR)
        env[i:] += np.exp(-(t[: n - i]) / (0.01 if d < 0.02 else 0.11))
    return noise * env * 0.55


def hat(open_=False):
    n = int((0.25 if open_ else 0.07) * SR)
    t = tt(n)
    y = highpass(rng.standard_normal(n), 7500, 4) * np.exp(-t / (0.09 if open_ else 0.018))
    return y * 0.35


K, CL, HC, HO = kick(), clap(), hat(), hat(True)

drums = np.zeros((N, 2))
kick_times = []
for k in range(BARS - 1):
    for b in range(4):
        t0 = bar_t(k) + b * BEAT
        s = section(t0)
        if s == "break":
            continue
        if s == "intro" and b % 2 == 1:
            pass
        kick_times.append(t0)
        place(drums, pan(K, 0), t0, 0.9 if s != "intro" else 0.7)
        if s != "intro" and b in (1, 3):
            place(drums, pan(CL, 0.05), t0, 0.55)
        # hats
        if s in ("a", "b", "c", "drop", "intro"):
            place(drums, pan(HC, 0.3), t0 + BEAT / 2, 0.55 if s != "intro" else 0.3)
        if s in ("c", "drop"):
            place(drums, pan(HC, -0.3), t0 + BEAT / 4, 0.25)
            place(drums, pan(HC, -0.3), t0 + 3 * BEAT / 4, 0.25)
        if s in ("b", "c", "drop") and b == 3:
            place(drums, pan(HO, 0.2), t0 + BEAT / 2, 0.3)
# snare roll building into the drop
roll_t = BREAK_START + 0.6
while roll_t < DROP - 0.02:
    prog = (roll_t - BREAK_START) / (DROP - BREAK_START)
    place(drums, pan(CL, 0), roll_t, 0.12 + 0.35 * prog)
    roll_t += BEAT / (2 if prog < 0.45 else 4 if prog < 0.8 else 8)
kick_times.append(bar_t(20))
place(drums, pan(K, 0), bar_t(20), 0.9)

# sidechain envelope
side = np.ones(N)
L = int(0.26 * SR)
shape = 1 - 0.62 * (1 - np.linspace(0, 1, L)) ** 2
for kt in kick_times:
    i = int(kt * SR)
    n = min(L, N - i)
    side[i:i + n] = np.minimum(side[i:i + n], shape[:n])

# ---------------------------------------------------------------- pad (supersaw)
pad = np.zeros((N, 2))
for k in range(BARS):
    notes, _ = CHORDS[k % 4]
    t0 = bar_t(k)
    length = BAR + 0.12 if k < BARS - 1 else DUR - t0
    n = int(length * SR)
    t = tt(n)
    env = np.minimum(1, t / 0.04) * np.minimum(1, (length - t) / 0.12)
    voice = np.zeros((n, 2))
    for m in notes:
        for v, det in enumerate((-0.16, -0.08, 0.0, 0.08, 0.16)):
            f = mtof(m + det)
            y = saw(f, n, rng.random())
            voice += pan(y, (-0.7 + 0.35 * v)) * 0.05
    place(pad, voice * env[:, None], t0)

pad_cut = np.zeros(N)
times = tt(N)
for i, tv in enumerate(times[::256]):
    s = section(tv)
    c = {"intro": 700 + 900 * tv / bar_t(2), "a": 1800, "b": 3200, "c": 4200, "break": 2600, "drop": 5200}[s]
    if s == "break":
        c = 900 + 3800 * ((tv - BREAK_START) / (DROP - BREAK_START)) ** 2
    pad_cut[i * 256:(i + 1) * 256] = c
pad = tv_lowpass(pad, pad_cut, q=0.9)
pad *= np.where((times >= BREAK_START) & (times < DROP), 1.0, side)[:, None]

# ---------------------------------------------------------------- bass
bass = np.zeros((N, 2))
for k in range(BARS - 1):
    _, root = CHORDS[k % 4]
    for b in range(4):
        t0 = bar_t(k) + b * BEAT + BEAT / 2
        s = section(t0)
        if s in ("intro", "break"):
            continue
        n = int(BEAT * 0.48 * SR)
        t = tt(n)
        f = mtof(root - 12)
        sub = np.sin(2 * np.pi * f * t)
        grit = lowpass(saw(f * 2, n), 650)
        env = np.minimum(1, t / 0.006) * np.exp(-t / 0.22) * np.minimum(1, (n / SR - t) / 0.02)
        place(bass, pan((0.9 * sub + 0.35 * grit) * env, 0), t0, 0.55)

# ---------------------------------------------------------------- pluck arp (16ths)
pluck = np.zeros((N, 2))
pattern = [0, 2, 1, 3, 2, 1, 3, 2]
for k in range(BARS - 1):
    notes, _ = CHORDS[k % 4]
    for st in range(16):
        t0 = bar_t(k) + st * BEAT / 4
        s = section(t0)
        if s in ("intro", "a"):
            continue
        idx = pattern[st % 8]
        m = notes[idx] + 12 + (12 if (s in ("c", "drop") and st % 4 == 3) else 0)
        n = int(0.22 * SR)
        t = tt(n)
        f = mtof(m)
        y = 0.6 * saw(f, n) + 0.4 * np.sign(np.sin(2 * np.pi * f * t))
        y = lowpass(y, 2800 if s != "break" else 1400) * np.exp(-t / 0.075)
        g = 0.16 if s != "break" else 0.08 * (1 + (t0 - BREAK_START))
        place(pluck, pan(y, 0.35 if st % 2 else -0.35), t0, g)
# ping-pong delay (3/16)
d = int(3 * BEAT / 4 * SR)
dl = np.zeros_like(pluck)
for rep in range(1, 4):
    g = 0.38 ** rep
    sh = d * rep
    src = pluck[:-sh]
    if rep % 2:
        dl[sh:, 0] += src[:, 1] * g
        dl[sh:, 1] += src[:, 0] * g
    else:
        dl[sh:] += src * g
pluck = (pluck + dl) * side[:, None]

# ---------------------------------------------------------------- music bus
music = drums + pad + bass + pluck
music += reverb(0.6 * pad + 0.8 * pluck + 0.5 * drums * np.array([0.3, 0.3]), wet=0.22)

# tape-stop into the break ("توقّف عن التخمين")
ts0 = int((BREAK_START - 0.35) * SR)
ts1 = int(BREAK_START * SR)
seg = music[ts0:ts1].copy()
n = len(seg)
speed = np.linspace(1.0, 0.0, n) ** 1.3
pos = np.cumsum(speed)
pos = np.clip(pos, 0, n - 1)
stopped = np.stack([np.interp(pos, np.arange(n), seg[:, c]) for c in range(2)], 1)
stopped *= np.linspace(1, 0, n)[:, None] ** 0.5
music[ts0:ts1] = stopped
# break: everything but the pad/pluck/riser is already muted; keep a short gap after the stop
gap = int(0.12 * SR)
music[ts1:ts1 + gap] *= np.linspace(0, 1, gap)[:, None]

# ---------------------------------------------------------------- SFX
def whoosh(dur=0.55):
    n = int(dur * SR)
    t = tt(n)
    x = rng.standard_normal(n)
    env = np.sin(np.pi * t / dur) ** 2
    cut = 500 + 5500 * np.sin(np.pi * t / dur) ** 1.5
    y = tv_lowpass(highpass(x, 250), cut, q=1.4)
    p = np.linspace(-0.7, 0.7, n)
    a = (p + 1) * np.pi / 4
    return np.stack([y * env * np.cos(a), y * env * np.sin(a)], 1) * 0.9


def impact():
    n = int(2.2 * SR)
    t = tt(n)
    f = 38 + 50 * np.exp(-t / 0.08)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.7)
    crack = lowpass(rng.standard_normal(n), 3500) * np.exp(-t / 0.06) * 0.6
    y = np.tanh(1.4 * (boom + crack))
    return pan(y, 0) + reverb(y * 0.7, wet=0.5)


def hit():
    n = int(1.2 * SR)
    t = tt(n)
    f = 60 + 90 * np.exp(-t / 0.03)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.25)
    snap = bandpass(rng.standard_normal(n), 1200, 6000) * np.exp(-t / 0.035) * 0.5
    y = np.tanh(1.3 * (body + snap))
    return pan(y, 0) + reverb(y * 0.6, wet=0.45)


def pop(p=0.0):
    n = int(0.18 * SR)
    t = tt(n)
    f = 1100 * np.exp(-t / 0.05) + 500
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.045)
    return pan(y * 0.8, p) + reverb(y * 0.3, wet=0.35)


def tick(p=0.0):
    n = int(0.05 * SR)
    t = tt(n)
    y = bandpass(rng.standard_normal(n), 2500, 7000) * np.exp(-t / 0.006)
    y += np.sin(2 * np.pi * 2400 * t) * np.exp(-t / 0.01) * 0.4
    return pan(y * 0.9, p)


def ding():
    n = int(2.0 * SR)
    t = tt(n)
    y = sum(a * np.sin(2 * np.pi * f * t) * np.exp(-t / d) for f, a, d in
            ((1318.5, 1.0, 0.9), (2637, 0.35, 0.5), (3951, 0.18, 0.3), (1975.5, 0.25, 0.6)))
    y *= np.minimum(1, t / 0.002) * 0.4
    return pan(y, 0.1) + reverb(y, wet=0.5)


def shimmer():
    n = int(1.6 * SR)
    t = tt(n)
    y = np.zeros(n)
    for i, m in enumerate((81, 84, 88, 93, 96)):
        st = int(i * 0.045 * SR)
        tn = t[: n - st]
        y[st:] += np.sin(2 * np.pi * mtof(m) * tn) * np.exp(-tn / 0.35) * 0.18
    return pan(y, -0.2) + reverb(y, wet=0.6)


def glitch():
    n = int(0.35 * SR)
    t = tt(n)
    y = np.sign(np.sin(2 * np.pi * 180 * t)) * (np.floor(t * 40) % 2) * np.exp(-t / 0.12) * 0.25
    y += bandpass(rng.standard_normal(n), 2000, 9000) * np.exp(-t / 0.05) * 0.5
    return pan(y, 0) + whoosh(0.35) * 0.6


def swell():
    n = int(0.9 * SR)
    t = tt(n)
    f = 220 * 2 ** (t / 0.9 * 1.5)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * (t / 0.9) ** 2 * np.exp(-np.maximum(0, t - 0.8) / 0.05) * 0.25
    y += tv_lowpass(rng.standard_normal(n), 300 + 5000 * (t / 0.9) ** 2) * (t / 0.9) ** 2 * 0.25
    return pan(y, 0) + reverb(y, wet=0.4)


def open_fx():
    n = int(0.9 * SR)
    t = tt(n)
    y = tv_lowpass(rng.standard_normal(n), 400 + 7000 * (t / 0.9)) * np.sin(np.pi * t / 0.9) * 0.6
    y += np.sin(2 * np.pi * np.cumsum(300 + 900 * t / 0.9) / SR) * np.sin(np.pi * t / 0.9) * 0.15
    return pan(y, 0) + reverb(y, wet=0.4)


def tapestop():
    n = int(0.45 * SR)
    t = tt(n)
    f = 220 * (1 - t / 0.45) ** 1.5 + 30
    y = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * (1 - t / 0.45) * 0.12
    return pan(lowpass(y, 1800), 0)


def riser(t0, t1):
    n = int((t1 - t0) * SR)
    t = tt(n)
    p = t / (t1 - t0)
    y = tv_lowpass(highpass(rng.standard_normal(n), 200), 300 + 9000 * p ** 2.2, q=2.0) * p ** 2 * 0.5
    y += np.sin(2 * np.pi * np.cumsum(180 * 2 ** (p * 2.5)) / SR) * p ** 2.5 * 0.12
    return pan(y, 0)


sfx = np.zeros((N, 2))
GEN = {"whoosh": lambda c: whoosh(), "impact": lambda c: impact(), "hit": lambda c: hit(),
       "pop": lambda c: pop(c.get("pan", 0.0)), "tick": lambda c: tick(c.get("pan", 0.0)),
       "ding": lambda c: ding(), "shimmer": lambda c: shimmer(), "glitch": lambda c: glitch(),
       "swell": lambda c: swell(), "open": lambda c: open_fx(), "tapestop": lambda c: tapestop()}
for c in CUES["cues"]:
    x = GEN[c["type"]](c)
    # whooshes/swells peak at their end, so they lead into the cue
    lead = {"whoosh": 0.3, "swell": 0.8}.get(c["type"], 0.0)
    place(sfx, x, c["t"] - lead + (0.2 if c["type"] == "whoosh" else 0.0), c["gain"])
rt = CUES["rowTicks"]
for i in range(rt["count"]):
    place(sfx, tick(-0.5 + i / rt["count"]), rt["start"] + i * rt["step"], 0.35)
ut = CUES["urlTyping"]
for i, ch in enumerate(ut["chars"]):
    place(sfx, tick(0.2 * np.sin(i)), ut["start"] + i * ut["step"], 0.22 + 0.06 * rng.random())
place(sfx, riser(BREAK_START + 0.2, DROP), BREAK_START + 0.2, 0.8)

# ---------------------------------------------------------------- duck music under the voice
ctrl_sr = 1000
nc = int(DUR * ctrl_sr)
mask = np.zeros(nc)
for a, b in VO["speech"]:
    mask[int(a * ctrl_sr):int(b * ctrl_sr)] = 1
duck_db = -6.5
target = 10 ** (duck_db * mask / 20)
env = np.ones(nc)
g = 1.0
att = 1 - np.exp(-1 / (0.04 * ctrl_sr))
rel = 1 - np.exp(-1 / (0.28 * ctrl_sr))
for i in range(nc):
    tg = target[i]
    g += (tg - g) * (att if tg < g else rel)
    env[i] = g
duck = np.interp(times, np.arange(nc) / ctrl_sr, env)
music *= duck[:, None]

# ---------------------------------------------------------------- master
meter = pyln.Meter(SR)
music *= 10 ** ((-27.0 - meter.integrated_loudness(music)) / 20)  # bed sits well under a -16 LUFS voice
sfx_l = meter.integrated_loudness(sfx)
sfx *= 10 ** ((-25.0 - sfx_l) / 20)
mix = music + sfx
# end fade
fade = int(0.35 * SR)
mix[-fade:] *= np.linspace(1, 0, fade)[:, None] ** 2
mix = np.tanh(mix * 1.2) / 1.2
peak = np.abs(mix).max()
if peak > 0.89:
    mix *= 0.89 / peak
sf.write(ROOT / "public" / "music_sfx.wav", mix.astype(np.float32), SR, subtype="PCM_24")
print("music_sfx.wav", round(meter.integrated_loudness(mix), 2), "LUFS, peak", round(20 * np.log10(np.abs(mix).max()), 2), "dBFS")
