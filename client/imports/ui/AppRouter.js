import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Tracker } from 'meteor/tracker'
import history from '../utils/history'

import Home from './Home';
import Signup from './Signup';
import Links from './Links';
import NotFound from './NotFound';

const pagesForUnauthUsers = ['/', '/signup']
const pagesForAuthUsers = ['/links']

Tracker.autorun(() => {
  let isAuthenticated = !!Meteor.userId()
  let pathname = this.location.pathname;
  const isUnauthPage = pagesForUnauthUsers.includes(pathname)
  const isAuthPage = pagesForAuthUsers.includes(pathname)

  if(isAuthenticated && isUnauthPage) {
    history.replace('/links');
  } else if(!isAuthenticated && isAuthPage) {
    history.replace('/');
  }
})

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup/" component={Signup} />
        <Route path="/links/" component={Links} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter;
