import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './Home';
import Signup from './Signup';
import Links from './Links';
import NotFound from './NotFound';

const AppRouter = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup/" component={Signup} />
        <Route path="/links/" component={Links} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
