import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import NavigationBar from './NavigationBar';
import TestComponent from './TestComponent';

export default () => {
  return (
    <div>
      <NavigationBar />
      <Router>
        <div>
          <Route path='/test' component={TestComponent} />
        </div>
      </Router>
    </div>
  )
}
