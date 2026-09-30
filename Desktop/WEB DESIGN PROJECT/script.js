const header = document.querySelector("#site-header");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const navLinks = document.querySelectorAll(".primary-nav a");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector(".form-status");

if (header) {
  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealObserver = "IntersectionObserver" in window ? new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
) : null;

document.querySelectorAll(".reveal").forEach((element) => {
  if (revealObserver) {
    revealObserver.observe(element);
  } else {
    element.classList.add("visible");
  }
});

if (form && formStatus) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Thank you — your enquiry is ready to be connected with our team.";
    form.reset();
  });
}
