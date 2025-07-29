// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // <-- import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGcmsBesQgyAfwACpTU_gXgAWGwgVpD2k",
  authDomain: "the-studio-barbershop.firebaseapp.com",
  projectId: "the-studio-barbershop",
  storageBucket: "the-studio-barbershop.firebasestorage.app",
  messagingSenderId: "318762246721",
  appId: "1:318762246721:web:80ea1050ef149c09469cc0",
  measurementId: "G-EEZPS7TWQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Export the Firestore db so you can import it elsewhere
export { db };
