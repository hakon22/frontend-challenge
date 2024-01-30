import { configureStore } from '@reduxjs/toolkit';
import catsReducer from './catsSlice';
import likeCatsReducer from './likeCatsSlice';

const store = configureStore({
  reducer: {
    cats: catsReducer,
    myCats: likeCatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
