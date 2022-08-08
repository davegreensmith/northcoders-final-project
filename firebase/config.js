import { initializeApp } from "firebase/app";
import { getFireStore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCl97mht3QLs6YOeh9ugsWba0cFE5PhFhs",
  authDomain: "chip-in-db.firebaseapp.com",
  projectId: "chip-in-db",
  storageBucket: "chip-in-db.appspot.com",
  messagingSenderId: "871906630927",
  appId: "1:871906630927:web:7f4fb5830005d79abaf27a",
};

const app = initializeApp(firebaseConfig);

export const db = getFireStore(app);
export const auth = getAuth(app);
