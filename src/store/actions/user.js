import Adapter from '../../adapters/Adapter';

export const setUser = (spotifyId, name, image) => {
  return {
    type: 'SET_USER',
    spotifyId,
    name,
    image
  }
}

export const setParty = (partyId) => {
  return {
    type: 'SET_PARTY',
    partyId: partyId
  }
}

export const setSongs = (songs) => {
  return {
    type: 'SET_SONGS',
    songs
  }
}

export const fetchCurrentUser = () => {
  // takes the token in localStorage and finds out who it belongs to
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('spotifyId')}`
      }
    })
      .then(response => response.json())
      .then((userInfo) => {
        // If response doesn't have an error message set the spotifyId
        if (!userInfo.message) {
          dispatch(setUser(userInfo.user.spotify_id, userInfo.name, userInfo.user.image_url))
          // Add USER_INFO dispatch with picture and name
        }
      })
  }
}
