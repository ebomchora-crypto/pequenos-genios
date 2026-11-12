"""Trilha instrumental original (120 BPM, Dó maior) e efeitos sonoros, sintetizados do zero."""
import numpy as np, wave
SR = 48000
rng = np.random.default_rng(7)

def save(name, x):
    x = np.asarray(x, dtype=np.float64)
    if x.ndim == 1: x = np.stack([x, x], 1)
    peak = np.max(np.abs(x)) or 1
    x = x / peak * 0.89
    with wave.open(name, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())

def onepole_lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.zeros_like(x); s = 0.0
    for i, v in enumerate(x): s = (1 - a) * v + a * s; y[i] = s
    return y

def note(f): return 440 * 2 ** ((f - 69) / 12)

DUR, BPM = 30.0, 120
BEAT = 60 / BPM; BAR = 4 * BEAT
N = int(DUR * SR); t_all = np.arange(N) / SR
L = np.zeros(N); R = np.zeros(N)

def add(sig, start, gain=1.0, pan=0.0):
    i = int(start * SR); j = min(N, i + len(sig))
    if i >= N: return
    s = sig[: j - i] * gain
    L[i:j] += s * (1 - max(pan, 0)); R[i:j] += s * (1 + min(pan, 0))

# Progressão: C - G - Am - F (MIDI)
chords = [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]]
roots = [48, 43, 45, 41]

# Pad
for b in range(int(DUR / BAR) + 1):
    ch = chords[b % 4]; start = b * BAR
    d = BAR + 0.6; t = np.arange(int(d * SR)) / SR
    env = np.minimum(1, t / 0.5) * np.exp(-np.maximum(0, t - BAR) * 4)
    bright = 0.18 if start < 6 else 0.35
    for m in ch + [ch[0] + 12]:
        f = note(m)
        for det, pan in ((0.6, -0.5), (-0.6, 0.5)):
            s = np.sin(2*np.pi*(f+det)*t) + bright*np.sin(2*np.pi*2*(f+det)*t) + 0.1*bright*np.sin(2*np.pi*3*(f+det)*t)
            add(s * env, start, 0.035, pan)

# Pluck arpejo
def pluck(f, d=0.5):
    t = np.arange(int(d * SR)) / SR
    return (np.sin(2*np.pi*f*t) + 0.5*np.sin(2*np.pi*2*f*t) + 0.25*np.sin(2*np.pi*3*f*t)) * np.exp(-t * 7) * np.minimum(1, t / 0.004)
pattern = [0, 1, 2, 1, 2, 3, 2, 1]
for b in range(int(DUR / BAR) + 1):
    ch = chords[b % 4] + [chords[b % 4][0] + 12]
    for k in range(8):
        tt = b * BAR + k * BEAT / 2
        if tt >= 29.0: break
        if tt < 6 and k % 2: continue
        g = 0.10 if tt < 6 else 0.14
        add(pluck(note(ch[pattern[k]] + 12)), tt, g, 0.25 if k % 2 else -0.25)

# Baixo
for b in range(int(DUR / BAR) + 1):
    if b * BAR < 6 or b * BAR >= 29: continue
    for k in (0, 2.5):
        t = np.arange(int(0.5 * SR)) / SR; f = note(roots[b % 4])
        add((np.sin(2*np.pi*f*t) + 0.3*np.sin(2*np.pi*2*f*t)) * np.exp(-t * 5), b * BAR + k * BEAT, 0.22)

# Kick, shaker e palmas
def kick():
    t = np.arange(int(0.35 * SR)) / SR
    f = 45 + 90 * np.exp(-t * 30)
    return np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t * 9)
def shaker():
    t = np.arange(int(0.08 * SR)) / SR
    n = rng.standard_normal(len(t)); n = n - onepole_lp(n, 5000)
    return n * np.exp(-t * 60)
def clap():
    t = np.arange(int(0.2 * SR)) / SR
    n = rng.standard_normal(len(t)); n = onepole_lp(n - onepole_lp(n, 900), 4000)
    return n * np.exp(-t * 22)
beat = 0
while beat * BEAT < 29.0:
    tt = beat * BEAT
    if tt >= 6.0:
        add(kick(), tt, 0.32)
        add(shaker(), tt + BEAT / 2, 0.05, 0.3)
        if tt >= 12.5 and beat % 2 == 1: add(clap(), tt, 0.10, -0.1)
    beat += 1

# Riser antes do CTA (20,5 s -> 22 s)
d = 1.5; t = np.arange(int(d * SR)) / SR
n = rng.standard_normal(len(t)); n = n - onepole_lp(n, 1500)
add(n * (t / d) ** 2 * 0.12, 20.5)

# Final: acorde de Dó sustentado
t = np.arange(int(1.4 * SR)) / SR
for m in (60, 64, 67, 72):
    add(pluck(note(m + 12), 1.4) * 0.8 + np.sin(2*np.pi*note(m)*t) * np.exp(-t * 2.5) * 0.3, 28.0, 0.10)

fade = np.ones(N); fi = int(29.3 * SR); fade[fi:] = np.linspace(1, 0, N - fi)
save("trilha.wav", np.stack([L * fade, R * fade], 1))

# --- Efeitos ---
def whoosh(d=0.55):
    t = np.arange(int(d * SR)) / SR
    n = rng.standard_normal(len(t)); out = np.zeros_like(n); s = 0.0
    fc = 400 + 5000 * np.sin(np.pi * t / d) ** 2
    for i, v in enumerate(n):
        a = np.exp(-2 * np.pi * fc[i] / SR); s = (1 - a) * v + a * s; out[i] = s
    env = np.sin(np.pi * t / d) ** 1.5
    pan = np.linspace(-0.6, 0.6, len(t))
    return np.stack([out * env * (1 - pan.clip(0)), out * env * (1 + pan.clip(max=0))], 1)
save("whoosh.wav", whoosh())

t = np.arange(int(0.12 * SR)) / SR
save("pop.wav", np.sin(2*np.pi*(1400 - 5000*t)*t) * np.exp(-t * 40))

t = np.arange(int(1.2 * SR)) / SR
boom = np.sin(2*np.pi*np.cumsum(60 + 80*np.exp(-t*20))/SR) * np.exp(-t * 4)
sh = rng.standard_normal(len(t)); sh = onepole_lp(sh, 2500) * np.exp(-t * 6)
sparkle = sum(np.sin(2*np.pi*f*t) * np.exp(-t * 5) for f in (1567.98, 2093.0, 2637.0)) * 0.15
save("impacto.wav", boom * 0.9 + sh * 0.3 + sparkle)

t = np.arange(int(0.05 * SR)) / SR
save("clique.wav", np.sin(2*np.pi*2500*t) * np.exp(-t * 120))
print("ok")
