// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQf4kMgVfYMiDifbh9F_GWnubLMu3MexI",
  authDomain: "aktivo-333910.firebaseapp.com",
  projectId: "aktivo-333910",
  storageBucket: "aktivo-333910.appspot.com",
  messagingSenderId: "451311709950",
  appId: "1:451311709950:web:ec079969bf6e91eff9ffaf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export {
    db
}