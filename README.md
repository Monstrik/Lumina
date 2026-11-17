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
| **Gentle Chime** | Soft sine-wave tone (A5→E6) when card auto-advances — only plays when ambient audio is **off** |
| **Seamless Crossfade** | Dual-layer background swap — no flashes, no blank frames |
| **Ambient Soundscape** | Looped audio track (ambient.mp4) with HTML5 Audio — toggle on/off |
| **Keyboard Shortcuts** | `Space` / `→` next card · `T` timer menu · `M` toggle audio |
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
| `M` | Toggle ambient audio |
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
- **Web Audio API** — programmatic notification chime (sine oscillator)
- **HTML5 Audio** — ambient track playback
- **Python `http.server` / Node `serve`** — zero-config static hosting

---

## 🌐 GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Enable GitHub Pages

1. Go to **Settings → Pages** in your repository
2. Under **Build and deployment**, select **GitHub Actions** as the source
3. Push to `main` branch — the workflow will deploy automatically

### Live URL

Once deployed, your site will be available at:
- **User/Organization site:** `https://<username>.github.io`
- **Project site:** `https://<username>.github.io/positive-affirmations/`

The workflow (`.github/workflows/deploy-pages.yml`) runs on every push to `main` and deploys the entire repository root as a static site.

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
    └── ambient.mp4     # Ambient audio track (looped via HTML5 Audio)
```

---

## 🎨 Customization

### Add Your Own Cards
Drop `.png`/`.jpg` files into `images/` and add their filenames to the `images` array in `app.js:16`.

### Adjust Audio
The notification chime is defined in `app.js:281` — modify the oscillator frequencies, gain, or waveform type to change the chime. The ambient track is `audio/ambient.mp4` — replace it with your own audio file to change the background sound.

### Change Default Timer
Edit `timerIntervalSeconds` in `app.js:98` to set a different default interval on first load.

---

## 📄 License

This project is a personal/educational clone of [Stofinity Positive Affirmations](https://stofinity.shop/pages/positive-affirmations). All artwork and affirmation text remain the intellectual property of Stofinity. This code is shared for learning and personal use only — not for commercial distribution.

---

## 🙏 Acknowledgments

- **Stofinity** — for the original artwork, affirmations, and design inspiration
- **Averia Serif Libre** — the warm, humanist typeface (via Google Fonts)