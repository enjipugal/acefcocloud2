const OFFICERS_API =
    "https://ecoasthub.great-site.net/backend/officer.php";

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

const officerCards =
    document.querySelectorAll(".officer-card");

let backendOfficers = [];
let backendOfficersByName = {};
let backendOfficersById = {};

function normalizeName(name) {

    return String(name || "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();

}

function normalizeOfficer(item) {

    if (!item) {
        return null;
    }


    return {

        id:
            item.id ?? null,

        name:
            item.name ||
            "Officer Name",

        position:
            item.position ||
            "Student Officer",

        program:
            item.program ||
            item.department ||
            "",

        year:
            item.year ||
            item.year_level ||
            "",

        description:
            item.description ||
            item.bio ||
            "",

        image:
            item.image ||
            ""

    };

}

async function loadOfficers() {

    console.log(
        "Loading officers from:",
        OFFICERS_API
    );


    try {

        const response =
            await fetch(
                OFFICERS_API,
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
            "Officers API response:",
            result
        );


        if (
            !result ||
            result.success !== true
        ) {

            throw new Error(
                result?.message ||
                "Officers API returned an unsuccessful response."
            );

        }

        const records =
            Array.isArray(result.data)
                ? result.data
                : [];

        backendOfficers =
            records
                .map(normalizeOfficer)
                .filter(Boolean);


        backendOfficersByName = {};
        backendOfficersById = {};

        backendOfficers.forEach(
            officer => {

                const normalizedName =
                    normalizeName(
                        officer.name
                    );


                if (normalizedName) {

                    backendOfficersByName[
                        normalizedName
                    ] = officer;

                }


                if (
                    officer.id !== null &&
                    officer.id !== undefined
                ) {

                    backendOfficersById[
                        String(officer.id)
                    ] = officer;

                }

            }
        );

        console.log(
            "Backend officer records:",
            backendOfficers.length
        );


        if (
            backendOfficers.length === 0
        ) {

            console.log(
                "Officer table is currently empty. Existing HTML officer cards remain unchanged."
            );

        }

        return backendOfficers;

    } catch (error) {

        console.warn(
            "Unable to load officers from backend.",
            error
        );

        backendOfficers = [];
        backendOfficersByName = {};
        backendOfficersById = {};
       
        return [];

    }

}

function findBackendOfficer(card) {

    if (!card) {
        return null;
    }

    const cardId =
        card.dataset.id ||
        card.dataset.officer;


    if (cardId) {

        const foundById =
            backendOfficersById[
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


    if (cardName) {

        const foundByName =
            backendOfficersByName[
                normalizeName(cardName)
            ];


        if (foundByName) {

            return foundByName;

        }

    }


    return null;

}

function applyBackendData() {

    if (
        !backendOfficers.length
    ) {

        return;

    }


    officerCards.forEach(card => {

        const backendOfficer =
            findBackendOfficer(card);


        if (!backendOfficer) {

            return;

        }

        const nameElement =
            card.querySelector("h3");


        if (
            nameElement &&
            backendOfficer.name
        ) {

            nameElement.textContent =
                backendOfficer.name;

        }

        const positionElement =
            card.querySelector(".officer-label");


        if (
            positionElement &&
            backendOfficer.position
        ) {

            positionElement.textContent =
                backendOfficer.position;

        }

        const imageElement =
            card.querySelector(
                ".officer-image img"
            );


        if (
            imageElement &&
            backendOfficer.image
        ) {

            imageElement.src =
                backendOfficer.image;

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


    officerCards.forEach(card => {

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

loadOfficers()
    .then(() => {

        applyBackendData();


        console.log(
            "ECOAST HUB Officers page initialized successfully."
        );

    })
    .catch(error => {

        console.error(
            "Officer initialization error:",
            error
        );

    });
