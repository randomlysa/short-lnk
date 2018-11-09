import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from '../utils/history'

import Home from '../ui/Home';
import Signup from '../ui/Signup';
import Links from '../ui/Links';
import NotFound from '../ui/NotFound';

const pagesForUnauthUsers = ['/', '/signup']
const pagesForAuthUsers = ['/links']

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

export const routes = (
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
