import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import history from '../utils/history';

// Routes
import Home from '../ui/Home';
import Signup from '../ui/Signup';
import Links from '../ui/Links';
import ForgotPassword from '../ui/ForgotPassword'
import ResetPassword from '../ui/ResetPassword'
import NotFound from '../ui/NotFound';

// Private and public pages.
const pagesForUnauthUsers = ['/', '/signup']
const pagesForAuthUsers = ['/links']

// Function to redirect users based on auth status and page being accessed.
export const onAuthChange = (isAuthenticated) => {
  let pathname = this.location.pathname;
  const isUnauthPage = pagesForUnauthUsers.includes(pathname)
  const isAuthPage = pagesForAuthUsers.includes(pathname)

  if(isAuthenticated && isUnauthPage) {
    history.replace('/links');
  } else if(!isAuthenticated && isAuthPage) {
    history.replace('/');
  }
}

// Routes.
export const routes = (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup/" component={Signup} />
        <Route path="/links/" component={Links} />
        <Route path="/forgot-password/" component={ForgotPassword} />
        <Route path="/reset-password/" component={ResetPassword} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)
