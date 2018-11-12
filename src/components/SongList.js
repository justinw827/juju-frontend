import React, { Component } from 'react';
import { Card, Table, Label } from 'semantic-ui-react'

import SongCard from './SongCard'

class SongList extends Component {

  renderAllSongs = () => {
    if (this.props.songs.length > 0) {
      return this.props.songs.map(song => {
        return (
          <Table.Body>
            <SongCard key={song.id} songInfo={song}/>
          </Table.Body>
        )
      })
    } else {
      return <h2 style={{textAlign: 'center', marginBottom: '2em'}}>No Results</h2>
    }
  }

  render() {
    return (
      <Table inverted columns={3} style={{width: '75%', display: 'inline-block'}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} className="table-column">Name</Table.HeaderCell>
            <Table.HeaderCell width={1} className="table-column">Artist</Table.HeaderCell>
            <Table.HeaderCell width={1} className="table-column"></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {this.renderAllSongs()}
      </Table>
    )
  }

  // <Card.Group style={{width: '50%', display: 'inline-block'}}>
  //   <br />
  //   <Card fluid>
  //     <h2>
  //       <span style={{marginRight: '15em'}}>Name</span>
  //       <span style={{marginLeft: '5em'}}>Artist</span>
  //     </h2>
  //   </Card>
  //   {this.renderAllSongs()}
  // </Card.Group>

}

export default SongList;
