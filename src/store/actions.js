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

export const BASE_RESULT_STATUS = 'base/BASE_RESULT_STATUS';
export const base_result_status = createAction(BASE_RESULT_STATUS);

// Sagas
export const BASE_TEST = makeAsyncActions('base/BASE_TEST');
export const BASE_TEST_SAGAS = makeAsyncCreateActions(BASE_TEST)(api.fetchPosts);
