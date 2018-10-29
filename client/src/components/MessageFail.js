import React from 'react'
import { Jumbotron, Container } from 'reactstrap';
import '../css/message.css';

export default function MessageSuccess(props) {
  return (
    <div>
      <h2>Oops!</h2>
      <Jumbotron fluid className="jumbo-fail">
        <Container fluid>
          <h6>Your message was not sent due to an internal error.</h6>
          <p>Please try again later.</p>
        </Container>
      </Jumbotron>
    </div>
  )
}
