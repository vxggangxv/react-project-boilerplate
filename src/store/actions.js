import { createAction } from 'redux-actions';
import { makeAsyncCreateActions, makeAsyncActions } from 'lib/asyncUtils';
import * as api from 'api';
import * as API from 'lib/api';

export const SET_API_CALLING_STATUS = 'app/SET_API_CALLING_STATUS';
export const set_api_calling_status = createAction(SET_API_CALLING_STATUS);

export const CLEAR_API_CALLING_STATUS = 'app/CLEAR_API_CALLING_STATUS';
export const clear_api_calling_status = createAction(CLEAR_API_CALLING_STATUS);

export const BASE_EXIT_LANDING = 'base/BASE_EXIT_LANDING';
export const base_exit_landing = createAction(BASE_EXIT_LANDING);

export const BASE_RESPONSE_STATUS = 'base/BASE_RESPONSE_STATUS';
export const base_response_status = createAction(BASE_RESPONSE_STATUS);

// Sagas
export const TEST_DATA_LIST = makeAsyncActions('base/TEST_DATA_LIST');
export const TEST_DATA_LIST_SAGA = makeAsyncCreateActions(TEST_DATA_LIST)(api.fetchPosts);
export const TEST_DATA = makeAsyncActions('base/TEST_DATA');
export const TEST_DATA_SAGA = makeAsyncCreateActions(TEST_DATA)(api.fetchPosts);
