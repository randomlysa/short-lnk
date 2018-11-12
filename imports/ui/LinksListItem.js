import React from 'react';
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard'
import { Links } from '../api/links';
import moment from 'moment';

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
  renderStats() {
    // Show something like:
    // 0 visits
    // 2 visits (visited 24 minutes ago)
    // 1 visit (visited 8 minutes ago)
    const visitText = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;

    if (typeof this.props.lastVisitedAt === 'number') {
      visitedMessage = `(visited
        ${ moment(this.props.lastVisitedAt).fromNow() })
      `;
    }
    return <p>{this.props.visitedCount} {visitText} {visitedMessage}</p>
  }
  render() {
    return (
      <div className="shortUrl">
        <h3>{this.props.url}</h3>
        <em>{this.props.visible ? 'visible' : 'hidden'}</em><br />
        {this.renderStats()}
        <a
          className="button button--pill button--link"
          href={this.props.shortUrl}
          target="_blank"
        >
          {this.props.shortUrl}
        </a>
        <button
          className="button button--pill"
          ref="copy"
          data-clipboard-text={this.props.shortUrl}
        >
          {this.state.copyText}
        </button>
        <button
          className="button button--pill"
          onClick={() => {
            Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
          }
        }>
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
  visible: PropTypes.bool.isRequired,
  visitedCount:  PropTypes.number.isRequired,
  lastVisitedAt:  PropTypes.number
}
