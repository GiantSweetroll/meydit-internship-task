import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyDHixMm-p69wmLx12z266BiAWwOh_nmmSI",
    authDomain: "meydit-internship-assignment.firebaseapp.com",
    projectId: "meydit-internship-assignment",
    storageBucket: "meydit-internship-assignment.appspot.com",
    messagingSenderId: "918853293420",
    appId: "1:918853293420:web:2cac0724dd3a9b5b608f49"
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;