import React from 'react';
import { shallow } from 'enzyme';
import BankAccount from './BankAccount';

describe('BankAccount', () => {
  let wrapper, account;
  beforeEach(() => {
    wrapper = shallow(<BankAccount />);
    account = wrapper.instance();
  });

  describe('state: balance', () => {
    it('has a property of Balance, which starts at 0', () => {
      expect(account.state.balance).toEqual(0);
    });

    it('renders the balance', () => {
      expect(wrapper.find('h3').length).toEqual(1)
      expect(wrapper.find('h3').text()).toEqual('£0.00')
    })
  })

describe('The form', () => {
  it('has a property of Amount, which starts at 0', () => {
    expect(account.state.amount).toEqual(0);
  });

  it('renders a number input type with ID of "amount"', () => {
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('input').first().props().type).toEqual('number');
    expect(wrapper.find('input').first().props().id).toEqual('amount');
    expect(wrapper.find('input').first().props().value).toEqual(0);
  });
})

  describe('#handleAmountChange', () => {
    it('changes the state of amount, when the value of the text changes', () => {
      wrapper.find({ id: 'amount' })
        .simulate('change', { target: { value: '10' } })
      expect(account.state.amount).toEqual(10);
    })
  })

});
