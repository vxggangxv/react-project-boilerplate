import produce from 'immer';
import { dispatch, Actions } from 'store/actionCreators';
import { AlertFn } from 'lib/library';
import _ from 'lodash'
import { call } from 'redux-saga/effects'

// SECTION: Redux Saga, Actions
export function SpreadSagas(config) {
  const { state: defaultState } = config;

  return function (customState, types, config = {}) {
    const { init, pending, success, failure, callback } = config;
    const notation = (str, obj) => str.split('.').reduce((a, c) => a[c], obj);

    try {
      // single
      if (customState === null) {
        this[types] = (state, payload) => produce(state, draft => callback(draft, payload, state));
        return;
      }

      const setPartial = (fn, draft, payload, state, type) => {
        let targetState = notation(customState, draft);
        const intialState = notation(customState, defaultState);

        const { pending, success, failure } = targetState;
        if ([pending, success, failure].every(item => item === undefined)) return;

        if (type === 'init') {
          _.forEach(intialState, (value, key, obj) => {
            targetState[key] = value;
          });
        } else {
          targetState.pending = false;
          targetState.success = false;
          targetState.failure = false;
          targetState[type] = true;
        }
        if (typeof fn === 'function') {
          fn(draft, payload, state);
        }
      };

      // types
      this[types.INIT] = (state, payload) =>
        produce(state, draft => {
          setPartial.apply(this, [init, draft, payload, state, 'init']);
        });
      this[types.PENDING] = (state, payload) =>
        produce(state, draft => {
          setPartial.apply(this, [pending, draft, payload, state, 'pending']);
        });
      this[types.SUCCESS] = (state, payload) =>
        produce(state, draft => {
          setPartial.apply(this, [success, draft, payload, state, 'success']);
        });
      this[types.FAILURE] = (state, payload) =>
        produce(state, draft => {
          setPartial.apply(this, [failure, draft, payload, state, 'failure']);
        });
    } catch (e) {
      console.log('SpreadSagas error', e);
    }
  };
}



/**
 * Actions Name
 * @param {*} actionName string
 */
export function makeAsyncActions(actionName) {
  const prefix = actionName;
  const prefixObj = {
    INDEX: 'INDEX',
    INIT: `INIT`,
    REQUEST: `REQUEST`,
    PENDING: `PENDING`,
    SUCCESS: `SUCCESS`,
    FAILURE: `FAILURE`,
    CANCEL: `CANCEL`,
  };
  for (const item in prefixObj) {
    prefixObj[item] = prefix + `_${item}`;
  }
  const init = payload => makeActionCreator(prefixObj.INIT, payload);
  prefixObj.init = init;
  return prefixObj;
}

/**
 * makeActionCreator
 * @param {*} actionType
 * @param {*} payload
 */
export function makeActionCreator(actionType, payload) {
  return dispatch({ type: actionType, payload: payload });
}

/**
 * makeAsyncActions
 * @param {*} actions Object
 */
export function makeAsyncCreateActions(actions) {
  const ActionsFunction = payload => makeActionCreator(actions.INDEX, payload);
  return api => {
    if (typeof api !== 'function') new Error('api must be Function');

    const request = data => api(data);
    const init = payload => {
      console.log(`${actions.INIT} INIT -`);
      makeActionCreator(actions.INIT, payload);
    };
    const pending = payload => {
      console.log(`${actions.PENDING} PENDING -`);
      makeActionCreator(actions.PENDING, payload);
    };
    const success = payload => {
      console.log(`${actions.SUCCESS} SUCCESS -`);
      makeActionCreator(actions.SUCCESS, payload);
    };
    const failure = payload => {
      console.log(`${actions.FAILURE} FAILURE -`);
      makeActionCreator(actions.FAILURE, payload);
    };
    ActionsFunction.index = actions.INDEX;
    ActionsFunction.request = request;
    ActionsFunction.init = init;
    ActionsFunction.pending = pending;
    ActionsFunction.success = success;
    ActionsFunction.failure = failure;
    return ActionsFunction;
  };
}

/**
 *
 * @param {*} type
 * @param {*} promiseCreator
 */
export const createPromiseSaga = ({
  type,
  tag,
  pending = () => { },
  success = () => { },
  failure = () => { },
}) => {
  return function* saga(action) {
    let currentState = null;
    let payload = null;
    AlertFn(tag);
    if (!type) {
      console.warn(`createPromiseSaga Need type`);
      return null;
    }
    try {
      payload = action.payload;

      type.pending();
      pending(action);
      currentState = 'pending';
      const { data, error, cancel } = yield call(type.request, payload);
      const viewPayload = error ? error.payload : data.payload;

      data.payload = viewPayload || {};
      console.group('-- Redux saga');
      console.log(` %cRequest Data :\n`, 'color:red;padding:5px;font-weight:bold', viewPayload);
      console.log(` %cResponse Data :\n`, 'color:red;padding:5px;font-weight:bold', data);
      console.groupEnd();

      if (cancel) {
        type.pending({ type: 'cancel' });
        return;
      }

      if (data && !error) {
        if (data.result === 1) {
          currentState = 'success';
          type.success(data);
          success(data, payload);
        } else {
          currentState = 'failure';
          type.failure(data);
          failure(data);
        }
      } else {
        currentState = 'failure';
        type.failure(data);
        failure(data);
      }
    } catch (err) {
      console.log('\n');
      console.group(currentState + ' error');
      console.log(payload, 'payload');
      console.log(err);
      console.groupEnd();
      console.log('\n');
    }
  };
};
