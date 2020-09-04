import { handleActions } from 'redux-actions';
import { SpreadSagas } from 'lib/asyncUtils';
import * as actions from 'store/actions';

const initialState = {
  // NOTE: 초기 랜딩중일 경우 true, false일 경우 화면 랜딩 완료
  landing: true,
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
    ...new SpreadReducer(null, actions.BASE_EXIT_LANDING, {
      callback: draft => {
        draft.landing = false;
      },
    }),
    ...new SpreadReducer(null, actions.BASE_RESPONSE_STATUS, {
      callback: (draft, { payload: diff }) => {
        // TEST: 필요
        draft.responseStatus = diff;
      },
    }),
    ...new SpreadReducer(null, actions.BASE_RESPONSE_ERROR, {
      callback: (draft, { payload: diff }) => {
        // TEST: 필요
        draft.responseError.message = diff.message;
        draft.responseError.data = diff;
      },
    }),
  },
  initialState,
);
