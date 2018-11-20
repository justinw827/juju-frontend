import React, { Component, Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

class LandingPage extends Component {
  // Redurect to parties page when 'Find a Party' button is clicked
  handleClick = () => { this.props.history.push('/events') }

  render() {
    return (
      <Fragment>
        <div className="landing-page">
        </div>
        <span id="landing-span">
          <h1>Music for everyone</h1>
          <Button onClick={this.handleClick} color="instagram" size="massive">Find a Party</Button>
        </span>
      </Fragment>
    );
  }

}

export default withRouter(LandingPage);
