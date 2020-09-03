import { all, takeEvery } from 'redux-saga/effects';
import { createPromiseSaga } from 'lib/asyncUtils';
import * as actions from 'store/actions';

const handleSignUp = createPromiseSaga({
  type: actions.AUTH_SIGNUP_SAGA,
  tag: 'handleSignUp',
});

const handleSignIn = createPromiseSaga({
  type: actions.AUTH_SIGNIN_SAGA,
  tag: 'handleSignIn',
});

const handleSignOut = createPromiseSaga({
  type: actions.AUTH_SIGNOUT_SAGA,
  tag: 'handleSignOut',
});

export default function* baseSaga() {
  yield all([actions.AUTH_SIGNUP_SAGA.index, handleSignUp]);
  yield all([actions.AUTH_SIGNIN_SAGA.index, handleSignIn]);
  yield all([actions.AUTH_SIGNOUT_SAGA.index, handleSignOut]);
}
