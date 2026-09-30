/* =========================================================
   ECOAST HUB - OFFICERS PAGE
   ========================================================= */


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.querySelector(".nav-menu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        const isOpen =
            navMenu.classList.contains("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    navMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

}


/* =========================================================
   OFFICER MODAL
   ========================================================= */

const officerModal =
    document.getElementById("officerModal");

const officerModalOverlay =
    document.getElementById(
        "officerModalOverlay"
    );

const officerModalClose =
    document.getElementById(
        "officerModalClose"
    );

const officerModalCloseBottom =
    document.getElementById(
        "officerModalCloseBottom"
    );


/* Modal fields */

const modalOfficerInitials =
    document.getElementById(
        "modalOfficerInitials"
    );

const modalOfficerName =
    document.getElementById(
        "modalOfficerName"
    );

const modalOfficerPosition =
    document.getElementById(
        "modalOfficerPosition"
    );

const modalOfficerProgram =
    document.getElementById(
        "modalOfficerProgram"
    );

const modalOfficerYear =
    document.getElementById(
        "modalOfficerYear"
    );

const modalOfficerDescription =
    document.getElementById(
        "modalOfficerDescription"
    );


/* =========================================================
   OFFICER CARDS
   ========================================================= */

const officerCards =
    document.querySelectorAll(
        ".officer-card"
    );


/* =========================================================
   INITIALS
   ========================================================= */

function getInitials(name) {

    if (!name) {
        return "ON";
    }


    const words =
        name.trim().split(/\s+/);


    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();

}


/* =========================================================
   OPEN MODAL
   ========================================================= */

function openOfficerModal(card) {

    if (!officerModal || !card) {
        return;
    }


    const name =
        card.dataset.name ||
        "Officer Name";

    const position =
        card.dataset.position ||
        "Student Officer";

    const program =
        card.dataset.program ||
        "ECOAST";

    const year =
        card.dataset.year ||
        "To Be Updated";

    const description =
        card.dataset.description ||
        "Officer profile information will be added once the official details are available.";


    /* Set values */

    if (modalOfficerInitials) {

        modalOfficerInitials.textContent =
            getInitials(name);

    }


    if (modalOfficerName) {

        modalOfficerName.textContent =
            name;

    }


    if (modalOfficerPosition) {

        modalOfficerPosition.textContent =
            position.toUpperCase();

    }


    if (modalOfficerProgram) {

        modalOfficerProgram.textContent =
            program;

    }


    if (modalOfficerYear) {

        modalOfficerYear.textContent =
            year;

    }


    if (modalOfficerDescription) {

        modalOfficerDescription.textContent =
            description;

    }


    /* Show */

    officerModal.classList.add("show");

    officerModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";


    if (officerModalClose) {

        setTimeout(() => {

            officerModalClose.focus();

        }, 50);

    }

}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeOfficerModal() {

    if (!officerModal) {
        return;
    }


    officerModal.classList.remove("show");

    officerModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

}


/* =========================================================
   VIEW PROFILE BUTTONS
   ========================================================= */

officerCards.forEach(card => {

    const viewButton =
        card.querySelector(
            ".view-profile"
        );


    if (!viewButton) {
        return;
    }


    viewButton.addEventListener(
        "click",
        () => {

            openOfficerModal(card);

        }
    );

});


/* =========================================================
   CLOSE BUTTONS
   ========================================================= */

if (officerModalClose) {

    officerModalClose.addEventListener(
        "click",
        closeOfficerModal
    );

}


if (officerModalCloseBottom) {

    officerModalCloseBottom.addEventListener(
        "click",
        closeOfficerModal
    );

}


/* =========================================================
   CLICK OUTSIDE MODAL
   ========================================================= */

if (officerModalOverlay) {

    officerModalOverlay.addEventListener(
        "click",
        closeOfficerModal
    );

}


/* =========================================================
   ESC KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            officerModal &&
            officerModal.classList.contains("show")
        ) {

            closeOfficerModal();

        }

    }
);


/* =========================================================
   CARD REVEAL ANIMATION
   ========================================================= */

if ("IntersectionObserver" in window) {

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


    officerCards.forEach(card => {

        observer.observe(card);

    });

}


/* =========================================================
   PREVENT EMPTY LINKS
   ========================================================= */

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