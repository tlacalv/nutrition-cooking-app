
class Api {
  constructor() {
    this.baseUrl = 'https://nutrition-api-radeon777.vercel.app/api/'
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  async get(uri) {
    fetch(
      `${this.baseUrl}${uri}`,
      {
        method: 'GET',
        headers: {
          ...this.headers
        }
      }
    )
  }
  async post(uri, body) {
    try {
      const response = await fetch(
        `${this.baseUrl}${uri}`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            ...this.headers
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