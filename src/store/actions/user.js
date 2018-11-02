import { SET_USER } from '../types';
import Adapter from '../../adapters/Adapter';

// export function spotifyLogin() {
//   return (dispatch) => {
//     Adapter.login()
//       .then(userData => {
//         dispatch(updateUser(userData))
//       })
//   }
// }

export function setUser(spotify_id) {
  return {
    type: SET_USER,
    spotify_id: spotify_id
  }
}
