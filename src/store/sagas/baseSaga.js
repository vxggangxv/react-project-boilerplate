import { all, takeEvery } from 'redux-saga/effects';
import { createPromiseSaga } from 'lib/utils';
import { BASE_LANDING_SAGA } from 'store/actions';


const handleLanding = createPromiseSaga({
  type: BASE_LANDING_SAGA,
  tag: "handleLanding"
});


export default function* baseSaga() {
  yield all([
    takeEvery(BASE_LANDING_SAGA.index, handleLanding),
  ])
}