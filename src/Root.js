import React from 'react';
import App from './components/App';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import store, { persistor } from 'store';
import { PersistGate } from 'redux-persist/integration/react';

function Root(props) {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default Root;
