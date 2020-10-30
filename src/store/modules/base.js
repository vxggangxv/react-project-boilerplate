import { takeEvery, put, all } from 'redux-saga/effects';
import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { fetchReducerActions } from 'store/utils';

// action
const exit_landing = createAction('exit_landing');
const response_status = createAction('response_status');
const response_error = createAction('response_error');
const language_change = createAction('language_change');
const base_popup = createAction('base_popup');

const initialState = {
  // NOTE: 초기 랜딩중일 경우 true, false일 경우 화면 랜딩 완료
  landing: true,
  // NOTE: api통신 pending, success, failure에 따른 자동 loading show
  apiCalling: false,
  // NOTE: router에 error 연결(e.g serverError : 500)
  responseStatus: null,
  // responseStatus: 401,
  // TODO: 차후 error toasty또는 popup과 연결 예정
  responseError: {
    isShow: false,
    message: null,
    data: null,
  },
  // language: 'en',
  language: 'ko',
  popup: {
    title: '',
    content: '',
    isTitleDefault: false,
    isContentDefault: false,
    button: '',
    hideButton: false,
    reverseButton: false,
    okText: '',
    okLink: '',
    cancelLink: '',
    isOpen: false,
    width: 350,
    type: '',
    key: '',
    dim: null,
    onClick: () => {},
    onCancel: () => {},
    onExited: () => {},
    align: [],
    paddingNone: false,
  },
};

const slice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    response_status: (state, { action: payload }) => {
      // DEBUG: 필요
      state.responseStatus = payload;
    },
    response_error: (state, { action: payload }) => {
      // DEBUG: 필요
      state.responseError.message = payload.message;
      state.responseError.data = payload;
    },
    language_change: (state, { action: payload }) => {
      state.language = payload;
    },
    base_popup: (state, { action: payload }) => {
      const {
        type = 'alert',
        title = '',
        content = '',
        isTitleDefault = false,
        isContentDefault = false,
        button = '',
        reverseButton = false,
        hideButton = false,
        onClick = () => {},
        onCancel = () => {},
        onExited = () => {},
        align = [],
        okText = '',
        okLink = '',
        cancelLink = '',
        isOpen = false,
        key = '',
        dim = true,
        width = 534,
        paddingNone = false,
      } = payload;

      if (type === 'dim') {
        state.popup.isOpen = false;
      } else {
        state.popup.title = title;
        state.popup.content = content;
        state.popup.isTitleDefault = isTitleDefault;
        state.popup.isContentDefault = isContentDefault;
        state.popup.button = button;
        state.popup.reverseButton = reverseButton;
        state.popup.hideButton = hideButton;
        state.popup.onClick = onClick;
        state.popup.onCancel = onCancel;
        state.popup.onExited = onExited;
        state.popup.okText = okText;
        state.popup.okLink = okLink;
        state.popup.cancelLink = cancelLink;
        state.popup.align = align;
        state.popup.isOpen = isOpen;
        state.popup.type = type;
        state.popup.key = key;
        state.popup.dim = dim;
        state.popup.width = width;
        state.popup.paddingNone = paddingNone;
      }
    },
  },
});

export const name = slice.name;
export const actions = slice.actions;

// saga
function* handleSetApiCalling() {
  yield put();
}

export function* baseSaga() {
  yield all([]);
}

export default slice.reducer;
