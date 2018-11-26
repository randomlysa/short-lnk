import React from 'react';
import Modal from 'react-modal';
import 'animate.css';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.defaultModalClassName = 'boxed-view__box animated fadeIn';

    this.state = {
      url: '',
      modalIsOpen: false,
      error: '',
      modalClassName: this.defaultModalClassName
     };
  }
  onChange(e) {
    this.setState({ url: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ modalClassName: 'boxed-view__box' });
    let { url } = this.state;

    // Before submitting, add http:// to the url if it's not already included.
    // The url verifier requires http:// and otherwise 'valid' urls fail without
    // it.
    if (!url.includes('http://')) url = `http://${url}`;

    Meteor.call('links.insert', url, (e, res) => {
      // If there's no error, remove the url and hide the modal.
      if(!e) this.handleModalClose();
      // Error
      else {
        this.setState({
          error: e.reason,
          modalClassName: 'boxed-view__box ahashakeheartache'
        });
      }
    }) // Meteor.call
  } // onSubmit

  handleModalClose() {
    // Close the modal and remove the url and error text.
    this.setState({
      modalIsOpen: false,
      url: '',
      error: '',
      modalClassName: this.defaultModalClassName
     });
  }

  render() {
    return (
      <div>
        <button
          className="button button--add-link"
          onClick={ () => this.setState({modalIsOpen: true}) }
        >
          + Add Link
        </button>

        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Add link"
          appElement={document.getElementById('app')}
          onAfterOpen={ () => this.refs.url.focus() }
          onRequestClose={ this.handleModalClose.bind(this) }
          className={this.state.modalClassName}
          overlayClassName="boxed-view boxed-view--modal"
          closeTimeoutMS={150}
        >
          <h3>Add Link</h3>
          {this.state.error ? <p className="error">{this.state.error}</p> : ''}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input
              type="text"
              placeholder="Your URL"
              ref="url"
              value={this.state.url}
              onChange={ this.onChange.bind(this) }
            />
            <button className="button">Add Link</button>
            <button
              type="button"
              className="button button--secondary" onClick={ this.handleModalClose.bind(this) }
            >
              Cancel
            </button>
          </form>

        </Modal>
      </div>
    ) // return
  } // render
} // export default class AddLink
