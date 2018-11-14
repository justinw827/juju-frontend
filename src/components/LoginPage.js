import React, { Fragment } from 'react';

import Login from './Login'

const LoginPage = () => {
  return (
    <Fragment>
      <div className="login-page">
      </div>
      <span id="landing-span">
        <h1>A new way to play music.</h1>
        <Login />
      </span>
    </Fragment>
  )
}

export default LoginPage
