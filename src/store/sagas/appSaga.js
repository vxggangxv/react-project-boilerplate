import { put, takeEvery } from 'redux-saga/effects';
import { SET_API_CALLING_STATUS, CLEAR_API_CALLING_STATUS } from 'store/actions';
import { isString } from 'util';

function* handleSetApiCalling(action) {
  yield put({ type: SET_API_CALLING_STATUS });
}
function* handleClearApiCalling(action) {
  yield put({ type: CLEAR_API_CALLING_STATUS });
}

export default function* appSaga() {
  yield takeEvery(action => {
    if (isString(action.type)) {
      return action.type.endsWith('_PENDING');
    }
  }, handleSetApiCalling);

  yield takeEvery(action => {
    if (isString(action.type)) {
      return action.type.endsWith('_SUCCESS');
    }
  }, handleClearApiCalling);

  // yield takeEvery((action) => {
  //   if (isString(action.type)) {
  //     return action.type.endsWith('_FAILURE');
  //   }
  // }, handleFailure);
}
