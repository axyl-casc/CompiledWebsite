# CompiledAndroid — Official Website

Official website and product showcase for **CompiledAndroid**, the mobile adaptation of **Compiled**, a retro computer-themed board game built with **Expo & React Native**.

Visit the live site or host it directly on GitHub Pages.

---

## About CompiledAndroid

Compiled is a retro computing-themed strategy board game where players place assembly-style instruction cards into a shared circular program loop (12, 16, or 20 memory slots). Every player holds private cards and a secret objective, but everyone manipulates the same signed 4-bit CPU data registers (`R0`–`R3`) and status flags (`Z`, `N`, `C`, `V`). You win only when your own turn finishes with your secret objective satisfied!

### Key Game Systems:
- **Shared Signed 4-Bit CPU**: Registers `R0`–`R3` wrap within the signed range `-8` to `+7`.
- **Status Flags**: Four ALU flags (`Z` Zero, `N` Negative, `C` Carry, `V` Overflow) update on operations.
- **Circular Memory Track**: Flexible board configurations with 12, 16, or 20 instruction slots. Empty slots act as `NOP` and stop execution immediately.
- **Turn Lifecycle**: 
  1. *Place*: Commit 1 card from hand into an available memory slot.
  2. *Draw*: Draw a replacement card from the personal deck.
  3. *Advance*: Move your Program Counter (PC) forward by 1 slot clockwise before executing.
  4. *Execute & Branch*: Run register operations; relative branches (`BRA`) jump forward or backward up to 5 instructions per chain. Execution halts upon hitting `NOP` (empty slot).
  5. *Evaluate*: Win condition is evaluated **only after your own turn execution finishes**.
- **Comprehensive Instruction Set**:
  - *Value / Arithmetic*: `MOVE`, `ADD`, `SUB`, `MUL`
  - *Bitwise Logic*: `AND`, `OR`, `XOR`
  - *Unary Operations*: `INC`, `DEC`, `NEG`, `CLR`, `NOT`
  - *Shifts & Rotates*: `LSL`, `LSR`, `ROL`, `ROR`
  - *Control & Exchange*: `SWAP`, `BRA`, `NOP`
- **Game Modes**:
  - **Singleplayer**: Battle 1–3 CPU rivals with Easy, Normal, or Hard lookahead heuristic difficulty.
  - **Pass & Play**: Local multiplayer for 2–4 players mixing humans and CPUs, featuring a dedicated **Turn Handoff Privacy Screen** to protect secret cards and objectives.
  - **Interactive Tutorial**: Scripted multi-step guide teaching CPU registers, board memory, card placement, execution, branching, and objectives.
  - **Card Dictionary**: In-app reference cataloging every card, syntax, and effect.
  - **Settings & Register Inspector**: Configure animation speed, reset tutorial progress, and inspect registers in **DEC**, **HEX**, or **BIN** representation.
  - **Online Multiplayer**: Screen present and designated as "Coming Soon".

---

## Repository Structure

```
CompiledWebsite/
├── img/               # Visual assets and in-game Android captures (all lazy-loaded)
│   ├── logo_with_text.png
│   ├── main_menu.png
│   ├── play_tab_1.png
│   ├── play_tab_2.png
│   ├── play_tab_3.png
│   └── tutorial_section.png
├── index.html         # Main landing page (hero simulator, features, screenshots, how to play, ISA matrix)
├── style.css          # Dark retro-computing & cyberpunk terminal aesthetic (responsive CSS3)
├── site.js            # Signed 4-bit ALU phone simulator, DEC/HEX/BIN format switcher, screenshot modal
├── privacy.html       # Google Play Store compliant Privacy Policy (offline-first, zero telemetry)
├── privacy/
│   └── index.html     # Static mirror supporting clean '/privacy' URLs
└── README.md          # Project documentation
```

---

## Website Highlights

* **Expo / React Native Showcase**: Highlights the architecture, mobile screens, and accurate gameplay systems.
* **Interactive 4-Bit ALU Hero Simulator**: Live in-browser phone mockup demonstrating signed 4-bit arithmetic, two's complement wrapping (`-8..+7`), flag computation (`Z`, `N`, `C`, `V`), and on-the-fly number format toggling (**DEC**, **HEX**, **BIN**).
* **Dual-View Device Mockup**: Toggle between the live interactive simulator and real in-game gameplay captures.
* **100% Lazy-Loaded Images**: All image assets across all pages utilize native `loading="lazy"` for optimal mobile performance and minimal bandwidth consumption.
* **Opcode Matrix & How to Play**: Full reference table of all instruction categories and 5-step turn flow.
* **Screenshots Modal Gallery**: Click-to-expand lightbox dialog showcasing Main Menu, Program Board, Command Deck, CPU Rival matches, and the Interactive Tutorial.
* **Google Play Privacy Policy**: Dedicated `/privacy` documentation fulfilling Google Play Store policies for offline-first, account-free applications.
* **Zero Dependencies**: Pure HTML5, modern CSS3, and ES6 JavaScript. No build step, compiler, or npm dependencies required.

---

## Local Development & Preview

Run a lightweight web server from the repository root:

### Option 1: Python 3
```bash
python -m http.server 8000
```
Visit `http://localhost:8000/`.

### Option 2: Node.js
```bash
npx serve .
```

---

## Deployment to GitHub Pages

1. Navigate to **Settings** > **Pages** in this GitHub repository.
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Select `main` branch and `/` (root) folder, then click **Save**.
4. GitHub Pages will build and publish your site at `https://<username>.github.io/CompiledWebsite/`.

---

## License & Copyright

&copy; 2026 Compiled. Built with Expo & React Native. All rights reserved.