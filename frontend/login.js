// ========================================
// LOGIN USER
// Validates credentials against backend
// ========================================

async function login() {

    // Get entered username
    const username =
        document
            .getElementById(
                "username"
            )
            .value
            .trim();

    // Get entered password
    const password =
        document
            .getElementById(
                "password"
            )
            .value
            .trim();

    // Validation
    if (
        username === "" ||
        password === ""
    ) {

        document
            .getElementById(
                "loginError"
            )
            .textContent =
            "Username and Password are required.";

        return;

    }

    try {

        // Send credentials to backend
        const response =
            await fetch(
                "http://localhost:3000/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body:
                    JSON.stringify({
                        username,
                        password
                    })
                }
            );

        const result =
            await response.json();

        // Authentication failed
        if (!response.ok) {

            document
                .getElementById(
                    "loginError"
                )
                .textContent =
                result.message;

            return;

        }

        // Save login session
        sessionStorage.setItem(
            "loggedInUser",
            result.username
        );

        // Open main application
        window.location.href =
            "index.html";

    }
    catch (error) {

        console.error(error);

        document
            .getElementById(
                "loginError"
            )
            .textContent =
            "Unable to connect to server.";

    }

}
