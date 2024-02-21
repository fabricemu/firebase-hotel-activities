document.addEventListener("DOMContentLoaded", function () {
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
                    window.location.href = `home.html`;
                })
                .catch((error) => {
                    console.error("Login error:", error);
                    hideSpinner();
                    alert("Login failed. Please check your email and password.");
                });
            // db.collection("client").doc(userAccount.user.uid).get()
            //     .then((doc) => {
            //         if (doc.exists) {
            //             const userData = doc.data();
            //             sessionStorage.setItem("user", JSON.stringify(userData));
            //
            //             // Check if the user is an admin
            //             if (userData.isAdmin) {
            //                 // Redirect the user to the admin page
            //                 window.location.href = `admin.html`;
            //             } else {
            //                 // Redirect the user to the home page
            //                 window.location.href = `home.html`;
            //             }
            //         } else {
            //             // User profile does not exist
            //             console.error("User profile not found.");
            //             hideSpinner();
            //             alert("Login failed. User profile not found.");
            //         }
            //     })
            //     .catch((error) => {
            //         console.error("Error fetching user profile:", error);
            //         hideSpinner();
            //         alert("Login failed. An error occurred while fetching user profile.");
            //     });
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
                    let isAdmin = false;
                    db.collection("client").doc().set({
                        first_name,
                        second_name,
                        email,
                        phoneNumber,
                        isAdmin,
                        created_at: new Date()
                    })
                        .then((userProfile) => {
                            alert("Registration successfull ✅ ")
                            window.location.href = "../login.html"
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


});