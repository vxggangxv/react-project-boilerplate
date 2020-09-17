import React from 'react';
import App from './components/App';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import store, { persistor } from 'store';
import { PersistGate } from 'redux-persist/integration/react';
import 'lang/i18n';
import { ENV_MODE_PROD } from 'lib/setting';

// if (ENV_MODE_PROD) console.log = ()=>{}

function Root(props) {
  return (
    <Provider store={store}>
      <Router>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Router>
    </Provider>
  );
}

export default Root;
