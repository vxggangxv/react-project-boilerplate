import { handleActions } from 'redux-actions';
import { SpreadSagas } from 'lib/asyncUtils';
import * as actions from 'store/actions';
import { setAuthInHeader } from 'api/config/axiosUtils';
import storage, { keys } from 'api/config/storage';
import { DispatchActions } from 'store/actionCreators';

const initialState = {
  // NOTE: 최초 랜딩시 storage값 유무 확인
  accessToken: storage.get(keys.token) || null,
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
    ...new SpreadReducer(null, actions.SET_TOKEN, {
      callback: (draft, { payload: diff }) => {
        // console.log(diff, 'diff SET_TOKEN');
        draft.accessToken = diff;
        setAuthInHeader(diff);
      },
    }),
    ...new SpreadReducer('signUp', actions.SIGN_UP, {}),
    ...new SpreadReducer(null, actions.SIGN_IN, {
      callback: (draft, { payload: diff }, state) => {
        // DEBUG: 백엔드 연결 후 테스트 필요
        console.log(diff, 'diff signIn');
        const { token, user } = diff;
        if (!token) return;
        draft.accessToken = token;
        setAuthInHeader(token);
        storage.set(keys.token, token);
        storage.set(keys.user, user);
      },
    }),
    ...new SpreadReducer(null, actions.SIGN_OUT, {
      callback: (draft, { payload: diff }, state) => {
        // DEBUG: 백엔드 연결 후 테스트 필요
        draft.accessToken = null;
        setAuthInHeader(null);
        // storage.clear();
        storage.remove(keys.token);
        storage.remove(keys.user);
        storage.remove(`persist:${keys.persist}`);
        sessionStorage.removeItem(`persist:${keys.persist}`);
      },
    }),
  },
  initialState,
);
