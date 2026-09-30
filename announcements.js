/* =========================================================
   ECOAST HUB
   ANNOUNCEMENTS.JS
   Examination Schedule
========================================================= */


/* =========================================================
   NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("open");
        menuToggle.classList.toggle("open");

    });


    document.querySelectorAll(".nav-link").forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("open");
            menuToggle.classList.remove("open");

        });

    });

}



/* =========================================================
   EXAMINATION INFORMATION
========================================================= */

const examInformation = {

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



/* =========================================================
   OFFICIAL EXAMINATION MATRIX

   PRELIMINARY AND MIDTERM USE THE SAME MATRIX
========================================================= */

const examinationMatrix = {

    /* =====================================================
       FIRST YEAR
    ====================================================== */

    first: [

        {
            time: "8:30 - 9:30",
            course: "UNDERSTANDING THE SELF",
            section: "BSIT 1A",
            room: "SB 305",
            students: "39",
            proctor: "ENGR. CHRISTOPHER SORIANO"
        },

        {
            time: "8:30 - 9:30",
            course: "UNDERSTANDING THE SELF",
            section: "BSIT 1B",
            room: "AB 220",
            students: "40",
            proctor: "ENGR. KIM URBIZTONDO"
        },

        {
            time: "8:30 - 9:30",
            course: "UNDERSTANDING THE SELF",
            section: "BSIT 1C / BSCS 1A / BSIT IRREG / BSCS 1 IRREG",
            room: "AB 215",
            students: "9 / 3 / 4 / 1",
            proctor: "MR. JERWIN CATAMBING"
        },

        {
            time: "8:30 - 9:30",
            course: "UNDERSTANDING THE SELF",
            section: "BSCE 1A",
            room: "AB 216",
            students: "40",
            proctor: "MS. ARMIE VALENCIA"
        },

        {
            time: "8:30 - 9:30",
            course: "UNDERSTANDING THE SELF",
            section: "BSCE 1B / BSCPE 1A / BSCPE 1IRREG",
            room: "AB 217",
            students: "16 / 11 / 1",
            proctor: "ENGR. DAISY FUERTES"
        },

        {
            time: "8:30 - 9:30",
            course: "UNDERSTANDING THE SELF",
            section: "BSEE 1A / BSEE 1IRREG",
            room: "AB 218",
            students: "33 / 2",
            proctor: "ENGR. JULIUS AQUINO"
        },

        {
            time: "9:30 - 9:45",
            course: "BREAK",
            section: "—",
            room: "—",
            students: "—",
            proctor: "—",
            break: true
        },

        {
            time: "9:45 - 10:45",
            course: "Purposive Communication",
            section: "BSIT 1A",
            room: "SB 305",
            students: "39",
            proctor: "ENGR. CHRISTOPHER SORIANO"
        },

        {
            time: "9:45 - 10:45",
            course: "Purposive Communication",
            section: "BSIT 1B",
            room: "AB 220",
            students: "40",
            proctor: "ENGR. JAY-R GALWARDO"
        },

        {
            time: "9:45 - 10:45",
            course: "Purposive Communication",
            section: "BSIT 1C / BSCS 1A / BSIT IRREG / BSCS 1 IRREG",
            room: "AB 215",
            students: "9 / 3 / 4 / 1",
            proctor: "MR. JERWIN CATAMBING"
        },

        {
            time: "9:45 - 10:45",
            course: "Purposive Communication",
            section: "BSCE 1A",
            room: "AB 216",
            students: "40",
            proctor: "MS. ARMIE VALENCIA"
        },

        {
            time: "9:45 - 10:45",
            course: "Purposive Communication",
            section: "BSCE 1B / BSCPE 1A / BSCPE 1IRREG",
            room: "AB 217",
            students: "16 / 11 / 1",
            proctor: "ENGR. DAISY FUERTES"
        },

        {
            time: "9:45 - 10:45",
            course: "Purposive Communication",
            section: "BSEE 1A / BSEE 1IRREG",
            room: "AB 218",
            students: "33 / 2",
            proctor: "ENGR. JULIUS AQUINO"
        },

        {
            time: "10:45 - 11:00",
            course: "--BREAK--",
            section: "—",
            room: "—",
            students: "—",
            proctor: "—",
            break: true
        },

        {
            time: "11:00 - 12:00",
            course: "BASIC ENGINEERING MATHEMATICS",
            section: "BSCE 1A",
            room: "AB 216",
            students: "40",
            proctor: "MS. MICHELLE GARCIA"
        },

        {
            time: "11:00 - 12:00",
            course: "BASIC ENGINEERING MATHEMATICS",
            section: "BSCE 1B / BSCPE 1A / BSCPE 1IRREG",
            room: "AB 217",
            students: "16 / 11 / 1",
            proctor: "ENGR. KIM URBIZTONDO"
        },

        {
            time: "11:00 - 12:00",
            course: "BASIC ENGINEERING MATHEMATICS",
            section: "BSEE 1A / BSEE 1IRREG",
            room: "AB 218",
            students: "33 / 2",
            proctor: "ENGR. DAISY FUERTES"
        },

        {
            time: "11:00 - 12:00",
            course: "INTRODUCTION TO COMPUTING",
            section: "BSIT 1A",
            room: "SB 305",
            students: "39",
            proctor: "ENGR. JAY-R GALWARDO"
        },

        {
            time: "11:00 - 12:00",
            course: "INTRODUCTION TO COMPUTING",
            section: "BSIT 1B",
            room: "AB 220",
            students: "40",
            proctor: "ENGR. KIM URBIZTONDO"
        },

        {
            time: "11:00 - 12:00",
            course: "INTRODUCTION TO COMPUTING",
            section: "BSIT 1C / IRREG / BSCS1",
            room: "AB 215",
            students: "22",
            proctor: "MR. JERWIN CATAMBING"
        },

        {
            time: "12:00 - 1:00",
            course: "--BREAK--",
            section: "—",
            room: "—",
            students: "—",
            proctor: "—",
            break: true
        },

        {
            time: "1:30 - 2:30",
            course: "Computer Engineering as a Discipline",
            section: "BSCPE 1A / BSCPE 1IRREG",
            room: "AB 216",
            students: "—",
            proctor: "ENGR. JULIUS AQUINO"
        },

        {
            time: "2:30 - 2:45",
            course: "--BREAK--",
            section: "—",
            room: "—",
            students: "—",
            proctor: "—",
            break: true
        },

        {
            time: "2:45 - 3:45",
            course: "CHEMISTRY FOR ENGINEERS",
            section: "BSCE 1A",
            room: "AB 216",
            students: "40",
            proctor: "MS. MICHELLE GARCIA"
        },

        {
            time: "2:45 - 3:45",
            course: "CHEMISTRY FOR ENGINEERS",
            section: "BSCE 1B / BSCE 1IRREG",
            room: "AB 217",
            students: "—",
            proctor: "ENGR. CHRISTOPHER SORIANO"
        }

    ],



    /* =====================================================
       SECOND YEAR
    ====================================================== */

    second: [

        {
            time: "8:30 - 9:30",
            course: "Physical Activities Toward Health and Fitness 3 (PHF 243)",
            section: "BSIT 2A",
            room: "SB 305",
            students: "—",
            proctor: "ENGR. JULIUS AQUINO"
        },

        {
            time: "8:30 - 9:30",
            course: "Physical Activities Toward Health and Fitness 3 (PHF 243)",
            section: "BSIT 2B",
            room: "AB 220",
            students: "—",
            proctor: "ENGR. KIM URBIZTONDO"
        },

        {
            time: "8:30 - 9:30",
            course: "Physical Activities Toward Health and Fitness 3 (PHF 243)",
            section: "BSIT 2RREG",
            room: "AB 215",
            students: "—",
            proctor: "MR. JERWIN CATAMBING"
        },

        {
            time: "8:30 - 9:30",
            course: "Physical Activities Toward Health and Fitness 3 (PHF 243)",
            section: "BSCE 2 (REG/IRREG)",
            room: "AB 216",
            students: "—",
            proctor: "MS. ARMIE VALENCIA"
        },

        {
            time: "8:30 - 9:30",
            course: "Physical Activities Toward Health and Fitness 3 (PHF 243)",
            section: "BSEE 2 (REG/IRREG)",
            room: "AB 217",
            students: "—",
            proctor: "ENGR. DAISY FUERTES"
        },

        {
            time: "8:30 - 9:30",
            course: "Physical Activities Toward Health and Fitness 3 (PHF 243)",
            section: "BSCPE 2 (REG/IRREG)",
            room: "—",
            students: "—",
            proctor: "—"
        },

        {
            time: "9:30 - 9:45",
            course: "BREAK",
            section: "—",
            room: "—",
            students: "—",
            proctor: "—",
            break: true
        },

        {
            time: "9:45 - 10:45",
            course: "Networking",
            section: "BSIT 2A",
            room: "AB 215",
            students: "—",
            proctor: "ENGR. JAY-R GALWARDO"
        },

        {
            time: "9:45 - 10:45",
            course: "Networking",
            section: "BSIT 2B & IRREG",
            room: "AB 216",
            students: "—",
            proctor: "ENGR. KIM URBIZTONDO"
        },

        {
            time: "9:45 - 10:45",
            course: "FUNDAMENTALS OF ELECTRONIC CIRCUITS / ELECTROMAGNETICS",
            section: "BSCPE 2 / BSEE 2",
            room: "AB 218",
            students: "—",
            proctor: "MR. JERWIN CATAMBING"
        },

        {
            time: "9:45 - 10:45",
            course: "BUILDING SYSTEMS DESIGN",
            section: "BSCE 2 (REG/IRREG)",
            room: "AB 216",
            students: "—",
            proctor: "MS. ARMIE VALENCIA"
        },

        {
            time: "9:45 - 10:45",
            course: "BUILDING SYSTEMS DESIGN",
            section: "BSEE 2 (REG/IRREG)",
            room: "AB 217",
            students: "—",
            proctor: "ENGR. DAISY FUERTES"
        },

        {
            time: "9:45 - 10:45",
            course: "BUILDING SYSTEMS DESIGN",
            section: "BSCPE 2 (REG/IRREG)",
            room: "—",
            students: "—",
            proctor: "—"
        },

        {
            time: "10:45 - 11:00",
            course: "--BREAK--",
            section: "—",
            room: "—",
            students: "—",
            proctor: "—",
            break: true
        },

        {
            time: "11:00 - 12:00",
            course: "WEB SYSTEMS AND DEVELOPMENT",
            section: "BSIT 2A / BSIT 2B / BSIT 2IRREG",
            room: "SB 305",
            students: "—",
            proctor: "ENGR. KIM URBIZTONDO"
        },

        {
            time: "11:00 - 12:00",
            course: "ELECTRICAL CIRCUITS II",
            section: "—",
            room: "—",
            students: "—",
            proctor: "MS. MICHELLE GARCIA"
        },

        {
            time: "12:00 - 1:00",
            course: "--BREAK--",
            section: "—",
            room: "—",
            students: "—",
            proctor: "—",
            break: true
        },

        {
            time: "1:30 - 2:30",
            course: "DIFFERENTIAL EQUATIONS",
            section: "BSCE 2",
            room: "AB 220",
            students: "—",
            proctor: "ENGR. DAISY FUERTES"
        },

        {
            time: "1:30 - 2:30",
            course: "DIFFERENTIAL EQUATIONS",
            section: "BSCPE 2",
            room: "AB 217",
            students: "—",
            proctor: "MR. JERWIN CATAMBING"
        },

        {
            time: "1:30 - 2:30",
            course: "DIFFERENTIAL EQUATIONS",
            section: "BSEE 2",
            room: "—",
            students: "—",
            proctor: "—"
        },

        {
            time: "2:45 - 3:45",
            course: "OBJECT ORIENTED PROGRAMMING / MANAGEMENT OF ENGINEERING PROJECTS",
            section: "BSCPE 2 / BSEE 4",
            room: "COM LAB 2",
            students: "—",
            proctor: "MR. JERWIN CATAMBING"
        },

        {
            time: "2:45 - 3:45",
            course: "STATICS OF RIGID BODIES",
            section: "BSCE 2",
            room: "AB 216",
            students: "—",
            proctor: "ENGR. JAY-R GALWARDO"
        },

        {
            time: "2:45 - 3:45",
            course: "STATICS OF RIGID BODIES",
            section: "—",
            room: "AB 217",
            students: "—",
            proctor: "ENGR. KIM URBIZTONDO"
        },

        {
            time: "2:45 - 3:45",
            course: "STATICS OF RIGID BODIES",
            section: "BSEE 2",
            room: "AB 215",
            students: "—",
            proctor: "—"
        }

    ],



    /* =====================================================
       THIRD YEAR
    ====================================================== */

    third: [

        {
            time: "8:30 - 9:30",
            course: "Cloud Computing in Web Development 2 / BASIC OCCUPATIONAL SAFETY AND HEALTH / HIGH VOLTAGE DC OR U/G CABLE DESIGN",
            section: "BSIT 3A, 3B and Irreg / BSEE 3 / BSEE 4",
            room: "MULTIMEDIA ROOM",
            students: "61",
            proctor: "ENGR. CHRISTOPHER SORIANO"
        },

        {
            time: "8:30 - 9:30",
            course: "CONSTRUCTION MATERIALS AND TESTING LEC",
            section: "BSCE 3",
            room: "COMPUTER LABORATORY 2",
            students: "—",
            proctor: "ENGR. JAY-R GALWARDO"
        },

        {
            time: "9:30 - 9:45",
            course: "BREAK",
            section: "—",
            room: "—",
            students: "—",
            proctor: "—",
            break: true
        },

        {
            time: "9:45 - 10:45",
            course: "SOFTWARE QUALITY ASSURANCE",
            section: "BSIT 3A, 3B and Irreg",
            room: "MULTIMEDIA ROOM",
            students: "61",
            proctor: "ENGR. CHRISTOPHER SORIANO"
        },

        {
            time: "9:45 - 10:45",
            course: "LOGIC CIRCUITS AND SWITICHING THEORY",
            section: "BSEE 3",
            room: "COMPUTER LABORATORY 2",
            students: "—",
            proctor: "ENGR. JAY-R N. GALWARDO"
        },

        {
            time: "9:45 - 10:45",
            course: "ENGINEERING UTILITIES 2",
            section: "BSCE 3",
            room: "—",
            students: "—",
            proctor: "—"
        },

        {
            time: "10:45 - 11:00",
            course: "--BREAK--",
            section: "—",
            room: "—",
            students: "—",
            proctor: "—",
            break: true
        },

        {
            time: "11:00 - 12:00",
            course: "BRIDGE ENGINEERING / DISTRIBUTION SYSTEMS AND SUBSTATION DESIGN / MATERIAL SCIENCE AND ENGINEERING",
            section: "BSCE 4",
            room: "MULTIMEDIA ROOM",
            students: "—",
            proctor: "ENGR. CHRISTOPHER SORIANO"
        },

        {
            time: "11:00 - 12:00",
            course: "BRIDGE ENGINEERING / DISTRIBUTION SYSTEMS AND SUBSTATION DESIGN / MATERIAL SCIENCE AND ENGINEERING",
            section: "—",
            room: "—",
            students: "—",
            proctor: "ENGR. DAISY FUERTES"
        },

        {
            time: "11:00 - 12:00",
            course: "PRINCIPLES OF TRANSPORTATION ENGINEERING",
            section: "BSCE 3",
            room: "COMPUTER LABORATORY 2",
            students: "—",
            proctor: "ENGR. JAY-R N. GALWARDO"
        },

        {
            time: "11:00 - 12:00",
            course: "PRINCIPLES OF TRANSPORTATION ENGINEERING",
            section: "BSCE 3 IRREG",
            room: "—",
            students: "—",
            proctor: "—"
        },

        {
            time: "12:00 - 1:00",
            course: "--BREAK--",
            section: "—",
            room: "—",
            students: "—",
            proctor: "—",
            break: true
        },

        {
            time: "1:30 - 2:30",
            course: "FOUNDATION AND RETAINING WALL DESIGN",
            section: "BSCE 4",
            room: "MULTIMEDIA ROOM",
            students: "105",
            proctor: "ENGR. JULIUS AQUINO"
        },

        {
            time: "2:30 - 2:45",
            course: "--BREAK--",
            section: "—",
            room: "—",
            students: "—",
            proctor: "—",
            break: true
        },

        {
            time: "2:45 - 3:45",
            course: "PRINCIPLES OF REINFORCED/PRESTRESSED CONCRETE / ENGINEERING MATHEMATICS FOR ELECTRICAL ENGRS",
            section: "BSCE 4",
            room: "MULTIMEDIA ROOM",
            students: "—",
            proctor: "ENGR. JULIUS AQUINO"
        },

        {
            time: "2:45 - 3:45",
            course: "Emerging Technologies in CpE (CpE 15)",
            section: "BSCpE 4",
            room: "COM LAB 2",
            students: "4",
            proctor: "MS. ARMIE VALENCIA"
        },

        {
            time: "2:45 - 3:45",
            course: "Computer Architecture and Organizations (CPA 3713A)",
            section: "BSCpE 3",
            room: "—",
            students: "—",
            proctor: "—"
        },

        {
            time: "2:45 - 3:45",
            course: "FUNDAMENTALS OF POWERPLANT",
            section: "BSEE 4",
            room: "—",
            students: "—",
            proctor: "—"
        },

        {
            time: "3:45 - 4:00",
            course: "--BREAK--",
            section: "—",
            room: "—",
            students: "—",
            proctor: "—",
            break: true
        },

        {
            time: "4:00 - 5:00",
            course: "—",
            section: "—",
            room: "—",
            students: "—",
            proctor: "—"
        }

    ]

};



/* =========================================================
   PROGRAM INFORMATION
========================================================= */

const programInformation = {

    CE: "Civil Engineering",

    EE: "Electrical Engineering",

    CPE: "Computer Engineering",

    IT: "Information Technology",

    CS: "Computer Science"

};



/* =========================================================
   VARIABLES
========================================================= */

let currentExam = "preliminary";
let currentYear = "first";
let currentProgram = "CE";



/* =========================================================
   DOM ELEMENTS
========================================================= */

const scheduleModal =
    document.getElementById("scheduleModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");

const modalCloseBottom =
    document.getElementById("modalCloseBottom");

const modalType =
    document.getElementById("modalType");

const modalTitle =
    document.getElementById("modalTitle");

const modalDate =
    document.getElementById("modalDate");

const modalSchedule =
    document.getElementById("modalSchedule");

const programCode =
    document.getElementById("programCode");

const programName =
    document.getElementById("programName");



/* =========================================================
   OPEN MODAL
========================================================= */

function openSchedule(examType) {

    if (!scheduleModal) {
        return;
    }


    if (!examInformation[examType]) {
        return;
    }


    currentExam = examType;


    const exam =
        examInformation[examType];


    modalType.textContent =
        exam.type;

    modalTitle.textContent =
        exam.title;

    modalDate.textContent =
        exam.date;


    currentYear = "first";


    currentProgram = "CE";


    updateProgramTabs();

    updateProgramInformation();

    updateYearTabs();

    renderSchedule();


    /*
       Force modal to appear.
       This avoids depending on a specific
       CSS class such as .open or .active.
    */

    scheduleModal.style.display = "flex";

    scheduleModal.style.visibility = "visible";

    scheduleModal.style.opacity = "1";

    scheduleModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow = "hidden";

}



/* =========================================================
   CLOSE MODAL
========================================================= */

function closeSchedule() {

    if (!scheduleModal) {
        return;
    }


    scheduleModal.style.display = "none";

    scheduleModal.style.visibility = "hidden";

    scheduleModal.style.opacity = "0";


    scheduleModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow = "";

}



/* =========================================================
   VIEW SCHEDULE BUTTONS
========================================================= */

document
    .querySelectorAll(".schedule-btn")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const examType =
                    button.getAttribute("data-exam");

                openSchedule(examType);

            }
        );

    });



/* =========================================================
   PROGRAM TABS
========================================================= */

document
    .querySelectorAll(".program-tab")
    .forEach(function (tab) {

        tab.addEventListener(
            "click",
            function () {

                currentProgram =
                    tab.getAttribute("data-program");

                updateProgramTabs();

                updateProgramInformation();

                renderSchedule();

            }
        );

    });



function updateProgramTabs() {

    document
        .querySelectorAll(".program-tab")
        .forEach(function (tab) {

            const active =
                tab.getAttribute("data-program") ===
                currentProgram;

            tab.classList.toggle(
                "active",
                active
            );

        });

}



/* =========================================================
   PROGRAM NAME
========================================================= */

function updateProgramInformation() {

    if (!programCode || !programName) {
        return;
    }


    programCode.textContent =
        currentProgram;


    programName.textContent =
        programInformation[currentProgram] ||
        "ECOAST Examination Schedule";

}



/* =========================================================
   YEAR TABS
========================================================= */

function createYearTabs() {

    const yearTabs =
        document.getElementById("yearTabs");


    if (!yearTabs) {
        return;
    }


    yearTabs.innerHTML = `

        <button
            type="button"
            class="year-tab active"
            data-year="first"
        >
            1st Year
        </button>

        <button
            type="button"
            class="year-tab"
            data-year="second"
        >
            2nd Year
        </button>

        <button
            type="button"
            class="year-tab"
            data-year="third"
        >
            3rd Year
        </button>

    `;


    yearTabs
        .querySelectorAll(".year-tab")
        .forEach(function (tab) {

            tab.addEventListener(
                "click",
                function () {

                    currentYear =
                        tab.getAttribute("data-year");

                    updateYearTabs();

                    renderSchedule();

                }
            );

        });

}


function updateYearTabs() {

    document
        .querySelectorAll(".year-tab")
        .forEach(function (tab) {

            const active =
                tab.getAttribute("data-year") ===
                currentYear;

            tab.classList.toggle(
                "active",
                active
            );

        });

}



/* =========================================================
   RENDER SCHEDULE
========================================================= */

function renderSchedule() {

    if (!modalSchedule) {
        return;
    }


    const schedule =
        examinationMatrix[currentYear];


    if (!schedule) {

        modalSchedule.innerHTML = `

            <div class="empty-schedule">

                No examination schedule available.

            </div>

        `;

        return;

    }


    const yearNames = {

        first: "FIRST YEAR",

        second: "SECOND YEAR",

        third: "THIRD YEAR"

    };


    let html = `

        <div class="schedule-heading">

            <div>

                <span class="schedule-eyebrow">
                    ${yearNames[currentYear]}
                </span>

                <h4>
                    Examination Matrix
                </h4>

            </div>

            <span class="schedule-program">
                ${currentProgram}
            </span>

        </div>


        <div class="schedule-table-wrapper">

            <table class="schedule-table">

                <thead>

                    <tr>

                        <th>
                            TIME
                        </th>

                        <th>
                            COURSE DESCRIPTION
                        </th>

                        <th>
                            SECTION
                        </th>

                        <th>
                            ROOM ASSIGNMENT
                        </th>

                        <th>
                            NUMBER OF STUDENTS
                        </th>

                        <th>
                            PROCTOR
                        </th>

                    </tr>

                </thead>

                <tbody>
    `;


    schedule.forEach(function (item) {


        /* =============================================
           BREAK ROW
        ============================================== */

        if (item.break) {

            html += `

                <tr class="break-row">

                    <td colspan="6">

                        ${item.course}

                    </td>

                </tr>

            `;

            return;

        }


        /* =============================================
           NORMAL ROW
        ============================================== */

        html += `

            <tr>

                <td
                    data-label="TIME"
                    class="time-cell"
                >
                    ${item.time}
                </td>

                <td
                    data-label="COURSE DESCRIPTION"
                    class="course-cell"
                >
                    ${item.course}
                </td>

                <td
                    data-label="SECTION"
                >
                    ${item.section}
                </td>

                <td
                    data-label="ROOM ASSIGNMENT"
                >
                    ${item.room}
                </td>

                <td
                    data-label="NUMBER OF STUDENTS"
                >
                    ${item.students}
                </td>

                <td
                    data-label="PROCTOR"
                    class="proctor-cell"
                >
                    ${item.proctor}
                </td>

            </tr>

        `;

    });


    html += `

                </tbody>

            </table>

        </div>

    `;


    modalSchedule.innerHTML =
        html;

}



/* =========================================================
   CLOSE BUTTONS
========================================================= */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            closeSchedule();

        }
    );

}


if (modalCloseBottom) {

    modalCloseBottom.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            closeSchedule();

        }
    );

}


if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        function () {

            closeSchedule();

        }
    );

}



/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            scheduleModal &&
            scheduleModal.getAttribute("aria-hidden") === "false"
        ) {

            closeSchedule();

        }

    }
);



/* =========================================================
   INITIALIZATION
========================================================= */

createYearTabs();

updateProgramTabs();

updateProgramInformation();

updateYearTabs();

renderSchedule();


/*
   Make sure modal is hidden on page load.
*/

if (scheduleModal) {

    scheduleModal.style.display = "none";

    scheduleModal.style.visibility = "hidden";

    scheduleModal.style.opacity = "0";

    scheduleModal.setAttribute(
        "aria-hidden",
        "true"
    );

}