import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import modules from 'store/modules';
import rootSaga from 'store/sagas';

const customMiddleware = store => next => action => {
  const result = next(action);
  return result;
};

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

const store = createStore(
  modules,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      customMiddleware,
      // logger,
    ),
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
