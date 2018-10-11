import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import NavigationBar from './NavigationBar';
import Profile from './Profile';

export default () => {
  return (
    <div>
      <NavigationBar />
      <Router>
        <div>
          <Route path='/profile' component={Profile} />
        </div>
      </Router>
    </div>
  )
}
