import React from 'react';
import {
  MDBCard,
  MDBCardImage
} from 'mdb-react-ui-kit';

export default function Card(props) {
  return (
    <MDBCard>
      <MDBCardImage src={props.imgURL} alt={props.name} position='top' />
    </MDBCard>
  );
}