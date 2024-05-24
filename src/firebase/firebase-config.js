import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQUxUJC4tIVmS6btk33t8_gClvriTUH4A",
  authDomain: "wedding-3496e.firebaseapp.com",
  projectId: "wedding-3496e",
  storageBucket: "wedding-3496e.appspot.com",
  messagingSenderId: "628680884970",
  appId: "1:628680884970:web:d4e619e1cccd2636c14d93",
  measurementId: "G-9YS5V7XKJ7",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
