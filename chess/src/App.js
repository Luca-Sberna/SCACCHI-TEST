import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/redux/store/store';
import MainApp from './components/MainApp';

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
