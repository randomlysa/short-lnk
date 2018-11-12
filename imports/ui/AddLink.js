import React from 'react';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      modalIsOpen: false,
      error: ''
     }
  }
  onChange(e) {
    this.setState({ url: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    const { url } = this.state;

    Meteor.call('links.insert', url, (e, res) => {
      // If there's no error, remove the url and hide the modal.
      if(!e) this.setState({ modalIsOpen: false, url: '', error: '' });
      // Error
      else {
        this.setState({ error: e.reason });
      }
    }) // Meteor.call

  } // onSubmit

  render() {
    return (
      <div>
        <button onClick={ () => this.setState({modalIsOpen: true}) }>
          + Add Link
        </button>

        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Add link"
          appElement={document.getElementById('app')}
        >
          <h3>Add Link</h3>
          {this.state.error ? <p>{this.state.error}</p> : ''}
          <form onSubmit={this.onSubmit.bind(this)}>
            <input
              type="text"
              placeholder="Your URL"
              value={this.state.url}
              onChange={this.onChange.bind(this)}
            />
            <button>Add Link</button>
          </form>
          <button onClick={ () => { this.setState({
              modalIsOpen: false,
              url: '',
              error: ''
          }) }}>
            Cancel
          </button>
        </Modal>
      </div>
    ) // return
  } // render
} // export default class AddLink
