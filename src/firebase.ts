// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsJNs_9af01051-UVunQNzuZIIswp7pOI",
    authDomain: "income-tracker-kg.firebaseapp.com",
    projectId: "income-tracker-kg",
    storageBucket: "income-tracker-kg.firebasestorage.app",
    messagingSenderId: "975363407562",
    appId: "1:975363407562:web:dd30b8f63f1861240e7e33",
    measurementId: "G-T4Q77WGS7F"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firebaseAnalytics = getAnalytics(firebaseApp);
export const firestore = getFirestore(firebaseApp);