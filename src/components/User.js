import React, { Fragment } from 'react';

const User = (props) => {
  debugger
  return (
    <Fragment>
      <p>{props.userInfo.external_url}</p>
      <p>{props.userInfo.image_url}</p>
    </Fragment>
  )
}

export default User
