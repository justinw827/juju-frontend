import { SET_USER } from './types'

const defaultState = {
  spotify_id: ""
}

export default (state=defaultState, action) => {
  const newState = {...state}
  switch (action.type) {
    case SET_USER:
      newState.spotify_id = action.spotify_id
      return newState
    default:
      return state
  }
}
