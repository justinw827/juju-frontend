import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Login from './Login'
import { setUser, fetchCurrentUser } from '../store/actions/user'

class Home extends Component {

  render() {
    // ***** Change to more secure method later *****
    // If it's the initial login, set the spotify_id in state to the one given in url params
    if (this.props.spotifyId === "") {
      const splitUrl = window.location.href.split("s=")
      // If there is no ID in the url assign spotifyId to the empty string
      const spotifyId = splitUrl.length > 1 ? splitUrl[1] : ""

      // If a new user has signed in
      if (spotifyId !== "" && !localStorage.getItem("spotifyId")) {
        this.props.setUser(spotifyId)

        // *** Change key name in production
        localStorage.setItem('spotifyId', spotifyId)
      } else if (localStorage.getItem("spotifyId")) {
        this.props.fetchCurrentUser()
      }
    }

    return (
      <Fragment>
        {this.props.spotifyId === "" ?
          <Login />
          :
          <h1>Welcome</h1>
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spotifyId: state.spotifyId
  }
}

export default connect(mapStateToProps, { setUser, fetchCurrentUser })(Home);
