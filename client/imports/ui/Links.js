import React from 'react';
import { Accounts } from 'meteor/accounts-base'


export default class Link extends React.Component {
  doLogout() {
    Accounts.logout()
  }
  render() {
    return (
      <div>
        <h1>Links</h1>
        <button onClick={this.doLogout.bind(this)}>Logout</button>
      </div>
    )
  }
}
