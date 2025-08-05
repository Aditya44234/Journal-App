// Firebase core and services
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAShp1zotHlIYtxpWGBi2KHx3giO5-2h6U",
  authDomain: "journal-app-4d0bd.firebaseapp.com",
  projectId: "journal-app-4d0bd",
  storageBucket: "journal-app-4d0bd.firebasestorage.app",
  messagingSenderId: "279485445005",
  appId: "1:279485445005:web:cf6b267a586edee53783c4",
  measurementId: "G-XV58GR9BDE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app); // Optional: only if you're actively using analytics

// Services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Set persistence (optional but recommended for session continuity)
setPersistence(auth, browserLocalPersistence).catch((error) =>
  console.error("Persistence error:", error)
);

// Google Auth Provider
const provider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const { displayName, email, photoURL } = result.user;

    localStorage.setItem("User", displayName);
    localStorage.setItem("EmailId", email);
    localStorage.setItem("UserPic", photoURL);

    console.log("Sign in successful:", result);
    return result;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.clear();
    console.log("User signed out");
  } catch (error) {
    console.error("Logout error:", error);
  }
};