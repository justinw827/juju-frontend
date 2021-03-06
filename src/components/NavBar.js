import React, { Component, Fragment } from 'react'
import { Menu, Image, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Search from './Search'

class NavBar extends Component {
  // Clear ID out of local storage and reload the page
  handleLogout = () => {
    window.location.reload()
    localStorage.clear()
  }

  render() {
    // Style object for Menu item colors
    const styles = {
      color: '#FFF'
    }

    // Style object for entire Menu
    const menuStyles = {
      backgroundColor: "#02143B",
      opacity: '.7',
      borderRadius: '0',
      marginBottom: '0',
      height: '3.75em'
    }

    // Default name of user
    const name = "Guy Fieri"

    return (
      <Menu size="large" style={menuStyles}>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/collection/playlists">
            <Icon style={{color: "white"}} size="big" className="spotify icon"></Icon>
          </a>
        </Menu.Item>
        <NavLink exact to="/" className="nav-link">
          <Menu.Item style={styles}>
          <span>Home</span>
          </Menu.Item>
        </NavLink>
        <NavLink exact to="/events" className="nav-link">
          <Menu.Item
            name='Events'
            style={styles}
          >
          <span>Parties</span>
          </Menu.Item>
        </NavLink>
        {this.props.spotifyId !== "" ? /* Only render if the user is logged in */
          <Fragment>
            <Menu.Item position="right">
            <Search />
            </Menu.Item>
            <NavLink exact to="/profile">
              <Menu.Item
                position="right"
                style={styles}
              >
              <Image src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" avatar />
              <span style={{marginLeft: ".5em"}}>{ this.props.name ? this.props.name : name}</span>
              </Menu.Item>
            </NavLink>
            <NavLink exact to="/" className="nav-link">
              <Menu.Item
                style={{...styles, }}
                onClick={() => this.handleLogout()}
              >
              <span>Logout</span>
              </Menu.Item>
            </NavLink>
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
    spotifyId: state.spotifyId,
    name: state.name,
    image: state.image
  }
}

export default connect(mapStateToProps)(NavBar)
