import React from 'react';
import onEnterPrivatePage from '../utils/onEnterPrivatePage';

import PrivateHeader from './PrivateHeader'
import LinksListFilters from './LinksListFilters'
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
        <div className="page-content">
          <AddLink />
          <LinksListFilters />
          <LinksList />
        </div>
      </div>
    )
  } // render
} // export default class Link
