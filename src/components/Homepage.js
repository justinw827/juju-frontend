import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import { setUser, fetchCurrentUser } from '../store/actions/user'
import EventList from './EventList'
import EventForm from './EventForm'
import Party from './Party'
import SongList from './SongList'
import LandingPage from './LandingPage'

class Homepage extends Component {

  state = {
    songs: [],
    search: false
  }

  // Event handler for song search bar
  handleSearch = (event, searchTerm) => {
    event.preventDefault()
    // Don't search if input is empty
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
          }, () => {
            this.props.history.push('/results')
          })
        })
    }
  }

  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/s=:s" component={LandingPage} />
          <Route path="/events" component={EventList} />
          <Route exact path="/event-form" component={EventForm}/>
          <Route exact path="/party/:id" component={Party}/>
          <Route exact path="/results" component={() => <SongList songs={this.props.songs}/>}/>
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spotifyId: state.spotifyId,
    songs: state.songs
  }
}

export default withRouter(connect(mapStateToProps, { setUser, fetchCurrentUser })(Homepage))
