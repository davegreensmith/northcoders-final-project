import { userContext } from './userContext';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../firebase/config.js';

export default function authContextProvider() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return { user };
}
