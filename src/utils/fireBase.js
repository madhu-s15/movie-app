// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGrpVV81UCjJI7ISBR7TUHtSaiSHMwJeQ",
  authDomain: "netflicks-49d83.firebaseapp.com",
  projectId: "netflicks-49d83",
  storageBucket: "netflicks-49d83.firebasestorage.app",
  messagingSenderId: "1088047826516",
  appId: "1:1088047826516:web:532b8d47db6ae5fe378fc1",
  measurementId: "G-37ETBPHNLY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
