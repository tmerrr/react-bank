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

    it('text turns red when negative', () => {
      expect(wrapper.find('h3').props().style).toEqual({ color: 'black' })
      wrapper.find({ id: 'amount' })
        .simulate('change', { target: { value: 0.01 } })
      wrapper.find({ id: 'withdraw' }).simulate('click')
      expect(wrapper.find('h3').props().style).toEqual({ color: 'red' })
    })
  })

  describe('state: amount', () => {
    it('has a property of Amount, which starts at 0', () => {
      expect(account.state.amount).toEqual(0);
    });
  })

  describe('The form', () => {
    it('renders a number input type with ID of "amount"', () => {
      expect(wrapper.find('input').length).toEqual(1);
      expect(wrapper.find('input').first().props().type).toEqual('number');
      expect(wrapper.find('input').first().props().id).toEqual('amount');
      expect(wrapper.find('input').first().props().value).toEqual(0);
    });

    it('renders a deposit button', () => {
      expect(wrapper.find({ id: 'deposit' }).type()).toEqual('button');
      expect(wrapper.find({ id: 'deposit' }).text()).toEqual('Deposit');
    })

    it('renders a withdraw button', () => {
      expect(wrapper.find({ id: 'withdraw' }).type()).toEqual('button');
      expect(wrapper.find({ id: 'withdraw' }).text()).toEqual('Withdraw');
    })
  })

  describe('#handleDeposit', () => {
    let amount, depositBtn;
    beforeEach(() => {
      amount = wrapper.find({ id: 'amount' });
      depositBtn = wrapper.find({ id: 'deposit' });
    })

    it('adds 10 to the balance', () => {
      amount.simulate('change', { target: { value: '10' } });
      depositBtn.simulate('click');
      expect(account.state.balance).toEqual(10);
    })

    it('adds 25 to the balance', () => {
      amount.simulate('change', { target: { value: '25' } });
      depositBtn.simulate('click');
      expect(account.state.balance).toEqual(25);
    })
  })

  describe('#handleWithdraw', () => {
    let amount, withdrawBtn;
    beforeEach(() => {
      account.setState({ balance: 50 })
      amount = wrapper.find({ id: 'amount' });
      withdrawBtn = wrapper.find({ id: 'withdraw' });
    })

    it('deducts 10 to the balance', () => {
      amount.simulate('change', { target: { value: '10' } });
      withdrawBtn.simulate('click');
      expect(account.state.balance).toEqual(40);
    })

    it('deducts 25 to the balance', () => {
      amount.simulate('change', { target: { value: '25' } });
      withdrawBtn.simulate('click');
      expect(account.state.balance).toEqual(25);
    })
  })

  describe('#handleAmountChange', () => {
    it('changes the state of amount, when the value of the text changes', () => {
      wrapper.find({ id: 'amount' })
        .simulate('change', { target: { value: '10' } })
      expect(account.state.amount).toEqual(10);
    })
  })

});
