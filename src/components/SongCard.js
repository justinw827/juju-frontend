import React, { Component, Fragment } from 'react';
import { Card, Button } from 'semantic-ui-react'
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
      body: JSON.stringify({url})
    }

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/events/${this.props.partyId}`, fetchParams)
      .then(r => r.json())
      .then(playlist => {
        console.log(playlist);
      })
  }

  render() {
    return (
      <Fragment>
        <Card fluid color='green'>Name: {this.props.songInfo.name} Artist: {this.props.songInfo.artists[0].name}</Card>
        <Button onClick={() => this.handleClick(this.state.url)}>Add to Queue</Button>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    partyId: state.partyId
  }
}

export default connect(mapStateToProps)(SongCard);
