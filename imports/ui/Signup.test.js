import { Meteor } from 'meteor/meteor';
import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// https://github.com/ReactTraining/react-router/issues/4759#issuecomment-299640761
import { MemoryRouter } from 'react-router-dom';

import { Signup } from './Signup';

// Setup
configure({ adapter: new Adapter() });
chai.use(spies);

// Tests
if (Meteor.isClient) {
  describe('Signup', function() {
    it('should show error messages', function() {
      const error = 'This is not working.';
      const wrapper = mount (
        <MemoryRouter>
          <Signup loginWithPassword={() => {}} />
        </MemoryRouter>
      );

      wrapper.find(Signup).setState({ error })
      expect(wrapper.find('p').text()).to.equal(error);
    }) // it

    it('should call createuser with the form data', function() {
      const email = 'test@example.com';
      const password = 'pass16555555555555555';
      const spy = chai.spy();
      const wrapper = mount (
        <MemoryRouter>
          <Signup createUser={spy} />
        </MemoryRouter>
      );

      wrapper.find('input').at(0).instance().value = email;
      wrapper.find('input').at(1).instance().value = password;
      wrapper.find('form').simulate('submit');

      expect(spy).to.have.been.called.with({ email, password} );
    });

    it('should set loginWithPassword errors', function() {

    });

  }) // describe
}
