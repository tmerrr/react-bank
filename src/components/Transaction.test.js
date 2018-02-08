import React from 'react';
import { shallow } from 'enzyme';
import Transaction from './Transaction';

describe('Transaction', () => {
  const mockDate = new Date(2018, 1, 6);
  let wrapper;
  beforeEach(() => {
    Date = class extends Date {
      constructor() {
        return mockDate
      }
    }

    wrapper = shallow(
      <Transaction
        credit={10}
        debit={10}
        balance={15}
      />
    )
  })

  describe('state', () => {
    it('sets the date it was created', () => {
      expect(wrapper.instance().state.date).toEqual(mockDate)
    })

    it('sets the value of credit from Props', () => {
      expect(wrapper.instance().state.credit).toEqual(10);
    });

    it('sets the value of debit from Props', () => {
      expect(wrapper.instance().state.debit).toEqual(10);
    });

    it('sets the value of balance from Props', () => {
      expect(wrapper.instance().state.balance).toEqual(15);
    });
  });

  describe('#render', () => {
    it('displays the details of the transaction in a table', () => {
      const wrapper = shallow(
        <Transaction
          credit={5}
          balance={15}
        />
      )
      const tableData = wrapper.find('td')
      expect(tableData.length).toEqual(4);
      expect(tableData.at(0).text()).toEqual("2018-02-06");
      expect(tableData.at(1).text()).toEqual("£5.00");
      expect(tableData.at(2).text()).toEqual("");
      expect(tableData.at(3).text()).toEqual("£15.00");
    })

    it('displays the details of the transaction in a table', () => {
      const wrapper = shallow(
        <Transaction
          debit={20}
          balance={5}
        />
      )
      const tableData = wrapper.find('td')
      expect(tableData.length).toEqual(4);
      expect(tableData.at(0).text()).toEqual("2018-02-06");
      expect(tableData.at(1).text()).toEqual("");
      expect(tableData.at(2).text()).toEqual("£20.00");
      expect(tableData.at(3).text()).toEqual("£5.00");
    })
  })
})
