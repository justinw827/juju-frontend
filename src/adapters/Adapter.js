import { LOGIN_URL } from './links'

class Adapter {

  static login() {
    const fetchParams = {
      method: "POST",
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify("")
    }

    return (
      fetch(LOGIN_URL)
        .then(r => {
          debugger
          r.json()}
        )
        .then(userData => userData)
    )
  }

}

export default Adapter
