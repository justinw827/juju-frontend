import React, { Component, Fragment } from 'react'
import { Menu, Segment, Image } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

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

    const menuStyles = {
      backgroundColor: "#02143B",
      opacity: '.6',
      borderRadius: '0'
    }

    return (
      <Menu size="large" style={menuStyles} >
        <Menu.Item>
          <i style={{color: "white"}} className="spotify icon"></i>
        </Menu.Item>
        <NavLink exact to="/" className="nav-link">
          <Menu.Item
            name='Home'
            active={activeItem === 'http://localhost:3001/'}
            onClick={this.handleItemClick}
            style={styles}
          />
        </NavLink>
        <NavLink exact to="/events" className="nav-link">
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
        {this.props.spotifyId !== "" ?
          <Fragment>
            <Menu.Item
              position="right"
              style={styles}
            >
            <Image src="https://react.semantic-ui.com/images/wireframe/square-image.png" avatar />
            <span> Name</span>
            </Menu.Item>
            <Menu.Item
            name="Logout"
            style={styles}
            />`
          </Fragment>
          :
          null
        }
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    spotifyId: state.spotifyId
  }
}

export default connect(mapStateToProps)(NavBar)
