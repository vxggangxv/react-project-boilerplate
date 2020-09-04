import { handleActions } from 'redux-actions';
import { SpreadSagas } from 'lib/asyncUtils';
import * as actions from 'store/actions';
import * as mapper from 'lib/mapper';
import storage from 'api/storage';

const initialState = {
  user: storage.get(mapper.storage.user) || null,
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
