
import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth'   //newly added
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from 'firebase/storage'



const firebaseConfig = {
  apiKey: "AIzaSyBMgxTYyIli1yUBPiKGxLauQLQG5DI0eo8",
  authDomain: "fir-practice-bd7af.firebaseapp.com",
  projectId: "fir-practice-bd7af",
  storageBucket: "fir-practice-bd7af.appspot.com",
  messagingSenderId: "946029218252",
  appId: "1:946029218252:web:bb87d0cd7078dd9e733569",
  measurementId: "G-TDGKYWLHYH"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app) //newly added


export default auth

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);


