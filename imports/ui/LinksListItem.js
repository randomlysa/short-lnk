import React from 'react';
import PropTypes from 'prop-types'
import Clipboard from 'clipboard'

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
        <a href={this.props.shortUrl}>{this.props.shortUrl}</a>
        <button ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.copyText}
        </button>
      </div>
    )
  }
}

LinksListItem.propTypes = {
  shortUrl: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
}