import React, { Component } from 'react'
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  handleNameChange(e) {
    e.preventDefault();
    this.setState({name: e.target.value});
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({name: e.target.value});
  }

  handleSubjectChange(e) {
    e.preventDefault();
    this.setState({name: e.target.value});
  }

  handleMessageChange(e) {
    e.preventDefault();
    this.setState({name: e.target.value});
  }

  render() {
    return (
      <div className="mx-auto" style={{marginTop: "75px", width: "50%"}}>
        <h2 className="text-center mb-3">Contact</h2>
        <Form method="POST" action="/messages/send">
        <FormGroup row>
            <Label for="name" sm={2} size="sm">Name:</Label>
            <Col sm={10}>
              <Input type="text" name="name" id="name" placeholder="name" onChange={this.handleNameChange}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" sm={2} size="sm">Email:</Label>
            <Col sm={10}>
              <Input type="email" name="email" id="email" placeholder="email" onChange={this.handleEmailChange}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="subject" sm={2} size="sm">Subject:</Label>
            <Col sm={10}>
              <Input type="text" name="subject" id="subject" placeholder="subject" onChange={this.handleSubjectChange}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="message" sm={2} size="sm">Message:</Label>
            <Col sm={10}>
              <Input type="textarea" name="message" id="message" placeholder="message" onChange={this.handleMessageChange}/>
            </Col>
          </FormGroup>
          <div className="text-center"><Button>Submit</Button></div>
        </Form>
      </div>
    )
  }
}
