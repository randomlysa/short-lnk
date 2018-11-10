import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import ReactDOM from 'react-dom';

import { routes, onAuthChange } from '../imports/routes/routes.js'
import '../imports/startup/simpleSchemaConf';

Tracker.autorun(() => {
  let isAuthenticated = !!Meteor.userId()
  onAuthChange(isAuthenticated)
});

Meteor.startup(() => {
  // By default, show visible urls.
  Session.set('showVisible', true)
  ReactDOM.render(routes, document.getElementById('app'))
});
