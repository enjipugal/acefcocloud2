const programs = {

    CE: {
        name: "Civil Engineering",
        years: 4
    },

    EE: {
        name: "Electrical Engineering",
        years: 4
    },

    CPE: {
        name: "Computer Engineering",
        years: 4
    },

    IT: {
        name: "Information Technology",
        years: 3
    },

    CS: {
        name: "Computer Science",
        years: 3
    }

};

const exams = {

    preliminary: {
        type: "PRELIMINARY EXAMINATION",
        title: "Preliminary Examination",
        dates: [
            "August 19, 2026",
            "August 20, 2026"
        ]
    },

    midterm: {
        type: "MIDTERM EXAMINATION",
        title: "Midterm Examination",
        dates: [
            "September 16, 2026",
            "September 17, 2026"
        ]
    },

    semifinal: {
        type: "SEMIFINAL EXAMINATION",
        title: "Semifinal Examination",
        dates: [
            "October 7, 2026",
            "October 8, 2026"
        ]
    },

    final: {
        type: "FINAL EXAMINATION",
        title: "Final Examination",
        dates: [
            "October 27, 2026",
            "October 28, 2026"
        ]
    }

};

let currentExam = "preliminary";
let currentProgram = "CE";
let currentYear = 1;


const scheduleModal = document.getElementById("scheduleModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

const modalCloseBottom =
    document.getElementById("modalCloseBottom");

const modalType =
    document.getElementById("modalType");

const modalTitle =
    document.getElementById("modalTitle");

const modalDate =
    document.getElementById("modalDate");

const programCode =
    document.getElementById("programCode");

const programName =
    document.getElementById("programName");

const yearTabs =
    document.getElementById("yearTabs");

const modalSchedule =
    document.getElementById("modalSchedule");

const programTabs =
    document.querySelectorAll(".program-tab");

const scheduleButtons =
    document.querySelectorAll(".schedule-btn");

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.querySelector(".nav-menu");


if (scheduleModal) {

    initializeScheduleSystem();

}

function initializeScheduleSystem() {

    setupScheduleButtons();

    setupModalButtons();

    setupProgramTabs();

    setupMobileMenu();

    updateProgramInterface();

}


function setupScheduleButtons() {

    scheduleButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedExam =
                button.dataset.exam;

            if (!exams[selectedExam]) {
                return;
            }

            currentExam = selectedExam;

            openScheduleModal();

        });

    });

}

function openScheduleModal() {

    const exam = exams[currentExam];

    if (!exam) {
        return;
    }


    modalType.textContent =
        exam.type;

    modalTitle.textContent =
        exam.title;

    modalDate.textContent =
        formatDateRange(exam.dates);


    updateProgramInterface();


    scheduleModal.classList.add("show");

    scheduleModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );

}

function closeScheduleModal() {

    scheduleModal.classList.remove("show");

    scheduleModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}

function setupModalButtons() {

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeScheduleModal
        );

    }


    if (modalCloseBottom) {

        modalCloseBottom.addEventListener(
            "click",
            closeScheduleModal
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeScheduleModal
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                scheduleModal.classList.contains("show")
            ) {

                closeScheduleModal();

            }

        }
    );

}

function setupProgramTabs() {

    programTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const selectedProgram =
                tab.dataset.program;

            if (!programs[selectedProgram]) {
                return;
            }


            currentProgram =
                selectedProgram;

            currentYear = 1;


            programTabs.forEach(
                programTab => {

                    programTab.classList.remove(
                        "active"
                    );

                }
            );


            tab.classList.add("active");


            updateProgramInterface();

        });

    });

}

function updateProgramInterface() {

    const program =
        programs[currentProgram];

    if (!program) {
        return;
    }


    if (programCode) {

        programCode.textContent =
            currentProgram;

    }


    if (programName) {

        programName.textContent =
            program.name;

    }


    updateYearTabs(
        program.years
    );

    renderSchedule();

}

function updateYearTabs(numberOfYears) {

    if (!yearTabs) {
        return;
    }


    yearTabs.innerHTML = "";


    for (
        let year = 1;
        year <= numberOfYears;
        year++
    ) {

        const button =
            document.createElement("button");


        button.type = "button";

        button.className =
            "year-tab";


        button.dataset.year =
            year;


        button.textContent =
            getYearLabel(year);


        if (year === currentYear) {

            button.classList.add(
                "active"
            );

        }


        button.addEventListener(
            "click",
            () => {

                currentYear = year;

                updateYearTabs(
                    numberOfYears
                );

                renderSchedule();

            }
        );


        yearTabs.appendChild(
            button
        );

    }

}

function getYearLabel(year) {

    if (year === 1) {
        return "1st Year";
    }

    if (year === 2) {
        return "2nd Year";
    }

    if (year === 3) {
        return "3rd Year";
    }

    return "4th Year";

}

function renderSchedule() {

    if (!modalSchedule) {
        return;
    }


    const exam =
        exams[currentExam];

    if (!exam) {
        return;
    }


    modalSchedule.innerHTML = "";


    exam.dates.forEach(
        date => {

            const dateBlock =
                createDateSchedule(
                    date
                );


            modalSchedule.appendChild(
                dateBlock
            );

        }
    );

}

function createDateSchedule(date) {

    const wrapper =
        document.createElement("div");


    wrapper.className =
        "date-schedule";

    const dateHeading =
        document.createElement("div");


    dateHeading.className =
        "date-heading";


    const dateText =
        document.createElement("span");


    dateText.textContent =
        date.toUpperCase();


    dateHeading.appendChild(
        dateText
    );


    wrapper.appendChild(
        dateHeading
    );


    const table =
        document.createElement("div");


    table.className =
        "schedule-table";

    const header =
        createScheduleRow(
            "TIME",
            "SUBJECT",
            "ROOM",
            "FACILITATOR",
            true
        );


    table.appendChild(
        header
    );


    const rows =
        createPlaceholderRows();


    rows.forEach(
        row => {

            table.appendChild(
                row
            );

        }
    );


    wrapper.appendChild(
        table
    );


    return wrapper;

}

function createScheduleRow(
    time,
    subject,
    room,
    facilitator,
    isHeader = false
) {

    const row =
        document.createElement("div");


    row.className =
        "schedule-row";


    if (isHeader) {

        row.classList.add(
            "schedule-head"
        );

    }


    const timeCell =
        document.createElement("div");

    const subjectCell =
        document.createElement("div");

    const roomCell =
        document.createElement("div");

    const facilitatorCell =
        document.createElement("div");


    timeCell.textContent =
        time;

    subjectCell.textContent =
        subject;

    roomCell.textContent =
        room;

    facilitatorCell.textContent =
        facilitator;


    row.appendChild(
        timeCell
    );

    row.appendChild(
        subjectCell
    );

    row.appendChild(
        roomCell
    );

    row.appendChild(
        facilitatorCell
    );


    return row;

}

function createPlaceholderRows() {

    const rows = [];

    rows.push(
        createScheduleRow(
            "TO FOLLOW",
            "Subject to Follow",
            "TO FOLLOW",
            "TO FOLLOW"
        )
    );


    rows.push(
        createScheduleRow(
            "TO FOLLOW",
            "Subject to Follow",
            "TO FOLLOW",
            "TO FOLLOW"
        )
    );


    rows.push(
        createScheduleRow(
            "TO FOLLOW",
            "Subject to Follow",
            "TO FOLLOW",
            "TO FOLLOW"
        )
    );


    return rows;

}

function formatDateRange(dates) {

    if (!dates || dates.length === 0) {
        return "";
    }


    if (dates.length === 1) {
        return dates[0];
    }


    const firstDate =
        dates[0];

    const lastDate =
        dates[dates.length - 1];


    const first =
        new Date(firstDate);

    const last =
        new Date(lastDate);


    const firstMonth =
        first.toLocaleString(
            "en-US",
            {
                month: "long"
            }
        );


    const lastMonth =
        last.toLocaleString(
            "en-US",
            {
                month: "long"
            }
        );


    const firstDay =
        first.getDate();

    const lastDay =
        last.getDate();


    const year =
        last.getFullYear();


    if (firstMonth === lastMonth) {

        return `${firstMonth} ${firstDay}–${lastDay}, ${year}`;

    }


    return `${firstMonth} ${firstDay} – ${lastMonth} ${lastDay}, ${year}`;

}

function setupMobileMenu() {

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
                "open"
            );

            menuToggle.classList.toggle(
                "active"
            );

        }
    );


    const navLinks =
        navMenu.querySelectorAll(
            ".nav-link"
        );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navMenu.classList.remove(
                    "open"
                );

                menuToggle.classList.remove(
                    "active"
                );

            }
        );

    });

}

function setActiveNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (
            href &&
            href === currentPage
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


setActiveNavigation();

document
    .querySelectorAll('a[href="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

            }
        );

    });

document.documentElement.style.scrollBehavior =
    "smooth";