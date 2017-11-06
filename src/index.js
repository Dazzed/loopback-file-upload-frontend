import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { IndexRoute, Router, Route, browserHistory, } from 'react-router';

import './easy-responsive-tabs.css';
import './style.css';
import SignupPage from './components/Signup';
import LoginPage from './components/Login';
import UserList from './components/UserList';

const render = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    <IndexRoute component={UserList} />
      <Route path="login" component={LoginPage} />
      <Route path="signup" component={SignupPage} />
    </Route> 
  </Router>
);

ReactDOM.render(render, document.getElementById('parentHorizontalTab_agile'));
