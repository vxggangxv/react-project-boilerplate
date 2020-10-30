import { takeEvery, call, put, all, delay } from 'redux-saga/effects';
import { createAction, createReducer } from '@reduxjs/toolkit';
import { SET_API_CALLING_STATUS, CLEAR_API_CALLING_STATUS } from './modules/app';

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
  return {
    [type.init]: (state, action) => {
      state[key] = {
        ...state[key],
        ...fetchCurrentState(state[key], 'init'),
      };
      init(state, action);
      // console.log(action.type + '---init');
    },
    [type.request]: (state, action) => {
      state[key] = {
        ...state[key],
        ...fetchCurrentState(state[key], 'pending'),
      };
      pending(state, action);
      // console.log(action.type + '---pending');
    },
    [type.success]: (state, action) => {
      state[key] = {
        ...state[key],
        ...fetchCurrentState(state[key], 'success'),
      };
      state[key].data = action.payload;
      success(state, action);
      // console.log(action.type + '---success');
    },
    [type.failure]: (state, action) => {
      state[key] = {
        ...state[key],
        ...fetchCurrentState(state[key], 'failure'),
      };
      failure(state, action);
      // console.log(action.type + '---failure');
    },
  };
}

export function createSaga(actions, key, req, config = {}) {
  const { success = () => {}, failure = () => {} } = config;
  // console.log(actions, 'actions');
  return function* ({ payload }) {
    // const payload = action?.payload;
    // console.log(payload, 'payload')
    try {
      const {
        data: { results: result },
      } = yield call(req, payload);
      // console.log(result, 'result');
      yield put(actions[`${key}_success`](result));
      success();
    } catch (e) {
      yield put(actions[`${key}_failure`]('데이터를 불러오기에 실패했습니다.'));
      failure();
    } finally {
      // DEBUG: 완료후 자동 init
      yield put(actions[`${key}_init`]());
    }
  };
}
