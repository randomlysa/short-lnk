import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';

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
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h2>Success</h2>
            Your password reset link was emailed to you.
          </div>
        </div>
      )
    } // this.state.success

    // Render form with email input.
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h2>Forgot Password</h2>
          <p>Request an email<br />to reset your password.</p>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form className="boxed-view-form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input ref="email" name="email" placeholder="Your email" type="email" />
            <br />
            <button className="button button--account">Request Email</button>
          </form>
          <Link to="/">Return to login</Link>
        </div>
      </div>
    ) // return
  } // render
}// export default class ForgotPassword
