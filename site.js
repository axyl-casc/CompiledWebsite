/**
 * COMPILED — Official Website Scripts
 * Lightweight, accessible interactive utilities.
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // --- 1. Mobile Menu Toggle ---
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
      mobileToggle.innerHTML = isOpen ? "<span>✕</span> CLOSE" : "<span>☰</span> MENU";
    });

    // Close menu when clicking on any link
    navLinks.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("open")) {
          navLinks.classList.remove("open");
          mobileToggle.setAttribute("aria-expanded", "false");
          mobileToggle.innerHTML = "<span>☰</span> MENU";
        }
      });
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.innerHTML = "<span>☰</span> MENU";
        mobileToggle.focus();
      }
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (navLinks.classList.contains("open") && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.innerHTML = "<span>☰</span> MENU";
      }
    });
  }

  // --- 2. Active Section Spy via IntersectionObserver ---
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navItems.forEach(link => {
            const href = link.getAttribute("href");
            if (href === `#${id}`) {
              link.classList.add("active");
            } else if (href && href.startsWith("#")) {
              link.classList.remove("active");
            }
          });
        }
      });
    }, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));
  }

  // --- 3. Interactive Hero Phone Mockup (Signed 4-Bit ALU Micro-Demo) ---
  const cardButtons = document.querySelectorAll(".interactive-mockup-card");
  const regR0 = document.getElementById("mockup-reg-r0");
  const regR1 = document.getElementById("mockup-reg-r1");
  const regR2 = document.getElementById("mockup-reg-r2");
  const regR3 = document.getElementById("mockup-reg-r3");
  const flagZ = document.getElementById("mockup-flag-z");
  const flagN = document.getElementById("mockup-flag-n");
  const flagC = document.getElementById("mockup-flag-c");
  const flagV = document.getElementById("mockup-flag-v");
  const formatPills = document.querySelectorAll(".format-pill");
  const activeTileOp = document.getElementById("mockup-active-op");
  const pcToken = document.getElementById("mockup-pc-token");

  if (cardButtons.length > 0 && regR0 && regR1 && regR2 && regR3) {
    // 4-bit signed data registers (-8..+7)
    const registers = { R0: 5, R1: -3, R2: 0, R3: 7 };
    // 4-bit ALU status flags
    const flags = { Z: 0, N: 0, C: 0, V: 0 };
    // Active number display format: 'dec', 'hex', 'bin'
    let currentFormat = "dec";

    // Signed 4-bit wrapping arithmetic (-8 through +7)
    const wrap4 = (raw) => {
      const u = raw & 0xF;
      return (u & 0x8) ? (u - 16) : u;
    };

    // Format value according to active format pill
    const formatValue = (val) => {
      const u = val & 0xF;
      if (currentFormat === "hex") {
        return `0x${u.toString(16).toUpperCase()}`;
      }
      if (currentFormat === "bin") {
        return u.toString(2).padStart(4, "0");
      }
      // Signed decimal (+5, -3, +0)
      return val > 0 ? `+${val}` : val === 0 ? "+0" : String(val);
    };

    // Refresh UI registers and status flags
    const updateDisplay = (highlightRegs = []) => {
      regR0.textContent = formatValue(registers.R0);
      regR1.textContent = formatValue(registers.R1);
      regR2.textContent = formatValue(registers.R2);
      regR3.textContent = formatValue(registers.R3);

      const regElements = [
        { key: "R0", el: regR0 },
        { key: "R1", el: regR1 },
        { key: "R2", el: regR2 },
        { key: "R3", el: regR3 }
      ];

      regElements.forEach(({ key, el }) => {
        if (el && el.parentElement) {
          el.parentElement.style.borderColor = highlightRegs.includes(key) ? "var(--green)" : "var(--cyan)";
        }
      });

      // Update flags
      const flagMap = [
        { el: flagZ, val: flags.Z },
        { el: flagN, val: flags.N },
        { el: flagC, val: flags.C },
        { el: flagV, val: flags.V }
      ];

      flagMap.forEach(({ el, val }) => {
        if (el) {
          el.textContent = String(val);
          if (el.parentElement) {
            el.parentElement.classList.toggle("active", val === 1);
          }
        }
      });
    };

    // Format pills switcher (DEC, HEX, BIN)
    formatPills.forEach(pill => {
      pill.addEventListener("click", () => {
        const fmt = pill.dataset.format;
        if (!fmt || fmt === currentFormat) return;
        currentFormat = fmt;
        formatPills.forEach(p => p.classList.toggle("active", p === pill));
        updateDisplay();
      });
    });

    // Interactive instruction buttons
    cardButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const action = btn.dataset.action;

        cardButtons.forEach(b => b.classList.remove("highlight"));
        btn.classList.add("highlight");

        if (action === "move") {
          registers.R0 = 5;
          flags.Z = 0;
          flags.N = 0;
          flags.C = 0;
          flags.V = 0;
          if (activeTileOp) activeTileOp.textContent = "MOVE #5,R0";
          updateDisplay(["R0"]);
        } else if (action === "add") {
          const op1 = registers.R1;
          const op2 = 2;
          const rawSum = op1 + op2;
          const wrapped = wrap4(rawSum);
          // Unsigned carry across 4 bits
          const carry = ((op1 & 0xF) + (op2 & 0xF)) > 15 ? 1 : 0;
          // Signed overflow (pos+pos=neg or neg+neg=pos)
          const overflow = ((op1 >= 0 && op2 >= 0 && wrapped < 0) || (op1 < 0 && op2 < 0 && wrapped >= 0)) ? 1 : 0;

          registers.R1 = wrapped;
          flags.Z = wrapped === 0 ? 1 : 0;
          flags.N = wrapped < 0 ? 1 : 0;
          flags.C = carry;
          flags.V = overflow;
          if (activeTileOp) activeTileOp.textContent = "ADD #2,R1";
          updateDisplay(["R1"]);
        } else if (action === "swap") {
          const temp = registers.R1;
          registers.R1 = registers.R2;
          registers.R2 = temp;
          flags.Z = registers.R1 === 0 ? 1 : 0;
          flags.N = registers.R1 < 0 ? 1 : 0;
          flags.C = 0;
          flags.V = 0;
          if (activeTileOp) activeTileOp.textContent = "SWAP R1,R2";
          updateDisplay(["R1", "R2"]);
        } else if (action === "and") {
          const res = wrap4((registers.R0 & 0xF) & (3 & 0xF));
          registers.R0 = res;
          flags.Z = res === 0 ? 1 : 0;
          flags.N = res < 0 ? 1 : 0;
          flags.C = 0;
          flags.V = 0;
          if (activeTileOp) activeTileOp.textContent = "AND #3,R0";
          updateDisplay(["R0"]);
        }

        // Pulse the PC token
        if (pcToken) {
          pcToken.style.transition = "transform 0.25s ease";
          pcToken.style.transform = "scale(1.4)";
          setTimeout(() => { pcToken.style.transform = "scale(1)"; }, 250);
        }
      });
    });
  }

  // --- 4. Hero Phone View Switcher ---
  const heroModeBtns = document.querySelectorAll(".phone-mode-btn");
  const heroInteractiveView = document.getElementById("hero-interactive-view");
  const heroScreenshotView = document.getElementById("hero-screenshot-view");

  if (heroModeBtns.length > 0 && heroInteractiveView && heroScreenshotView) {
    heroModeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const view = btn.dataset.view;
        heroModeBtns.forEach(b => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        if (view === "interactive") {
          heroInteractiveView.hidden = false;
          heroScreenshotView.hidden = true;
        } else {
          heroInteractiveView.hidden = true;
          heroScreenshotView.hidden = false;
        }
      });
    });
  }

  // --- 5. Screenshots Modal Dialog ---
  const dialog = document.getElementById("screenshot-dialog");
  const dialogImg = document.getElementById("dialog-img");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogDesc = document.getElementById("dialog-desc");
  const dialogClose = document.getElementById("dialog-close");
  const screenshotCards = document.querySelectorAll(".screenshot-card");

  if (dialog && screenshotCards.length > 0) {
    const openScreenshot = (card) => {
      const src = card.dataset.screenshotSrc;
      const title = card.dataset.screenshotTitle;
      const desc = card.dataset.screenshotDesc;

      if (src && dialogImg && dialogTitle && dialogDesc) {
        dialogImg.src = src;
        dialogImg.alt = title || "Compiled Screenshot Preview";
        dialogTitle.textContent = title || "";
        dialogDesc.textContent = desc || "";
        if (typeof dialog.showModal === "function") {
          dialog.showModal();
        } else {
          dialog.setAttribute("open", "");
        }
      }
    };

    screenshotCards.forEach(card => {
      card.addEventListener("click", () => openScreenshot(card));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openScreenshot(card);
        }
      });
    });

    if (dialogClose) {
      dialogClose.addEventListener("click", () => dialog.close());
    }

    // Close when clicking dialog backdrop
    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInside = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInside) {
        dialog.close();
      }
    });
  }
});

