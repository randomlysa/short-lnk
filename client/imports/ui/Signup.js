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
      <div>
        <h1>Sign Up</h1>

        {this.state.error ? <p>{this.state.error}</p> : ''}

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input type="password" ref="password" name="password" placeholder="Password" />
          <button>Create Account</button>
        </form>

        Have an account? <Link to="/">Login</Link>

      </div>
    )
  }
}