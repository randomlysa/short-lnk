import React from 'react';
import { Accounts } from 'meteor/accounts-base'
import PropTypes from 'prop-types'

export default PrivateHeader = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <button onClick={ ()=> Accounts.logout() }>Logout</button>
    </div>
  )
} // export default PrivateHeader

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}
