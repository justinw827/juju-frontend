import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
// import * as actions from '../actions'
import { fetchCurrentUser } from '../store/actions/user'
import { Loader } from 'semantic-ui-react'

const withAuth = (WrappedComponent) => {
  class AuthorizedComponent extends Component {
    componentDidMount() {
      if (localStorage.getItem('spotifyId') && this.props.spotifyId === "") this.props.fetchCurrentUser()
      // if i have a token but don't know who it belongs to, ask the server for that user's data
    }

    render() {
      if (localStorage.getItem('spotifyId') && this.props.spotifyId !== "") {
        //i have a token and i'm logged in according to redux
        return <WrappedComponent />
      } else if (localStorage.getItem('spotifyId') && this.props.authenticatingUser) {
        //we're currently fetching, show a loading spinner
        return <Loader active inline="centered" />
      } else {
        //user is not AUTHORIZED to see this component
        return <Redirect to="/" />
      }
    }
  }

  const mapStateToProps = (reduxStoreState) => {
    return {
      spotifyId: reduxStoreState.spotifyId,
      loggedIn: reduxStoreState.spotifyId,
      authenticatingUser: reduxStoreState.authenticatingUser
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchCurrentUser: () => dispatch(fetchCurrentUser()), //dispatch is automagically provided by redux
    }
  }

  return connect(mapStateToProps, { fetchCurrentUser })(AuthorizedComponent)
}

export default withAuth
