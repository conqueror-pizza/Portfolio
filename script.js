/* ===== REMOVE MENU ON LINK CLICK (for mobile, optional) ===== */
const navLinks = document.querySelectorAll("header nav a");
let isManualScroll = false; // flag to prevent scrollActive from interfering during smooth scroll

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault(); // prevent default jump
    document.querySelector("header").classList.remove("menu-open");

    const targetId = link.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);
    const headerOffset = 60; // adjust if header height changes
    const elementPosition = targetSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    // Remove active from all links and add to clicked
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // Disable scrollActive until smooth scroll finishes
    isManualScroll = true;

    // Smooth scroll
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });

    // Monitor scroll until it reaches the target
    const checkIfScrolled = () => {
      const currentScroll = window.scrollY;
      if (Math.abs(currentScroll - offsetPosition) < 2) {
        // Reached destination
        isManualScroll = false;
      } else {
        requestAnimationFrame(checkIfScrolled);
      }
    };
    requestAnimationFrame(checkIfScrolled);
  });
});

/* ===== SCROLL SECTIONS ACTIVE LINK ===== */
const sections = document.querySelectorAll("section");

const scrollActive = () => {
  if (isManualScroll) return; // skip while smooth scroll in progress

  const scrollY = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 60; // match header offset
    const sectionId = current.getAttribute("id");

    const link = document.querySelector(`header nav a[href='#${sectionId}']`);
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/* ===== SCROLL REVEAL ANIMATION ===== */
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
});

// Home
sr.reveal(".home-img, .home-content");
sr.reveal(".social-icons, .btn", { delay: 400 });

// Education
sr.reveal(".edu-title", { origin: "top", delay: 200, distance: "50px", duration: 1000, easing: "ease-in-out" });
sr.reveal(".edu-card", { origin: "bottom", delay: 400, distance: "50px", duration: 1000, easing: "ease-in-out", interval: 200 });

// Skills
sr.reveal("#skills .skills-title", { origin: "top", delay: 200, distance: "50px", duration: 1000, easing: "ease-in-out" });
sr.reveal("#skills .skill", { origin: "left", delay: 400, distance: "50px", duration: 1000, easing: "ease-in-out", interval: 200 });

/* ===== SKILL BARS FILL ANIMATION ===== */
document.addEventListener("DOMContentLoaded", () => {
  const skillsSection = document.querySelector("#skills");
  const skillLevels = document.querySelectorAll(".skill-level");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillLevels.forEach(level => {
          const value = level.getAttribute("data-skill");
          requestAnimationFrame(() => {
            level.style.width = value + "%";
          });
        });
        observer.unobserve(skillsSection); // run only once
      }
    });
  }, { threshold: 0.3 });

  observer.observe(skillsSection);
});

/* ===== LOGO HIDE/SHOW ON SCROLL ===== */
const logo = document.querySelector(".logo");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) logo.classList.add("hidden");
  else logo.classList.remove("hidden");
});

// Projects
sr.reveal("#projects .proj-title", { origin: "top", delay: 200, distance: "50px", duration: 1000, easing: "ease-in-out" });
sr.reveal("#projects .proj-card", { origin: "bottom", delay: 400, distance: "50px", duration: 1000, easing: "ease-in-out", interval: 200 });

/* ===== PROJECT MODAL ===== */
const modal = document.getElementById("project-modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.getElementsByClassName("close")[0];

const projCards = document.querySelectorAll(".proj-card");

projCards.forEach(card => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.textContent = card.querySelector("h3").textContent;
    modalImg.style.transform = "scale(0.8)";
    setTimeout(() => { modalImg.style.transform = "scale(1)"; }, 10);
  });
});

closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
modal.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });
