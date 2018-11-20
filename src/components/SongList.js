import React, { Component, Fragment } from 'react';
import { Table, Message } from 'semantic-ui-react'

import SongCard from './SongCard'

class SongList extends Component {

  state = {
    message: false
  }

  handleMessage = () => {
    this.setState({ message: true })
  }

  renderAllSongs = () => {
    if (this.props.songs.length > 0) {
      return this.props.songs.map(song => {
        return (
          <Table.Body>
            <SongCard key={song.id} songInfo={song} handleMessage={this.handleMessage}/>
          </Table.Body>
        )
      })
    } else {
      return <h2 style={{textAlign: 'center', marginBottom: '2em'}}>No Results</h2>
    }
  }

  render() {
    return (
      <Fragment>
        {this.state.message ?
          <Message positive style={{width: "25%", display: "inline-block"}}>
            <Message.Header>Song added to queue!</Message.Header>
          </Message>
          :
          null
        }

        <h1>Results</h1>
        <Table inverted style={{width: '75%', display: 'inline-block'}}>
          <Table.Header>
            <Table.Row columns={5}>
              <Table.HeaderCell width={2} className="table-column"><h3>Title</h3></Table.HeaderCell>
              <Table.HeaderCell width={1}><h3>Artist</h3></Table.HeaderCell>
              <Table.HeaderCell width={1}><h3>Album</h3></Table.HeaderCell>
              <Table.HeaderCell width={1}></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {this.renderAllSongs()}
        </Table>
      </Fragment>
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
