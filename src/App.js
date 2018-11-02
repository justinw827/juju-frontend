import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './components/Login';
import EventList from './components/EventList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/events" component={EventList} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    spotify_id: state.spotify_id
  }
}

export default withRouter(connect(mapStateToProps, null)(App))
