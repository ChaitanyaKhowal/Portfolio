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
   PORTFOLIO FILTER TABS
========================== */

const pfTabs  = document.querySelectorAll(".pf-tab");
const csCards = document.querySelectorAll(".cs-card");

pfTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // Update active tab
        pfTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const filter = tab.dataset.filter;

        csCards.forEach(card => {
            const match = filter === "all" || card.dataset.category === filter;
            card.style.transition = "opacity .3s ease, transform .3s ease";

            if (match) {
                card.style.opacity   = "1";
                card.style.transform = "";
                card.style.display   = "";
            } else {
                card.style.opacity   = "0";
                card.style.transform = "translateY(8px)";
                // Hide after fade
                setTimeout(() => {
                    if (tab.classList.contains("active") && tab.dataset.filter !== "all") {
                        if (!card.matches(`[data-category="${tab.dataset.filter}"]`)) {
                            card.style.display = "none";
                        }
                    }
                }, 300);
            }
        });
    });
});

/* ==========================
   YEAR AUTO-UPDATE
========================== */

const yearEl = document.querySelector(".copyright");
if (yearEl) {
    yearEl.textContent = `© ${new Date().getFullYear()} Chaitanya.Dev. All Rights Reserved.`;
}


/* ============================================================
   INTERACTIVE CONSOLE WIDGET
   ============================================================ */
const terminal = document.getElementById("heroTerminal");
const terminalInput = document.getElementById("terminalInput");
const terminalHistory = document.getElementById("terminalHistory");
const terminalBody = document.getElementById("terminalBody");
const suggestBtns = document.querySelectorAll(".t-suggest-btn");

if (terminal && terminalInput) {
    // Focus input when terminal is clicked
    terminal.addEventListener("click", () => {
        terminalInput.focus();
    });

    // Handle suggestions click
    suggestBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const cmd = btn.dataset.cmd;
            executeCommand(cmd);
        });
    });

    // Input submit
    terminalInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const cmd = terminalInput.value.trim();
            if (cmd) {
                executeCommand(cmd);
            }
            terminalInput.value = "";
        }
    });
}

function executeCommand(cmd) {
    // Append entered command
    const line = document.createElement("span");
    line.className = "tl";
    line.innerHTML = `<span class="tp">$</span> <span class="tc">${escapeHtml(cmd)}</span>`;
    terminalHistory.appendChild(line);

    const cleanCmd = cmd.toLowerCase().trim();
    let outputHTML = "";

    switch (cleanCmd) {
        case "help":
            outputHTML = `
                <span class="tl"><span class="tv">Available commands:</span></span>
                <span class="tl">  <span class="tk">about</span>     - Who is Chaitanya & business philosophy</span>
                <span class="tl">  <span class="tk">skills</span>    - List core backend & frontend stacks</span>
                <span class="tl">  <span class="tk">projects</span>  - Show showcase client projects</span>
                <span class="tl">  <span class="tk">contact</span>   - How to reach for direct hiring</span>
                <span class="tl">  <span class="tk">clear</span>     - Clear console screens</span>
            `;
            break;
        case "about":
            outputHTML = `
                <span class="tl"><span class="tv">Chaitanya Dev — Java Backend & Fullstack Freelancer</span></span>
                <span class="tl"><span class="td">I design responsive websites that turn searchers into paid customers.</span></span>
                <span class="tl">I specialize in combining fast frontend pages with robust Java backend APIs.</span>
            `;
            break;
        case "skills":
            outputHTML = `
                <span class="tl"><span class="tg">Backend Stack:</span> Java 21, Spring Boot, Spring Data JPA, REST APIs, Maven</span>
                <span class="tl"><span class="tg">Databases:</span> MySQL, PostgreSQL, Redis</span>
                <span class="tl"><span class="tg">Frontend:</span> HTML5, CSS3, ES6 JavaScript, Responsive Grid Layouts</span>
                <span class="tl"><span class="tg">Platforms:</span> Netlify, Render, AWS, Git</span>
            `;
            break;
        case "projects":
            outputHTML = `
                <span class="tl"><span class="tv">Active Showcases:</span></span>
                <span class="tl">1. <span class="tk">The Heaven Palace</span> - Premium Restaurant Website (Live)</span>
                <span class="tl">2. <span class="tk">FitForge Gym</span> - Ad Landing Page with Lead Forms (Demo Active)</span>
                <span class="tl">3. <span class="tk">MediBook</span> - Clinical Dashboard & Scheduler (Demo Active)</span>
                <span class="tl">4. <span class="tk">SpiceRoute</span> - Catalog Store with WhatsApp Orders (Demo Active)</span>
            `;
            break;
        case "contact":
            outputHTML = `
                <span class="tl"><span class="tv">Hire Me / Chat:</span></span>
                <span class="tl">  Email: <span class="ts">chaitanyakhowal@gmail.com</span></span>
                <span class="tl">  GitHub: <span class="ts">github.com/ChaitanyaKhowal</span></span>
                <span class="tl">  WhatsApp: <span class="tg">+91 76200 85558</span></span>
            `;
            break;
        case "clear":
            terminalHistory.innerHTML = "";
            return;
        default:
            outputHTML = `<span class="tl" style="color:var(--warm)">Command not found: '${escapeHtml(cmd)}'. Type 'help' for options.</span>`;
            break;
    }

    if (outputHTML) {
        const outputDiv = document.createElement("div");
        outputDiv.innerHTML = outputHTML;
        terminalHistory.appendChild(outputDiv);
    }

    // Scroll to bottom
    setTimeout(() => {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 20);
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}


/* ============================================================
   INTERACTIVE PRICING ESTIMATOR
   ============================================================ */
const estPages = document.getElementById("estPages");
const pagesVal = document.getElementById("pagesVal");
const optSEO = document.getElementById("optSEO");
const optWA = document.getElementById("optWA");
const optDb = document.getElementById("optDb");
const optAdmin = document.getElementById("optAdmin");
const optUrgent = document.getElementById("optUrgent");
const estPrice = document.getElementById("estPrice");
const estFeaturesList = document.querySelector(".est-features-list");
const estimatorCta = document.getElementById("estimatorCta");

function calculatePrice() {
    if (!estPages) return;

    const pages = parseInt(estPages.value);
    
    // Update pages text label
    pagesVal.textContent = pages === 1 ? "1 Page" : `${pages} Pages`;

    // Pricing Model:
    // Base: 1-3 pages = ₹5,999 (Starter category equivalent base)
    // Base: 4-10 pages = ₹12,499 (Business category base)
    // Base: 11-15 pages = ₹19,999 (Custom category base)
    let basePrice = 12499;
    if (pages <= 3) {
        basePrice = 4499;
    } else if (pages > 10) {
        basePrice = 19999;
    }

    let extraSEO = optSEO.checked ? 1500 : 0;
    let extraWA = optWA.checked ? 1000 : 0;
    let extraDb = optDb.checked ? 8000 : 0;
    let extraAdmin = optAdmin.checked ? 5000 : 0;
    let extraUrgent = optUrgent.checked ? 3000 : 0;

    const totalPrice = basePrice + extraSEO + extraWA + extraDb + extraAdmin + extraUrgent;

    // Smooth counter effect for calculated price
    animateValue(estPrice, parseInt(estPrice.textContent.replace(/,/g, "")), totalPrice, 400);

    // Update list dynamically
    updateSummaryList(pages);

    // Update WhatsApp prefilled message on direct book click
    if (estimatorCta) {
        const features = [];
        if (optSEO.checked) features.push("SEO Core");
        if (optWA.checked) features.push("WhatsApp Lead Flow");
        if (optDb.checked) features.push("Java Backend");
        if (optAdmin.checked) features.push("Admin Panels");
        if (optUrgent.checked) features.push("Express Delivery");
        
        const message = encodeURIComponent(`Hi Chaitanya, I'd like to get a quote for a ${pages}-page website project with features: ${features.join(", ") || "Standard Layout"}. Estimated Price: ₹${totalPrice}.`);
        estimatorCta.href = `https://wa.me/917620085558?text=${message}`;
    }
}

function updateSummaryList(pages) {
    if (!estFeaturesList) return;
    
    let html = `
        <li><i class="fas fa-check"></i> ${pages} Responsive HTML/CSS Layouts</li>
        <li><i class="fas fa-check"></i> Standard Contact Form</li>
    `;
    if (optSEO.checked) html += `<li><i class="fas fa-check"></i> Core Technical SEO & Meta Tags</li>`;
    if (optWA.checked) html += `<li><i class="fas fa-check"></i> Direct WhatsApp Messaging Button</li>`;
    if (optDb.checked) html += `<li><i class="fas fa-check"></i> Persistent Database (MySQL/Spring Boot)</li>`;
    if (optAdmin.checked) html += `<li><i class="fas fa-check"></i> Administrator Management Panel</li>`;
    if (optUrgent.checked) html += `<li><i class="fas fa-check"></i> Guaranteed Express Delivery (&lt; 5 Days)</li>`;
    
    html += `<li><i class="fas fa-check"></i> 30 Days Post-Launch Support</li>`;
    estFeaturesList.innerHTML = html;
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString('en-IN');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Bind estimator listeners
if (estPages) {
    [estPages, optSEO, optWA, optDb, optAdmin, optUrgent].forEach(el => {
        el.addEventListener("input", calculatePrice);
    });
    calculatePrice(); // Initial trigger
}


/* ============================================================
   DYNAMIC REVIEWS SUBMISSION FOR THE SLIDER
   ============================================================ */
const starsInput = document.getElementById("starsInput");
const reviewRating = document.getElementById("reviewRating");
const testimonialForm = document.getElementById("testimonialForm");
const reviewText = document.getElementById("reviewText");
const reviewName = document.getElementById("reviewName");

if (starsInput) {
    const starIcons = starsInput.querySelectorAll("i");
    starIcons.forEach(star => {
        star.addEventListener("click", () => {
            const rating = parseInt(star.dataset.rating);
            reviewRating.value = rating;
            
            // Set active states
            starIcons.forEach(s => {
                const r = parseInt(s.dataset.rating);
                s.classList.toggle("active", r <= rating);
            });
        });
    });
}

if (testimonialForm) {
    testimonialForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const rating = parseInt(reviewRating.value);
        const text = reviewText.value.trim();
        const author = reviewName.value.trim();

        if (!text || !author) return;

        // Create new slider card element
        const newCard = document.createElement("div");
        newCard.className = "testimonial-card";
        
        let starsHTML = "";
        for (let i = 1; i <= 5; i++) {
            starsHTML += `<i class="fas fa-star" style="color: ${i <= rating ? '#FFB800' : 'var(--border)'}"></i>`;
        }

        newCard.innerHTML = `
            <div style="margin-bottom:12px">${starsHTML}</div>
            <p>${escapeHtml(text)}</p>
            <h4>— ${escapeHtml(author)}</h4>
        `;

        const slider = document.querySelector(".testimonial-slider");
        if (slider) {
            slider.appendChild(newCard);
            
            // Re-fetch all testimonial cards
            const allCards = document.querySelectorAll(".testimonial-card");
            
            // Switch view immediately to the new submission
            allCards.forEach(c => c.classList.remove("active"));
            newCard.classList.add("active");
            
            // Reset slider counter index
            testimonialIdx = allCards.length - 1;
        }

        // Show toast or replace submit button state temporarily
        const submitBtn = this.querySelector("button[type='submit']");
        const origText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<i class="fas fa-check"></i> Added!`;
        submitBtn.style.background = "var(--accent)";
        submitBtn.style.color = "#0D1117";
        submitBtn.disabled = true;

        this.reset();
        
        // Reset stars visual count
        starsInput.querySelectorAll("i").forEach(s => s.classList.add("active"));
        reviewRating.value = 5;

        setTimeout(() => {
            submitBtn.innerHTML = origText;
            submitBtn.style.background = "";
            submitBtn.style.color = "";
            submitBtn.disabled = false;
        }, 3000);
    });
}
