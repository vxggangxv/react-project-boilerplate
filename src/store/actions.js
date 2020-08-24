import { createAction } from 'redux-actions';
import { makeAsyncCreateActions, makeAsyncActions } from 'lib/asyncUtils';
import * as api from 'api';
import * as API from 'lib/api';

export const SET_API_CALLING_STATUS = 'base/SET_API_CALLING_STATUS';
export const set_api_calling_status = createAction(SET_API_CALLING_STATUS);

export const BASE_EXIT_LANDING = 'base/BASE_EXIT_LANDING';
export const base_exit_landing = createAction(BASE_EXIT_LANDING);

// Sagas
export const BASE_TEST = makeAsyncActions('base/BASE_TEST');
export const BASE_TEST_SAGAS = makeAsyncCreateActions(BASE_TEST)(api.fetchPosts);
// export const BASE_TEST_SAGAS = makeAsyncCreateActions(BASE_TEST)(API.testApi);
