import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import modules from 'store/modules';
import rootSaga from 'store/sagas';

const customMiddleware = store => next => action => {
  const result = next(action);
  return result;
};

const configure = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [customMiddleware, sagaMiddleware];
  const REDUX_DEVTOOLS = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers =
    typeof window === 'object' && REDUX_DEVTOOLS
      ? REDUX_DEVTOOLS({ trace: true, traceLimit: 25 })
      : compose;
  const store = createStore(modules, composeEnhancers(applyMiddleware(...middleware)));
  sagaMiddleware.run(rootSaga);
  return store;
};
export default configure;