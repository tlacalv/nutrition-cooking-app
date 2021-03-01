import React, { useContext, useState, useEffect } from 'react'
import {useSession, signout, signin, registerUser} from '../utils/auth'
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [JWT, setJWT] = useState('')
  const [loading, setLoading] = useState(true)

  function signup(newUser) {
    return registerUser(newUser)
  }
  function logout() {
    return signout()
  }
  async function login(email, password) {
    const {token, user} = await signin(email,password)
    setJWT(token)
    setCurrentUser(user)
  }

  useEffect(async () => {
    const {user, token} = await useSession()
    setJWT(token)
    setCurrentUser(user)
    setLoading(false)
  }, [])
  
  const value = {
    currentUser,
    JWT,
    login,
    signup,
    logout
  }
  return (
    <AuthContext.Provider value ={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
