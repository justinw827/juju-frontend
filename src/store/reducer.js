// CHANGE SPOTIFY ID
const defaultState = {
  spotifyId: "",
  partyId: 1,
  songs: [],
  name: "",
  image: ""
}

export default (state=defaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, spotifyId: action.spotifyId }
    case 'SET_USER_INFO':
      return { ...state, name: action.name, image: action.image}
    case 'SET_PARTY':
      return { ...state, partyId: action.partyId}
    case 'SET_SONGS':
      return { ...state, songs: action.songs}
    default:
      return state
  }
}
