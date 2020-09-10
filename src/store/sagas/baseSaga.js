import { put, takeEvery, all, getContext } from 'redux-saga/effects';
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
        return action.type.endsWith('_PENDING');
      }
    }, handleSetApiCalling),
    takeEvery(action => {
      if (isString(action.type)) {
        return action.type.endsWith('_SUCCESS') || action.type.endsWith('_FAILURE');
      }
    }, handleClearApiCalling),
  ]);
}
