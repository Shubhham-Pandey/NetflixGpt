// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMVauB0lnyduBCvQfs15KhMvD569hv_XE",
  authDomain: "netflixgpt-d032a.firebaseapp.com",
  projectId: "netflixgpt-d032a",
  storageBucket: "netflixgpt-d032a.appspot.com",
  messagingSenderId: "13658621071",
  appId: "1:13658621071:web:45dda22e3fb0d5532b1cfa",
  measurementId: "G-10MH1QRB45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();