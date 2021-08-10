import MainNavigator from './navigation'
import { Provider } from 'react-redux'
import React from 'react';
import { init } from './db';
import store from './store'

init()
  .then(() => console.log('Database initialized'))
  .catch((err) => {
    console.log('Database failed to connect');
    console.log(err.message)
  });

// navigation




export default function App() {
  return (<Provider store={store}><MainNavigator /></Provider>);
}
