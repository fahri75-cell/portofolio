const typingText = document.getElementById("typing-text");
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

const words = [
  "Frontend Developer",
  "Web Designer",
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
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 60);
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
