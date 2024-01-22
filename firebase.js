const firebaseConfig = {
    apiKey: "AIzaSyBZr1joPOhVAB07c0AZ8BIFLSQPtlBrknA",
    authDomain: "chris-s-fanta-tec-27d02.firebaseapp.com",
    projectId: "chris-s-fanta-tec-27d02",
    storageBucket: "chris-s-fanta-tec-27d02.appspot.com",
    messagingSenderId: "1018771016768",
    appId: "1:1018771016768:web:34faf485bd4bb7dfb663a5",
    measurementId: "G-54R56YTW9H"
  };

   // Initialize Firebase
   const app =firebase.initializeApp(firebaseConfig);
   const auth = firebase.auth();
   const db =firebase.firestore();
