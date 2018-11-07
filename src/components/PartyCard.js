import React, { Component, Fragment } from 'react';
import { Card } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';

class PartyCard extends Component {

  state = {
    clicked: false,
    partyId: 0
  }

  handleClick = (partyId) => {
    this.setState({
      clicked: true,
      partyId
    })
  }

  handleRedirect = () => {
    // Check if a party was clicked
    if (this.state.clicked) {
      return <Redirect to={`/party/${this.state.partyId}`}/>
    }
  }


  render() {
    return (
      <Fragment>
        {this.handleRedirect()}
        <Card fluid color='green' onClick={() => this.handleClick(this.props.partyInfo.id) }>{this.props.partyInfo.name}</Card>
      </Fragment>
    )
  }
}

export default PartyCard
