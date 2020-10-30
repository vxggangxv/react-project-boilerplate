import { takeEvery, put, all, delay } from 'redux-saga/effects';
import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';

export const set_api_calling_status = createAction('set_api_calling_status');
export const clear_api_calling_status = createAction('clear_api_calling_status');

export const show_toast = createAction('show_toast');
export const add_toast = createAction('add_toast');
export const remove_toast = createAction('remove_toast');

export const show_dialog = createAction('show_dialog');
export const confirm_dialog = createAction('confirm_dialog');
export const cancel_dialog = createAction('cancel_dialog');

const initialState = {
  apiCalling: false,
  toasts: [],
  dialog: undefined,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    set_api_calling_status: (state, action) => {
      state.apiCalling = true;
    },
    clear_api_calling_status: (state, action) => {
      state.apiCalling = false;
    },
    add_toast: (state, action) => {
      state.toasts = state.toasts.concat(action.payload);
    },
    remove_toast: (state, action) => {
      const toastId = action.payload;
      state.toasts = state.toasts.filter(item => item.id !== toastId);
    },
  },
});

export const actions = slice.actions;

function* handleRequest(action) {
  // const { payload } = action;

  yield put(set_api_calling_status());
}

// 토스트 아이드로 사용한다
let _tid = 0;

function* handleShowToast(action) {
  const nextId = _tid + 1;
  _tid = nextId;

  const text = action.payload;

  // 토스트를 상태에 추가한다
  yield put(add_toast({ id: nextId, text }));

  // 3초 대기한다
  yield delay(3000);

  // 토스트를 상태에서 제거한다
  yield put(remove_toast({ nextId }));
}

function* handleFailure(action) {
  const { payload } = action;
  yield put(clear_api_calling_status());
  if (typeof payload === 'string') {
    yield put(show_toast('데이터를 불러오는데 실패하였습니다.'));
  }
}

export function* appSaga() {
  yield all([
    takeEvery(action => {
      if (typeof action.type === 'string') {
        return action.type.endsWith('_REQUEST');
      }
    }, handleRequest),
    takeEvery(action => {
      if (typeof action.type === 'string') {
        return action.type.endsWith('_SUCCESS') || action.type.endsWith('_FAILURE');
      }
    }, handleFailure),
    takeEvery(show_toast.type, handleShowToast),
  ]);
}

export default slice.reducer;
