import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor'
import onEnterPublicPage from '../utils/onEnterPublicPage';

export default class Home extends React.Component {
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

    Meteor.loginWithPassword({email}, password, (e) => {
      if (e) this.setState({error: 'Unable to login. Check email and password'});
      else this.setState({error: ''});
    })
  } // onSubmit

  componentWillMount() {
    onEnterPublicPage();
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Lnk Login</h1>

          {this.state.error ? <p>{this.state.error}</p> : ''}

          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view-form" noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Login</button>
          </form>

          <Link to="/forgot-password">Forgot Password</Link><br /><br />
          <Link to="/signup">Create Account</Link>
        </div>
      </div>
    )
  }
}