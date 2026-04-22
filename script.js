const typingWord = document.getElementById("typing-word");
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");
const header = document.getElementById("site-header");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const form = document.querySelector(".contact-form");

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

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
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

window.addEventListener("scroll", () => {
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
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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
