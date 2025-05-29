// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR API",
  authDomain: "Your Domain",
  projectId: "YOUR ID",
  storageBucket: "YOUR BUCKET", // ✅ FIXED
  messagingSenderId: "YOUR ID",
  appId: "YOUR APP ID",
  measurementId: "YOUR measurementId "
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
