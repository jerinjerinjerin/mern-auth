// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-48870.firebaseapp.com",
  projectId: "mern-auth-48870",
  storageBucket: "mern-auth-48870.appspot.com",
  messagingSenderId: "206769237619",
  appId: "1:206769237619:web:6383171c21273313414406"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);