// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (Replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyC8UY_LIq0H_27vgGCfTir1UvY92ZdeRiE",
    authDomain: "globetrotter-1b203.firebaseapp.com",
    projectId: "globetrotter-1b203",
    storageBucket: "globetrotter-1b203.firebasestorage.app",
    messagingSenderId: "697120748920",
    appId: "1:697120748920:web:4fa8bf4cfdb302ac07048d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
