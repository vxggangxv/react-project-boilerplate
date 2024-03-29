import { createAction, createSlice } from '@reduxjs/toolkit';
import storage, { keys } from 'lib/storage';

type InitialState = {
  user: string | null;
};

const initialState: InitialState = {
  // 최초 랜딩시 storage값 유무 확인
  user: storage.get(keys.user) || null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set_user: (state, { payload }) => {
      console.log(payload, 'payload SET_USER');
      state.user = payload;
    },
  },
});

export const actions = slice.actions;

export default slice.reducer;
