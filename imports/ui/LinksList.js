import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      links: []
    };
  } // constructor

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch()
      this.setState({ links });
    });
  } // componentDidMount

  componentWillUnmount() {
    this.linksTracker.stop()
  } // componentWillUnmount

  renderLinksListItems() {
    if (this.state.links.length === 0) {
      return <p>No links found...</p>
    }

    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
    })
  } // renderLinksListItems

  render() {
    return (
      <div>
        <h3>Links List</h3>
        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    ) // return
  } // render
} // export default class LinksList
