import React, { Component, Fragment } from 'react';
import { Card, Image, Table } from 'semantic-ui-react'
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
        <Table.Row onClick={() => this.handleClick(this.props.partyInfo.id)}>
          <Table.Cell className="table-column" style={{padding: ".8em 0em .8em 0em"}}><span>{this.props.partyInfo.name}</span></Table.Cell>
          <Table.Cell className="table-column" style={{padding: ".8em 0em .8em 0em"}}>{this.props.partyInfo.description}</Table.Cell>
          <Table.Cell className="table-column" style={{padding: ".8em 0em .8em 0em"}}>host</Table.Cell>
        </Table.Row>
      </Fragment>
    )
  }
}

export default PartyCard
