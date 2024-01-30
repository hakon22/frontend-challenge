import {
  createSlice, createEntityAdapter, createAsyncThunk, type PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import type { Cat } from '@/types/Cat';
import { InitialStateType } from '@/types/InitialState';
import type { RootState } from './index';

export const catAdapter = createEntityAdapter<Cat>();

export const fetchCats = createAsyncThunk(
  'cats/fetchCats',
  async () => {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=15');
    return response.data;
  },
);

export const initialState: InitialStateType = {
  loadingStatus: 'idle',
  error: null,
};

const catsSlice = createSlice({
  name: 'cats',
  initialState: catAdapter.getInitialState(initialState),
  reducers: {
    catAdd: catAdapter.addOne,
    catsAdd: catAdapter.addMany,
    catRemove: catAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchCats.fulfilled, (state, { payload }
        : PayloadAction<Cat[]>) => {
        catAdapter.addMany(state, payload);
        state.loadingStatus = 'finish';
        state.error = null;
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error.message ?? null;
      });
  },
});

export const { catAdd, catsAdd, catRemove } = catsSlice.actions;

export const selectors = catAdapter.getSelectors<RootState>((state) => state.cats);

export default catsSlice.reducer;
