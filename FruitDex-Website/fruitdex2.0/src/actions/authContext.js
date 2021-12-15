import React, { useContext, useState, useEffect } from "react"
import { auth } from "./firebase"

const AuthContext = React.createContext()

//Access to AuthContext through useAuth Hook
export  function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState()

    //Signup user with credentials
    function signup(email, password){
        auth.createUserWithEmailAndPassword(email, password)
    }

    //Set currentUser variable after user created
    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false )
        })

        return unsubscribe 
    }, [])
 
    const value = {
        currentUser, 
        signup
    }


    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}