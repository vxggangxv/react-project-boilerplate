import { takeEvery, put, all, delay } from 'redux-saga/effects';
import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { fetchInitialState, fetchReducerActions } from 'store/utils';
import { setAuthInHeader } from 'api/config/axiosUtils';
import storage, { keys } from 'api/config/storage';

// actions
export const set_token = createAction('set_token');
// TODO: api연결 후 수정
export const sign_up = createAction('sign_up');
export const sign_in = createAction('sign_in');
export const sign_out = createAction('sign_out');

const initialState = {
  // NOTE: 최초 랜딩시 storage값 유무 확인
  accessToken: storage.get(keys.token) || null,
  signUp: {
    ...fetchInitialState,
  },
  signIn: {
    ...fetchInitialState,
  },
  signOut: {
    ...fetchInitialState,
  },
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    set_token: (state, { payload }) => {
      // console.log(payload, 'payload SET_TOKEN');
      state.accessToken = payload;
      setAuthInHeader(payload);
    },
    sign_up: () => {},
    sign_in: (state, { payload }) => {
      // DEBUG: 백엔드 연결 후 테스트 필요
      console.log(payload, 'payload signIn');
      const { token, user } = payload;
      if (!token) return;
      state.accessToken = token;
      setAuthInHeader(token);
      storage.set(keys.token, token);
      storage.set(keys.user, user);
    },
    sign_out: (state, { payload }) => {
      // DEBUG: 백엔드 연결 후 테스트 필요
      state.accessToken = null;
      setAuthInHeader(null);
      // storage.clear();
      storage.remove(keys.token);
      storage.remove(keys.user);
      storage.remove(`persist:${keys.persist}`);
      sessionStorage.removeItem(`persist:${keys.persist}`);
    },
  },
});

export const name = slice.name;
export const actions = slice.actions;

// const handleSignUp = createPromiseSaga({
//   type: actions.SIGNUP_SAGA,
//   tag: 'handleSignUp',
// });

// const handleSignIn = createPromiseSaga({
//   type: actions.SIGNIN_SAGA,
//   tag: 'handleSignIn',
// });

// const handleSignOut = createPromiseSaga({
//   type: actions.SIGNOUT_SAGA,
//   tag: 'handleSignOut',
// });

export function* authSaga() {
  yield all([
    // takeLatest(
    //   actions[fetch_movies.request],
    //   createSaga(actions, 'fetch_movies', api.fetchMoviesNowPlaying),
    // ),
    // takeEvery(actions.SIGNUP_SAGA.index, handleSignUp)
    // takeEvery(actions.SIGNIN_SAGA.index, handleSignIn),
    // takeEvery(actions.SIGNOUT_SAGA.index, handleSignOut),
  ]);
}

export default slice.reducer;
