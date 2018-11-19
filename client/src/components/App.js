import React, { useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import NavigationBar from './NavigationBar';
import Profile from './Profile';
import Contact from './Contact';
import About from './About'

import authReducer from '../reducers/authReducer';
export default function App() {
  const [state, dispatch] = useReducer(authReducer, {isAuthenticated: false, user: {name: '', avatar: ''}})

  const getAcc = async () => {
    const thing = await fetch('/auth/current');
    const user = await thing.json();
    dispatch({type: 'GET_ACC', payload: user});
  }

  useEffect(() => {
    getAcc();
    return;
  }, []);

  return (
    <div>
    <NavigationBar state={state}/>
    <div className="container" style={{marginTop: "55px"}}>
      <Router>
        <div>
          <Route path='/about' component={About} />
          <Route path='/profile' render={() => <Profile state={state}/>} />
          <Route path='/contact' component={Contact} />
        </div>
      </Router>
    </div>
  </div>
  )
}
