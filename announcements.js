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
        name: "Civil Engineering"
    },

    EE: {
        name: "Electrical Engineering"
    },

    CPE: {
        name: "Computer Engineering"
    },

    IT: {
        name: "Information Technology"
    },

    CS: {
        name: "Computer Science"
    }

};

let currentExam =
    "preliminary";

let currentProgram =
    "CE";

let currentYear =
    1;

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "ECOAST HUB Announcements JS loaded successfully."
        );

        initializeMobileNavigation();
        initializeScheduleSystem();
        initializeRevealAnimations();

        loadAnnouncementsData();

    }
);

function initializeMobileNavigation() {

    const menuToggle =
        document.getElementById(
            "menuToggle"
        );

    const navMenu =
        document.querySelector(
            ".nav-menu"
        );

    if (
        !menuToggle ||
        !navMenu
    ) {

        return;

    }

    menuToggle.addEventListener(
        "click",
        () => {

            navMenu.classList.toggle(
                "active"
            );

            menuToggle.classList.toggle(
                "active"
            );

        }
    );

    navMenu
        .querySelectorAll(
            ".nav-link"
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        navMenu.classList.remove(
                            "active"
                        );

                        menuToggle.classList.remove(
                            "active"
                        );

                    }
                );

            }
        );

}

function initializeScheduleSystem() {

    document.addEventListener(
        "click",
        event => {

            const scheduleButton =
                event.target.closest(
                    ".schedule-btn[data-exam]"
                );


            if (scheduleButton) {

                event.preventDefault();
                event.stopPropagation();

                const exam =
                    scheduleButton.getAttribute(
                        "data-exam"
                    );


                console.log(
                    "Schedule button clicked:",
                    exam
                );


                openScheduleModal(
                    exam
                );

                return;

            }

            const closeButton =
                event.target.closest(
                    "#modalClose"
                );


            if (closeButton) {

                event.preventDefault();

                closeScheduleModal();

                return;

            }

            const bottomCloseButton =
                event.target.closest(
                    "#modalCloseBottom"
                );


            if (bottomCloseButton) {

                event.preventDefault();

                closeScheduleModal();

                return;

            }

            const overlay =
                event.target.closest(
                    "#modalOverlay"
                );


            if (overlay) {

                closeScheduleModal();

                return;

            }
            
            const programButton =
                event.target.closest(
                    ".program-tab[data-program]"
                );


            if (programButton) {

                const program =
                    programButton.getAttribute(
                        "data-program"
                    );


                selectProgram(
                    program
                );

                return;

            }

            const yearButton =
                event.target.closest(
                    "#yearTabs .year-tab"
                );

            if (yearButton) {

                const year =
                    Number(
                        yearButton.dataset.year
                    );

                if (
                    Number.isInteger(year)
                ) {

                    currentYear =
                        year;

                    updateYearTabs();
                    updateScheduleContent();

                }

                return;

            }

        }
    );
    
    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                const modal =
                    document.getElementById(
                        "scheduleModal"
                    );


                if (
                    modal &&
                    modal.classList.contains(
                        "active"
                    )
                ) {

                    closeScheduleModal();

                }

            }

        }
    );


    console.log(
        "Schedule system initialized."
    );

}

function openScheduleModal(
    examType
) {

    const modal =
        document.getElementById(
            "scheduleModal"
        );


    if (!modal) {

        console.error(
            "ERROR: #scheduleModal was not found."
        );

        return;

    }

    const normalizedExam =
        String(
            examType || ""
        )
        .trim()
        .toLowerCase();

    const exam =
        EXAM_SCHEDULES[
            normalizedExam
        ];


    if (!exam) {

        console.error(
            "ERROR: Unknown exam type:",
            examType
        );

        return;

    }

    console.log(
        "Opening schedule modal:",
        exam
    );

    currentExam =
        normalizedExam;


    currentProgram =
        "CE";

    currentYear =
        1;

    const modalType =
        document.getElementById(
            "modalType"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );


    const modalDate =
        document.getElementById(
            "modalDate"
        );


    if (modalType) {
        modalType.textContent =
            exam.type;

    }

    if (modalTitle) {
        modalTitle.textContent =
            exam.title;

    }

    if (modalDate) {
        modalDate.textContent =
            exam.date;

    }

    updateProgramTabs();
    updateProgramInformation();
    updateYearTabs();
    updateScheduleContent();

    modal.classList.add(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    modal.style.display =
        "flex";

    modal.style.visibility =
        "visible";

    modal.style.opacity =
        "1";

    modal.style.position =
        "fixed";

    modal.style.inset =
        "0";

    modal.style.zIndex =
        "99999";

    modal.style.alignItems =
        "center";

    modal.style.justifyContent =
        "center";

    document.body.classList.add(
        "modal-open"
    );

    document.body.style.overflow =
        "hidden";

    console.log(
        "Schedule modal opened."
    );

}

function closeScheduleModal() {

    const modal =
        document.getElementById(
            "scheduleModal"
        );


    if (!modal) {
        return;
    }

    modal.classList.remove(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    modal.style.display =
        "none";

    modal.style.visibility =
        "hidden";

    modal.style.opacity =
        "0";

    document.body.classList.remove(
        "modal-open"
    );

    document.body.style.overflow =
        "";

    console.log(
        "Schedule modal closed."
    );

}

function selectProgram(
    program
) {

    if (
        !PROGRAMS[program]
    ) {

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


    tabs.forEach(
        tab => {

            const program =
                tab.getAttribute(
                    "data-program"
                );


            if (
                program ===
                currentProgram
            ) {

                tab.classList.add(
                    "active"
                );

            } else {

                tab.classList.remove(
                    "active"
                );

            }

        }
    );

}

function updateProgramInformation() {

    const program =
        PROGRAMS[
            currentProgram
        ];


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


    yearTabs.innerHTML = "";


    for (
        let year = 1;
        year <= 4;
        year++
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "year-tab";


        button.dataset.year =
            String(year);


        if (
            year === currentYear
        ) {

            button.classList.add(
                "active"
            );

        }


        button.textContent =
            `${year}${getOrdinalSuffix(year)} Year`;


        yearTabs.appendChild(
            button
        );

    }

}

function updateScheduleContent() {

    const schedule =
        document.getElementById(
            "modalSchedule"
        );


    if (!schedule) {

        return;

    }


    const exam =
        EXAM_SCHEDULES[
            currentExam
        ];


    const program =
        PROGRAMS[
            currentProgram
        ];


    if (
        !exam ||
        !program
    ) {

        return;

    }


    schedule.innerHTML = `

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
                    —
                    ${currentYear}${getOrdinalSuffix(currentYear)}
                    Year
                </h4>

                <p>
                    ${exam.date}
                </p>

                <strong>
                    Detailed subject schedule,
                    room, and facilitator information
                    will be announced.
                </strong>

            </div>

        </div>

    `;

}

function getOrdinalSuffix(
    number
) {

    if (
        number >= 11 &&
        number <= 13
    ) {

        return "th";

    }


    switch (
        number % 10
    ) {

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
                    },

                    cache:
                        "no-store"
                }
            );


        if (
            !response.ok
        ) {

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
            !Array.isArray(
                result.data
            )
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
                "Announcements backend is connected but empty."
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

function applyAnnouncementsData(
    data
) {

    if (
        !Array.isArray(data) ||
        !data.length
    ) {

        return;

    }


    const cards =
        document.querySelectorAll(
            ".announcement-card, .announcement-item, .announcement"
        );


    if (!cards.length) {

        console.warn(
            "No announcement cards found."
        );

        return;

    }

    data.forEach(
        item => {

            if (!item) {
                return;
            }


            const backendId =
                normalizeText(
                    item.id
                );


            const backendTitle =
                normalizeText(
                    item.title
                );


            let matchedCard =
                null;

            if (backendId) {

                cards.forEach(
                    card => {

                        if (
                            matchedCard
                        ) {
                            return;
                        }


                        const cardId =
                            normalizeText(
                                card.dataset.id
                            );


                        if (
                            cardId &&
                            cardId ===
                            backendId
                        ) {

                            matchedCard =
                                card;

                        }

                    }
                );

            }

            if (
                !matchedCard &&
                backendTitle
            ) {

                cards.forEach(
                    card => {

                        if (
                            matchedCard
                        ) {
                            return;
                        }


                        const titleElement =
                            card.querySelector(
                                "h2, h3, h4, .announcement-title"
                            );


                        if (
                            !titleElement
                        ) {
                            return;
                        }


                        const cardTitle =
                            normalizeText(
                                titleElement.textContent
                            );


                        if (
                            cardTitle &&
                            cardTitle ===
                            backendTitle
                        ) {

                            matchedCard =
                                card;

                        }

                    }
                );

            }


            if (
                matchedCard
            ) {

                updateAnnouncementCard(
                    matchedCard,
                    item
                );

            }

        }
    );

}

function updateAnnouncementCard(
    card,
    item
) {

    const title =
        card.querySelector(
            "h2, h3, h4, .announcement-title"
        );


    if (
        title &&
        item.title
    ) {

        title.textContent =
            item.title;

    }


    const description =
        card.querySelector(
            ".announcement-description, p"
        );


    if (
        description &&
        item.description
    ) {

        description.textContent =
            item.description;

    }


    const category =
        card.querySelector(
            ".announcement-category, .category"
        );


    if (
        category &&
        item.category
    ) {

        category.textContent =
            item.category;

    }


    const date =
        card.querySelector(
            ".announcement-date, time, .date"
        );


    if (
        date &&
        item.announcement_date
    ) {

        date.textContent =
            formatAnnouncementDate(
                item.announcement_date
            );

    }


    const image =
        card.querySelector(
            "img"
        );


    if (
        image &&
        item.image
    ) {

        image.src =
            item.image;


        image.alt =
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
            month:
                "long",

            day:
                "numeric",

            year:
                "numeric"
        }
    );

}

function normalizeText(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(
        value
    )
    .trim()
    .replace(
        /\s+/g,
        " "
    )
    .toUpperCase();

}

function initializeRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".section-heading, .announcement-card, .announcement-item, .announcement, .exam-card, .cta-section"
        );


    if (
        !elements.length
    ) {

        return;

    }


    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

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

                    }
                );

            },
            {
                threshold:
                    0.12
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

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
