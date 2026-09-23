document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".screenshot-carousel");
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll("figure"));
    const previous = carousel.querySelector(".carousel-previous");
    const next = carousel.querySelector(".carousel-next");
    const status = carousel.querySelector(".carousel-status");
    let current = 0;

    if (slides.length && previous && next && status) {
      const showSlide = (index) => {
        current = (index + slides.length) % slides.length;
        slides.forEach((slide, position) => {
          slide.hidden = position !== current;
        });
        const active = slides[current];
        active.querySelector("img").loading = "eager";
        status.textContent = `${current + 1} / ${slides.length} · ${active.querySelector("figcaption").textContent}`;
      };

      carousel.classList.add("is-carousel");
      carousel.setAttribute("aria-roledescription", "carousel");
      previous.hidden = next.hidden = status.hidden = false;
      showSlide(0);
      previous.addEventListener("click", () => showSlide(current - 1));
      next.addEventListener("click", () => showSlide(current + 1));
      carousel.addEventListener("keydown", (event) => {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          showSlide(current + (event.key === "ArrowRight" ? 1 : -1));
          // Keep keyboard focus visible when navigating from the screenshot link.
          if (event.target.closest(".screenshot-link")) {
            slides[current].querySelector("a").focus({ preventScroll: true });
          }
        }
      });
    }
  }

  const dialog = document.getElementById("screenshot-dialog");
  const dialogImage = document.getElementById("dialog-img");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogDescription = document.getElementById("dialog-desc");
  const closeButton = document.getElementById("dialog-close");

  // Image links still work when native dialogs or JavaScript are unavailable.
  if (!dialog || !dialogImage || !dialogTitle || !dialogDescription ||
      !closeButton || typeof dialog.showModal !== "function") return;

  let trigger = null;
  document.querySelectorAll(".screenshot-link").forEach((link) => {
    link.setAttribute("aria-haspopup", "dialog");
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      trigger = link;
      dialogImage.src = link.href;
      dialogImage.alt = link.querySelector("img")?.alt || link.dataset.title;
      dialogTitle.textContent = link.dataset.title;
      dialogDescription.textContent = link.dataset.description;
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.classList.add("dialog-open");
    });
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  // Native Escape handling also restores scrolling and focus through this event.
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    trigger?.focus({ preventScroll: true });
    trigger = null;
  });
});
