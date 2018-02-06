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

  handleDeposit = () => {
    let newBalance = this.state.balance + this.state.amount;
    this.setState({
      balance: newBalance
    });
  }

  handleWithdraw = () => {
    let newBalance = this.state.balance - this.state.amount;
    this.setState({
      balance: newBalance
    });
  }

  render() {
    let balanceColor = this.state.balance >= 0 ? 'black' : 'red';

    return(
      <div>
        <h3 style={{ color: balanceColor }}>£{this.state.balance.toFixed(2)}</h3>
        <input
          type="number"
          id="amount"
          onChange={this.handleAmountChange}
          value={this.state.amount}
        />
        <button
          id="deposit"
          onClick={this.handleDeposit}
        >
          Deposit
        </button>
        <button
          id="withdraw"
          onClick={this.handleWithdraw}
        >
          Withdraw
        </button>
      </div>

    )
  }
}
