import React, { Component, Fragment } from 'react';
import { Input, Form } from 'semantic-ui-react'

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
          <Input style={{width: '45%', fontSize: '20pt'}}
            value={this.state.input}
            onChange={this.handleChange}
            size='large' icon='search'
            placeholder='Search...'
          />
        </label>
      </Form>
    )
  }
}

export default Search;
