import { Meteor } from 'meteor/meteor';
import history from '../utils/history'

export default onEnterPrivatePage = () => {
  // If userId doesn't exist and user is entering a private page, send to /.
  // Add this to ComponentWillMount on pages that need it.
  // Private page: /links
  if (!Meteor.userId()) {
    history.replace('/');
  }
}
