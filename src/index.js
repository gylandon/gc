import React from 'react';
import ReactDOM from 'react-dom';
import { Routes } from '@router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@store';
import { CookiesProvider } from 'react-cookie';

const App = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);
