import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Not Found</h1>
        <p>Sorry, that link or page doesn't exist</p>
        <Link to="/" className="button button--link">Go Home</Link>
      </div>
    </div>
  )
}
