# Lumina

**Lumina** is a lightweight, offline-first web app for daily affirmation practice. It's a faithful recreation of the Stofinity Positive Affirmations experience — hand-illustrated cards, ambient sound, and a flexible auto-advance timer — packaged as a single folder you can run anywhere.

No build step, no dependencies, no account required. Just open and breathe.

---

## Why Lumina?

Most affirmation apps are cluttered with tracking, streaks, subscriptions, or network calls. Lumina strips all that away:

- **Zero tracking** — no analytics, no accounts, no data leaves your machine
- **Works offline** — all 59 illustrations (34 MB) and audio bundled locally
- **Respects your attention** — no notifications, badges, or gamification
- **Runs anywhere** — static HTML/JS/CSS, served by Python or Node in one command

---

## ✨ Features

| Feature | Details |
|---------|---------|
| **59 Illustrated Cards** | Full Stofinity catalog — hand-drawn artwork with affirmations embedded in each image |
| **Auto-Advance Timer** | 12 intervals from 1 second to 24 hours, plus "Off" for manual mode |
| **Live Countdown** | Floating pill with progress bar — always visible, never intrusive |
| **Gentle Chime** | Soft volume-dip notification when the card rotates (only when audio is on) |
| **Seamless Crossfade** | Dual-layer background swap — no flashes, no blank frames |
| **Ambient Soundscape** | Built-in F major 7th pad synth via Web Audio API — no external audio files needed |
| **Keyboard Shortcuts** | `Space` / `→` next card · `T` timer menu · `M` mute audio |
| **One-Command Launch** | `./start.sh` finds a free port, starts server, opens browser |

---


## 🚀 Quick Start

```bash
# Clone or download this folder
cd positive-affirmations

# Make the launcher executable (once)
chmod +x start.sh

# Run it
./start.sh
```

That's it. The script:
1. Finds an available port (starts at 8000, auto-increments)
2. Starts a local HTTP server (Python 3 or Node.js)
3. Opens your default browser to `http://localhost:PORT`
4. Press `Ctrl+C` to stop

**Requirements:** Python 3 *or* Node.js (npx). No installation needed beyond that.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` or `→` | Next affirmation |
| `T` | Open/close timer interval menu |
| `M` | Toggle ambient audio on/off |
| `Esc` | Close timer menu (if open) |

---

## 🎛️ Timer Intervals

| Interval | Label | Best For |
|----------|-------|----------|
| 1–15 sec | Instant / Quick peek / Brisk / Slideshow | Rapid review, presentation mode |
| 30 sec – 1 min | Breathe / Steady | Box breathing, micro-pauses |
| 5–15 min | Focus pace / Balanced / Mindful | Work sessions, meditation |
| 30 min – 1 hr | Relaxed / Hourly | Deep work, background ambiance |
| 3–12 hr | Long session / Work session / Half day | All-day ambient presence |
| 24 hr | Daily | Morning/evening ritual anchor |
| Off | Manual only | Intentional, self-paced practice |

---

## 🛠️ Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, fluid typography, `prefers-reduced-motion` support
- **Vanilla ES6+ JS** — no frameworks, ~300 lines
- **Web Audio API** — programmatic ambient synthesis (zero audio assets)
- **Python `http.server` / Node `serve`** — zero-config static hosting

---

## 📁 Project Structure

```
positive-affirmations/
├── index.html          # App shell
├── app.js              # All logic (~300 lines)
├── style.css           # All styles
├── start.sh            # One-command launcher
├── .gitignore
├── images/             # 59 affirmation cards + logo (34 MB)
│   ├── 01.png – 50.png
│   ├── jesus_*.jpg/png
│   ├── grim_reaper_*.jpg/png
│   ├── bat_*.jpg/png
│   └── boo_*.jpg/png
└── audio/
    └── ambient.mp4     # Fallback audio (unused; synth preferred)
```

---

## 🎨 Customization

### Add Your Own Cards
Drop `.png`/`.jpg` files into `images/` and add their filenames to the `images` array in `app.js:16`.

### Adjust Audio
The ambient synth is defined in `app.js` — modify the oscillator frequencies, gain, or waveform type to change the mood.

### Change Default Timer
Edit `timerIntervalSeconds` in `app.js:98` to set a different default interval on first load.

---

## 📄 License

This project is a personal/educational clone of [Stofinity Positive Affirmations](https://stofinity.shop/pages/positive-affirmations). All artwork and affirmation text remain the intellectual property of Stofinity. This code is shared for learning and personal use only — not for commercial distribution.

---

## 🙏 Acknowledgments

- **Stofinity** — for the original artwork, affirmations, and design inspiration
- **Averia Serif Libre** — the warm, humanist typeface (via Google Fonts)
- **Web Audio API** — making zero-asset ambient sound possible