/* ============================================
   ABHISHA WHAVAL — PORTFOLIO SCRIPTS
   ============================================ */

// ─── TYPEWRITER ───────────────────────────────
const roles = [
  "ML models that predict.",
  "computer vision systems.",
  "agentic AI pipelines.",
  "data insights with Power BI.",
  "cloud-integrated web apps.",
  "NLP & transformer solutions."
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById("typewriter");

function typeWriter() {
  const current = roles[roleIndex];

  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 70;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeWriter, speed);
}

typeWriter();


// ─── NAVBAR SCROLL ────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ─── MOBILE MENU ──────────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });
});


// ─── SMOOTH SCROLL (offset for fixed nav) ─────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});


// ─── SCROLL FADE-IN ───────────────────────────
const fadeEls = document.querySelectorAll(
  ".skill-card, .project-card, .research-card, .timeline-item, .cert-card, .contact-card, .leadership-item, .about-grid"
);

fadeEls.forEach(el => el.classList.add("fade-in"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, 60 * (entry.target.dataset.delay || 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

fadeEls.forEach((el, i) => {
  el.dataset.delay = i % 6;
  observer.observe(el);
});


// ─── PROJECT FILTER ───────────────────────────
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      if (filter === "all" || card.dataset.cat === filter) {
        card.classList.remove("hidden");
        card.style.display = "";
      } else {
        card.classList.add("hidden");
        card.style.display = "none";
      }
    });

    // Re-apply featured span after filter
    projectCards.forEach(card => {
      if (filter !== "all" && card.classList.contains("featured") && !card.classList.contains("hidden")) {
        card.style.gridColumn = "span 1";
      } else if (card.classList.contains("featured")) {
        card.style.gridColumn = "";
      }
    });
  });
});


// ─── ACTIVE NAV HIGHLIGHT ON SCROLL ───────────
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => {
        link.style.color = "";
        if (link.getAttribute("href") === `#${id}`) {
          link.style.color = "var(--teal)";
        }
      });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(s => sectionObserver.observe(s));


// ─── STATS COUNTER ANIMATION ──────────────────
const statNums = document.querySelectorAll(".stat-num");

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const finalText = el.textContent;
      const finalNum = parseInt(finalText.replace("+", ""));
      const hasPlus = finalText.includes("+");
      let current = 0;
      const step = Math.ceil(finalNum / 30);

      const counter = setInterval(() => {
        current += step;
        if (current >= finalNum) {
          el.textContent = finalNum + (hasPlus ? "+" : "");
          clearInterval(counter);
        } else {
          el.textContent = current + (hasPlus ? "+" : "");
        }
      }, 40);

      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statsObserver.observe(el));
