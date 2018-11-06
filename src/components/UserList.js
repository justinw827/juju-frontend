import React, { Fragment, Component } from 'react';

import User from './User'

class UserList extends Component {
  constructor(props) {
    super(props)
  }

  // Helper method to render all users
  renderUsers() {
    return this.props.users.map(user => {
      return <User userInfo={user}/>
    })
  }

  render() {
    return (
      <Fragment>
        {this.renderUsers()}
      </Fragment>
    )
  }
} // end class

export default UserList
