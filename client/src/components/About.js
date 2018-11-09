import React, { Component } from 'react'
import { Progress } from 'reactstrap';

export class About extends Component {

  componentDidMount() {
    document.title = 'About'
  }

  render() {
    return (
      <div className="mx-auto" style={{marginTop: "75px", width: "75%"}}>
        <div style={{width: "75%"}}>
        <div className="mt-2 mb-2">Javascript: <Progress animated value={80} color="warning" /></div>
        <div className="mt-2 mb-2">Node.js: <Progress animated value={70} color="success" /></div>
        <div className="mt-2 mb-2">React: <Progress animated value={70} color="info" /></div>
        <div className="mt-2 mb-2">HTML: <Progress animated value={85} /></div>
        <div className="mt-2 mb-2">CSS: <Progress animated value={80} color="success" /></div>
        <div className="mt-2 mb-2">Python: <Progress animated value={80} color="danger" /></div>
        <div className="mt-2 mb-2">Django: <Progress animated value={30} /></div>
        </div>
      </div>
    )
  }
}

export default About;
