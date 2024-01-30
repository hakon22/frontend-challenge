import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { Cat } from '@/types/Cat';
import type { RootState } from './index';

export const likeCatsAdapter = createEntityAdapter<Cat>();

const likeCatsSlice = createSlice({
  name: 'myCats',
  initialState: likeCatsAdapter.getInitialState(),
  reducers: {
    catAdd: likeCatsAdapter.addOne,
    catRemove: likeCatsAdapter.removeOne,
  },
});

export const { catAdd, catRemove } = likeCatsSlice.actions;

export const selectors = likeCatsAdapter.getSelectors<RootState>((state) => state.myCats);

export default likeCatsSlice.reducer;
