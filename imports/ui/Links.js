import React from 'react';
import onEnterPrivatePage from '../utils/onEnterPrivatePage';

import PrivateHeader from './PrivateHeader'
import AddLink from './AddLink'
import LinksList from './LinksList'

export default class Link extends React.Component {
  componentWillMount() {
    onEnterPrivatePage()
  }

  render() {
    return (
      <div>
        <PrivateHeader title="Your Links" />
        <AddLink />
        <LinksList />
      </div>
    )
  } // render
} // export default class Link
