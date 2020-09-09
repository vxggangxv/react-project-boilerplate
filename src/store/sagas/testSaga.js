import { all, takeEvery } from 'redux-saga/effects';
import { createPromiseSaga } from 'lib/asyncUtils';
import * as actions from 'store/actions';

const handleFetchTests = createPromiseSaga({
  type: actions.FETCH_TESTS_SAGA,
  tag: 'handleFetchTests',
});

const handleFetchTest = createPromiseSaga({
  type: actions.FETCH_TEST_SAGA,
  tag: 'handleFetchTest',
});

export default function* baseSaga() {
  yield all([
    takeEvery(actions.FETCH_TESTS_SAGA.index, handleFetchTests),
    takeEvery(actions.FETCH_TEST_SAGA.index, handleFetchTest),
  ]);
}
