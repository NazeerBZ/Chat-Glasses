import React from 'react';
import { Provider } from 'react-redux';
import Store from './src/store/store.js';
import Routes from './src/routes';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={Store}>
        <Routes />
      </Provider>
    )
  }
}
