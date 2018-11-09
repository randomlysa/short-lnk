import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker'

// import AppRouter from './imports/ui/AppRouter'
import { routes, onAuthChange } from './imports/routes/routes.js'

Tracker.autorun(() => {
  let isAuthenticated = !!Meteor.userId()
  onAuthChange(isAuthenticated)
})

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'))
})