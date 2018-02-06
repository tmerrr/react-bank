import React, { Component } from 'react';

import BankAccount from './components/BankAccount'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>React Bank App</h1>
        <BankAccount />
      </div>
    )
  }
}

export default App;
