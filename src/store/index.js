import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';
import rootReducer from 'store/modules';
import rootSaga from 'store/sagas';

const customMiddleware = () => next => action => {
  const result = next(action);
  return result;
};

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, customMiddleware];
  const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
  const enhancers = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, enhancers);
  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore();
