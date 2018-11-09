import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'
import { Links } from '../api/links'

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
      const links = Links.find().fetch()
      this.setState({ links });
    });
  } // componentDidMount

  componentWillUnmount() {
    this.linksTracker.stop()
  } // componentWillUnmount

  renderLinksListItems() {
    return this.state.links.map((link) => {
      return <p key={link._id}>{link.url}</p>
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
