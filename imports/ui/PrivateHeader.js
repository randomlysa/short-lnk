import React from 'react';
import { Accounts } from 'meteor/accounts-base'
import PropTypes from 'prop-types'

export default PrivateHeader = (props) => {
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
