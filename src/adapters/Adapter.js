import { PARTIES_URL, PROFILE_URL } from './links'

class Adapter {
  // Class method for querying Spotify API with user's search term. Actual request to Spoitfy API
  // performed by back end to avoid CORS issues.
  static getSongs(fetchBody) {
    return this.fetchPost(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/search`, fetchBody)
  }

  // Class method to fetch all parties from backend
  static getAllEvents() {
    return ( fetch(PARTIES_URL).then(r => r.json()) )
  }

  // Class method to fetch all parties belonging to a user
  static getUsersParties() {
    return ( fetch(PROFILE_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('spotifyId')}`
      }
    }).then(r => r.json()) )
  }

  // Class method for creating a party to be stored in the backend
  static createEvent(fetchBody) {
    const fetchParams = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fetchBody)
    }

    return this.fetchPost(PARTIES_URL, fetchBody)
  }

  // Class method to make POST requests to the given endpoint with the given body
  static fetchPost(endpoint, fetchBody) {
    const fetchParams = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fetchBody)
    }

    return fetch(endpoint, fetchParams).then(r => r.json())
  }

}

export default Adapter
