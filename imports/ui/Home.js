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
      if (e && e.reason === 'User has no password set') {
        this.setState({ error: 'This email is associated with a Facebook login'});
      }
      else if (e) {
        this.setState({error: 'Unable to login. Check email and password'});
      }
      else this.setState({error: ''});
    })
  } // onSubmit

  componentWillMount() {
    onEnterPublicPage();
  }

  // https://medium.com/@jaaaco/add-facebook-login-to-meteor-app-in-2-minutes-3c744b46009e
  loginFB() {
    Meteor.loginWithFacebook({}, (e) => {
      if(e) this.setState(e.message);
      else history.push('/links');
    });
  } // loginFB

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

          {this.state.error ? <p className="error">{this.state.error}</p> : ''}

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

          <div className="boxed-view__form">
            <button
              className="button button--facebook"
              onClick={this.loginFB.bind(this)}
            >
              Login with Facebook
            </button>
          </div>

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
