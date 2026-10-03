document.addEventListener("DOMContentLoaded", function () {

    console.log("ECOAST HUB Faculties JS loaded");

    const FACULTIES_API =
        "https://ecoasthub.great-site.net/backend/faculties.php";

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.querySelector(".nav-menu");


    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("open");
            menuToggle.classList.toggle("active");

        });


        const navLinks =
            navMenu.querySelectorAll(".nav-link");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("open");
                menuToggle.classList.remove("active");

            });

        });

    }

    let facultyData = {};
    let facultyList = [];
    let currentFaculty = null;

    const defaultFacultyData = {

        "faculty-01": {
            id: "faculty-01",
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Civil Engineering",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-02": {
            id: "faculty-02",
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Electrical Engineering",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-03": {
            id: "faculty-03",
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Computer Engineering",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-04": {
            id: "faculty-04",
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Information Technology",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-05": {
            id: "faculty-05",
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Computer Science",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-06": {
            id: "faculty-06",
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Information Technology",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-07": {
            id: "faculty-07",
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Civil Engineering",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-08": {
            id: "faculty-08",
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Electrical Engineering",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-09": {
            id: "faculty-09",
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Computer Engineering",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-10": {
            id: "faculty-10",
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Information Technology",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        },

        "faculty-11": {
            id: "faculty-11",
            name: "Faculty Name",
            position: "Faculty Member",
            program: "Computer Science",
            specialization: "Specialization to be provided",
            email: "Email to be provided",
            education: "Educational background to be provided"
        }

    };


    function createFacultyModal() {

        if (
            document.getElementById(
                "ecoastFacultyModal"
            )
        ) {
            return;
        }


        const modal =
            document.createElement("div");


        modal.id =
            "ecoastFacultyModal";
        modal.style.display =
            "none";
        modal.style.opacity =
            "0";
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


                <div
                    style="
                        padding:30px 32px;
                    "
                >

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


        box.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }

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

        if (!faculty) {
            return;
        }

        document.getElementById(
            "ecoastFacultyName"
        ).textContent =
            faculty.name ||
            "Faculty Name";


        document.getElementById(
            "ecoastFacultyPosition"
        ).textContent =
            faculty.position ||
            "Faculty Member";


        document.getElementById(
            "ecoastFacultyProgram"
        ).textContent =
            faculty.program ||
            "Program";


        document.getElementById(
            "ecoastFacultySpecialization"
        ).textContent =
            faculty.specialization ||
            "Specialization to be provided";


        document.getElementById(
            "ecoastFacultyEmail"
        ).textContent =
            faculty.email ||
            "Email to be provided";


        document.getElementById(
            "ecoastFacultyEducation"
        ).textContent =
            faculty.education ||
            "Educational background to be provided";

        currentFaculty =
            faculty;


        modal.style.display =
            "block";


        document.body.style.overflow =
            "hidden";


        requestAnimationFrame(function () {

            modal.style.opacity =
                "1";


            box.style.opacity =
                "1";


            box.style.transform =
                "translate(-50%, -50%) scale(1)";

        });


        console.log(
            "Faculty modal opened:",
            faculty.name
        );

    }

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

        modal.style.opacity =
            "0";

        box.style.opacity =
            "0";

        box.style.transform =
            "translate(-50%, -50%) scale(0.96)";

        setTimeout(function () {

            modal.style.display =
                "none";

            document.body.style.overflow =
                "";

            currentFaculty =
                null;

        }, 250);

    }

    function normalizeFaculty(item, index) {

        if (!item) {
            return null;
        }


        const numericId =
            item.id !== undefined &&
            item.id !== null
                ? item.id
                : index + 1;


        return {

            id:
                "faculty-" +
                String(numericId)
                    .padStart(2, "0"),


            databaseId:
                item.id ?? null,


            name:
                item.name ||
                "Faculty Name",


            position:
                item.position ||
                "Faculty Member",


            program:
                item.program ||
                item.department ||
                "Program",


            specialization:
                item.specialization ||
                "Specialization to be provided",


            email:
                item.email ||
                "Email to be provided",


            education:
                item.education ||
                "Educational background to be provided",


            image:
                item.image ||
                ""

        };

    }

    async function loadFaculties() {

        console.log(
            "Loading faculty data from:",
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
                "Faculty API response:",
                result
            );


            if (
                !result ||
                result.success !== true
            ) {

                throw new Error(
                    result?.message ||
                    "Faculty API returned an unsuccessful response."
                );

            }

            const records =
                Array.isArray(result.data)
                    ? result.data
                    : [];

            facultyList =
                records
                    .map(normalizeFaculty)
                    .filter(Boolean);


            facultyData = {};

            facultyList.forEach(
                function (faculty, index) {

                    facultyData[
                        faculty.id
                    ] = faculty;


                    if (
                        faculty.databaseId !== null
                    ) {

                        facultyData[
                            String(
                                faculty.databaseId
                            )
                        ] = faculty;

                    }

                    const fallbackKey =
                        "faculty-" +
                        String(index + 1)
                            .padStart(2, "0");


                    facultyData[
                        fallbackKey
                    ] = faculty;

                }
            );

            console.log(
                "Faculty records loaded:",
                facultyList.length
            );

            if (facultyList.length === 0) {

                facultyData =
                    {
                        ...defaultFacultyData
                    };


                facultyList =
                    Object.values(
                        defaultFacultyData
                    );


                console.log(
                    "Faculty table is currently empty. Using placeholder faculty data."
                );

            }


            return facultyList;

        } catch (error) {

            console.error(
                "Failed to load faculty data:",
                error
            );

            facultyData =
                {
                    ...defaultFacultyData
                };


            facultyList =
                Object.values(
                    defaultFacultyData
                );


            console.warn(
                "Using fallback faculty data."
            );

            return facultyList;

        }

    }

    function getFacultyIdFromButton(
        button,
        index
    ) {

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


        if (!facultyId) {

            facultyId =
                "faculty-" +
                String(index + 1)
                    .padStart(2, "0");

        }

        return facultyId;

    }

    function getFacultyForButton(
        button,
        index
    ) {

        const facultyId =
            getFacultyIdFromButton(
                button,
                index
            );


        let faculty =
            facultyData[facultyId];

        if (!faculty) {

            const numericId =
                facultyId
                    .replace(
                        "faculty-",
                        ""
                    );


            faculty =
                facultyData[numericId];

        }

        if (
            !faculty &&
            facultyList[index]
        ) {

            faculty =
                facultyList[index];

        }

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

                id:
                    facultyId,


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

        return faculty;

    }

    function attachProfileButtons() {

        const profileButtons =
            document.querySelectorAll(
                ".view-profile, [data-faculty], [data-id], [data-profile]"
            );


        let profileButtonCount =
            0;

        profileButtons.forEach(
            function (button, index) {

                const buttonText =
                    button.textContent
                        .trim()
                        .toLowerCase();

                if (
                    !buttonText.includes(
                        "view profile"
                    ) &&
                    !button.classList.contains(
                        "view-profile"
                    )
                ) {

                    return;

                }


                profileButtonCount++;

                if (
                    button.dataset
                        .facultyListenerAttached ===
                    "true"
                ) {

                    return;

                }

                button.dataset
                    .facultyListenerAttached =
                    "true";


                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        const faculty =
                            getFacultyForButton(
                                button,
                                index
                            );


                        openFacultyModal(
                            faculty
                        );

                    }
                );

            }
        );

        console.log(
            "View Profile buttons detected:",
            profileButtonCount
        );


        if (
            profileButtonCount === 0
        ) {

            console.warn(
                "WARNING: No 'View Profile' button was detected."
            );

            console.warn(
                "Make sure your faculty cards contain a button or link with the text 'View Profile'."
            );

        }

    }

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                const modal =
                    document.getElementById(
                        "ecoastFacultyModal"
                    );


                if (
                    modal &&
                    modal.style.display !==
                    "none"
                ) {

                    closeFacultyModal();

                }

            }

        }
    );

    async function initializeFaculties() {

        createFacultyModal();

        await loadFaculties();

        attachProfileButtons();


        console.log(
            "ECOAST HUB Faculty Directory initialized."
        );

    }

    initializeFaculties();

});
