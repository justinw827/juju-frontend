import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { setUser } from '../store/actions/user'
import Adapter from '../adapters/Adapter'
import PartyCard from './PartyCard'

class EventList extends Component {
  state = {
    events: [],
    eventButton: false
  }

  componentDidMount() {
    // Fetch all events frmo backend
    Adapter.getAllEvents()
    .then(events => {
      this.setState({
        events
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

  // Helper method to render Event components for all events
  renderEvents = () => {
    if(this.state.events.length > 0) {
      return this.state.events.map(party => {
        return <PartyCard key={party.id} eventInfo={party}/>
      })
    }
    return <p>No Events</p>
  }

  render() {
    // ***** Change to more secure method later *****
    // If it's the initial login, set the spotify_id in state to the one given in url params
    if (this.props.spotifyId === "") {
      const spotifyId = window.location.href.split("s=")[1]
      this.props.setUser(spotifyId)
      localStorage.setItem('spotifyId', spotifyId)
    }

    return (
      <Fragment>
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

export default connect(mapStateToProps, { setUser })(EventList)
