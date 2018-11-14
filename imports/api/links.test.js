import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';

import { Links } from './links';

if (Meteor.isServer) {
  describe('links', function () {
    // Clear links out once.
    Links.remove({});

    it('should have an empty database', function () {
      const res = Links.find().fetch();
      expect(res.length).to.equal(0);
    });

    it('should insert a new link', function () {
      const url = "http://www.github.com";
      Meteor.server.method_handlers['links.insert'].call(
        { userId: '123' }, url
      );
      const res = Links.find().fetch();
      expect(res.length).to.equal(1);
      expect(res[0].url).to.equal('http://www.github.com')
    });

    it('should not insert a link without this.user', function () {
      expect(() => {
        Meteor.server.method_handlers['links.insert'].call(
          undefined, url
        )
      }).to.throw();
    });

    it('should change link visiblility', function() {
      const res = Links.find({ url: 'http://www.github.com'}).fetch();
      Meteor.server.method_handlers['links.setVisibility'].call(
        { userId: '123'}, res[0]._id, false
      );

      const res2 = Links.find({ url: 'http://www.github.com'}).fetch();
      expect(res2[0].visible).to.equal(false);
    });

    it('should increment count', function() {
      const res = Links.findOne();
      Meteor.server.method_handlers['links.trackVisit'].call(
        undefined, res._id
      );
      const res2 = Links.findOne();
      expect(res2.visitedCount).to.equal(1);

    })

  }); // describe links
} // if isServer
