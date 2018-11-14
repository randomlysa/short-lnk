import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Links } from './links';

if (Meteor.isServer) {
  describe('links', function () {
    // Clear links out once.
    Links.remove({});

    it('should have an empty database', function () {
      const res = Links.find().fetch();
      expect(res.length).toBe(0);
    });

    it('should insert a new link', function () {
      const url = "http://www.github.com";
      Meteor.server.method_handlers['links.insert'].call(
        { userId: '123' }, url
      );
      const res = Links.find().fetch();
      expect(res.length).toBe(1);
      expect(res[0].url).toBe('http://www.github.com')
    });

    it('should not insert a link without this.user', function () {
      expect(() => {
        Meteor.server.method_handlers['links.insert'].call(
          undefined, url
        )
      }).toThrow();
    });

    it('should change link visiblility', function() {
      const res = Links.find({ url: 'http://www.github.com'}).fetch();
      Meteor.server.method_handlers['links.setVisibility'].call(
        { userId: '123'}, res[0]._id, false
      );

      const res2 = Links.find({ url: 'http://www.github.com'}).fetch();
      expect(res2[0].visible).toBe(false);
    });

  }); // describe links
} // if isServer
