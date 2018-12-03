import React from 'react'
import logo from '../../img/SpaceX/spacex-logo.jpg';
import '../../css/spacex.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Launches from './Launches';
import Launch from './Launch';

export default () => {
  return (
    <div className="spacex text-center">
      <img id="logo" src={logo} alt="logo" />
      <Router>
        <div>
          <Route exact path='/spacex' component={Launches} />
          <Route exact path='/spacex/launch/:flight_number' component={Launch} />
        </div>
      </Router>
    </div>
  )
}
