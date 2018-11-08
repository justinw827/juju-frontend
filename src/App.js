import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/Login';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import Party from './components/Party';
import Search from './components/Search';
import SongList from './components/SongList';
import NavBar from './components/NavBar';

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

  render() {
    const location = this.props.location.pathname
    return (
      <div className="App">
        {this.redirectResults()}
        <NavBar />
        { (location !== "/events" && location !== "/login") ?
          <Search handleSearch={ this.handleSearch }/>
          :
          null
        }
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/login" component={Login} />
          <Route path="/events" component={EventList} />
          <Route exact path="/event-form" component={EventForm}/>
          <Route exact path="/party/:id" component={Party}/>
          <Route exact path="/results" component={() => <SongList songs={this.state.songs}/>}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    spotifyId: state.spotifyId
  }
}

export default withRouter(connect(mapStateToProps)(App))
