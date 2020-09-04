import { handleActions } from 'redux-actions';
import { SpreadSagas } from 'lib/asyncUtils';
import * as actions from 'store/actions';
import { setAuthInHeader } from 'api/config/axiosUtils';
import * as mapper from 'lib/mapper';
import storage from 'api/storage';
import { DispatchActions } from 'store/actionCreators';

const initialState = {
  // NOTE: 최초 랜딩시 storage값 유무 확인
  accessToken: storage.get(mapper.storage.token) || null,
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
    ...new SpreadReducer(null, actions.SET_TOKEN, {
      callback: (draft, { payload: diff }) => {
        // console.log(diff, 'diff SET_TOKEN');
        draft.accessToken = diff;
        setAuthInHeader(diff);
      },
    }),
    // TEST: AUTH_SIGNIN test용
    ...new SpreadReducer(null, actions.AUTH_TOKEN, {
      callback: (draft, { payload: diff }) => {
        const { token, user } = diff;
        draft.accessToken = token;
        storage.set(mapper.storage.token, token);
        storage.set(mapper.storage.user, user);
        setAuthInHeader(token);
      },
    }),
    ...new SpreadReducer('signIn', actions.AUTH_SIGNIN, {
      success: (draft, { payload: diff }, state) => {
        // DEBUG: 백엔드 연결 후 테스트 필요
        const { token, user } = diff;
        draft.accessToken = token;
        storage.set(mapper.storage.token, token);
        storage.set(mapper.storage.user, user);
        setAuthInHeader(token);
      },
    }),
    ...new SpreadReducer('signIn', actions.AUTH_SIGNOUT, {
      success: (draft, { payload: diff }, state) => {
        // DEBUG: 백엔드 연결 후 테스트 필요
        draft.accessToken = null;
        storage.remove(mapper.storage.token);
        storage.remove(mapper.storage.user);
        setAuthInHeader(null);
      },
    }),
  },
  initialState,
);
