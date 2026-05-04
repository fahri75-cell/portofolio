document.addEventListener("DOMContentLoaded", () => {
  const typingWord = document.getElementById("typing-word");
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.getElementById("nav");
  const header = document.getElementById("site-header");
  const revealItems = document.querySelectorAll(".reveal");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const form = document.querySelector(".contact-form");
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const infoCards = document.querySelectorAll(".info-card");
  const projectCards = document.querySelectorAll(".project-card");
  const heroButtons = document.querySelectorAll(".hero-actions .btn");

  const words = [
    "Tech Enthusiast",
    "Frontend Developer",
    "UI Explorer",
    "Creative Web Builder"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let lastScrollY = window.scrollY;

  function typeEffect() {
    if (!typingWord) return;

    const current = words[wordIndex];
    typingWord.textContent = current.substring(0, charIndex);

    if (!deleting && charIndex < current.length) {
      charIndex++;
      setTimeout(typeEffect, 90);
    } else if (deleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 50);
    } else {
      deleting = !deleting;

      if (!deleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }

      setTimeout(typeEffect, 900);
    }
  }

  typeEffect();

  function setTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light-theme");
      if (themeIcon) themeIcon.textContent = "☾";
    } else {
      document.body.classList.remove("light-theme");
      if (themeIcon) themeIcon.textContent = "☀";
    }

    localStorage.setItem("portfolio-theme", theme);
  }

  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme("dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLightNow = document.body.classList.contains("light-theme");

      if (isLightNow) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    });
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav) nav.classList.remove("show");
    });
  });

  function revealOnScroll() {
    revealItems.forEach((item) => {
      const top = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (top < windowHeight - 100) {
        item.classList.add("show");
      }
    });
  }

  window.addEventListener("load", revealOnScroll);
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  window.addEventListener("scroll", () => {
    if (!header) return;

    const currentScroll = window.scrollY;

    if (currentScroll > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    if (currentScroll > lastScrollY && currentScroll > 100) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }

    lastScrollY = currentScroll <= 0 ? 0 : currentScroll;
  });

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 160;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Transmisi berhasil dikirim.");
      form.reset();
    });
  }

  function addTiltEffect(cards, power = 7, lift = 10, scale = 1.025) {
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        if (window.innerWidth <= 768) return;

        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((centerY - mouseY) / centerY) * power;
        const rotateY = ((mouseX - centerX) / centerX) * power;

        card.style.setProperty("--mouse-x", `${mouseX}px`);
        card.style.setProperty("--mouse-y", `${mouseY}px`);

        card.style.transform = `
          translateY(-${lift}px)
          scale(${scale})
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
        `;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1) rotateX(0deg) rotateY(0deg)";
        card.style.setProperty("--mouse-x", "50%");
        card.style.setProperty("--mouse-y", "50%");
      });
    });
  }

  addTiltEffect(infoCards, 7, 10, 1.025);
  addTiltEffect(projectCards, 6, 10, 1.02);

  heroButtons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      if (window.innerWidth <= 768) return;

      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const moveX = Math.max(-14, Math.min(14, x * 0.18));
      const moveY = Math.max(-10, Math.min(10, y * 0.28));

      button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.04)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0px, 0px) scale(1)";
    });
  });
});
