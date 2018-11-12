import React, { Component, Fragment } from 'react';
import { Input, Form } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setSongs } from '../store/actions/user'

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
          this.props.setSongs(songs.tracks.items)
          this.props.history.push('/results')
        })
    }
  }

  render() {
    return (
      <Form id="login-form" onSubmit={(event) => this.handleSearch(event, this.state.input)}>
        <label>
          <Input
            className="mini"
            value={this.state.input}
            onChange={this.handleChange}
            icon='search'
            placeholder='Find a Song...'
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
