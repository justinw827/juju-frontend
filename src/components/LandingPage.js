import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

class LandingPage extends Component {

  state = {
    clicked: false
  }

  eventsRedirect = () => {
    // Check if the event form button was clicked
    if (this.state.clicked) {
      return <Redirect to='/events'/>
    }
  }

  handleClick = () => {
    this.setState({ clicked: true })
  }

  render() {
    return (
      <div className="landing-page">
        <span>
          <h1>Welcome to the Greatest App Ever</h1>
          <Button onClick={this.handleClick} color="instagram" size="massive">Find a party</Button>
        </span>
        {this.eventsRedirect()}
      </div>
    );
  }

}

export default LandingPage;
