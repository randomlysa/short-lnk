import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import onEnterPublicPage from '../utils/onEnterPublicPage';

export class Home extends React.Component {
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

    this.props.loginWithPassword({email}, password, (e) => {
      if (e) this.setState({error: 'Unable to login. Check email and password'});
      else this.setState({error: ''});
    })
  } // onSubmit

  componentWillMount() {
    onEnterPublicPage();
  }

  togglePasswordVisible() {
    const password = this.refs.password;
    if (password.type === "password") password.type = "text";
    else password.type = "password";
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Lnk Login</h1>

          {this.state.error ? <p>{this.state.error}</p> : ''}

          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form" noValidate>
            <p className="boxed-view__group">
              <input type="email" ref="email" name="email" placeholder="Email" />
            </p>
            <p className="boxed-view__group">
              <input type="password" ref="password" name="password" placeholder="Password" />
              <img
                onClick={ this.togglePasswordVisible.bind(this) }
                className="boxed-view__img"
                src="/images/baseline-visibility-24px.svg"
                alt="Toggle Show Pasword" />
            </p>
            <button className="button button--account">Login</button>
          </form>

          <Link to="/forgot-password">Forgot Password</Link><br /><br />
          <Link to="/signup">Create Account</Link>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  loginWithPassword: PropTypes.func.isRequired
}

export default withTracker(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  }
})(Home);
