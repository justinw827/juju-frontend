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
      <Fragment>
        <div className="landing-page">
          {this.eventsRedirect()}
        </div>
        <span id="landing-span">
          <h1>Music for everyone</h1>
          <Button onClick={this.handleClick} color="instagram" size="massive">Find a party</Button>
        </span>
      </Fragment>
    );
  }

}

export default LandingPage;
