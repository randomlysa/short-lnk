import React from 'react';
import PrivateHeader from './PrivateHeader'
import { Accounts } from 'meteor/accounts-base';

export default class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }

    this.token = window.location.pathname.split('/')[2];
  }

  onSubmit(e) {
    e.preventDefault();
    // Check that passwords match and are > 7 charactrs.
    if(this.refs.newPwd.value === this.refs.newPwdConfirm.value &&
      this.refs.newPwd.value.length > 7)
    {
      // Valid
      this.setState({ 'error': ''});
      Accounts.resetPassword(this.token, this.refs.newPwd.value, function(err) {
        if (err) {
          console.log('We are sorry but something went wrong.');
        } else {
          console.log('Your password has been changed. Welcome back!');
        }
      });
    } else {
      // Invalid
      this.setState({ 'error': 'Please enter matching passwords of 8 or more characters'})
    }
  }
  render() {
    // https://gist.github.com/LeCoupa/9879066
    return (
      <div>
        <PrivateHeader title="Reset Password" />
          <div className="page-content">
          {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form onSubmit={this.onSubmit.bind(this)}>
              <input ref="newPwd" name="password" placeholder="New Password" type="password" />
              <input ref="newPwdConfirm" name="password-confirm" placeholder="Confirm" type="password" />

            <button className="button">Reset Password</button>
            </form>
          </div>
      </div>
    ) // return
  } // render
} // export default class PasswordReset
