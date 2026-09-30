/* =========================================================
   ECOAST HUB - CURRICULUM JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PROGRAM DATA
       ===================================================== */

    const programData = {

        CE: {
            code: "CE",
            name: "Bachelor of Science in Civil Engineering",
            type: "ENGINEERING PROGRAM",
            description: "Civil Engineering curriculum and academic requirements."
        },

        EE: {
            code: "EE",
            name: "Bachelor of Science in Electrical Engineering",
            type: "ENGINEERING PROGRAM",
            description: "Electrical Engineering curriculum and academic requirements."
        },

        CPE: {
            code: "CpE",
            name: "Bachelor of Science in Computer Engineering",
            type: "ENGINEERING PROGRAM",
            description: "Computer Engineering curriculum and academic requirements."
        },

        IT: {
            code: "IT",
            name: "Bachelor of Science in Information Technology",
            type: "INFORMATION TECHNOLOGY",
            description: "Information Technology curriculum and academic requirements."
        },

        CS: {
            code: "CS",
            name: "Bachelor of Science in Computer Science",
            type: "COMPUTER SCIENCE",
            description: "Computer Science curriculum and academic requirements."
        }

    };


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const programButtons = document.querySelectorAll(".program-button");
    const curriculumPrograms = document.querySelectorAll(".curriculum-program");


    /* =====================================================
       SHOW PROGRAM
       ===================================================== */

    function showProgram(programCode) {

        const selectedProgram = programData[programCode];

        if (!selectedProgram) {
            return;
        }


        /* -----------------------------------------------
           UPDATE PROGRAM BUTTONS
           ----------------------------------------------- */

        programButtons.forEach(function (button) {

            const buttonProgram = button.getAttribute("data-program");

            if (buttonProgram === programCode) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }

        });


        /* -----------------------------------------------
           SHOW ONLY SELECTED CURRICULUM
           ----------------------------------------------- */

        curriculumPrograms.forEach(function (program) {

            const contentProgram =
                program.getAttribute("data-program-content");

            if (contentProgram === programCode) {

                program.classList.add("active");

                /*
                 * Make sure the selected program is visible.
                 * This also helps if CSS uses display:none.
                 */
                program.style.display = "block";

            } else {

                program.classList.remove("active");

                /*
                 * Hide the other programs.
                 */
                program.style.display = "none";

            }

        });


        /* -----------------------------------------------
           OPTIONAL: UPDATE PAGE TITLE
           ----------------------------------------------- */

        document.title =
            selectedProgram.code +
            " Curriculum | ECOAST HUB";


        /* -----------------------------------------------
           UPDATE URL WITHOUT RELOADING
           ----------------------------------------------- */

        try {

            const newUrl =
                window.location.pathname +
                "?program=" +
                encodeURIComponent(programCode);

            window.history.replaceState(
                {},
                "",
                newUrl
            );

        } catch (error) {

            console.log(
                "URL update was skipped."
            );

        }


        /* -----------------------------------------------
           SCROLL TO CURRICULUM CONTENT
           ----------------------------------------------- */

        const selectedContent =
            document.querySelector(
                '.curriculum-program[data-program-content="' +
                programCode +
                '"]'
            );

        if (selectedContent) {

            /*
             * Only scroll when switching programs
             * after page interaction.
             */
        }

    }


    /* =====================================================
       PROGRAM BUTTON CLICK EVENTS
       ===================================================== */

    programButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const programCode =
                button.getAttribute("data-program");

            if (!programCode) {
                return;
            }

            showProgram(programCode);

        });

    });


    /* =====================================================
       DETECT PROGRAM FROM URL
       ===================================================== */

    function getProgramFromURL() {

        const params =
            new URLSearchParams(
                window.location.search
            );

        const program =
            params.get("program");

        if (
            program &&
            programData[program.toUpperCase()]
        ) {

            return program.toUpperCase();

        }

        return "CE";

    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    const initialProgram =
        getProgramFromURL();

    showProgram(initialProgram);


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.querySelector(".nav-menu");


    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            function () {

                navMenu.classList.toggle("open");

                menuToggle.classList.toggle("active");

            }
        );


        /* -----------------------------------------------
           CLOSE MOBILE MENU AFTER CLICKING LINK
           ----------------------------------------------- */

        const navLinks =
            navMenu.querySelectorAll(".nav-link");

        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navMenu.classList.remove("open");

                    menuToggle.classList.remove("active");

                }
            );

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !menuToggle ||
                !navMenu
            ) {
                return;
            }

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                navMenu.classList.remove("open");

                menuToggle.classList.remove("active");

            }

        }
    );


    /* =====================================================
       HERO / CONTENT REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".program-buttons, " +
            ".curriculum-program, " +
            ".curriculum-note, " +
            ".cta-container"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (entry.isIntersecting) {

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
                    threshold: 0.08
                }
            );


        revealElements.forEach(
            function (element) {

                observer.observe(element);

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       SUBJECT HOVER EFFECT
       ===================================================== */

    const subjects =
        document.querySelectorAll(
            ".subject"
        );

    subjects.forEach(function (subject) {

        subject.addEventListener(
            "mouseenter",
            function () {

                subject.classList.add(
                    "subject-hover"
                );

            }
        );


        subject.addEventListener(
            "mouseleave",
            function () {

                subject.classList.remove(
                    "subject-hover"
                );

            }
        );

    });


    /* =====================================================
       PREVENT EMPTY LINKS FROM JUMPING
       ===================================================== */

    const emptyLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );

    emptyLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

            }
        );

    });

});