import Adapter from '../../adapters/Adapter';

export const setUser = (spotifyId) => {
  return {
    type: 'SET_USER',
    spotifyId: spotifyId
  }
}

export const setParty = (partyId) => {
  return {
    type: 'SET_PARTY',
    partyId: partyId
  }
}

export const fetchCurrentUser = () => {
  console.log(`Bearer ${localStorage.getItem('spotifyId')}`);
  // takes the token in localStorage and finds out who it belongs to
  return (dispatch) => {
    // dispatch(authenticatingUser()) //tells the app we are fetching
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('spotifyId')}`
      }
    })
      .then(response => response.json())
      .then((JSONResponse) => {
        console.log(JSONResponse)
        if (JSONResponse.message !== "Please log in") {
          dispatch(setUser(JSONResponse.spotifyId))
        }
      })
  }
}
