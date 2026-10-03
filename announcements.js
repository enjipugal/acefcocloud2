const ANNOUNCEMENTS_API =
    "https://ecoasthub.great-site.net/backend/announcements.php";

const EXAM_SCHEDULES = {

    preliminary: {
        type: "PRELIMINARY EXAMINATION",
        title: "Preliminary Examination",
        date: "August 24–25, 2026"
    },

    midterm: {
        type: "MIDTERM EXAMINATION",
        title: "Midterm Examination",
        date: "September 16–17, 2026"
    },

    semifinal: {
        type: "SEMIFINAL EXAMINATION",
        title: "Semifinal Examination",
        date: "October 7–8, 2026"
    },

    final: {
        type: "FINAL EXAMINATION",
        title: "Final Examination",
        date: "October 27–28, 2026"
    }

};

const PROGRAMS = {

    CE: {
        name: "Civil Engineering",
        years: [1, 2, 3, 4]
    },

    EE: {
        name: "Electrical Engineering",
        years: [1, 2, 3, 4]
    },

    CPE: {
        name: "Computer Engineering",
        years: [1, 2, 3, 4]
    },

    IT: {
        name: "Information Technology",
        years: [1, 2, 3, 4]
    },

    CS: {
        name: "Computer Science",
        years: [1, 2, 3, 4]
    }

};

let currentExamType = "preliminary";
let currentProgram = "CE";
let currentYear = 1;

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

        console.warn(
            "Schedule modal was not found."
        );

        return;

    }

    const examButtons =
        document.querySelectorAll(
            ".schedule-btn[data-exam]"
        );


    examButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const examType =
                button.getAttribute("data-exam");

            openScheduleModal(examType);

        });

    });

    const closeButton =
        document.getElementById("modalClose");

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeScheduleModal
        );

    }

    const closeBottom =
        document.getElementById("modalCloseBottom");

    if (closeBottom) {

        closeBottom.addEventListener(
            "click",
            closeScheduleModal
        );

    }

    const overlay =
        document.getElementById("modalOverlay");

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeScheduleModal
        );

    }

    const programTabs =
        modal.querySelectorAll(
            ".program-tab[data-program]"
        );

    programTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const program =
                tab.getAttribute("data-program");

            selectProgram(program);

        });

    });

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {

                closeScheduleModal();

            }

        }
    );

}

function openScheduleModal(examType) {

    const modal =
        document.getElementById("scheduleModal");

    if (!modal) {
        return;
    }

    const normalizedExam =
        String(examType || "")
            .trim()
            .toLowerCase();


    const schedule =
        EXAM_SCHEDULES[normalizedExam];

    if (!schedule) {

        console.warn(
            "Unknown examination type:",
            examType
        );

        return;

    }


    currentExamType =
        normalizedExam;

    currentProgram =
        "CE";

    currentYear =
        1;

    const modalType =
        document.getElementById("modalType");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDate =
        document.getElementById("modalDate");


    if (modalType) {

        modalType.textContent =
            schedule.type;

    }

    if (modalTitle) {

        modalTitle.textContent =
            schedule.title;

    }

    if (modalDate) {

        modalDate.textContent =
            schedule.date;

    }

    updateProgramTabs();
    updateProgramInformation();
    updateYearTabs();
    updateScheduleContent();

    modal.classList.add("active");
    modal.setAttribute(
        "aria-hidden",
        "false"
    );

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
    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}

function selectProgram(program) {

    if (!PROGRAMS[program]) {
        return;
    }


    currentProgram =
        program;


    currentYear =
        1;


    updateProgramTabs();
    updateProgramInformation();
    updateYearTabs();
    updateScheduleContent();

}

function updateProgramTabs() {

    const tabs =
        document.querySelectorAll(
            "#scheduleModal .program-tab[data-program]"
        );


    tabs.forEach(tab => {

        const program =
            tab.getAttribute("data-program");


        tab.classList.toggle(
            "active",
            program === currentProgram
        );

    });

}

function updateProgramInformation() {

    const program =
        PROGRAMS[currentProgram];


    if (!program) {
        return;
    }


    const programCode =
        document.getElementById(
            "programCode"
        );


    const programName =
        document.getElementById(
            "programName"
        );


    if (programCode) {

        programCode.textContent =
            currentProgram;

    }

    if (programName) {

        programName.textContent =
            program.name;

    }

}

function updateYearTabs() {

    const yearTabs =
        document.getElementById(
            "yearTabs"
        );


    if (!yearTabs) {
        return;
    }

    const program =
        PROGRAMS[currentProgram];


    if (!program) {
        return;
    }


    yearTabs.innerHTML = "";


    program.years.forEach(year => {

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "year-tab";


        if (year === currentYear) {

            button.classList.add(
                "active"
            );

        }


        button.textContent =
            `${year}${getOrdinalSuffix(year)} Year`;


        button.addEventListener(
            "click",
            () => {

                currentYear =
                    year;

                updateYearTabs();

                updateScheduleContent();

            }
        );


        yearTabs.appendChild(
            button
        );

    });

}

function updateScheduleContent() {

    const scheduleContainer =
        document.getElementById(
            "modalSchedule"
        );


    if (!scheduleContainer) {
        return;
    }


    const exam =
        EXAM_SCHEDULES[currentExamType];


    const program =
        PROGRAMS[currentProgram];


    if (!exam || !program) {
        return;
    }


    scheduleContainer.innerHTML = `

        <div class="schedule-empty">

            <div class="schedule-empty-icon">
                📅
            </div>

            <div class="schedule-empty-content">

                <span class="schedule-label">
                    ${exam.type}
                </span>

                <h4>
                    ${program.name}
                    — ${currentYear}${getOrdinalSuffix(currentYear)} Year
                </h4>

                <p>
                    ${exam.date}
                </p>

                <strong>
                    Detailed schedule to be announced.
                </strong>

            </div>

        </div>

    `;

}

function getOrdinalSuffix(number) {

    if (
        number >= 11 &&
        number <= 13
    ) {

        return "th";

    }


    switch (number % 10) {

        case 1:
            return "st";

        case 2:
            return "nd";

        case 3:
            return "rd";

        default:
            return "th";

    }

}

async function loadAnnouncementsData() {

    try {

        const response =
            await fetch(
                ANNOUNCEMENTS_API,
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
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


        if (
            result.data.length === 0
        ) {

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


        let matchedCard =
            null;

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

                    matchedCard =
                        card;

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

                    matchedCard =
                        card;

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
        card.querySelector(
            "img"
        );


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
        new Date(
            dateValue
        );


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

        observer.observe(
            element
        );

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
