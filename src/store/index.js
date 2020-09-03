import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from 'store/modules';
import rootSaga from 'store/sagas';

const customMiddleware = () => next => action => {
  const result = next(action);
  return result;
};

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, customMiddleware];
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
const enhancers = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(persistedReducer, enhancers);
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export default store;
