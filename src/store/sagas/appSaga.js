import { put, takeEvery } from 'redux-saga/effects';
import { SET_API_CALLING_STATUS } from 'store/actions';
import { isString } from 'util';

function* handleApiCalling(action) {
  yield put({ type: SET_API_CALLING_STATUS });
}

export default function* appSaga() {
  yield takeEvery(action => {
    if (isString(action.type)) {
      return action.type.endsWith('_PENDING');
    }
  }, handleApiCalling);

  // yield takeEvery((action) => {
  //   if (isString(action.type)) {
  //     action.type.endsWith('_FAILURE');
  //   }
  // }, handleFailure);
}
