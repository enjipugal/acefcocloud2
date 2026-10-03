const ANNOUNCEMENTS_API =
    "https://ecoasthub.great-site.net/backend/announcements.php";

document.addEventListener("DOMContentLoaded", () => {

    console.log("ECOAST HUB Announcements JS loaded");

    initializeMobileNavigation();
    initializeScheduleModal();
    initializeRevealAnimations();
    loadAnnouncementsData();

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

function initializeScheduleModal() {

    const modal =
        document.getElementById("scheduleModal");

    if (!modal) {
        return;
    }


    const closeButtons =
        modal.querySelectorAll(
            ".modal-close, .close-modal, [data-close-modal]"
        );

    closeButtons.forEach(button => {

        button.addEventListener("click", () => {

            closeScheduleModal();

        });

    });

    modal.addEventListener("click", event => {

        if (event.target === modal) {

            closeScheduleModal();

        }

    });

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("active")
        ) {

            closeScheduleModal();

        }

    });

    const examButtons =
        document.querySelectorAll(
            "[data-exam]"
        );


    examButtons.forEach(button => {

        button.addEventListener("click", () => {

            const exam =
                button.dataset.exam;

            openScheduleModal(exam);

        });

    });

}

function openScheduleModal(examType) {

    const modal =
        document.getElementById("scheduleModal");

    if (!modal) {
        return;
    }


    const normalizedExam =
        normalizeText(examType);

    const scheduleData = {

        PRELIMINARY: {
            title: "Preliminary Examination",
            date: "August 24–25, 2026",
            schedule: "8:00 AM – 5:00 PM"
        },

        MIDTERM: {
            title: "Midterm Examination",
            date: "September 16–17, 2026",
            schedule: "8:00 AM – 5:00 PM"
        },

        SEMIFINAL: {
            title: "Semifinal Examination",
            date: "October 7–8, 2026",
            schedule: "Schedule to be announced"
        },

        FINAL: {
            title: "Final Examination",
            date: "October 27–28, 2026",
            schedule: "Schedule to be announced"
        }

    };

    const selectedSchedule =
        scheduleData[normalizedExam];


    if (!selectedSchedule) {
        return;
    }


    const titleElement =
        modal.querySelector(
            "#modalExamTitle, .modal-exam-title, .exam-title"
        );

    const dateElement =
        modal.querySelector(
            "#modalExamDate, .modal-exam-date, .exam-date"
        );


    const scheduleElement =
        modal.querySelector(
            "#modalExamSchedule, .modal-exam-schedule, .exam-schedule"
        );

    if (titleElement) {

        titleElement.textContent =
            selectedSchedule.title;

    }

    if (dateElement) {

        dateElement.textContent =
            selectedSchedule.date;

    }

    if (scheduleElement) {

        scheduleElement.textContent =
            selectedSchedule.schedule;

    }

    modal.classList.add("active");

    document.body.classList.add(
        "modal-open"
    );

}

function closeScheduleModal() {

    const modal =
        document.getElementById("scheduleModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

    document.body.classList.remove(
        "modal-open"
    );

}

async function loadAnnouncementsData() {

    try {

        const response =
            await fetch(
                ANNOUNCEMENTS_API,
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }

        const result =
            await response.json();


        console.log(
            "Announcements backend response:",
            result
        );

        if (
            !result ||
            result.success !== true ||
            !Array.isArray(result.data)
        ) {

            console.warn(
                "Announcements backend returned no usable data."
            );

            return;

        }

        if (result.data.length === 0) {

            console.log(
                "Announcements backend is connected but currently empty. Existing HTML announcements will remain visible."
            );

            return;

        }

        applyAnnouncementsData(
            result.data
        );

    } catch (error) {

        console.warn(
            "Announcements API could not be loaded. Existing HTML announcements will remain visible.",
            error
        );

    }

}

function applyAnnouncementsData(data) {

    if (
        !Array.isArray(data) ||
        !data.length
    ) {

        return;

    }

    const announcementCards =
        document.querySelectorAll(
            ".announcement-card, .announcement-item, .announcement"
        );


    if (!announcementCards.length) {

        console.warn(
            "No announcement card elements were found in announcements.html."
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

            announcementCards.forEach(card => {

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

        if (
            !matchedCard &&
            backendTitle
        ) {

            announcementCards.forEach(card => {

                if (matchedCard) {
                    return;
                }


                const titleElement =
                    card.querySelector(
                        "h2, h3, h4, .announcement-title"
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


        updateAnnouncementCard(
            matchedCard,
            item
        );

    });


    console.log(
        `Applied ${data.length} announcement record(s) from backend.`
    );

}

function updateAnnouncementCard(
    card,
    item
) {

    const titleElement =
        card.querySelector(
            "h2, h3, h4, .announcement-title"
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
            ".announcement-description, p"
        );


    if (
        descriptionElement &&
        item.description
    ) {

        descriptionElement.textContent =
            item.description;

    }

    const categoryElement =
        card.querySelector(
            ".announcement-category, .category"
        );


    if (
        categoryElement &&
        item.category
    ) {

        categoryElement.textContent =
            item.category;

    }

    const dateElement =
        card.querySelector(
            ".announcement-date, time, .date"
        );


    if (
        dateElement &&
        item.announcement_date
    ) {

        dateElement.textContent =
            formatAnnouncementDate(
                item.announcement_date
            );

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
            item.title ||
            "ECOAST Announcement";

    }

}

function formatAnnouncementDate(
    dateValue
) {

    if (!dateValue) {
        return "";
    }


    const date =
        new Date(dateValue);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

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
            ".section-heading, .announcement-card, .announcement-item, .announcement, .exam-card, .cta-section"
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
            "ECOAST Announcements page error:",
            event.message
        );

    }
);
