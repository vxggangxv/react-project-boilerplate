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
      callback: (draft, { payload: diff }, state) => {
        draft.apiCalling = diff;
      },
    }),
  },
  initialState,
);
