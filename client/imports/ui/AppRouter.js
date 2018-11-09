import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Signup from './Signup';
// import Link from './Link';

const AppRouter = () => (
  <Router>
      <Route path="/signup/" component={Signup} />
  </Router>
);

export default AppRouter;
