import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';

import Adapter from '../adapters/Adapter'
import PartyCard from './PartyCard'
import PartySearch from './PartySearch';

class EventList extends Component {
  state = {
    parties: [],
    eventButton: false
  }

  componentDidMount() {
    if (window.location.href === "http://localhost:3001/profile") {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('spotifyId')}`
        }
      })
        .then(response => response.json())
        .then((userInfo) => {
          // If response doesn't have an error message set the spotifyId
          if (!userInfo.message) {
            console.log(userInfo.user.events);
            this.setState({
              parties: userInfo.user.events
            })
          }
        })
    } else {
      // Fetch all parties frmo backend
      Adapter.getAllEvents()
      .then(parties => {
        this.setState({
          parties
        })
      })
    }
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

export default withRouter(connect(mapStateToProps)(EventList))
