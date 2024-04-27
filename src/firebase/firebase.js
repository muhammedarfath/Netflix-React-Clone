// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import 'firebase/compat/storage';
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAWVylUxYugHkhk81f1DDV8dzUHJqCX5QI",
    authDomain: "netflix-react-project-80b65.firebaseapp.com",
    projectId: "netflix-react-project-80b65",
    storageBucket: "netflix-react-project-80b65.appspot.com",
    messagingSenderId: "12455063163",
    appId: "1:12455063163:web:81e39d52f11f9516697cde",
    measurementId: "G-SEGG5J48CP"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore();
export default app;