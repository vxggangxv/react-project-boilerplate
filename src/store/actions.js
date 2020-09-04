import { createAction } from 'redux-actions';
import { makeAsyncCreateActions, makeAsyncActions } from 'lib/asyncUtils';
import * as api from 'api';

/**
 * NOTE: reducer 사용법
 * import * as DispatchActions from 'store/actionCreators';
 * DispatchActions.[actionName]()
 * dispatch와 바인딩해야 하기때문에 actionCreators호출
 */
// app 자동화 actions
export const SET_API_CALLING_STATUS = 'app/SET_API_CALLING_STATUS';
export const set_api_calling_status = createAction(SET_API_CALLING_STATUS);

export const CLEAR_API_CALLING_STATUS = 'app/CLEAR_API_CALLING_STATUS';
export const clear_api_calling_status = createAction(CLEAR_API_CALLING_STATUS);

// base
export const BASE_EXIT_LANDING = 'base/BASE_EXIT_LANDING';
export const base_exit_landing = createAction(BASE_EXIT_LANDING);

export const BASE_RESPONSE_STATUS = 'base/BASE_RESPONSE_STATUS';
export const base_response_status = createAction(BASE_RESPONSE_STATUS);

export const BASE_RESPONSE_ERROR = 'base/BASE_RESPONSE_ERROR';
export const base_response_error = createAction(BASE_RESPONSE_ERROR);

// auth
export const SET_TOKEN = 'auth/SET_TOKEN';
export const set_token = createAction(SET_TOKEN);
// TEMP: test용
export const AUTH_TOKEN = 'auth/AUTH_TOKEN';
export const auth_token = createAction(AUTH_TOKEN);

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
export const AUTH_SIGNUP = makeAsyncActions('auth/AUTH_SIGNUP');
export const AUTH_SIGNUP_SAGA = makeAsyncCreateActions(AUTH_SIGNUP)(api.fetchPosts);

export const AUTH_SIGNIN = makeAsyncActions('auth/AUTH_SIGNIN');
export const AUTH_SIGNIN_SAGA = makeAsyncCreateActions(AUTH_SIGNIN)(api.fetchPosts);

export const AUTH_SIGNOUT = makeAsyncActions('auth/AUTH_SIGNOUT');
export const AUTH_SIGNOUT_SAGA = makeAsyncCreateActions(AUTH_SIGNOUT)(api.fetchPosts);
