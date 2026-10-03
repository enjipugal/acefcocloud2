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
        code: "CE",
        name: "Civil Engineering",
        years: [1, 2, 3, 4]
    },

    EE: {
        code: "EE",
        name: "Electrical Engineering",
        years: [1, 2, 3, 4]
    },

    CPE: {
        code: "CPE",
        name: "Computer Engineering",
        years: [1, 2, 3, 4]
    },

    IT: {
        code: "IT",
        name: "Information Technology",
        years: [1, 2, 3]
    },

    CS: {
        code: "CS",
        name: "Computer Science",
        years: [1, 2, 3, 4]
    }

};

let currentExam = "preliminary";
let currentProgram = "CE";
let currentYear = 1;

const scheduleModal = document.getElementById("scheduleModal");

const modalType = document.getElementById("modalType");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");

const programCode = document.getElementById("programCode");
const programName = document.getElementById("programName");

const yearTabs = document.getElementById("yearTabs");
const modalSchedule = document.getElementById("modalSchedule");

const modalClose = document.getElementById("modalClose");
const modalCloseBottom = document.getElementById("modalCloseBottom");

function openScheduleModal(examKey) {

    if (!EXAM_SCHEDULES[examKey]) {
        return;
    }

    currentExam = examKey;

    const exam = EXAM_SCHEDULES[examKey];

    if (modalType) {
        modalType.textContent = exam.type;
    }

    if (modalTitle) {
        modalTitle.textContent = exam.title;
    }

    if (modalDate) {
        modalDate.textContent = exam.date;
    }

    renderProgram(currentProgram);

    if (scheduleModal) {
        scheduleModal.classList.add("active");
        scheduleModal.classList.add("show");
        scheduleModal.removeAttribute("hidden");

        document.body.classList.add("modal-open");
    }
}

function closeScheduleModal() {

    if (!scheduleModal) {
        return;
    }

    scheduleModal.classList.remove("active");
    scheduleModal.classList.remove("show");
    scheduleModal.setAttribute("hidden", "");

    document.body.classList.remove("modal-open");
}

function renderProgram(programKey) {

    const program = PROGRAMS[programKey];

    if (!program) {
        return;
    }

    currentProgram = programKey;
    currentYear = program.years[0];

    if (programCode) {
        programCode.textContent = program.code;
    }

    if (programName) {
        programName.textContent = program.name;
    }

    renderYearTabs(program);
    renderSchedule();
}

function renderYearTabs(program) {

    if (!yearTabs) {
        return;
    }

    yearTabs.innerHTML = "";

    program.years.forEach((year, index) => {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "year-tab";

        if (index === 0) {
            button.classList.add("active");
        }

        button.dataset.year = year;
        button.textContent = `Year ${year}`;
        button.addEventListener("click", function () {

            document
                .querySelectorAll("#yearTabs .year-tab")
                .forEach(tab => {
                    tab.classList.remove("active");
                });

            this.classList.add("active");

            currentYear = Number(this.dataset.year);

            renderSchedule();

        });

        yearTabs.appendChild(button);

    });
}

function renderSchedule() {

    if (!modalSchedule) {
        return;
    }

    modalSchedule.innerHTML = "";

    const wrapper = document.createElement("div");

    wrapper.className = "schedule-placeholder";
    wrapper.innerHTML = `
        <div class="schedule-placeholder-icon">
            <span>📅</span>
        </div>

        <h4>Schedule to Follow</h4>

        <p>
            Detailed subject schedule, room, and facilitator
            information will be announced.
        </p>

        <div class="schedule-info">

            <div class="schedule-info-item">
                <span class="label">Examination</span>
                <strong>${EXAM_SCHEDULES[currentExam].title}</strong>
            </div>

            <div class="schedule-info-item">
                <span class="label">Date</span>
                <strong>${EXAM_SCHEDULES[currentExam].date}</strong>
            </div>

            <div class="schedule-info-item">
                <span class="label">Program</span>
                <strong>${PROGRAMS[currentProgram].code}</strong>
            </div>

            <div class="schedule-info-item">
                <span class="label">Year Level</span>
                <strong>Year ${currentYear}</strong>
            </div>

        </div>
    `;

    modalSchedule.appendChild(wrapper);
}

document.addEventListener("click", function (event) {

    const programButton =
        event.target.closest("[data-program]");

    if (!programButton) {
        return;
    }

    const programKey =
        programButton.dataset.program;

    if (!PROGRAMS[programKey]) {
        return;
    }

    document
        .querySelectorAll("[data-program]")
        .forEach(button => {
            button.classList.remove("active");
        });

    programButton.classList.add("active");

    renderProgram(programKey);

});

document.addEventListener("click", function (event) {

    const scheduleButton =
        event.target.closest(".schedule-btn[data-exam]");

    if (!scheduleButton) {
        return;
    }

    const examKey =
        scheduleButton.dataset.exam;

    openScheduleModal(examKey);

});

if (modalClose) {

    modalClose.addEventListener("click", function () {
        closeScheduleModal();
    });

}

if (modalCloseBottom) {

    modalCloseBottom.addEventListener("click", function () {
        closeScheduleModal();
    });

}

if (scheduleModal) {

    scheduleModal.addEventListener("click", function (event) {

        if (event.target === scheduleModal) {
            closeScheduleModal();
        }

    });

}

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        if (
            scheduleModal &&
            (
                scheduleModal.classList.contains("active") ||
                scheduleModal.classList.contains("show")
            )
        ) {
            closeScheduleModal();
        }

    }

});

if (PROGRAMS[currentProgram]) {
    renderProgram(currentProgram);
}
