const ECOAST_API = {
    baseURL: "https://ecoasthub.great-site.net/backend",

    endpoints: {
        health: "index.php",
        announcements: "announcements.php",
        faculties: "faculties.php",
        officers: "officers.php",
        curriculum: "curriculum.php",
        activities: "activities.php"
    }
};

async function fetchAPI(endpoint) {

    try {

        const response = await fetch(
            `${ECOAST_API.baseURL}/${endpoint}`,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                },
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error(
                `API request failed with status ${response.status}`
            );
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(
                result.message || "API request failed."
            );
        }

        return result;

    } catch (error) {

        console.error("ECOAST API Error:", error);

        return {
            success: false,
            count: 0,
            data: [],
            message: error.message || "Unable to connect to the server."
        };
    }
}

async function checkAPIHealth() {

    return await fetchAPI(
        ECOAST_API.endpoints.health
    );
}

async function getAnnouncements() {

    return await fetchAPI(
        ECOAST_API.endpoints.announcements
    );
}

async function getFaculties() {

    return await fetchAPI(
        ECOAST_API.endpoints.faculties
    );
}

async function getOfficers() {

    return await fetchAPI(
        ECOAST_API.endpoints.officers
    );
}

async function getCurriculum() {

    return await fetchAPI(
        ECOAST_API.endpoints.curriculum
    );
}

async function getActivities() {

    return await fetchAPI(
        ECOAST_API.endpoints.activities
    );
}

window.ECOAST_API = ECOAST_API;

window.fetchAPI = fetchAPI;
window.checkAPIHealth = checkAPIHealth;

window.getAnnouncements = getAnnouncements;
window.getFaculties = getFaculties;
window.getOfficers = getOfficers;
window.getCurriculum = getCurriculum;
window.getActivities = getActivities;