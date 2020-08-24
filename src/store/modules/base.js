import { handleActions } from 'redux-actions';
import { SpreadSagas } from 'lib/utils';
import produce from 'immer';
import * as actions from 'store/actions';

const intialState = {
  landing: {
    pending: null,
    success: null,
    failure: null
  }
}

const SpreadReducer = SpreadSagas({ state: intialState });

export default handleActions({
  // NOTE: test
  ...new SpreadReducer(null, actions.BASE_EXIT_LANDING, {
    callback: (draft, { payload: diff }, state) => {
      draft.landing.success = true;
    }
  }),
  ...new SpreadReducer('landing', actions.BASE_LANDING, {
    success: (draft, { payload: diff }, state) => {
      console.log(diff, 'success boiler')
    }
  })
}, intialState)