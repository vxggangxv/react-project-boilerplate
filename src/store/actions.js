import { createAction } from 'redux-actions';
import { makeAsyncCreateActions, makeAsyncActions } from 'lib/utils';
import * as API from 'lib/api';



export const BASE_EXIT_LANDING = 'base/BASE_EXIT_LANDING';
export const base_exit_landing = createAction(BASE_EXIT_LANDING);

export const BASE_LANDING = makeAsyncActions('base/BASE_LANDING');
export const BASE_LANDING_SAGA = makeAsyncCreateActions(BASE_LANDING)(API.testApi);
// export const BASE_LANDING_SAGA = makeAsyncCreateActions(BASE_LANDING);