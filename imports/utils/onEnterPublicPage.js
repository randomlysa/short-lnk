import { Meteor } from 'meteor/meteor';
import history from '../utils/history'

export default onEnterPublicPage = () => {
  // If userId exists and user is entering a public page, send to /links.
  // Add this to ComponentWillMount on pages that need it.
  // Public pages: /, /signup
  if (Meteor.userId()) {
    history.replace('/links');
  }
}
