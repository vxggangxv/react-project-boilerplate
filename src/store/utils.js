import { call, put } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { actions as appActions } from './modules/app';

export const fetchInitialState = {
  pending: null,
  success: null,
  failure: null,
};

export const fetchCurrentState = (state, currentState) => {
  if (currentState === 'init') {
    return (state = { ...fetchInitialState });
  }
  return (state = {
    ...fetchInitialState,
    [currentState]: true,
  });
};

export function createFetchAction(type) {
  const INIT = `${type}_init`;
  const REQUEST = `${type}_request`;
  const SUCCESS = `${type}_success`;
  const FAILURE = `${type}_failure`;

  return {
    // TYPE: type,
    // REQUEST,
    // SUCCESS,
    // FAILURE,
    init: createAction(INIT),
    request: createAction(REQUEST),
    success: createAction(SUCCESS),
    failure: createAction(FAILURE),
  };
}

export function fetchReducerActions(type, key, config = {}) {
  const { init = () => {}, pending = () => {}, success = () => {}, failure = () => {} } = config;
  const targetState = (str, obj, type, action) => {
    const splitArray = str.split('.');
    const targetState = str.split('.').reduce((a, c) => {
      if (splitArray[splitArray.length - 1] === c) {
        a[c] = {
          ...a[c],
          ...fetchCurrentState(a[c], type),
        };
        if (type === 'success') {
          a[c] = {
            ...a[c],
            ...fetchCurrentState(a[c], type),
            data: action.payload,
          };
        }
      }
      return a[c];
    }, obj);
    return targetState;
  };
  // console.log(key, 'key');
  // state[key] = {
  //   ...state[key],
  //   ...fetchCurrentState(state[key], 'init'),
  // };
  return {
    [type.init]: (state, action) => {
      targetState(key, state, 'init');
      init(state, action);
    },
    [type.request]: (state, action) => {
      targetState(key, state, 'pending');
      pending(state, action);
    },
    [type.success]: (state, action) => {
      targetState(key, state, 'success', action);
      success(state, action);
    },
    [type.failure]: (state, action) => {
      targetState(key, state, 'failure');
      failure(state, action);
    },
  };
}

export function createSaga(actions, key, req, config = {}) {
  const { apiLoading = true, success = () => {}, failure = () => {} } = config;
  // console.log(actions, 'actions');
  return function* ({ payload }) {
    // const payload = action?.payload;
    // console.log(payload, 'payload');
    if (apiLoading) yield put(appActions.set_api_calling_status());
    try {
      const { data } = yield call(req, payload);
      // console.log(data, 'data');
      yield put(actions[`${key}_success`](data));
      success();
    } catch (e) {
      yield put(actions[`${key}_failure`]('데이터를 불러오기에 실패했습니다.'));
      failure();
    } finally {
      // 완료후 자동 init
      yield put(actions[`${key}_init`]());
      if (apiLoading) yield put(appActions.clear_api_calling_status());
    }
  };
}
