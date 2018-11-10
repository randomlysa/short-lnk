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
    } else {
      next();
    }
  })
});
