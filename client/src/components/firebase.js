// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "quizapponemnc.firebaseapp.com",
  projectId: "quizapponemnc",
  storageBucket: "quizapponemnc.appspot.com",
  messagingSenderId: "373946173714",
  appId: "1:373946173714:web:39cb8fc0c495ac11da4bcb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);