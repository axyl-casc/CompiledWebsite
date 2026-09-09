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
      alt: "Compiled game menu",
      title: "Main menu",
      desc: "Choose your challenge, learn the machine, or dive straight into the loop."
    },
    {
      src: "img/play_tab_1.jpeg",
      alt: "Compiled command deck",
      title: "Command deck",
      desc: "A shared loop, a tiny CPU, and a hand of commands waiting to cause trouble."
    },
    {
      src: "img/play_tab_2.jpeg",
      alt: "Compiled program board with staged instructions",
      title: "Program Board",
      desc: "Public commands on the board, private objectives in your pocket, and plenty of room for a plot twist."
    },
    {
      src: "img/tutorial_section.jpeg",
      alt: "Compiled tutorial lessons",
      title: "Learn the machine",
      desc: "Short lessons that turn four-bit confusion into clever little plans."
    },
    {
      src: "img/dictionary.jpeg",
      alt: "Compiled card reference",
      title: "Meet the cards",
      desc: "A closer look at the commands you can use to nudge, scramble, and redirect the machine."
    },
    {
      src: "img/passnplay.jpeg",
      alt: "Compiled pass and play",
      title: "Pass & Play",
      desc: "Pass the device around, hide your objective, and try to look innocent."
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
