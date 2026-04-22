const typingText = document.getElementById("typing-text");
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const revealElements = document.querySelectorAll(".reveal");
const header = document.getElementById("header");

const words = [
  "Frontend Developer",
  "UI Explorer",
  "Creative Learner",
  "Tech Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
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

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("show");
});

document.querySelectorAll(".navbar a").forEach((link) => {
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

let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (currentScroll > lastScrollTop && currentScroll > 120) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
