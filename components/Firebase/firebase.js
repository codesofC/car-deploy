// Import the functions you need from the SDKs you need
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut } from 'firebase/auth';
import { getFirestore, doc } from "firebase/firestore";
import { createContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAXVt8o7qCAWhjT2nf6kE3s6ZRHlUueR3Y",
  authDomain: "buycar-b880d.firebaseapp.com",
  projectId: "buycar-b880d",
  storageBucket: "buycar-b880d.appspot.com",
  messagingSenderId: "607153380170",
  appId: "1:607153380170:web:4749ad1866166682253fb3"
};

export const firebaseContext = createContext();

const Firebase = ({ children }) => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    //Initialize authentication
    const auth = getAuth(app);

    //Initialize database
    const db = getFirestore(app);

    const [userConnect, setUserConnect] = useState(false);
    const [uid, setUid] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    //Sign Up fnction
    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)

    //Sign In function
    const signin = (email, password) => signInWithEmailAndPassword(auth, email, password)

    //Verification connexion
    const stateConnection = userFunction => onAuthStateChanged(auth, userFunction)

    //Reset Password
    const resetPassword = email => sendPasswordResetEmail(auth, email)

    //Sign out connexion
    const signout = () => signOut(auth)

    //Connection database
    const user = uid => doc(db, `/users/${uid}`)

    return <firebaseContext.Provider 
                value={{db, signup, signin, stateConnection, 
                    resetPassword, signout, userConnect, 
                    setUserConnect, user, uid, setUid,
                    isLoading, setIsLoading}}
            >
                { children }
            </firebaseContext.Provider>

}

export default Firebase;