import { createUserWithEmailAndPassword } from 'firebase/auth';
import db from './config.js';
import auth from './config.js';

export const addUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log(cred.user, '<<< created user');
    })
    .catch((err) => {
      console.log(err);
    });
};

addUser('poten@gmail.com', 'pass');
