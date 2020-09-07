import { createAction } from 'redux-actions';
import { makeAsyncCreateActions, makeAsyncActions } from 'lib/asyncUtils';
import * as api from 'api';

/**
 * NOTE: reducer 사용법
 * import * as DispatchActions from 'store/actionCreators';
 * DispatchActions.[actionName]()
 * dispatch와 바인딩해야 하기때문에 actionCreators호출
 */

// base
export const SET_API_CALLING_STATUS = 'base/SET_API_CALLING_STATUS';
export const set_api_calling_status = createAction(SET_API_CALLING_STATUS);

export const CLEAR_API_CALLING_STATUS = 'base/CLEAR_API_CALLING_STATUS';
export const clear_api_calling_status = createAction(CLEAR_API_CALLING_STATUS);

export const EXIT_LANDING = 'base/EXIT_LANDING';
export const exit_landing = createAction(EXIT_LANDING);

export const RESPONSE_STATUS = 'base/RESPONSE_STATUS';
export const response_status = createAction(RESPONSE_STATUS);

export const RESPONSE_ERROR = 'base/RESPONSE_ERROR';
export const response_error = createAction(RESPONSE_ERROR);

// auth
export const SET_TOKEN = 'auth/SET_TOKEN';
export const set_token = createAction(SET_TOKEN);

// TODO: api연결 후 수정
export const SIGN_UP = 'auth/SIGN_UP';
export const sign_up = createAction(SIGN_UP);

export const SIGN_IN = 'auth/SIGN_IN';
export const sign_in = createAction(SIGN_IN);

export const SIGN_OUT = 'auth/SIGN_OUT';
export const sign_out = createAction(SIGN_OUT);

// user
export const SET_USER = 'auth/SET_USER';
export const set_user = createAction(SET_USER);

// user

/**
 * NOTE: Saga 사용법
 * import * as actions from 'store/actions';
 * actions.[sagaName]()
 * reducer와 차이점은 makeAsyncCreateActions에 dispatch가 바인딩 되어있기 때문에 액션만 호출
 * [sagaName].index는 saga.js파일에 type과 연결
 */

// test
export const TEST_DATA_LIST = makeAsyncActions('base/TEST_DATA_LIST');
export const TEST_DATA_LIST_SAGA = makeAsyncCreateActions(TEST_DATA_LIST)(api.fetchPosts);

export const TEST_DATA = makeAsyncActions('base/TEST_DATA');
export const TEST_DATA_SAGA = makeAsyncCreateActions(TEST_DATA)(api.fetchPosts);

// auth
// export const SIGN_UP = makeAsyncActions('auth/SIGN_UP');
// export const SIGN_UP_SAGA = makeAsyncCreateActions(SIGN_UP)(api.fetchPosts);

// export const SIGN_IN = makeAsyncActions('auth/SIGN_IN');
// export const SIGN_IN_SAGA = makeAsyncCreateActions(SIGN_IN)(api.fetchPosts);

// export const SIGN_OUT = makeAsyncActions('auth/SIGN_OUT');
// export const SIGN_OUT_SAGA = makeAsyncCreateActions(SIGN_OUT)(api.fetchPosts);
