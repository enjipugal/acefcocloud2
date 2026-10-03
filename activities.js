const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });

}

async function loadActivities() {

    const activitiesGrid =
        document.getElementById("activitiesGrid");

    if (!activitiesGrid) {
        return;
    }

    activitiesGrid.innerHTML = `
        <div class="activity-loading">
            Loading activities...
        </div>
    `;

    try {

        const result = await getActivities();

        if (
            !result ||
            !result.success ||
            !Array.isArray(result.data)
        ) {

            throw new Error(
                result?.message ||
                "Unable to load activities."
            );

        }

        if (result.data.length === 0) {

            activitiesGrid.innerHTML = `
                <div class="activity-empty">
                    <h3>No Activities Yet</h3>

                    <p>
                        ECOAST activities and events will
                        appear here once they are added.
                    </p>
                </div>
            `;

            return;
        }

        activitiesGrid.innerHTML =
            result.data.map(activity => {

                return createActivityCard(activity);

            }).join("");

    } catch (error) {

        console.error(
            "Activities loading error:",
            error
        );

        activitiesGrid.innerHTML = `
            <div class="activity-error">
                <h3>Unable to Load Activities</h3>

                <p>
                    Please try again later.
                </p>
            </div>
        `;
    }
}

function createActivityCard(activity) {

    const title =
        escapeHTML(activity.title || "Untitled Activity");

    const type =
        escapeHTML(activity.activity_type || "Activity");

    const description =
        escapeHTML(
            activity.description ||
            "No description available."
        );

    const image =
        activity.image
            ? escapeHTML(activity.image)
            : "ECOAST Logo.png";

    const date =
        formatActivityDate(activity.activity_date);

    const achievementHTML =
        createAchievementHTML(activity.achievement);

    return `
        <article class="activity-card">

            <div class="activity-image">

                <img
                    src="${image}"
                    alt="${title}"
                >

                <div class="activity-type">
                    ${type}
                </div>

            </div>


            <div class="activity-content">

                <div class="activity-date">
                    ${date}
                </div>

                <h3>
                    ${title}
                </h3>

                <p>
                    ${description}
                </p>

                ${achievementHTML}

                <div class="activity-meta">

                    <span>
                        ${type}
                    </span>

                </div>

            </div>

        </article>
    `;
}

function formatActivityDate(dateValue) {

    if (!dateValue) {
        return "DATE TO BE ANNOUNCED";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return escapeHTML(dateValue);
    }

    return date.toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    ).toUpperCase();
}

function createAchievementHTML(achievement) {

    if (!achievement) {
        return "";
    }

    const text =
        escapeHTML(achievement);

    const items = text
        .split(/\r?\n/)
        .map(item => item.trim())
        .filter(item => item !== "");

    if (items.length === 0) {
        return "";
    }

    return `
        <div class="achievement-box">

            <div class="achievement-title">
                Achievements
            </div>

            ${items.map(item => `
                <div class="achievement-item">

                    <span class="achievement-icon">
                        ★
                    </span>

                    <span>
                        ${item}
                    </span>

                </div>
            `).join("")}

        </div>
    `;
}

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadActivities();

    }
);
