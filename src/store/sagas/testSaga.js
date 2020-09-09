import { all, takeEvery } from 'redux-saga/effects';
import { createPromiseSaga } from 'lib/asyncUtils';
import * as actions from 'store/actions';
// import { FETCH_TEST_SAGA, FETCH_TESTS_SAGA } from 'store/actions';

const handleDataList = createPromiseSaga({
  type: actions.FETCH_TESTS_SAGA,
  tag: 'handleDataList',
});

const handleData = createPromiseSaga({
  type: actions.FETCH_TEST_SAGA,
  tag: 'handleData',
});

export default function* baseSaga() {
  yield all([
    takeEvery(actions.FETCH_TESTS_SAGA.index, handleDataList),
    takeEvery(actions.FETCH_TEST_SAGA.index, handleData),
  ]);
}
