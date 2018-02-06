import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders an h1 header', () => {
    expect(wrapper.find('h1').length).toEqual(1);
    expect(wrapper.find('h1').first().text()).toEqual('React Bank App')
  });

  it('renders an instance of BankAccount', () => {
    expect(wrapper.find('BankAccount').length).toEqual(1)
  })

});
