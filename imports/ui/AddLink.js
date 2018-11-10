import React from 'react';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '' }
  }
  onChange(e) {
    this.setState({ url: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    const { url } = this.state;

    if(url) {
      Meteor.call('links.insert', url, (err, res) => {
        // If there's no error, remove the url.
        if(!err) this.setState({ url: '' })
      }) // Meteor.call
    } // if(url)
  } // onSubmit

  render() {
    return (
      <div>
        <h3>Add Link</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            type="text"
            placeholder="Your URL"
            value={this.state.url}
            onChange={this.onChange.bind(this)}
          />
          <button>Add Link</button>
        </form>
      </div>
    ) // return
  } // render
} // export default class AddLink
