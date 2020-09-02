import { all, takeEvery } from 'redux-saga/effects';
import { createPromiseSaga } from 'lib/asyncUtils';
import { TEST_SAGA, TEST_DATA_LIST_SAGA } from 'store/actions';

// const handleTestList = createPromiseSaga({
//   type: TEST_DATA_LIST_SAGA,
//   tag: 'handleTest',
// });

// const handleTest = createPromiseSaga({
//   type: TEST_SAGA,
//   tag: 'handleTest',
// });

export default function* baseSaga() {
  yield all([]);
}
