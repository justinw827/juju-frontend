import React, { Fragment, Component } from 'react';

import UserList from './UserList'

class Party extends Component {
  state = {
    name: "",
    description: ""
  }

  componentDidMount() {
    const urls = window.location.href.split('/')
    const partyId = urls[urls.length-1]

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/events/${partyId}`)
      .then(r => r.json())
      .then(partyData => {
        this.setState({
          name: partyData["party"]["name"],
          description: partyData["party"]["description"]
        })
      })
  }

  render() {
    return (
      <Fragment>
        <h1>{this.state.name}</h1>
        <h3>{this.state.description}</h3>
      </Fragment>
    )
  }
}
// <UserList users={props.eventInfo.users}/>

export default Party
