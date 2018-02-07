import React from 'react';
import { shallow } from 'enzyme';
import Transaction from './Transaction';

describe('Transaction', () => {
  describe('state', () => {
    it('sets the value of credit from Props', () => {
      const wrapper = shallow(<Transaction credit={10} />);
      expect(wrapper.instance().state.credit).toEqual(10);
    });
  });

  describe('#render', () => {

  })
})
