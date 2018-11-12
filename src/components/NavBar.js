import React, { Component, Fragment } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
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

    return (
      <Menu size="massive" style={{backgroundColor: "#02143B", opacity: '.6'}} >
        <Menu.Item>
          <i style={{color: "white"}} className="spotify icon"></i>
        </Menu.Item>
        <NavLink exact to="/">
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
        {this.props.spotifyId !== "" ?
          <Fragment>
            <Menu.Item
            name="Signed in as:"
            position="right"
            style={styles}
            />
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
