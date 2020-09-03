import { combineReducers } from 'redux';
import test from './test';
import app from './app';
import base from './base';
import auth from './auth';

export default combineReducers({
  test,
  app,
  base,
  auth,
});
