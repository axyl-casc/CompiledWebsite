# Compiled Website

Static website for **Compiled**, the Android board game where players place instruction cards into a shared program loop and race to satisfy private objectives.

## What The Site Covers

- The actual Android app premise: one shared CPU, one circular memory board, private hands, and private objectives.
- Current game modes: singleplayer, pass and play, tutorial, card dictionary, and settings. The Android app is currently distributed through Google Play closed testing.
- Accurate implementation details from the Android repo, including `com.compiled.game`, version `1.0.2`, Expo / React Native, portrait orientation, 8/12/16-slot boards, six-card hands, three card tiers, 31 instructions, 20 tutorial lessons, signed/unsigned 4-bit execution, and the current XCHG naming.
- A concise privacy policy that avoids unsupported claims about analytics, ads, cloud sync, persistent statistics, or Google Play services beyond ordinary Play Store distribution.

## Files

```text
CompiledWebsite/
├── img/
│   ├── logo_with_text.png
│   ├── main_menu.jpeg
│   ├── play_tab_1.jpeg
│   ├── play_tab_2.jpeg
│   ├── tutorial_section.jpeg
│   ├── dictionary.jpeg
│   └── passnplay.jpeg
├── index.html
├── privacy.html
├── privacy/
│   └── index.html
├── site.js
├── style.css
└── README.md
```

## Local Preview

The site is plain HTML, CSS, and JavaScript. Open `index.html` directly in a browser, or serve the folder with any small static server.

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Deployment

This repository can be published from its root with GitHub Pages or any static host. No build step is required.
