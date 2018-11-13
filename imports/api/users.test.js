import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { validateNewUser } from './users'


if (Meteor.isServer) {
  describe('users', function () {

    it('should allow valid email address', function () {
      const testUser = {
        emails: [{ address: 'test@example.com' }]
      };
      const result = validateNewUser(testUser);
      expect(result).toBe(true);
    }); // allow valid email

    it('should reject invalid email address', function () {
      const testUser = {
        emails: [{ address: 'testexample.com' }]
      };

      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    }); // reject invalid email

  }); // describe users
} // if (Meteor.isServer)
