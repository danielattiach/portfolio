import React, { useState, useEffect } from 'react'
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../css/top.css';
import MessageSuccess from './MessageSuccess';
import MessageFail from './MessageFail';

export default function Contact() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(0);

  useEffect(() => {
    document.title = 'Contact';
    return;
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/messages/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, subject, message})
    });
    setStatus(res.status);
  }
/*
  const printState = (e) => {
    e.preventDefault();
    console.log({name, email, subject, message, status});
  }
*/

  if (status === 0) {
    return (
      <div className="mx-auto top width">
        <h2 className="text-center mb-3">Contact</h2>
        <Form>
        <FormGroup row>
            <Label for="name" sm={2} size="sm">Name:</Label>
            <Col sm={10}>
              <Input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={2} size="sm">Email:</Label>
            <Col sm={10}>
              <Input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="subject" sm={2} size="sm">Subject:</Label>
            <Col sm={10}>
              <Input type="text" name="subject" id="subject" onChange={(e) => setSubject(e.target.value)}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="message" sm={2} size="sm">Message:</Label>
            <Col sm={10}>
              <Input type="textarea" name="message" id="message" onChange={(e) => setMessage(e.target.value)}/>
            </Col>
          </FormGroup>
          <div className="text-center"><Button onClick={onSubmit}>Submit</Button></div>
          {/*<div className="text-center"><Button onClick={printState}>Print State</Button></div>*/}
        </Form>
      </div>
    )
  } else if (status === 200) {
    return (
      <div className="text-center mx-auto" style={{marginTop: 75, width: "75%"}}>
        <MessageSuccess name={name} email={email} subject={subject} message={message}/>
      </div>
    )
  } else {
    return (
      <div className="text-center mx-auto" style={{marginTop: 75, width: "75%"}}>
        <MessageFail />
      </div>
    )
  }
}
