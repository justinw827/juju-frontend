import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import { setUser, fetchCurrentUser } from '../store/actions/user'
import Login from './Login'
import EventList from './EventList'
import EventForm from './EventForm'
import Party from './Party'
import SongList from './SongList'

class Home extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/events" />} />
        <Route path="/home" component={Home} />
        <Route path="/events" component={EventList} />
        <Route exact path="/event-form" component={EventForm}/>
        <Route exact path="/party/:id" component={Party}/>
        <Route exact path="/results" component={() => <SongList songs={this.state.songs}/>}/>
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spotifyId: state.spotifyId
  }
}

export default connect(mapStateToProps, { setUser, fetchCurrentUser })(Home);
