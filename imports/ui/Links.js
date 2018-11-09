import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import onEnterPrivatePage from '../utils/onEnterPrivatePage';

import { Links } from '../api/links'
import LinksList from '../ui/LinksList'

export default class Link extends React.Component {
  doLogout() {
    Accounts.logout()
  }

  componentWillMount() {
    onEnterPrivatePage()
  }

  onSubmit(e) {
    e.preventDefault();

    const url = this.refs.url.value.trim();

    if(url) {
      Links.insert({ url, userId: Meteor.userId() });
      this.refs.url.value = '';
    }
  }

  render() {
    return (
      <div>
        <h1>Links</h1>
        <button onClick={this.doLogout.bind(this)}>Logout</button>

        <hr />
        <h3>Add Link</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="Your URL" />
          <button>Add Link</button>
        </form>

        <LinksList />
      </div>
    )
  }
}
