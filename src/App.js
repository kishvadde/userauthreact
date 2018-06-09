import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route,Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import AuthRoute from './components/AuthRoute';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';



class App extends Component {


  render() {

       return (
        <div id='main_app'>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/register' component={Register}/>
              <Route path='/' component={Login}/>
            </Switch>
        </div>
     );
  }
}

export default App;
