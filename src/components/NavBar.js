import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  state = { activeItem: 'events' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const activeItem = window.location.href

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <NavLink exact to="/home" componentclass='span'>
            <Menu.Item
              name='home'
              active={activeItem === 'http://localhost:3001/'}
              onClick={this.handleItemClick}
            />
          </NavLink>
          <NavLink exact to="/events">
            <Menu.Item
              name='events'
              active={activeItem === 'http://localhost:3001/events'}
              onClick={this.handleItemClick}
            />
          </NavLink>
        </Menu>
      </Segment>
    )
  }
}

export default NavBar
