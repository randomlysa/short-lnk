import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users'
import { Links } from '../imports/api/links'
import '../imports/startup/simpleSchemaConf';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });

    if (link) {
      // Set HTTP status code.
      res.statusCode = 302;
      // Set HTTP headers.
      res.setHeader('Location', link.url);
      // End HTTP request
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });

  if (Meteor.isDevelopment) process.env.MAIL_URL=Meteor.settings.MAIL_URL;
  else process.env.MAIL_URL=process.env.MAIL_URL

});
