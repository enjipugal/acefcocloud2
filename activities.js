const ACTIVITIES_API =
    "https://ecoasthub.great-site.net/backend/activities.php";

document.addEventListener("DOMContentLoaded", () => {

    console.log("ECOAST HUB Activities JS loaded");

    initializeMobileNavigation();
    initializeRevealAnimations();
    loadActivitiesData();

});

function initializeMobileNavigation() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.querySelector(".nav-menu");

    if (!menuToggle || !navMenu) {
        return;
    }

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");

    });


    const navLinks =
        navMenu.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuToggle.classList.remove("active");

        });

    });

}

async function loadActivitiesData() {

    try {

        const response =
            await fetch(ACTIVITIES_API, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }

        const result =
            await response.json();


        console.log(
            "Activities backend response:",
            result
        );


        if (
            !result ||
            result.success !== true ||
            !Array.isArray(result.data)
        ) {

            console.warn(
                "Activities backend returned no usable data."
            );

            return;

        }

        if (result.data.length === 0) {

            console.log(
                "Activities backend is connected but currently empty. Existing HTML activities will remain visible."
            );

            return;

        }

        applyActivitiesData(result.data);


    } catch (error) {

        console.warn(
            "Activities API could not be loaded. Existing HTML activities will remain visible.",
            error
        );

    }

}

function applyActivitiesData(data) {

    if (!Array.isArray(data) || !data.length) {
        return;
    }

    const activityCards =
        document.querySelectorAll(
            ".activity-card"
        );


    if (!activityCards.length) {

        console.warn(
            "No .activity-card elements were found in activities.html."
        );

        return;

    }

    data.forEach(item => {

        if (!item) {
            return;
        }


        const backendId =
            normalizeText(item.id);

        const backendTitle =
            normalizeText(item.title);


        let matchedCard = null;

        if (backendId) {

            activityCards.forEach(card => {

                if (matchedCard) {
                    return;
                }


                const cardId =
                    normalizeText(
                        card.dataset.id
                    );


                if (
                    cardId &&
                    cardId === backendId
                ) {

                    matchedCard = card;

                }

            });

        }

        if (!matchedCard && backendTitle) {

            activityCards.forEach(card => {

                if (matchedCard) {
                    return;
                }

                const titleElement =
                    card.querySelector(
                        "h2, h3, h4, .activity-title"
                    );


                if (!titleElement) {
                    return;
                }


                const cardTitle =
                    normalizeText(
                        titleElement.textContent
                    );


                if (
                    cardTitle &&
                    cardTitle === backendTitle
                ) {

                    matchedCard = card;

                }

            });

        }

        if (!matchedCard) {
            return;
        }


        updateActivityCard(
            matchedCard,
            item
        );

    });


    console.log(
        `Applied ${data.length} activity record(s) from backend.`
    );

}

function updateActivityCard(card, item) {

    const titleElement =
        card.querySelector(
            "h2, h3, h4, .activity-title"
        );


    if (
        titleElement &&
        item.title
    ) {

        titleElement.textContent =
            item.title;

    }

    const descriptionElement =
        card.querySelector(
            ".activity-description, p"
        );


    if (
        descriptionElement &&
        item.description
    ) {

        descriptionElement.textContent =
            item.description;

    }

    const imageElement =
        card.querySelector("img");


    if (
        imageElement &&
        item.image
    ) {

        imageElement.src =
            item.image;

        imageElement.alt =
            item.title || "ECOAST Activity";

    }

    const dateElement =
        card.querySelector(
            ".activity-date, time, .date"
        );


    if (
        dateElement &&
        item.activity_date
    ) {

        dateElement.textContent =
            formatActivityDate(
                item.activity_date
            );

    }

    const locationElement =
        card.querySelector(
            ".activity-location, .location"
        );


    if (
        locationElement &&
        item.location
    ) {

        locationElement.textContent =
            item.location;

    }

    const organizerElement =
        card.querySelector(
            ".activity-organizer, .organizer"
        );


    if (
        organizerElement &&
        item.organizer
    ) {

        organizerElement.textContent =
            item.organizer;

    }

    const achievementElement =
        card.querySelector(
            ".activity-achievement, .achievement"
        );


    if (
        achievementElement &&
        item.achievement
    ) {

        achievementElement.textContent =
            item.achievement;

    }

}

function formatActivityDate(dateValue) {

    if (!dateValue) {
        return "";
    }


    const date =
        new Date(dateValue);


    if (Number.isNaN(date.getTime())) {

        return dateValue;

    }

    return date.toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );

}

function normalizeText(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .trim()
        .replace(/\s+/g, " ")
        .toUpperCase();

}

function initializeRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".section-heading, .activity-card, .activity-item, .activities-section, .cta-section"
        );


    if (!elements.length) {
        return;
    }

    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        elements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

        return;

    }

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}

document.addEventListener(
    "click",
    event => {

        const link =
            event.target.closest(
                "a[href='#']"
            );


        if (!link) {
            return;
        }


        event.preventDefault();

    }
);

window.addEventListener(
    "error",
    event => {

        console.warn(
            "ECOAST Activities page error:",
            event.message
        );

    }
);
