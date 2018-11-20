import { PARTIES_URL, PROFILE_URL } from './links'

class Adapter {
  static getAllEvents() {
    return ( fetch(PARTIES_URL).then(r => r.json()) )
  }

  static getUsersParties() {
    return ( fetch(PROFILE_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('spotifyId')}`
      }
    }).then(r => r.json()) )
  }

  static createEvent(fetchBody) {

    const fetchParams = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fetchBody)
    }

    return fetch(PARTIES_URL, fetchParams).then(r => r.json())
  }

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
