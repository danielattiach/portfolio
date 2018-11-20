import React, { useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/top.css';
import NavigationBar from './NavigationBar';
import Profile from './Profile';
import Contact from './Contact';
import About from './About'
import Music from './Music';
import {Context} from '../contexts/Context';

import authReducer from '../reducers/authReducer';
export default function App() {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: {
      name: '',
      avatar: ''
    }
  })

  const getAcc = async () => {
    const thing = await fetch('/auth/current');
    const user = await thing.json();
    dispatch({
      type: 'GET_ACC',
      payload: user
    });
  }

  useEffect(() => {
    getAcc();
    return;
  }, []);

  return (
    <Context.Provider value={{state}}>
      <NavigationBar/>
      <div className = "container top">
        <Router>
          <div>
            <Route path = '/music' component = {Music} />
            <Route path = '/about' component = {About}/>
            <Route path = '/profile' component={Profile} />
            <Route path = '/contact' component = {Contact}/>
          </div>
        </Router>
      </div>
    </Context.Provider>
    )
  }
