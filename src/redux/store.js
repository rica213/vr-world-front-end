import { configureStore } from '@reduxjs/toolkit';
import reservationReducer from './features/ReservationSlice';

const store = configureStore({
  reducer: {
    reservations: reservationReducer,
  },
});

export default store;
