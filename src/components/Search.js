import React, { Component } from 'react';
import { Input, Form } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setSongs } from '../store/actions/user'
import Adapter from '../adapters/Adapter'

class Search extends Component {
  state = {
    input: ""
  }

  // Helper function to handle search input state
  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  // Event handler for song search bar
  handleSearch = (event, searchTerm) => {
    event.preventDefault()
    // Don't search if input is empty
    if (searchTerm !== "") {
      const fetchBody = {
        search_term: searchTerm,
        spotify_id: this.props.spotifyId
      }

      // Get matching songs from Spotify API
      Adapter.getSongs(fetchBody)
        .then(songs => {
          this.props.setSongs(songs.tracks.items) // Set the song list in Redux store
          this.props.history.push('/results') // Redirect to the results page
        })
    }
  }

  render() {
    return (
      <Form onSubmit={(event) => this.handleSearch(event, this.state.input)}>
        <label>
          <Input
            value={this.state.input}
            onChange={this.handleChange}
            icon='search'
            placeholder='Find a Song...'
            id="search-bar"
            style={{fontSize: '0.825em', padding: '.25em 0 .25em 1em'}}
          />
        </label>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    spotifyId: state.spotifyId
  }
}

export default withRouter(connect(mapStateToProps, { setSongs })(Search));
