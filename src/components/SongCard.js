import React, { Component, Fragment } from 'react';
import { Card, Button, Table } from 'semantic-ui-react'
import { connect } from 'react-redux';

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
      <Table.Row>
        <Table.Cell>{this.props.songInfo.name}</Table.Cell>
        <Table.Cell>{this.props.songInfo.artists[0].name}</Table.Cell>
        <Table.Cell textAlign='right'><Button className="ui inverted primary button" onClick={() => this.handleClick(this.state.url)}>Add to Queue</Button></Table.Cell>
      </Table.Row>
    )
  }
}
// <MButton variant="fab" color="primary" aria-label="Add" onClick={() => this.handleClick(this.state.url)}>
// <AddIcon />
// </MButton>

function mapStateToProps(state) {
  return {
    spotifyId: state.spotifyId,
    partyId: state.partyId
  }
}

export default connect(mapStateToProps)(SongCard);
