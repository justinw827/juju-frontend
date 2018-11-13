import React, { Component, Fragment } from 'react';
import { Card, Image } from 'semantic-ui-react'
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
        <Card color='instagram' onClick={() => this.handleClick(this.props.partyInfo.id)}>
          <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
          <h3>{this.props.partyInfo.name}</h3>
        </Card>
      </Fragment>
    )
  }
}

export default PartyCard
