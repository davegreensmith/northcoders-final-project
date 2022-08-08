import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCl97mht3QLs6YOeh9ugsWba0cFE5PhFhs",
  authDomain: "chip-in-db.firebaseapp.com",
  projectId: "chip-in-db",
  storageBucket: "chip-in-db.appspot.com",
  messagingSenderId: "871906630927",
  appId: "1:871906630927:web:7f4fb5830005d79abaf27a",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();

//collection refs
export const usersRef = collection(db, "users");
export const errandsRef = collection(db, "errands");

//get collection ref data
export default function fetchUsers() {
  getDocs(usersRef)
    .then((snapshot) => {
      // console.log(snapshot.docs, "<<< snapshot");
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      console.log(users, "<<< users");
    })
    .catch((err) => {
      console.log(err.message, "<<< users errors");
    });
}

// write new user to the databaseauth
export function addUser(email, id) {
  const userRef = doc(db, "users", id);

  setDoc(userRef, { email })
    .then(() => {
      console.log("users table updated");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// create new user in firebase auth
export function signUpNewUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log(
        cred.user.reloadUserInfo.email,
        "<<< createUserwithPass email"
      );
      console.log(cred.user.reloadUserInfo.localId, "<<< auth ID");
      return Promise.all([
        cred.user.reloadUserInfo.email,
        cred.user.reloadUserInfo.localId,
      ]);
    })
    .then(([email, id]) => {
      setUser({ email, id });
      console.log(email, "<<< email");
      addUser(email, id);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

signUpNewUser("test123@gmail.com", "pa55w0rd");

//logging in and out
export function userLogout() {
  signOut(auth)
    .then(() => {
      console.log("the user logged out");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export function userLogin(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("user logged in");
      return { msg: "working" };
    })
    .catch((err) => {
      console.log(err.message);
    });
}

//update user info
export function updateUserInfo() {
  const userRef = doc(db, "users", auth.currentUser.reloadUserInfo.localId);

  updateDoc(userRef, {
    fname: "Jan",
  }).then(() => {
    console.log("user updated");
  });
}
