# Compiled — Official Website

Official product website and landing page for **Compiled**, the competitive assembly-language tabletop strategy game for Android.

Visit the live site or host it on GitHub Pages.

---

## About Compiled

Compiled is a competitive tabletop strategy game inspired by the Motorola 68000 assembly architecture and low-level computer hardware. 2–4 players compete over a single shared CPU, deploying command tiles (`MOVE`, `ADD`, `SUB`, `INC`, `DEC`, `NEG`, `CLR`, `SWAP`, `BRA`) around a 20-slot cyclic memory track to manipulate shared registers (`R0`–`R3`) and trigger secret win conditions.

The game is distributed as a native **Android application** on Google Play.

---

## Repository Structure

```
CompiledWebsite/
├── index.html         # Main landing page (hero, features, screenshots, how to play, download)
├── style.css          # Responsive styling with dark retro-computing & cyberpunk aesthetics
├── site.js            # Lightweight navigation, mobile menu, and interactive hero mockup
├── privacy.html       # Official Privacy Policy for Google Play Store listing compliance
├── privacy/
│   └── index.html     # Clean '/privacy' URL support for static web servers
└── README.md          # Project documentation
```

---

## Key Website Features

* **Android Showcase**: Designed specifically as a landing and download portal for the Android app.
* **Interactive Micro-Preview**: Hero section features an interactive Android phone mockup simulating live register shifts (`R0`–`R3`).
* **Game Mechanics & Opcode Matrix**: Explains core rules, cyclic memory execution, branch cascades, and 68k assembly opcodes.
* **Google Play Privacy Policy**: Dedicated `/privacy` page fulfilling all Google Play Store Developer Policy requirements (local storage vs network usage, children's privacy, data retention, contact information).
* **Zero Dependencies**: Pure HTML5, modern CSS3, and ES6 JavaScript. No build step, bundler, or runtime node dependencies required.
* **Fully Responsive & Accessible**: Meets WCAG standards with semantic landmarks, keyboard navigation, high contrast ratios, and reduced-motion support.

---

## Local Development & Preview

Because this project is built entirely with vanilla static web technologies, you can preview it immediately using any local web server or by opening `index.html` directly in your browser:

### Option 1: Python HTTP Server
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000/` in your browser.

### Option 2: Node.js `serve` / `npx`
```bash
npx serve .
```

---

## Customization & Store Publication Checklist

1. **Google Play Link**:
   Search for `https://play.google.com/store/apps/details?id=com.axylcasc.compiled` in `index.html` and replace it with your app's live package ID or published URL.

2. **Real Gameplay Screenshots**:
   In `index.html`, under the `#screenshots` section, locate the screenshot cards. You can replace the styled SVG/CSS mockup graphics with actual high-resolution screenshots from your Android device:
   ```html
   <img src="screenshots/screen1_board.png" alt="Compiled Android Board View" class="screenshot-placeholder-image">
   ```

3. **Privacy Policy Developer Contact & SDK Verification**:
   In `privacy.html` and `privacy/index.html`:
   - Confirm whether your Android APK bundles any diagnostic or analytics SDKs (e.g. Firebase Crashlytics).
   - Review and update the developer support email address.

---

## Deployment to GitHub Pages

1. Go to repository **Settings** &gt; **Pages**.
2. Under **Build and deployment** &gt; **Branch**, select `main` and root `/`.
3. Save changes. GitHub Pages will deploy the site at `https://<username>.github.io/<repo>/`.
   Both the root URL and `/privacy` will resolve automatically.

---

## License & Copyright

&copy; 2026 Compiled. All rights reserved.