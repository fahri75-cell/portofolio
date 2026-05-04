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
  const heroCard = document.querySelector(".hero-card");

  const liveStyle = document.createElement("style");
  liveStyle.textContent = `
    .intro-loader {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      background:
        radial-gradient(circle at top left, rgba(96, 165, 250, 0.18), transparent 32%),
        radial-gradient(circle at bottom right, rgba(217, 70, 239, 0.24), transparent 35%),
        linear-gradient(135deg, #040613 0%, #10051d 50%, #1a0830 100%);
      overflow: hidden;
      transition:
        opacity 0.7s ease,
        visibility 0.7s ease;
    }

    .intro-loader.hide {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .intro-loader::before {
      content: "";
      position: absolute;
      width: 380px;
      height: 380px;
      border-radius: 999px;
      background: rgba(168, 85, 247, 0.22);
      filter: blur(80px);
      animation: loaderPulse 2s ease-in-out infinite alternate;
    }

    .intro-loader::after {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
      background-size: 42px 42px;
      mask-image: radial-gradient(circle, black 0%, transparent 72%);
      animation: gridMove 5s linear infinite;
    }

    @keyframes loaderPulse {
      from {
        transform: scale(0.9);
        opacity: 0.55;
      }

      to {
        transform: scale(1.18);
        opacity: 1;
      }
    }

    @keyframes gridMove {
      from {
        transform: translateY(0);
      }

      to {
        transform: translateY(42px);
      }
    }

    .loader-box {
      position: relative;
      z-index: 2;
      width: min(420px, 86%);
      padding: 32px;
      border-radius: 28px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      background: rgba(255, 255, 255, 0.055);
      box-shadow:
        0 28px 70px rgba(0, 0, 0, 0.38),
        0 0 45px rgba(168, 85, 247, 0.18);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      text-align: center;
      transform: translateY(16px) scale(0.96);
      animation: loaderBoxIn 0.65s ease forwards;
    }

    @keyframes loaderBoxIn {
      to {
        transform: translateY(0) scale(1);
      }
    }

    .loader-logo {
      font-size: 34px;
      font-weight: 800;
      color: #f8fafc;
      margin-bottom: 10px;
      letter-spacing: -1px;
    }

    .loader-logo span {
      color: #a855f7;
    }

    .loader-text {
      color: #b3a8c7;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 4px;
      margin-bottom: 22px;
      text-transform: uppercase;
    }

    .loader-bar {
      width: 100%;
      height: 10px;
      padding: 2px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      background: rgba(255, 255, 255, 0.06);
      overflow: hidden;
    }

    .loader-fill {
      width: 0%;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, #60a5fa, #a855f7, #d946ef);
      box-shadow: 0 0 24px rgba(217, 70, 239, 0.55);
      transition: width 0.18s ease;
    }

    .loader-percent {
      margin-top: 14px;
      font-size: 13px;
      color: #f8fafc;
      font-weight: 700;
    }

    .cursor-orb {
      position: fixed;
      width: 260px;
      height: 260px;
      border-radius: 999px;
      pointer-events: none;
      z-index: 1;
      background: radial-gradient(circle, rgba(168, 85, 247, 0.14), transparent 65%);
      filter: blur(12px);
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity 0.35s ease;
    }

    body.page-ready .cursor-orb {
      opacity: 1;
    }

    body:not(.page-ready) .site-header,
    body:not(.page-ready) .hero-left,
    body:not(.page-ready) .hero-right,
    body:not(.page-ready) .hero-card {
      animation: none !important;
    }

    body:not(.page-ready) .site-header {
      opacity: 0 !important;
      transform: translateY(-28px) !important;
    }

    body:not(.page-ready) .hero-left.reveal.show,
    body:not(.page-ready) .hero-right.reveal.show {
      opacity: 0 !important;
      transform: translateY(34px) scale(0.98) !important;
      filter: blur(8px) !important;
    }

    body.page-ready .site-header {
      animation: navDropSmooth 0.85s cubic-bezier(0.16, 1, 0.3, 1) both !important;
    }

    body.page-ready .hero-left.reveal.show {
      animation: heroTextSmooth 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both !important;
    }

    body.page-ready .hero-right.reveal.show {
      animation: heroCardSmooth 1.05s cubic-bezier(0.16, 1, 0.3, 1) 0.22s both !important;
    }

    body.page-ready .hero-card {
      animation: heroFloatSmooth 4.5s ease-in-out 1.35s infinite !important;
    }

    @keyframes navDropSmooth {
      from {
        opacity: 0;
        transform: translateY(-28px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes heroTextSmooth {
      from {
        opacity: 0;
        transform: translateY(34px) scale(0.98);
        filter: blur(8px);
      }

      to {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
      }
    }

    @keyframes heroCardSmooth {
      from {
        opacity: 0;
        transform: translateY(38px) scale(0.94);
        filter: blur(8px);
      }

      to {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
      }
    }

    @keyframes heroFloatSmooth {
      0%, 100% {
        translate: 0 0;
      }

      50% {
        translate: 0 -12px;
      }
    }

    .btn,
    .info-card,
    .project-card,
    .hero-card,
    .contact-form input,
    .contact-form textarea,
    .contact-form button {
      transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1) !important;
    }

    .reveal {
      transition:
        opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }

    @media (max-width: 768px) {
      .intro-loader {
        display: none;
      }

      .cursor-orb {
        display: none;
      }

      body:not(.page-ready) .site-header {
        opacity: 1 !important;
        transform: none !important;
      }

      body:not(.page-ready) .hero-left.reveal.show,
      body:not(.page-ready) .hero-right.reveal.show {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
        filter: blur(0) !important;
      }
    }
  `;
  document.head.appendChild(liveStyle);

  const loader = document.createElement("div");
  loader.className = "intro-loader";
  loader.innerHTML = `
    <div class="loader-box">
      <div class="loader-logo">Fahri<span>Dev.</span></div>
      <div class="loader-text">Initializing Portfolio</div>
      <div class="loader-bar">
        <div class="loader-fill"></div>
      </div>
      <div class="loader-percent">0%</div>
    </div>
  `;
  document.body.appendChild(loader);

  const loaderFill = loader.querySelector(".loader-fill");
  const loaderPercent = loader.querySelector(".loader-percent");

  let loadingValue = 0;

  const loadingTimer = setInterval(() => {
    loadingValue += Math.floor(Math.random() * 13) + 7;

    if (loadingValue >= 100) {
      loadingValue = 100;
      clearInterval(loadingTimer);

      setTimeout(() => {
        loader.classList.add("hide");
        document.body.classList.add("page-ready");
      }, 350);

      setTimeout(() => {
        loader.remove();
      }, 1300);
    }

    loaderFill.style.width = `${loadingValue}%`;
    loaderPercent.textContent = `${loadingValue}%`;
  }, 120);

  const cursorOrb = document.createElement("div");
  cursorOrb.className = "cursor-orb";
  document.body.appendChild(cursorOrb);

  window.addEventListener("mousemove", (e) => {
    cursorOrb.style.left = `${e.clientX}px`;
    cursorOrb.style.top = `${e.clientY}px`;
  });

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

  setTimeout(typeEffect, 900);

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

  if (heroCard) {
    heroCard.addEventListener("mousemove", (e) => {
      if (window.innerWidth <= 768) return;

      const rect = heroCard.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((centerY - mouseY) / centerY) * 5;
      const rotateY = ((mouseX - centerX) / centerX) * 5;

      heroCard.style.animation = "none";
      heroCard.style.transform = `
        translateY(-8px)
        scale(1.015)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
      `;
    });

    heroCard.addEventListener("mouseleave", () => {
      heroCard.style.transform = "translateY(0) scale(1) rotateX(0deg) rotateY(0deg)";
      heroCard.style.animation = "heroFloatSmooth 4.5s ease-in-out 1.2s infinite";
    });
  }

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
