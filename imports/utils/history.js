import { Meteor } from 'meteor/meteor';
import { createBrowserHistory } from 'history';

// Based on https://stackoverflow.com/a/43591970
// Testing causes 'history requires DOM' errors. This fixs it, for now.
let whatToExport;
if(Meteor.isClient) whatToExport = createBrowserHistory();
else whatToExport = null;
export default whatToExport;
