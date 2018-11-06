import React, { Fragment } from 'react';

const PartyCard = (props) => {
  return (
    <Fragment>
      <h2>{props.eventInfo.name}</h2>
      <h2>{props.eventInfo.description}</h2>
    </Fragment>
  )
}

export default PartyCard
