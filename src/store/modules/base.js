import { handleActions } from 'redux-actions';
import { SpreadSagas } from 'lib/asyncUtils';
import * as actions from 'store/actions';

const initialState = {
  landing: true,
  test: {
    pending: null,
    success: null,
    failure: null,
  },
};

const SpreadReducer = SpreadSagas({ state: initialState });

export default handleActions(
  {
    ...new SpreadReducer(null, actions.BASE_EXIT_LANDING, {
      callback: (draft, { payload: diff }, state) => {
        draft.landing = false;
      },
    }),
    ...new SpreadReducer('test', actions.BASE_TEST, {
      success: (draft, { payload: diff }, state) => {
        console.log(state, 'state');
        console.log(initialState, 'initialState');
        console.log('success boiler');
      },
    }),
  },
  initialState,
);
