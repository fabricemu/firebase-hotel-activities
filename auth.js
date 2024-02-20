const onSignup = () =>{
    const first_name=document.getElementById("firstname").value;
    const second_name =document.getElementById("secondname").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const phoneNumber=document.getElementById("phoneNumber").value;
    console.log ({
        first_name,second_name,email ,password
    })
    auth.createUserWithEmailAndPassword(email,password )
.then ((userAccount)=>{
    console.log(userAccount)
    db.collection("client").doc().set({first_name,second_name,email,phoneNumber,created_at:new Date()})
    .then((userProfile)=>{
        alert("Registration successfull ✅ ")
        console.log(userProfile);
    })
    .catch((error)=>{
        alert("Not successfull ❌")
        console.log(error);
    })
})
   .catch((error)=>{
        alert("error occured");
        console.log(error);
   })
 
}

const onsignin= () =>{
    
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
   
    
    auth.signInWithEmailAndPassword(email,password )
.then ((userAccount)=>{
    // console.log(userAccount)
    // db.collection("client").doc().set({first_name,second_name,email,phoneNumber,created_at:new Date()})
    // .then((userProfile)=>{
    //     alert("Registration successfull ✅ ")
    //     console.log(userProfile);
    // })
    // .catch((error)=>{
    //     alert("Not successfull ❌")
    //     console.log(error);
    // })
    alert("login suceesfull")
    window.location.href = `home.html`;
})
   .catch((error)=>{
        alert("error occured");
        console.log(error);
   })
 
}