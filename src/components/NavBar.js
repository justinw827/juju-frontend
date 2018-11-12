import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

import Search from './Search'

class NavBar extends Component {
  state = { activeItem: 'events' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const activeItem = window.location.href

    const styles = {
      color: '#FFF'
    }

    return (
        <Menu size="massive" style={{backgroundColor: "#02143B"}} >
          <NavLink exact to="/" componentclass='span'>
            <Menu.Item
              name='Home'
              active={activeItem === 'http://localhost:3001/'}
              onClick={this.handleItemClick}
              style={styles}
            />
          </NavLink>
          <NavLink exact to="/events">
            <Menu.Item
              name='Events'
              active={activeItem === 'http://localhost:3001/events'}
              onClick={this.handleItemClick}
              style={styles}
            />
          </NavLink>
          <Menu.Item position="right">
            <Search />
          </Menu.Item>
          <Menu.Item
            name="Logout"
            position="right"
            style={styles}
          />
        </Menu>
    )
  }
}

export default NavBar
