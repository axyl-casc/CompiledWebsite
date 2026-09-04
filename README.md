# Compiled Website

Static website for **Compiled**, the Android board game where players place instruction cards into a shared program loop and race to satisfy private objectives.

## What The Site Covers

- The actual Android app premise: one shared CPU, one circular memory board, private hands, and private objectives.
- Current game modes: singleplayer, pass and play, tutorial, card dictionary, and settings.
- Honest status for online multiplayer: planned, not active in the current app.
- Accurate implementation details from the Android repo, including `com.compiled.game`, version `1.0.0`, Expo / React Native, portrait orientation, 12/16/20-slot boards, five-card hands, and the signed 4-bit register range.
- A concise privacy policy that avoids unsupported claims about analytics, ads, cloud sync, persistent statistics, or Google Play services beyond ordinary Play Store distribution.

## Files

```text
CompiledWebsite/
├── img/
│   ├── logo_with_text.png
│   ├── main_menu.png
│   ├── play_tab_1.png
│   ├── play_tab_2.png
│   ├── play_tab_3.png
│   └── tutorial_section.png
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
