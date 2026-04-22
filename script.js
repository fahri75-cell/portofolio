const typingText = document.getElementById("typing-text");
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const revealElements = document.querySelectorAll(".reveal");
const header = document.getElementById("header");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const words = [
  "Frontend Developer",
  "UI Explorer",
  "Creative Web Builder",
  "Tech Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  const currentWord = words[wordIndex];
  const currentText = currentWord.substring(0, charIndex);
  typingText.textContent = currentText;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 95);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 55);
  } else {
    isDeleting = !isDeleting;

    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, 1000);
  }
}

typeEffect();

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("show");
  });
});

function revealOnScroll() {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const visiblePoint = 110;

    if (elementTop < windowHeight - visiblePoint) {
      element.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (!header) return;

  if (currentScrollY <= 0) {
    header.classList.remove("hide");
    header.classList.remove("scrolled");
  } else {
    header.classList.add("scrolled");

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
  }

  lastScrollY = currentScrollY;
});

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Transmisi berhasil dikirim.");
    form.reset();
  });
}
