import React, { Fragment, Component } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Adapter from '../adapters/Adapter'
import UserList from './UserList'
import { setParty } from '../store/actions/user'
import withAuth from '../auth/withAuth'

import { Card, Image, Message } from 'semantic-ui-react'

class Party extends Component {
  state = {
    partyInfo: {},
    imgUrl: ""
  }

  componentDidMount() {
    // Get the ID of the party the user is viewing
    const urls = window.location.href.split('/')
    const partyId = urls[urls.length-1]

    //method post
    const fetchBody = {
      party_id: partyId,
      spotify_id: this.props.spotifyId
    }

    const fetchParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fetchBody)
    }

    // Get party's info from backend
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/party`, fetchParams)
      .then(r => r.json())
      .then(partyData => {
        const imgUrl = partyData["imgUrl"] !== "n/a" ? partyData["imgUrl"] : "https://image.freepik.com/free-icon/black-music-icon_318-9277.jpg"
        this.setState({
          partyInfo: partyData["party"],
          imgUrl
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
  handleActiveClick = (setParty) => {
    setParty(this.state.partyInfo.id)
  }

  render() {
    const setParty = this.props.setParty

    // Handle initial render of setting the partyId
    const partyId = !!(JSON.stringify(this.state.partyInfo)) ? this.state.partyInfo.id : -1
    const message = partyId === this.props.partyId ? "You're already here!" : ""
    const titleMargin = message === "" ? "3em" : "0em"

    return (
      <Fragment>
        {message !== "" ?
          <Message positive style={{width: "25%", display: "inline-block"}}>
            <Message.Header>{message}</Message.Header>
          </Message>
          :
          null
        }
        <h1 style={{marginTop: titleMargin}}>{this.state.partyInfo.name}</h1>
        <Card style={{display: "inline-block", width: "30em", marginBottom: "2em"}}>
          <Image src={this.state.imgUrl} style={{width: "75%", display: "inline"}}/>
          <h3>{this.state.partyInfo.description}</h3>
        </Card><br/>
        {this.checkUser() ?
          partyId !== this.props.partyId ? <Button color="instagram" size="large" onClick={() => this.handleActiveClick(setParty)}>Rejoin the party!</Button> : null
          :
          <Button color="instagram" size="large" onClick={() => this.handlePartyClick()}>Join the Party!</Button>
        }
      </Fragment>
    )
  }
}
// <UserList users={props.eventInfo.users}/>

function mapStateToProps(state) {
  return {
    spotifyId: state.spotifyId,
    partyId: state.partyId
  }
}

export default withAuth(connect(mapStateToProps, { setParty })(Party))
