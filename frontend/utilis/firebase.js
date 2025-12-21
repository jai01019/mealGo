// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mealgo-f9f3a.firebaseapp.com",
  projectId: "mealgo-f9f3a",
  storageBucket: "mealgo-f9f3a.firebasestorage.app",
  messagingSenderId: "662546567906",
  appId: "1:662546567906:web:b33c8b89fc1194d17384bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth,app};