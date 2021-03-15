
class Api {
  constructor() {
    this.baseUrl = 'https://nutrition-api-radeon777.vercel.app/api/'
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  async get(uri, headers={}) {
    try {
      const response = await fetch(
        `${this.baseUrl}${uri}`,
        {
          method: 'GET',
          headers: {
            ...this.headers,
            ...headers
          }
        }
      )
      if(response.status === 401) {
        throw(response.status)
      }
      const jsonData = await response.json()
      return {...jsonData, status: response.status}
    } catch(error) {
      console.error('api: ', error)
    }
    
  }
  async post(uri, body, headers={}) {
    try {
      const response = await fetch(
        `${this.baseUrl}${uri}`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            ...this.headers,
            ...headers
          },
          body: JSON.stringify(body)
        }
      )
      const jsonData = await response.json()
      return {...jsonData, status: response.status}

    } catch(error) {
      throw('api: ',error )
    }
  }
  async put(uri, body, headers={}) {
    try {
      const response = await fetch(
        `${this.baseUrl}${uri}`,
        {
          method: 'PUT',
          mode: 'cors',
          headers: {
            ...this.headers,
            ...headers
          },
          body: JSON.stringify(body)
        }
      )
      const jsonData = await response.json()
      return {...jsonData, status: response.status}

    } catch(error) {
      throw('api: ',error )
    }
  }
  async delete(uri, body, headers={}) {
    try {
      const response = await fetch(
        `${this.baseUrl}${uri}`,
        {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            ...this.headers,
            ...headers
          },
          body: JSON.stringify(body)
        }
      )
      const jsonData = await response.json()
      return {...jsonData, status: response.status}

    } catch(error) {
      console.error('api: ',error )
    }
  }

}

export default new Api()