import React from 'react';

export default class AddLink extends React.Component {
  onSubmit(e) {
    e.preventDefault();

    const url = this.refs.url.value.trim();

    if(url) {
      Meteor.call('links.insert', url)
      this.refs.url.value = '';
    }
  }

  render() {
    return (
      <div>
        <h3>Add Link</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="Your URL" />
          <button>Add Link</button>
        </form>
      </div>
    )
  } // render
} // export default class AddLink