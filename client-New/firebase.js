// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbTjRbsNw8eerpA6O67aEYQiHQkRmo54Y",
  authDomain: "read2me-egwebdev.firebaseapp.com",
  projectId: "read2me-egwebdev",
  storageBucket: "read2me-egwebdev.firebasestorage.app",
  messagingSenderId: "1066553806135",
  appId: "1:1066553806135:web:c7208ca701affef42a1eb2",
  measurementId: "G-52EPZR9TVR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
