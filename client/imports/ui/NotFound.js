import React from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Not Found</h1>
        <Link to="/">Go Home</Link>
      </div>
    )
  }
}