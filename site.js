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

  // --- 3. Interactive Hero Phone Mockup (Simulated Micro-Demo) ---
  const cardButtons = document.querySelectorAll(".interactive-mockup-card");
  const regR0 = document.getElementById("mockup-reg-r0");
  const regR1 = document.getElementById("mockup-reg-r1");
  const regR2 = document.getElementById("mockup-reg-r2");
  const regR3 = document.getElementById("mockup-reg-r3");
  const activeTile = document.getElementById("mockup-active-tile");
  const activeTileOp = document.getElementById("mockup-active-op");
  const pcToken = document.getElementById("mockup-pc-token");

  if (cardButtons.length > 0 && regR0 && regR1 && regR2 && regR3) {
    const registers = { R0: 5, R1: -3, R2: 0, R3: 7 };

    const formatReg = (val) => (val > 0 ? `+${val}` : String(val));
    const wrapReg = (val) => {
      if (val > 7) return -8 + ((val - 8) % 16);
      if (val < -8) return 7 + ((val + 8) % 16);
      return val;
    };

    const updateDisplay = (highlightReg) => {
      regR0.textContent = formatReg(registers.R0);
      regR1.textContent = formatReg(registers.R1);
      regR2.textContent = formatReg(registers.R2);
      regR3.textContent = formatReg(registers.R3);

      [regR0, regR1, regR2, regR3].forEach(el => el.parentElement.style.borderColor = "var(--cyan)");
      if (highlightReg && document.getElementById(`mockup-reg-${highlightReg.toLowerCase()}`)) {
        const el = document.getElementById(`mockup-reg-${highlightReg.toLowerCase()}`);
        el.parentElement.style.borderColor = "var(--green)";
      }
    };

    cardButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const action = btn.dataset.action;

        cardButtons.forEach(b => b.classList.remove("highlight"));
        btn.classList.add("highlight");

        if (action === "move") {
          registers.R0 = 5;
          if (activeTileOp) activeTileOp.textContent = "MOVE #5,R0";
          updateDisplay("R0");
        } else if (action === "add") {
          registers.R1 = wrapReg(registers.R1 + 2);
          if (activeTileOp) activeTileOp.textContent = "ADD #2,R1";
          updateDisplay("R1");
        } else if (action === "swap") {
          const temp = registers.R1;
          registers.R1 = registers.R2;
          registers.R2 = temp;
          if (activeTileOp) activeTileOp.textContent = "SWAP R1,R2";
          updateDisplay("R1");
        } else if (action === "bra") {
          if (activeTileOp) activeTileOp.textContent = "BRA +02";
          if (pcToken) {
            pcToken.style.transition = "transform 0.3s ease";
            pcToken.style.transform = "scale(1.4)";
            setTimeout(() => { pcToken.style.transform = "scale(1)"; }, 300);
          }
          updateDisplay();
        }
      });
    });
  }
});

