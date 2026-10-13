// =========================================
// DRIVEPNG RENTALS
// PHASE 6 - MOBILE NAVIGATION
// =========================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function setMenuOpen(isOpen) {
    navLinks.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
}

menuToggle.addEventListener("click", function () {
    setMenuOpen(!navLinks.classList.contains("active"));
});

const sectionLinks = Array.from(navLinks.querySelectorAll('a[href^="#"]'));
const linkedSections = sectionLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

function setActiveSection(sectionId) {
    sectionLinks.forEach(link => {
        if (link.getAttribute("href") === `#${sectionId}`) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

sectionLinks.forEach(link => {
    link.addEventListener("click", function () {
        setMenuOpen(false);
        setActiveSection(link.getAttribute("href").slice(1));
    });
});

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
        const visibleSection = entries
            .filter(entry => entry.isIntersecting)
            .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleSection) {
            setActiveSection(visibleSection.target.id);
        }
    }, {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    linkedSections.forEach(section => sectionObserver.observe(section));
}
