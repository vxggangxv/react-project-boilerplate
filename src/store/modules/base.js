import { handleActions } from 'redux-actions';
import { SpreadSagas } from 'lib/asyncUtils';
import * as actions from 'store/actions';

const initialState = {
  // NOTE: 초기 랜딩중일 경우 true, false일 경우 화면 랜딩 완료
  landing: true,
  // NOTE: api통신 pending, success, failure에 따른 자동 loading show
  apiCalling: false,
  // NOTE: router에 error 연결(e.g serverError : 500)
  responseStatus: null,
  // TODO: 차후 error toasty또는 popup과 연결 예정
  responseError: {
    isShow: false,
    message: null,
    data: null,
  },
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
    ...new SpreadReducer(null, actions.EXIT_LANDING, {
      callback: (draft, { payload: diff }) => {
        draft.landing = false;
        // console.log(draft.landing, 'exit_landing');
      },
    }),
    ...new SpreadReducer(null, actions.RESPONSE_STATUS, {
      callback: (draft, { payload: diff }) => {
        // TEST: 필요
        draft.responseStatus = diff;
      },
    }),
    ...new SpreadReducer(null, actions.RESPONSE_ERROR, {
      callback: (draft, { payload: diff }) => {
        // TEST: 필요
        draft.responseError.message = diff.message;
        draft.responseError.data = diff;
      },
    }),
  },
  initialState,
);
