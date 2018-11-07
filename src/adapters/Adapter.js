import { EVENTS_URL } from './links'

class Adapter {
  static getAllEvents() {
    return ( fetch(EVENTS_URL).then(r => r.json()) )
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

    return fetch(EVENTS_URL, fetchParams).then(r => r.json())
  }

}

export default Adapter
