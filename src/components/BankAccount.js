import React, { Component } from 'react';

export default class BankAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      balance : 0,
      amount  : 0
    }
  }

  handleAmountChange = ({ target }) => {
    let newValue = Number(Number(target.value).toFixed(2))
    this.setState({
      amount: newValue
    })
  }

  render() {
    return(
      <div>
        <h3>£{this.state.balance.toFixed(2)}</h3>
        <input
          type="number"
          id="amount"
          onChange={this.handleAmountChange}
          value={this.state.amount}>
        </input>
      </div>

    )
  }
}
