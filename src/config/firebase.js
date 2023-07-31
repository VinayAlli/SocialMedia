// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB95pUIURIldjHQ3FEx-fj6LJj2eiYRC5M",
  authDomain: "react-app-65a17.firebaseapp.com",
  projectId: "react-app-65a17",
  storageBucket: "react-app-65a17.appspot.com",
  messagingSenderId: "702684130694",
  appId: "1:702684130694:web:98ef82fd013b7c0a2ad007"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app)