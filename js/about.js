document.addEventListener("DOMContentLoaded", () => {
    const teamCards = document.querySelectorAll("[data-team-card]");

    teamCards.forEach((card) => {
        const button = card.querySelector("button");
        const details = card.querySelector(".team-card__details");

        if (!button || !details) return;

        button.addEventListener("click", () => {
            const isOpen = button.getAttribute("aria-expanded") === "true";

            button.setAttribute("aria-expanded", String(!isOpen));
            details.hidden = isOpen;
            button.textContent = isOpen ? "View profile" : "Hide profile";
        });
    });
});
