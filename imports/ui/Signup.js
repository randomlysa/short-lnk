import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base'
import onEnterPublicPage from '../utils/onEnterPublicPage';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  } // constructor

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 8) {
      return this.setState({error: 'Password must be at least 8 characters long'})
    }

    Accounts.createUser({email, password}, (e) => {
      if (e) this.setState({error: e.reason});
      else this.setState({error: ''});
    });
  }

  componentWillMount() {
    onEnterPublicPage();
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Sign Up</h1>

          {this.state.error ? <p>{this.state.error}</p> : ''}

          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view-form" noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Create Account</button>
          </form>

          Have an account? <Link to="/">Login</Link>

        </div>
      </div>
    )
  }
}