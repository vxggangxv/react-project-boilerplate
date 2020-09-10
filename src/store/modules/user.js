import { handleActions } from 'redux-actions';
import { SpreadSagas } from 'lib/asyncUtils';
import * as actions from 'store/actions';
import storage, { keys } from 'api/config/storage';

const initialState = {
  // NOTE: 최초 랜딩시 storage값 유무 확인
  user: storage.get(keys.user) || null,
};

const SpreadReducer = SpreadSagas({ state: initialState });
export default handleActions(
  {
    ...new SpreadReducer(null, actions.SET_USER, {
      callback: (draft, { payload: diff }) => {
        console.log(diff, 'diff SET_USER');
        draft.user = diff;
      },
    }),
  },
  initialState,
);
