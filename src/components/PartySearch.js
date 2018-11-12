import React, { Component } from 'react';
import { Input, Form } from 'semantic-ui-react'

class PartySearch extends Component {
  state = {
    input: ""
  }

  // Helper function to handle search input state
  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  render() {
    return (
      <Form id="party-search" onSubmit={(event) => this.props.handlePartySearch(event, this.state.input)}>
        <label>
          <Input style={{width: '45%', fontSize: '20pt'}}
            value={this.state.input}
            onChange={this.handleChange}
            size='large' icon='search'
            placeholder='Find a Party!'
          />
        </label>
      </Form>
    )
  }
}

export default PartySearch;
