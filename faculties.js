document.addEventListener("DOMContentLoaded", () => {

    console.log("ECOAST HUB Faculties JS loaded");

    const API_URL =
        "https://ecoasthub.great-site.net/backend/faculties.php";

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            menuToggle.classList.toggle("active");

        });

    }

    if (navMenu) {

        const navLinks =
            navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                }

            });

        });

    }

    async function loadFaculties() {

        try {

            const response =
                await fetch(API_URL, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });


            if (!response.ok) {

                throw new Error(
                    `HTTP error: ${response.status}`
                );

            }

            const result =
                await response.json();


            console.log(
                "Faculties API:",
                result
            );


            if (!result.success) {

                console.error(
                    "Faculties API error:",
                    result.message ||
                    "Unknown error."
                );

                return;

            }

            if (
                !Array.isArray(result.data) ||
                result.data.length === 0
            ) {

                console.log(
                    "Faculty database is empty. Existing HTML cards preserved."
                );

                return;

            }


            updateFacultyCards(
                result.data
            );


        } catch (error) {

            console.error(
                "Failed to load faculty data:",
                error
            );

        }

    }

    function updateFacultyCards(
        faculties
    ) {

        const cards =
            document.querySelectorAll(
                ".faculty-card"
            );


        if (!cards.length) {

            console.log(
                "No faculty cards found in the HTML."
            );

            return;

        }

        faculties.forEach(
            (faculty, index) => {

                if (!cards[index]) {
                    return;
                }


                const card =
                    cards[index];

                const nameElement =
                    card.querySelector("h3");


                if (
                    nameElement &&
                    faculty.name
                ) {

                    nameElement.textContent =
                        faculty.name;

                }
                
                const positionElement =
                    card.querySelector(
                        ".faculty-card-content p"
                    );


                if (
                    positionElement &&
                    faculty.position
                ) {

                    positionElement.textContent =
                        faculty.position;

                }

                const badgeElement =
                    card.querySelector(
                        ".faculty-program-badge"
                    );


                const labelElement =
                    card.querySelector(
                        ".faculty-label"
                    );

                if (faculty.department) {

                    if (badgeElement) {

                        badgeElement.textContent =
                            faculty.department;

                    }

                    if (labelElement) {

                        labelElement.textContent =
                            faculty.department;

                    }

                }

                const imageElement =
                    card.querySelector("img");


                if (
                    imageElement &&
                    faculty.image
                ) {

                    imageElement.src =
                        faculty.image;

                    imageElement.alt =
                        faculty.name ||
                        "Faculty Member";

                }

            }
        );

    }

    const revealElements =
        document.querySelectorAll(
            ".faculty-card, .section-title"
        );


    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

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
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    }

    document.querySelectorAll(
        'a[href="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

            }
        );

    });

    loadFaculties();

});
