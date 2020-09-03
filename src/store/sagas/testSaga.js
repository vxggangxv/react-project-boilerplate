import { all, takeEvery } from 'redux-saga/effects';
import { createPromiseSaga } from 'lib/asyncUtils';
import * as actions from 'store/actions';
// import { TEST_DATA_SAGA, TEST_DATA_LIST_SAGA } from 'store/actions';

const handleDataList = createPromiseSaga({
  type: actions.TEST_DATA_LIST_SAGA,
  tag: 'handleDataList',
});

const handleData = createPromiseSaga({
  type: actions.TEST_DATA_SAGA,
  tag: 'handleData',
});

export default function* baseSaga() {
  yield all([
    takeEvery(actions.TEST_DATA_LIST_SAGA.index, handleDataList),
    takeEvery(actions.TEST_DATA_SAGA.index, handleData),
  ]);
}
