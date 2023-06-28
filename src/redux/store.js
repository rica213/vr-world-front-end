import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './features/ReservationSlice';
import AuthenticationReducer from './features/AuthenticationSlice';

const store = configureStore({
  reducer: {
    auth: AuthenticationReducer,
    reservations: reservationReducer,
  },
});

export default store;
