import React, { useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/top.css';
import NavigationBar from './Nav/NavigationBar';
import Profile from './Profile/Profile';
import Contact from './Contact/Contact';
import About from './About/About'
import Music from './Music/Music';
import SpaceX from './SpaceX/SpaceX';
import {Context} from '../contexts/Context';
import ApolloClient from 'apollo-boost';
import { ApolloProvider} from 'react-apollo';
import  authReducer from '../reducers/authReducer';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

export default () => {
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
      <ApolloProvider client={client}>
        <NavigationBar />
        <div className = "container top">
            <Router>
              <div>
                <Route path = '/music' component = {Music} />
                <Route path = '/about' component = {About} />
                <Route path = '/profile' component = {Profile} />
                <Route path = '/contact' component = {Contact} />
                <Route path = '/spacex' component = {SpaceX} />
              </div>
            </Router>
        </div>
      </ApolloProvider>
    </Context.Provider>
    )
  }
