// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDZxhY_D4R7Azg-Yf2Ztuhc1DaraCXJxk",
  authDomain: "fir-course-1ebcf.firebaseapp.com",
  projectId: "fir-course-1ebcf",
  storageBucket: "fir-course-1ebcf.appspot.com",
  messagingSenderId: "767965392391",
  appId: "1:767965392391:web:e16b9e9483b1b6eca604a2",
  measurementId: "G-N5H20LR26F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);