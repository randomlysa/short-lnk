import React from 'react';
import PropTypes from 'prop-types'

export default class LinksListItem extends React.Component {
  render() {
    return (
      <div className="shortUrl">
        <h3>{this.props.url}</h3>
        <a href={this.props.shortUrl}>{this.props.shortUrl}</a>
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