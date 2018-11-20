import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';

import Adapter from '../adapters/Adapter'
import PartyCard from './PartyCard'
import PartySearch from './PartySearch';

class PartyList extends Component {
  state = {
    parties: [], // List of all parties from backend
    filteredParties: [], // List of filtered parties after search
    partyButton: false // Was the create party button clicked?
  }

  componentDidMount() {
    // If the user is on their profile page fetch the user's parties, else fetch all parties
    if (window.location.href === "http://localhost:3001/profile") {
      Adapter.getUsersParties()
        .then((userInfo) => {
          // If response doesn't have an error message set the spotifyId
          if (!userInfo.message) {
            // Set parties list in state to user's party list returned from backend
            const parties = userInfo.user.events
            this.setState({ parties, filteredParties: parties})
          } else { // Some error was raised
            console.log("Problem fetching user's parties in PartyList");
          }
        })
    } else {
      // Fetch all parties frmo backend
      Adapter.getAllEvents()
      .then(parties => {
        this.setState({ parties, filteredParties: parties }) // Set parties list in state to list of all parties returned from backend
      })
    }
  }

  // Helper method to set value of create party to true
  handleClick = () => { this.setState({ partyButton: true }) }

  eventRedirect = () => {
    // Check if the event form button was clicked
    if (this.state.partyButton) {
      return <Redirect to='/event-form'/>
    }
  }

  // Helper method to render Event components for all parties
  renderEvents = () => {
    // If there are parties, return an array of PartyCard components
    if (this.state.filteredParties.length > 0) {
      return this.state.filteredParties.map(party => {
        return <PartyCard key={party.id} partyInfo={party}/>
      })
    }
    return <p>No Events</p>
  }

  handlePartySearch = (event, searchTerm) => {
    // Filter party list based on what the user searched for
    const filteredParties = this.state.parties.filter(party => (party.name.toLowerCase()).includes(searchTerm.toLowerCase()))
    this.setState({ filteredParties })
  }

  render() {
    return (
      <Fragment>
        { window.location.href === "http://localhost:3001/profile" ?
          <Fragment><h1>My Parties</h1><br/></Fragment>
          :
          <div style={{marginTop: "2em"}}>
            <PartySearch handlePartySearch={ this.handlePartySearch }/>
            <h1>All Parties</h1><br/>
            {this.eventRedirect()}
            <Button color="instagram" size="large" onClick={this.handleClick}>Start a Party!</Button><br/>
          </div>
        }
        <Card.Group style={{width: "75%", display: "inline-block", marginTop: "3em"}}>
          {this.renderEvents()}
        </Card.Group>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    spotifyId: state.spotifyId
  }
}

export default withRouter(connect(mapStateToProps)(PartyList))
