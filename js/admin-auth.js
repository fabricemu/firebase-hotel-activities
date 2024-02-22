const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const submitBtn = document.getElementById("submitBtn");

const showSpinner = (text) => {
    submitBtn.innerHTML = `<span class="spinner"></span> ${text}`;
    submitBtn.disabled = true;
};

// Function to hide spinner animation
const hideSpinner = () => {
    submitBtn.innerHTML = "Login";
    submitBtn.disabled = false;
};
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Show spinner animation
        showSpinner("Logging in...");

        // Sign in with email and password
        auth.signInWithEmailAndPassword(email, password)
            .then((userAccount) => {
                const userData = userAccount.user
                sessionStorage.setItem("user", JSON.stringify(userData))
                window.location.href = `admin.html`;
            })
            .catch((error) => {
                console.error("Login error:", error);
                hideSpinner();
                alert("Login failed. Please check your email and password.");
            });
    });
} else {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const first_name = document.getElementById("firstname").value;
        const second_name = document.getElementById("secondname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const phoneNumber = document.getElementById("phoneNumber").value;

        showSpinner("Registering...");

        auth.createUserWithEmailAndPassword(email, password)
            .then((userAccount) => {
                console.log(userAccount)
                let isAdmin = true;
                db.collection("users").doc().set({
                    first_name,
                    second_name,
                    email,
                    phoneNumber,
                    isAdmin,
                    created_at: new Date()
                })
                    .then((userProfile) => {
                        alert("Registration successfull ✅ ")
                        window.location.href = "admin-login.html"
                    })
                    .catch((error) => {
                        alert("Not successfull ❌")
                        console.log(error);
                    })
            })
            .catch((error) => {
                hideSpinner();
                console.error("Registration error:", error);
                alert("error occurred, read console");
            })
    });
}
