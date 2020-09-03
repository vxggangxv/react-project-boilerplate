import { all, fork } from 'redux-saga/effects';
import testSaga from './testSaga';
import appSaga from './appSaga';
import baseSaga from './baseSaga';
import authSaga from './authSaga';

export default function* rootSaga() {
  yield all([fork(appSaga), fork(baseSaga), fork(testSaga), fork(authSaga)]);
}
