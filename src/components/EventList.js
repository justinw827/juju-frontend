import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { setUser } from '../store/actions/user'

const EventList = (props) => {

  // If it's the initial login, set the spotify_id in state to the one given in url params
  if (props.spotify_id === "") {
    const spotify_id = window.location.href.split("s=")[1]
    props.setUser(spotify_id)
  }

  return (
    <h1>Look at all these events</h1>
  )
}

function mapStateToProps(state) {
  return {
    spotify_id: state.spotify_id
  }
}

export default connect(mapStateToProps, { setUser })(EventList)
