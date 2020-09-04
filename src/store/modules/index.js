import { combineReducers } from 'redux';
import test from './test';
import app from './app';
import base from './base';
import auth from './auth';
import user from './user';

export default combineReducers({
  test,
  app,
  base,
  auth,
  user,
});
