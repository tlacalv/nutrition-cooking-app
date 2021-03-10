import React, { useContext, useState, useEffect } from 'react'
import {useSession, signout, signin, registerUser} from '../utils/auth'
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/signup'
]
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
    let interval;
    const {user, token} = await useSession()
    if(user && token) {
      setJWT(token)
      setCurrentUser(user)
      clearInterval(interval)
      interval = setInterval(async () => {
        const {user, token} = await useSession()
        setJWT(token)
        setCurrentUser(user)
      },840000);
    }
    setLoading(false)
  }, [])
  
  const value = {
    currentUser,
    JWT,
    login,
    signup,
    logout,
    loading
  }
  return (
    <AuthContext.Provider value ={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!currentUser && !PUBLIC_ROUTES.includes(window.location.pathname))){
      window.location.replace('/')
    }
  },[typeof window !== "undefined" ? window.location.pathname: '', loading])
  return (children);
};