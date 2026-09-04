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
      src: "img/main_menu.png",
      alt: "Compiled Android main menu",
      title: "Main menu",
      desc: "The main entry point for tutorial, singleplayer, pass and play, card dictionary, and settings."
    },
    {
      src: "img/play_tab_1.png",
      alt: "Compiled command deck screen",
      title: "Command deck",
      desc: "Your private objective and command cards sit beside the public CPU state."
    },
    {
      src: "img/play_tab_2.png",
      alt: "Compiled 12-slot program board",
      title: "12-slot board",
      desc: "A 12-slot board at the start of a match, with player Program Counters around the loop."
    },
    {
      src: "img/play_tab_3.png",
      alt: "Compiled 20-slot program board",
      title: "20-slot board",
      desc: "A 20-slot board after several turns, with branches, swaps, bitwise cards, and private objective pressure."
    },
    {
      src: "img/tutorial_section.png",
      alt: "Compiled tutorial screen",
      title: "Tutorial",
      desc: "The guided tutorial explains CPU registers, cards, memory, running, branching, and objectives."
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
