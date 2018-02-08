import React from 'react';
import { shallow } from 'enzyme';
import BankAccount from './BankAccount';
import Transaction from './Transaction';

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
      expect(wrapper.find('h3').text()).toEqual('Current Balance: £0.00')
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

  describe('state: transactions', () => {
    it('has an array to store transactions', () => {
      expect(account.state.transactions).toBeInstanceOf(Array);
      expect(account.state.transactions).toHaveLength(0);
    })
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

    it('should add an object with the transaction details to the transactions array', () => {
      amount.simulate('change', { target: { value: '10' } });
      depositBtn.simulate('click');
      expect(account.state.transactions).toHaveLength(1);
      expect(account.state.transactions[0]).toEqual(
        <Transaction
          credit={10}
          balance={10}
        />
      );
    });

    it('a transaction is added with the correct info', () => {
      amount.simulate('change', { target: { value: '10' } });
      depositBtn.simulate('click');
      amount.simulate('change', { target: { value: '15' } });
      depositBtn.simulate('click');
      expect(account.state.transactions).toHaveLength(2);
      expect(account.state.transactions[1]).toEqual(
        <Transaction
          credit={15}
          balance={25}
        />
      );
    });

    it('resets the amount to 0', () => {
      amount.simulate('change', { target: { value: '10' } });
      depositBtn.simulate('click');
      expect(account.state.amount).toEqual(0);
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

    it('should add an object with the transaction details to the transactions array', () => {
      amount.simulate('change', { target: { value: '10' } });
      withdrawBtn.simulate('click');
      let transaction = (
        <Transaction
          debit={10}
          balance={40}
        />
      )
      expect(account.state.transactions).toHaveLength(1);
      expect(account.state.transactions[0]).toEqual(transaction);
    });

    it('a transaction is added with the correct info', () => {
      amount.simulate('change', { target: { value: '10' } });
      withdrawBtn.simulate('click');
      amount.simulate('change', { target: { value: '25' } });
      withdrawBtn.simulate('click');
      let transaction = (
        <Transaction
          debit={25}
          balance={15}
        />
      )
      expect(account.state.transactions).toHaveLength(2);
      expect(account.state.transactions[1]).toEqual(transaction);
    });

    it('resets the amount to 0', () => {
      amount.simulate('change', { target: { value: '10' } });
      withdrawBtn.simulate('click');
      expect(account.state.amount).toEqual(0);
    })
  })

  describe('#handleAmountChange', () => {
    it('changes the state of amount, when the value of the text changes', () => {
      wrapper.find({ id: 'amount' })
        .simulate('change', { target: { value: '10' } })
      expect(account.state.amount).toEqual(10);
    })
  })

  describe('Render Transactions Table', () => {
    it('prints a table', () => {
      expect(wrapper.find('table').length).toEqual(1)
    })

    it('prints the table headers', () => {
      expect(wrapper.find('tr').length).toEqual(1);
      expect(wrapper.find('tr').find('th').length).toEqual(4);
      const tableHeader = wrapper.find('th')
      expect(tableHeader.at(0).text()).toEqual('Date');
      expect(tableHeader.at(1).text()).toEqual('Credit');
      expect(tableHeader.at(2).text()).toEqual('Debit');
      expect(tableHeader.at(3).text()).toEqual('Balance');
    })

    it('shows the transaction', () => {
      wrapper.find({ id: 'amount' }).simulate('change', { target: { value: '15' } });
      wrapper.find({ id: 'deposit' }).simulate('click');
      expect(wrapper.find('Transaction').length).toEqual(1);
    })
  })

});
