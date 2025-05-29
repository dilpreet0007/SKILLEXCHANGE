// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7VcQdwC1Zm3Y2PLzg9nMhuk9YerraNAM",
  authDomain: "skillexchange-495ae.firebaseapp.com",
  projectId: "skillexchange-495ae",
  storageBucket: "skillexchange-495ae.appspot.com", // ✅ FIXED
  messagingSenderId: "299366281095",
  appId: "1:299366281095:web:83d6027772b7d753abad22",
  measurementId: "G-10H9Q47RE2"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
