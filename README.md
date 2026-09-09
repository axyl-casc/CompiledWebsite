# Compiled Website

Informational website for **Compiled**, the Android strategy board game. Player-facing copy is based on the sibling `CompiledAndroid/README.md`.

## Content

- A plain-language introduction to the shared board and secret objectives.
- A three-step explanation of a turn: choose a card, run it, and check your objective.
- Singleplayer against one to three computer rivals, with Easy through Expert difficulty.
- Pass and play for two to four players on one device, with optional computer opponents.
- Three board sizes and Basic, Intermediate, and Advanced card sets.
- Twenty interactive lessons, the card dictionary, and player preferences.
- Six existing app screenshots with an accessible full-size viewer.
- The existing Google Play closed-test link, contact address, and privacy policy.

The homepage focuses on what players can do. Instruction syntax, CPU internals, development tools, and build details belong in the app documentation.

## Files

- `index.html`: game overview.
- `style.css`: responsive shared styles.
- `site.js`: screenshot viewer; image links also work without JavaScript.
- `img/`: original app screenshots and logo.
- `privacy.html` and `privacy/index.html`: equivalent privacy pages, with relative links for both URLs.

## Preview and deployment

Plain HTML, CSS, and JavaScript; no dependencies or build step. Open `index.html` directly, or serve this folder with a static HTTP server.

The repository can be published from its root using GitHub Pages or another static host. Keep both privacy URLs available when publishing.

When app features or availability change, update the homepage from the Android README and replace screenshots only with actual app captures.
