import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
  
const firebaseConfig = {
    apiKey: "AIzaSyCNvx_pkMLkyElGP9sO-G9e48TFBdXVnA8",
    authDomain: "brixcolor-capstone.firebaseapp.com",
    projectId: "brixcolor-capstone",
    storageBucket: "brixcolor-capstone.appspot.com",
    messagingSenderId: "3234107138",
    appId: "1:3234107138:web:62243554e1258944e0bc1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// check firebase later

const auth = getAuth(app)

export {app, auth}