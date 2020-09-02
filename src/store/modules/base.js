import { handleActions } from 'redux-actions';
import { SpreadSagas } from 'lib/asyncUtils';
import * as actions from 'store/actions';

const initialState = {
  // NOTE: 초기 랜딩 false일 경우 화면 랜딩 실행
  landing: true,
  // NOTE: router에 error 연결(e.g serverError : 5)
  responseStatus: null,
  // TODO: 차후 error toasty또는 popup과 연결 예정
  error: {
    isShow: false,
    message: null,
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
        draft.responseStatus = diff;
      },
    }),
  },
  initialState,
);
