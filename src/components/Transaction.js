import React, { Component } from 'react';

export default class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date    : new Date(),
      credit  : props.credit,
      debit   : props.debit,
      balance : props.balance
    }
  }

  render() {
    const state = this.state;
    const dateOptions = {
      year  : 'numeric',
      month : '2-digit',
      day   : '2-digit'
    }

    const credit = state.credit ? `£${state.credit.toFixed(2)}` : ''
    const debit  = state.debit  ? `£${state.debit.toFixed(2)}`  : ''

    return (
      <tr>
        <td>{state.date.toLocaleDateString('gregory', dateOptions)}</td>
        <td>{credit}</td>
        <td>{debit}</td>
        <td>£{state.balance.toFixed(2)}</td>
      </tr>
    )
  }
}
