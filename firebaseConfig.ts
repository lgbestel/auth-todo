import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
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
export const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const fireStore = getFirestore(firebaseApp);
