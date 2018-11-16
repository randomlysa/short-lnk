import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

export const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <div>
          <Link className="button button--header" to="/change-password">Account</Link> &nbsp;
          <button className="button button--header" onClick={ ()=> props.handleLogout() }>Logout</button>
        </div>
      </div>
    </div>
  )
} // export default PrivateHeader

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
}

/*
  Assign a function to handleLogout for default export so existing
  <PrivateHeader /> with only a title prop still work. (See Links.js)

  { Named } export will accept a prop for handleLogout for testing.
*/
export default withTracker(() => {
  return {
    handleLogout: () => Accounts.logout()
  }
})(PrivateHeader);
