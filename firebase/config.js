import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { convertLocationToLatLong } from "../utils/api";

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
export const loggedInUserId = loggedInUser.uid;

export function sendResetPasswordEmail(email) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("password email sent!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

//collection refs
export const usersRef = collection(db, "users");
export const errandsRef = collection(db, "errands");
export const latlongsRef = collection(db, "latlongs");

//USER DATA
//get logged in username
export function getUsername() {
  const userId = loggedInUser.uid;
  const docRef = doc(db, "users", userId);

  return getDoc(docRef).then((doc) => {
    const user = doc.data();
    return user.username;
  });
}

export function getUsersLatLong() {
  const userId = loggedInUser.uid;
  const docRef = doc(db, "users", userId);

  return getDoc(docRef).then((doc) => {
    const user = doc.data();

    return user.longLatData;
  });
}

//get all users
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

  return Promise.all([setDoc(userRef, { email, errands: [] }), id])
    .then(([undefined, id]) => {
      return { id };
    })
    .catch((err) => {
      console.log(err.message, "<<< in addUser");
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
  return signInWithEmailAndPassword(auth, email, password);
}

//delete users
export function deleteUser(id) {
  const userRef = doc(db, "users", id);
  deleteDoc(userRef);
}

//update user info
export function updateUserInfo(userId, userDetails) {
  const userRef = doc(db, "users", userId);
  return Promise.all([
    convertLocationToLatLong(userDetails.location),
    userRef,
    userDetails,
  ]).then(([{ longLatData }, userRef, userDetails]) => {
    const addDetail = { ...userDetails, longLatData };
    updateDoc(userRef, addDetail);
  });
}

//get logged in user info
export function getUserInfo() {
  const userRef = doc(db, "users", loggedInUser.uid);
  return getDoc(userRef).then((data) => {
    const userData = { ...data.data() };
    return { userData };
  });
}

export function updateUserErrandList(userId, addDetail) {
  const userRef = doc(db, "users", userId);

  return updateDoc(userRef, addDetail);
}

//ERRANDS
//add errands to database
export function addErrand(errandDetails) {
  const errandRef = collection(db, "errands");

  return addDoc(errandRef, errandDetails)
    .then((data) => {
      const errandID = data._key.path.segments[1];
      const errandUserId = data.firestore._firestoreClient.user.uid;
      return { errandID, errandUserId };
    })
    .catch((err) => {
      console.log(err.message);
    });
}

//add errand to specfic user
export function addErrandToUser(errandID, errandUserID) {
  const user = doc(db, "users", errandUserID);
  updateDoc(user, {
    errands: arrayUnion(errandID),
  });
}

//remove user from errand
export function removeUserFromErrand() {
  const errandRef = doc(db, "errands", errandID);
}

export function updateErrand(errandID, updateBody) {
  const errandRef = doc(db, "errands", errandID);
  updateDoc(errandRef, updateBody);
}

//delete errands
export function deleteErrand(errandID) {
  const userId = loggedInUser.uid;

  const errandRef = doc(db, "errands", errandID);

  return Promise.all([deleteDoc(errandRef), errandID, userId]);
}

//get all errands
export function fetchErrands() {
  return getDocs(errandsRef)
    .then((snapshot) => {
      let errands = [];
      snapshot.docs.forEach((doc) => {
        errands.push({ ...doc.data(), id: doc.id });
      });
      return errands;
    })
    .catch((err) => {
      console.log(err.message, "<<< errands errors");
    });
}

//get all errands for the logged in user
export function getUserErrands() {}

//get all latlongs for errands
export function fetchLatLongs() {
  return getDocs(latlongsRef).then((snapshot) => {
    let latLongs = [];
    snapshot.docs.forEach((doc) => {
      latLongs.push({ ...doc.data() });
    });
    return { latLongs };
  });
}

export function addLatLong(latlongDetails) {
  return addDoc(latlongsRef, latlongDetails).then((mystery) => {
    const latLongID = mystery._key.path.segments[1];
    return { latLongID };
  });
}

export function updateLatLong(latLongID, updateBody) {
  const latLongRef = doc(db, "latlongs", latLongID);
  updateDoc(latLongRef, updateBody);
}

export function fetchErrandByErrandID(errandID) {
  const errandRef = doc(db, "errands", errandID);
  return Promise.all([getDoc(errandRef, errandID), errandID]).then(
    ([data, errandID]) => {
      const errandData = { ...data.data(), errandID };
      return errandData;
    }
  );
}

export function fetchErrandsByUserID() {
  return fetchErrands().then((errands) => {
    return Promise.all([getUsername(), errands]).then(([username, errands]) => {
      const myChipIns = errands.filter((errand) => {
        return errand.chippers.includes(username);
      });
      return myChipIns;
    });
  });
}

export function deleteLatLongByErrandId(errandID) {
  return fetchErrandByErrandID(errandID)
    .then((errandData) => {
      const latlongID = errandData.latLongID;
      return deleteFoundLatLong(latlongID).then((undefined) => {});
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteFoundLatLong(latlongID) {
  const latLongRef = doc(db, "latlongs", latlongID);

  deleteDoc(latLongRef);
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

// fetch messages in realtime

// export function fetchMessage(messageId) {}

// export function fetchErrands() {
//   getDocs(errandsRef)
//     .then((snapshot) => {
//       let errands = [];
//       snapshot.docs.forEach((doc) => {
//         errands.push({ ...doc.data(), id: doc.id });
//       });
//     })
//     .catch((err) => {
//       console.log(err.message, '<<< errands errors');
//     });
// }
