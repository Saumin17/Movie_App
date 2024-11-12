// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDG7f2zVx8q3BaTAfTh4OfoAQAFEtCty2Q",
    authDomain: "moviesearch-f97f7.firebaseapp.com",
    projectId: "moviesearch-f97f7",
    storageBucket: "moviesearch-f97f7.firebasestorage.app",
    messagingSenderId: "718036291478",
    appId: "1:718036291478:web:ca5f09b156f108ff8297b7"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
