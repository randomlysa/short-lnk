import React from 'react';
import { Meteor } from 'meteor/meteor';
import history from '../utils/history';

// https://medium.com/@jaaaco/add-facebook-login-to-meteor-app-in-2-minutes-3c744b46009e

export default class LoginWithFacebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  } // constructor

  handleFB() {
    Meteor.loginWithFacebook({},
      (e) => {
        if(e) this.setState(e.message)
        else history.push('/links');
      }
    );
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Lnk Login</h1>
              {this.state.error ? <p>{this.state.error}</p> : ''}
              <button class="button" onClick={this.handleFB.bind(this)}>Login with Facebook</button>
        </div>
      </div>
    ) // return
  } // render
} // export default class LoginWithFacebook
