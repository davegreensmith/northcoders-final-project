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
  onAuthStateChanged,
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
// const [user, setUser] = useState(null);

//collection refs
export const usersRef = collection(db, "users");
export const errandsRef = collection(db, "errands");

//get collection ref data
export function fetchUsers() {
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
      console.log(email, "<<< email");
      addUser(email, id);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

//logging out
export function userLogout() {
  signOut(auth)
    .then(() => {
      console.log("the user logged out");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

//logging in
export function userLogin(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user logged in", cred.user);
      return { msg: "working" };
    })
    .catch((err) => {
      console.log(err.message);
    });
}

//add errands to database
export function addErrand(errandDetails) {
  const errandRef = collection(db, "errands");

  addDoc(errandRef, errandDetails)
    .then((mystery) => {
      // console.log(mystery._key.path.segments[1], '<<< errand doc number');
      // console.log(mystery.firestore._firestoreClient.user.uid, '<<< users UID');
      console.log("users table updated");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

//delete users
export function deleteUser(id) {
  const userRef = doc(db, "users", id);

  deleteDoc(userRef).then(() => {
    console.log("user deleted");
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

//update errands
export function updateErrand(errandID, updateBody) {
  const errandRef = doc(db, "errands", errandID);

  updateDoc(errandRef, updateBody).then(() => {
    console.log("errand updated");
  });
}

updateErrand("jTUz4CRGZPT9vSS3YNiM", {
  author: "saleh",
  description: "new description",
  dueDate: "yesterday",
  errandName: "really difficult task",
  location: "liverpool",
  requirements: "none",
  timeframe: "2 days",
  type: "easy work",
});

//delete errands
export function deleteErrand(errandID) {
  const errandRef = doc(db, "errands", errandID);

  deleteDoc(errandRef).then(() => {
    console.log("errand deleted");
  });
}

//get all errands
export function fetchErrands() {
  getDocs(errandsRef)
    .then((snapshot) => {
      let errands = [];
      snapshot.docs.forEach((doc) => {
        errands.push({ ...doc.data(), id: doc.id });
      });
      console.log(errands, "<<< errands list");
    })
    .catch((err) => {
      console.log(err.message, "<<< errands errors");
    });
}

addErrand({
  author: "christian",
  description: "new description",
  dueDate: "yesterday",
  errandName: "really difficult task",
  location: "liverpool",
  requirements: "none",
  timeframe: "2 days",
  type: "easy work",
});
addErrand({
  author: "jim",
  description: "new description",
  dueDate: "yesterday",
  errandName: "really difficult task",
  location: "liverpool",
  requirements: "none",
  timeframe: "2 days",
  type: "easy work",
});
fetchErrands();
