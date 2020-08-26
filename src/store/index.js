import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';
import modules from 'store/modules';
import rootSaga from 'store/sagas';

const customMiddleware = () => next => action => {
  // console.log(action);
  const result = next(action);
  // console.log('\t', store.getState());
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
