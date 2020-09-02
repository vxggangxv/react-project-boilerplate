import { handleActions } from 'redux-actions';
import { SpreadSagas } from 'lib/asyncUtils';
import * as actions from 'store/actions';

const initialState = {
  obj: {
    list: {
      data: null,
      pending: null,
      success: null,
      failure: null,
    },
    detail: {
      data: null,
      pending: null,
      success: null,
      failure: null,
    },
  },
};

const SpreadReducer = SpreadSagas({ state: initialState });

export default handleActions(
  {
    ...new SpreadReducer('obj.list', actions.TEST_DATA_LIST, {
      success: (draft, { payload: diff }, state) => {
        console.log(diff, 'diff');
        draft.obj.list.data = diff;
      },
    }),
    ...new SpreadReducer('obj.detail', actions.TEST_DATA, {
      success: (draft, { payload: diff }, state) => {
        console.log(diff, 'diff');
        draft.obj.detail.data = diff;
      },
    }),
  },
  initialState,
);
