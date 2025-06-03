// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXL1iWA9JrV8B54a-wqyuUQ1Pvvu0s-48",
  authDomain: "recipe-web-8251e.firebaseapp.com",
  projectId: "recipe-web-8251e",
  storageBucket: "recipe-web-8251e.firebasestorage.app",
  messagingSenderId: "547726038230",
  appId: "1:547726038230:web:01ff42ac380fee0a912577",
  measurementId: "G-ZB94T916VM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);