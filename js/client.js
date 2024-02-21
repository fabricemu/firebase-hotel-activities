const onSignup = () => {
    const first_name = document.getElementById("firstname").value;
    const second_name = document.getElementById("secondname").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    const password = document.getElementById("password").value;
    console.log({
        first_name, second_name, email, password, phoneNumber
    })
    auth.createUserWithEmailAndPassword(email, password)
        .then((clientAccount) => {
            console.log(clientAccountAccount)
            db.collection("client").doc().set({first_name, second_name, email, created_at: new Date(), phoneNumber})
                .then((clientAccountProfile) => {
                    alert("Registration successfull ✅ ")
                    console.log(clientAccountProfile);
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