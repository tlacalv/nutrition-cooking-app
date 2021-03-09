import Api from './api'

const fetchWithToken = (uri, token) => {
  return Api.get(uri, {'Authorization': `Bearer ${token}`})
}

export default fetchWithToken
