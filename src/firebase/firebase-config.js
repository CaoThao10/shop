// src/firebase/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX3Yy8y9sAFvRidK18OahBo-5HCwA_Jlc",
  authDomain: "shop-6d0ff.firebaseapp.com",
  projectId: "shop-6d0ff",
  storageBucket: "shop-6d0ff.appspot.com",
  messagingSenderId: "415730030255",
  appId: "1:415730030255:web:a213c250e57d86af7a265a",
  measurementId: "G-BPYN17HZ89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
