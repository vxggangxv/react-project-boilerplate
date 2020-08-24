import { handleActions } from 'redux-actions';
import { SpreadSagas } from 'lib/asyncUtils';
import * as actions from 'store/actions';

const initialState = {
  apiCalling: false,
  toasts: [],
  dialog: undefined,
};

const SpreadReducer = SpreadSagas({ state: initialState });

export default handleActions(
  {
    // NOTE: SET_API_CALLING_STATUS
    ...new SpreadReducer(null, actions.SET_API_CALLING_STATUS, {
      callback: draft => {
        draft.apiCalling = true;
      },
    }),
    // NOTE: CLEAR_API_CALLING_STATUS
    ...new SpreadReducer(null, actions.CLEAR_API_CALLING_STATUS, {
      callback: draft => {
        draft.apiCalling = false;
      },
    }),
  },
  initialState,
);
