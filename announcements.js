const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {

            navMenu.classList.remove("active");
            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}

const EXAM_DATES = {

    preliminary: {
        start: "2026-08-24",
        end: "2026-08-25"
    },

    midterm: {
        start: "2026-09-16",
        end: "2026-09-17"
    },

    semifinal: {
        start: "2026-10-07",
        end: "2026-10-08"
    },

    final: {
        start: "2026-10-27",
        end: "2026-10-28"
    }

};

function updateExamStatus() {
    const today = new Date();
    today.setHours(
        0,
        0,
        0,
        0
    );


    const examCards = document.querySelectorAll(
        "[data-exam-card]"
    );

    examCards.forEach(function (card) {

        const examKey = card.getAttribute(
            "data-exam-card"
        );

        const exam = EXAM_DATES[examKey];

        if (!exam) {
            return;
        }


        const startDate = new Date(
            exam.start + "T00:00:00"
        );

        const endDate = new Date(
            exam.end + "T23:59:59"
        );


        const statusElement = card.querySelector(
            ".exam-status"
        );

        if (!statusElement) {
            return;
        }


        if (today < startDate) {

            statusElement.textContent = "UPCOMING";

        } else if (
            today >= startDate &&
            today <= endDate
        ) {

            statusElement.textContent = "ONGOING";

        } else {

            statusElement.textContent = "COMPLETED";

        }

    });

}

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateExamStatus();

    }
);
