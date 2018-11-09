import React from 'react';
import { withRouter } from 'react-router-dom'

export default class Link extends React.Component {
  doLogout() {
    this.props.history.push("/")
  }
  render() {
    return (
      <div>
        <button onClick={this.doLogout.bind(this)}>Logout</button>
      </div>
    )
  }
}
