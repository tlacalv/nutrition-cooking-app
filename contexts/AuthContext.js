import React, { useContext, useState, useEffect } from 'react'
import Api from '../api.js'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(newUser) {
    return Api.post('auth/sign-up', newUser)
  }
  function logout() {
    return auth.signOut()
  }
  function  login(email, password) {
    localStorage.setItem('token',JSON.stringify(newUser))
    console.log(JSON.parse(localStorage.getItem('token')))
    return auth.signInWithEmailAndPassword(email, password)
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    //check jwt existence
    //check jwt expiration
    //check refesh token existence
    //check refresh token expiration
    //set current user to undefined or user from JWT
    // const unsuscribe = auth.onAuthStateChanged(user => {
    //   setCurrentUser(user)
    //   setLoading(false)
    // })
    setLoading(false)
    // return unsuscribe
  }, [])
  
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }
  return (
    <AuthContext.Provider value ={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
