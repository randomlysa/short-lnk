import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import FlipMove from 'react-flip-move';
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
      return (
        <div className="item">
          <p className="item__status-message">
            No links found...
          </p>
        </div>
      )
    }

    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
    })
  } // renderLinksListItems

  render() {
    return (
      <div className="links-list">
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>

      </div>
    ) // return
  } // render
} // export default class LinksList
