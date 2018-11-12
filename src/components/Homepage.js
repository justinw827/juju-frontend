import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import { setUser, fetchCurrentUser } from '../store/actions/user'
import Login from './Login'
import EventList from './EventList'
import EventForm from './EventForm'
import Party from './Party'
import SongList from './SongList'
import LandingPage from './LandingPage'
import Search from './Search';

class Homepage extends Component {

  state = {
    songs: [],
    search: false
  }

  // Event handler for song search bar
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
      <Fragment>
        { (location !== "/events") ?
          <Search handleSearch={ this.handleSearch.bind(this) }/>
          :
          null
        }
        {this.redirectResults()}
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/events" component={EventList} />
          <Route exact path="/event-form" component={EventForm}/>
          <Route exact path="/party/:id" component={Party}/>
          <Route exact path="/results" component={() => <SongList songs={this.state.songs}/>}/>
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spotifyId: state.spotifyId
  }
}

export default withRouter(connect(mapStateToProps, { setUser, fetchCurrentUser })(Homepage))
