import React, { Fragment, Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import UserList from './UserList'
import { setParty } from '../store/actions/user'

class Party extends Component {
  state = {
    partyInfo: {}
  }

  componentDidMount() {
    const urls = window.location.href.split('/')
    const partyId = urls[urls.length-1]

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/events/${partyId}`)
      .then(r => r.json())
      .then(partyData => {
        this.setState({
          partyInfo: partyData["party"]
        })
      })
  }

  checkUser = () => {
    const currentUser = this.props.spotifyId
    const users = this.state.partyInfo.users
    let found = false

    if (users) {
      found = users.find((user) => {
        return user.spotify_id === currentUser
      })
    }

    found = !found ? false : found

    return found
  }

  handlePartyClick = () => {
    const partyId = this.state.partyInfo.id
    const fetchParams = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        spotify_id: this.props.spotifyId,
        party_id: partyId
      })
    }

    // MAKE CURRENT USER FOLLOW HOST USER

    // Add current user to the party
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/party/add-user`, fetchParams)
      .then(r => r.json())
      .then(partyData => {
        this.props.setParty(partyId)
        this.setState({
          partyInfo: partyData["party"]
        })
      })
  }

  handleActiveClick = (setParty, partyId) => {
    setParty(partyId)
  }

  render() {
    const setParty = this.props.setParty
    const partyId = this.state.partyInfo.id
    return (
      <Fragment>
        <h1>{this.state.partyInfo.name}</h1>
        <h3>{this.state.partyInfo.description}</h3>
        {this.checkUser() ?
          <Button onClick={() => this.handleActiveClick(setParty, partyId)}>Set Active</Button>
          :
          <Button onClick={() => this.handlePartyClick()}>Join the Party!</Button>
        }
      </Fragment>
    )
  }
}
// <UserList users={props.eventInfo.users}/>

function mapStateToProps(state) {
  return {
    spotifyId: state.spotifyId
  }
}

export default connect(mapStateToProps, { setParty })(Party)
