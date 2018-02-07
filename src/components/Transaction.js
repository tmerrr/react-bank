import React, { Component } from 'react';

export default class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      credit: props.credit
    }
  }

  render() {
    return null;
  }
}
