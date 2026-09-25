import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import app from "./firebaseConfig.js";

const auth = getAuth(app);


// Login
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};


// Logout
export const logoutUser = () => {
  return signOut(auth);
};


// Listen for authentication changes
export const subscribeToAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};


// Firebase auth instance
export default auth;