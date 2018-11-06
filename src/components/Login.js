import React, { Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

// import { spotifyLogin } from '../store/actions/user'

const Login = (props) => {
  return (
    <Fragment>
      <Button as="a" href="http://localhost:3000/api/v1/login">Login</Button>
    </Fragment>
  )
}
// <Button color="green" onClick={props.spotifyLogin}>Login with Spotify</Button>

function mapStateToProps(state) {
  return {
    spotifyId: state.spotifyId
  }
}

export default connect(mapStateToProps, null)(Login)
