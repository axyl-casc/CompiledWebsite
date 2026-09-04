document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");

  const closeMenu = () => {
    if (!mobileToggle || !navLinks) return;
    navLinks.classList.remove("open");
    mobileToggle.setAttribute("aria-expanded", "false");
    mobileToggle.setAttribute("aria-label", "Open navigation");
    mobileToggle.innerHTML = '<span aria-hidden="true">=</span>';
  };

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
      mobileToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      mobileToggle.innerHTML = isOpen
        ? '<span aria-hidden="true">x</span>'
        : '<span aria-hidden="true">=</span>';
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  const sections = document.querySelectorAll("section[id]");
  const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;
        sectionLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      });
    }, {
      rootMargin: "-25% 0px -58% 0px",
      threshold: 0
    });

    sections.forEach((section) => observer.observe(section));
  }

  const dialog = document.getElementById("screenshot-dialog");
  const dialogImg = document.getElementById("dialog-img");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogDesc = document.getElementById("dialog-desc");
  const dialogClose = document.getElementById("dialog-close");

  const openScreenshot = (card) => {
    if (!dialog || !dialogImg || !dialogTitle || !dialogDesc) return;

    const src = card.dataset.screenshotSrc;
    const title = card.dataset.screenshotTitle || "Compiled screenshot";
    const desc = card.dataset.screenshotDesc || "";

    if (!src) return;

    dialogImg.src = src;
    dialogImg.alt = title;
    dialogTitle.textContent = title;
    dialogDesc.textContent = desc;

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  };

  document.querySelectorAll(".screenshot-card").forEach((card) => {
    card.addEventListener("click", () => openScreenshot(card));
  });

  if (dialog && dialogClose) {
    dialogClose.addEventListener("click", () => dialog.close());

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  }
});
