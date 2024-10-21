import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence  } from "firebase/auth"

import { getFirestore } from "firebase/firestore"
import AsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
    apiKey: "AIzaSyBfkSxpoPvnC46BGGhL4inHCAwkZX0In9E",
    authDomain: "test-settings-brixcolor.firebaseapp.com",
    projectId: "test-settings-brixcolor",
    storageBucket: "test-settings-brixcolor.appspot.com",
    messagingSenderId: "163978717142",
    appId: "1:163978717142:web:755e14a9c95eba64a5a677",
    measurementId: "G-5L2STY7T5T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
// check firebase later

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export {app, auth, firestore }