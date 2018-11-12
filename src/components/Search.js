import React, { Component, Fragment } from 'react';
import { Input, Form } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class Search extends Component {
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
      <Form id="login-form" onSubmit={(event) => this.props.handleSearch(event, this.state.input)}>
        <label>
          <Input
            className="mini"
            value={this.state.input}
            onChange={this.handleChange}
            icon='search'
            placeholder='Find a Song...'
          />
        </label>
      </Form>
    )
  }
}

export default withRouter(Search);
