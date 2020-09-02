import { handleActions } from 'redux-actions';
import { SpreadSagas } from 'lib/asyncUtils';
import * as actions from 'store/actions';

const initialState = {
  landing: true,
  // NOTE: router에 error 연결(e.g serverError : 5)
  resultStatus: null,
  // TODO: 차후 error toasty와 연결 예정
  error: {
    isShow: false,
    message: null,
  },
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
      callback: draft => {
        draft.landing = false;
      },
    }),
    ...new SpreadReducer(null, actions.BASE_RESULT_STATUS, {
      callback: (draft, { payload: diff }) => {
        draft.resultStatus = diff;
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
