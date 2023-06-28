import { configureStore } from '@reduxjs/toolkit';
import AuthenticationReducer from './features/AuthenticationSlice';

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
  },
});

export default store;
