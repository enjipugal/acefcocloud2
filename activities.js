/* =========================================================
   ECOAST HUB — ACTIVITIES
   ACTIVITIES.JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen = navMenu.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });


        /* -----------------------------------------------
           CLOSE MENU WHEN LINK IS CLICKED
        ------------------------------------------------ */

        const navLinks = navMenu.querySelectorAll(".nav-link");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* -----------------------------------------------
           CLOSE MENU WHEN CLICKING OUTSIDE
        ------------------------------------------------ */

        document.addEventListener("click", function (event) {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {

                navMenu.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });


        /* -----------------------------------------------
           ESC KEY
        ------------------------------------------------ */

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                navMenu.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });


        /* -----------------------------------------------
           RESET MOBILE MENU WHEN RESIZING
        ------------------------------------------------ */

        window.addEventListener("resize", function () {

            if (window.innerWidth > 850) {

                navMenu.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =====================================================
       ACTIVITY IMAGE FALLBACK
    ===================================================== */

    const activityImages =
        document.querySelectorAll(".activity-image img");

    activityImages.forEach(function (image) {

        image.addEventListener("error", function () {

            image.style.display = "none";

            const imageContainer =
                image.closest(".activity-image");

            if (!imageContainer) {
                return;
            }

            imageContainer.classList.add("image-error");


            /* -------------------------------------------
               CREATE FALLBACK ONLY ONCE
            ------------------------------------------- */

            if (
                !imageContainer.querySelector(
                    ".image-fallback"
                )
            ) {

                const fallback =
                    document.createElement("div");

                fallback.className =
                    "image-fallback";

                fallback.textContent =
                    "ECOAST ACTIVITY";

                imageContainer.appendChild(fallback);

            }

        });

    });


    /* =====================================================
       IMAGE FALLBACK STYLING
    ===================================================== */

    const fallbackStyle =
        document.createElement("style");

    fallbackStyle.textContent = `
        .activity-image.image-error {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f1f1f1;
        }

        .activity-image .image-fallback {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            color: #650019;

            font-size: 0.82rem;
            font-weight: 800;

            letter-spacing: 0.12em;

            text-transform: uppercase;
        }
    `;

    document.head.appendChild(fallbackStyle);


    /* =====================================================
       ACTIVE NAVIGATION
       KEEPS ACTIVITIES ACTIVE
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const navLinks =
        document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (!linkPage) {
            return;
        }

        const cleanLink =
            linkPage
                .split("/")
                .pop()
                .toLowerCase();

        if (
            cleanLink === currentPage ||
            (
                currentPage === "" &&
                cleanLink === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });

});