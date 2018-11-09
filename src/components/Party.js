import React, { Fragment, Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Adapter from '../adapters/Adapter'
import UserList from './UserList'
import { setParty } from '../store/actions/user'
import withAuth from '../auth/withAuth'

class Party extends Component {
  state = {
    partyInfo: {}
  }

  componentDidMount() {
    // Get the ID of the party the user is viewing
    const urls = window.location.href.split('/')
    const partyId = urls[urls.length-1]

    // Get party's info from backend
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/events/${partyId}`)
      .then(r => r.json())
      .then(partyData => {
        this.setState({
          partyInfo: partyData["party"]
        })
      })
  }

  // Check if the current user already belongs to the party
  checkUser = () => {
    const currentUser = this.props.spotifyId

    // Array of party's users
    const users = this.state.partyInfo.users
    let found = false

    // Check if users array is undefined
    if (users) {
      found = users.find((user) => {
        return user.spotify_id === currentUser
      })
    }

    return found
  }

  handlePartyClick = () => {
    const partyId = this.state.partyInfo.id

    const fetchBody = {
      spotify_id: this.props.spotifyId,
      party_id: partyId
    }

    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/api/v1/party/add-user`

    // Add current user to the party
    Adapter.fetchPost(endpoint, fetchBody)
      .then(partyData => {
        this.props.setParty(partyId)
        this.setState({
          partyInfo: partyData["party"]
        })
      })
    //
    // fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/party/add-user`, fetchParams)
    //   .then(r => r.json())
    //   .then(partyData => {
    //     this.props.setParty(partyId)
    //     this.setState({
    //       partyInfo: partyData["party"]
    //     })
    //   })
  }

  // Set the active party in Redux to the clicked party
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

export default withAuth(connect(mapStateToProps, { setParty })(Party))
