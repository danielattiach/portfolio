import React from 'react'
import { Jumbotron, Container } from 'reactstrap';
import '../css/message.css';

export default function MessageSuccess(props) {
  return (
    <div>
      <h2>Thank you, expect a reply shortly.</h2>
      <Jumbotron fluid className="jumbo-success">
        <Container fluid>
          <h4>Your message:</h4>
          <p><span style={{textDecoration: 'underline'}}>Name</span>: {props.name}</p>
          <p><span style={{textDecoration: 'underline'}}>Email</span>: {props.email}</p>
          <p><span style={{textDecoration: 'underline'}}>Subject</span>: {props.subject}</p>
          <p><span style={{textDecoration: 'underline'}}>Message</span>: {props.message}</p>
        </Container>
      </Jumbotron>
    </div>
  )
}
