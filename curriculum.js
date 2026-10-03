const CURRICULUM_API =
    "https://ecoasthub.great-site.net/backend/curriculum.php";

document.addEventListener("DOMContentLoaded", () => {

    console.log("ECOAST HUB Curriculum JS loaded");

    initializeProgramButtons();
    initializeMobileNavigation();
    initializeRevealAnimations();
    loadCurriculumData();

});

function initializeProgramButtons() {

    const buttons =
        document.querySelectorAll(".program-button");

    const programs =
        document.querySelectorAll(".curriculum-program");

    if (!buttons.length || !programs.length) {
        return;
    }

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedProgram =
                normalizeProgram(button.dataset.program);

            buttons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            programs.forEach(program => {

                const programCode =
                    normalizeProgram(
                        program.dataset.programContent
                    );

                if (programCode === selectedProgram) {

                    program.classList.add("active");

                } else {

                    program.classList.remove("active");

                }

            });

        });

    });

}

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

async function loadCurriculumData() {

    try {

        const response =
            await fetch(CURRICULUM_API, {
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
            "Curriculum backend response:",
            result
        );


        if (
            !result ||
            result.success !== true ||
            !Array.isArray(result.data)
        ) {

            console.warn(
                "Curriculum backend returned no usable data."
            );

            return;

        }

        if (result.data.length === 0) {

            console.log(
                "Curriculum backend is connected but currently empty. Existing HTML curriculum will remain visible."
            );

            return;

        }

        applyCurriculumData(result.data);


    } catch (error) {

        console.warn(
            "Curriculum API could not be loaded. Existing HTML curriculum will remain visible.",
            error
        );

    }

}

function applyCurriculumData(data) {

    if (!Array.isArray(data) || !data.length) {
        return;
    }

    data.forEach(item => {

        if (!item) {
            return;
        }


        const program =
            normalizeProgram(item.program);

        const courseCode =
            normalizeText(item.course_code);

        const courseTitle =
            normalizeText(item.course_title);


        if (!program) {
            return;
        }


        const programContainer =
            document.querySelector(
                `.curriculum-program[data-program-content="${program}"]`
            );


        if (!programContainer) {
            return;
        }

        const subjects =
            programContainer.querySelectorAll(".subject");


        let matchedSubject = null;

        subjects.forEach(subject => {

            if (matchedSubject) {
                return;
            }

            const codeElement =
                subject.querySelector("span");


            if (!codeElement) {
                return;
            }


            const existingCode =
                normalizeText(
                    codeElement.textContent
                );


            if (
                existingCode === courseCode &&
                courseCode !== ""
            ) {

                matchedSubject = subject;

            }

        });

        if (matchedSubject) {

            const titleElement =
                matchedSubject.querySelector("strong");

            const unitsElement =
                matchedSubject.querySelector("em");


            if (
                titleElement &&
                courseTitle
            ) {

                titleElement.textContent =
                    item.course_title;

            }

            if (
                unitsElement &&
                item.units !== null &&
                item.units !== undefined &&
                item.units !== ""
            ) {

                unitsElement.textContent =
                    item.units;

            }

        }

    });


    console.log(
        `Applied ${data.length} curriculum record(s) from backend.`
    );

}

function normalizeProgram(value) {

    if (value === null || value === undefined) {
        return "";
    }


    let program =
        String(value)
            .trim()
            .toUpperCase();


    if (
        program === "CPE" ||
        program === "CPe".toUpperCase() ||
        program === "COMPUTER ENGINEERING"
    ) {

        return "CPE";

    }


    if (
        program === "CE" ||
        program === "CIVIL ENGINEERING"
    ) {

        return "CE";

    }


    if (
        program === "EE" ||
        program === "ELECTRICAL ENGINEERING"
    ) {

        return "EE";

    }


    if (
        program === "IT" ||
        program === "INFORMATION TECHNOLOGY"
    ) {

        return "IT";

    }


    if (
        program === "CS" ||
        program === "COMPUTER SCIENCE"
    ) {

        return "CS";

    }


    return program;

}

function normalizeText(value) {

    if (value === null || value === undefined) {
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
            ".section-heading, .program-button, .curriculum-program, .curriculum-note, .cta-section"
        );


    if (!elements.length) {
        return;
    }


    if (!("IntersectionObserver" in window)) {

        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

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

document.addEventListener("click", event => {

    const link =
        event.target.closest("a[href='#']");

    if (!link) {
        return;
    }

    event.preventDefault();

});

window.addEventListener(
    "error",
    event => {

        console.warn(
            "ECOAST Curriculum page error:",
            event.message
        );

    }
);
