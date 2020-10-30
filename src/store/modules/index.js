import { all, fork } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import test from './test';
import base, { baseSaga } from './base';
import auth from './auth';
import user from './user';

const rootReducer = combineReducers({
  test,
  base,
  auth,
  user,
});

export function* rootSaga() {
  yield all([fork(baseSaga)]);
}

export default rootReducer;
