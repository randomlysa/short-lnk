import React from 'react';
import PrivateHeader from './PrivateHeader'
import { Accounts } from 'meteor/accounts-base';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      success: false
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    if (email) {
      Accounts.forgotPassword({ email }, (e) => {
        if (e && e.message) this.setState({ error: 'Sorry, there was an error.' })
        else this.setState({ error: '', success: true })
      });
    }
  } // onSubmit

  render() {
    // https://gist.github.com/LeCoupa/9879066

    // On success, show message and hide form.
    if (this.state.success) {
      return (
        <div>
          <PrivateHeader title="Reset Password" />
            <div className="page-content">
              Your password reset link was emailed to you.
            </div>
        </div>
      )
    }

    // Render form with email input.
    return (
      <div>
        <PrivateHeader title="Reset Password" />
          <div className="page-content">
          {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form onSubmit={this.onSubmit.bind(this)} noValidate>
              <input ref="email" name="email" placeholder="Your email" type="email" />
              <br />
              <button className="button">Request password reset email</button>
            </form>
          </div>
      </div>
    ) // return
  } // render
}// export default class ForgotPassword
