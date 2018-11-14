import { Meteor } from 'meteor/meteor';
import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// https://github.com/ReactTraining/react-router/issues/4759#issuecomment-299640761
import { MemoryRouter } from 'react-router-dom';

import { Home } from './Home';

// Setup
configure({ adapter: new Adapter() });
chai.use(spies);

// Tests
if (Meteor.isClient) {
  describe('Home', function() {
    it('should call loginWithPassword with the form data', function() {
      const email = 'test@example.com';
      const password = 'pass123456';
      const spy = chai.spy();
      const wrapper = mount (
        <MemoryRouter>
          <Home loginWithPassword={spy} />
        </MemoryRouter>
      );

      wrapper.find('input').at(0).instance().value = email;
      wrapper.find('input').at(1).instance().value = password;
      wrapper.find('form').simulate('submit');

      expect(spy).to.have.been.called.with({email}, password)
    }); // it
  }) // describe
} // Meteor.isClient
