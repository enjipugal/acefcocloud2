const FACULTIES_API =
    "https://ecoasthub.great-site.net/backend/faculties.php";

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        const isOpen =
            navMenu.classList.contains("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
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

const facultyCards =
    document.querySelectorAll(
        ".faculty-card"
    );

let backendFaculties = [];
let backendFacultiesByName = {};
let backendFacultiesById = {};

function normalizeName(name) {

    return String(name || "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();

}

function normalizeFaculty(item) {

    if (!item) {
        return null;
    }


    return {

        id:
            item.id ?? null,

        name:
            item.name ||
            "",

        position:
            item.position ||
            "",

        department:
            item.department ||
            "",

        specialization:
            item.specialization ||
            "",

        image:
            item.image ||
            "",

        description:
            item.description ||
            "",

        displayOrder:
            item.display_order ??
            null

    };

}

async function loadFaculties() {

    console.log(
        "Loading faculties from:",
        FACULTIES_API
    );


    try {

        const response =
            await fetch(
                FACULTIES_API,
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    },

                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status
            );

        }


        const result =
            await response.json();


        console.log(
            "Faculties API response:",
            result
        );


        if (
            !result ||
            result.success !== true
        ) {

            throw new Error(
                result?.message ||
                "Faculties API returned an unsuccessful response."
            );

        }

        const records =
            Array.isArray(result.data)
                ? result.data
                : [];


        backendFaculties =
            records
                .map(normalizeFaculty)
                .filter(Boolean);


        backendFacultiesByName = {};
        backendFacultiesById = {};


        backendFaculties.forEach(
            faculty => {

                const normalizedName =
                    normalizeName(
                        faculty.name
                    );


                if (normalizedName) {

                    backendFacultiesByName[
                        normalizedName
                    ] = faculty;

                }

                if (
                    faculty.id !== null &&
                    faculty.id !== undefined
                ) {

                    backendFacultiesById[
                        String(faculty.id)
                    ] = faculty;

                }

            }
        );

        console.log(
            "Backend faculty records:",
            backendFaculties.length
        );


        if (
            backendFaculties.length === 0
        ) {

            console.log(
                "Faculty table is currently empty. Existing HTML faculty cards remain active."
            );

        }

        return backendFaculties;

    } catch (error) {

        console.warn(
            "Unable to load faculties from backend.",
            error
        );

        backendFaculties = [];
        backendFacultiesByName = {};
        backendFacultiesById = {};

        return [];

    }

}

function findBackendFaculty(card) {

    if (!card) {
        return null;
    }

    const cardId =
        card.dataset.id ||
        card.dataset.faculty;

    if (cardId) {

        const foundById =
            backendFacultiesById[
                String(cardId)
            ];


        if (foundById) {

            return foundById;

        }

    }

    const cardName =
        card.dataset.name ||
        card.querySelector("h3")
            ?.textContent
            ?.trim();

    if (!cardName) {

        return null;

    }

    return (
        backendFacultiesByName[
            normalizeName(cardName)
        ] ||
        null
    );

}

function applyBackendData() {

    if (
        backendFaculties.length === 0
    ) {

        return;

    }

    facultyCards.forEach(card => {

        const backendFaculty =
            findBackendFaculty(card);


        if (!backendFaculty) {

            return;

        }

        const nameElement =
            card.querySelector("h3");

        if (
            nameElement &&
            backendFaculty.name
        ) {

            nameElement.textContent =
                backendFaculty.name;

        }

        const positionElement =
            card.querySelector(
                ".faculty-card-content p"
            );


        if (
            positionElement &&
            backendFaculty.position
        ) {

            positionElement.textContent =
                backendFaculty.position;

        }

        const programBadge =
            card.querySelector(
                ".faculty-program-badge"
            );


        if (
            programBadge &&
            backendFaculty.department
        ) {

            programBadge.textContent =
                backendFaculty.department;

        }

        const facultyLabel =
            card.querySelector(
                ".faculty-label"
            );


        if (
            facultyLabel &&
            backendFaculty.department
        ) {

            facultyLabel.textContent =
                backendFaculty.department;

        }
        
        const imageElement =
            card.querySelector(
                ".faculty-card-image img"
            );


        if (
            imageElement &&
            backendFaculty.image
        ) {

            imageElement.src =
                backendFaculty.image;

            imageElement.alt =
                backendFaculty.name;

        }

    });

}

if (
    "IntersectionObserver" in window
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

    facultyCards.forEach(card => {

        observer.observe(card);

    });

}

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

loadFaculties()
    .then(() => {

        applyBackendData();


        console.log(
            "ECOAST HUB Faculties page initialized successfully."
        );

    })
    .catch(error => {

        console.error(
            "Faculty initialization error:",
            error
        );

    });
