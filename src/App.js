import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser, fetchCurrentUser } from './store/actions/user'
import CssBaseline from '@material-ui/core/CssBaseline';

import Homepage from './components/Homepage';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import Party from './components/Party';
import SongList from './components/SongList';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage'

class App extends Component {




  componentDidMount() {
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
  }

  render() {

    return (
      <div className="App">
        <CssBaseline />
        <NavBar />

        {this.props.spotifyId === "" ?
          <LoginPage />
          :
          <Homepage />
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    spotifyId: state.spotifyId
  }
}

export default withRouter(connect(mapStateToProps, { setUser, fetchCurrentUser })(App))
