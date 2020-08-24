import { all, fork } from 'redux-saga/effects';
import appSaga from './appSaga';
import baseSaga from './baseSaga';

export default function* rootSaga() {
  yield all([fork(appSaga), fork(baseSaga)]);
}
