import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import { routes, onAuthChange } from '../imports/routes/routes.js'
import '../imports/startup/simpleSchemaConf';

Tracker.autorun(() => {
  let isAuthenticated = !!Meteor.userId()
  onAuthChange(isAuthenticated)
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'))
});
