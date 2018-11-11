import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links')

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Links.find({ userId: this.userId });
  })
}

Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url,
      }
    }).validate({ url });

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    });
  },
  'links.setVisibility'(_id, setTo) {
    // Validate user is logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // Validate _id and setTo
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      setTo: {
        type: Boolean
      }
    }).validate({ _id, setTo });

    // Run update
    Links.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        visible: setTo
      }
    });
  },
  'links.trackVisit'(_id) {
    // Validate _id
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });

    Links.update({
      _id
    }, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    });

  }
});
