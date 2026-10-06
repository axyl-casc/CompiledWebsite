# Compiled Website

Informational website for **Compiled™**, the Android strategy board game. Player-facing copy is checked against the sibling `CompiledAndroid` app source; the game README can lag behind implementation. Last checked against app version **1.0.11**, based on commit `da0ee7f` plus the current local changes (including game-length settings), on October 3, 2026. This records a source review, not verification of the deployed store or browser build.

## Content

- A plain-language introduction to the shared board and secret objectives.
- A brief three-step introduction: place a card, press Run, and complete your secret goal.
- Rated singleplayer, custom games with three board sizes and four AI difficulties, and pass and play with optional computer rivals.
- Standard or unlimited turns for new rated, custom, and pass-and-play games.
- Basic, Intermediate, and Advanced sets with 9, 20, and 32 card types; the demo uses Basic in matches.
- Twenty-one interactive lessons, the card dictionary, rated profiles, and resuming unfinished rated matches.
- English and Korean, four number formats and the register converter, animation and vibration preferences, and separate sound-effect and background-music volume controls.
- Ten updated app screenshots in a centered carousel with previous/next buttons, keyboard arrow navigation, and an accessible full-size viewer. Without JavaScript, all screenshots remain available in a gallery.
- The Google Play store link, a free browser demo on itch.io, contact address, current local-storage information in both privacy pages, and the app's copyright notice.

Keep the homepage brief and approachable. Detailed rules, turn-limit formulas, rating formulas, deck weighting, instruction syntax, CPU internals, and development details belong in the app and its documentation.

## Files

- `index.html`: game overview.
- `style.css`: responsive shared styles.
- `site.js`: screenshot viewer; image links also work without JavaScript.
- `img/`: original app screenshots and logo.
- `privacy.html` and `privacy/index.html`: equivalent privacy pages, with relative links for both URLs.
- `terms.html` and `terms/index.html`: equivalent Terms of Use for the Android app and browser demo, linked from every page footer.

## Preview and deployment

Plain HTML, CSS, and JavaScript; no dependencies or build step. Open `index.html` directly, or serve this folder with a static HTTP server.

The repository can be published from its root using GitHub Pages or another static host. Keep both privacy URLs and both terms URLs available when publishing.

When app features change, verify the homepage against these Android source files:

- `src/game/engine/cardLevels.ts`: cumulative card counts and JMP availability.
- `src/game/engine/config.ts`, `execution.ts`, and `engine.ts`: hand size, board sizes, execution stops, objective checks, and draw limits.
- `src/game/rated/types.ts` and `ratedMode.ts`: level count, opponents, progression, and rated board size.
- `src/game/tutorial/tutorial.ts`: lesson count and content.
- `src/screens/SettingsScreen.tsx` and `src/game/engine/cardWeights.ts`: card sets and deck weighting.
- `src/navigation/AppNavigator.tsx`, `src/utils/storage.ts`, and `src/utils/ratedStorage.ts`: saved settings, lesson progress, profiles, and rated matches.
- `src/localization/index.ts`, `languageStorage.ts`, and `src/screens/LanguageScreen.tsx`: supported languages and saved language choice.
- `src/config/buildConfig.ts`, `src/game/engine/cardLevels.ts`, and `src/utils/storage.ts`: Demo/Full edition restrictions. The checked-in edition can change during builds; describe both editions explicitly.
- `src/audio/` and `src/screens/SettingsScreen.tsx`: music, sound effects, and independent volume controls.
- `app.json` and `src/components/CopyrightNotice.tsx`: version and attribution.

The Google Play copy treats the app as released, as directed by the owner. Replace screenshots only with actual app captures. The current screenshots were supplied on September 23, 2026.
