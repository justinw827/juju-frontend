import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react'

import Adapter from '../adapters/Adapter'
import { setParty } from '../store/actions/user'

class EventForm extends Component {
  state = {
    name: "",
    description: "",
    submitted: false,
    partyId: 0
  }

  eventRedirect = () => {
    if(this.state.submitted) {
      return <Redirect to={`/party/${this.state.partyId}`}/>
    }
  }

  handleCreateEvent = (event, state) => {
    event.preventDefault()

    const fetchBody = {
      spotify_id: this.props.spotifyId,
      event_name: state.name,
      event_description: state.description
    }

    // Check user is signed in
    if (this.props.spotifyId !== "") {
      Adapter.createEvent(fetchBody)
        .then(partyData => {
          const partyId = partyData["event"]["id"]
          this.setState({ submitted: true, partyId: partyId})
          this.props.setParty(partyId)
        })
    } else {
      alert("Must be logged in to create an event")
    }
  }

  // Helper function to handle name input state
  handleName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  // Helper function to handle description input state
  handleDescription = (event) => {
    this.setState({
      description: event.target.value
    })
  }

  render() {
    return (
      <div id='event-div'>
        {this.eventRedirect()}
        <h1>New Event</h1>
        <Form id="event-form" onSubmit={(event) => this.handleCreateEvent(event, this.state)}>
          <Form.Field>
            <Form.Input
             label="Name"
             name="name"
             placeholder="Event Name"
             value={this.state.name}
             onChange={this.handleName}
            />
          </Form.Field>
          <Form.Field>
            <Form.TextArea
              label="Description"
              name="description"
              placeholder="Event Description"
              value={this.state.description}
              onChange={this.handleDescription}
            />
          </Form.Field>
          <Button type="submit" value="Submit" color='green'>Make Event</Button>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    spotifyId: state.spotifyId
  }
}

export default withRouter(connect(mapStateToProps, { setParty })(EventForm))
