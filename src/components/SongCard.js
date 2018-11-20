import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react'
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
        // If OK status not received from backend
        if (r.status !== 200 ) {
          alert("There was a problem adding your song.")
        } else {
          return r.json()
        }
      })
      .then(playlist => {
        // Check if 401 Unauthorized error was raised in backend
        if (playlist) {
          this.props.handleMessage() // SEND A MESSAGE BACK
        }
      })
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell className="table-column"><span>{this.props.songInfo.name}</span></Table.Cell>
        <Table.Cell className="table-column">{this.props.songInfo.artists[0].name}</Table.Cell>
        <Table.Cell className="table-column">{this.props.songInfo.album.name}</Table.Cell>
        <Table.Cell textAlign='center'><Button className="ui instagram button" onClick={() => this.handleClick(this.state.url)}>Add to Queue</Button></Table.Cell>
      </Table.Row>
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
