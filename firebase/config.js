import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

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

let loggedInUser = {};

auth.onAuthStateChanged(function (user) {
  if (user) {
    loggedInUser = user;
  }
});

//collection refs
export const usersRef = collection(db, "users");
export const errandsRef = collection(db, "errands");

//get collection ref data
export function fetchUsers() {
  getDocs(usersRef)
    .then((snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
    })
    .catch((err) => {});
}

// write new user to the database
export function addUser(email, id) {
  const userRef = doc(db, "users", id);

  return Promise.all([setDoc(userRef, { email }), id])
    .then(([undefined, id]) => {
      return { id };
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// create new user in firebase auth
export function signUpNewUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      return Promise.all([
        cred.user.reloadUserInfo.email,
        cred.user.reloadUserInfo.localId,
      ]);
    })
    .then(([email, id]) => {
      return addUser(email, id);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

//logging out
export function userLogout() {
  signOut(auth).catch((err) => {
    console.log(err.message);
  });
}

//logging in
export function userLogin(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log(`${cred.user.uid} logged in. <<< userLogin`);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

//add errands to database
export function addErrand(errandDetails) {
  const errandRef = collection(db, "errands");

  addDoc(errandRef, errandDetails)
    .then((data) => {
      const errandNum = data._key.path.segments[1];
      const errandUid = data.firestore._firestoreClient.user.uid;
      return { errandNum, errandUid };
    })
    .catch((err) => {
      console.log(err.message);
    });
}

//delete users
export function deleteUser(id) {
  const userRef = doc(db, "users", id);

  deleteDoc(userRef);
}

//update user info
export function updateUserInfo(userId, userDetails) {
  const userRef = doc(db, "users", userId);

  updateDoc(userRef, userDetails);
}

//update errands
export function updateErrand(errandID, updateBody) {
  const errandRef = doc(db, "errands", errandID);

  updateDoc(errandRef, updateBody);
}

//delete errands
export function deleteErrand(errandID) {
  const errandRef = doc(db, "errands", errandID);

  deleteDoc(errandRef);
}

//get all errands
export function fetchErrands() {
  getDocs(errandsRef)
    .then((snapshot) => {
      let errands = [];
      snapshot.docs.forEach((doc) => {
        errands.push({ ...doc.data(), id: doc.id });
      });
    })
    .catch((err) => {
      console.log(err.message, "<<< errands errors");
    });
}

//CHAT MESSAGES

//add message to db
export function addMessage(message, userId1, userId2) {
  const messageObj = { message, userId1, userId2 };
  const messageRef = collection(db, "messages");

  addDoc(messageRef, messageObj)
    .then((data) => {
      // console.log(data._key.path.segments[1], '<<< errand doc number');
      // console.log(data.firestore._firestoreClient.user.uid, '<<< users UID');
    })
    .catch((err) => {
      console.log(err.message);
    });
}

userLogin("test123@gmail.com", "pa55w0rd");
