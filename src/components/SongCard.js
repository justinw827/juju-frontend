import React, { Component, Fragment } from 'react';
import { Card, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

import MButton from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class SongCard extends Component {
  state = {
    url: ""
  }

  componentDidMount() {
    this.setState({
      url: this.props.songInfo.uri
    })
  }

  handleClick = (url) => {
    const fetchParams = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        spotify_id: this.props.spotifyId,
        url
      })
    }

    // Request backend to add selected song to the playlist of the active Party
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/events/${this.props.partyId}`, fetchParams)
      .then(r => {
        // Check if 401 Unauthorized error was raised in backend
        if (r.status === 401) {
          alert("There was a problem adding your song.")
        } else {
          return r.json()
        }
      })
      .then(playlist => {
        // Check if 401 Unauthorized error was raised in backend
        if (playlist) {
          alert("Song added to playlist!")
        }
      })
  }

  render() {
    return (
      <Fragment>
        <Card fluid color='green'>Name: {this.props.songInfo.name} Artist: {this.props.songInfo.artists[0].name}</Card>
        <Button onClick={() => this.handleClick(this.state.url)}>Add to Queue</Button>
        <MButton variant="fab" color="primary" aria-label="Add" onClick={() => this.handleClick(this.state.url)}>
          <AddIcon />
        </MButton>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    spotifyId: state.spotifyId,
    partyId: state.partyId
  }
}

export default connect(mapStateToProps)(SongCard);
