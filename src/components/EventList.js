import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import Adapter from '../adapters/Adapter'
import PartyCard from './PartyCard'
import PartySearch from './PartySearch';
import withAuth from '../auth/withAuth'

class EventList extends Component {
  state = {
    parties: [],
    eventButton: false
  }

  componentDidMount() {
    // Fetch all parties frmo backend
    Adapter.getAllEvents()
    .then(parties => {
      debugger
      this.setState({
        parties
      })
    })
  }

  handleClick = () => {
    this.setState({
      eventButton: true
    })
  }

  eventRedirect = () => {
    // Check if the event form button was clicked
    if (this.state.eventButton) {
      return <Redirect to='/event-form'/>
    }
  }

  // Helper method to render Event components for all parties
  renderEvents = () => {
    if(this.state.parties.length > 0) {
      return this.state.parties.map(party => {
        return <PartyCard key={party.id} partyInfo={party}/>
      })
    }
    return <p>No Events</p>
  }

  handlePartySearch = (event, searchTerm) => {
    const fetchParams = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({search_term: searchTerm})
    }

    // Fetch parties from backend that contain searchTerm as a substring in name
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/party/search`, fetchParams)
      .then(r => r.json())
      .then(parties => {
        this.setState({
          parties
        })
      })
  }

  render() {
    return (
      <Fragment>
        <PartySearch handlePartySearch={ this.handlePartySearch }/>
        <h1>All Events</h1>
        {this.eventRedirect()}
        <Button onClick={this.handleClick}>Start an Event</Button>
        {this.renderEvents()}
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    spotifyId: state.spotifyId
  }
}

export default withAuth(connect(mapStateToProps)(EventList))
