import { handleActions } from 'redux-actions';
import { SpreadSagas } from 'lib/asyncUtils';
import * as actions from 'store/actions';

export const initialState = {
  accessToken: null,
  signUp: {
    pending: null,
    success: null,
    failure: null,
  },
  signIn: {
    pending: null,
    success: null,
    failure: null,
  },
  signOut: {
    pending: null,
    success: null,
    failure: null,
  },
};

const SpreadReducer = SpreadSagas({ state: initialState });
export default handleActions(
  {
    ...new SpreadReducer('signUp', actions.AUTH_SIGNUP, {}),
    ...new SpreadReducer('signIn', actions.AUTH_SIGNIN, {
      success: (draft, { payload: diff }, state) => {
        // draft.isAuthenticated = true;
        // draft.
      },
    }),
  },
  initialState,
);
