const words = [
    "Software Engineer",
    "Full Stack Developer",
    "React Native Developer",
    "MERN Stack Developer",
    "Node.js Developer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.querySelector(".typing-animation");

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex--);
    } else {
        typingElement.textContent = currentWord.substring(0, charIndex++);
    }

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentWord.length + 1) {
        speed = 2000;
        isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, speed);
}

const cards = document.querySelectorAll(".skill-card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
});

cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = ".6s ease";
    observer.observe(card);
});

typeEffect();

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    formStatus.textContent = "Sending...";

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: { Accept: "application/json" }
        });

        if (response.ok) {
            contactForm.reset();
            formStatus.textContent = "Message sent! I'll get back to you soon.";
        } else {
            formStatus.textContent = "Something went wrong. Please try again.";
        }
    } catch {
        formStatus.textContent = "Something went wrong. Please try again.";
    } finally {
        submitBtn.disabled = false;
    }
});
