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
    ...new SpreadReducer(null, actions.SET_API_CALLING_STATUS, {
      callback: (draft, { payload: diff }) => {
        // console.log(diff, 'diff apiCalling');
        draft.apiCalling = diff;
      },
    }),
  },
  initialState,
);
