import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import onEnterPrivatePage from '../utils/onEnterPrivatePage';

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      success: false
    };
  }

  componentWillMount() {
    onEnterPrivatePage();
  }

  onSubmit(e) {
    e.preventDefault();
    // Check that passwords match and are > 7 characters.
    if(this.refs.newPwd.value === this.refs.newPwdConfirm.value &&
      this.refs.newPwd.value.length > 7)
    {
    // Valid passwords entered.
      this.setState({ 'error': ''});
      // Change the password, set this.state.success: true.
      Accounts.changePassword(this.refs.oldPwd.value, this.refs.newPwd.value, (e) => {
        if (e)  this.setState({ error: 'Sorry, something went wrong.' });
        else this.setState({ error: '', success: true });
      });
    // Invalid passwords entered.
    } else {
      this.setState({
        'error': 'Please enter new matching passwords of 8 or more characters'
      });
    } // else
  } // onSubmit(e)

  render() {
    if(this.state.success) {
      return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h2>Success</h2>
            Your password has been changed.<br />
            <Link to="/links">Go to your links.</Link>
          </div>
        </div>
      ) // return
    } // this.state.success

    // https://gist.github.com/LeCoupa/9879066
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h2>Change Password</h2>
          {this.state.error ? <p className="error">{this.state.error}</p> : ''}
          <form onSubmit={this.onSubmit.bind(this)}>
            <input
              ref="oldPwd"
              name="password"
              placeholder="Old Password"
              type="password"
            />
            <input
              ref="newPwd"
              name="password"
              placeholder="New Password"
              type="password"
            />
            <input
              ref="newPwdConfirm"
              name="password-confirm"
              placeholder="Confirm"
              type="password"
            />
            <button className="button button--account">Change Password</button>
            <br />
            <Link to="/links">Cancel</Link>
          </form>
        </div>
      </div>
    ) // return
  } // render
} // export default class ChangePassword
