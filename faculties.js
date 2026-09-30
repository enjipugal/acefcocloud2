/* =========================================================
   ECOAST HUB
   FACULTY DIRECTORY JAVASCRIPT
   © ECOAST Ace Pugal '26
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("ECOAST HUB Faculties JS loaded");


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("open");
            menuToggle.classList.toggle("active");

        });

        const navLinks = navMenu.querySelectorAll(".nav-link");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("open");
                menuToggle.classList.remove("active");

            });

        });

    }


    /* =====================================================
       FACULTY DATA
       11 FACULTY PROFILES
       ===================================================== */

    const facultyData = {

        "faculty-01": {
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Civil Engineering",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-02": {
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Electrical Engineering",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-03": {
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Computer Engineering",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-04": {
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Information Technology",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-05": {
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Computer Science",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-06": {
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Information Technology",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-07": {
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Civil Engineering",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-08": {
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Electrical Engineering",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-09": {
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Computer Engineering",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-10": {
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Information Technology",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-11": {
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Computer Science",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        }

    };


    /* =====================================================
       CURRENT FACULTY
       ===================================================== */

    let currentFaculty = null;


    /* =====================================================
       CREATE FACULTY MODAL
       ===================================================== */

    function createFacultyModal() {

        if (document.getElementById("ecoastFacultyModal")) {
            return;
        }


        const modal = document.createElement("div");

        modal.id = "ecoastFacultyModal";

        modal.innerHTML = `

            <div
                id="ecoastFacultyOverlay"
                style="
                    position:fixed;
                    inset:0;
                    background:rgba(0,0,0,0.72);
                    z-index:999998;
                    backdrop-filter:blur(6px);
                "
            ></div>


            <div
                id="ecoastFacultyBox"
                role="dialog"
                aria-modal="true"
                style="
                    position:fixed;
                    left:50%;
                    top:50%;
                    transform:translate(-50%,-50%) scale(0.96);
                    width:min(700px, calc(100% - 40px));
                    max-height:calc(100vh - 40px);
                    overflow-y:auto;
                    background:#ffffff;
                    border-radius:18px;
                    z-index:999999;
                    box-shadow:0 30px 80px rgba(0,0,0,0.35);
                    opacity:0;
                    transition:all .25s ease;
                "
            >

                <!-- HEADER -->

                <div
                    style="
                        background:#650019;
                        color:white;
                        padding:28px 32px;
                        position:relative;
                    "
                >

                    <button
                        type="button"
                        id="ecoastFacultyClose"
                        aria-label="Close"
                        style="
                            position:absolute;
                            right:18px;
                            top:18px;
                            width:38px;
                            height:38px;
                            border:1px solid rgba(255,255,255,.35);
                            border-radius:50%;
                            background:rgba(255,255,255,.1);
                            color:white;
                            font-size:24px;
                            line-height:1;
                            cursor:pointer;
                        "
                    >
                        ×
                    </button>


                    <span
                        style="
                            display:block;
                            font-size:12px;
                            font-weight:800;
                            letter-spacing:2px;
                            margin-bottom:10px;
                            opacity:.8;
                        "
                    >
                        FACULTY PROFILE
                    </span>


                    <h2
                        id="ecoastFacultyName"
                        style="
                            margin:0 45px 8px 0;
                            font-size:30px;
                            line-height:1.15;
                            color:white;
                        "
                    >
                        Faculty Name
                    </h2>


                    <p
                        id="ecoastFacultyPosition"
                        style="
                            margin:0;
                            font-size:15px;
                            opacity:.85;
                        "
                    >
                        Faculty Member
                    </p>

                </div>


                <!-- BODY -->

                <div
                    style="
                        padding:30px 32px;
                    "
                >

                    <!-- PROGRAM -->

                    <div
                        style="
                            padding:18px;
                            border:1px solid #eadde1;
                            border-radius:12px;
                            margin-bottom:14px;
                        "
                    >

                        <span
                            style="
                                display:block;
                                font-size:11px;
                                font-weight:800;
                                letter-spacing:1.5px;
                                color:#650019;
                                margin-bottom:6px;
                            "
                        >
                            PROGRAM
                        </span>

                        <strong
                            id="ecoastFacultyProgram"
                            style="
                                display:block;
                                font-size:17px;
                                color:#292929;
                            "
                        >
                            Program
                        </strong>

                    </div>


                    <!-- SPECIALIZATION -->

                    <div
                        style="
                            padding:18px;
                            border:1px solid #eadde1;
                            border-radius:12px;
                            margin-bottom:14px;
                        "
                    >

                        <span
                            style="
                                display:block;
                                font-size:11px;
                                font-weight:800;
                                letter-spacing:1.5px;
                                color:#650019;
                                margin-bottom:6px;
                            "
                        >
                            SPECIALIZATION
                        </span>

                        <strong
                            id="ecoastFacultySpecialization"
                            style="
                                display:block;
                                font-size:16px;
                                color:#333;
                                font-weight:600;
                            "
                        >
                            Specialization to be provided
                        </strong>

                    </div>


                    <!-- EMAIL -->

                    <div
                        style="
                            padding:18px;
                            border:1px solid #eadde1;
                            border-radius:12px;
                            margin-bottom:14px;
                        "
                    >

                        <span
                            style="
                                display:block;
                                font-size:11px;
                                font-weight:800;
                                letter-spacing:1.5px;
                                color:#650019;
                                margin-bottom:6px;
                            "
                        >
                            EMAIL
                        </span>

                        <strong
                            id="ecoastFacultyEmail"
                            style="
                                display:block;
                                font-size:16px;
                                color:#333;
                                font-weight:600;
                            "
                        >
                            Email to be provided
                        </strong>

                    </div>


                    <!-- EDUCATION -->

                    <div
                        style="
                            padding:18px;
                            border:1px solid #eadde1;
                            border-radius:12px;
                            margin-bottom:24px;
                        "
                    >

                        <span
                            style="
                                display:block;
                                font-size:11px;
                                font-weight:800;
                                letter-spacing:1.5px;
                                color:#650019;
                                margin-bottom:6px;
                            "
                        >
                            EDUCATIONAL BACKGROUND
                        </span>

                        <strong
                            id="ecoastFacultyEducation"
                            style="
                                display:block;
                                font-size:16px;
                                color:#333;
                                font-weight:600;
                                line-height:1.5;
                            "
                        >
                            Educational background to be provided
                        </strong>

                    </div>


                    <!-- FOOTER -->

                    <div
                        style="
                            display:flex;
                            justify-content:flex-end;
                        "
                    >

                        <button
                            type="button"
                            id="ecoastFacultyCloseBottom"
                            style="
                                border:none;
                                background:#650019;
                                color:white;
                                padding:12px 24px;
                                border-radius:8px;
                                font-weight:700;
                                cursor:pointer;
                                transition:.2s ease;
                            "
                        >
                            Close
                        </button>

                    </div>

                </div>

            </div>
        `;


        document.body.appendChild(modal);


        /* =================================================
           GET MODAL ELEMENTS
           ================================================= */

        const overlay =
            document.getElementById(
                "ecoastFacultyOverlay"
            );

        const box =
            document.getElementById(
                "ecoastFacultyBox"
            );

        const closeButton =
            document.getElementById(
                "ecoastFacultyClose"
            );

        const closeBottom =
            document.getElementById(
                "ecoastFacultyCloseBottom"
            );


        /* =================================================
           CLOSE EVENTS
           ================================================= */

        overlay.addEventListener(
            "click",
            closeFacultyModal
        );


        closeButton.addEventListener(
            "click",
            closeFacultyModal
        );


        closeBottom.addEventListener(
            "click",
            closeFacultyModal
        );


        /* Prevent clicks inside box from closing */

        box.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }


    /* =====================================================
       OPEN FACULTY MODAL
       ===================================================== */

    function openFacultyModal(faculty) {

        createFacultyModal();


        const modal =
            document.getElementById(
                "ecoastFacultyModal"
            );

        const box =
            document.getElementById(
                "ecoastFacultyBox"
            );


        /* =================================================
           UPDATE CONTENT
           ================================================= */

        document.getElementById(
            "ecoastFacultyName"
        ).textContent = faculty.name;


        document.getElementById(
            "ecoastFacultyPosition"
        ).textContent = faculty.position;


        document.getElementById(
            "ecoastFacultyProgram"
        ).textContent = faculty.program;


        document.getElementById(
            "ecoastFacultySpecialization"
        ).textContent = faculty.specialization;


        document.getElementById(
            "ecoastFacultyEmail"
        ).textContent = faculty.email;


        document.getElementById(
            "ecoastFacultyEducation"
        ).textContent = faculty.education;


        /* =================================================
           SHOW
           ================================================= */

        currentFaculty = faculty;

        modal.style.display = "block";

        document.body.style.overflow = "hidden";


        requestAnimationFrame(function () {

            modal.style.opacity = "1";

            box.style.opacity = "1";

            box.style.transform =
                "translate(-50%, -50%) scale(1)";

        });


        console.log(
            "Faculty modal opened:",
            faculty.name
        );

    }


    /* =====================================================
       CLOSE FACULTY MODAL
       ===================================================== */

    function closeFacultyModal() {

        const modal =
            document.getElementById(
                "ecoastFacultyModal"
            );

        const box =
            document.getElementById(
                "ecoastFacultyBox"
            );


        if (!modal || !box) {
            return;
        }


        modal.style.opacity = "0";

        box.style.opacity = "0";

        box.style.transform =
            "translate(-50%, -50%) scale(0.96)";


        setTimeout(function () {

            modal.style.display = "none";

            document.body.style.overflow = "";

            currentFaculty = null;

        }, 250);

    }


    /* =====================================================
       FIND VIEW PROFILE BUTTONS
       ===================================================== */

    const profileButtons =
        document.querySelectorAll(
            ".view-profile, [data-faculty], [data-id], [data-profile]"
        );


    let profileButtonCount = 0;


    profileButtons.forEach(function (button, index) {

        const buttonText =
            button.textContent
                .trim()
                .toLowerCase();


        /*
         * Only handle actual View Profile buttons.
         */

        if (
            !buttonText.includes("view profile") &&
            !button.classList.contains("view-profile")
        ) {
            return;
        }


        profileButtonCount++;


        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                /* =====================================
                   GET FACULTY ID
                   ===================================== */

                let facultyId =
                    button.getAttribute(
                        "data-faculty"
                    );


                if (!facultyId) {

                    facultyId =
                        button.getAttribute(
                            "data-id"
                        );

                }


                if (!facultyId) {

                    facultyId =
                        button.getAttribute(
                            "data-profile"
                        );

                }


                /*
                 * If there is no ID,
                 * use the card/button order.
                 */

                if (!facultyId) {

                    facultyId =
                        "faculty-" +
                        String(
                            index + 1
                        ).padStart(
                            2,
                            "0"
                        );

                }


                /* =====================================
                   GET FACULTY DATA
                   ===================================== */

                let faculty =
                    facultyData[facultyId];


                /*
                 * Fallback if the ID is not found.
                 */

                if (!faculty) {

                    const card =
                        button.closest(
                            ".faculty-card, .faculty-item, article"
                        );


                    const cardName =
                        card?.querySelector(
                            "h2, h3, h4, .faculty-name"
                        )?.textContent?.trim();


                    const cardPosition =
                        card?.querySelector(
                            ".faculty-position, .faculty-role, .faculty-title"
                        )?.textContent?.trim();


                    faculty = {

                        name:
                            cardName ||
                            "Faculty Name",

                        position:
                            cardPosition ||
                            "Faculty Member",

                        program:
                            "Program",

                        specialization:
                            "Specialization to be provided",

                        email:
                            "Email to be provided",

                        education:
                            "Educational background to be provided"

                    };

                }


                /* =====================================
                   OPEN FACULTY PROFILE
                   ===================================== */

                openFacultyModal(faculty);

            }
        );

    });


    /* =====================================================
       GLOBAL ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                const modal =
                    document.getElementById(
                        "ecoastFacultyModal"
                    );

                if (
                    modal &&
                    modal.style.display !== "none"
                ) {

                    closeFacultyModal();

                }

            }

        }
    );


    /* =====================================================
       DEBUG INFORMATION
       ===================================================== */

    console.log(
        "View Profile buttons detected:",
        profileButtonCount
    );


    if (profileButtonCount === 0) {

        console.warn(
            "WARNING: No 'View Profile' button was detected."
        );

        console.warn(
            "Make sure your faculty cards contain a button or link with the text 'View Profile'."
        );

    }


});