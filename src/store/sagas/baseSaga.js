import { all, takeEvery } from 'redux-saga/effects';
import { createPromiseSaga } from 'lib/asyncUtils';
import { BASE_TEST_SAGAS } from 'store/actions';

const handleTest = createPromiseSaga({
  type: BASE_TEST_SAGAS,
  tag: 'handleTest',
});

export default function* baseSaga() {
  yield all([takeEvery(BASE_TEST_SAGAS.index, handleTest)]);
}
