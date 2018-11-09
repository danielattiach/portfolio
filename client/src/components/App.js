import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import NavigationBar from './NavigationBar';
import Profile from './Profile';
import Contact from './Contact';
import About from './About'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <NavigationBar />
      <div className="container" style={{marginTop: "55px"}}>
        <Router>
          <div>
            <Route path='/about' component={About} />
            <Route path='/profile' component={Profile} />
            <Route path='/contact' component={Contact} />
          </div>
        </Router>
      </div>
    </div>
    )
  }
}

export default App;
