import { configureStore } from '@reduxjs/toolkit';
import studioReducer from './features/StudioSlice';

const store = configureStore(
  {
    reducer: {
      studios: studioReducer,
    },
  },
);

export default store;
