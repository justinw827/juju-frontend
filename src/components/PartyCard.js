import React, { Component, Fragment } from 'react';
import { Card, Image, Table } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';

class PartyCard extends Component {

  state = {
    clicked: false,
    partyId: 0
  }

  handleClick = (partyId) => {
    this.setState({
      clicked: true,
      partyId
    })
  }

  handleRedirect = () => {
    // Check if a party was clicked
    if (this.state.clicked) {
      return <Redirect to={`/party/${this.state.partyId}`}/>
    }
  }


  render() {
    const img_urls = ['https://react.semantic-ui.com/images/avatar/large/matthew.png',
                      'https://image.freepik.com/free-vector/circle-made-of-music-instruments_23-2147509304.jpg',
                      'http://platinum-communities.com/wp-content/uploads/2017/11/music-22.jpg',
                      'http://www.alifecelebrant.com.au/wp-content/uploads/2017/02/heart-made-of-music-instruments_23-2147509304.jpg',
                      'http://weknowyourdreams.com/images/music/music-05.jpg',
                      'http://weknowyourdreams.com/images/music/music-12.jpg',
                      'http://cdn-images.audioaddict.com/1/b/e/b/e/8/1bebe8759e23ab6a1b92e1d46e2e7f12.png'
                     ]
    const length = img_urls.length
    const randNum = Math.floor(Math.random() * (length))
    return (
      <Fragment>
        {this.handleRedirect()}
        <Card style={{display: "inline-block"}} color='instagram' onClick={() => this.handleClick(this.props.partyInfo.id)}>
          <Image src={img_urls[randNum]} />
          <h3>{this.props.partyInfo.name}</h3>
        </Card>
      </Fragment>
    )
  }
}

export default PartyCard
