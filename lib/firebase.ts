import { initializeApp, FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWthT-Ss0osxnB-JuP1pOmtD0NPvBynds",
  authDomain: "medicare-app-91142.firebaseapp.com",
  projectId: "medicare-app-91142",
  storageBucket: "medicare-app-91142.firebasestorage.app",
  messagingSenderId: "896555944179",
  appId: "1:896555944179:web:923b2b822205b0e790cf86",
  measurementId: "G-Y5T0LWJXMN",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);

console.log("Firebase Initialized.");
