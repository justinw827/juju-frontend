import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Form, Button, Card, Segment } from 'semantic-ui-react'

import Adapter from '../adapters/Adapter'
import { setParty } from '../store/actions/user'

class PartyForm extends Component {
  state = {
    name: "", // Value of name input field
    description: "", // Value of description input field
    submitted: false, // Was the form submission button clicked?
    partyId: 0 // ID of the newly created party to redirect to, once the party was created in the back end
  }

  // Helper method to redirect user to the page of the new party
  eventRedirect = () => {
    if(this.state.submitted) { // Check if the form was submitted
      return <Redirect to={`/party/${this.state.partyId}`}/>
    }
  }

  // Helper method to create party in back end with user input
  handleCreateParty = (event, state) => {
    event.preventDefault() // Prevent the page from redirecting on form submission

    // Body of fetch request
    const fetchBody = {
      spotify_id: this.props.spotifyId, // Spotify ID of the signed in user
      event_name: state.name, // Name of party given by user
      event_description: state.description // Description of party given by user
    }

    // Check user is signed in
    if (this.props.spotifyId !== "") {
      // Send request to backend to craete new playlist on Spotify
      Adapter.createEvent(fetchBody)
        .then(partyData => {
           debugger
          // Get ID of newley created Party
          const partyId = partyData["party"]["id"]

          // Alert component a new Party was created and set the new ID for redirect
          this.setState({ submitted: true, partyId: partyId})

          // Set the active Party to the new Party
          this.props.setParty(partyId)
        })
    } else {
      alert("Must be logged in to create an event")
    }
  }

  // Helper method to handle name input state
  handleName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  // Helper method to handle description input state
  handleDescription = (event) => {
    this.setState({
      description: event.target.value
    })
  }

  render() {
    // Object to hold styles for the form
    const styles = {
      marginTop: "5em",
      padding: "1em",
      display: "inline-block",
      width: "30%",
      height: "30em",
      borderStyle: "groove"
    }

    return (
      <Card style={styles}>
        {this.eventRedirect()}
        <h1>New Party</h1>
        <Form id="party-form" onSubmit={(event) => this.handleCreateParty(event, this.state)}>
          <Form.Field>
            <Form.Input
             label="Name"
             name="name"
             placeholder="Party Name"
             value={this.state.name}
             onChange={this.handleName}
            />
          </Form.Field>
          <Form.Field>
            <Form.TextArea
              label="Description"
              name="description"
              placeholder="Party Description"
              value={this.state.description}
              onChange={this.handleDescription}
              style={{borderStyle: "groove"}}
            />
          </Form.Field>
          <Button type="submit" value="Submit" color='instagram'>Start Party!</Button>
        </Form>
      </Card>
    )
  }
}

// Get the Spotify ID of the signed in user from Redux store
function mapStateToProps(state) {
  return {
    spotifyId: state.spotifyId
  }
}

export default withRouter(connect(mapStateToProps, { setParty })(PartyForm))
