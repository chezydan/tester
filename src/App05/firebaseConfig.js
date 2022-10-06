

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC4HNVwu_SYbSlHESSmzvb6cePMC9thgdU",
  authDomain: "archi-gal.firebaseapp.com",
  projectId: "archi-gal",
  storageBucket: "archi-gal.appspot.com",
  messagingSenderId: "135949904115",
  appId: "1:135949904115:web:19b545e7a64b47a1906f86",
  measurementId: "G-TERBC2K3EX"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)