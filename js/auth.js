const onSignup = () => {
    const first_name = document.getElementById("firstname").value;
    const second_name = document.getElementById("secondname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    console.log({
        first_name, second_name, email, password
    })
    auth.createUserWithEmailAndPassword(email, password)
        .then((userAccount) => {
            console.log(userAccount)
            db.collection("client").doc().set({first_name, second_name, email, phoneNumber, created_at: new Date()})
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
            alert("error occured");
            console.log(error);
        })

}

const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const showSpinner = () => {
    loginBtn.innerHTML = '<span class="spinner"></span> Logging in...';
    loginBtn.disabled = true;
};

// Function to hide spinner animation
const hideSpinner = () => {
    loginBtn.innerHTML = "Login";
    loginBtn.disabled = false;
};

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Show spinner animation
    showSpinner();

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
});
// const onsignin = () => {
//
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//
//
//     auth.signInWithEmailAndPassword(email, password)
//         .then((userAccount) => {
//             const userData = userAccount.user
//             sessionStorage.setItem("user", JSON.stringify(userData))
//             window.location.href = `home.html`;
//         })
//         .catch((error) => {
//             alert("error occured");
//             console.log(error);
//         })
// }