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
    /**
     * 사용법
     * @params {string, null} name: initialState의 state 이름
     * ...new SpreadReducer(name, actions.FETCH_TESTS, {
     * (name: null 일 경우)
     *  callback: (draft => {})
     * (obj: string 일 경우)
     *  pending:(draft, { payload: diff }, state) => {}),
     *  success:(draft, { payload: diff }, state) => {}),
     *  failure:(draft, { payload: diff }, state) => {}),
     * }),
     */
    ...new SpreadReducer('obj.list', actions.FETCH_TESTS, {
      success: (draft, { payload: diff }, state) => {
        draft.obj.list.data = diff;
      },
    }),
    ...new SpreadReducer('obj.detail', actions.FETCH_TEST, {
      success: (draft, { payload: diff }, state) => {
        draft.obj.detail.data = diff;
      },
    }),
  },
  initialState,
);
