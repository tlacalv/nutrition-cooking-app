import Api from './api.js'
import jsonwebtoken from 'jsonwebtoken'


export const useSession = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  if(refreshToken !== 'undefined' && refreshToken) {
    const {token, status} = await Api.post('auth/token',{
      token: refreshToken
    })
    if(status !== 403) {
      const payload = jsonwebtoken.decode(token)
      const { data } = await Api.get(`users/${payload.sub}`,{
        'Authorization': `Bearer ${token}` 
      })
      return {user: data, token}
    }else {
      localStorage.removeItem('refreshToken')
    }
  }
  return {user: undefined, token: undefined}
}

export const signout = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  if(refreshToken !== 'undefined') {
    const response = await Api.delete('auth/logout', {
      token: refreshToken
    })
    if(response.status === 200) {
      localStorage.removeItem('refreshToken')
      window.location.replace("/");
      return true
    }
  }
  return false
}

export const signin = async (email, password) => {
  const {token, refreshToken, user, status} = await Api.post('auth/login',{},{
    'Authorization': `Basic ${btoa(`${email}:${password}`)}`
  })
  localStorage.setItem('refreshToken',refreshToken)
  
  
  if(status===401) {
    throw(`Invalid email or password`)
  }
  if(status !== 401 && status !== 200) {
    throw(`Something went wrong, Error: ${status}`)
  }

  return { token, user }
}

export const registerUser = async (newUser) => {
  const {status} = await Api.post('auth/sign-up', newUser)
  if(status !== 201) {
    throw('Failed to Sign up')
  }
}