import { Meteor } from 'meteor/meteor';
import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { PrivateHeader } from './PrivateHeader';

// Setup
configure({ adapter: new Adapter() });
chai.use(spies);

// Tests
if (Meteor.isClient) {
  describe('PrivateHeader', function() {
    it('should call handleLogout on click', function() {
      const spy = chai.spy();
      const wrapper = mount (
        <PrivateHeader title="Test" handleLogout={spy} />
      );

      wrapper.find('button').simulate('click')
      expect(spy).to.have.been.called()
    })
  });
}
