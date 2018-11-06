import { SET_USER } from './types'

// CHANGE SPOTIFY ID
const defaultState = {
  spotifyId: "1230817692",
  authenticatingUser: false,
  partyId: 1
}

export default (state=defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, spotifyId: action.spotifyId }
    case 'AUTHENTICATING_USER':
      return { ...state, authenticatingUser: true }
    case 'AUTHENTICATED_USER':
      return { ...state, authenticatingUser: false }
    case 'SET_PARTY':
      return { ...state,  partyId: action.partyId}
    default:
      return state
  }
}
