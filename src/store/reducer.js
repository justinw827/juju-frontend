// CHANGE SPOTIFY ID
const defaultState = {
  spotifyId: "",
  partyId: 1
}

export default (state=defaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, spotifyId: action.spotifyId }
    case 'SET_PARTY':
      return { ...state,  partyId: action.partyId}
    default:
      return state
  }
}
