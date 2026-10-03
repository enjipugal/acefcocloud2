document.addEventListener("DOMContentLoaded", () => {

    const API_URL =
        "https://ecoasthub.great-site.net/backend/announcements.php";

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");

            menuToggle.classList.toggle("active");

        });
        
    }

    if (navMenu) {

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                if (menuToggle) {
                    menuToggle.classList.remove("active");
                }

            });

        });

    }

    async function loadAnnouncements() {

        try {

            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(
                    `HTTP error: ${response.status}`
                );
            }

            const result = await response.json();

            console.log("Announcements API:", result);


            if (!result.success) {

                console.error(
                    "Announcements API error:",
                    result.message || "Unknown error."
                );

                return;

            }

            if (
                !Array.isArray(result.data) ||
                result.data.length === 0
            ) {

                console.log(
                    "Announcements database is empty. Existing HTML content preserved."
                );

                return;

            }

            updateAnnouncementCards(result.data);

        } catch (error) {

            console.error(
                "Failed to load announcements:",
                error
            );

        }

    }

    function updateAnnouncementCards(announcements) {

        const cards = document.querySelectorAll(
            ".announcement-card"
        );

        if (!cards.length) {

            console.log(
                "No announcement cards found in the HTML."
            );

            return;

        }

        announcements.forEach((announcement, index) => {

            if (!cards[index]) {
                return;
            }

            const card = cards[index];

            const titleElement = card.querySelector(
                "h3"
            );

            if (
                titleElement &&
                announcement.title
            ) {

                titleElement.textContent =
                    announcement.title;

            }

            const descriptionElement =
                card.querySelector(
                    ".announcement-description"
                );

            if (
                descriptionElement &&
                announcement.description
            ) {

                descriptionElement.textContent =
                    announcement.description;

            }

            const categoryElement =
                card.querySelector(
                    ".announcement-category"
                );

            if (
                categoryElement &&
                announcement.category
            ) {

                categoryElement.textContent =
                    announcement.category;

            }

            const dateElement =
                card.querySelector(
                    ".announcement-date"
                );

            if (
                dateElement &&
                announcement.announcement_date
            ) {

                dateElement.textContent =
                    formatAnnouncementDate(
                        announcement.announcement_date
                    );

            }

            const imageElement =
                card.querySelector("img");

            if (
                imageElement &&
                announcement.image
            ) {

                imageElement.src =
                    announcement.image;

            }

        });

    }

    function formatAnnouncementDate(dateString) {

        if (!dateString) {
            return "";
        }

        const date = new Date(dateString);

        if (Number.isNaN(date.getTime())) {
            return dateString;
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

    const scheduleModal =
        document.getElementById("scheduleModal");

    const closeScheduleModal =
        document.getElementById("closeScheduleModal");

    const scheduleButtons =
        document.querySelectorAll(
            "[data-exam]"
        );

    if (scheduleButtons.length && scheduleModal) {

        scheduleButtons.forEach(button => {

            button.addEventListener("click", () => {

                const examType =
                    button.dataset.exam;

                openScheduleModal(examType);

            });

        });

    }

    function openScheduleModal(examType) {

        if (!scheduleModal) {
            return;
        }

        scheduleModal.classList.add("active");

        document.body.classList.add(
            "modal-open"
        );

        console.log(
            "Opened exam schedule:",
            examType
        );

    }


    if (closeScheduleModal) {

        closeScheduleModal.addEventListener(
            "click",
            closeSchedule
        );

    }

    if (scheduleModal) {

        scheduleModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    scheduleModal
                ) {

                    closeSchedule();

                }

            }
        );

    }

    function closeSchedule() {

        if (!scheduleModal) {
            return;
        }

        scheduleModal.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                scheduleModal &&
                scheduleModal.classList.contains(
                    "active"
                )
            ) {

                closeSchedule();

            }

        }
    );

    const revealElements =
        document.querySelectorAll(
            ".announcement-card, .exam-card, .section-title"
        );


    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

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


        revealElements.forEach(element => {

            observer.observe(element);

        });

    }

    document.querySelectorAll(
        'a[href="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

            }
        );

    });

    loadAnnouncements();

});
