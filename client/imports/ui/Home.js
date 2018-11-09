import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Login to Short Lnk</h1>

        <p><em>login form here</em></p>

        <Link to="/signup">Sign up</Link>
      </div>
    )
  }
}