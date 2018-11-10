import React from 'react';
import { Accounts } from 'meteor/accounts-base'
import PropTypes from 'prop-types'

export default class PrivateHeader extends React.Component {
  doLogout() {
    Accounts.logout()
  }
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <button onClick={this.doLogout.bind(this)}>Logout</button>
      </div>
    )
  } // render
} // export default class PrivateHeader

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}