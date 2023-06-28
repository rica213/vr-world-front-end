import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './features/ReservationSlice';
import AuthenticationReducer from './features/AuthenticationSlice';
import studioReducer from './features/StudioSlice';

const store = configureStore(
  {
    reducer: {
      auth: AuthenticationReducer,
      reservations: reservationReducer,
      studios: studioReducer,
    },
  },
);

export default store;
