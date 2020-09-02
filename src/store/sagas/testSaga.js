import { all, takeEvery } from 'redux-saga/effects';
import { createPromiseSaga } from 'lib/asyncUtils';
import { TEST_DATA_SAGA, TEST_DATA_LIST_SAGA } from 'store/actions';

const handleTestDataList = createPromiseSaga({
  type: TEST_DATA_LIST_SAGA,
  tag: 'handleTestDataList',
});

const handleTestData = createPromiseSaga({
  type: TEST_DATA_SAGA,
  tag: 'handleTestData',
});

export default function* baseSaga() {
  yield all([
    takeEvery(TEST_DATA_LIST_SAGA.index, handleTestDataList),
    takeEvery(TEST_DATA_SAGA.index, handleTestData),
  ]);
}
