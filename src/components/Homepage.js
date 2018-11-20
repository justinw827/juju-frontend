import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import LandingPage from './LandingPage'
import PartyForm from './PartyForm'
import PartyList from './PartyList'
import ProfilePage from './ProfilePage'
import Party from './Party'
import SongList from './SongList'

class Homepage extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/s=:s" component={LandingPage} />
          <Route path="/events" component={PartyList} />
          <Route exact path="/event-form" component={PartyForm}/>
          <Route exact path="/party/:id" component={Party}/>
          <Route exact path="/results" component={() => <SongList songs={this.props.songs}/>}/>
          <Route exact path="/profile" component={ProfilePage}/>
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spotifyId: state.spotifyId,
    songs: state.songs
  }
}

export default withRouter(connect(mapStateToProps)(Homepage))
