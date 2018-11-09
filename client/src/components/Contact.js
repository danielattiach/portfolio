import React, { Component } from 'react'
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import MessageSuccess from './MessageSuccess';
import MessageFail from './MessageFail';

export default class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      subject: '',
      message: '',
      status: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.printState = this.printState.bind(this);
  }

  componentDidMount() {
    document.title = 'Contact'
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.id]: e.target.value});
  }

  async onSubmit(e) {
    e.preventDefault();
    const res = await fetch('/messages/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        subject: this.state.subject,
        message: this.state.message
      })
    });
    this.setState({status: res.status});
  }

  printState(e) {
    e.preventDefault();
    console.log(this.state);
  }

  // method="POST" action="/messages/send"
  render() {
    if (this.state.status === 0) {
      return (
        <div className="mx-auto" style={{marginTop: "75px", width: "75%"}}>
          <h2 className="text-center mb-3">Contact</h2>
          <Form>
          <FormGroup row>
              <Label for="name" sm={2} size="sm">Name:</Label>
              <Col sm={10}>
                <Input type="text" name="name" id="name" onChange={this.handleChange}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="email" sm={2} size="sm">Email:</Label>
              <Col sm={10}>
                <Input type="email" name="email" id="email" onChange={this.handleChange}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="subject" sm={2} size="sm">Subject:</Label>
              <Col sm={10}>
                <Input type="text" name="subject" id="subject" onChange={this.handleChange}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="message" sm={2} size="sm">Message:</Label>
              <Col sm={10}>
                <Input type="textarea" name="message" id="message" onChange={this.handleChange}/>
              </Col>
            </FormGroup>
            <div className="text-center"><Button onClick={this.onSubmit}>Submit</Button></div>
          </Form>
        </div>
      )
    } else if (this.state.status === 200) {
      return (
        <div className="text-center mx-auto" style={{marginTop: 75, width: "75%"}}>
          <MessageSuccess name={this.state.name} email={this.state.email} subject={this.state.subject} message={this.state.message}/>
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
}
