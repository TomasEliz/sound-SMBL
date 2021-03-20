import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../configFb/firebase";

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)


const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const signUp = (email, password) => auth.createUserWithEmailAndPassword(email,password)

    const logIn = (email,password) => auth.signInWithEmailAndPassword(email,password)

    const logout = () => auth.signOut()

    useEffect(() => {
        const cleanUp = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return cleanUp
    },[])

    const values = {
        currentUser,
        setCurrentUser,
        signUp,
        logIn,
        logout,
    }

    return (
        <AuthContext.Provider value={values}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider