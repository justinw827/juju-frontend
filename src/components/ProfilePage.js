import React, { Component } from 'react';
import { connect } from 'react-redux';

import EventList from './EventList';

class ProfilePage extends Component {

  render() {
    return (
      <div>
        <h1 style={{marginTop: "2em"}}>{this.props.name}</h1>
        <EventList />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    spotifyId: state.spotifyId,
    name: state.name
  }
}

export default connect(mapStateToProps)(ProfilePage);
