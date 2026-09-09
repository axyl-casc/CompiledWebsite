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
  const carousel = document.querySelector(".screenshot-carousel");
  const carouselImage = document.getElementById("carousel-image");
  const carouselTitle = document.getElementById("carousel-title");
  const carouselDesc = document.getElementById("carousel-desc");
  const carouselDots = document.querySelectorAll(".carousel-dots button");
  const slides = [
    {
      src: "img/main_menu.jpeg",
      alt: "Compiled Android main menu",
      title: "Main menu",
      desc: "The current main menu with Tutorial, Singleplayer, Pass & Play, Card Dictionary, and Settings."
    },
    {
      src: "img/play_tab_1.jpeg",
      alt: "Compiled command deck screen",
      title: "Command deck",
      desc: "A current eight-slot Program Board with the shared CPU, secret objective, and six-card command tray."
    },
    {
      src: "img/play_tab_2.jpeg",
      alt: "Compiled Program Board with staged instructions",
      title: "Program Board",
      desc: "The board after several placements, showing public instructions and private player objectives."
    },
    {
      src: "img/tutorial_section.jpeg",
      alt: "Compiled tutorial directory",
      title: "Tutorial directory",
      desc: "The current 20-lesson curriculum, organized into four sections with visible completion progress."
    },
    {
      src: "img/dictionary.jpeg",
      alt: "Compiled card dictionary",
      title: "Card dictionary",
      desc: "The Basic card tier with syntax, categories, and links into full instruction details."
    },
    {
      src: "img/passnplay.jpeg",
      alt: "Compiled Pass & Play player roster setup",
      title: "Pass & Play setup",
      desc: "Configure two to four participants and choose Human or CPU control for each player."
    }
  ];
  let activeSlide = 0;
  let slideTimer = null;

  const setSlide = (index) => {
    if (!carouselImage || !carouselTitle || !carouselDesc) return;

    activeSlide = (index + slides.length) % slides.length;
    const slide = slides[activeSlide];

    carouselImage.src = slide.src;
    carouselImage.alt = slide.alt;
    carouselTitle.textContent = slide.title;
    carouselDesc.textContent = slide.desc;

    carouselDots.forEach((dot, dotIndex) => {
      const selected = dotIndex === activeSlide;
      dot.classList.toggle("active", selected);
      dot.setAttribute("aria-selected", String(selected));
    });
  };

  const openScreenshot = (slide) => {
    if (!dialog || !dialogImg || !dialogTitle || !dialogDesc) return;

    const src = slide.src;
    const title = slide.title || "Compiled screenshot";
    const desc = slide.desc || "";

    if (!src) return;

    dialogImg.src = src;
    dialogImg.alt = slide.alt || title;
    dialogTitle.textContent = title;
    dialogDesc.textContent = desc;

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  };

  const startSlideshow = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || slideTimer || !carousel) return;
    slideTimer = window.setInterval(() => setSlide(activeSlide + 1), 4200);
  };

  const stopSlideshow = () => {
    if (!slideTimer) return;
    window.clearInterval(slideTimer);
    slideTimer = null;
  };

  if (carousel && carouselImage) {
    setSlide(0);
    startSlideshow();

    carouselDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        stopSlideshow();
        setSlide(index);
        startSlideshow();
      });
    });

    carousel.addEventListener("mouseenter", stopSlideshow);
    carousel.addEventListener("mouseleave", startSlideshow);
    carousel.addEventListener("focusin", stopSlideshow);
    carousel.addEventListener("focusout", startSlideshow);
    carouselImage.addEventListener("click", () => openScreenshot(slides[activeSlide]));
  }

  if (dialog && dialogClose) {
    dialogClose.addEventListener("click", () => dialog.close());

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  }
});
