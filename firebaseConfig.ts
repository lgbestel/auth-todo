import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7jyWuWZMFR0HRvpDYYQTN2E8PXHEeuWc",
  authDomain: "auth-todo-3b583.firebaseapp.com",
  projectId: "auth-todo-3b583",
  storageBucket: "auth-todo-3b583.appspot.com",
  messagingSenderId: "619331843995",
  appId: "1:619331843995:web:3636a64b1bfd604b56933e"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const fireStore = getFirestore(firebaseApp);
