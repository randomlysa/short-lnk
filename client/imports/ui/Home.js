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
      console.log('login callback', e)
    })
  } // onSubmit

  componentWillMount() {
    onEnterPublicPage();
  }

  render() {
    return (
      <div>
        <h1>Login to Short Lnk</h1>

        {this.state.error ? <p>{this.state.error}</p> : ''}

        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input type="password" ref="password" name="password" placeholder="Password" />
          <button>Login</button>
        </form>

        <Link to="/signup">Sign up</Link>
      </div>
    )
  }
}