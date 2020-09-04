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
    // TEST: auth test용
    ...new SpreadReducer(null, actions.AUTH_ACCESSTOKEN, {
      callback: draft => {
        draft.accessToken = 'token';
      },
    }),
    ...new SpreadReducer('signIn', actions.AUTH_SIGNIN, {
      success: (draft, { payload: diff }, state) => {
        // TODO: 실제 주는 토큰
        //        storage.set 을 넣어준후
        //        accessToken에 넣어준다
        // TEST: actions.AUTH_ACCESSTOKEN 로 setToken 가능한지 테스트
        draft.accessToken = 'token';
      },
    }),
  },
  initialState,
);
