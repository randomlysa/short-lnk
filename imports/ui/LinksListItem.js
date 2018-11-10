import React from 'react';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard'
import { Links } from '../api/links';

export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      copyText: 'Copy'
    }
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard.on('success', () => {
      this.setState({ copyText: 'Copied' })
      setTimeout(() => this.setState({ copyText: 'Copy'}), 1000);
    })
    .on('error', () => {
      this.setState({ copyText: 'Copy Failed' })
      setTimeout(() => this.setState({ copyText: 'Copy'}), 1000);
    });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }
  render() {
    return (
      <div className="shortUrl">
        <h3>{this.props.url}</h3>
        <em>{this.props.visible ? 'visible' : 'hidden'}</em><br />
        <a href={this.props.shortUrl}>{this.props.shortUrl}</a>
        <button ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.copyText}
        </button>
        <button onClick={() => {
          Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
        }}>
          {this.props.visible ? 'Hide' : 'Show'}
        </button>
      </div>
    )
  }
}

LinksListItem.propTypes = {
  shortUrl: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired
}
