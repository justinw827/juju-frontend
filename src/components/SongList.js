import React, { Component, Fragment } from 'react';
import { Card } from 'semantic-ui-react'

import SongCard from './SongCard'

class SongList extends Component {

  renderAllSongs = () => {
    if (this.props.songs.length > 0) {
      return this.props.songs.map(song => {
        return <SongCard key={song.id} songInfo={song}/>
      })
    } else {
      return <h2>No Results</h2>
    }
  }

  render() {
    return (
      <Card.Group style={{width: '50%', display: 'inline-block'}}>
        <br />
        {this.renderAllSongs()}
      </Card.Group>
    )
  }

}

export default SongList;
