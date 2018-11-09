import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './imports/ui/AppRouter'

Meteor.startup(() => {
  ReactDOM.render(<AppRouter />, document.getElementById('app'))
})