/* ==========================
   LOADER
========================== */

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => { loader.style.display = "none"; }, 500);
    }, 900);
});


/* ==========================
   TYPING EFFECT
========================== */

const words = [
    "Java Web Applications",
    "Business Websites",
    "Spring Boot APIs",
    "Landing Pages",
    "E-Commerce Stores",
    "Fullstack Solutions"
];

let wordIndex  = 0;
let charIndex  = 0;
let deleting   = false;

const typingEl = document.getElementById("typing");

function typeEffect() {
    const word = words[wordIndex];
    typingEl.textContent = word.substring(0, charIndex);

    if (!deleting) {
        charIndex++;
        if (charIndex > word.length) {
            deleting = true;
            setTimeout(typeEffect, 1400);
            return;
        }
    } else {
        charIndex--;
        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 55 : 110);
}

typeEffect();


/* ==========================
   DARK MODE
========================== */

const themeBtn = document.getElementById("themeBtn");

// Apply saved preference on load (before paint)
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeBtn.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
});


/* ==========================
   MOBILE MENU
========================== */

const menuBtn  = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("show"));
});


/* ==========================
   NAVBAR — scrolled state
========================== */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });


/* ==========================
   SCROLL PROGRESS BAR
========================== */

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
    const scrolled   = document.documentElement.scrollTop;
    const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    progressBar.style.width = ((scrolled / totalHeight) * 100) + "%";
}, { passive: true });


/* ==========================
   BACK TO TOP
========================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 400 ? "flex" : "none";
}, { passive: true });

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ==========================
   COUNTER ANIMATION
========================== */

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el     = entry.target;
        const target = Number(el.dataset.target);
        let count    = 0;
        const step   = Math.ceil(target / 60);

        const tick = () => {
            count = Math.min(count + step, target);
            el.textContent = count;
            if (count < target) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.5 });

document.querySelectorAll("[data-target]").forEach(el => counterObserver.observe(el));


/* ==========================
   TESTIMONIAL SLIDER
========================== */

const testimonials = document.querySelectorAll(".testimonial-card");
let testimonialIdx = 0;

function nextTestimonial() {
    testimonials[testimonialIdx].classList.remove("active");
    testimonialIdx = (testimonialIdx + 1) % testimonials.length;
    testimonials[testimonialIdx].classList.add("active");
}

if (testimonials.length > 0) {
    setInterval(nextTestimonial, 4200);
}


/* ==========================
   FAQ ACCORDION
========================== */

document.querySelectorAll(".faq").forEach(faq => {
    faq.addEventListener("click", () => {
        // Close others
        document.querySelectorAll(".faq.active").forEach(open => {
            if (open !== faq) open.classList.remove("active");
        });
        faq.classList.toggle("active");
    });
});


/* ==========================
   SCROLL REVEAL
   (excludes hero + navbar so they never flash)
========================== */

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity    = "1";
            entry.target.style.transform  = "translateY(0)";
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

// Only reveal non-hero elements
document.querySelectorAll(
    "#about, #services, #skills, #portfolio, #pricing, #testimonial, #faq, .cta, #contact, footer, .card, .project, .skill, .price-card"
).forEach(el => {
    el.style.opacity   = "0";
    el.style.transform = "translateY(32px)";
    el.style.transition = "opacity .65s ease, transform .65s ease";
    revealObserver.observe(el);
});


/* ==========================
   CONTACT FORM
========================== */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let valid = true;

    this.querySelectorAll("input[required], textarea[required]").forEach(field => {
        if (field.value.trim() === "") {
            valid = false;
            field.style.borderColor = "#CF222E";
            field.style.boxShadow   = "0 0 0 3px rgba(207,34,46,.12)";
        } else {
            field.style.borderColor = "";
            field.style.boxShadow   = "";
        }
    });

    if (valid) {
        // Placeholder — replace with EmailJS / Formspree in Phase 3
        const btn = this.querySelector("button[type='submit']");
        const original = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = "var(--accent)";
        btn.style.color      = "#0D1117";
        btn.disabled         = true;

        this.reset();

        setTimeout(() => {
            btn.innerHTML        = original;
            btn.style.background = "";
            btn.style.color      = "";
            btn.disabled         = false;
        }, 3500);
    }
});


/* ==========================
   ACTIVE NAV LINK
========================== */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 130) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + current
        );
    });
}, { passive: true });


/* ==========================
   BUTTON RIPPLE
========================== */

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function(e) {
        const existing = this.querySelector(".ripple");
        if (existing) existing.remove();

        const circle   = document.createElement("span");
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius   = diameter / 2;

        circle.style.cssText = `
            width: ${diameter}px;
            height: ${diameter}px;
            left: ${e.clientX - this.getBoundingClientRect().left - radius}px;
            top: ${e.clientY - this.getBoundingClientRect().top - radius}px;
        `;
        circle.classList.add("ripple");
        this.appendChild(circle);
    });
});


/* ==========================
   YEAR AUTO-UPDATE
========================== */

const yearEl = document.querySelector(".copyright");
if (yearEl) {
    yearEl.textContent = `© ${new Date().getFullYear()} Chaitanya.Dev. All Rights Reserved.`;
}


/* ==========================
   CONSOLE SIGNATURE
========================== */

console.log(
    "%c⚡ Built by Chaitanya — Java Backend & Fullstack Developer",
    "font-size:14px;color:#00C896;font-weight:700;"
);
