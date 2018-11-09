import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser, fetchCurrentUser } from './store/actions/user'

import Home from './components/Home';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import Party from './components/Party';
import Search from './components/Search';
import SongList from './components/SongList';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage'

class App extends Component {

  state = {
    songs: [],
    search: false
  }

  handleSearch = (event, searchTerm) => {
    event.preventDefault()
    if (searchTerm !== "") {
      const fetchParams = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          search_term: searchTerm,
          spotify_id: this.props.spotifyId
        })
      }

      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/search`, fetchParams)
        .then(r => r.json())
        .then(songs => {
          this.setState({
            songs: songs.tracks.items,
            search: true
          })
        })
      }
  }

  redirectResults = () => {
    if (this.state.search) {
      return <Redirect to='/results'/>
    }
  }

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
    const location = this.props.location.pathname
    return (
      <div className="App">
        <NavBar />
        {this.redirectResults()}
        {this.props.spotifyId === "" ?
          <LoginPage />
          :
          <Home />
        }
      </div>
    )
  }
}

//
// { (location !== "/events" && location !== "/home") ?
// <Search handleSearch={ this.handleSearch }/>
// :
// null
// }
const mapStateToProps = (state) => {
  return {
    spotifyId: state.spotifyId
  }
}

export default withRouter(connect(mapStateToProps, { setUser, fetchCurrentUser })(App))
