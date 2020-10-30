import { put, takeEvery, all } from 'redux-saga/effects';
import * as actions from 'store/actions';
import { isString } from 'util';

function* handleSetApiCalling() {
  yield put({ type: actions.SET_API_CALLING_STATUS, payload: true });
}
function* handleClearApiCalling() {
  yield put({ type: actions.SET_API_CALLING_STATUS, payload: false });
}

export default function* appSaga() {
  yield all([
    takeEvery(action => {
      if (isString(action.type)) {
        return action.type.endsWith('_request');
      }
    }, handleSetApiCalling),
    takeEvery(action => {
      if (isString(action.type)) {
        return action.type.endsWith('_success') || action.type.endsWith('_failure');
      }
    }, handleClearApiCalling),
    // yield takeEvery((action) => {
    //   if (isString(action.type)) {
    //     return action.type.endsWith('_FAILURE');
    //   }
    // }, handleFailure)
  ]);
}
