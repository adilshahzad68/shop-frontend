import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase.config';
import { createUserWithEmailAndPassword, signInWithPopup, getAuth, signOut, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth"

export const AuthContext = createContext();
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUser = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    // const resetPassword = email => {
    //     setLoading(true)
    //     return sendPasswordResetEmail(auth, email)
    // }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe();
    }, [])

    const authInfo = { user, createUser, loading, logIn, logOut, setLoading, updateUser, googleLogin }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;