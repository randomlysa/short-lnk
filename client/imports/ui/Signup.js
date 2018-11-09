import React from 'react';
import { Link } from 'react-router-dom';

export default class Signup extends React.Component {
  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <em>Have an account? </em>
        <Link to="/">Login</Link>
      </div>
    )
  }
}