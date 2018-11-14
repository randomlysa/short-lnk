import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';

import PropTypes from 'prop-types';

export const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={ ()=> props.handleLogout() }>Logout</button>
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
